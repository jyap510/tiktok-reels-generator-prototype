import { type NextRequest } from 'next/server';
import db from '@/lib/db';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const persona_id = searchParams.get('persona_id');
  const limit = Math.max(1, parseInt(searchParams.get('limit') ?? '20', 10));
  const offset = Math.max(0, parseInt(searchParams.get('offset') ?? '0', 10));

  const SELECT = `
    SELECT run_id, persona_id, status, product_asin, product_title,
           started_at, finished_at, final_path_rel, created_at
    FROM runs
  `;

  let runs: unknown[];
  let total: number;

  if (persona_id) {
    runs = db
      .prepare(`${SELECT} WHERE persona_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`)
      .all(persona_id, limit, offset);
    const row = db
      .prepare('SELECT COUNT(*) as count FROM runs WHERE persona_id = ?')
      .get(persona_id) as { count: number };
    total = row.count;
  } else {
    runs = db
      .prepare(`${SELECT} ORDER BY created_at DESC LIMIT ? OFFSET ?`)
      .all(limit, offset);
    const row = db.prepare('SELECT COUNT(*) as count FROM runs').get() as { count: number };
    total = row.count;
  }

  return Response.json({ runs, total }, { status: 200 });
}
