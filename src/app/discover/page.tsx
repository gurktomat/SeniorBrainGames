import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Trophy, Sparkles } from "lucide-react";
import { collections, getFeaturedCollection } from "@/lib/collections";
import { getTopRatedGames } from "@/lib/db";
import { allGames } from "@/lib/gameIndex";
import { categoryColors } from "@/lib/gameIcons";
import GameCardNew from "@/components/GameCardNew";

export const metadata: Metadata = {
  title: "Discover",
  description: "Discover curated game collections and find new brain training challenges.",
  alternates: { canonical: "/discover" },
};

export const revalidate = 3600;

function getGameOfTheDay() {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const gamesOnly = allGames.filter((g) => g.category !== "blog");
  const index = seed % gamesOnly.length;
  return gamesOnly[index];
}

export default async function DiscoverPage() {
  const featured = getFeaturedCollection();
  const topRatedRaw = await getTopRatedGames(6);
  const topRated = topRatedRaw
    .map((game) => {
      const entry = allGames.find((g) => g.id === game.slug);
      if (!entry) return null;
      return { ...entry, avgRating: game.avgRating, ratingCount: game.ratingCount };
    })
    .filter((g): g is NonNullable<typeof g> => g !== null);

  const gameOfTheDay = getGameOfTheDay();

  return (
    <div>
      {/* Hero */}
      <div className="px-6 py-10 text-center" style={{ background: "var(--gradient-warm)" }}>
        <div className="mx-auto max-w-3xl">
          <h1
            className="mb-2 text-3xl font-bold text-foreground sm:text-4xl"
            style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
          >
            Discover
          </h1>
          <p className="text-lg text-text-muted">
            Curated collections and trending games to keep your brain sharp
          </p>
        </div>
      </div>

      {/* Featured Collection */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div
          className="card-playful overflow-hidden p-8"
          style={{ background: "var(--gradient-primary)" }}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-1 text-sm font-bold uppercase tracking-widest text-white/70">Featured Collection</p>
              <h2
                className="mb-2 text-2xl font-bold text-white sm:text-3xl"
                style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
              >
                {featured.emoji} {featured.title}
              </h2>
              <p className="text-base text-white/80">{featured.description}</p>
              <p className="mt-2 text-sm text-white/60">{featured.games.length} games</p>
            </div>
            <Link
              href={`/play/${featured.games[0].category}/${featured.games[0].slug}`}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-bold text-primary transition-transform hover:scale-105"
            >
              Start Collection <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="mx-auto max-w-6xl px-6 pb-10">
        <h2
          className="mb-6 text-xl font-bold text-foreground"
          style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
        >
          <Sparkles size={20} className="mb-0.5 mr-2 inline text-primary" />
          Collections
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((col) => (
            <Link
              key={col.slug}
              href={`/play/${col.games[0].category}/${col.games[0].slug}`}
              className="card-playful group flex flex-col p-5"
            >
              <p className="mb-2 text-2xl">{col.emoji}</p>
              <h3 className="mb-1 text-base font-bold text-foreground">{col.title}</h3>
              <p className="mb-3 flex-1 text-sm text-text-muted">{col.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-primary">{col.games.length} games</span>
                <span className="text-sm font-bold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Play &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending / Top Rated */}
      {topRated.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-10">
          <h2
            className="mb-6 text-xl font-bold text-foreground"
            style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
          >
            <Trophy size={20} className="mb-0.5 mr-2 inline text-accent" />
            Trending Now
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topRated.map((game) => (
              <GameCardNew
                key={game.id}
                title={game.title}
                slug={game.id}
                category={game.category}
                description={game.description}
                rating={{ avgRating: game.avgRating, ratingCount: game.ratingCount }}
              />
            ))}
          </div>
        </section>
      )}

      {/* Game of the Day */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <Link
          href={gameOfTheDay.href}
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
              {gameOfTheDay.title}
            </h3>
          </div>
          <ArrowRight size={20} className="text-primary opacity-0 transition-opacity group-hover:opacity-100" />
        </Link>
      </section>
    </div>
  );
}
