# Quickstart: Video Pipeline

Generates a TikTok UGC video from a product JSON file. Calls GPT-5 Nano for prompt generation, KIE AI for image/video generation, OpenAI TTS for voiceover, and FFmpeg for merging.

---

## Prerequisites

### 1. Set up the Python environment

```bash
python -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate
pip install -r video_pipeline/requirements.txt
```

### 2. Set API keys in root `.env`

```
OPENAI_API_KEY=sk-...
KIE_API_KEY=...
```

### 3. Install FFmpeg

FFmpeg must be on your `PATH` for the merge step.

```bash
# Ubuntu/Debian
sudo apt install ffmpeg

# macOS
brew install ffmpeg
```

---

## Run

From the repo root:

```bash
# Random product from video_pipeline/data/
python video_pipeline/src/pipeline.py

# Specific product
python video_pipeline/src/pipeline.py --input data/B0869BPD69.json
```

Output lands in `video_pipeline/results/<run_id>/`. Each run gets a unique 8-char ID.

---

## Pipeline Steps

| Step | What happens |
|------|-------------|
| 1 — Ingest | Loads product JSON (ASIN, title, brand, images, reviews) |
| 2 — GPT Prompts | GPT-5 Nano generates: persona (gender + appearance), 3 scene prompts, 3 video prompts, voiceover script |
| 3 — Avatar | Nano Banana Pro generates a 9:16 avatar face image from the persona prompt |
| 4 — Scene Frame(s) | Nano Banana Pro composes avatar + product images into scene frame(s) |
| 5 — TTS | OpenAI TTS generates the voiceover MP3 from the script |
| 6 — Video | Kling AI Avatar Standard lip-syncs the scene frame to the voiceover audio |
| 7 — Merge | FFmpeg concatenates clips into `final.mp4` (or passthrough for single clip) |
| 8 — Upload | Mock upload — writes result metadata to `run_log.json` (real upload is the separate macro) |

---

## CLI Flags

```bash
# Default: single 10s avatar video (lip-synced TTS)
python video_pipeline/src/pipeline.py

# Reuse an existing avatar image instead of generating a new one
python video_pipeline/src/pipeline.py \
  --avatar-mode avatar-id \
  --avatar-id https://cdn.kie.ai/...

# Legacy 3-clip mode (3x5s clips concatenated, concurrent generation)
python video_pipeline/src/pipeline.py --multi-clip

# Legacy 3-clip mode, sequential (easier to debug)
python video_pipeline/src/pipeline.py --multi-clip --no-concurrent

# Single clip, image-to-video mode (no audio, avatar just animates)
python video_pipeline/src/pipeline.py --video-mode image-to-video
```

---

## Output Files

```
video_pipeline/results/<run_id>/
├── avatar.png          # Generated avatar face
├── frame1.png          # Scene frame (avatar + product context)
├── voiceover.mp3       # TTS audio
├── video1.mp4          # Generated video clip
├── final.mp4           # Final merged video — this is what gets uploaded
└── run_log.json        # Full step log with task IDs, KIE URLs, durations
```

---

## Product Data Format

Product files live in `video_pipeline/data/<ASIN>.json`. Minimum required fields:

```json
{
  "asin": "B0869BPD69",
  "title": "Product title",
  "brand": "Brand name",
  "description": "Short description",
  "images": ["https://...", "https://..."],
  "reviews": [
    { "comment": "First review text" },
    { "comment": "Second review text" }
  ]
}
```

---

## Editing Prompts

The GPT prompt templates are editable without touching Python code:

- `video_pipeline/prompts/gpt_system.txt` — system instructions for GPT-5 Nano
- `video_pipeline/prompts/gpt_user.txt` — user message template (uses `{title}`, `{brand}`, `{description}`, `{review1}`, `{review2}`)

Changes take effect on the next run without restart.

---

## Troubleshooting

**`KIE_API_KEY not set`** — `.env` is not being found. The pipeline loads it from the repo root. Run from the repo root directory, not from inside `video_pipeline/`.

**Step 4/5 partial failure** — KIE tasks occasionally fail. The pipeline tolerates partial failures and continues with available clips. Check `run_log.json` for `errors` arrays.

**FFmpeg not found** — Install FFmpeg and ensure it is on your `PATH`. The merge step will error immediately if it cannot find `ffmpeg`.

**GPT JSON parse failure** — The pipeline retries once automatically. If it fails again, check your `OPENAI_API_KEY` and the model name in `gpt_prompts.py` (`gpt-5-nano`).
