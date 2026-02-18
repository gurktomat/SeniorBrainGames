import type { Metadata } from "next";
import Link from "next/link";
import { Music, Layers, Shuffle, MapPin } from "lucide-react";
import { categoryInfo } from "@/lib/quizzes";
import CategoryIcon from "@/components/CategoryIcon";
import StreakBanner from "@/components/StreakBanner";
import JsonLd from "@/components/JsonLd";
import type { GameCategory } from "@/lib/types";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const categories: { key: GameCategory; iconBg: string }[] = [
  { key: "nostalgia-trivia", iconBg: "#3B6FC0" },
  { key: "general-knowledge", iconBg: "#0891B2" },
  { key: "word-games", iconBg: "#E8983E" },
  { key: "memory-games", iconBg: "#16A34A" },
];

const popularGames = [
  {
    title: "The Fabulous 1950s",
    href: "/nostalgia-trivia/fifties-nostalgia",
    category: "Nostalgia Trivia",
    Icon: Music,
  },
  {
    title: "Memory Card Match",
    href: "/memory-games/memory-card-match",
    category: "Memory Games",
    Icon: Layers,
  },
  {
    title: "Word Scramble",
    href: "/word-games/word-scramble",
    category: "Word Games",
    Icon: Shuffle,
  },
  {
    title: "Famous Landmarks",
    href: "/general-knowledge/famous-landmarks",
    category: "General Knowledge",
    Icon: MapPin,
  },
];

const stats = [
  { label: "Brain Games", value: "100" },
  { label: "Questions", value: "1000+" },
  { label: "Categories", value: "4" },
  { label: "Daily Challenges", value: "365" },
];

export default function Home() {
  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "SeniorBrainGames",
          url: "https://seniorbraingames.org",
          description:
            "Free brain games designed for seniors. Trivia, word games, memory challenges, and more. Keep your mind sharp with fun, engaging activities!",
        }}
      />
      <StreakBanner />

      {/* Hero section — full bleed gradient */}
      <section className="hero-gradient px-6 py-16 sm:py-24">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-widest text-white/70">
            Free Brain Games for Seniors
          </p>
          <h1
            className="text-gradient mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl"
            style={{
              fontFamily: "var(--font-merriweather), var(--font-heading)",
            }}
          >
            Keep Your Mind
            <br />
            Sharp & Active
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-white/80 sm:text-xl">
            Enjoy trivia, word puzzles, memory challenges, and a new daily
            challenge every day — all designed to be fun and engaging.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/nostalgia-trivia"
              className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-lg font-bold text-primary shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-white/30"
              style={{ background: "white" }}
            >
              Start Playing
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" /></svg>
            </Link>
            <Link
              href="/daily-challenge"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-bold text-white transition-all duration-200 hover:bg-white/20 focus:outline-none focus:ring-4 focus:ring-white/30"
            >
              Daily Challenge
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-border bg-surface px-6 py-8">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-primary">{stat.value}</p>
              <p className="mt-1 text-sm font-semibold text-text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Browse Categories */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 text-center">
          <h2
            className="mb-3 text-3xl font-bold text-foreground sm:text-4xl"
            style={{
              fontFamily: "var(--font-merriweather), var(--font-heading)",
            }}
          >
            Browse Categories
          </h2>
          <p className="text-lg text-text-muted">Choose a category and start exercising your brain</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {categories.map((cat) => {
            const info = categoryInfo[cat.key];
            return (
              <Link
                key={cat.key}
                href={`/${info.slug}`}
                className="card-enterprise group relative overflow-hidden p-6"
              >
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-white"
                  style={{ background: cat.iconBg }}
                  aria-hidden="true"
                >
                  <CategoryIcon name={info.icon} size={24} strokeWidth={2} />
                </div>
                <h3
                  className="mb-2 text-xl font-bold text-foreground"
                  style={{
                    fontFamily: "var(--font-merriweather), var(--font-heading)",
                  }}
                >
                  {info.title}
                </h3>
                <p className="text-base text-text-muted">{info.description}</p>
                <div className="mt-4 flex items-center gap-1 text-sm font-bold text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  Explore
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" /></svg>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Most Popular */}
      <section className="section-warm px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2
              className="mb-3 text-3xl font-bold text-foreground sm:text-4xl"
              style={{
                fontFamily: "var(--font-merriweather), var(--font-heading)",
              }}
            >
              Most Popular
            </h2>
            <p className="text-lg text-text-muted">Our most-played games to get you started</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {popularGames.map((game) => (
              <Link
                key={game.href}
                href={game.href}
                className="card-enterprise group flex flex-col items-center p-6 text-center"
              >
                <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary transition-transform duration-200 group-hover:scale-110">
                  <game.Icon size={28} strokeWidth={1.75} />
                </span>
                <h3 className="mb-1 text-base font-bold text-foreground">
                  {game.title}
                </h3>
                <p className="text-sm text-text-muted">{game.category}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Brain Games */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="overflow-hidden rounded-2xl" style={{ background: "var(--gradient-primary)" }}>
          <div className="relative z-10 p-8 sm:p-12">
            <h2
              className="mb-6 text-2xl font-bold text-white sm:text-3xl"
              style={{
                fontFamily: "var(--font-merriweather), var(--font-heading)",
              }}
            >
              Why Brain Games?
            </h2>
            <div className="grid gap-6 text-base text-white/80 sm:grid-cols-3 sm:text-lg">
              <div>
                <p className="mb-2 text-lg font-bold text-white">Stay Sharp</p>
                <p>
                  Regular mental stimulation through puzzles and trivia may help
                  maintain cognitive function and keep your mind active.
                </p>
              </div>
              <div>
                <p className="mb-2 text-lg font-bold text-white">Have Fun</p>
                <p>
                  The best brain exercise is the one you enjoy! Reminisce with
                  nostalgia trivia, test your vocabulary, or challenge your memory.
                </p>
              </div>
              <div>
                <p className="mb-2 text-lg font-bold text-white">Your Pace</p>
                <p>
                  No pressure, no timers — just enjoyable mental exercise whenever
                  you want it. Track your streaks and play daily.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
