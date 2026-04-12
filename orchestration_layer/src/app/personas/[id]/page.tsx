import { getRunsByPersonaId } from "@/data/runs";
import PersonaDetailClient from "./_PersonaDetailClient";

const personas: Record<string, {
  id: string;
  handle: string;
  niche: string;
  voice: string;
  status: string;
  videosGenerated: number;
  followers: string;
  bio: string;
  avatar: string;
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
    avatar: "/data/8fd7ecfb/avatar.png",
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
    avatar: "/data/5d212197/avatar.png",
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
    avatar: "/data/11cd701e/avatar.png",
  },
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

  const runs = getRunsByPersonaId(id);

  return <PersonaDetailClient persona={persona} runs={runs} />;
}
