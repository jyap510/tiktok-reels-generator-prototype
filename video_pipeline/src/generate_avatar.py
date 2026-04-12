#!/usr/bin/env python3
"""
Generate an avatar headshot using Nano Banana Pro.
Usage: python generate_avatar.py "<persona_prompt>" [--run-id <8char>] [--out-dir <abs_path>]
Stdout: single JSON line (success or error)
Stderr: all progress logs
"""
import sys
import os
import json
import argparse
import uuid
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from dotenv import load_dotenv
load_dotenv(Path(__file__).resolve().parent.parent.parent / ".env")

import kie_client


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("persona_prompt", help="Image generation prompt for the avatar headshot")
    parser.add_argument("--run-id", dest="run_id", default=None)
    parser.add_argument("--out-dir", dest="out_dir", default=None)
    args = parser.parse_args()

    run_id = args.run_id or uuid.uuid4().hex[:8]

    root = Path(__file__).resolve().parent.parent
    out_dir = Path(args.out_dir) if args.out_dir else (root / "results" / run_id)
    out_dir.mkdir(parents=True, exist_ok=True)

    try:
        print(f"  [generate_avatar] run_id={run_id}", file=sys.stderr)
        print(f"  [generate_avatar] prompt={args.persona_prompt[:80]}...", file=sys.stderr)

        task_id = kie_client.create_task("nano-banana-pro", {
            "prompt": args.persona_prompt,
            "image_input": [],
            "aspect_ratio": "9:16",
            "resolution": "1K",
            "output_format": "png",
        })
        print(f"  [generate_avatar] task submitted: {task_id}", file=sys.stderr)

        task_data = kie_client.poll_task(task_id)
        avatar_kie_url = kie_client.extract_result_url(task_data)
        print(f"  [generate_avatar] task complete, url={avatar_kie_url}", file=sys.stderr)

        avatar_path = out_dir / "avatar.png"
        kie_client.download_file(avatar_kie_url, str(avatar_path))
        print(f"  [generate_avatar] saved → {avatar_path}", file=sys.stderr)

        print(json.dumps({
            "status": "success",
            "run_id": run_id,
            "avatar_path": str(avatar_path),
            "avatar_kie_url": avatar_kie_url,
        }))
        sys.exit(0)

    except Exception as e:
        print(f"  [generate_avatar] ERROR: {e}", file=sys.stderr)
        print(json.dumps({
            "status": "error",
            "run_id": run_id,
            "error": str(e),
        }))
        sys.exit(1)


if __name__ == "__main__":
    main()
