import { type NextRequest } from 'next/server';
import db from '@/lib/db';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const persona = db.prepare('SELECT * FROM personas WHERE id = ?').get(id);
  if (!persona) {
    return Response.json({ error: 'Persona not found' }, { status: 404 });
  }

  return Response.json(persona, { status: 200 });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const existing = db.prepare('SELECT * FROM personas WHERE id = ?').get(id);
  if (!existing) {
    return Response.json({ error: 'Persona not found' }, { status: 404 });
  }

  const body = await request.json();
  const allowed = ['handle', 'niche', 'description', 'gender', 'avatar_prompt', 'profile_pic_prompt'];
  const fields = Object.keys(body).filter((k) => allowed.includes(k));

  if (fields.length === 0) {
    return Response.json({ error: 'No valid fields to update' }, { status: 400 });
  }

  const setClauses = [
    ...fields.map((f) => `${f} = ?`),
    `updated_at = strftime('%Y-%m-%dT%H:%M:%SZ','now')`,
  ].join(', ');

  const values = fields.map((f) => body[f]);

  db.prepare(`UPDATE personas SET ${setClauses} WHERE id = ?`).run(...values, id);

  const updated = db.prepare('SELECT * FROM personas WHERE id = ?').get(id);
  return Response.json(updated, { status: 200 });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  db.prepare('DELETE FROM personas WHERE id = ?').run(id);

  return new Response(null, { status: 204 });
}
