"use client";

import Link from "next/link";
import { Flame, Calendar, Trophy, Gamepad2 } from "lucide-react";
import { useProgress } from "@/lib/progress/useProgress";
import { getLevelInfo } from "@/lib/progress/xp";
import ActivityHeatmap from "./ActivityHeatmap";
import BadgeGrid from "./BadgeGrid";
import CategoryBreakdown from "./CategoryBreakdown";
import { categoryColors } from "@/lib/gameIcons";
import { categoryInfo } from "@/lib/quizzes";
import type { GameCategory } from "@/lib/types";

export default function ProgressPageClient() {
  const { progress, isLoaded } = useProgress();

  if (!isLoaded) return null;

  const levelInfo = getLevelInfo(progress.xp);
  const memberSince = progress.createdAt
    ? new Date(progress.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "Today";

  // Recent activity (last 10 plays)
  const recentActivity = [...progress.gamesPlayed].reverse().slice(0, 10);

  return (
    <div>
      {/* Profile Card */}
      <section className="px-6 py-10" style={{ background: "var(--gradient-warm)" }}>
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
            {/* Level Ring */}
            <div className="relative flex h-24 w-24 shrink-0 items-center justify-center">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                <circle cx="50" cy="50" r="44" fill="none" stroke="var(--color-border)" strokeWidth="6" />
                <circle
                  cx="50" cy="50" r="44" fill="none"
                  stroke="var(--color-primary)" strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 44}`}
                  strokeDashoffset={`${2 * Math.PI * 44 * (1 - levelInfo.progressPercent / 100)}`}
                  className="transition-all duration-700"
                />
              </svg>
              <span className="absolute text-2xl font-bold text-primary">{levelInfo.level}</span>
            </div>

            <div className="flex-1">
              <h1
                className="mb-1 text-2xl font-bold text-foreground sm:text-3xl"
                style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
              >
                My Progress
              </h1>
              <p className="mb-3 text-base text-text-muted">
                Level {levelInfo.level} &middot; {progress.xp} XP &middot; Member since {memberSince}
              </p>
              {/* XP bar */}
              <div className="h-2.5 w-full max-w-xs overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${levelInfo.progressPercent}%`, background: "var(--gradient-primary)" }}
                />
              </div>
              <p className="mt-1 text-xs text-text-muted">
                {levelInfo.xpForNextLevel - progress.xp} XP to level {levelInfo.level + 1}
              </p>
            </div>

            <div className="flex gap-6 text-center">
              <div>
                <p className="text-2xl font-bold text-foreground">{progress.gamesPlayed.length}</p>
                <p className="text-xs text-text-muted">Total Games</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{progress.badges.length}</p>
                <p className="text-xs text-text-muted">Badges</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Streak + Heatmap */}
      <section className="mx-auto max-w-4xl px-6 py-10">
        <h2
          className="mb-6 text-xl font-bold text-foreground"
          style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
        >
          Activity
        </h2>
        <div className="mb-6 flex gap-6">
          <div className="card-playful flex items-center gap-3 px-5 py-4">
            <Flame size={24} className="text-accent" />
            <div>
              <p className="text-2xl font-bold text-foreground">{progress.streaks.current}</p>
              <p className="text-xs text-text-muted">Current Streak</p>
            </div>
          </div>
          <div className="card-playful flex items-center gap-3 px-5 py-4">
            <Trophy size={24} className="text-primary" />
            <div>
              <p className="text-2xl font-bold text-foreground">{progress.streaks.longest}</p>
              <p className="text-xs text-text-muted">Longest Streak</p>
            </div>
          </div>
        </div>
        <div className="card-playful p-5">
          <ActivityHeatmap gamesPlayed={progress.gamesPlayed} />
        </div>
      </section>

      {/* Category Breakdown */}
      <section className="mx-auto max-w-4xl px-6 pb-10">
        <h2
          className="mb-6 text-xl font-bold text-foreground"
          style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
        >
          Categories
        </h2>
        <CategoryBreakdown gamesPlayed={progress.gamesPlayed} />
      </section>

      {/* Badges */}
      <section className="mx-auto max-w-4xl px-6 pb-10">
        <h2
          className="mb-6 text-xl font-bold text-foreground"
          style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
        >
          Badges ({progress.badges.length} earned)
        </h2>
        <BadgeGrid earnedBadges={progress.badges} />
      </section>

      {/* Recent Activity */}
      {recentActivity.length > 0 && (
        <section className="mx-auto max-w-4xl px-6 pb-16">
          <h2
            className="mb-6 text-xl font-bold text-foreground"
            style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
          >
            Recent Games
          </h2>
          <div className="space-y-3">
            {recentActivity.map((game, i) => {
              const color = categoryColors[game.category] ?? "#7C5CFC";
              const catInfo = categoryInfo[game.category as GameCategory];
              const date = new Date(game.playedAt);
              const timeAgo = getTimeAgo(date);

              return (
                <Link
                  key={`${game.slug}-${game.playedAt}-${i}`}
                  href={`/play/${game.category}/${game.slug}`}
                  className="card-playful relative flex items-center gap-4 overflow-hidden p-4"
                >
                  <div
                    className="absolute left-0 top-0 h-full w-1"
                    style={{ background: color }}
                  />
                  <div className="flex-1 pl-3">
                    <p className="text-sm font-bold text-foreground">
                      {game.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                    </p>
                    <p className="text-xs text-text-muted">
                      {catInfo?.title ?? game.category} &middot; {timeAgo}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold" style={{ color: game.score >= 70 ? color : "var(--color-text-muted)" }}>
                      {game.score}%
                    </p>
                    {game.isPerfect && (
                      <p className="text-xs font-bold text-accent">Perfect!</p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Empty state */}
      {progress.gamesPlayed.length === 0 && (
        <section className="mx-auto max-w-4xl px-6 pb-16 text-center">
          <div className="card-playful p-8">
            <Gamepad2 size={40} className="mx-auto mb-4 text-primary" />
            <h3 className="mb-2 text-lg font-bold text-foreground">No games played yet</h3>
            <p className="mb-6 text-base text-text-muted">
              Play your first game to start tracking your progress!
            </p>
            <Link href="/play" className="btn-primary inline-block px-6 py-3 text-base font-bold">
              Browse Games
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
