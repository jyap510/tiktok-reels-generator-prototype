import { type NextRequest } from 'next/server';
import path from 'path';
import db from '@/lib/db';
import { spawnPython } from '@/lib/spawn-python';

const SCRIPTS_DIR = '/home/jay/Desktop/EvoTech/e8-tiktok-video-post-automation/video_pipeline/src/';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { persona_id, profile_pic_prompt } = body ?? {};

  if (!persona_id || !profile_pic_prompt) {
    return Response.json(
      { error: 'persona_id and profile_pic_prompt are required' },
      { status: 400 }
    );
  }

  const persona = db.prepare('SELECT * FROM personas WHERE id = ?').get(persona_id);
  if (!persona) {
    return Response.json({ error: 'Persona not found' }, { status: 404 });
  }

  const result = await spawnPython(
    path.join(SCRIPTS_DIR, 'generate_profile_pic.py'),
    [profile_pic_prompt],
    { timeoutMs: 300_000 }
  );

  let parsed: Record<string, unknown> = {};
  try {
    parsed = JSON.parse(result.stdout);
  } catch {
    return Response.json(
      { error: 'Profile pic generation failed', detail: result.stderr || 'Invalid JSON from script' },
      { status: 500 }
    );
  }

  if (result.exitCode === 0 && parsed.status === 'success') {
    db.prepare(`
      UPDATE personas
      SET profile_pic_path = ?, updated_at = strftime('%Y-%m-%dT%H:%M:%SZ', 'now')
      WHERE id = ?
    `).run(parsed.profile_pic_path as string, persona_id);

    return Response.json(
      { persona_id, profile_pic_path: parsed.profile_pic_path },
      { status: 200 }
    );
  }

  return Response.json(
    { error: 'Profile pic generation failed', detail: (parsed.error as string) || result.stderr },
    { status: 500 }
  );
}
