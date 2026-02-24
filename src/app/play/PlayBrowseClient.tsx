"use client";

import { useState, useMemo } from "react";
import GameCardNew from "@/components/GameCardNew";
import { allGames } from "@/lib/gameIndex";
import { categoryColors } from "@/lib/gameIcons";
import type { GameCategory } from "@/lib/types";

const categoryFilters: { id: string; label: string }[] = [
  { id: "all", label: "All" },
  { id: "nostalgia-trivia", label: "Nostalgia" },
  { id: "general-knowledge", label: "General" },
  { id: "word-games", label: "Word" },
  { id: "memory-games", label: "Memory" },
];

const PER_PAGE = 24;

interface GameEntry {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryLabel: string;
  href: string;
}

export default function PlayBrowseClient() {
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(0);

  const gamesOnly = useMemo(
    () => allGames.filter((g) => g.category !== "blog") as GameEntry[],
    [],
  );

  const filtered = useMemo(() => {
    if (filter === "all") return gamesOnly;
    return gamesOnly.filter((g) => g.category === filter);
  }, [filter, gamesOnly]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const pageGames = filtered.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  return (
    <div>
      {/* Filter bar */}
      <div className="sticky top-[57px] z-40 border-b border-border bg-surface/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto px-6 py-3">
          {categoryFilters.map((f) => {
            const active = filter === f.id;
            const color = f.id === "all" ? "#7C5CFC" : categoryColors[f.id] ?? "#7C5CFC";
            return (
              <button
                key={f.id}
                onClick={() => { setFilter(f.id); setPage(0); }}
                className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-bold transition-all ${
                  active
                    ? "text-white"
                    : "bg-transparent text-text-muted hover:bg-primary-50"
                }`}
                style={active ? { background: color } : undefined}
              >
                {f.label}
              </button>
            );
          })}
          <span className="ml-auto shrink-0 text-sm text-text-muted">
            {filtered.length} games
          </span>
        </div>
      </div>

      {/* Game grid */}
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pageGames.map((game) => (
            <GameCardNew
              key={game.id}
              title={game.title}
              slug={game.id}
              category={game.category}
              description={game.description}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="rounded-lg px-4 py-2 text-sm font-bold text-primary transition-colors hover:bg-primary-50 disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-sm text-text-muted">
              Page {page + 1} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="rounded-lg px-4 py-2 text-sm font-bold text-primary transition-colors hover:bg-primary-50 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
