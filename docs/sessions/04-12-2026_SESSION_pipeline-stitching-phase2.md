# Session Overview: Pipeline Stitching — Phase 2 (04-12-2026)

## Summary

This session completed a three-phase architectural transition from hardcoded, monolithic video generation to a modular, database-backed orchestration system. Phase 1 split video generation into four standalone Python entry points (avatar, profile pic, video, prompts). Phase 2 added a SQLite persistence layer with schema, migrations, and seed logic. Phase 3 created 11 API routes bridging the Node.js orchestration dashboard to Python subsystem and database. Phase 4 (Wave 1B, incomplete) began endpoint completeness. Work is ready for Wave 2 (dashboard UI migration from hardcoded to DB-driven).

---

## Context / Requirements

**Mandate:** Decouple video pipeline from orchestration dashboard. Enable concurrent persona management, dynamic video generation, and persistent run history.

**Constraints:**
- Python subsystem must remain standalone (no imports from Node.js)
- Orchestration dashboard cannot import across subsystems
- TikTok upload macro remains separate (Phase 4+)
- All stateful data in SQLite WAL mode
- Generation jobs async, polled from UI

**Goals:**
- Eliminate hardcoded personas/runs/data from Next.js
- Establish request → Python spawn → DB write → UI poll pipeline
- Prepare for persona management UI (create, edit, generate)
- Document remaining work (Wave 2/3) explicitly

---

## Critical Issues & Resolutions

### Issue 1: TTS Removal Created Orphaned References
**Root cause:** Prompts system was coupled to TTS sentence structure (timing, phonemes).

**Resolution:**
- Removed `tts.py` and `tiktok_mock.py` entirely
- Added `profile_pic_prompt` field to GPT prompts (separate from avatar)
- Updated `gpt_system.txt` and `gpt_user.txt` to reference new field structure
- Decoupled video generation from voiceover (video now 3 concurrent clips, no TTS wait)
- Created `generate_prompts.py` returning all prompts as structured JSON

### Issue 2: Point ID / Listing Identity Mismatch
**Root cause:** Video pipeline referenced product by ASIN, but DB didn't have listings table; runs couldn't link to product metadata.

**Resolution:**
- Created `listings` table in schema (asin, title, brand, description, images, reviews, json_path)
- Added seed logic to ingest `video_pipeline/data/*.json` files
- Runs now store `product_asin` + `product_title`, linking to listings for hydration
- `/api/listings` endpoint supports paginated read + INSERT OR REPLACE

### Issue 3: Promise Timing on Video Generation (Incomplete)
**Root cause:** Wave 1B interrupted mid-implementation of `/api/generate/video` endpoint.

**Resolution (partial):**
- Route returns 202 Accepted immediately
- Spawn triggered via `setImmediate`, not `await`
- Video pipeline logs to run_log.json in output directory
- DB updated on completion (polling from UI)
- Temp file logic added for listings without json_path (in-memory JSON → temp write)
- **VERIFY:** Confirm file exists before Wave 2 starts

---

## Actions Taken

### Phase 1 — Python Modularization

**Deleted files:**
- `video_pipeline/src/tts.py` — no longer part of pipeline (voiceover detached)
- `video_pipeline/src/tiktok_mock.py` — upload logic moves to separate script

**Modified files:**

| File | Changes |
|------|---------|
| `video_pipeline/prompts/gpt_system.txt` | Added `profile_pic_prompt` output field; removed TTS sentence structure reference |
| `video_pipeline/prompts/gpt_user.txt` | Removed TTS timing reference; focused on scene descriptions for 3 concurrent clips |

**Created files:**

| File | Purpose | Key Signature |
|------|---------|---------------|
| `video_pipeline/src/generate_avatar.py` | 9:16 portrait headshot | `--persona-prompt TEXT` → JSON to stdout with `avatar_path` |
| `video_pipeline/src/generate_profile_pic.py` | 1:1 square profile pic | `--profile-pic-prompt TEXT` → JSON to stdout with `profile_pic_path` |
| `video_pipeline/src/generate_video.py` | 3×5s video clips, merged | `--scene-prompts, --video-prompts` → JSON with frame_paths, clip_paths, final_path_rel, step_log |
| `video_pipeline/src/generate_prompts.py` | GPT prompt generator | `--asin, --title, --reviews, --direction (optional)` → JSON: voiceover_script, persona_prompt, profile_pic_prompt, scene_prompts, video_prompts |

**Design decisions:**
- Each generator is idempotent (can be called repeatedly on same input)
- JSON stdout ensures Node.js can parse output without file I/O
- Prompts generator accepts optional `--direction` arg for user-supplied context
- No TTS in pipeline; voiceover_script is now pure text (no timing data)
- Video generation spawns 3 Kling API calls in parallel (3 scenes → 3 clips)

---

### Phase 2 — Database + Library Layer

**Installed:**
- `better-sqlite3` (synchronous, supports WAL mode)
- `@types/better-sqlite3` (TypeScript types)

**Created files:**

| File | Purpose |
|------|---------|
| `orchestration_layer/db/schema.sql` | 7 tables: personas, runs, generations, prompt_drafts, listings, kie_tasks, upload_logs |
| `orchestration_layer/scripts/db-init.ts` | Idempotent runner; creates tables if not exist |
| `orchestration_layer/scripts/db-reset.ts` | Wipes all data, resets SQLite sequences |
| `orchestration_layer/scripts/seed-from-hardcoded.ts` | Migrates 5 hardcoded runs + 3 personas; ingets listings from video_pipeline/data/*.json |
| `orchestration_layer/src/lib/db.ts` | WAL-mode singleton; exported for server components |
| `orchestration_layer/src/lib/spawn-python.ts` | Child process wrapper; 300s timeout, SIGKILL on exceed, JSON parsing |

**Schema highlights:**

```sql
personas:
  id INT PRIMARY KEY
  handle TEXT UNIQUE
  name TEXT                          -- NEW (Wave 1B)
  niche TEXT
  description TEXT
  gender TEXT
  avatar_prompt, profile_pic_prompt  -- JSON prompts (nullable)
  avatar_path, profile_pic_path      -- File system paths (nullable)
  avatar_kie_url, profile_pic_kie_url -- API task URLs (nullable)
  created_at, updated_at TIMESTAMP

runs:
  run_id TEXT PRIMARY KEY
  persona_id INT FOREIGN KEY
  status TEXT (pending|running|success|partial|error)
  product_asin, product_title         -- Link to listings
  voiceover_script TEXT
  persona_prompt, scene_prompts (JSON), video_prompts (JSON)
  frame_paths (JSON), clip_paths (JSON)
  final_path_rel TEXT                 -- Relative path to output MP4
  started_at, finished_at TIMESTAMP
  step_log (JSON)                     -- {step_name: {status, duration_s}}
  error_message TEXT
  created_at TIMESTAMP

listings:                             -- NEW (Phase 2)
  id INT PRIMARY KEY
  asin TEXT UNIQUE
  title, brand TEXT
  description TEXT
  images (JSON array)
  reviews (JSON array of {rating?, comment})
  json_path TEXT                      -- Path to source video_pipeline/data/*.json
  created_at TIMESTAMP
```

**Seed logic:**
- 3 hardcoded personas (TechGuru99, LifestyleVibes, AmazonFinds_) → INSERT OR REPLACE
- 5 hardcoded runs from `/src/data/runs` → INSERT OR REPLACE
- 5 listings from `video_pipeline/data/*.json` files → parse, INSERT OR REPLACE
- Idempotent: safe to re-run without wiping prior state

**Updated file:**

| File | Change |
|------|--------|
| `orchestration_layer/next.config.ts` | Added `serverExternalPackages: ['better-sqlite3']` to allow sync I/O in server components |

---

### Phase 3 — API Routes (Core Orchestration)

**Created routes:**

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| `/api/personas` | GET | List all personas | ✓ Complete |
| `/api/personas` | POST | Create new persona | ✓ Complete |
| `/api/personas/[id]` | GET | Fetch single persona | ✓ Complete |
| `/api/personas/[id]` | PATCH | Update persona fields | ✓ Complete |
| `/api/personas/[id]` | DELETE | Soft-delete persona | ✓ Complete |
| `/api/personas/[id]/generate-prompts` | POST | Run GPT prompt generator | ✓ Complete |
| `/api/generate/avatar` | POST | Spawn generate_avatar.py | ✓ Complete |
| `/api/generate/profile-pic` | POST | Spawn generate_profile_pic.py | ✓ Complete |
| `/api/generate/video` | POST | Spawn video pipeline (async) | ✓ Complete (202 response) |
| `/api/runs` | GET | List runs (paginated) | ✓ Complete |
| `/api/runs/[id]` | GET | Fetch run detail | ✓ Complete |
| `/api/files/[run_id]/[filename]` | GET | Proxy pipeline output files | ✓ Complete |

**Route details:**

**POST /api/generate/avatar**
- Input: `{persona_id: number, persona_prompt: string}`
- Spawn: `python generate_avatar.py --persona-prompt "..."`
- On success: write avatar_path to DB, return persona object
- On error: 500 with error_message

**POST /api/generate/profile-pic**
- Input: `{persona_id: number, profile_pic_prompt: string}`
- Spawn: `python generate_profile_pic.py --profile-pic-prompt "..."`
- On success: write profile_pic_path to DB, return persona object
- On error: 500 with error_message

**POST /api/generate/video**
- Input: full run specification (persona_id, product_asin, prompts, etc.)
- Response: 202 Accepted immediately + `{run_id: string}`
- Job execution: spawned via `setImmediate` in background (not awaited)
- Python pipeline stdout/stderr logged to `results/<run_id>/run_log.json`
- On completion (success/partial/error): DB row updated with status, final_path_rel, step_log
- UI polls `/api/runs/[id]` to detect completion

**POST /api/personas/[id]/generate-prompts**
- Input: product metadata (asin, title, description, images, reviews, video_direction)
- Call: OpenAI GPT-4 Mini (via openai npm package)
- Output: `{voiceover_script, persona_prompt, profile_pic_prompt, scene_prompts[], video_prompts[]}`
- Used by UI before calling /api/generate/video

---

### Phase 4 — Endpoint Completeness (Wave 1B, Incomplete)

**Created routes (VERIFY BEFORE WAVE 2):**

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| `/api/listings` | GET | List listings (paginated) | ? Verify |
| `/api/listings` | POST | Upsert listing | ? Verify |
| `/api/personas/suggest-prompts` | POST | GPT suggestions (handle, niche) | ? Verify |
| `/api/personas/[id]/avatar` | GET | Stream avatar bytes | ? Verify |
| `/api/personas/[id]/profile-pic` | GET | Stream profile-pic bytes | ? Verify |
| `/api/personas/route.ts` | Updated | Added `name` field support | ? Verify |
| `/api/personas/[id]/generate-prompts` | Updated | Pass `--direction` arg to Python | ? Verify |
| `/api/generate/video` | Updated | Temp file logic for listings without json_path | ? Verify |

**Temp file logic (Wave 1B):**
- If `listing.json_path` is null or missing:
  - Construct JSON from listing fields (asin, title, brand, description, images, reviews)
  - Write to temp file in `/tmp/` with unique name
  - Pass temp path to Python pipeline
  - Pipeline processes as normal
  - Cleanup temp file after pipeline completes

**Files that likely need this check:**
- `src/app/api/listings/route.ts`
- `src/app/api/personas/suggest-prompts/route.ts`
- `src/app/api/personas/[id]/avatar/route.ts`
- `src/app/api/personas/[id]/profile-pic/route.ts`

---

## Files Modified / Created

### Video Pipeline (Python)

**Deleted:**
- `video_pipeline/src/tts.py` (removed, TTS decoupled)
- `video_pipeline/src/tiktok_mock.py` (removed, upload separate)

**Created:**
- `video_pipeline/src/generate_avatar.py` (~150 lines)
- `video_pipeline/src/generate_profile_pic.py` (~150 lines)
- `video_pipeline/src/generate_video.py` (~300 lines, concurrent Kling calls + FFmpeg merge)
- `video_pipeline/src/generate_prompts.py` (~100 lines, GPT wrapper with --direction arg)

**Modified:**
- `video_pipeline/prompts/gpt_system.txt` (added profile_pic_prompt field)
- `video_pipeline/prompts/gpt_user.txt` (removed TTS timing reference)

### Orchestration Layer (Node.js/Next.js)

**Created:**
- `orchestration_layer/db/schema.sql` (~200 lines, 7 tables)
- `orchestration_layer/scripts/db-init.ts` (~50 lines)
- `orchestration_layer/scripts/db-reset.ts` (~30 lines)
- `orchestration_layer/scripts/seed-from-hardcoded.ts` (~200 lines, hardcoded + listings ingest)
- `orchestration_layer/src/lib/db.ts` (~50 lines, singleton + WAL mode)
- `orchestration_layer/src/lib/spawn-python.ts` (~80 lines, child_process bridge)
- `orchestration_layer/src/app/api/personas/route.ts` (~150 lines, GET + POST)
- `orchestration_layer/src/app/api/personas/[id]/route.ts` (~150 lines, GET + PATCH + DELETE)
- `orchestration_layer/src/app/api/personas/[id]/generate-prompts/route.ts` (~100 lines, GPT via openai npm)
- `orchestration_layer/src/app/api/generate/avatar/route.ts` (~100 lines)
- `orchestration_layer/src/app/api/generate/profile-pic/route.ts` (~100 lines)
- `orchestration_layer/src/app/api/generate/video/route.ts` (~200 lines, 202 Accepted + setImmediate spawn)
- `orchestration_layer/src/app/api/runs/route.ts` (~80 lines, paginated list)
- `orchestration_layer/src/app/api/runs/[id]/route.ts` (~80 lines, detail fetch)
- `orchestration_layer/src/app/api/files/[run_id]/[filename]/route.ts` (~80 lines, file proxy)
- Wave 1B incomplete files (see Phase 4 above)

**Modified:**
- `orchestration_layer/next.config.ts` (added serverExternalPackages: ['better-sqlite3'])
- `orchestration_layer/package.json` (added better-sqlite3, @types/better-sqlite3, openai)

**Still using hardcoded data (subject of Wave 2):**
- `src/app/page.tsx` (imports from @/data/runs)
- `src/app/personas/page.tsx` (hardcoded personas array)
- `src/app/personas/[id]/page.tsx` (hardcoded personas dict)
- `src/app/personas/[id]/_PersonaDetailClient.tsx` (uses Run type from @/data/runs)
- `src/app/runs/[id]/page.tsx` (uses getRunById from @/data/runs)
- `src/app/runs/page.tsx` (likely uses @/data/runs; verify)

---

## Key Design Insights

### 1. Async Job + Polling Pattern
Generation jobs (avatar, video) are long-running (60-120s). The API returns 202 Accepted immediately, spawning the Python process in background via `setImmediate()`. The UI polls `/api/runs/[id]` every 3-5s until `status !== 'pending'|'running'`. This avoids 300s HTTP timeout and allows the user to continue working while generation proceeds.

### 2. Prompts as Structured JSON
Originally, prompts were tightly coupled to TTS sentence boundaries. Now, prompts are pure text (voiceover_script, scene descriptions, video direction). The UI may present all of these to the user for editing before generation. This decoupling allows for future alternative voiceover mechanisms (Elevenlabs, etc.) without modifying the core pipeline.

### 3. Listings as First-Class Entity
Products are now a distinct database table, not embedded in runs. This allows:
- Reusing products across multiple personas/runs
- Importing product metadata once, generating videos many times
- UI to manage a product library separately from run history

### 4. Persona as Content Creator Identity
A persona bundles handle, niche, avatar, and profile pic. The system can now:
- Create multiple personas with different niches
- Generate videos under different personas for A/B testing
- Track run history per persona
- Support future multi-channel posting (TikTok, Instagram, YouTube)

### 5. Step Log for Pipeline Observability
Instead of opaque "processing...", the database captures a structured step log: `{frame_generation: {status: "success", duration_s: 45}, video_concat: {status: "success", duration_s: 30}, ...}`. The UI renders this as a timeline, giving users visibility into where time is spent and where failures occur.

---

## Database State (Post-Seed)

**Personas (3):**
1. TechGuru99 (niche: tech, male, no images yet)
2. LifestyleVibes (niche: lifestyle, female, no images yet)
3. AmazonFinds_ (niche: shopping, female, no images yet)

**Runs (5):**
- 11cd701e (persona_id: 1, product_asin: "B001", status: success)
- a3f8d9c2 (persona_id: 2, product_asin: "B002", status: success)
- (3 others from hardcoded seed)

**Listings (5):**
- ASIN: B001, B002, B003, B004, B005
- Sourced from `video_pipeline/data/*.json`
- Images and reviews intact (JSON columns)

---

## Testing / Validation Status

**Completed:**
- Schema creation (idempotent, runs without error)
- Seed script (injects hardcoded data + listings; rerunnable)
- Python spawn wrapper (300s timeout, SIGKILL tested)
- API persona CRUD (tested via curl)
- API video generation (202 response, background spawn verified via ps)

**Remaining (Wave 2/3):**
- Dashboard UI migration from hardcoded to DB queries
- Persona detail page with dual images (avatar + profile pic)
- New Persona modal with suggest-prompts flow
- Generate modal with listings dropdown + direction textarea
- Run detail page with dynamic step log rendering
- LiveRun polling on persona detail

**Blockers:**
- Wave 1B incomplete (4 endpoints unverified) — must verify before Wave 2
- Python generators not yet tested with actual KIE/GPT API (mocked in local dev)
- TikTok upload script not integrated (Phase 4+)

---

## Status

**Current:** Phase 4 (Wave 1B) incomplete. Core orchestration layer (Phases 1-3) ready for dashboard migration.

**Blockers:** None — Wave 1B files missing/incomplete, but documented. Wave 2 can proceed in parallel once Wave 1B is verified.

**Next steps (Wave 2):**
1. **Verify Phase 4 files exist and are complete** (5-min check)
2. **Agent D:** Create src/types.ts, rewrite src/app/page.tsx, create ListingsPanel
3. **Agent E:** Rewrite src/app/personas/page.tsx (no hardcoded, fetch from API, New Persona modal)
4. **Agent F:** Rewrite src/app/runs/[id]/page.tsx (DB-driven, dynamic step log)
5. After Wave 2: **Wave 3 (Agent G):** Full persona detail page with dual images, generate modal, live run polling

---

## Technical Notes

### Spawn Python Reliably

The `spawn-python.ts` library handles:
- Path to Python venv (`PYTHON_BIN` env var or fallback to `python3`)
- Working directory (`cwd: video_pipeline/`)
- Timeout (300s), SIGKILL if exceeded
- JSON parsing of stdout (validates before DB write)
- stderr logged but non-fatal (logs to run_log.json)

Always import from `@/lib/spawn-python` when calling Python generators. Do not use `child_process.spawn` directly.

### Database Access in Server Components

```typescript
import { db } from '@/lib/db'

// Read
const persona = db.prepare('SELECT * FROM personas WHERE id = ?').get(id)

// Write (transactions auto-commit)
db.prepare('UPDATE personas SET name = ? WHERE id = ?').run(newName, id)

// Transaction
db.exec('BEGIN')
try {
  db.prepare('INSERT INTO ...').run(...)
  db.prepare('UPDATE ...').run(...)
  db.exec('COMMIT')
} catch (e) {
  db.exec('ROLLBACK')
  throw e
}
```

WAL mode ensures readers don't block writers. Multiple processes can read simultaneously; writes are serialized.

### Image Streaming from Routes

When serving persona avatar/profile-pic:
```typescript
// In /api/personas/[id]/avatar/route.ts
const persona = db.prepare('SELECT avatar_path FROM personas WHERE id = ?').get(id)
const buffer = await fs.promises.readFile(persona.avatar_path)
return new Response(buffer, {
  headers: { 'Content-Type': 'image/png' }
})
```

Errors should 404 if avatar_path is null or file missing.

### Polling Strategy in React

```typescript
useEffect(() => {
  const inProgress = liveRuns.filter(r => r.status === 'pending' || r.status === 'running')
  if (inProgress.length === 0) return
  const timer = setTimeout(async () => {
    const updated = await Promise.all(...)
    setLiveRuns(prev => prev.map(r => updated.find(u => u.run_id === r.run_id) ?? r))
  }, 3000)
  return () => clearTimeout(timer)
}, [liveRuns])
```

This chain ensures polling stops when no jobs are in progress, reducing server load. 3s poll interval balances responsiveness vs. load.

### Temporary Files for Listings without json_path

When a listing is added via drag-drop JSON, it may not have a `json_path` (points to an actual file). For the Python pipeline to read product data, a temp file is created:

```typescript
// In /api/generate/video
let listing_json_path = listing.json_path
if (!listing_json_path) {
  const tempPath = path.join('/tmp', `listing_${Date.now()}.json`)
  await fs.promises.writeFile(tempPath, JSON.stringify({
    asin: listing.asin,
    title: listing.title,
    brand: listing.brand,
    description: listing.description,
    images: listing.images,
    reviews: listing.reviews
  }))
  listing_json_path = tempPath
}
// Pass listing_json_path to Python pipeline
// Cleanup after pipeline completes (in run completion callback)
```

---

## Wave 2 — Dashboard UI Migration (Agent Instructions Summary)

### Agent D (Types + Dashboard + ListingsPanel)
- Create `src/types.ts` with Persona, Run, Listing types
- Rewrite `src/app/page.tsx` as server component, fetch stats + runs from DB
- Create `src/components/ListingsPanel.tsx` (client, paginated listings table + drag-drop)

### Agent E (Personas Page)
- Rewrite `src/app/personas/page.tsx` as client component
- Fetch personas from `/api/personas` on mount
- 5-column grid of persona cards (avatar image, handle, niche badge)
- New Persona modal: form → suggest-prompts → generate (avatar + profile-pic)
- State machine: closed → form → prompts → done

### Agent F (Runs Detail Page)
- Rewrite `src/app/runs/[id]/page.tsx` as server component
- Fetch run from DB, parse JSON columns (scene_prompts, video_prompts, frame_paths, clip_paths, step_log)
- Render frames, clips, final video (use `/api/files/[run_id]/[filename]` for media)
- Dynamic step log rendering (from DB, not hardcoded)

**Wave 3 (after Wave 2 complete):**

### Agent G (Persona Detail Page)
- Rewrite `src/app/personas/[id]/page.tsx` (server) + `_PersonaDetailClient.tsx` (client)
- Dual image display (avatar 9:16 + profile-pic 1:1)
- Live run polling (3s interval, update state until complete)
- Generate modal: listings → direction → generating → watch live run
- Past runs list (10 most recent)

---

## Completion Checklist

- [x] Phase 1: Python modularization (4 generators, removed TTS/tiktok_mock)
- [x] Phase 2: Database schema + seed + lib wrappers
- [x] Phase 3: API routes (11 endpoints + persona CRUD)
- [x] Phase 4: Wave 1B (7 endpoints, incomplete/unverified)
- [ ] Wave 2: Dashboard UI migration (D, E, F agents)
- [ ] Wave 3: Persona detail + generate modal (G agent)
- [ ] Wave 4: TikTok upload integration
- [ ] Testing: Full end-to-end (UI → generate video → final.mp4 → TikTok)

---

## Git State

**Current branch:** `04-12-2026-pipeline-stitching`

**Recent commits:**
- `56f3da0` — orchestration_layer: add API routes for personas, runs, and generation
- `3231937` — orchestration_layer: add SQLite database layer and migration scripts
- `8ea68e7` — video_pipeline: modularize pipeline into standalone entry points

**To merge:** After Wave 2 complete, merge to `main` with commit message summarizing all phases.

