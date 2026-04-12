import { type NextRequest } from 'next/server';
import db from '@/lib/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') ?? '10', 10);
  const offset = parseInt(searchParams.get('offset') ?? '0', 10);

  const { count } = db.prepare('SELECT COUNT(*) as count FROM listings').get() as { count: number };
  const rows = db.prepare('SELECT * FROM listings ORDER BY created_at DESC LIMIT ? OFFSET ?').all(limit, offset) as Record<string, unknown>[];

  const listings = rows.map((row) => ({
    ...row,
    images: (() => { try { return JSON.parse(row.images as string); } catch { return []; } })(),
    reviews: (() => { try { return JSON.parse(row.reviews as string); } catch { return []; } })(),
  }));

  return Response.json({ listings, total: count }, { status: 200 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { asin, title, brand, description, images, reviews, json_path } = body ?? {};

  if (!asin || !title) {
    return Response.json({ error: 'asin and title are required' }, { status: 400 });
  }

  db.prepare(`
    INSERT OR REPLACE INTO listings (asin, title, brand, description, images, reviews, json_path)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    asin,
    title,
    brand ?? null,
    description ?? null,
    JSON.stringify(images ?? []),
    JSON.stringify(reviews ?? []),
    json_path ?? null
  );

  const inserted = db.prepare('SELECT * FROM listings WHERE asin = ?').get(asin) as Record<string, unknown>;

  const listing = {
    ...inserted,
    images: (() => { try { return JSON.parse(inserted.images as string); } catch { return []; } })(),
    reviews: (() => { try { return JSON.parse(inserted.reviews as string); } catch { return []; } })(),
  };

  return Response.json({ listing }, { status: 201 });
}
