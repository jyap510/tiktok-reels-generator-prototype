const niches = [
  {
    id: "1",
    name: "Amazon Finds",
    slug: "amazon-finds",
    tags: ["product review", "deals", "affiliate"],
    description: "Short-form product showcases for Amazon items under $50.",
    personas: 1,
    avgViews: "42K",
  },
  {
    id: "2",
    name: "Lifestyle",
    slug: "lifestyle",
    tags: ["daily routine", "aesthetic", "minimal"],
    description: "Aspirational content around routines, spaces, and habits.",
    personas: 1,
    avgViews: "28K",
  },
  {
    id: "3",
    name: "Tech Reviews",
    slug: "tech-reviews",
    tags: ["gadgets", "unboxing", "budget tech"],
    description: "Fast-paced reviews of consumer tech and accessories.",
    personas: 1,
    avgViews: "61K",
  },
  {
    id: "4",
    name: "Finance Tips",
    slug: "finance-tips",
    tags: ["money", "investing", "side hustle"],
    description: "Bite-sized personal finance advice for young adults.",
    personas: 0,
    avgViews: "—",
  },
];

export default function NichesPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold text-white mb-1">Niches</h1>
          <p className="text-sm text-neutral-500">Content categories used across personas</p>
        </div>
        <button className="px-4 py-2 bg-white text-black text-sm font-medium rounded hover:bg-neutral-200 transition-colors">
          + New Niche
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {niches.map((n) => (
          <div key={n.id} className="bg-neutral-900 border border-neutral-800 rounded-lg p-5 hover:border-neutral-700 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <h2 className="text-white font-medium">{n.name}</h2>
              <span className="text-xs text-neutral-500">{n.personas} persona{n.personas !== 1 ? "s" : ""}</span>
            </div>
            <p className="text-sm text-neutral-400 mb-4">{n.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {n.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 bg-neutral-800 text-neutral-400 rounded text-xs">{tag}</span>
                ))}
              </div>
              <span className="text-xs text-neutral-500 shrink-0 ml-3">avg {n.avgViews} views</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
