import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { getTopRatedGames } from "@/lib/db";
import { allGames } from "@/lib/gameIndex";
import DashboardClient from "./DashboardClient";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export const revalidate = 3600;

function getGameOfTheDay() {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const gamesOnly = allGames.filter((g) => g.category !== "blog");
  const index = seed % gamesOnly.length;
  return gamesOnly[index];
}

export default async function Home() {
  const gameOfTheDay = getGameOfTheDay();
  const topRatedRaw = await getTopRatedGames(4);
  const topRated = topRatedRaw
    .map((game) => {
      const entry = allGames.find((g) => g.id === game.slug);
      if (!entry) return null;
      return {
        slug: game.slug,
        avgRating: game.avgRating,
        ratingCount: game.ratingCount,
        title: entry.title,
        href: entry.href,
        categoryLabel: entry.categoryLabel,
        category: entry.category,
      };
    })
    .filter((g): g is NonNullable<typeof g> => g !== null);

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
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: "https://seniorbraingames.org/?q={search_term_string}",
            },
            "query-input": "required name=search_term_string",
          },
        }}
      />
      <DashboardClient
        topRated={topRated}
        gameOfTheDayHref={gameOfTheDay.href}
        gameOfTheDayTitle={gameOfTheDay.title}
      />
    </div>
  );
}
