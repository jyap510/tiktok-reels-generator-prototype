import { type NextRequest } from 'next/server';
import db from '@/lib/db';

const JSON_COLUMNS = ['scene_prompts', 'video_prompts', 'frame_paths', 'clip_paths', 'step_log'] as const;

function parseJsonColumns(row: Record<string, unknown>): Record<string, unknown> {
  const result = { ...row };
  for (const col of JSON_COLUMNS) {
    if (typeof result[col] === 'string') {
      try {
        result[col] = JSON.parse(result[col] as string);
      } catch {
        // leave as-is if parse fails
      }
    }
  }
  return result;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const run = db.prepare('SELECT * FROM runs WHERE run_id = ?').get(id) as Record<string, unknown> | undefined;
  if (!run) {
    return Response.json({ error: 'Run not found' }, { status: 404 });
  }

  const parsedRun = parseJsonColumns(run);

  const generations = db
    .prepare('SELECT * FROM generations WHERE run_id = ? ORDER BY id ASC')
    .all(id);

  return Response.json({ ...parsedRun, generations }, { status: 200 });
}
