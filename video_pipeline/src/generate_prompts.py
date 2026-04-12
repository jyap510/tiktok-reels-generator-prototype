#!/usr/bin/env python3
"""
Generate video prompts using GPT-5 Nano from product data.
Usage: python generate_prompts.py --asin <str> --title <str> --description <str>
       --images '<json_array>' --reviews '<json_array_of_strings>'
Stdout: single JSON line
"""
import sys
import os
import json
import argparse
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from dotenv import load_dotenv
load_dotenv(Path(__file__).resolve().parent.parent.parent / ".env")

import gpt_prompts


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--asin",        required=True)
    parser.add_argument("--title",       required=True)
    parser.add_argument("--description", default="")
    parser.add_argument("--images",      default="[]")
    parser.add_argument("--reviews",     default="[]")
    args = parser.parse_args()

    try:
        images = json.loads(args.images)
        review_strings = json.loads(args.reviews)
    except json.JSONDecodeError as e:
        print(json.dumps({"status": "error", "error": f"JSON parse error in --images or --reviews: {e}"}))
        sys.exit(1)

    product = {
        "asin": args.asin,
        "title": args.title,
        "brand": "",
        "description": args.description,
        "images": images,
        "reviews": [{"comment": c} for c in review_strings],
    }

    try:
        result = gpt_prompts.generate_prompts(product)

        # Inject profile_pic_prompt if GPT didn't return it
        if "profile_pic_prompt" not in result:
            first_sentence = result["persona_prompt"].split(".")[0] if result.get("persona_prompt") else ""
            result["profile_pic_prompt"] = (
                f"Professional social media profile photo. {first_sentence}. "
                "Confident, polished look. Clean neutral background. Square composition. "
                "Direct eye contact, warm natural lighting."
            )

        print(json.dumps({"status": "success", **result}))
        sys.exit(0)

    except Exception as e:
        print(f"  [generate_prompts] ERROR: {e}", file=sys.stderr)
        print(json.dumps({"status": "error", "error": str(e)}))
        sys.exit(1)


if __name__ == "__main__":
    main()
