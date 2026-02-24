"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Flame, Calendar, Trophy, Gamepad2, Shuffle, ArrowRight, Star } from "lucide-react";
import { useProgress } from "@/lib/progress/useProgress";
import { getLevelInfo } from "@/lib/progress/xp";
import Onboarding from "@/components/Onboarding";
import { categoryColors } from "@/lib/gameIcons";
import { categoryInfo } from "@/lib/quizzes";
import type { GameCategory } from "@/lib/types";

interface TopRatedGame {
  slug: string;
  avgRating: number;
  ratingCount: number;
  title: string;
  href: string;
  categoryLabel: string;
  category: string;
}

interface DashboardClientProps {
  topRated: TopRatedGame[];
  gameOfTheDayHref: string;
  gameOfTheDayTitle: string;
}

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

const categoryList: GameCategory[] = ["nostalgia-trivia", "general-knowledge", "word-games", "memory-games"];

export default function DashboardClient({ topRated, gameOfTheDayHref, gameOfTheDayTitle }: DashboardClientProps) {
  const { progress, isLoaded } = useProgress();
  const [onboardingDone, setOnboardingDone] = useState(false);
  const router = useRouter();

  if (!isLoaded) return null;

  if (!progress.preferences.onboardingComplete && !onboardingDone) {
    return <Onboarding onComplete={() => setOnboardingDone(true)} />;
  }

  const levelInfo = getLevelInfo(progress.xp);
  const gamesPlayedToday = progress.gamesPlayed.filter((g) => {
    const d = new Date(g.playedAt);
    const today = new Date();
    return d.toDateString() === today.toDateString();
  }).length;

  // Last played games (most recent 3, unique slugs)
  const recentGames: { slug: string; category: string }[] = [];
  for (let i = progress.gamesPlayed.length - 1; i >= 0 && recentGames.length < 3; i--) {
    const g = progress.gamesPlayed[i];
    if (!recentGames.some((r) => r.slug === g.slug)) {
      recentGames.push({ slug: g.slug, category: g.category });
    }
  }

  // Best category
  const catCounts: Record<string, number> = {};
  for (const g of progress.gamesPlayed) {
    catCounts[g.category] = (catCounts[g.category] ?? 0) + 1;
  }
  const bestCat = Object.entries(catCounts).sort((a, b) => b[1] - a[1])[0];

  return (
    <div>
      {/* Welcome Banner */}
      <section className="px-6 py-10" style={{ background: "var(--gradient-warm)" }}>
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1
                className="mb-2 text-2xl font-bold text-foreground sm:text-3xl"
                style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
              >
                {getGreeting()}!
              </h1>
              <p className="text-base text-text-muted">
                Level {levelInfo.level} &middot; {progress.xp} XP
                {progress.streaks.current > 0 && (
                  <span className="ml-2 inline-flex items-center gap-1 text-accent">
                    <Flame size={14} /> {progress.streaks.current} day streak
                  </span>
                )}
              </p>
              {/* XP progress bar */}
              <div className="mt-3 h-2 w-48 overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${levelInfo.progressPercent}%`, background: "var(--gradient-primary)" }}
                />
              </div>
            </div>
            <Link
              href="/daily-challenge"
              className="btn-primary inline-flex items-center gap-2 self-start px-6 py-3 text-base font-bold"
            >
              <Calendar size={18} />
              Daily Challenge
            </Link>
          </div>
        </div>
      </section>

      {/* Today's Stats */}
      <section className="border-b border-border bg-surface px-6 py-6">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{gamesPlayedToday}</p>
            <p className="text-sm text-text-muted">Games Today</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-accent">{progress.streaks.current}</p>
            <p className="text-sm text-text-muted">Day Streak</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-secondary">
              {bestCat ? categoryInfo[bestCat[0] as GameCategory]?.title.split(" ")[0] ?? "—" : "—"}
            </p>
            <p className="text-sm text-text-muted">Best Category</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{progress.gamesPlayed.length}</p>
            <p className="text-sm text-text-muted">Total Played</p>
          </div>
        </div>
      </section>

      {/* Continue Playing */}
      {recentGames.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-10">
          <h2
            className="mb-6 text-xl font-bold text-foreground"
            style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
          >
            Continue Playing
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {recentGames.map((g) => {
              const color = categoryColors[g.category] ?? "#7C5CFC";
              return (
                <Link
                  key={g.slug}
                  href={`/play/${g.category}/${g.slug}`}
                  className="card-playful flex min-w-[200px] flex-col p-4"
                >
                  <div className="mb-2 h-1 w-full rounded-full" style={{ background: color }} />
                  <p className="text-sm font-bold text-foreground">{g.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</p>
                  <p className="mt-1 text-xs text-text-muted">{categoryInfo[g.category as GameCategory]?.title ?? g.category}</p>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Quick Play Categories */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <h2
          className="mb-6 text-xl font-bold text-foreground"
          style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
        >
          Quick Play
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {categoryList.map((cat) => {
            const info = categoryInfo[cat];
            const color = categoryColors[cat] ?? "#7C5CFC";
            return (
              <Link
                key={cat}
                href={`/play/${cat}`}
                className="card-playful group flex flex-col items-center p-5 text-center"
              >
                <span
                  className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl text-white transition-transform group-hover:scale-110"
                  style={{ background: color }}
                >
                  <Gamepad2 size={22} />
                </span>
                <span className="text-sm font-bold text-foreground">{info.title}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Game of the Day */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <Link
          href={gameOfTheDayHref}
          className="card-playful group flex items-center gap-5 overflow-hidden p-6"
          style={{ background: "var(--gradient-warm)" }}
        >
          <span
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white"
            style={{ background: "var(--gradient-primary)" }}
          >
            <Trophy size={24} />
          </span>
          <div className="flex-1">
            <p className="mb-0.5 text-xs font-bold uppercase tracking-widest text-primary">Game of the Day</p>
            <h3
              className="text-lg font-bold text-foreground"
              style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
            >
              {gameOfTheDayTitle}
            </h3>
          </div>
          <ArrowRight size={20} className="text-primary opacity-0 transition-opacity group-hover:opacity-100" />
        </Link>
      </section>

      {/* Top Rated */}
      {topRated.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <h2
            className="mb-6 text-xl font-bold text-foreground"
            style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
          >
            Top Rated
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {topRated.map((game) => {
              const color = categoryColors[game.category] ?? "#7C5CFC";
              return (
                <Link
                  key={game.slug}
                  href={game.href}
                  className="card-playful group flex flex-col items-center p-5 text-center"
                >
                  <h3 className="mb-1 text-base font-bold text-foreground">{game.title}</h3>
                  <p className="mb-2 text-sm text-text-muted">{game.categoryLabel}</p>
                  <p className="flex items-center gap-1 text-sm font-semibold text-amber-500">
                    <Star size={14} fill="#f59e0b" stroke="#f59e0b" />
                    {game.avgRating.toFixed(1)}
                    <span className="font-normal text-text-muted">({game.ratingCount})</span>
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
