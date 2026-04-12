import { type NextRequest } from 'next/server';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import db from '@/lib/db';
import { spawnPython } from '@/lib/spawn-python';

const SCRIPTS_DIR = '/home/jay/Desktop/EvoTech/e8-tiktok-video-post-automation/video_pipeline/src/';
const RESULTS_DIR = '/home/jay/Desktop/EvoTech/e8-tiktok-video-post-automation/video_pipeline/results/';
const PUBLIC_VIDEOS_DIR = '/home/jay/Desktop/EvoTech/e8-tiktok-video-post-automation/orchestration_layer/public/videos/';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const {
    persona_id,
    product_asin,
    product_title,
    listing_json_path,
    voiceover_script,
    scene_prompts,
    video_prompts,
    persona_prompt,
    prompt_draft_id,
  } = body ?? {};

  // Validate required fields
  if (
    !persona_id ||
    !product_asin ||
    !product_title ||
    !listing_json_path ||
    !voiceover_script ||
    !scene_prompts ||
    !video_prompts ||
    !persona_prompt
  ) {
    return Response.json(
      {
        error:
          'persona_id, product_asin, product_title, listing_json_path, voiceover_script, scene_prompts, video_prompts, and persona_prompt are required',
      },
      { status: 400 }
    );
  }

  const persona = db.prepare('SELECT * FROM personas WHERE id = ?').get(
    persona_id
  ) as Record<string, unknown> | undefined;

  if (!persona) {
    return Response.json({ error: 'Persona not found' }, { status: 404 });
  }

  if (!persona.avatar_kie_url) {
    return Response.json(
      { error: 'Persona has no avatar. Generate avatar first.' },
      { status: 400 }
    );
  }

  const runId = crypto.randomUUID().replace(/-/g, '').slice(0, 8);
  const outDir = path.join(RESULTS_DIR, runId);

  db.prepare(`
    INSERT INTO runs (
      run_id, persona_id, status, product_asin, product_title,
      voiceover_script, persona_prompt, scene_prompts, video_prompts, started_at
    ) VALUES (?, ?, 'pending', ?, ?, ?, ?, ?, ?, ?)
  `).run(
    runId,
    persona_id,
    product_asin,
    product_title,
    voiceover_script,
    persona_prompt,
    JSON.stringify(scene_prompts),
    JSON.stringify(video_prompts),
    new Date().toISOString()
  );

  // Fire-and-forget pipeline execution
  setImmediate(async () => {
    try {
      db.prepare(`UPDATE runs SET status = 'running' WHERE run_id = ?`).run(runId);

      const result = await spawnPython(
        path.join(SCRIPTS_DIR, 'generate_video.py'),
        [
          '--avatar-kie-url', persona.avatar_kie_url as string,
          '--listing-json',   listing_json_path,
          '--script',         voiceover_script,
          '--scene-prompts',  JSON.stringify(scene_prompts),
          '--video-prompts',  JSON.stringify(video_prompts),
          '--run-id',         runId,
          '--out-dir',        outDir,
        ],
        { timeoutMs: 1_500_000 }
      );

      let parsed: Record<string, unknown> = {};
      try {
        parsed = JSON.parse(result.stdout);
      } catch {
        db.prepare(`
          UPDATE runs SET status = 'error', error_message = ?, finished_at = ? WHERE run_id = ?
        `).run('Invalid JSON from generate_video.py: ' + result.stderr, new Date().toISOString(), runId);
        return;
      }

      const status = parsed.status as string;

      if (result.exitCode === 0 && (status === 'success' || status === 'partial')) {
        const finalPath = parsed.final_path as string;
        const publicRunDir = path.join(PUBLIC_VIDEOS_DIR, runId);
        fs.mkdirSync(publicRunDir, { recursive: true });
        fs.copyFileSync(finalPath, path.join(publicRunDir, 'final.mp4'));
        const finalRel = `/videos/${runId}/final.mp4`;

        db.prepare(`
          UPDATE runs SET
            status          = ?,
            final_path_abs  = ?,
            final_path_rel  = ?,
            frame_paths     = ?,
            clip_paths      = ?,
            step_log        = ?,
            finished_at     = ?
          WHERE run_id = ?
        `).run(
          status,
          finalPath,
          finalRel,
          JSON.stringify(parsed.frame_paths ?? []),
          JSON.stringify(parsed.clip_paths ?? []),
          JSON.stringify(parsed.step_log ?? []),
          new Date().toISOString(),
          runId
        );

        // Bulk insert generations
        const generations = (parsed.generations as Array<Record<string, unknown>>) ?? [];
        const genStmt = db.prepare(`
          INSERT INTO generations (run_id, step, kie_task_id, kie_url, status)
          VALUES (?, ?, ?, ?, ?)
        `);
        for (const gen of generations) {
          genStmt.run(
            runId,
            gen.step as string,
            (gen.kie_task_id as string) ?? null,
            (gen.kie_url as string) ?? null,
            (gen.status as string) ?? 'submitted'
          );
        }
      } else {
        db.prepare(`
          UPDATE runs SET status = 'error', error_message = ?, finished_at = ? WHERE run_id = ?
        `).run((parsed.error as string) || result.stderr, new Date().toISOString(), runId);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      db.prepare(`
        UPDATE runs SET status = 'error', error_message = ?, finished_at = ? WHERE run_id = ?
      `).run(message, new Date().toISOString(), runId);
    }
  });

  return Response.json({ run_id: runId, status: 'pending' }, { status: 202 });
}
