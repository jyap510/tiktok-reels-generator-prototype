# TikTok Video Post Automation — CLAUDE.md

Monorepo for a TikTok UGC content automation system. Three independent subsystems.

---

## Structure

```
.
├── .env                          # OPENAI_API_KEY, KIE_API_KEY (shared by all subsystems)
├── video_pipeline/               # Python — generates videos from product data
├── orchestration_layer/          # Next.js — dashboard UI for viewing pipeline runs
└── orchestration_layer/scripts/  # TypeScript — upload macros
```

---

## Subsystems

### 1. Video Pipeline (`video_pipeline/`)

Python pipeline. Takes a product JSON → generates a TikTok UGC video via KIE AI + OpenAI.

**Entry point:** `python video_pipeline/src/pipeline.py`

**Runtime:** Python 3.x + venv at `venv/`. Deps in `video_pipeline/requirements.txt`.

**Env vars needed:** `OPENAI_API_KEY`, `KIE_API_KEY` (read from root `.env`)

**Key source files:**
- `src/pipeline.py` — orchestrates all steps, CLI entry point
- `src/gpt_prompts.py` — calls GPT-5 Nano (OpenAI Responses API) to generate prompts
- `src/kie_client.py` — wraps KIE AI API (task submission + polling)
- `src/video_merge.py` — FFmpeg wrapper for merging clips
- `src/tts.py` — OpenAI TTS for voiceover
- `src/tiktok_mock.py` — mock TikTok upload (writes result metadata)
- `prompts/gpt_system.txt`, `prompts/gpt_user.txt` — editable prompt templates

**Data:** `video_pipeline/data/*.json` — product files (ASIN, title, images, reviews)

**Output:** `video_pipeline/results/<run_id>/` — avatar.png, frame*.png, video*.mp4, final.mp4, run_log.json

See `docs/quickstart-video-pipeline.md` for full usage.

---

### 2. Orchestration Dashboard (`orchestration_layer/`)

Next.js 16 app. Read-only dashboard for viewing pipeline run history, personas, and niches.

**Entry point:** `cd orchestration_layer && npm run dev` → http://localhost:3000

**Runtime:** Node.js, deps in `orchestration_layer/package.json`

**Routes:**
- `/` — dashboard: run stats + recent runs table
- `/runs/[id]` — run detail
- `/personas/[id]` — persona detail
- `/niches/[id]` — niche detail

**Data source:** `orchestration_layer/src/data/` — TypeScript data files (not a live DB)

**Stack:** Next.js 16, React 19, Tailwind 4, TypeScript

See `docs/quickstart-website.md` for dev setup.

---

### 3. TikTok Upload Macro (`orchestration_layer/scripts/tiktok_upload.ts`)

TypeScript script. Takes a video file → uploads it to TikTok using a GoLogin Orbita profile + Playwright.

**Entry point:** `npx tsx orchestration_layer/scripts/tiktok_upload.ts`

**Env vars needed:** `GOLOGIN_TOKEN`, `GOLOGIN_PROFILE_ID`, `VIDEO_PATH`, `CAPTION`

**Extra deps (not in package.json yet):** `npm install gologin` + `npx playwright install chromium`

**Key behaviors:**
- Connects Playwright via `chromium.connectOverCDP(wsUrl)` to GoLogin Orbita
- Uploads via `input[type="file"].setInputFiles()` (hidden input, no drag-drop simulation needed)
- Waits for TikTok's client-side video encoding before filling caption
- `CAPTURE=1` mode dumps DOM + screenshot for selector inspection

See `docs/quickstart-tiktok-upload.md` for full setup.

---

## Env File

Root `.env` — loaded by all Python scripts via `python-dotenv`:

```
OPENAI_API_KEY=...
KIE_API_KEY=...
```

GoLogin credentials are passed as env vars at runtime (not in `.env`):

```
GOLOGIN_TOKEN=...
GOLOGIN_PROFILE_ID=...
```

---

## Key Constraints

- **Do not import across subsystems.** Each subsystem is self-contained.
- **Video pipeline runs from `video_pipeline/` directory context** — paths resolve relative to `src/`.
- **Next.js version is non-standard (16).** Read `orchestration_layer/AGENTS.md` before touching any Next.js code. APIs may differ from training data.
- **TikTok selectors are fragile.** Always run `CAPTURE=1` before the first real upload to verify selectors match the current TikTok UI.
- **`.env` is at the repo root**, not inside `video_pipeline/` — `dotenv` is configured to walk up to find it.
