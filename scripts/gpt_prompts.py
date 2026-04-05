import os
import json
import requests
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent.parent / ".env")

OPENAI_BASE = "https://api.openai.com/v1"
MODEL = "gpt-5-nano"

SYSTEM_PROMPT = """You are a UGC (user-generated content) creative director.
Given an Amazon product, generate prompts for a 3-part TikTok video featuring a relatable persona reviewing the product.
Respond ONLY with valid JSON (no markdown fences, no extra text) in this exact structure:
{
  "persona_prompt": "...",
  "scene_prompts": ["...", "...", "..."],
  "video_prompts": ["...", "...", "..."]
}

persona_prompt: A Nano Banana Pro image generation prompt for a neutral face portrait headshot of a realistic, relatable UGC creator. Plain white/neutral background, looking into camera, natural lighting. No props, no context, just the face.

scene_prompts: 3 Nano Banana Pro image generation prompts. Each scene is a 9:16 vertical first-frame still for a Kling video clip. Each frame should show the same persona (use the avatar face as reference) in a UGC setting naturally interacting with or near the product. Frames should feel like a cohesive 3-part story: intro → demonstration → reaction/CTA.

video_prompts: 3 Kling 2.6 video motion prompts (one per scene). Each describes subtle motion continuing from the first frame. They must feel cohesive when stitched: clip 1 flows into clip 2 flows into clip 3. Keep each under 100 words. No scene transitions described — just the motion within each clip."""

USER_TEMPLATE = """Product: {title}
Brand: {brand}
Description (excerpt): {description}
Top reviews:
- "{review1}"
- "{review2}"

Generate the prompts now."""


def _parse_json(text: str) -> dict:
    text = text.strip()
    # Strip markdown fences if present
    if text.startswith("```"):
        lines = text.split("\n")
        text = "\n".join(lines[1:-1] if lines[-1].strip() == "```" else lines[1:])
    return json.loads(text)


def _call_responses_api(messages: list) -> str:
    """Call OpenAI Responses API. Falls back to Chat Completions if needed."""
    key = os.environ.get("OPENAI_API_KEY")
    if not key:
        raise RuntimeError("OPENAI_API_KEY not set")

    headers = {"Authorization": f"Bearer {key}", "Content-Type": "application/json"}

    # Try Responses API first
    try:
        import openai
        client = openai.OpenAI(api_key=key)
        resp = client.responses.create(model=MODEL, input=messages)
        return resp.output[0].content[0].text
    except AttributeError:
        pass  # SDK too old, fall through to raw requests
    except Exception as e:
        print(f"  [gpt] Responses API error: {e}, falling back to raw HTTP")

    # Raw HTTP fallback — try Responses API endpoint
    payload = {"model": MODEL, "input": messages}
    r = requests.post(f"{OPENAI_BASE}/responses", json=payload, headers=headers, timeout=60)
    if r.status_code == 404:
        # Fall back to Chat Completions
        chat_messages = []
        for m in messages:
            if isinstance(m, dict):
                chat_messages.append(m)
            else:
                chat_messages.append({"role": "user", "content": str(m)})
        payload = {"model": MODEL, "messages": chat_messages}
        r = requests.post(f"{OPENAI_BASE}/chat/completions", json=payload, headers=headers, timeout=60)
    r.raise_for_status()
    data = r.json()
    # Handle both response shapes
    if "output" in data:
        return data["output"][0]["content"][0]["text"]
    return data["choices"][0]["message"]["content"]


def generate_prompts(product: dict) -> dict:
    """Generate persona, scene, and video prompts from product data using GPT-5 Nano."""
    reviews = product.get("reviews", [])
    review1 = reviews[0]["comment"][:120] if len(reviews) > 0 else "Great product!"
    review2 = reviews[1]["comment"][:120] if len(reviews) > 1 else "Highly recommend."

    user_msg = USER_TEMPLATE.format(
        title=product["title"][:120],
        brand=product["brand"],
        description=product.get("description", "")[:150],
        review1=review1,
        review2=review2,
    )

    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": user_msg},
    ]

    print(f"  [gpt] generating prompts for: {product['title'][:60]}...")
    raw = _call_responses_api(messages)
    print(f"  [gpt] raw response: {raw[:200]}...")

    # Parse with one retry
    try:
        result = _parse_json(raw)
    except json.JSONDecodeError:
        print("  [gpt] JSON parse failed, retrying API call...")
        raw = _call_responses_api(messages)
        result = _parse_json(raw)

    # Validate structure
    for key in ("persona_prompt", "scene_prompts", "video_prompts"):
        if key not in result:
            raise ValueError(f"Missing key '{key}' in GPT response: {result}")
    if len(result["scene_prompts"]) != 3 or len(result["video_prompts"]) != 3:
        raise ValueError(f"Expected 3 scene_prompts and 3 video_prompts, got: {result}")

    print("  [gpt] prompts generated OK")
    return result
