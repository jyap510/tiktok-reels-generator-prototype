# Session Overview: Monorepo Restructure + Concurrent Pipeline (04-07-2026)

## Phase 1: Monorepo Reorganization

Restructured flat repository into two cohesive subprojects:

**Directory Layout:**
- `video_pipeline/` — all existing Python pipeline code, data, docs, prompts, results, logs, `requirements.txt`, `venv/`
- `orchestration_layer/` — new Next.js 16 + TypeScript + Tailwind UI for TikTok agent orchestration
- `.env` — remains at root (shared between subprojects)

**Changes:**
- Migrated all Python scripts, references, results directory into `video_pipeline/`
- Created and configured `video_pipeline/venv/` (virtual environment)
- Updated `.env` paths in 3 scripts: changed to `parent.parent.parent / ".env"` (3 levels up from scripts location)
- Updated `.gitignore` with `video_pipeline/venv/` and `video_pipeline/results/*` exclusions
- Scaffolded Next.js app with dark UI: Dashboard, Personas, Niches, Content pages; sidebar nav; dynamic `[id]` routes; clean build

## Phase 2: Pipeline Concurrent Redesign + Avatar Flags

Modified `video_pipeline/scripts/pipeline.py` to support concurrent execution and flexible avatar modes.

**New CLI Flags:**
- `--concurrent` / `--no-concurrent` (default: concurrent enabled)
- `--avatar-mode [ai-generated|avatar-id]` (default: ai-generated)
- `--avatar-id <url>` (required with avatar-id mode; pass stored KIE image URL to skip regen)
- `--multi-clip` (default: off; enables legacy 3×5s mode)

**New Functions Added:**
- `step_generate_frames_concurrent()` — submits 3 frame tasks, polls all via ThreadPoolExecutor
- `step_generate_video_single()` — single Kling 2.6 call with duration="10", uses avatar image as first frame
- `step_generate_videos_concurrent()` — submits 3 video tasks, polls concurrently
- `step_merge_videos()` — shutil.copy2 passthrough for single clip; FFmpeg merge for multi-clip

**Pipeline Behavior Changes:**
- **Default (single-clip):** 1×10s video from avatar image → skip frame generation entirely
- **Legacy mode (--multi-clip):** 3×5s clips → FFmpeg merge → 15s video (old behavior)

**Modified Functions:**
- `step_generate_avatar()` — now accepts `avatar_mode` and `avatar_id` params; returns stored URL when avatar-id mode; skips generation

**Prompt Updates:**
- `gpt_system.txt` — video_prompts[0] restructured for standalone 10s format (hook → agitation → payoff); fast-cadence UGC voice instructions added
- `gpt_user.txt` — single-clip mode documentation added

## Research Findings (Not Yet Implemented)

- `ai_avatar_pro/standard` requires `audio_url` parameter — TTS step needed upstream
- Persistent character workflow: store avatar.png KIE URL between runs, pass via `--avatar-id` flag
- Kling 3.0 multi-shot identified as future upgrade for improved coherence across clips

## Actions Taken

| Action | File | Details |
|--------|------|---------|
| Directory structure reorganized | `video_pipeline/`, `orchestration_layer/` | Monorepo split: Python pipeline isolated, Next.js app scaffolded |
| `.env` paths patched | `scripts/main.py`, `scripts/process.py`, `scripts/format.py` | Changed to `parent.parent.parent / ".env"` for 3-level depth |
| `.gitignore` updated | `.gitignore` | Added `video_pipeline/venv/`, `video_pipeline/results/*` |
| Next.js app initialized | `orchestration_layer/` | dark UI: Dashboard, Personas, Niches, Content; sidebar nav; build clean |
| Concurrent polling logic | `video_pipeline/scripts/pipeline.py` | Added `step_generate_frames_concurrent()`, `step_generate_videos_concurrent()` |
| Single-clip path added | `video_pipeline/scripts/pipeline.py` | Added `step_generate_video_single()` for 10s avatar-direct video |
| Merge logic abstracted | `video_pipeline/scripts/pipeline.py` | Added `step_merge_videos()` with single/multi-clip handling |
| Avatar flow updated | `video_pipeline/scripts/pipeline.py` | `step_generate_avatar()` now takes `avatar_mode`, `avatar_id`; conditional skip |
| Prompts updated | `gpt_system.txt`, `gpt_user.txt` | Single-clip format + UGC voice cadence; multi-clip mode documented |

## Files Modified

| File | Changes |
|------|---------|
| Directory structure | 2 subprojects created, ~30 files relocated |
| `.env` | Remains at root (shared) |
| `scripts/main.py` | `.env` path patched, cli args added: `--concurrent`, `--avatar-mode`, `--avatar-id`, `--multi-clip` |
| `scripts/process.py` | `.env` path patched |
| `scripts/format.py` | `.env` path patched |
| `.gitignore` | `video_pipeline/venv/`, `video_pipeline/results/*` added |
| `pipeline.py` | 4 new functions, 1 modified; ~200 lines added; avatar/concat logic refactored |
| `gpt_system.txt` | 10s single-clip prompt structure; UGC voice instructions |
| `gpt_user.txt` | Single-clip mode context added |
| `orchestration_layer/` | Full Next.js 16 scaffold (dependencies, pages, styles, config) |

## Key Design Decisions

1. **Single-clip default**: Avatar image as first frame → direct 10s Kling call. Skips frame generation, reduces API calls, faster turnaround.
2. **Concurrent polling**: ThreadPoolExecutor for multi-task wait; reduces wall-clock time when `--concurrent` enabled.
3. **Avatar persistence**: `--avatar-id` flag stores KIE URL; allows brand consistency across runs without regen cost.
4. **Monorepo split**: Isolates concerns—video pipeline logic stays pure Python, orchestration UI is React/TS. Shared `.env` bridges both.

## Open Items

- **TTS integration**: Add to `video_pipeline` as optional mode OR stand up as separate microservice — user decision required
- **Kling 3.0 multi-shot**: Identified as future upgrade for coherence; deferred pending research/capability validation

## Status

**Current:** Phase 2 complete. Restructure verified. Concurrent pipeline refactored. Next.js scaffold built and clean.

**Blockers:** None.

**Next steps:**
1. Test concurrent execution on full pipeline (video generation calls)
2. Validate avatar persistence workflow with stored KIE URLs
3. Decide on TTS integration architecture (local vs. service)
4. Evaluate Kling 3.0 multi-shot capability if coherence issues emerge
