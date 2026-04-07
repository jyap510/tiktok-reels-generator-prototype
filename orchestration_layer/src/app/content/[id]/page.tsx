type ContentStatus = "uploaded" | "generated" | "pending" | "failed";

const contentItems: Record<string, {
  id: string;
  title: string;
  persona: string;
  niche: string;
  status: ContentStatus;
  duration: string;
  createdAt: string;
  script: string;
  tiktokUrl?: string;
}> = {
  "1": {
    id: "1",
    title: "Top 5 Amazon Desk Gadgets Under $20",
    persona: "AmazonFinds_",
    niche: "amazon finds",
    status: "uploaded",
    duration: "0:47",
    createdAt: "Apr 6, 2026",
    script: "Number one: the LED strip that everyone is sleeping on. Under fifteen bucks and it makes your whole setup look ten times better...",
    tiktokUrl: "https://tiktok.com/@AmazonFinds_/video/stub",
  },
  "2": {
    id: "2",
    title: "My Morning Routine (minimal edition)",
    persona: "LifestyleVibes",
    niche: "lifestyle",
    status: "uploaded",
    duration: "1:02",
    createdAt: "Apr 6, 2026",
    script: "Wake up without an alarm. Seriously. Once you fix your sleep schedule you stop needing it...",
    tiktokUrl: "https://tiktok.com/@LifestyleVibes/video/stub",
  },
  "3": {
    id: "3",
    title: "Budget Mechanical Keyboard Review",
    persona: "TechGuru99",
    niche: "tech reviews",
    status: "generated",
    duration: "0:58",
    createdAt: "Apr 7, 2026",
    script: "Forty dollars. That is what this keyboard costs. And I genuinely cannot believe how good the tactile feedback is for the price...",
  },
  "4": {
    id: "4",
    title: "Hidden Amazon Kitchen Find",
    persona: "AmazonFinds_",
    niche: "amazon finds",
    status: "pending",
    duration: "—",
    createdAt: "Apr 7, 2026",
    script: "",
  },
};

const statusStyle: Record<ContentStatus, string> = {
  uploaded: "bg-emerald-900/60 text-emerald-400",
  generated: "bg-blue-900/60 text-blue-400",
  pending: "bg-neutral-800 text-neutral-400",
  failed: "bg-red-900/60 text-red-400",
};

export default async function ContentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = contentItems[id];

  if (!item) {
    return (
      <div className="p-8">
        <p className="text-neutral-400">Content item not found.</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-white mb-2">{item.title}</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-neutral-500">@{item.persona}</span>
            <span className="px-2 py-0.5 bg-neutral-800 text-neutral-400 rounded text-xs">{item.niche}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle[item.status]}`}>
              {item.status}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
          <p className="text-xs text-neutral-500 mb-1">Duration</p>
          <p className="text-white font-mono">{item.duration}</p>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
          <p className="text-xs text-neutral-500 mb-1">Created</p>
          <p className="text-white">{item.createdAt}</p>
        </div>
      </div>

      {item.script && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-5 mb-6">
          <h2 className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-3">Script Preview</h2>
          <p className="text-neutral-300 text-sm leading-relaxed">{item.script}</p>
        </div>
      )}

      {item.tiktokUrl && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-5">
          <h2 className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-3">TikTok URL</h2>
          <a
            href={item.tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 text-sm transition-colors break-all"
          >
            {item.tiktokUrl}
          </a>
        </div>
      )}
    </div>
  );
}
