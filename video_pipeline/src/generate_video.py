#!/usr/bin/env python3
"""
Generate a 3-clip (3×5s) TikTok video from an avatar and product listing.
Usage: python generate_video.py --avatar-kie-url <url> --listing-json <path> --script <str>
       --scene-prompts '<json>' --video-prompts '<json>' [--run-id <8char>] [--out-dir <path>]
"""
import sys
import os
import json
import argparse
import uuid
import time
import shutil
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone

sys.path.insert(0, str(Path(__file__).resolve().parent))

from dotenv import load_dotenv
load_dotenv(Path(__file__).resolve().parent.parent.parent / ".env")

import kie_client
import video_merge


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--avatar-kie-url", required=True, dest="avatar_kie_url")
    parser.add_argument("--listing-json",   required=True, dest="listing_json")
    parser.add_argument("--script",         required=True)
    parser.add_argument("--scene-prompts",  required=True, dest="scene_prompts")
    parser.add_argument("--video-prompts",  required=True, dest="video_prompts")
    parser.add_argument("--run-id",         dest="run_id", default=None)
    parser.add_argument("--out-dir",        dest="out_dir", default=None)
    args = parser.parse_args()

    run_id = args.run_id or uuid.uuid4().hex[:8]
    root = Path(__file__).resolve().parent.parent
    out_dir = Path(args.out_dir) if args.out_dir else (root / "results" / run_id)
    out_dir.mkdir(parents=True, exist_ok=True)

    scene_prompts = json.loads(args.scene_prompts)
    video_prompts = json.loads(args.video_prompts)

    with open(args.listing_json) as f:
        product = json.load(f)
    product_images = product.get("images", [])[:2]

    step_log = {}
    generations = []
    frame_kie_urls = [None, None, None]
    video_paths = [None, None, None]
    video_kie_urls = [None, None, None]

    # ── FRAMES ───────────────────────────────────────────────────────────────
    t = time.time()
    print(f"  [generate_video] submitting 3 frame tasks...", file=sys.stderr)
    frame_task_ids = []
    for i in range(3):
        image_input = [args.avatar_kie_url] + product_images
        task_id = kie_client.create_task("nano-banana-pro", {
            "prompt": scene_prompts[i],
            "image_input": image_input,
            "aspect_ratio": "9:16",
            "resolution": "1K",
            "output_format": "png",
        })
        frame_task_ids.append(task_id)
        print(f"  [generate_video] frame{i+1} submitted: {task_id}", file=sys.stderr)

    def poll_frame(args_tuple):
        i, task_id = args_tuple
        dest = str(out_dir / f"frame{i+1}.png")
        task_data = kie_client.poll_task(task_id)
        kie_url = kie_client.extract_result_url(task_data)
        kie_client.download_file(kie_url, dest)
        print(f"  [generate_video] frame{i+1} saved", file=sys.stderr)
        return (i, kie_url)

    frame_errors = []
    with ThreadPoolExecutor(max_workers=3) as executor:
        futures = {executor.submit(poll_frame, (i, tid)): i for i, tid in enumerate(frame_task_ids)}
        for future in as_completed(futures):
            i = futures[future]
            try:
                idx, kie_url = future.result()
                frame_kie_urls[idx] = kie_url
                generations.append({"step": f"frame_{idx+1}", "kie_task_id": frame_task_ids[idx], "kie_url": kie_url, "status": "success"})
            except Exception as e:
                print(f"  [generate_video] frame{i+1} FAILED: {e}", file=sys.stderr)
                frame_errors.append({"index": i+1, "error": str(e)})
                generations.append({"step": f"frame_{i+1}", "kie_task_id": frame_task_ids[i], "kie_url": None, "status": "error"})

    successful_frames = [u for u in frame_kie_urls if u is not None]
    if not successful_frames:
        step_log["frames"] = {"status": "total_failure", "duration_s": round(time.time()-t, 1)}
        print(json.dumps({"status": "error", "run_id": run_id, "error": "Frame generation total failure", "step_log": step_log}))
        sys.exit(1)

    frames_status = "partial" if frame_errors else "success"
    step_log["frames"] = {"status": frames_status, "duration_s": round(time.time()-t, 1)}

    # ── VIDEOS ────────────────────────────────────────────────────────────────
    t = time.time()
    print(f"  [generate_video] submitting video tasks...", file=sys.stderr)
    clip_task_ids = [None, None, None]
    valid_pairs = []
    for i, frame_url in enumerate(frame_kie_urls):
        if frame_url is None:
            print(f"  [generate_video] skipping clip{i+1} — no frame", file=sys.stderr)
            continue
        task_id = kie_client.create_task("kling-2.6/image-to-video", {
            "prompt": video_prompts[i],
            "image_urls": [frame_url],
            "sound": True,
            "duration": "5",
            "aspect_ratio": "9:16",
        })
        clip_task_ids[i] = task_id
        valid_pairs.append((i, task_id))
        print(f"  [generate_video] clip{i+1} submitted: {task_id}", file=sys.stderr)

    def poll_clip(args_tuple):
        i, task_id = args_tuple
        dest = str(out_dir / f"video{i+1}.mp4")
        if Path(dest).exists() and Path(dest).stat().st_size > 0:
            print(f"  [generate_video] clip{i+1} already on disk", file=sys.stderr)
            return (i, dest, None)
        task_data = kie_client.poll_task(task_id)
        video_url = kie_client.extract_result_url(task_data)
        kie_client.download_file(video_url, dest)
        print(f"  [generate_video] clip{i+1} saved", file=sys.stderr)
        return (i, dest, video_url)

    clip_errors = []
    with ThreadPoolExecutor(max_workers=3) as executor:
        futures = {executor.submit(poll_clip, pair): pair[0] for pair in valid_pairs}
        for future in as_completed(futures):
            i = futures[future]
            try:
                idx, dest, url = future.result()
                video_paths[idx] = dest
                video_kie_urls[idx] = url
                generations.append({"step": f"clip_{idx+1}", "kie_task_id": clip_task_ids[idx], "kie_url": url, "status": "success"})
            except Exception as e:
                print(f"  [generate_video] clip{i+1} FAILED: {e}", file=sys.stderr)
                clip_errors.append({"index": i+1, "error": str(e)})
                generations.append({"step": f"clip_{i+1}", "kie_task_id": clip_task_ids[i], "kie_url": None, "status": "error"})

    # Recovery pass
    for i in range(3):
        p = out_dir / f"video{i+1}.mp4"
        if p.exists() and p.stat().st_size > 0 and video_paths[i] is None:
            print(f"  [generate_video] recovered clip{i+1} from disk", file=sys.stderr)
            video_paths[i] = str(p)

    available_clips = sorted([p for p in video_paths if p is not None], key=lambda x: int(Path(x).stem.replace("video", "")))
    if not available_clips:
        step_log["videos"] = {"status": "total_failure", "duration_s": round(time.time()-t, 1)}
        print(json.dumps({"status": "error", "run_id": run_id, "error": "Video generation total failure", "step_log": step_log}))
        sys.exit(1)

    clips_status = "partial" if clip_errors else "success"
    step_log["videos"] = {"status": clips_status, "duration_s": round(time.time()-t, 1)}

    # ── MERGE ─────────────────────────────────────────────────────────────────
    t = time.time()
    final_path = str(out_dir / "final.mp4")
    if len(available_clips) == 1:
        shutil.copy2(available_clips[0], final_path)
        step_log["merge"] = {"status": "passthrough", "duration_s": round(time.time()-t, 1)}
    else:
        video_merge.merge_videos(available_clips, final_path)
        step_log["merge"] = {"status": "success", "duration_s": round(time.time()-t, 1)}
    print(f"  [generate_video] merged → {final_path}", file=sys.stderr)

    overall = "partial" if (frame_errors or clip_errors) else "success"

    # Write run_log.json internally
    run_log = {
        "run_id": run_id,
        "finished_at": datetime.now(timezone.utc).isoformat(),
        "step_log": step_log,
    }
    with open(out_dir / "run_log.json", "w") as f:
        json.dump(run_log, f, indent=2)

    print(json.dumps({
        "status": overall,
        "run_id": run_id,
        "final_path": final_path,
        "frame_paths": [str(out_dir / f"frame{i+1}.png") if frame_kie_urls[i] else None for i in range(3)],
        "clip_paths": video_paths,
        "step_log": step_log,
        "generations": generations,
    }))
    sys.exit(0)


if __name__ == "__main__":
    main()
