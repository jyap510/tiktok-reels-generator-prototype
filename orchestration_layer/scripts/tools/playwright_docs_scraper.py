#!/usr/bin/env python3
"""
Playwright docs scraper.
Reads sitemap.xml, fetches every stable /docs/ URL, extracts article content,
converts HTML → markdown, mirrors path into docs/playwright/.

Dependencies: requests, beautifulsoup4, html2text
  pip install requests beautifulsoup4 html2text
"""

import re
import sys
import time
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import urlparse

import requests
import html2text
from bs4 import BeautifulSoup

SITEMAP_URL = "https://playwright.dev/sitemap.xml"
BASE_URL = "https://playwright.dev"
OUT_DIR = Path(__file__).parent.parent / "docs" / "playwright"

SESSION = requests.Session()
SESSION.headers["User-Agent"] = "docs-scraper/1.0"

RETRY_ATTEMPTS = 3
RETRY_DELAY = 2
REQUEST_DELAY = 0.4  # polite pause


def fetch(url: str) -> str | None:
    for attempt in range(RETRY_ATTEMPTS):
        try:
            r = SESSION.get(url, timeout=20)
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


def parse_sitemap(xml_text: str) -> list[str]:
    """Return stable /docs/ URLs (excludes /docs/next/ preview versions)."""
    root = ET.fromstring(xml_text)
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    urls = []
    for loc in root.findall(".//sm:loc", ns):
        url = loc.text.strip()
        parsed = urlparse(url)
        # keep only stable docs: /docs/ but not /docs/next/
        if re.match(r"^/docs/(?!next/)", parsed.path):
            urls.append(url)
    return sorted(set(urls))


def extract_markdown(html: str, page_url: str) -> str:
    """Extract main article content and convert to markdown."""
    soup = BeautifulSoup(html, "html.parser")

    # Docusaurus puts content inside <article> or .theme-doc-markdown
    article = (
        soup.find("article")
        or soup.find(class_="theme-doc-markdown")
        or soup.find(class_="markdown")
        or soup.find("main")
    )

    if article is None:
        return f"<!-- Could not extract content from {page_url} -->\n"

    # Remove nav/breadcrumbs/edit-links that bleed into article
    for tag in article.find_all(["nav", "footer"]):
        tag.decompose()
    for cls in ["theme-doc-breadcrumbs", "pagination-nav", "theme-edit-this-page"]:
        for el in article.find_all(class_=cls):
            el.decompose()

    converter = html2text.HTML2Text()
    converter.ignore_links = False
    converter.ignore_images = True
    converter.body_width = 0  # no line wrapping
    converter.protect_links = True
    converter.unicode_snob = True

    return converter.handle(str(article))


def url_to_local_path(url: str) -> Path:
    """Mirror URL path under OUT_DIR. /docs/api/class-foo → api/class-foo.md"""
    parsed = urlparse(url)
    rel = re.sub(r"^/docs/", "", parsed.path)  # strip leading /docs/
    rel = rel.rstrip("/")
    if not rel:
        rel = "index"
    return OUT_DIR / (rel + ".md")


def save(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def main():
    print(f"Fetching sitemap: {SITEMAP_URL}")
    sitemap_xml = fetch(SITEMAP_URL)
    if not sitemap_xml:
        print("Failed to fetch sitemap — aborting.")
        sys.exit(1)

    urls = parse_sitemap(sitemap_xml)
    print(f"Found {len(urls)} stable /docs/ pages.\n")

    ok = skipped = failed = 0

    for i, url in enumerate(urls, 1):
        local = url_to_local_path(url)
        rel_local = local.relative_to(OUT_DIR.parent.parent)
        print(f"[{i}/{len(urls)}] {url}")
        print(f"  -> {rel_local}")

        html = fetch(url)
        time.sleep(REQUEST_DELAY)

        if html is None:
            failed += 1
            continue

        md = extract_markdown(html, url)
        save(local, md)
        ok += 1

    print(f"\nDone. {ok} saved, {skipped} skipped, {failed} failed.")
    print(f"Output: {OUT_DIR}")


if __name__ == "__main__":
    main()
