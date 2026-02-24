"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useCallback } from "react";
import GameSearch from "@/components/GameSearch";
import { allGames } from "@/lib/gameIndex";
import { Shuffle } from "lucide-react";

function SearchHandler() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  if (!query) return null;

  return (
    <div className="fixed inset-0 z-[110] pointer-events-none">
       <GameSearch initialQuery={query} />
    </div>
  );
}

export function SurpriseMeButton() {
  const router = useRouter();

  const handleSurprise = useCallback(() => {
    // Exclude blog articles from surprise me
    const gamesOnly = allGames.filter(g => g.category !== "blog");
    const randomGame = gamesOnly[Math.floor(Math.random() * gamesOnly.length)];
    if (randomGame) {
      router.push(randomGame.href);
    }
  }, [router]);

  return (
    <button
      onClick={handleSurprise}
      className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-bold text-white transition-all duration-200 hover:bg-white/20 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/30"
    >
      <Shuffle size={20} strokeWidth={2.5} />
      Surprise Me
    </button>
  );
}

export default function HomeClient() {
  return (
    <Suspense fallback={null}>
      <SearchHandler />
    </Suspense>
  );
}
