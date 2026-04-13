"use client";

import { useEffect, useState } from "react";
import type { Persona } from "@/types";

function PersonaAvatar({ persona }: { persona: Persona }) {
  if (!persona.avatar_path) {
    return (
      <div className="w-full aspect-[3/4] bg-neutral-800 rounded-t-xl flex items-center justify-center">
        <span className="text-neutral-600 text-4xl">?</span>
      </div>
    );
  }
  return (
    <div className="w-full aspect-[3/4] overflow-hidden rounded-t-xl">
      <img
        src={`/api/personas/${persona.id}/avatar`}
        alt={persona.handle}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

function NewPersonaModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: (p: Persona) => void;
}) {
  const [handle, setHandle] = useState("");
  const [niche, setNiche] = useState("");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState("female");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/personas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ handle, niche, description, gender }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? `Error ${res.status}`);
        return;
      }
      const created = await res.json();
      onCreated(created);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-neutral-900 border border-neutral-700 rounded-xl w-full max-w-md p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-white text-xl font-semibold">New Persona</h2>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-300 transition-colors text-lg"
          >
            x
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-neutral-400 mb-1">Handle <span className="text-red-400">*</span></label>
            <input
              type="text"
              required
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              placeholder="e.g. TechGuru99"
              className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">Niche <span className="text-red-400">*</span></label>
            <input
              type="text"
              required
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="e.g. tech reviews"
              className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe this persona's voice and style..."
              rows={3}
              className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">Gender <span className="text-red-400">*</span></label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-white focus:outline-none focus:border-neutral-500"
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="non-binary">Non-binary</option>
            </select>
          </div>

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-neutral-800 text-neutral-300 rounded hover:bg-neutral-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-4 py-2 bg-white text-black font-medium rounded hover:bg-neutral-200 transition-colors disabled:opacity-50"
            >
              {submitting ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function PersonasPage() {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("/api/personas")
      .then((r) => r.json())
      .then((data) => setPersonas(data.personas ?? []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  function handleCreated(p: Persona) {
    setPersonas((prev) => [p, ...prev]);
    setShowModal(false);
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-white mb-1">Personas</h1>
          <p className="text-lg text-neutral-300">TikTok accounts managed by the pipeline</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-white text-black text-lg font-medium rounded hover:bg-neutral-200 transition-colors"
        >
          + New Persona
        </button>
      </div>

      {loading ? (
        <p className="text-neutral-500 text-sm">Loading...</p>
      ) : personas.length === 0 ? (
        <p className="text-neutral-500 text-sm">No personas yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {personas.map((p) => (
            <div key={p.id} className="block group">
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-600 hover:shadow-lg hover:shadow-black/40 transition-all">
                <PersonaAvatar persona={p} />

                <div className="p-4 space-y-2">
                  <p className="text-white font-bold text-xl">@{p.handle}</p>

                  <div className="flex items-center gap-2 flex-wrap">
                    {p.niche && (
                      <span className="px-2 py-0.5 bg-neutral-800 text-neutral-200 rounded text-base">
                        {p.niche}
                      </span>
                    )}
                  </div>

                  {p.description && (
                    <p className="text-base text-neutral-300 truncate">{p.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <NewPersonaModal onClose={() => setShowModal(false)} onCreated={handleCreated} />
      )}
    </div>
  );
}
