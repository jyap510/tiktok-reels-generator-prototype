#!/usr/bin/env python3
"""
WebShare API docs scraper — Playwright edition.
BFS crawls apidocs.webshare.io with a headless browser (handles JS-rendered SPAs).
Extracts article content, converts HTML → markdown, mirrors path into docs/webshare/.

Dependencies:
  pip install playwright beautifulsoup4 html2text
  playwright install chromium
"""

import asyncio
import re
import sys
import time
from collections import deque
from pathlib import Path
from urllib.parse import urljoin, urlparse

import html2text
from bs4 import BeautifulSoup
from playwright.async_api import async_playwright, Page

BASE_URL = "https://apidocs.webshare.io"
OUT_DIR = Path(__file__).parent.parent / "docs" / "webshare"

REQUEST_DELAY = 0.5   # seconds between page loads
NAV_TIMEOUT  = 20_000 # ms


# ---------------------------------------------------------------------------
# Page fetch (Playwright)
# ---------------------------------------------------------------------------

async def fetch_page(page: Page, url: str) -> str | None:
    try:
        await page.goto(url, wait_until="networkidle", timeout=NAV_TIMEOUT)
        return await page.content()
    except Exception as e:
        print(f"  Error loading {url}: {e}")
        return None


# ---------------------------------------------------------------------------
# Link extraction
# ---------------------------------------------------------------------------

def extract_internal_links(html: str, current_url: str) -> list[str]:
    soup = BeautifulSoup(html, "html.parser")
    links = []
    for a in soup.find_all("a", href=True):
        href = a["href"].strip()
        absolute = urljoin(current_url, href).split("#")[0].rstrip("/")
        parsed = urlparse(absolute)
        if parsed.netloc == "apidocs.webshare.io" and parsed.scheme in ("http", "https"):
            links.append(absolute)
    return links


# ---------------------------------------------------------------------------
# Content extraction → markdown
# ---------------------------------------------------------------------------

def extract_markdown(html: str, page_url: str) -> str:
    soup = BeautifulSoup(html, "html.parser")

    article = (
        soup.find("main")
        or soup.find(class_="page-body")
        or soup.find(class_=re.compile(r"gitbook-root|page-wrapper|content-area|redoc-section"))
        or soup.find("article")
        or soup.find("body")
    )

    if article is None:
        return f"<!-- Could not extract content from {page_url} -->\n"

    for tag in article.find_all(["nav", "footer", "header", "aside"]):
        tag.decompose()
    for cls in [
        "sidebar", "navigation", "breadcrumb", "breadcrumbs",
        "pagination", "edit-on-github", "table-of-contents",
        re.compile(r"nav|sidebar|toc|breadcrumb|pagination"),
    ]:
        for el in article.find_all(class_=cls):
            el.decompose()

    converter = html2text.HTML2Text()
    converter.ignore_links = False
    converter.ignore_images = True
    converter.body_width = 0
    converter.protect_links = True
    converter.unicode_snob = True

    md = converter.handle(str(article))
    return f"<!-- source: {page_url} -->\n\n{md}"


# ---------------------------------------------------------------------------
# Path helpers
# ---------------------------------------------------------------------------

def url_to_local_path(url: str) -> Path:
    parsed = urlparse(url)
    rel = parsed.path.strip("/")
    if not rel:
        rel = "index"
    return OUT_DIR / (rel + ".md")


def save(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


# ---------------------------------------------------------------------------
# BFS crawl
# ---------------------------------------------------------------------------

async def crawl(page: Page) -> list[tuple[str, str]]:
    """BFS over internal links. Returns list of (url, html)."""
    visited: set[str] = set()
    queue: deque[str] = deque([BASE_URL])
    results: list[tuple[str, str]] = []

    while queue:
        url = queue.popleft()
        url = url.rstrip("/") or url
        if url in visited:
            continue
        visited.add(url)

        print(f"  Crawling: {url}")
        html = await fetch_page(page, url)
        await asyncio.sleep(REQUEST_DELAY)

        if html is None:
            continue

        results.append((url, html))

        for link in extract_internal_links(html, url):
            norm = link.rstrip("/") or link
            if norm not in visited:
                queue.append(norm)

    return results


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

async def main():
    async with async_playwright() as pw:
        browser = await pw.chromium.launch(headless=True)
        page = await browser.new_page()

        print(f"Starting BFS crawl from: {BASE_URL}\n")
        pages = await crawl(page)
        await browser.close()

    print(f"\nCrawled {len(pages)} pages. Saving...\n")

    ok = 0
    for url, html in pages:
        local = url_to_local_path(url)
        rel = local.relative_to(OUT_DIR.parent.parent)
        print(f"  {rel}")
        md = extract_markdown(html, url)
        save(local, md)
        ok += 1

    print(f"\nDone. {ok} saved.")
    print(f"Output: {OUT_DIR}")


if __name__ == "__main__":
    asyncio.run(main())
