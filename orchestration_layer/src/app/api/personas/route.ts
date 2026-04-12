import { type NextRequest } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  const personas = db.prepare('SELECT * FROM personas ORDER BY created_at DESC').all();
  return Response.json({ personas }, { status: 200 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { handle, niche, description, gender, avatar_prompt, profile_pic_prompt } = body ?? {};

  if (!handle || !niche || !gender) {
    return Response.json(
      { error: 'handle, niche, and gender are required' },
      { status: 400 }
    );
  }

  const stmt = db.prepare(`
    INSERT INTO personas (handle, niche, description, gender, avatar_prompt, profile_pic_prompt)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    handle,
    niche,
    description ?? null,
    gender,
    avatar_prompt ?? null,
    profile_pic_prompt ?? null
  );

  const inserted = db
    .prepare('SELECT * FROM personas WHERE id = ?')
    .get(result.lastInsertRowid);

  return Response.json(inserted, { status: 201 });
}
