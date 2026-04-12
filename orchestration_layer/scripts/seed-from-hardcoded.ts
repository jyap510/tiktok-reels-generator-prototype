#!/usr/bin/env tsx
// Run: npx tsx scripts/seed-from-hardcoded.ts [--listings-only]
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

const LISTINGS_ONLY = process.argv.includes('--listings-only');
const DATA_DIR = '/home/jay/Desktop/EvoTech/e8-tiktok-video-post-automation/video_pipeline/data';

const ROOT = path.join(__dirname, '..');
const DB_DIR = path.join(ROOT, 'db');
const DB_PATH = path.join(DB_DIR, 'tiktok.db');
const SCHEMA_PATH = path.join(DB_DIR, 'schema.sql');
const RESULTS_BASE = '/home/jay/Desktop/EvoTech/e8-tiktok-video-post-automation/video_pipeline/results/';

fs.mkdirSync(DB_DIR, { recursive: true });
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

// Init schema
const schema = fs.readFileSync(SCHEMA_PATH, 'utf-8');
db.exec(schema);

// ── Listings ──────────────────────────────────────────────────────────────────
const insertListing = db.prepare(`
  INSERT OR IGNORE INTO listings (asin, title, brand, description, images, reviews, json_path)
  VALUES (@asin, @title, @brand, @description, @images, @reviews, @json_path)
`);

let insertedListings = 0;
try {
  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));
  for (const file of files) {
    const filePath = path.join(DATA_DIR, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const info = insertListing.run({
      asin: data.asin,
      title: data.title,
      brand: data.brand || null,
      description: data.description || null,
      images: JSON.stringify(data.images ?? []),
      reviews: JSON.stringify(data.reviews ?? []),
      json_path: filePath,
    });
    if (info.changes > 0) insertedListings++;
  }
  console.log(`Inserted ${insertedListings} listings`);
} catch (err) {
  console.log(`Listings seeding failed or directory not found: ${err}`);
}

if (LISTINGS_ONLY) {
  console.log('--listings-only flag set, exiting');
  db.close();
  process.exit(0);
}

// ── Personas ─────────────────────────────────────────────────────────────────
const insertPersona = db.prepare(`
  INSERT OR IGNORE INTO personas (id, handle, niche, description, gender, created_at, updated_at)
  VALUES (@id, @handle, @niche, @description, @gender, @created_at, @updated_at)
`);

const personas = [
  { id: 1, handle: 'TechGuru99',     niche: 'tech reviews',  description: 'Tech reviewer persona',       gender: 'male',   created_at: '2026-04-09T15:00:00Z', updated_at: '2026-04-09T15:00:00Z' },
  { id: 2, handle: 'LifestyleVibes', niche: 'lifestyle',      description: 'Lifestyle creator persona',   gender: 'female', created_at: '2026-04-09T12:00:00Z', updated_at: '2026-04-09T12:00:00Z' },
  { id: 3, handle: 'AmazonFinds_',   niche: 'amazon finds',   description: 'Amazon finds persona',        gender: 'female', created_at: '2026-04-09T15:30:00Z', updated_at: '2026-04-09T15:30:00Z' },
];

for (const p of personas) {
  insertPersona.run(p);
}
console.log(`Inserted ${personas.length} personas`);

// ── Runs ──────────────────────────────────────────────────────────────────────
const insertRun = db.prepare(`
  INSERT OR IGNORE INTO runs (
    run_id, persona_id, status, product_asin, product_title,
    voiceover_script, persona_prompt, scene_prompts, video_prompts,
    avatar_path, frame_paths, clip_paths, final_path_abs, final_path_rel,
    started_at, finished_at, step_log, created_at
  ) VALUES (
    @run_id, @persona_id, @status, @product_asin, @product_title,
    @voiceover_script, @persona_prompt, @scene_prompts, @video_prompts,
    @avatar_path, @frame_paths, @clip_paths, @final_path_abs, @final_path_rel,
    @started_at, @finished_at, @step_log, @created_at
  )
`);

type HardcodedRun = {
  run_id: string;
  persona_id: string;
  started_at: string;
  finished_at: string;
  status: string;
  product: { asin: string; title: string };
  prompts: { persona_prompt: string; scene_prompts: string[]; video_prompts: string[]; voiceover_script: string };
  steps: Record<string, { status: string; duration_s: number }>;
  media: { avatar: string; frames: (string | null)[]; clips: (string | null)[]; final: string };
};

const HARDCODED_RUNS: HardcodedRun[] = [
  {
    run_id: "11cd701e", persona_id: "3",
    started_at: "2026-04-09T15:36:58.055842+00:00", finished_at: "2026-04-09T15:42:52.793543+00:00",
    status: "success",
    product: { asin: "B0869BPD69", title: "CDE Forever Love Heart Necklaces for Women, Wedding Anniversary, Birthday Mother" },
    prompts: {
      persona_prompt: "A Nano Banana Pro image generation prompt for a neutral face portrait headshot. Realistic, expressive, magnetic person with natural warmth and personality radiating through their eyes. Plain white/neutral background, looking directly into camera, natural lighting. No props, no context - just the face.",
      scene_prompts: [
        "female creator. Hook frame: female creator in her element, 9:16 vertical, chest-up, centered, warm living room, blurred background. The necklace enters frame as she gasps with wide eyes, holds it up with one hand and points at it with the other. She is in casual wear, natural makeup, warm key light on her face. Text overlay space above. Real, relatable energy.",
        "female creator. Demo frame: female creator holds the necklace close to camera, 9:16 vertical, focusing on pendant and chain. She gestures at the key feature, eyebrows up, engaged expression. Background is realistic—desk, plants, soft blur. Product clearly visible, she nods as she explains 925 sterling silver with rhodium or rose gold plating. Lighting warm, depth in room, headroom for overlay.",
        "female creator. CTA frame: female creator grins directly at camera, 9:16 vertical, product visible in frame. Relaxed, confident energy, she delivers the CTA with a final zoom and nods. Background remains realistic living room, text overlay space above, eyes locked on lens as she says link in bio.",
      ],
      video_prompts: [
        "female creator. Hook clip: female creator leans in with wide eyes, rapid-fire talk about the Forever Love Heart Necklace, 925 sterling silver with rhodium or rose gold plating, gift-ready wow factor, says link in bio, non-stop mouth, big energy.",
        "female creator. Demo clip: female creator holds the necklace close to camera, explains 925 sterling silver with rhodium or rose gold plating for lasting shine, points to pendant, eyebrows up, fast-talking, confident.",
        "female creator. CTA clip: female creator looks straight into camera with a big grin, delivers payoff line, this is the perfect gift, grab yours now link in bio, necklace clearly visible, relaxed confident energy.",
      ],
      voiceover_script: "This Forever Love Heart Necklace is perfect. 925 sterling silver with rhodium or rose gold plating. Gift mom, wife, or girlfriend will love. Link in bio, grab yours.",
    },
    steps: { ingest: { status: "success", duration_s: 0.0 }, prompts: { status: "success", duration_s: 71.4 }, avatar: { status: "success", duration_s: 61.7 }, frames: { status: "success", duration_s: 1.4 }, videos: { status: "success", duration_s: 2.2 }, merge: { status: "success", duration_s: 0.3 }, tiktok: { status: "success", duration_s: 0.0 } },
    media: { avatar: "/data/11cd701e/avatar.png", frames: ["/data/11cd701e/frame1.png", "/data/11cd701e/frame2.png", "/data/11cd701e/frame3.png"], clips: ["/data/11cd701e/video1.mp4", "/data/11cd701e/video2.mp4", "/data/11cd701e/video3.mp4"], final: "/data/11cd701e/final.mp4" },
  },
  {
    run_id: "d6c02817", persona_id: "1",
    started_at: "2026-04-09T15:26:16.676497+00:00", finished_at: "2026-04-09T15:32:03.320765+00:00",
    status: "success",
    product: { asin: "B0F11KQQF4", title: "MSI Gaming RTX 5070 Ti 16G Gaming Trio OC Graphics Card (16GB GDDR7, 256-bit)" },
    prompts: {
      persona_prompt: "A Nano Banana Pro image generation prompt for a neutral face portrait headshot. Realistic, expressive, magnetic person with natural warmth and personality radiating through their eyes. Plain white/neutral background, looking directly into camera, natural lighting. No props, no context — just the face.",
      scene_prompts: [
        "9:16 vertical shot of a real gaming creator in their element, chest-up, centered, MSI RTX 5070 Ti 16G Gaming Trio OC held up with logo facing camera. The creator looks at camera with wide-eyed excitement, mouth mid-sentence. Background: realistic gaming desk with RGB PC, monitor glow, shallow depth. Warm key light on face, natural window light. Relatable, authentic setup.",
        "9:16 vertical shot, same creator in the same setup, close-up of the MSI RTX 5070 Ti held near camera. The creator gestures at DLSS 4 and Tri FROZR 4 cooling, eyebrows up, engaged expression. Background softly blurred gaming desk, RGB glow. Card clearly visible with label facing camera.",
        "9:16 vertical shot, same creator, grinning at camera, product visible, pointing to a link in bio area on screen. Realistic gaming setup in background, warm lighting. High-energy CTA with confident vibe.",
      ],
      video_prompts: [
        "Animate a standalone 10-second Hook clip. Real gaming setup, creator talks non-stop: this MSI RTX 5070 Ti is a total game-changer, FPS skyrocket, 1440p feels unreal, eyes wide, leaning in, hands moving, hype energy.",
        "Animate the Demo frame into a 5-second clip. The creator rapid-talks through DLSS 4 and TriFROZR 4 cooling while pointing at the card, energetic gestures and nodding.",
        "Animate the CTA frame into a 5-second clip. The creator looks straight at camera with a big grin and delivers payoff line, grab yours now, link in bio, you know this is worth it.",
      ],
      voiceover_script: "MSI RTX 5070 Ti just turned my rig into a beast. DLSS 4 is unreal, temps stay cool, 1440p smooth as butter. Link in bio, grab yours.",
    },
    steps: { ingest: { status: "success", duration_s: 0.0 }, prompts: { status: "success", duration_s: 61.2 }, avatar: { status: "success", duration_s: 31.3 }, frames: { status: "success", duration_s: 1.5 }, videos: { status: "success", duration_s: 4.3 }, merge: { status: "success", duration_s: 0.3 }, tiktok: { status: "success", duration_s: 0.0 } },
    media: { avatar: "/data/d6c02817/avatar.png", frames: ["/data/d6c02817/frame1.png", "/data/d6c02817/frame2.png", "/data/d6c02817/frame3.png"], clips: ["/data/d6c02817/video1.mp4", "/data/d6c02817/video2.mp4", "/data/d6c02817/video3.mp4"], final: "/data/d6c02817/final.mp4" },
  },
  {
    run_id: "8fd7ecfb", persona_id: "1",
    started_at: "2026-04-09T15:17:17.184972+00:00", finished_at: "2026-04-09T15:24:32.105399+00:00",
    status: "success",
    product: { asin: "B0F11KQQF4", title: "MSI Gaming RTX 5070 Ti 16G Gaming Trio OC Graphics Card (16GB GDDR7, 256-bit)" },
    prompts: {
      persona_prompt: "A Nano Banana Pro image generation prompt for a neutral face portrait headshot. Realistic, expressive, magnetic person with natural warmth and personality radiating through their eyes. Plain white/neutral background, looking directly into camera, natural lighting. No props, no context — just the face.",
      scene_prompts: [
        "9:16 vertical shot of a real creator in their gaming setup, chest-up, centered, warm-lit face. Hand holds MSI RTX 5070 Ti 16G card at chest level, product entering frame with a surprised smile. Background shows a gamer desk with dual monitors, RGB lighting, PC tower; depth blur, headroom for text, same energy as frames 2 and 3.",
        "9:16 vertical shot, same creator in gaming setup, chest-up, centered. Product held close to camera, MSI RTX 5070 Ti 16G visible; gesturing at a key feature with eyebrows up, engaged expression. Background remains realistic with monitors and RGB, soft blur, cohesive lighting.",
        "9:16 vertical shot, same creator, chest-up, direct gaze at camera with confident grin. Product visible, frame center, CTA vibe to say link in bio. Background consistent with frames 1 and 2, cozy gaming desk, RGB glow, depth blur, headroom for text overlay.",
      ],
      video_prompts: [
        "Transform the first frame into a 5-second high-energy Hook clip: the creator leans in, eyes wide, mouth moving rapidly delivering the hook about MSI RTX 5070 Ti 16G. They gesture to the card, shout about extreme performance and DLSS 4. Background stays gaming desk with RGB glow, subtle camera sway, same outfit as frame 1, continuous speech.",
        "Transform the second frame into a 5-second Demo clip: the creator holds the GPU close to camera, points at DLSS 4 and TRI Froz 4, explaining feature while nodding and talking fast. Background blurred monitors, RGB glow, same energy as frame 2; lip sync continuous; eyes up; micro-expressions.",
        "Transform the third frame into a 5-second CTA clip: the creator looks into camera with a big grin, delivers the payoff line and urges viewers to click the link in bio, product visible, confident finish; slight handheld sway for life.",
      ],
      voiceover_script: "MSI RTX 5070 Ti 16G slaps hard. DLSS 4 and TRI Froz cooling push 4K vibes now. Link in bio, grab yours today.",
    },
    steps: { ingest: { status: "success", duration_s: 0.0 }, prompts: { status: "success", duration_s: 57.0 }, avatar: { status: "success", duration_s: 31.2 }, frames: { status: "success", duration_s: 1.6 }, videos: { status: "success", duration_s: 2.1 }, merge: { status: "success", duration_s: 0.3 }, tiktok: { status: "success", duration_s: 0.0 } },
    media: { avatar: "/data/8fd7ecfb/avatar.png", frames: ["/data/8fd7ecfb/frame1.png", "/data/8fd7ecfb/frame2.png", "/data/8fd7ecfb/frame3.png"], clips: ["/data/8fd7ecfb/video1.mp4", "/data/8fd7ecfb/video2.mp4", "/data/8fd7ecfb/video3.mp4"], final: "/data/8fd7ecfb/final.mp4" },
  },
  {
    run_id: "119eec57", persona_id: "1",
    started_at: "2026-04-09T15:07:36.598090+00:00", finished_at: "2026-04-09T15:15:29.200594+00:00",
    status: "partial",
    product: { asin: "B0BHJJ9Y77", title: "SAMSUNG 990 PRO SSD NVMe M.2 PCIe Gen4, M.2 2280 Internal Solid State Hard Drive" },
    prompts: {
      persona_prompt: "A Nano Banana Pro image generation prompt for a neutral face portrait headshot. Realistic, expressive, magnetic person with natural warmth and personality radiating through their eyes. Plain white/neutral background, looking directly into camera, natural lighting. No props, no context — just the face.",
      scene_prompts: [
        "9:16 vertical, chest-up, person centered at a desk with RGB glow and monitors in the background, real tech creator energy. Right hand holds a Samsung 990 PRO NVMe SSD, edge visible near camera, product entering frame from right, eyes wide, open-mouthed smile. Warm key light on face, depth in background, headroom for text overlay.",
        "9:16 vertical, chest-up, same lighting and setting. The person holds the SSD close to camera, gestures at a feature while eyebrows raise, mid-sentence energy, explaining speed and install ease.",
        "9:16 vertical, chest-up, same person grinning directly at camera, product visible between hands, relaxed energy, head slightly tilted, room glow and monitors in background, headroom for CTA text.",
      ],
      video_prompts: [
        "Kling 2.6 motion prompt for a 10-second standalone hook: 9:16 frame 0, creator leans in, eyes blazing, rapid-fire hype about Samsung 990 PRO, highlighting speed, ease of install, and gaming/build impact; hands gesture; bright desk glow; continuous talking.",
        "Kling 2.6 motion prompt for the Demo: 9:16 frame 1, fast-talking through key feature while pointing at the SSD, eyebrows up, nodding, camera drift, high-energy delivery.",
        "Kling 2.6 motion prompt for the CTA: 9:16 frame 2, big grin, looks into camera with conviction, delivers payoff line with chin-dip emphasis, product clearly visible, link-in-bio call-to-action.",
      ],
      voiceover_script: "Yo, this Samsung 990 PRO just turbocharged my PC. Blazing speeds, epic load times, zero stutter. If you care about speed, you need this in your build—link in bio.",
    },
    steps: { ingest: { status: "success", duration_s: 0.0 }, prompts: { status: "success", duration_s: 69.9 }, avatar: { status: "success", duration_s: 61.5 }, frames: { status: "partial", duration_s: 1.4 }, videos: { status: "success", duration_s: 1.4 }, merge: { status: "success", duration_s: 0.2 }, tiktok: { status: "success", duration_s: 0.0 } },
    media: { avatar: "/data/119eec57/avatar.png", frames: ["/data/119eec57/frame1.png", null, "/data/119eec57/frame3.png"], clips: ["/data/119eec57/video1.mp4", null, "/data/119eec57/video3.mp4"], final: "/data/119eec57/final.mp4" },
  },
  {
    run_id: "5d212197", persona_id: "2",
    started_at: "2026-04-09T12:50:43.678512+00:00", finished_at: "2026-04-09T13:03:58.175713+00:00",
    status: "partial",
    product: { asin: "B0BHJJ9Y77", title: "SAMSUNG 990 PRO SSD NVMe M.2 PCIe Gen4, M.2 2280 Internal Solid State Hard Drive" },
    prompts: {
      persona_prompt: "A Nano Banana Pro image generation prompt for a neutral face portrait headshot. Realistic, expressive, magnetic person with natural warmth and personality radiating through their eyes. Plain white/neutral background, looking directly into camera, natural lighting. No props, no context — just the face. Full of life.",
      scene_prompts: [
        "9:16 vertical still, chest-up, person centered at a desk with RGB glow and monitors in the background, real tech creator energy. Right hand holds a Samsung 990 PRO NVMe SSD, edge visible near camera, product entering frame from right, eyes wide, open-mouthed smile. Warm key light on face, depth in background, headroom for text overlay.",
        "9:16 vertical still, chest-up, same person at desk, product held close to camera, finger tracing a feature, eyebrows raised, engaged expression; SSD angled to clearly show logo; background with monitors and RGB glow softly blurred.",
        "9:16 vertical still, chest-up, same person grinning directly at camera, product visible between hands, relaxed energy, head slightly tilted, room glow and monitors in background, headroom for CTA text.",
      ],
      video_prompts: [
        "9:16 video arc for 10s standalone TikTok pitch. Right hand lifts the SSD into frame with a quick snap, head tilts, eyes widen, mouth opens slightly. Then the SSD moves toward the lens, right hand rotates slightly, finger traces the edge. Final moment: big grin, confident nod, direct eye contact, slight lean back, high-energy finish. No dialogue, continuous motion.",
        "9:16 frame 2 motion: hands briefly hold SSD near camera, finger taps the edge to highlight a feature, eyebrows rise, eyes spark, wrist tilt as the lens focuses on logo; subtle camera drift; same lighting; maintain fast, punchy rhythm.",
        "9:16 frame 3 motion: product held steady at center, both hands frame the SSD, big smile, eyes lock camera, head tilt and slight nod, product stays visible while tilt and push-back convey CTA energy.",
      ],
      voiceover_script: "Ever seen speeds like this? Samsung 990 PRO just turned my PC into a rocket. Install, boot, load, game on. Link in bio, grab yours now.",
    },
    steps: { ingest: { status: "success", duration_s: 0.0 }, prompts: { status: "success", duration_s: 46.6 }, avatar: { status: "success", duration_s: 61.6 }, frames: { status: "success", duration_s: 1.5 }, videos: { status: "partial", duration_s: 2.1 }, merge: { status: "success", duration_s: 0.3 }, tiktok: { status: "success", duration_s: 0.0 } },
    media: { avatar: "/data/5d212197/avatar.png", frames: ["/data/5d212197/frame1.png", "/data/5d212197/frame2.png", "/data/5d212197/frame3.png"], clips: [null, "/data/5d212197/video2.mp4", "/data/5d212197/video3.mp4"], final: "/data/5d212197/final.mp4" },
  },
];

function mediaToAbsPath(relPath: string | null, runId: string): string | null {
  if (!relPath) return null;
  const filename = relPath.split('/').pop()!;
  return RESULTS_BASE + runId + '/' + filename;
}

let insertedRuns = 0;
for (const run of HARDCODED_RUNS) {
  const framePaths = run.media.frames.map(f => mediaToAbsPath(f, run.run_id));
  const clipPaths = run.media.clips.map(c => mediaToAbsPath(c, run.run_id));
  const finalAbs = RESULTS_BASE + run.run_id + '/final.mp4';
  const finalRel = '/videos/' + run.run_id + '/final.mp4';
  const avatarPath = RESULTS_BASE + run.run_id + '/avatar.png';

  const info = insertRun.run({
    run_id: run.run_id,
    persona_id: parseInt(run.persona_id),
    status: run.status,
    product_asin: run.product.asin,
    product_title: run.product.title,
    voiceover_script: run.prompts.voiceover_script,
    persona_prompt: run.prompts.persona_prompt,
    scene_prompts: JSON.stringify(run.prompts.scene_prompts),
    video_prompts: JSON.stringify(run.prompts.video_prompts),
    avatar_path: avatarPath,
    frame_paths: JSON.stringify(framePaths),
    clip_paths: JSON.stringify(clipPaths),
    final_path_abs: finalAbs,
    final_path_rel: finalRel,
    started_at: run.started_at,
    finished_at: run.finished_at,
    step_log: JSON.stringify(run.steps),
    created_at: run.started_at,
  });
  if (info.changes > 0) insertedRuns++;
}

console.log(`Inserted ${insertedRuns} runs`);
db.close();
