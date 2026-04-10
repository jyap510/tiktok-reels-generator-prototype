# Quickstart: TikTok Upload Macro

Uploads a video to TikTok using a **GoLogin Orbita profile** (persistent session + fingerprint) controlled by **Playwright** over CDP.

---

## Prerequisites

### 1. Install deps

From `orchestration_layer/`:

```bash
npm install gologin
npx playwright install chromium
```

### 2. Log into TikTok inside your GoLogin profile (one-time)

The script reuses a saved session — it does not handle login. You must log in manually first:

1. Open the **GoLogin desktop app**
2. Find your profile → click **Run** to open Orbita
3. Navigate to `tiktok.com` and log in fully (including 2FA if enabled)
4. Close Orbita — cookies are now persisted in the profile

Do not change the profile's proxy or fingerprint after logging in. TikTok sessions are fingerprint-bound.

### 3. Get your GoLogin API token

Dashboard → **API & MCP** → **API** tab → **New Token**

---

## Run

```bash
GOLOGIN_TOKEN=your_token \
GOLOGIN_PROFILE_ID=your_profile_id \
VIDEO_PATH=/absolute/path/to/video.mp4 \
CAPTION="Your caption here" \
npx tsx orchestration_layer/scripts/tiktok_upload.ts
```

All four env vars are required for an upload run.

---

## Capture Mode (run this first)

TikTok's UI changes often. Before your first real upload, verify that the selectors in the script match what TikTok actually renders:

```bash
GOLOGIN_TOKEN=your_token \
GOLOGIN_PROFILE_ID=your_profile_id \
CAPTURE=1 \
npx tsx orchestration_layer/scripts/tiktok_upload.ts
```

This opens the upload page and saves two files in your working directory:

- `tiktok_upload_dom_<timestamp>.html` — full page HTML
- `tiktok_upload_screenshot_<timestamp>.png` — full-page screenshot

Share these files to confirm the selectors (`input[type="file"]`, `[contenteditable="true"]`, Post button) are correct before running an upload.

---

## What the Script Does

1. Starts the GoLogin Orbita profile via the Node.js SDK → receives a CDP websocket URL
2. Connects Playwright via `chromium.connectOverCDP(wsUrl)`
3. Navigates to `https://www.tiktok.com/upload`
4. Sets the video file on the hidden `input[type="file"]` directly (no drag-drop simulation)
5. Waits for TikTok's client-side video encoding to finish (gates on `[contenteditable="true"]` becoming visible, up to 2 minutes)
6. Fills the caption and clicks the Post button
7. Saves a result screenshot, then stops the GoLogin profile

---

## Troubleshooting

**"Video file not found"** — `VIDEO_PATH` must be an absolute path or a path resolvable from `orchestration_layer/`.

**Selector timeout on `[contenteditable]`** — TikTok may have changed its upload UI. Run `CAPTURE=1`, inspect the DOM dump, and update the selector in `scripts/tiktok_upload.ts`.

**"Not logged in" / redirects to login page** — The profile's TikTok session expired or was not saved. Repeat the manual login step above.

**GoLogin profile won't start** — Ensure the GoLogin desktop app or service is running locally (the SDK needs it to launch Orbita). Check `DEBUG=gologin npx tsx ...` for verbose output.

---

## Script Location

`orchestration_layer/scripts/tiktok_upload.ts`
