import Link from "next/link";

const personas = [
  {
    id: "1",
    handle: "TechGuru99",
    niche: "tech reviews",
    voice: "Energetic, fast-paced",
    status: "active",
    videosGenerated: 22,
  },
  {
    id: "2",
    handle: "LifestyleVibes",
    niche: "lifestyle",
    voice: "Calm, aspirational",
    status: "active",
    videosGenerated: 15,
  },
  {
    id: "3",
    handle: "AmazonFinds_",
    niche: "amazon finds",
    voice: "Conversational, deal-focused",
    status: "paused",
    videosGenerated: 10,
  },
];

const statusColor: Record<string, string> = {
  active: "bg-emerald-900/60 text-emerald-400",
  paused: "bg-yellow-900/60 text-yellow-400",
  inactive: "bg-neutral-800 text-neutral-400",
};

export default function PersonasPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold text-white mb-1">Personas</h1>
          <p className="text-sm text-neutral-500">TikTok accounts managed by the pipeline</p>
        </div>
        <button className="px-4 py-2 bg-white text-black text-sm font-medium rounded hover:bg-neutral-200 transition-colors">
          + New Persona
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {personas.map((p) => (
          <Link key={p.id} href={`/personas/${p.id}`} className="block group">
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-5 hover:border-neutral-700 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center text-white font-semibold text-sm">
                  {p.handle[0]}
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[p.status]}`}>
                  {p.status}
                </span>
              </div>
              <p className="text-white font-medium mb-1">@{p.handle}</p>
              <p className="text-xs text-neutral-500 mb-3">{p.voice}</p>
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-neutral-800 text-neutral-400 rounded text-xs">{p.niche}</span>
                <span className="text-xs text-neutral-500">{p.videosGenerated} videos</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
