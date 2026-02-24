"use client";

import { categoryColors } from "@/lib/gameIcons";
import { categoryInfo } from "@/lib/quizzes";
import type { GameCategory } from "@/lib/types";
import type { GamePlayRecord } from "@/lib/progress/types";

interface CategoryBreakdownProps {
  gamesPlayed: GamePlayRecord[];
}

const CATEGORIES: GameCategory[] = ["nostalgia-trivia", "general-knowledge", "word-games", "memory-games"];

export default function CategoryBreakdown({ gamesPlayed }: CategoryBreakdownProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {CATEGORIES.map((cat) => {
        const games = gamesPlayed.filter((g) => g.category === cat);
        const color = categoryColors[cat] ?? "#7C5CFC";
        const info = categoryInfo[cat];
        const count = games.length;

        // Average score
        const avgScore = count > 0
          ? Math.round(games.reduce((sum, g) => sum + g.score, 0) / count)
          : 0;

        // Trend: compare last 10 vs previous 10
        const recent10 = games.slice(-10);
        const prev10 = games.slice(-20, -10);
        let trend: "up" | "down" | "flat" = "flat";
        if (recent10.length >= 3 && prev10.length >= 3) {
          const recentAvg = recent10.reduce((s, g) => s + g.score, 0) / recent10.length;
          const prevAvg = prev10.reduce((s, g) => s + g.score, 0) / prev10.length;
          if (recentAvg - prevAvg > 3) trend = "up";
          else if (prevAvg - recentAvg > 3) trend = "down";
        }

        // Most played game in category
        const slugCounts: Record<string, number> = {};
        for (const g of games) {
          slugCounts[g.slug] = (slugCounts[g.slug] ?? 0) + 1;
        }
        const topSlug = Object.entries(slugCounts).sort((a, b) => b[1] - a[1])[0];

        return (
          <div
            key={cat}
            className="card-playful relative overflow-hidden p-5"
          >
            <div
              className="absolute left-0 top-0 h-full w-1"
              style={{ background: color }}
            />
            <div className="pl-3">
              <h3 className="mb-3 text-sm font-bold text-foreground">
                {info.title}
              </h3>
              <div className="flex items-baseline gap-4">
                <div>
                  <p className="text-2xl font-bold" style={{ color }}>{count}</p>
                  <p className="text-xs text-text-muted">games played</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {avgScore}%
                    {trend === "up" && <span className="ml-1 text-sm text-green-500">↑</span>}
                    {trend === "down" && <span className="ml-1 text-sm text-red-400">↓</span>}
                  </p>
                  <p className="text-xs text-text-muted">avg score</p>
                </div>
              </div>
              {topSlug && (
                <p className="mt-2 text-xs text-text-muted">
                  Favorite: {topSlug[0].replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
