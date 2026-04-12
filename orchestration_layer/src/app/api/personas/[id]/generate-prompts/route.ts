import { type NextRequest } from 'next/server';
import db from '@/lib/db';
import { spawnPython } from '@/lib/spawn-python';

const GENERATE_PROMPTS_SCRIPT =
  '/home/jay/Desktop/EvoTech/e8-tiktok-video-post-automation/video_pipeline/src/generate_prompts.py';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const persona = db.prepare('SELECT * FROM personas WHERE id = ?').get(id);
  if (!persona) {
    return Response.json({ error: 'Persona not found' }, { status: 404 });
  }

  const body = await request.json();
  const {
    product_asin,
    product_title,
    description = '',
    images = [],
    reviews = [],
  } = body ?? {};

  if (!product_asin || !product_title) {
    return Response.json(
      { error: 'product_asin and product_title are required' },
      { status: 400 }
    );
  }

  const result = await spawnPython(
    GENERATE_PROMPTS_SCRIPT,
    [
      '--asin', product_asin,
      '--title', product_title,
      '--description', description,
      '--images', JSON.stringify(images),
      '--reviews', JSON.stringify(reviews),
    ],
    { timeoutMs: 120_000 }
  );

  if (result.exitCode !== 0) {
    return Response.json(
      { error: 'generate_prompts.py failed', stderr: result.stderr },
      { status: 500 }
    );
  }

  let parsed: {
    persona_prompt?: string;
    scene_prompts?: unknown[];
    video_prompts?: unknown[];
    voiceover_script?: string;
    profile_pic_prompt?: string;
  };

  try {
    parsed = JSON.parse(result.stdout);
  } catch {
    return Response.json(
      { error: 'Failed to parse generate_prompts.py output', stdout: result.stdout },
      { status: 500 }
    );
  }

  const {
    persona_prompt,
    scene_prompts,
    video_prompts,
    voiceover_script,
    profile_pic_prompt,
  } = parsed;

  const stmt = db.prepare(`
    INSERT INTO prompt_drafts
      (persona_id, product_asin, source, persona_prompt, scene_prompts, video_prompts, voiceover_script, profile_pic_prompt)
    VALUES (?, ?, 'gpt', ?, ?, ?, ?, ?)
  `);

  const insertResult = stmt.run(
    Number(id),
    product_asin,
    persona_prompt ?? null,
    JSON.stringify(scene_prompts ?? []),
    JSON.stringify(video_prompts ?? []),
    voiceover_script ?? null,
    profile_pic_prompt ?? null
  );

  return Response.json(
    {
      draft_id: insertResult.lastInsertRowid,
      persona_prompt,
      scene_prompts,
      video_prompts,
      voiceover_script,
      profile_pic_prompt,
    },
    { status: 200 }
  );
}
