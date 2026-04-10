import Link from "next/link";
import { runs } from "@/data/runs";
import type { StepStatus } from "@/data/runs";

const statusStyle: Record<StepStatus, string> = {
  success: "bg-emerald-900/60 text-emerald-400",
  partial: "bg-yellow-900/60 text-yellow-400",
  failed: "bg-red-900/60 text-red-400",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function countClips(clips: (string | null)[]) {
  return clips.filter(Boolean).length;
}

export default function RunsPage() {
  const sorted = [...runs].sort(
    (a, b) => new Date(b.started_at).getTime() - new Date(a.started_at).getTime()
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-white mb-1">Runs</h1>
        <p className="text-sm text-neutral-500">All pipeline executions</p>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-800">
              <th className="text-left px-5 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Avatar</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Product</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">ASIN</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Clips</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Size</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Started</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((run, i) => (
              <tr
                key={run.run_id}
                className={`hover:bg-neutral-800/40 transition-colors ${i < sorted.length - 1 ? "border-b border-neutral-800/60" : ""}`}
              >
                <td className="px-5 py-3">
                  <img
                    src={run.media.avatar}
                    alt={run.run_id}
                    className="w-8 h-8 rounded-full object-cover bg-neutral-700"
                  />
                </td>
                <td className="px-5 py-3">
                  <Link
                    href={`/runs/${run.run_id}`}
                    className="text-white hover:text-neutral-300 font-medium transition-colors"
                  >
                    {run.product.title.length > 50
                      ? run.product.title.slice(0, 50) + "…"
                      : run.product.title}
                  </Link>
                </td>
                <td className="px-5 py-3">
                  <span className="px-2 py-0.5 bg-neutral-800 text-neutral-400 rounded text-xs font-mono">
                    {run.product.asin}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle[run.status]}`}>
                    {run.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-neutral-400">
                  {countClips(run.media.clips)}/3
                </td>
                <td className="px-5 py-3 text-neutral-500 font-mono text-xs">
                  {(run.tiktok.video_size_kb / 1024).toFixed(1)} MB
                </td>
                <td className="px-5 py-3 text-neutral-500">
                  {formatDate(run.started_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
