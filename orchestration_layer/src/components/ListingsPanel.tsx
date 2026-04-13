"use client";

import { useEffect, useState } from "react";
import type { Listing } from "@/types";

const PAGE_SIZE = 10;

export default function ListingsPanel() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/listings?limit=${PAGE_SIZE}&offset=${offset}`)
      .then((r) => r.json())
      .then((data) => {
        setListings(data.listings ?? []);
        setTotal(data.total ?? 0);
      })
      .finally(() => setLoading(false));
  }, [offset]);

  const totalPages = Math.ceil(total / PAGE_SIZE);
  const currentPage = Math.floor(offset / PAGE_SIZE) + 1;

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
      <div className="px-5 py-4 border-b border-neutral-800 flex items-center justify-between">
        <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wider">Listings</h2>
        <span className="text-xs text-neutral-500">{total} total</span>
      </div>

      {loading ? (
        <div className="px-5 py-8 text-center text-neutral-500 text-sm">Loading…</div>
      ) : listings.length === 0 ? (
        <div className="px-5 py-8 text-center text-neutral-500 text-sm">No listings</div>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-800">
              <th className="text-left px-5 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">ASIN</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Title</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Brand</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Images</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Reviews</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing, i) => (
              <tr
                key={listing.id}
                className={i < listings.length - 1 ? "border-b border-neutral-800/60" : ""}
              >
                <td className="px-5 py-3 font-mono text-xs text-neutral-300">{listing.asin}</td>
                <td className="px-5 py-3 text-neutral-300">
                  {listing.title
                    ? listing.title.length > 50
                      ? listing.title.slice(0, 50) + "…"
                      : listing.title
                    : <span className="text-neutral-500">—</span>}
                </td>
                <td className="px-5 py-3 text-neutral-400">{listing.brand ?? <span className="text-neutral-600">—</span>}</td>
                <td className="px-5 py-3 text-neutral-400">{listing.images.length}</td>
                <td className="px-5 py-3 text-neutral-400">{listing.reviews.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {totalPages > 1 && (
        <div className="px-5 py-3 border-t border-neutral-800 flex items-center justify-between">
          <span className="text-xs text-neutral-500">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setOffset(Math.max(0, offset - PAGE_SIZE))}
              disabled={offset === 0}
              className="px-3 py-1 text-xs bg-neutral-800 text-neutral-300 rounded hover:bg-neutral-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Prev
            </button>
            <button
              onClick={() => setOffset(offset + PAGE_SIZE)}
              disabled={offset + PAGE_SIZE >= total}
              className="px-3 py-1 text-xs bg-neutral-800 text-neutral-300 rounded hover:bg-neutral-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
