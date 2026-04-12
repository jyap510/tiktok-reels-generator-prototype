import { type NextRequest } from 'next/server';
import path from 'path';
import db from '@/lib/db';
import { spawnPython } from '@/lib/spawn-python';

const SCRIPTS_DIR = '/home/jay/Desktop/EvoTech/e8-tiktok-video-post-automation/video_pipeline/src/';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { persona_id, persona_prompt } = body ?? {};

  if (!persona_id || !persona_prompt) {
    return Response.json(
      { error: 'persona_id and persona_prompt are required' },
      { status: 400 }
    );
  }

  const persona = db.prepare('SELECT * FROM personas WHERE id = ?').get(persona_id);
  if (!persona) {
    return Response.json({ error: 'Persona not found' }, { status: 404 });
  }

  const result = await spawnPython(
    path.join(SCRIPTS_DIR, 'generate_avatar.py'),
    [persona_prompt],
    { timeoutMs: 300_000 }
  );

  let parsed: Record<string, unknown> = {};
  try {
    parsed = JSON.parse(result.stdout);
  } catch {
    return Response.json(
      { error: 'Avatar generation failed', detail: result.stderr || 'Invalid JSON from script' },
      { status: 500 }
    );
  }

  if (result.exitCode === 0 && parsed.status === 'success') {
    db.prepare(`
      UPDATE personas
      SET avatar_path = ?, avatar_kie_url = ?, updated_at = strftime('%Y-%m-%dT%H:%M:%SZ', 'now')
      WHERE id = ?
    `).run(parsed.avatar_path as string, parsed.avatar_kie_url as string, persona_id);

    return Response.json(
      { persona_id, avatar_path: parsed.avatar_path, avatar_kie_url: parsed.avatar_kie_url },
      { status: 200 }
    );
  }

  return Response.json(
    { error: 'Avatar generation failed', detail: (parsed.error as string) || result.stderr },
    { status: 500 }
  );
}
