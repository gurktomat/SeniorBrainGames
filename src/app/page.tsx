import Link from "next/link";
import { categoryInfo } from "@/lib/quizzes";
import StreakBanner from "@/components/StreakBanner";
import type { GameCategory } from "@/lib/types";

const categories: GameCategory[] = [
  "nostalgia-trivia",
  "general-knowledge",
  "word-games",
  "memory-games",
];

const popularGames = [
  {
    title: "The Fabulous 1950s",
    href: "/nostalgia-trivia/fifties-nostalgia",
    category: "Nostalgia Trivia",
  },
  {
    title: "Memory Card Match",
    href: "/memory-games/memory-card-match",
    category: "Memory Games",
  },
  {
    title: "Word Scramble",
    href: "/word-games/word-scramble",
    category: "Word Games",
  },
  {
    title: "Famous Landmarks",
    href: "/general-knowledge/famous-landmarks",
    category: "General Knowledge",
  },
];

export default function Home() {
  return (
    <div>
      <StreakBanner />

      {/* Hero section */}
      <section className="mb-12 text-center">
        <h1
          className="mb-4 text-4xl font-bold text-foreground sm:text-5xl"
          style={{
            fontFamily: "var(--font-merriweather), var(--font-heading)",
          }}
        >
          Keep Your Mind Sharp
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-xl text-text-muted">
          Free brain games designed for fun and mental fitness. Trivia, word
          puzzles, memory challenges, and a new daily challenge every day!
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/nostalgia-trivia"
            className="inline-block rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary/30"
          >
            Start Playing
          </Link>
          <Link
            href="/daily-challenge"
            className="inline-block rounded-xl border-2 border-secondary bg-secondary/10 px-8 py-4 text-lg font-semibold text-foreground transition-colors hover:bg-secondary/20 focus:outline-none focus:ring-4 focus:ring-secondary/30"
          >
            Daily Challenge
          </Link>
        </div>
      </section>

      {/* Browse Categories */}
      <section className="mb-12">
        <h2
          className="mb-6 text-2xl font-bold text-foreground sm:text-3xl"
          style={{
            fontFamily: "var(--font-merriweather), var(--font-heading)",
          }}
        >
          Browse Categories
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {categories.map((cat) => {
            const info = categoryInfo[cat];
            return (
              <Link
                key={cat}
                href={`/${info.slug}`}
                className="block rounded-2xl border-2 border-border bg-surface p-6 shadow-sm transition-all hover:border-primary hover:shadow-md focus:outline-none focus:ring-4 focus:ring-primary/30 active:scale-[0.98]"
              >
                <p className="mb-2 text-3xl">{info.icon}</p>
                <h3
                  className="mb-2 text-xl font-bold text-foreground"
                  style={{
                    fontFamily:
                      "var(--font-merriweather), var(--font-heading)",
                  }}
                >
                  {info.title}
                </h3>
                <p className="text-lg text-text-muted">{info.description}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Most Popular */}
      <section className="mb-12">
        <h2
          className="mb-6 text-2xl font-bold text-foreground sm:text-3xl"
          style={{
            fontFamily: "var(--font-merriweather), var(--font-heading)",
          }}
        >
          Most Popular
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {popularGames.map((game) => (
            <Link
              key={game.href}
              href={game.href}
              className="flex items-center gap-4 rounded-xl border-2 border-border bg-surface p-4 transition-all hover:border-primary hover:shadow-sm focus:outline-none focus:ring-4 focus:ring-primary/30"
            >
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {game.title}
                </h3>
                <p className="text-base text-text-muted">{game.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Brain Games */}
      <section className="rounded-2xl bg-surface p-8 shadow-sm">
        <h2
          className="mb-4 text-2xl font-bold text-foreground sm:text-3xl"
          style={{
            fontFamily: "var(--font-merriweather), var(--font-heading)",
          }}
        >
          Why Brain Games?
        </h2>
        <div className="space-y-4 text-lg text-text-muted">
          <p>
            Keeping your mind active is one of the best things you can do for
            your brain health. Research suggests that regular mental stimulation
            through puzzles, trivia, and memory games may help maintain cognitive
            function and keep your mind sharp.
          </p>
          <p>
            Our games are designed to be fun first — because the best brain
            exercise is the one you actually enjoy doing! Whether you love
            reminiscing about the good old days with nostalgia trivia, testing
            your vocabulary with word games, or challenging your memory with
            pattern puzzles, there&apos;s something here for everyone.
          </p>
          <p>
            Play at your own pace, track your streaks, and challenge yourself
            with a new daily quiz every day. No pressure, no timers — just
            enjoyable mental exercise whenever you want it.
          </p>
        </div>
      </section>
    </div>
  );
}
