#!/usr/bin/env python3
"""
TikTok UGC Video Automation Pipeline
Usage:
  python src/pipeline.py                          # random product from data/
  python src/pipeline.py --input data/B0869BPD69.json
"""
import sys
import os
import json
import argparse
import random
import time
import uuid
import shutil
from pathlib import Path
from datetime import datetime, timezone
from concurrent.futures import ThreadPoolExecutor, as_completed

# Ensure src/ is importable regardless of cwd
sys.path.insert(0, str(Path(__file__).resolve().parent))

from dotenv import load_dotenv
load_dotenv(Path(__file__).resolve().parent.parent.parent / ".env")

import kie_client
import gpt_prompts
import video_merge
import tiktok_mock
import tts

ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / "data"
RESULTS_DIR = ROOT / "results"


# ── helpers ──────────────────────────────────────────────────────────────────

def log_step(log: dict, step: str, status: str, start: float, **details):
    log[step] = {
        "status": status,
        "duration_s": round(time.time() - start, 1),
        **details,
    }


def load_product(path: str) -> dict:
    with open(path) as f:
        return json.load(f)


def section(title: str):
    print(f"\n{'='*60}")
    print(f"  {title}")
    print(f"{'='*60}")


# ── pipeline steps ────────────────────────────────────────────────────────────

def step_generate_prompts(product: dict, log: dict) -> dict:
    section("STEP 2 — GPT-5 Nano: generate prompts")
    t = time.time()
    prompts = gpt_prompts.generate_prompts(product)

    print(f"\n  ── persona_prompt ──────────────────────────────────────")
    print(f"  {prompts['persona_prompt']}")
    for i, sp in enumerate(prompts["scene_prompts"], 1):
        print(f"\n  ── scene_prompt[{i}] ─────────────────────────────────")
        print(f"  {sp}")
    for i, vp in enumerate(prompts["video_prompts"], 1):
        print(f"\n  ── video_prompt[{i}] ─────────────────────────────────")
        print(f"  {vp}")
    print(f"\n  ── voiceover_script ────────────────────────────────────")
    print(f"  {prompts['voiceover_script']}")

    log_step(log, "step2_prompts", "success", t,
             persona_prompt=prompts["persona_prompt"],
             scene_prompts=prompts["scene_prompts"],
             video_prompts=prompts["video_prompts"],
             voiceover_script=prompts["voiceover_script"])
    return prompts


def step_generate_avatar(prompts, out_dir, log, avatar_mode="ai-generated", avatar_id=None) -> str:
    section("STEP 3 — Nano Banana Pro: avatar face")
    t = time.time()

    if avatar_mode == "avatar-id":
        print(f"  [step3] SKIPPED — using provided avatar-id: {avatar_id}")
        log_step(log, "step3_avatar", "skipped", t, mode="avatar-id", kie_url=avatar_id)
        return avatar_id

    print(f"  [step3] prompt → {prompts['persona_prompt']}")
    task_id = kie_client.create_task("nano-banana-pro", {
        "prompt": prompts["persona_prompt"],
        "image_input": [],
        "aspect_ratio": "9:16",
        "resolution": "1K",
        "output_format": "png",
    })
    task_data = kie_client.poll_task(task_id)
    avatar_kie_url = kie_client.extract_result_url(task_data)
    log_step(log, "step3_avatar", "attempted", t, task_id=task_id, kie_url=avatar_kie_url,
             prompt=prompts["persona_prompt"])
    kie_client.download_file(avatar_kie_url, str(out_dir / "avatar.png"))
    print(f"  [step3] avatar saved → {out_dir / 'avatar.png'}")
    log["step3_avatar"]["status"] = "success"
    return avatar_kie_url


def step_generate_first_frame(prompts: dict, product: dict, avatar_kie_url: str, out_dir: Path, log: dict) -> str:
    section("STEP 4 — Nano Banana Pro: UGC scene frame")
    t = time.time()
    product_images = product.get("images", [])[:2]
    image_input = [avatar_kie_url] + product_images
    print(f"  [step4] scene_prompt[0] → {prompts['scene_prompts'][0]}")
    print(f"  [step4] image_input: avatar + {len(product_images)} product image(s)")

    task_id = kie_client.create_task("nano-banana-pro", {
        "prompt": prompts["scene_prompts"][0],
        "image_input": image_input,
        "aspect_ratio": "9:16",
        "resolution": "1K",
        "output_format": "png",
    })
    task_data = kie_client.poll_task(task_id)
    frame_kie_url = kie_client.extract_result_url(task_data)
    log_step(log, "step4_frame", "attempted", t, task_id=task_id, kie_url=frame_kie_url,
             prompt=prompts["scene_prompts"][0], image_input_count=len(image_input))
    kie_client.download_file(frame_kie_url, str(out_dir / "frame1.png"))
    print(f"  [step4] frame1 saved → {out_dir / 'frame1.png'}")
    log["step4_frame"]["status"] = "success"
    return frame_kie_url


def step_generate_audio(prompts: dict, out_dir: Path, log: dict) -> str:
    section("STEP 5 — OpenAI TTS: generate voiceover audio")
    t = time.time()
    voice = prompts.get("persona_metadata", {}).get("voice", "nova")
    print(f"  [step5] voice={voice}")
    print(f"  [step5] script → {prompts['voiceover_script']}")
    audio_bytes = tts.generate_audio(prompts["voiceover_script"], voice=voice)
    (out_dir / "voiceover.mp3").write_bytes(audio_bytes)
    print(f"  [step5] voiceover saved → {out_dir / 'voiceover.mp3'} ({len(audio_bytes)//1024}KB)")
    cdn_url = kie_client.upload_stream(audio_bytes, "tts", f"tts_{uuid.uuid4().hex[:8]}.mp3")
    log_step(log, "step5_audio", "success", t, cdn_url=cdn_url, voice=voice,
             script=prompts["voiceover_script"])
    return cdn_url


def step_generate_avatar_video(prompts: dict, scene_kie_url: str, audio_cdn_url: str, out_dir: Path, log: dict) -> list:
    section("STEP 6 — Kling Avatar Standard: lip-synced 10s video")
    t = time.time()
    print(f"  [step6] scene_frame → {scene_kie_url}")
    print(f"  [step6] audio       → {audio_cdn_url}")
    print(f"  [step6] video_prompt[0] → {prompts['video_prompts'][0]}")

    task_id = kie_client.create_task("kling/ai-avatar-standard", {
        "image_url": scene_kie_url,
        "audio_url": audio_cdn_url,
        "prompt": prompts["video_prompts"][0],
    })
    print(f"  [step6] submitted → taskId={task_id}")
    log_step(log, "step6_videos", "submitted", t, task_ids=[task_id], mode="avatar",
             scene_kie_url=scene_kie_url, audio_cdn_url=audio_cdn_url,
             prompt=prompts["video_prompts"][0])

    dest = str(out_dir / "video1.mp4")
    try:
        task_data = kie_client.poll_task(task_id)
        video_url = kie_client.extract_result_url(task_data)
        kie_client.download_file(video_url, dest)
        print(f"  [step6] video1 saved → {dest}")
        log["step6_videos"]["status"] = "success"
        log["step6_videos"]["kie_urls"] = [video_url]
    except Exception as e:
        log["step6_videos"]["status"] = "error"
        log["step6_videos"]["error"] = str(e)
        raise

    return [dest]


def step_generate_frames(prompts: dict, product: dict, avatar_kie_url: str, out_dir: Path, log: dict) -> list:
    section("STEP 4 — Nano Banana Pro: 3 scene frames")
    t = time.time()
    product_images = product.get("images", [])[:2]
    frame_kie_urls = []
    task_ids = []

    for i in range(3):
        print(f"\n  [step4] frame {i+1}/3")
        image_input = [avatar_kie_url] + product_images  # avatar + up to 2 product images
        task_id = kie_client.create_task("nano-banana-pro", {
            "prompt": prompts["scene_prompts"][i],
            "image_input": image_input,
            "aspect_ratio": "9:16",
            "resolution": "1K",
            "output_format": "png",
        })
        task_ids.append(task_id)
        task_data = kie_client.poll_task(task_id)
        frame_url = kie_client.extract_result_url(task_data)
        frame_kie_urls.append(frame_url)
        # Pre-log before download so task_ids/urls survive a download failure
        log_step(log, "step4_frames", "attempted", t, task_ids=task_ids, kie_urls=frame_kie_urls)
        kie_client.download_file(frame_url, str(out_dir / f"frame{i+1}.png"))
        print(f"  [step4] frame{i+1} saved → {out_dir / f'frame{i+1}.png'}")

    log["step4_frames"]["status"] = "success"
    return frame_kie_urls


def step_generate_frames_concurrent(prompts: dict, product: dict, avatar_kie_url: str, out_dir: Path, log: dict) -> list:
    section("STEP 4 — Nano Banana Pro: 3 scene frames (concurrent)")
    t = time.time()
    product_images = product.get("images", [])[:2]

    # Submit all 3 tasks on main thread
    task_ids = []
    for i in range(3):
        image_input = [avatar_kie_url] + product_images
        task_id = kie_client.create_task("nano-banana-pro", {
            "prompt": prompts["scene_prompts"][i],
            "image_input": image_input,
            "aspect_ratio": "9:16",
            "resolution": "1K",
            "output_format": "png",
        })
        task_ids.append(task_id)
        print(f"  [step4] submitted frame {i+1}/3 → taskId={task_id}")

    log_step(log, "step4_frames", "submitted", t, task_ids=task_ids)

    def poll_and_download(args):
        index, task_id = args
        dest = str(out_dir / f"frame{index+1}.png")
        task_data = kie_client.poll_task(task_id)
        kie_url = kie_client.extract_result_url(task_data)
        kie_client.download_file(kie_url, dest)
        print(f"  [step4] frame{index+1} saved → {dest}")
        return (index, kie_url)

    frame_kie_urls = [None] * 3
    errors = []

    with ThreadPoolExecutor(max_workers=3) as executor:
        futures = {executor.submit(poll_and_download, (i, tid)): i
                   for i, tid in enumerate(task_ids)}
        for future in as_completed(futures):
            i = futures[future]
            try:
                idx, kie_url = future.result()
                frame_kie_urls[idx] = kie_url
            except Exception as e:
                print(f"  [step4] WARNING: frame{i+1} failed — {e}")
                errors.append({"index": i+1, "task_id": task_ids[i], "error": str(e)})

    successful_urls = [u for u in frame_kie_urls if u is not None]
    if not successful_urls:
        log_step(log, "step4_frames", "total_failure", t, task_ids=task_ids, errors=errors)
        raise RuntimeError("Step 4 total failure: no frames generated")

    status = "partial" if errors else "success"
    log["step4_frames"]["status"] = status
    log["step4_frames"]["kie_urls"] = frame_kie_urls
    log["step4_frames"]["errors"] = errors
    return frame_kie_urls


def step_generate_video_single(prompts: dict, avatar_kie_url: str, out_dir: Path, log: dict) -> list:
    section("STEP 5 — Kling 2.6: single 10s video from avatar")
    t = time.time()

    task_id = kie_client.create_task("kling-2.6/image-to-video", {
        "prompt": prompts["video_prompts"][0],
        "image_urls": [avatar_kie_url],
        "sound": True,
        "duration": "10",
        "aspect_ratio": "9:16",
    })
    print(f"  [step5] submitted single video task → taskId={task_id}")
    log_step(log, "step5_videos", "submitted", t, task_ids=[task_id], mode="single")

    dest = str(out_dir / "video1.mp4")
    try:
        task_data = kie_client.poll_task(task_id)
        video_url = kie_client.extract_result_url(task_data)
        kie_client.download_file(video_url, dest)
        print(f"  [step5] video1 saved → {dest}")
        log["step5_videos"]["status"] = "success"
        log["step5_videos"]["kie_urls"] = [video_url]
    except Exception as e:
        log["step5_videos"]["status"] = "error"
        log["step5_videos"]["error"] = str(e)
        raise

    return [dest]


def step_generate_videos_concurrent(prompts: dict, frame_kie_urls: list, out_dir: Path, log: dict) -> list:
    section("STEP 5 — Kling 2.6: 3 videos (concurrent poll)")
    t = time.time()

    task_ids = []
    valid_pairs = []
    for i, frame_url in enumerate(frame_kie_urls):
        if frame_url is None:
            print(f"  [step5] skipping video{i+1} — no frame available")
            task_ids.append(None)
            continue
        task_id = kie_client.create_task("kling-2.6/image-to-video", {
            "prompt": prompts["video_prompts"][i],
            "image_urls": [frame_url],
            "sound": True,
            "duration": "5",
            "aspect_ratio": "9:16",
        })
        task_ids.append(task_id)
        valid_pairs.append((i, task_id))
        print(f"  [step5] submitted video{i+1}/3 → taskId={task_id}")

    log_step(log, "step5_videos", "submitted", t, task_ids=task_ids)

    def poll_and_download(args):
        index, task_id = args
        dest = str(out_dir / f"video{index+1}.mp4")
        if Path(dest).exists() and Path(dest).stat().st_size > 0:
            print(f"  [step5] video{index+1} already on disk, skipping")
            return (index, dest, None)
        task_data = kie_client.poll_task(task_id)
        video_url = kie_client.extract_result_url(task_data)
        kie_client.download_file(video_url, dest)
        print(f"  [step5] video{index+1} saved → {dest}")
        return (index, dest, video_url)

    video_paths = [None] * 3
    video_kie_urls = [None] * 3
    errors = []

    with ThreadPoolExecutor(max_workers=3) as executor:
        futures = {executor.submit(poll_and_download, pair): pair[0]
                   for pair in valid_pairs}
        for future in as_completed(futures):
            i = futures[future]
            try:
                idx, dest, url = future.result()
                video_paths[idx] = dest
                video_kie_urls[idx] = url
            except Exception as e:
                print(f"  [step5] WARNING: video{i+1} failed — {e}")
                errors.append({"index": i+1, "task_id": task_ids[i], "error": str(e)})

    # Recovery pass
    for i in range(3):
        p = out_dir / f"video{i+1}.mp4"
        if p.exists() and video_paths[i] is None:
            print(f"  [step5] recovered video{i+1} from disk")
            video_paths[i] = str(p)

    final_paths = [p for p in video_paths if p is not None]
    if not final_paths:
        log_step(log, "step5_videos", "total_failure", t, task_ids=task_ids, errors=errors)
        raise RuntimeError("Step 5 total failure: no videos downloaded or recovered")

    status = "partial" if errors else "success"
    log["step5_videos"]["status"] = status
    log["step5_videos"]["kie_urls"] = video_kie_urls
    log["step5_videos"]["errors"] = errors
    return sorted(final_paths, key=lambda x: int(Path(x).stem.replace("video", "")))


def step_generate_videos(prompts: dict, frame_kie_urls: list, out_dir: Path, log: dict) -> list:
    section("STEP 5 — Kling 2.6: generate 3 videos (submit-then-poll)")
    t = time.time()

    # Submit all 3 tasks first
    print("  [step5] submitting 3 kling tasks...")
    task_ids = []
    for i in range(3):
        task_id = kie_client.create_task("kling-2.6/image-to-video", {
            "prompt": prompts["video_prompts"][i],
            "image_urls": [frame_kie_urls[i]],
            "sound": True,
            "duration": "5",
            "aspect_ratio": "9:16",
        })
        task_ids.append(task_id)

    # Poll each to completion; tolerate per-video download failures
    video_paths = []
    video_kie_urls = []
    download_errors = []
    for i, task_id in enumerate(task_ids):
        dest = str(out_dir / f"video{i+1}.mp4")
        # If a previous run already downloaded this file, skip re-download
        if Path(dest).exists() and Path(dest).stat().st_size > 0:
            print(f"  [step5] video{i+1} already on disk, skipping download")
            video_paths.append(dest)
            video_kie_urls.append(None)
            continue
        print(f"\n  [step5] polling video {i+1}/3 (taskId={task_id})")
        try:
            task_data = kie_client.poll_task(task_id)
            video_url = kie_client.extract_result_url(task_data)
            video_kie_urls.append(video_url)
            kie_client.download_file(video_url, dest)
            video_paths.append(dest)
            print(f"  [step5] video{i+1} saved → {dest}")
        except Exception as e:
            print(f"  [step5] WARNING: video{i+1} download failed — {e}")
            download_errors.append({"index": i + 1, "task_id": task_id, "error": str(e)})
            video_kie_urls.append(None)

    # Recovery: check disk for any videos that landed (covers mid-run interruptions)
    recovered = []
    for i in range(3):
        p = out_dir / f"video{i+1}.mp4"
        if p.exists() and str(p) not in video_paths:
            print(f"  [step5] recovered video{i+1} from disk")
            recovered.append(str(p))
    video_paths = sorted(set(video_paths) | set(recovered), key=lambda x: int(Path(x).stem.replace("video", "")))

    if not video_paths:
        log_step(log, "step5_videos", "total_failure", t,
                 task_ids=task_ids, errors=download_errors)
        raise RuntimeError("Step 5 total failure: no videos downloaded or recovered")

    if download_errors or recovered:
        status = "partial"
        print(f"  [step5] partial result: {len(video_paths)}/3 videos available")
    else:
        status = "success"

    log_step(log, "step5_videos", status, t,
             task_ids=task_ids, kie_urls=video_kie_urls,
             recovered=len(recovered), errors=download_errors)
    return video_paths


def step_merge_videos(video_paths: list, out_dir: Path, log: dict) -> str:
    section("STEP 7 — FFmpeg: merge clips")
    t = time.time()
    final_path = str(out_dir / "final.mp4")

    if len(video_paths) == 1:
        shutil.copy2(video_paths[0], final_path)
        print(f"  [step7] single clip passthrough → {final_path}")
        log_step(log, "step7_merge", "passthrough", t, output=final_path, clip_count=1)
    else:
        video_merge.merge_videos(video_paths, final_path)
        log_step(log, "step7_merge", "success", t, output=final_path, clip_count=len(video_paths))

    return final_path


def step_tiktok_upload(product: dict, final_path: str, out_dir: Path, log: dict):
    section("STEP 8 — TikTok: mock upload")
    t = time.time()
    result = tiktok_mock.mock_upload(product, final_path, str(out_dir))
    log_step(log, "step8_tiktok", "success", t, **{k: v for k, v in result.items() if k != "status"})


# ── main ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="TikTok UGC Video Automation Pipeline")
    parser.add_argument("--input", help="Relative path to product JSON (default: random from data/)")
    parser.add_argument(
        "--concurrent",
        action=argparse.BooleanOptionalAction,
        default=True,
        help="Run frame/video generation concurrently (default: True; disable with --no-concurrent)"
    )
    parser.add_argument(
        "--avatar-mode",
        choices=["ai-generated", "avatar-id"],
        default="ai-generated",
        dest="avatar_mode",
    )
    parser.add_argument(
        "--avatar-id",
        default=None,
        dest="avatar_id",
        metavar="URL",
        help="KIE image URL to use as avatar (required when --avatar-mode=avatar-id)"
    )
    parser.add_argument(
        "--video-mode",
        choices=["avatar", "image-to-video"],
        default="avatar",
        dest="video_mode",
        help="Single-clip video mode: avatar (lip-synced TTS) or image-to-video (no audio). Ignored when --multi-clip is set."
    )
    parser.add_argument(
        "--multi-clip",
        action="store_true",
        default=False,
        dest="multi_clip",
        help="Legacy 3x5s multi-clip mode (default: single 10s clip from avatar)"
    )
    args = parser.parse_args()

    # Validate
    if args.avatar_mode == "avatar-id" and not args.avatar_id:
        parser.error("--avatar-id URL is required when --avatar-mode=avatar-id")

    # Resolve input
    if args.input:
        input_path = ROOT / args.input
    else:
        json_files = list(DATA_DIR.glob("*.json"))
        if not json_files:
            print("ERROR: No JSON files found in data/")
            sys.exit(1)
        input_path = random.choice(json_files)

    run_id = str(uuid.uuid4())[:8]
    out_dir = RESULTS_DIR / run_id
    out_dir.mkdir(parents=True, exist_ok=True)

    log = {
        "run_id": run_id,
        "started_at": datetime.now(timezone.utc).isoformat(),
        "input_file": str(input_path),
        "output_dir": str(out_dir),
    }

    print(f"\n{'#'*60}")
    print(f"  TikTok UGC Pipeline — run_id: {run_id}")
    print(f"  input  : {input_path}")
    print(f"  output : {out_dir}")
    print(f"{'#'*60}")

    try:
        # Step 1 — Ingest
        section("STEP 1 — Ingest product data")
        t = time.time()
        product = load_product(str(input_path))
        print(f"  ASIN  : {product.get('asin')}")
        print(f"  Title : {product.get('title', '')[:80]}")
        print(f"  Brand : {product.get('brand')}")
        print(f"  Images: {len(product.get('images', []))}")
        print(f"  Reviews: {len(product.get('reviews', []))}")
        log_step(log, "step1_ingest", "success", t, asin=product.get("asin"))

        # Steps 2–7
        prompts = step_generate_prompts(product, log)
        avatar_kie_url = step_generate_avatar(prompts, out_dir, log,
                                               avatar_mode=args.avatar_mode,
                                               avatar_id=args.avatar_id)

        if args.multi_clip:
            if args.concurrent:
                frame_kie_urls = step_generate_frames_concurrent(prompts, product, avatar_kie_url, out_dir, log)
                video_paths = step_generate_videos_concurrent(prompts, frame_kie_urls, out_dir, log)
            else:
                frame_kie_urls = step_generate_frames(prompts, product, avatar_kie_url, out_dir, log)
                video_paths = step_generate_videos(prompts, frame_kie_urls, out_dir, log)
        elif args.video_mode == "avatar":
            scene_kie_url = step_generate_first_frame(prompts, product, avatar_kie_url, out_dir, log)
            audio_cdn_url = step_generate_audio(prompts, out_dir, log)
            video_paths = step_generate_avatar_video(prompts, scene_kie_url, audio_cdn_url, out_dir, log)
        else:
            # image-to-video: original single 10s clip, no audio
            video_paths = step_generate_video_single(prompts, avatar_kie_url, out_dir, log)

        final_path = step_merge_videos(video_paths, out_dir, log)
        step_tiktok_upload(product, final_path, out_dir, log)

        log["status"] = "success"
        log["finished_at"] = datetime.now(timezone.utc).isoformat()

        print(f"\n{'#'*60}")
        print(f"  PIPELINE COMPLETE")
        print(f"  output → {out_dir}/")
        print(f"{'#'*60}\n")

    except Exception as e:
        log["status"] = "error"
        log["error"] = str(e)
        log["finished_at"] = datetime.now(timezone.utc).isoformat()
        print(f"\n[ERROR] {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
    finally:
        log_path = out_dir / "run_log.json"
        with open(log_path, "w") as f:
            json.dump(log, f, indent=2)
        print(f"  run_log → {log_path}")


if __name__ == "__main__":
    main()
