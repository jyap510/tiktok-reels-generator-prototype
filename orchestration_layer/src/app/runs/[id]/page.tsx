import Link from "next/link";
import path from "path";
import db from "@/lib/db";
import type { Run, RunStatus, StepEntry } from "@/types";

const statusStyle: Record<string, string> = {
  success: "bg-emerald-900/60 text-emerald-400",
  partial: "bg-yellow-900/60 text-yellow-400",
  error: "bg-red-900/60 text-red-400",
  failed: "bg-red-900/60 text-red-400",
  pending: "bg-blue-900/60 text-blue-400",
  running: "bg-blue-900/60 text-blue-400",
};

const stepDotColor: Record<string, string> = {
  success: "bg-emerald-400",
  partial: "bg-yellow-400",
  error: "bg-red-400",
  failed: "bg-red-400",
  pending: "bg-blue-400",
  running: "bg-blue-400",
};

const clipLabels = ["Hook", "Demo", "CTA"] as const;

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default async function RunDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const row = db
    .prepare("SELECT * FROM runs WHERE run_id = ?")
    .get(id) as Record<string, unknown> | null;

  if (!row) {
    return (
      <div className="p-8">
        <p className="text-neutral-200">Run not found.</p>
      </div>
    );
  }

  const run: Run = {
    ...(row as Run),
    scene_prompts: row.scene_prompts
      ? JSON.parse(row.scene_prompts as string)
      : null,
    video_prompts: row.video_prompts
      ? JSON.parse(row.video_prompts as string)
      : null,
    frame_paths: row.frame_paths
      ? JSON.parse(row.frame_paths as string)
      : null,
    clip_paths: row.clip_paths ? JSON.parse(row.clip_paths as string) : null,
    step_log: row.step_log ? JSON.parse(row.step_log as string) : null,
  };

  const stepEntries: [string, StepEntry][] = run.step_log
    ? Object.entries(run.step_log)
    : [];

  // Build media URLs via the API file route
  const avatarUrl = run.avatar_path
    ? `/api/files/${run.run_id}/${path.basename(run.avatar_path)}`
    : null;

  const frameUrls: (string | null)[] = run.frame_paths
    ? run.frame_paths.map((fp) =>
        fp ? `/api/files/${run.run_id}/${path.basename(fp)}` : null
      )
    : [];

  const clipUrls: (string | null)[] = run.clip_paths
    ? run.clip_paths.map((cp) =>
        cp ? `/api/files/${run.run_id}/${path.basename(cp)}` : null
      )
    : [];

  const finalUrl = run.final_path_abs
    ? `/api/files/${run.run_id}/final.mp4`
    : run.final_path_rel ?? null;

  return (
    <div className="p-8 px-10 max-w-6xl mx-auto space-y-10">
      <Link
        href="/runs"
        className="inline-flex items-center gap-2 text-neutral-400 hover:text-white text-sm mb-6 transition-colors"
      >
        <span>←</span>
        <span>Back to Runs</span>
      </Link>

      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-3 mb-1">
          <h1 className="text-3xl font-semibold text-white">
            {run.product_title ?? "—"}
          </h1>
          {run.product_asin && (
            <span className="px-2 py-0.5 bg-neutral-800 text-neutral-200 rounded text-base font-mono">
              {run.product_asin}
            </span>
          )}
          <span
            className={`px-2 py-0.5 rounded-full text-base font-medium ${
              statusStyle[run.status] ?? "bg-neutral-800 text-neutral-400"
            }`}
          >
            {run.status}
          </span>
        </div>
        <p className="text-base text-neutral-300 font-mono">{run.run_id}</p>
      </div>

      {/* Avatar + Voiceover */}
      <div className="flex gap-6 items-start">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="avatar"
            className="w-[120px] h-[120px] rounded-full object-cover bg-neutral-700 shrink-0"
          />
        ) : (
          <div className="w-[120px] h-[120px] rounded-full bg-neutral-800 border border-neutral-700 shrink-0" />
        )}
        <div className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg p-5">
          <p className="text-base text-neutral-300 uppercase tracking-wider mb-3">
            Voiceover Script
          </p>
          <blockquote className="border-l-2 border-neutral-600 pl-4 text-neutral-300 text-lg leading-relaxed italic">
            &ldquo;{run.voiceover_script ?? "—"}&rdquo;
          </blockquote>
        </div>
      </div>

      {/* Frames */}
      {frameUrls.length > 0 && (
        <div>
          <h2 className="text-lg font-medium text-neutral-200 uppercase tracking-wider mb-4">
            Frames
          </h2>
          <div className="flex gap-4">
            {frameUrls.map((frame, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <p className="text-base text-neutral-300 font-medium">
                  {clipLabels[i] ?? `Frame ${i + 1}`}
                </p>
                {frame ? (
                  <div className="w-[240px] aspect-[9/16] rounded-lg overflow-hidden bg-neutral-800">
                    <img
                      src={frame}
                      alt={`frame ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-[240px] aspect-[9/16] rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center">
                    <span className="text-xs text-neutral-500">Failed</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Clips */}
      {clipUrls.length > 0 && (
        <div>
          <h2 className="text-lg font-medium text-neutral-200 uppercase tracking-wider mb-4">
            Clips
          </h2>
          <div className="flex gap-4">
            {clipUrls.map((clip, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <p className="text-base text-neutral-300 font-medium">
                  {clipLabels[i] ?? `Clip ${i + 1}`}
                </p>
                {clip ? (
                  <div className="w-[240px] aspect-[9/16] rounded-lg overflow-hidden bg-black">
                    <video
                      src={clip}
                      controls
                      muted
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-[240px] aspect-[9/16] rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center">
                    <span className="text-xs text-neutral-500">Failed</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Final Video */}
      {finalUrl && (
        <div>
          <h2 className="text-lg font-medium text-neutral-200 uppercase tracking-wider mb-4">
            Final Video
          </h2>
          <div className="w-[420px] aspect-[9/16] rounded-lg overflow-hidden bg-black">
            <video
              src={finalUrl}
              controls
              muted
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Pipeline */}
      {stepEntries.length > 0 && (
        <div>
          <h2 className="text-lg font-medium text-neutral-200 uppercase tracking-wider mb-4">
            Pipeline
          </h2>
          <div className="flex flex-wrap gap-2">
            {stepEntries.map(([key, step]) => (
              <div
                key={key}
                className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-full px-3 py-1.5"
              >
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    stepDotColor[step.status] ?? "bg-neutral-500"
                  }`}
                />
                <span className="text-base text-white font-medium">
                  {capitalize(key)}
                </span>
                <span className="text-base text-neutral-300">
                  {step.duration_s}s
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
