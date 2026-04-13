#!/usr/bin/env python3
"""
GoLogin docs scraper.
Reads llms.txt index, fetches every .md URL, mirrors path into docs/gologin/.
"""

import os
import re
import time
import sys
from pathlib import Path
from urllib.parse import urlparse

import requests

BASE_URL = "https://gologin.com"
LLMS_TXT = f"{BASE_URL}/docs/llms.txt"
OUT_DIR = Path(__file__).parent.parent / "docs" / "gologin"

SESSION = requests.Session()
SESSION.headers["User-Agent"] = "docs-scraper/1.0"

RETRY_ATTEMPTS = 3
RETRY_DELAY = 2  # seconds between retries
REQUEST_DELAY = 0.3  # polite pause between requests


def fetch(url: str) -> str | None:
    for attempt in range(RETRY_ATTEMPTS):
        try:
            r = SESSION.get(url, timeout=15)
            if r.status_code == 200:
                return r.text
            if r.status_code == 404:
                print(f"  404 {url}")
                return None
            print(f"  HTTP {r.status_code} on {url} (attempt {attempt + 1})")
        except requests.RequestException as e:
            print(f"  Error fetching {url}: {e} (attempt {attempt + 1})")
        if attempt < RETRY_ATTEMPTS - 1:
            time.sleep(RETRY_DELAY)
    return None


def parse_md_urls(llms_text: str) -> list[tuple[str, str]]:
    """Return list of (title, md_url) from llms.txt markdown link lines."""
    pattern = re.compile(r'\[([^\]]+)\]\((https://gologin\.com/docs/[^\)]+\.md)\)')
    return pattern.findall(llms_text)


def url_to_local_path(md_url: str) -> Path:
    """Mirror URL path under OUT_DIR. Strip the /docs/ prefix."""
    parsed = urlparse(md_url)
    # path is like /docs/api-reference/introduction/quickstart.md
    rel = parsed.path.lstrip("/")          # docs/api-reference/...
    rel = re.sub(r'^docs/', '', rel)       # api-reference/...
    return OUT_DIR / rel


def save(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def main():
    print(f"Fetching index: {LLMS_TXT}")
    llms_text = fetch(LLMS_TXT)
    if not llms_text:
        print("Failed to fetch llms.txt — aborting.")
        sys.exit(1)

    entries = parse_md_urls(llms_text)
    print(f"Found {len(entries)} pages.\n")

    ok = skipped = failed = 0

    for title, md_url in entries:
        local = url_to_local_path(md_url)
        print(f"[{ok + skipped + failed + 1}/{len(entries)}] {title}")
        print(f"  -> {local.relative_to(OUT_DIR.parent.parent)}")

        content = fetch(md_url)
        time.sleep(REQUEST_DELAY)

        if content is None:
            failed += 1
            continue

        save(local, content)
        ok += 1

    print(f"\nDone. {ok} saved, {skipped} skipped, {failed} failed.")
    print(f"Output: {OUT_DIR}")


if __name__ == "__main__":
    main()
