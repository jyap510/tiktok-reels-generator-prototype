"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/personas", label: "Personas" },
  { href: "/runs", label: "Runs" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 bg-neutral-900 border-r border-neutral-800 flex flex-col min-h-screen">
      <div className="px-5 py-5 border-b border-neutral-800">
        <span className="text-white font-semibold text-sm tracking-wide">TikTok Pipeline</span>
      </div>
      <nav className="flex flex-col gap-0.5 p-3 flex-1">
        {links.map(({ href, label }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`px-3 py-2 rounded text-sm transition-colors ${
                active
                  ? "bg-neutral-800 text-white font-medium"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800/60"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
