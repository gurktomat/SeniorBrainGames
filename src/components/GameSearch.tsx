"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { allGames, type GameEntry } from "@/lib/gameIndex";

export default function GameSearch({
  initialQuery = "",
}: {
  initialQuery?: string;
}) {
  const [open, setOpen] = useState(!!initialQuery);
  const [query, setQuery] = useState(initialQuery);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = query.trim()
    ? allGames.filter((g) => {
        const q = query.toLowerCase();
        return (
          g.title.toLowerCase().includes(q) ||
          g.description.toLowerCase().includes(q) ||
          g.keywords?.some((k) => k.toLowerCase().includes(q))
        );
      })
    : [];

  // Group results by category
  const grouped: { label: string; games: GameEntry[] }[] = [];
  const seen = new Set<string>();
  for (const game of filtered) {
    if (!seen.has(game.category)) {
      seen.add(game.category);
      grouped.push({ label: game.categoryLabel, games: [] });
    }
    grouped.find((g) => g.label === game.categoryLabel)!.games.push(game);
  }

  const flatResults = grouped.flatMap((g) => g.games);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  const navigate = useCallback(
    (game: GameEntry) => {
      router.push(game.href);
      close();
    },
    [router, close],
  );

  // Auto-focus input when modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  // Keyboard shortcut: Ctrl+K / Cmd+K to open
  useEffect(() => {
    function handleGlobal(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    }
    document.addEventListener("keydown", handleGlobal);
    return () => document.removeEventListener("keydown", handleGlobal);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Scroll selected item into view
  useEffect(() => {
    if (!listRef.current) return;
    const el = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
    if (el) el.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, flatResults.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && flatResults[selectedIndex]) {
      e.preventDefault();
      navigate(flatResults[selectedIndex]);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex h-10 w-10 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-primary-50 hover:text-primary"
        aria-label="Search games"
        title="Search games (Ctrl+K)"
      >
        <Search size={20} strokeWidth={2} />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 px-4 pt-[15vh] backdrop-blur-sm sm:pt-[20vh]"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Search games"
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-border/60 bg-surface shadow-2xl"
            onKeyDown={handleKeyDown}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-border/60 px-4 py-3">
              <Search size={20} className="shrink-0 text-text-muted" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search 100 brain games..."
                className="min-w-0 flex-1 bg-transparent text-lg text-foreground outline-none placeholder:text-text-muted"
                aria-label="Search games"
                autoComplete="off"
              />
              <button
                onClick={close}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-primary-50 hover:text-foreground"
                aria-label="Close search"
              >
                <X size={18} />
              </button>
            </div>

            {/* Results */}
            <div ref={listRef} className="max-h-[50vh] overflow-y-auto overscroll-contain">
              {query.trim() && flatResults.length === 0 && (
                <div className="px-4 py-8 text-center text-text-muted">
                  No games found for &ldquo;{query}&rdquo;
                </div>
              )}

              {!query.trim() && (
                <div className="px-4 py-8 text-center text-text-muted">
                  Type to search across all games...
                </div>
              )}

              {grouped.map((group) => (
                <div key={group.label}>
                  <div className="sticky top-0 bg-surface/95 px-4 py-2 text-xs font-bold uppercase tracking-wider text-text-muted backdrop-blur-sm">
                    {group.label}
                  </div>
                  {group.games.map((game) => {
                    const idx = flatResults.indexOf(game);
                    return (
                      <button
                        key={game.id + game.category}
                        data-index={idx}
                        onClick={() => navigate(game)}
                        className={`flex w-full cursor-pointer flex-col px-4 py-3 text-left transition-colors ${
                          idx === selectedIndex
                            ? "bg-primary-50 text-primary"
                            : "text-foreground hover:bg-primary-50/50"
                        }`}
                      >
                        <span className="text-base font-semibold">{game.title}</span>
                        <span className="line-clamp-1 text-sm text-text-muted">
                          {game.description}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Footer hint */}
            <div className="flex items-center gap-4 border-t border-border/60 px-4 py-2 text-xs text-text-muted">
              <span><kbd className="rounded border border-border/60 bg-background px-1.5 py-0.5 font-mono text-[10px]">&uarr;&darr;</kbd> Navigate</span>
              <span><kbd className="rounded border border-border/60 bg-background px-1.5 py-0.5 font-mono text-[10px]">Enter</kbd> Open</span>
              <span><kbd className="rounded border border-border/60 bg-background px-1.5 py-0.5 font-mono text-[10px]">Esc</kbd> Close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
