const stats = [
  { label: "Total Personas", value: "3" },
  { label: "Active Campaigns", value: "2" },
  { label: "Videos Generated", value: "47" },
  { label: "Queue Status", value: "5 pending" },
];

const recentActivity = [
  { id: "1", persona: "TechGuru99", action: "Video uploaded", niche: "tech reviews", time: "2m ago" },
  { id: "2", persona: "LifestyleVibes", action: "Script generated", niche: "lifestyle", time: "14m ago" },
  { id: "3", persona: "AmazonFinds_", action: "Video queued", niche: "amazon finds", time: "1h ago" },
];

export default function DashboardPage() {
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

      <h2 className="text-sm font-medium text-neutral-400 mb-4 uppercase tracking-wider">Recent Activity</h2>
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-800">
              <th className="text-left px-5 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Persona</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Action</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Niche</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Time</th>
            </tr>
          </thead>
          <tbody>
            {recentActivity.map((row, i) => (
              <tr key={row.id} className={i < recentActivity.length - 1 ? "border-b border-neutral-800/60" : ""}>
                <td className="px-5 py-3 text-white font-medium">{row.persona}</td>
                <td className="px-5 py-3 text-neutral-300">{row.action}</td>
                <td className="px-5 py-3">
                  <span className="px-2 py-0.5 bg-neutral-800 text-neutral-300 rounded text-xs">{row.niche}</span>
                </td>
                <td className="px-5 py-3 text-neutral-500">{row.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
