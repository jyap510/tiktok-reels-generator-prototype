import { notFound } from "next/navigation";
import db from "@/lib/db";
import type { Persona, Run } from "@/types";
import PersonaDetailClient from "./_PersonaDetailClient";

export default async function PersonaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const persona = db.prepare("SELECT * FROM personas WHERE id = ?").get(id) as Persona | null;

  if (!persona) {
    notFound();
  }

  const runRows = db
    .prepare("SELECT * FROM runs WHERE persona_id = ? ORDER BY started_at DESC LIMIT 10")
    .all(id) as Record<string, unknown>[];

  const runs: Run[] = runRows.map((row) => ({
    ...(row as Run),
    scene_prompts: row.scene_prompts ? JSON.parse(row.scene_prompts as string) : null,
    video_prompts: row.video_prompts ? JSON.parse(row.video_prompts as string) : null,
    frame_paths: row.frame_paths ? JSON.parse(row.frame_paths as string) : null,
    clip_paths: row.clip_paths ? JSON.parse(row.clip_paths as string) : null,
    step_log: row.step_log ? JSON.parse(row.step_log as string) : null,
  }));

  return <PersonaDetailClient persona={persona} runs={runs} />;
}
