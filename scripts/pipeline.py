#!/usr/bin/env python3
"""
TikTok UGC Video Automation Pipeline
Usage:
  python scripts/pipeline.py                          # random product from data/
  python scripts/pipeline.py --input data/B0869BPD69.json
"""
import sys
import os
import json
import argparse
import random
import time
import uuid
from pathlib import Path
from datetime import datetime, timezone

# Ensure scripts/ is importable regardless of cwd
sys.path.insert(0, str(Path(__file__).resolve().parent))

from dotenv import load_dotenv
load_dotenv(Path(__file__).resolve().parent.parent / ".env")

import kie_client
import gpt_prompts
import video_merge
import tiktok_mock

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
    print(f"\n  persona_prompt  : {prompts['persona_prompt'][:100]}...")
    for i, sp in enumerate(prompts["scene_prompts"], 1):
        print(f"  scene_prompt[{i}] : {sp[:80]}...")
    for i, vp in enumerate(prompts["video_prompts"], 1):
        print(f"  video_prompt[{i}] : {vp[:80]}...")
    log_step(log, "step2_prompts", "success", t)
    return prompts


def step_generate_avatar(prompts: dict, out_dir: Path, log: dict) -> str:
    section("STEP 3 — Nano Banana Pro: avatar face")
    t = time.time()
    task_id = kie_client.create_task("nano-banana-pro", {
        "prompt": prompts["persona_prompt"],
        "image_input": [],
        "aspect_ratio": "1:1",
        "resolution": "1K",
        "output_format": "png",
    })
    task_data = kie_client.poll_task(task_id)
    avatar_kie_url = kie_client.extract_result_url(task_data)
    kie_client.download_file(avatar_kie_url, str(out_dir / "avatar.png"))
    print(f"  [step3] avatar saved → {out_dir / 'avatar.png'}")
    log_step(log, "step3_avatar", "success", t, task_id=task_id, kie_url=avatar_kie_url)
    return avatar_kie_url


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
        kie_client.download_file(frame_url, str(out_dir / f"frame{i+1}.png"))
        print(f"  [step4] frame{i+1} saved → {out_dir / f'frame{i+1}.png'}")

    log_step(log, "step4_frames", "success", t, task_ids=task_ids, kie_urls=frame_kie_urls)
    return frame_kie_urls


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

    # Poll each to completion
    video_paths = []
    video_kie_urls = []
    for i, task_id in enumerate(task_ids):
        print(f"\n  [step5] polling video {i+1}/3 (taskId={task_id})")
        task_data = kie_client.poll_task(task_id)
        video_url = kie_client.extract_result_url(task_data)
        video_kie_urls.append(video_url)
        dest = str(out_dir / f"video{i+1}.mp4")
        kie_client.download_file(video_url, dest)
        video_paths.append(dest)
        print(f"  [step5] video{i+1} saved → {dest}")

    log_step(log, "step5_videos", "success", t, task_ids=task_ids, kie_urls=video_kie_urls)
    return video_paths


def step_merge_videos(video_paths: list, out_dir: Path, log: dict) -> str:
    section("STEP 6 — FFmpeg: merge 3 clips")
    t = time.time()
    final_path = str(out_dir / "final.mp4")
    video_merge.merge_videos(video_paths, final_path)
    log_step(log, "step6_merge", "success", t, output=final_path)
    return final_path


def step_tiktok_upload(product: dict, final_path: str, out_dir: Path, log: dict):
    section("STEP 7 — TikTok: mock upload")
    t = time.time()
    result = tiktok_mock.mock_upload(product, final_path, str(out_dir))
    log_step(log, "step7_tiktok", "success", t, **{k: v for k, v in result.items() if k != "status"})


# ── main ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="TikTok UGC Video Automation Pipeline")
    parser.add_argument("--input", help="Relative path to product JSON (default: random from data/)")
    args = parser.parse_args()

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
        avatar_kie_url = step_generate_avatar(prompts, out_dir, log)
        frame_kie_urls = step_generate_frames(prompts, product, avatar_kie_url, out_dir, log)
        video_paths = step_generate_videos(prompts, frame_kie_urls, out_dir, log)
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
