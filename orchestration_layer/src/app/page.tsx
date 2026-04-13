import Link from "next/link";
import db from "@/lib/db";
import type { Run, RunStatus } from "@/types";

const statusStyle: Record<RunStatus, string> = {
  success: "bg-emerald-900/60 text-emerald-400",
  partial: "bg-yellow-900/60 text-yellow-400",
  error: "bg-red-900/60 text-red-400",
  pending: "bg-neutral-800 text-neutral-400",
  running: "bg-blue-900/60 text-blue-400",
};

function formatRelative(iso: string | null) {
  if (!iso) return "—";
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function DashboardPage() {
  const totalRuns = (db.prepare("SELECT COUNT(*) as count FROM runs").get() as { count: number }).count;
  const uniqueProducts = (db.prepare("SELECT COUNT(DISTINCT product_asin) as count FROM runs").get() as { count: number }).count;
  const successCount = (db.prepare("SELECT COUNT(*) as count FROM runs WHERE status = 'success'").get() as { count: number }).count;

  const stats = [
    { label: "Total Runs", value: String(totalRuns) },
    { label: "Products", value: String(uniqueProducts) },
    { label: "Successful", value: String(successCount) },
    { label: "Partial / Failed", value: String(totalRuns - successCount) },
  ];

  const recentRows = db
    .prepare("SELECT * FROM runs ORDER BY started_at DESC LIMIT 3")
    .all() as Run[];

  return (
    <div className="p-8">
      <h1 className="text-xl font-semibold text-white mb-1">Dashboard</h1>
      <p className="text-sm text-neutral-500 mb-8">Pipeline overview</p>

      <div className="grid grid-cols-2 gap-4 mb-10 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-neutral-900 border border-neutral-800 rounded-lg p-5">
            <p className="text-xs text-neutral-500 mb-2">{s.label}</p>
            <p className="text-2xl font-semibold text-white">{s.value}</p>
          </div>
        ))}
      </div>

      <h2 className="text-sm font-medium text-neutral-400 mb-4 uppercase tracking-wider">Recent Runs</h2>
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-800">
              <th className="text-left px-5 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Run ID</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Product</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Started</th>
            </tr>
          </thead>
          <tbody>
            {recentRows.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-6 text-center text-neutral-500">No runs yet</td>
              </tr>
            ) : (
              recentRows.map((run, i) => (
                <tr key={run.run_id} className={i < recentRows.length - 1 ? "border-b border-neutral-800/60" : ""}>
                  <td className="px-5 py-3">
                    <Link
                      href={`/runs/${run.run_id}`}
                      className="font-mono text-xs text-neutral-300 hover:text-white transition-colors"
                    >
                      {run.run_id.slice(0, 8)}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-neutral-300">
                    {run.product_title
                      ? run.product_title.length > 40
                        ? run.product_title.slice(0, 40) + "…"
                        : run.product_title
                      : <span className="text-neutral-500">—</span>}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle[run.status]}`}>
                      {run.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-neutral-500">{formatRelative(run.started_at)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
