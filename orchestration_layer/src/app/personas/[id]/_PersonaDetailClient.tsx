"use client";

import { useState } from "react";
import Link from "next/link";
import type { Persona, Run } from "@/types";

const runStatusColor: Record<string, string> = {
  success: "bg-emerald-900/60 text-emerald-400",
  partial: "bg-yellow-900/60 text-yellow-400",
  error: "bg-red-900/60 text-red-400",
  failed: "bg-red-900/60 text-red-400",
  pending: "bg-blue-900/60 text-blue-400",
  running: "bg-blue-900/60 text-blue-400",
};

const clipLabels = ["Hook", "Demo", "CTA"] as const;

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const basename = (p: string | null): string | null =>
  p ? p.split("/").pop()! : null;

const PAGE_SIZE = 3;

export default function PersonaDetailClient({
  persona,
  runs,
}: {
  persona: Persona;
  runs: Run[];
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [asin, setAsin] = useState("");
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(runs.length / PAGE_SIZE);
  const visibleRuns = runs.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Back link */}
      <Link
        href="/personas"
        className="inline-flex items-center gap-2 text-neutral-400 hover:text-white text-lg mb-6 transition-colors"
      >
        <span>←</span>
        <span>Back to Personas</span>
      </Link>

      {/* Top section */}
      <div className="flex gap-6 items-start">
        {/* Avatar + profile pic column */}
        <div className="flex flex-col gap-3 shrink-0">
          {persona.avatar_path ? (
            <img
              src={`/api/personas/${persona.id}/avatar`}
              alt={persona.handle}
              className="w-[240px] h-[240px] rounded-xl object-cover bg-neutral-800"
            />
          ) : (
            <div className="w-[240px] h-[240px] rounded-xl bg-neutral-800 border border-neutral-700" />
          )}
          {persona.profile_pic_path && (
            <img
              src={`/api/personas/${persona.id}/profile-pic`}
              alt={`${persona.handle} profile pic`}
              className="w-20 h-20 rounded-lg object-cover bg-neutral-800"
            />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 pt-1">
          <h1 className="text-4xl font-bold text-white mb-2">@{persona.handle}</h1>
          {persona.niche && (
            <p className="text-lg text-neutral-200 mb-1">{persona.niche}</p>
          )}
          {persona.description && (
            <p className="text-lg text-neutral-300 mb-6">{persona.description}</p>
          )}

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setModalOpen(true)}
              className="px-4 py-2 bg-white text-black text-lg font-medium rounded-lg hover:bg-neutral-200 transition-colors"
            >
              + Generate
            </button>
            <button
              onClick={() => alert("Upload queued")}
              className="px-4 py-2 border border-neutral-600 text-neutral-300 text-lg font-medium rounded-lg hover:border-neutral-400 hover:text-white transition-colors"
            >
              Upload Latest
            </button>
          </div>
        </div>
      </div>

      {/* Generate modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 w-full max-w-sm mx-4 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-white font-semibold text-2xl">New Run</h2>
            <input
              type="text"
              placeholder="e.g. B0F11KQQF4"
              value={asin}
              onChange={(e) => setAsin(e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-lg text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-lg text-neutral-200 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => alert("Pipeline triggered for ASIN: " + asin)}
                className="px-4 py-2 bg-white text-black text-lg font-medium rounded-lg hover:bg-neutral-200 transition-colors"
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Runs section */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-5">
          Recent Runs{" "}
          <span className="text-neutral-300 font-normal text-lg">({runs.length})</span>
        </h2>

        <div className="space-y-6">
          {visibleRuns.map((run) => (
            <div
              key={run.run_id}
              className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 space-y-5"
            >
              {/* Run header row */}
              <div className="flex items-center gap-3 flex-wrap">
                <p className="text-white font-medium text-lg truncate flex-1 min-w-0">
                  {run.product_title ?? "Untitled"}
                </p>
                {run.product_asin && (
                  <span className="px-2 py-0.5 bg-neutral-800 text-neutral-200 rounded text-base font-mono shrink-0">
                    {run.product_asin}
                  </span>
                )}
                <span
                  className={`px-2 py-0.5 rounded-full text-base font-medium shrink-0 ${
                    runStatusColor[run.status] ?? "bg-neutral-800 text-neutral-400"
                  }`}
                >
                  {run.status}
                </span>
                <span className="text-base text-neutral-300 shrink-0 ml-auto">
                  {formatDate(run.started_at)}
                </span>
              </div>

              {/* Frames row */}
              {run.frame_paths && run.frame_paths.length > 0 && (
                <div>
                  <p className="text-base text-neutral-300 uppercase tracking-wider mb-3">
                    Frames
                  </p>
                  <div className="flex gap-4">
                    {run.frame_paths.map((frame, i) => {
                      const src = frame
                        ? `/api/files/${run.run_id}/${basename(frame)}`
                        : null;
                      return (
                        <div key={i} className="flex flex-col items-center gap-1.5">
                          <p className="text-base text-neutral-300">
                            {clipLabels[i] ?? `Frame ${i + 1}`}
                          </p>
                          {src ? (
                            <div className="w-[240px] aspect-[9/16] rounded-lg overflow-hidden bg-neutral-800">
                              <img
                                src={src}
                                alt={`frame ${i + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-[240px] aspect-[9/16] rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center">
                              <span className="text-base text-neutral-500">Failed</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Clips row */}
              {run.clip_paths && run.clip_paths.length > 0 && (
                <div>
                  <p className="text-base text-neutral-300 uppercase tracking-wider mb-3">
                    Clips
                  </p>
                  <div className="flex gap-4">
                    {run.clip_paths.map((clip, i) => {
                      const src = clip
                        ? `/api/files/${run.run_id}/${basename(clip)}`
                        : null;
                      return (
                        <div key={i} className="flex flex-col items-center gap-1.5">
                          <p className="text-base text-neutral-300">
                            {clipLabels[i] ?? `Clip ${i + 1}`}
                          </p>
                          {src ? (
                            <div className="w-[240px] aspect-[9/16] rounded-lg overflow-hidden bg-black">
                              <video
                                src={src}
                                controls
                                muted
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-[240px] aspect-[9/16] rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center">
                              <span className="text-base text-neutral-500">Failed</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Final video */}
              <div>
                <p className="text-base text-neutral-300 uppercase tracking-wider mb-3">
                  Final Video
                </p>
                <div className="w-[420px] aspect-[9/16] rounded-lg overflow-hidden bg-black">
                  <video
                    src={
                      run.final_path_rel ??
                      `/api/files/${run.run_id}/final.mp4`
                    }
                    controls
                    muted
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Voiceover script */}
              {run.voiceover_script && (
                <p className="text-base text-neutral-200 italic line-clamp-2">
                  &ldquo;{run.voiceover_script}&rdquo;
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Pagination */}
        {runs.length > PAGE_SIZE && (
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="px-3 py-1.5 border border-neutral-700 text-neutral-200 text-base rounded-lg disabled:opacity-40 hover:border-neutral-500 hover:text-white transition-colors disabled:hover:border-neutral-700 disabled:hover:text-neutral-400"
            >
              Prev
            </button>
            <span className="text-base text-neutral-300">
              {page + 1} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="px-3 py-1.5 border border-neutral-700 text-neutral-200 text-base rounded-lg disabled:opacity-40 hover:border-neutral-500 hover:text-white transition-colors disabled:hover:border-neutral-700 disabled:hover:text-neutral-400"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
