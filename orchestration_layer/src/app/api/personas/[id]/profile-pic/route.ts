import { type NextRequest } from 'next/server';
import fs from 'fs';
import db from '@/lib/db';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const persona = db.prepare('SELECT profile_pic_path FROM personas WHERE id = ?').get(id) as
    | { profile_pic_path: string | null }
    | undefined;

  if (!persona || !persona.profile_pic_path) {
    return new Response(null, { status: 404 });
  }

  try {
    const buffer = await fs.promises.readFile(persona.profile_pic_path);
    return new Response(buffer, { headers: { 'Content-Type': 'image/png' } });
  } catch {
    return new Response(null, { status: 404 });
  }
}
