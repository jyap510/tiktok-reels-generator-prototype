const personas: Record<string, {
  id: string;
  handle: string;
  niche: string;
  voice: string;
  status: string;
  videosGenerated: number;
  followers: string;
  bio: string;
}> = {
  "1": {
    id: "1",
    handle: "TechGuru99",
    niche: "tech reviews",
    voice: "Energetic, fast-paced",
    status: "active",
    videosGenerated: 22,
    followers: "14.2K",
    bio: "Quick takes on the latest gadgets and tech deals. No fluff.",
  },
  "2": {
    id: "2",
    handle: "LifestyleVibes",
    niche: "lifestyle",
    voice: "Calm, aspirational",
    status: "active",
    videosGenerated: 15,
    followers: "8.7K",
    bio: "Daily routines, aesthetic setups, and minimal living.",
  },
  "3": {
    id: "3",
    handle: "AmazonFinds_",
    niche: "amazon finds",
    voice: "Conversational, deal-focused",
    status: "paused",
    videosGenerated: 10,
    followers: "5.1K",
    bio: "Hidden gems under $30 that actually work.",
  },
};

const statusColor: Record<string, string> = {
  active: "bg-emerald-900/60 text-emerald-400",
  paused: "bg-yellow-900/60 text-yellow-400",
};

export default async function PersonaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const persona = personas[id];

  if (!persona) {
    return (
      <div className="p-8">
        <p className="text-neutral-400">Persona not found.</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-full bg-neutral-700 flex items-center justify-center text-white font-bold text-lg">
          {persona.handle[0]}
        </div>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold text-white">@{persona.handle}</h1>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[persona.status] ?? "bg-neutral-800 text-neutral-400"}`}>
              {persona.status}
            </span>
          </div>
          <p className="text-sm text-neutral-500 mt-0.5">{persona.bio}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 text-center">
          <p className="text-xl font-semibold text-white">{persona.videosGenerated}</p>
          <p className="text-xs text-neutral-500 mt-1">Videos</p>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 text-center">
          <p className="text-xl font-semibold text-white">{persona.followers}</p>
          <p className="text-xs text-neutral-500 mt-1">Followers</p>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 text-center">
          <span className="px-2 py-0.5 bg-neutral-800 text-neutral-300 rounded text-xs">{persona.niche}</span>
          <p className="text-xs text-neutral-500 mt-2">Niche</p>
        </div>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-5">
        <h2 className="text-sm font-medium text-neutral-400 mb-4 uppercase tracking-wider">Voice Profile</h2>
        <p className="text-neutral-300 text-sm">{persona.voice}</p>
      </div>
    </div>
  );
}
