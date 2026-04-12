import Link from "next/link";
import { getRunById } from "@/data/runs";
import type { StepStatus } from "@/data/runs";

const statusStyle: Record<StepStatus, string> = {
  success: "bg-emerald-900/60 text-emerald-400",
  partial: "bg-yellow-900/60 text-yellow-400",
  failed: "bg-red-900/60 text-red-400",
};

const stepDotColor: Record<StepStatus, string> = {
  success: "bg-emerald-400",
  partial: "bg-yellow-400",
  failed: "bg-red-400",
};

const clipLabels = ["Hook", "Demo", "CTA"] as const;

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function RunDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const run = getRunById(id);

  if (!run) {
    return (
      <div className="p-8">
        <p className="text-neutral-200">Run not found.</p>
      </div>
    );
  }

  const steps: { key: keyof typeof run.steps; label: string }[] = [
    { key: "ingest", label: "Ingest" },
    { key: "prompts", label: "Prompts" },
    { key: "avatar", label: "Avatar" },
    { key: "frames", label: "Frames" },
    { key: "videos", label: "Videos" },
    { key: "merge", label: "Merge" },
    { key: "tiktok", label: "Upload" },
  ];

  return (
    <div className="p-8 px-10 max-w-6xl mx-auto space-y-10">
      <Link href="/runs" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white text-sm mb-6 transition-colors">
        <span>←</span>
        <span>Back to Runs</span>
      </Link>

      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-3 mb-1">
          <h1 className="text-3xl font-semibold text-white">{run.product.title}</h1>
          <span className="px-2 py-0.5 bg-neutral-800 text-neutral-200 rounded text-base font-mono">
            {run.product.asin}
          </span>
          <span className={`px-2 py-0.5 rounded-full text-base font-medium ${statusStyle[run.status]}`}>
            {run.status}
          </span>
        </div>
        <p className="text-base text-neutral-300 font-mono">{run.run_id}</p>
      </div>

      {/* Avatar + Voiceover */}
      <div className="flex gap-6 items-start">
        <img
          src={run.media.avatar}
          alt="avatar"
          className="w-[120px] h-[120px] rounded-full object-cover bg-neutral-700 shrink-0"
        />
        <div className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg p-5">
          <p className="text-base text-neutral-300 uppercase tracking-wider mb-3">Voiceover Script</p>
          <blockquote className="border-l-2 border-neutral-600 pl-4 text-neutral-300 text-lg leading-relaxed italic">
            &ldquo;{run.prompts.voiceover_script}&rdquo;
          </blockquote>
        </div>
      </div>

      {/* Frames */}
      <div>
        <h2 className="text-lg font-medium text-neutral-200 uppercase tracking-wider mb-4">Frames</h2>
        <div className="flex gap-4">
          {run.media.frames.map((frame, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <p className="text-base text-neutral-300 font-medium">{clipLabels[i]}</p>
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

      {/* Clips */}
      <div>
        <h2 className="text-lg font-medium text-neutral-200 uppercase tracking-wider mb-4">Clips</h2>
        <div className="flex gap-4">
          {run.media.clips.map((clip, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <p className="text-base text-neutral-300 font-medium">{clipLabels[i]}</p>
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

      {/* Final Video */}
      <div>
        <h2 className="text-lg font-medium text-neutral-200 uppercase tracking-wider mb-4">Final Video</h2>
        <div className="w-[420px] aspect-[9/16] rounded-lg overflow-hidden bg-black">
          <video
            src={run.media.final}
            controls
            muted
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Pipeline */}
      <div>
        <h2 className="text-lg font-medium text-neutral-200 uppercase tracking-wider mb-4">Pipeline</h2>
        <div className="flex flex-wrap gap-2">
          {steps.map(({ key, label }) => {
            const step = run.steps[key];
            return (
              <div
                key={key}
                className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-full px-3 py-1.5"
              >
                <span className={`w-2 h-2 rounded-full shrink-0 ${stepDotColor[step.status]}`} />
                <span className="text-base text-white font-medium">{label}</span>
                <span className="text-base text-neutral-300">{step.duration_s}s</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* TikTok */}
      <div>
        <h2 className="text-lg font-medium text-neutral-200 uppercase tracking-wider mb-4">TikTok</h2>
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-5 grid grid-cols-2 gap-4">
          <div>
            <p className="text-base text-neutral-300 mb-1">Upload ID</p>
            <p className="text-base font-mono text-neutral-300">{run.tiktok.upload_id}</p>
          </div>
          <div>
            <p className="text-base text-neutral-300 mb-1">Video ID</p>
            <p className="text-base font-mono text-neutral-300">{run.tiktok.video_id}</p>
          </div>
          <div>
            <p className="text-base text-neutral-300 mb-1">Size</p>
            <p className="text-xl text-white font-medium">
              {(run.tiktok.video_size_kb / 1024).toFixed(1)} MB
            </p>
          </div>
          <div>
            <p className="text-base text-neutral-300 mb-1">Timestamp</p>
            <p className="text-xl text-neutral-300">{formatDate(run.tiktok.timestamp)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
