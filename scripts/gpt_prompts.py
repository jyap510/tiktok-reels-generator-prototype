import os
import json
import requests
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent.parent / ".env")

OPENAI_BASE = "https://api.openai.com/v1"
MODEL = "gpt-5-nano"

_PROMPTS_DIR = Path(__file__).resolve().parent.parent / "prompts"

def _load_prompt(filename: str) -> str:
    return (_PROMPTS_DIR / filename).read_text(encoding="utf-8").strip()

# Loaded once at call time (allows editing prompts without restarting)
def _system_prompt() -> str:
    return _load_prompt("gpt_system.txt")

def _user_template() -> str:
    return _load_prompt("gpt_user.txt")


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
        return _extract_sdk_text(resp)
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
    print(f"  [gpt] raw response keys: {list(data.keys())}")
    if "output" in data:
        return _extract_output_text(data["output"])
    return data["choices"][0]["message"]["content"]


def _extract_sdk_text(resp) -> str:
    """Extract text from SDK response object. Scans output items for first with content."""
    for item in resp.output:
        content = getattr(item, "content", None)
        if not content:
            continue
        for block in content:
            text = getattr(block, "text", None)
            if text:
                return text
    raise RuntimeError(f"No text content found in SDK response output: {resp.output}")


def _extract_output_text(output: list) -> str:
    """Extract text from raw Responses API output array. Scans for first message with content."""
    print(f"  [gpt] output items: {[{k: v for k, v in item.items() if k != 'content'} for item in output]}")
    for item in output:
        content = item.get("content")
        if not content:
            continue
        for block in content:
            # block may be {"type": "output_text", "text": "..."} or {"type": "text", "text": "..."}
            text = block.get("text")
            if text:
                return text
    raise RuntimeError(f"No text content found in output: {output}")


def generate_prompts(product: dict) -> dict:
    """Generate persona, scene, and video prompts from product data using GPT-5 Nano."""
    reviews = product.get("reviews", [])
    review1 = reviews[0]["comment"][:120] if len(reviews) > 0 else "Great product!"
    review2 = reviews[1]["comment"][:120] if len(reviews) > 1 else "Highly recommend."

    user_msg = _user_template().format(
        title=product["title"][:120],
        brand=product["brand"],
        description=product.get("description", "")[:150],
        review1=review1,
        review2=review2,
    )

    messages = [
        {"role": "system", "content": _system_prompt()},
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
