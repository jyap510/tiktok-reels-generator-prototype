import { type NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

const RESULTS_DIR =
  '/home/jay/Desktop/EvoTech/e8-tiktok-video-post-automation/video_pipeline/results';

const RUN_ID_RE = /^[a-f0-9]{8}$/;
const FILENAME_RE = /^[a-zA-Z0-9_-]+\.(png|jpg|jpeg|mp4)$/;

const CONTENT_TYPES: Record<string, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  mp4: 'video/mp4',
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ run_id: string; filename: string }> }
) {
  const { run_id, filename } = await params;

  if (!RUN_ID_RE.test(run_id)) {
    return new Response('Invalid run_id', { status: 400 });
  }

  if (!FILENAME_RE.test(filename)) {
    return new Response('Invalid filename', { status: 400 });
  }

  const filePath = path.join(RESULTS_DIR, run_id, filename);

  if (!fs.existsSync(filePath)) {
    return new Response('File not found', { status: 404 });
  }

  const ext = filename.split('.').pop()!.toLowerCase();
  const contentType = CONTENT_TYPES[ext] ?? 'application/octet-stream';

  const buffer = fs.readFileSync(filePath);

  return new Response(buffer, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Content-Length': String(buffer.byteLength),
    },
  });
}
