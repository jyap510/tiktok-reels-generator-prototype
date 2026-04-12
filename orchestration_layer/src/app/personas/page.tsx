import Link from "next/link";
import { getRunsByPersonaId } from "@/data/runs";

const personas = [
  {
    id: "1",
    handle: "TechGuru99",
    niche: "tech reviews",
    voice: "Energetic, fast-paced",
    status: "active",
    videosGenerated: 22,
    avatar: "/data/8fd7ecfb/avatar.png",
  },
  {
    id: "2",
    handle: "LifestyleVibes",
    niche: "lifestyle",
    voice: "Calm, aspirational",
    status: "active",
    videosGenerated: 15,
    avatar: "/data/5d212197/avatar.png",
  },
  {
    id: "3",
    handle: "AmazonFinds_",
    niche: "amazon finds",
    voice: "Conversational, deal-focused",
    status: "paused",
    videosGenerated: 10,
    avatar: "/data/11cd701e/avatar.png",
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
          <h1 className="text-3xl font-semibold text-white mb-1">Personas</h1>
          <p className="text-lg text-neutral-300">TikTok accounts managed by the pipeline</p>
        </div>
        <button className="px-4 py-2 bg-white text-black text-lg font-medium rounded hover:bg-neutral-200 transition-colors">
          + New Persona
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {personas.map((p) => {
          const runs = getRunsByPersonaId(p.id);
          const persona_prompt = runs[0]?.prompts.persona_prompt ?? null;

          return (
            <Link key={p.id} href={`/personas/${p.id}`} className="block group">
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-600 hover:shadow-lg hover:shadow-black/40 transition-all">
                {/* Avatar image — full width, portrait aspect */}
                <div className="w-full aspect-[3/4] overflow-hidden rounded-t-xl">
                  <img
                    src={p.avatar}
                    alt={p.handle}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Bottom info section */}
                <div className="p-4 space-y-2">
                  <p className="text-white font-bold text-xl">@{p.handle}</p>

                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 bg-neutral-800 text-neutral-200 rounded text-base">{p.niche}</span>
                    <span className={`text-base px-2 py-0.5 rounded-full font-medium ${statusColor[p.status]}`}>
                      {p.status}
                    </span>
                  </div>

                  <p className="text-base text-neutral-300 truncate">{p.voice}</p>

                  {persona_prompt && (
                    <p className="text-base text-neutral-300 italic line-clamp-3 leading-relaxed">
                      &ldquo;{persona_prompt}&rdquo;
                    </p>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
