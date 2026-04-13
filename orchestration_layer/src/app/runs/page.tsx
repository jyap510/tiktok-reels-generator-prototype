import Link from "next/link";
import db from "@/lib/db";
import type { Run, RunStatus } from "@/types";

const statusStyle: Record<RunStatus, string> = {
  success: "bg-emerald-900/60 text-emerald-400",
  partial: "bg-yellow-900/60 text-yellow-400",
  error: "bg-red-900/60 text-red-400",
  pending: "bg-blue-900/60 text-blue-400",
  running: "bg-blue-900/60 text-blue-400",
};

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function countClips(clipPathsRaw: unknown): number {
  if (!clipPathsRaw) return 0;
  try {
    const parsed = typeof clipPathsRaw === "string"
      ? JSON.parse(clipPathsRaw)
      : clipPathsRaw;
    if (!Array.isArray(parsed)) return 0;
    return parsed.filter(Boolean).length;
  } catch {
    return 0;
  }
}

export default function RunsPage() {
  const rows = db.prepare("SELECT * FROM runs ORDER BY started_at DESC").all() as Run[];

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
              <th className="text-left px-5 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Product</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">ASIN</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Clips</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Started</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((run, i) => (
              <tr
                key={run.run_id}
                className={`hover:bg-neutral-800/40 transition-colors ${i < rows.length - 1 ? "border-b border-neutral-800/60" : ""}`}
              >
                <td className="px-5 py-3">
                  <Link
                    href={`/runs/${run.run_id}`}
                    className="text-white hover:text-neutral-300 font-medium transition-colors"
                  >
                    {run.product_title
                      ? run.product_title.length > 50
                        ? run.product_title.slice(0, 50) + "…"
                        : run.product_title
                      : run.run_id}
                  </Link>
                </td>
                <td className="px-5 py-3">
                  {run.product_asin ? (
                    <span className="px-2 py-0.5 bg-neutral-800 text-neutral-400 rounded text-xs font-mono">
                      {run.product_asin}
                    </span>
                  ) : (
                    <span className="text-neutral-600">—</span>
                  )}
                </td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle[run.status] ?? "bg-neutral-800 text-neutral-400"}`}>
                    {run.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-neutral-400">
                  {countClips(run.clip_paths)}/3
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
