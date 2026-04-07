import Link from "next/link";

type ContentStatus = "uploaded" | "generated" | "pending" | "failed";

const contentItems: {
  id: string;
  title: string;
  persona: string;
  niche: string;
  status: ContentStatus;
  duration: string;
  createdAt: string;
}[] = [
  { id: "1", title: "Top 5 Amazon Desk Gadgets Under $20", persona: "AmazonFinds_", niche: "amazon finds", status: "uploaded", duration: "0:47", createdAt: "Apr 6, 2026" },
  { id: "2", title: "My Morning Routine (minimal edition)", persona: "LifestyleVibes", niche: "lifestyle", status: "uploaded", duration: "1:02", createdAt: "Apr 6, 2026" },
  { id: "3", title: "Budget Mechanical Keyboard Review", persona: "TechGuru99", niche: "tech reviews", status: "generated", duration: "0:58", createdAt: "Apr 7, 2026" },
  { id: "4", title: "Hidden Amazon Kitchen Find", persona: "AmazonFinds_", niche: "amazon finds", status: "pending", duration: "—", createdAt: "Apr 7, 2026" },
  { id: "5", title: "Aesthetic Desk Setup Tour", persona: "LifestyleVibes", niche: "lifestyle", status: "pending", duration: "—", createdAt: "Apr 7, 2026" },
  { id: "6", title: "Cheap Earbuds Actually Worth It?", persona: "TechGuru99", niche: "tech reviews", status: "failed", duration: "—", createdAt: "Apr 5, 2026" },
];

const statusStyle: Record<ContentStatus, string> = {
  uploaded: "bg-emerald-900/60 text-emerald-400",
  generated: "bg-blue-900/60 text-blue-400",
  pending: "bg-neutral-800 text-neutral-400",
  failed: "bg-red-900/60 text-red-400",
};

export default function ContentPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold text-white mb-1">Content</h1>
          <p className="text-sm text-neutral-500">All videos across the pipeline</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-neutral-800 text-neutral-200 text-sm rounded hover:bg-neutral-700 transition-colors">
            Filter
          </button>
          <button className="px-4 py-2 bg-white text-black text-sm font-medium rounded hover:bg-neutral-200 transition-colors">
            + Generate
          </button>
        </div>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-800">
              <th className="text-left px-5 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Title</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Persona</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Niche</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Duration</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Created</th>
            </tr>
          </thead>
          <tbody>
            {contentItems.map((item, i) => (
              <tr
                key={item.id}
                className={`hover:bg-neutral-800/40 transition-colors ${i < contentItems.length - 1 ? "border-b border-neutral-800/60" : ""}`}
              >
                <td className="px-5 py-3">
                  <Link href={`/content/${item.id}`} className="text-white hover:text-neutral-300 font-medium transition-colors">
                    {item.title}
                  </Link>
                </td>
                <td className="px-5 py-3 text-neutral-400">@{item.persona}</td>
                <td className="px-5 py-3">
                  <span className="px-2 py-0.5 bg-neutral-800 text-neutral-400 rounded text-xs">{item.niche}</span>
                </td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle[item.status]}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-neutral-500 font-mono text-xs">{item.duration}</td>
                <td className="px-5 py-3 text-neutral-500">{item.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
