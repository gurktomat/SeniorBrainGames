"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Flame,
  Calendar,
  Trophy,
  ArrowRight,
  Star,
  Play,
  Clock,
  Heart,
  BookOpen,
  Puzzle,
  Layers,
  Sparkles,
} from "lucide-react";
import { useProgress } from "@/lib/progress/useProgress";
import { getLevelInfo } from "@/lib/progress/xp";
import Onboarding from "@/components/Onboarding";
import { categoryColors } from "@/lib/gameIcons";
import { categoryInfo } from "@/lib/quizzes-shared";
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
  gameOfTheDayHref: string | null;
  gameOfTheDayTitle: string | null;
}

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function getTodayLabel(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

const CATEGORY_META: Record<
  GameCategory,
  {
    blurb: string;
    color: string;
    colorSoft: string;
    minutes: string;
    sample: string;
    count: number;
    Icon: typeof Heart;
  }
> = {
  "nostalgia-trivia": {
    blurb: "Songs, films and moments from the decades that shaped you.",
    color: "#6366F1",
    colorSoft: "#E0E7FF",
    minutes: "5–8 min",
    sample: "Name the 1967 hit that begins with a clarinet glissando.",
    count: 391,
    Icon: Heart,
  },
  "general-knowledge": {
    blurb: "A bit of everything — history, science, the odd pub fact.",
    color: "#0EA5E9",
    colorSoft: "#E0F2FE",
    minutes: "6–10 min",
    sample: "The Seine flows through which European capital?",
    count: 398,
    Icon: BookOpen,
  },
  "word-games": {
    blurb: "Anagrams, crosswords, proverbs and clever wordplay.",
    color: "#F59E0B",
    colorSoft: "#FEF3C7",
    minutes: "4–7 min",
    sample: "Rearrange LISTEN to find a quiet word.",
    count: 390,
    Icon: Puzzle,
  },
  "memory-games": {
    blurb: "Pair-matching, sequence recall and joyful recognition.",
    color: "#10B981",
    colorSoft: "#D1FAE5",
    minutes: "3–6 min",
    sample: "Six cards face-down. Find the matching pairs.",
    count: 390,
    Icon: Layers,
  },
};

const CATEGORY_ORDER: GameCategory[] = [
  "nostalgia-trivia",
  "general-knowledge",
  "word-games",
  "memory-games",
];

const LEVEL_NAMES = ["Curious", "Explorer", "Scholar", "Sage", "Luminary"];

export default function DashboardClient({
  topRated,
  gameOfTheDayHref,
  gameOfTheDayTitle,
}: DashboardClientProps) {
  const { progress, isLoaded } = useProgress();
  const [onboardingDone, setOnboardingDone] = useState(false);

  if (!isLoaded) return null;

  if (!progress.preferences.onboardingComplete && !onboardingDone) {
    return <Onboarding onComplete={() => setOnboardingDone(true)} />;
  }

  const levelInfo = getLevelInfo(progress.xp);
  const levelName = LEVEL_NAMES[Math.min(levelInfo.level - 1, LEVEL_NAMES.length - 1)];
  const gamesPlayedToday = progress.gamesPlayed.filter((g) => {
    const d = new Date(g.playedAt);
    const today = new Date();
    return d.toDateString() === today.toDateString();
  }).length;

  const recentGames: { slug: string; category: string }[] = [];
  for (let i = progress.gamesPlayed.length - 1; i >= 0 && recentGames.length < 3; i--) {
    const g = progress.gamesPlayed[i];
    if (!recentGames.some((r) => r.slug === g.slug)) {
      recentGames.push({ slug: g.slug, category: g.category });
    }
  }

  const catCounts: Record<string, number> = {};
  for (const g of progress.gamesPlayed) {
    catCounts[g.category] = (catCounts[g.category] ?? 0) + 1;
  }
  const bestCatEntry = Object.entries(catCounts).sort((a, b) => b[1] - a[1])[0];
  const bestCatLabel = bestCatEntry
    ? categoryInfo[bestCatEntry[0] as GameCategory]?.title.split(" ")[0] ?? "—"
    : "—";

  return (
    <div>
      {/* ─── Welcome Banner ─────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--gradient-warm)" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 85% 20%, rgba(31,110,74,0.10) 0%, transparent 60%), radial-gradient(ellipse 40% 60% at 10% 90%, rgba(192,138,26,0.10) 0%, transparent 60%)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 py-14 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-[13px] font-semibold text-text-muted"
            >
              <span className="h-2 w-2 rounded-full" style={{ background: "var(--color-primary)" }} />
              {getTodayLabel()}
            </div>
            <h1
              className="mb-3 text-balance text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl"
              style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
            >
              {getGreeting()}.
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "var(--gradient-primary)" }}
              >
                Ready for today&apos;s puzzle?
              </span>
            </h1>
            <p className="mb-6 max-w-[44ch] text-lg leading-relaxed text-text-muted">
              Five quick questions, warmed up for you. Takes about six minutes — hints are always a tap away.
            </p>

            {/* Level card + streak badge */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <div
                className="flex min-w-[280px] max-w-[400px] flex-1 items-center gap-3.5 rounded-2xl border border-border bg-surface px-4 py-3 shadow-sm"
              >
                <div
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white"
                  style={{
                    background: "var(--gradient-primary)",
                    fontFamily: "var(--font-merriweather), var(--font-heading)",
                    fontWeight: 700,
                    fontSize: 18,
                  }}
                >
                  {levelInfo.level}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1.5 flex flex-wrap items-baseline justify-between gap-2">
                    <span className="whitespace-nowrap text-sm font-bold text-foreground">
                      Level {levelInfo.level}{" "}
                      <span className="font-medium text-text-muted">· {levelName}</span>
                    </span>
                    <span className="whitespace-nowrap text-xs tabular-nums text-text-muted">
                      {progress.xp} XP
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-border-light">
                    <div
                      className="h-full rounded-full transition-[width] duration-500"
                      style={{
                        width: `${levelInfo.progressPercent}%`,
                        background: "var(--gradient-primary)",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div
                className="flex items-center gap-2.5 rounded-2xl px-4 py-2.5 text-white shadow-md"
                style={{
                  background: "linear-gradient(135deg, #B54A2B 0%, #C08A1A 100%)",
                  boxShadow: "0 4px 12px rgba(181,74,43,0.25)",
                }}
              >
                <Flame size={22} strokeWidth={2.2} />
                <div className="leading-tight">
                  <div
                    className="text-xl font-bold"
                    style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
                  >
                    {progress.streaks.current} {progress.streaks.current === 1 ? "day" : "days"}
                  </div>
                  <div className="text-xs opacity-90">
                    {progress.streaks.current > 0 ? "on a streak" : "start your streak today"}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/daily-challenge"
                className="inline-flex items-center gap-2.5 rounded-lg px-7 py-4 text-[17px] font-bold text-white transition-all hover:-translate-y-0.5"
                style={{
                  background: "var(--gradient-primary)",
                  boxShadow: "0 8px 20px rgba(31,110,74,0.3)",
                }}
              >
                <Calendar size={18} strokeWidth={2.4} />
                Start today&apos;s challenge
              </Link>
              <Link
                href="/play"
                className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-lg border-[2.5px] px-7 py-[13.5px] text-[17px] font-bold transition-colors hover:bg-primary-50"
                style={{
                  borderColor: "var(--color-primary)",
                  color: "var(--color-primary)",
                }}
              >
                <Play size={16} strokeWidth={2.4} />
                Quick play
              </Link>
            </div>
          </div>

          {/* Hero visual — floating category chips around a trophy (desktop only) */}
          <div className="hidden justify-center lg:flex">
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* ─── Stats strip ────────────────────────────────────────── */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-6 py-6 md:grid-cols-4">
          <Stat value={gamesPlayedToday} label="Games today" color="var(--color-primary)" />
          <Stat
            value={progress.streaks.current}
            label="Day streak"
            color="var(--color-accent)"
            icon={<Flame size={22} strokeWidth={2.2} />}
          />
          <Stat value={bestCatLabel} label="Best category" color="var(--color-cat-word)" isText />
          <Stat
            value={progress.gamesPlayed.length}
            label="Total played"
            color="var(--color-text)"
          />
        </div>
      </section>

      {/* ─── Continue Playing ───────────────────────────────────── */}
      {recentGames.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pt-10">
          <h2 className="mb-5" style={sectionTitleStyle()}>
            Continue playing
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {recentGames.map((g) => {
              const color = categoryColors[g.category] ?? "#1F6E4A";
              const title = g.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
              const catLabel = categoryInfo[g.category as GameCategory]?.title ?? g.category;
              return (
                <Link
                  key={g.slug}
                  href={`/play/${g.category}/${g.slug}`}
                  className="card-playful flex min-w-[240px] shrink-0 flex-col p-[18px]"
                >
                  <div
                    className="mb-3.5 h-1 w-full rounded-full"
                    style={{ background: color }}
                  />
                  <p className="mb-1.5 text-base font-bold leading-tight text-foreground">{title}</p>
                  <p className="text-[13px] text-text-muted">{catLabel}</p>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* ─── Quick Play Categories ──────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 pt-10">
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
          <h2 style={sectionTitleStyle()}>Quick play</h2>
          <Link
            href="/play"
            className="inline-flex items-center gap-1.5 whitespace-nowrap text-[15px] font-semibold"
            style={{ color: "var(--color-primary)" }}
          >
            Browse all 1,569 games <ArrowRight size={16} strokeWidth={2.4} />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORY_ORDER.map((cat) => (
            <CategoryCard key={cat} cat={cat} />
          ))}
        </div>
      </section>

      {/* ─── Game of the Day ────────────────────────────────────── */}
      {gameOfTheDayHref && gameOfTheDayTitle && (
        <section className="mx-auto max-w-6xl px-6 pt-10">
          <Link
            href={gameOfTheDayHref}
            className="group relative grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-5 overflow-hidden rounded-2xl border border-border px-7 py-6 transition-transform hover:-translate-y-0.5"
            style={{ background: "var(--gradient-warm)" }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(31,110,74,0.18) 0%, transparent 70%)",
              }}
            />
            <div
              className="relative z-[1] grid h-[72px] w-[72px] shrink-0 place-items-center rounded-[18px] text-white"
              style={{
                background: "var(--gradient-primary)",
                boxShadow: "0 10px 24px rgba(31,110,74,0.35)",
              }}
            >
              <Trophy size={32} strokeWidth={1.8} />
            </div>
            <div className="relative z-[1] min-w-0">
              <div
                className="mb-1.5 text-xs font-bold uppercase tracking-[0.1em]"
                style={{ color: "var(--color-primary)" }}
              >
                Game of the Day
              </div>
              <h3
                className="mb-1.5 text-[clamp(20px,2.4vw,26px)] font-bold leading-tight tracking-tight text-foreground"
                style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
              >
                {gameOfTheDayTitle}
              </h3>
              <div className="flex flex-wrap gap-x-3.5 gap-y-1.5 text-sm text-text-muted">
                <span className="inline-flex items-center gap-1 whitespace-nowrap">
                  <Clock size={13} strokeWidth={2.2} /> 6 min
                </span>
                <span>·</span>
                <span className="inline-flex items-center gap-1 whitespace-nowrap">
                  <Star size={13} strokeWidth={2.2} /> Featured today
                </span>
                <span>·</span>
                <span
                  className="whitespace-nowrap font-semibold"
                  style={{ color: "var(--color-accent)" }}
                >
                  +50 XP bonus
                </span>
              </div>
            </div>
            <div
              className="relative z-[1] grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border bg-surface transition-transform group-hover:translate-x-1"
              style={{ color: "var(--color-primary)" }}
            >
              <ArrowRight size={20} strokeWidth={2.4} />
            </div>
          </Link>
        </section>
      )}

      {/* ─── Top Rated ──────────────────────────────────────────── */}
      {topRated.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-16 pt-10">
          <h2 className="mb-5" style={sectionTitleStyle()}>
            Top rated this week
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {topRated.map((game) => {
              const color = categoryColors[game.category] ?? "#1F6E4A";
              return (
                <Link
                  key={game.slug}
                  href={game.href}
                  className="card-playful flex flex-col p-[18px]"
                >
                  <div
                    className="mb-3 inline-flex w-fit items-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold"
                    style={{ background: color + "22", color }}
                  >
                    {game.categoryLabel}
                  </div>
                  <div
                    className="mb-2.5 text-[17px] font-bold leading-tight text-foreground"
                    style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
                  >
                    {game.title}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-text-muted">
                    <div className="flex gap-0.5" style={{ color: "#F59E0B" }}>
                      {[0, 1, 2, 3, 4].map((n) => (
                        <Star
                          key={n}
                          size={14}
                          strokeWidth={2}
                          fill={n < Math.round(game.avgRating) ? "#F59E0B" : "none"}
                        />
                      ))}
                    </div>
                    <b className="tabular-nums text-foreground">{game.avgRating.toFixed(1)}</b>
                    <span>({game.ratingCount})</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

// ─── Sub-components ────────────────────────────────────────────

function Stat({
  value,
  label,
  color,
  isText,
  icon,
}: {
  value: number | string;
  label: string;
  color: string;
  isText?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div className="text-center">
      <div
        className="inline-flex items-center gap-2 leading-none tracking-tight tabular-nums"
        style={{
          fontFamily: "var(--font-merriweather), var(--font-heading)",
          fontSize: isText ? 22 : 32,
          fontWeight: 700,
          color,
        }}
      >
        {icon}
        {value}
      </div>
      <div className="mt-1.5 text-sm text-text-muted">{label}</div>
    </div>
  );
}

function CategoryCard({ cat }: { cat: GameCategory }) {
  const meta = CATEGORY_META[cat];
  const info = categoryInfo[cat];
  const Icon = meta.Icon;
  const [hover, setHover] = useState(false);

  return (
    <Link
      href={`/play/${cat}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flex min-h-[280px] flex-col rounded-2xl border p-[22px] transition-all"
      style={{
        background: "var(--gradient-card)",
        borderColor: hover ? meta.color : "var(--color-border)",
        boxShadow: hover
          ? `0 14px 32px ${meta.color}26`
          : "var(--shadow-sm)",
        transform: hover ? "translateY(-3px)" : "none",
      }}
    >
      <div
        className="mb-3.5 grid h-[52px] w-[52px] place-items-center rounded-[14px] text-white transition-transform"
        style={{
          background: meta.color,
          boxShadow: `0 8px 18px ${meta.color}40`,
          transform: hover ? "scale(1.08) rotate(-5deg)" : "none",
        }}
      >
        <Icon size={26} strokeWidth={2} />
      </div>
      <h3
        className="mb-1.5 text-[19px] font-bold tracking-tight text-foreground"
        style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
      >
        {info.title}
      </h3>
      <p className="mb-3.5 text-sm leading-relaxed text-text-muted">{meta.blurb}</p>
      <div
        className="mb-auto rounded-[10px] border border-dashed px-3 py-2.5 text-[13px] italic leading-snug text-text-muted transition-colors"
        style={{
          background: hover ? meta.colorSoft : "var(--color-surface-alt)",
          borderColor: hover ? meta.color + "55" : "var(--color-border)",
        }}
      >
        &ldquo;{meta.sample}&rdquo;
      </div>
      <div className="mt-3.5 flex items-center justify-between border-t border-border-light pt-3 text-xs">
        <span className="font-bold" style={{ color: meta.color }}>
          {meta.count} games
        </span>
        <span className="inline-flex items-center gap-1 text-text-muted">
          <Clock size={12} strokeWidth={2} /> {meta.minutes}
        </span>
      </div>
    </Link>
  );
}

function HeroVisual() {
  const chips = [
    { Icon: Heart, color: "#6366F1", top: "4%", left: "8%", rotate: "-10deg", size: 84 },
    { Icon: BookOpen, color: "#0EA5E9", top: "18%", right: "2%", rotate: "12deg", size: 92 },
    { Icon: Puzzle, color: "#F59E0B", bottom: "12%", left: "2%", rotate: "-8deg", size: 88 },
    { Icon: Layers, color: "#10B981", bottom: "2%", right: "14%", rotate: "10deg", size: 96 },
  ];
  return (
    <div className="relative w-full" style={{ maxWidth: 420, aspectRatio: "1 / 0.95" }}>
      {/* gradient blob */}
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          inset: "10% 15% 20% 10%",
          borderRadius: "40% 60% 55% 45% / 50% 45% 55% 50%",
          background: "var(--gradient-hero)",
          boxShadow: "0 30px 60px rgba(31,110,74,0.35)",
        }}
      />
      {/* chips */}
      {chips.map((c, i) => {
        const { Icon } = c;
        return (
          <div
            key={i}
            aria-hidden="true"
            className="absolute grid place-items-center rounded-[20px] bg-white"
            style={{
              top: c.top,
              left: c.left,
              right: c.right,
              bottom: c.bottom,
              width: c.size,
              height: c.size,
              transform: `rotate(${c.rotate})`,
              boxShadow: "0 16px 36px rgba(26,37,32,0.18)",
              border: "1px solid rgba(0,0,0,0.04)",
            }}
          >
            <div
              className="grid place-items-center rounded-[14px] text-white"
              style={{
                width: "64%",
                height: "64%",
                background: c.color,
              }}
            >
              <Icon size={Math.round(c.size * 0.38)} strokeWidth={2} />
            </div>
          </div>
        );
      })}
      {/* trophy badge */}
      <div
        aria-hidden="true"
        className="absolute grid place-items-center text-white"
        style={{
          top: "42%",
          left: "50%",
          width: 120,
          height: 120,
          borderRadius: 30,
          transform: "translate(-50%, -50%) rotate(-4deg)",
          background: "linear-gradient(135deg, #C08A1A 0%, #B54A2B 100%)",
          boxShadow:
            "0 22px 44px rgba(181,74,43,0.4), inset 0 0 0 3px rgba(255,255,255,0.3)",
        }}
      >
        <Trophy size={54} strokeWidth={1.8} />
      </div>
      {/* XP sparkle */}
      <div
        aria-hidden="true"
        className="absolute flex items-center gap-1 rounded-full border border-border bg-surface px-3 py-1.5 text-[13px] font-bold"
        style={{
          top: "10%",
          right: "20%",
          transform: "rotate(6deg)",
          color: "var(--color-primary)",
          boxShadow: "0 6px 14px rgba(31,110,74,0.2)",
        }}
      >
        <Sparkles size={12} strokeWidth={2.5} /> +20 XP
      </div>
    </div>
  );
}

function sectionTitleStyle(): React.CSSProperties {
  return {
    fontFamily: "var(--font-merriweather), var(--font-heading)",
    fontSize: 24,
    fontWeight: 700,
    letterSpacing: "-0.01em",
    color: "var(--color-text)",
  };
}
