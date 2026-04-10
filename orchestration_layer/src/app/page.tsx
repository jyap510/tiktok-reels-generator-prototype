import Link from "next/link";
import { runs } from "@/data/runs";
import type { StepStatus } from "@/data/runs";

const statusStyle: Record<StepStatus, string> = {
  success: "bg-emerald-900/60 text-emerald-400",
  partial: "bg-yellow-900/60 text-yellow-400",
  failed: "bg-red-900/60 text-red-400",
};

function formatRelative(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

const uniqueProducts = new Set(runs.map((r) => r.product.asin)).size;
const successCount = runs.filter((r) => r.status === "success").length;

const stats = [
  { label: "Total Runs", value: String(runs.length) },
  { label: "Products", value: String(uniqueProducts) },
  { label: "Successful", value: String(successCount) },
  { label: "Partial / Failed", value: String(runs.length - successCount) },
];

export default function DashboardPage() {
  const recent = [...runs]
    .sort((a, b) => new Date(b.started_at).getTime() - new Date(a.started_at).getTime())
    .slice(0, 3);

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
              <th className="text-left px-5 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Size</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Started</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((run, i) => (
              <tr key={run.run_id} className={i < recent.length - 1 ? "border-b border-neutral-800/60" : ""}>
                <td className="px-5 py-3">
                  <Link
                    href={`/runs/${run.run_id}`}
                    className="font-mono text-xs text-neutral-300 hover:text-white transition-colors"
                  >
                    {run.run_id.slice(0, 8)}
                  </Link>
                </td>
                <td className="px-5 py-3 text-neutral-300">
                  {run.product.title.length > 40
                    ? run.product.title.slice(0, 40) + "…"
                    : run.product.title}
                </td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle[run.status]}`}>
                    {run.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-neutral-500 font-mono text-xs">
                  {(run.tiktok.video_size_kb / 1024).toFixed(1)} MB
                </td>
                <td className="px-5 py-3 text-neutral-500">{formatRelative(run.started_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
