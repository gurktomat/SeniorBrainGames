import type { Metadata } from "next";
import Link from "next/link";
import QuizCard from "@/components/QuizCard";
import { getQuizzesByCategory, categoryInfo } from "@/lib/quizzes";
import CategoryIcon from "@/components/CategoryIcon";
import { GameIcon } from "@/lib/gameIcons";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Nostalgia Trivia — 1950s, 60s, 70s & 80s Quizzes",
  description:
    "Travel back in time with fun nostalgia trivia quizzes! Test your memory of music, movies, TV shows, and culture from the 1950s through the 1980s.",
  alternates: { canonical: "/nostalgia-trivia" },
};

const specialGames = [
  {
    id: "timeline-sort",
    title: "Timeline Sort",
    description: "Put historical events in the correct chronological order!",
    count: "10 Rounds",
  },
  {
    id: "nostalgia-fact-or-fiction",
    title: "Nostalgia Fact or Fiction",
    description: "Can you tell which nostalgic facts from the 1950s–1980s are true and which are made up?",
    count: "20 Statements",
  },
  {
    id: "decade-sorting",
    title: "Decade Sorting",
    description: "Sort pop culture items into their correct decade!",
    count: "10 Rounds",
  },
  {
    id: "nostalgia-who-am-i",
    title: "Nostalgia Who Am I?",
    description: "Guess the pop culture icon from progressive clues!",
    count: "15 Puzzles",
  },
];

export default function NostalgiaTrivia() {
  const quizzes = getQuizzesByCategory("nostalgia-trivia");
  const info = categoryInfo["nostalgia-trivia"];

  const allGames = [
    ...specialGames.map((g) => ({ id: g.id, title: g.title })),
    ...quizzes.map((q) => ({ id: q.id, title: q.title })),
  ];

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: info.title,
          description: info.description,
          url: "https://seniorbraingames.org/nostalgia-trivia",
          mainEntity: {
            "@type": "ItemList",
            itemListElement: allGames.map((g, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `https://seniorbraingames.org/nostalgia-trivia/${g.id}`,
              name: g.title,
            })),
          },
        }}
      />
      <div className="mb-12 px-6 py-12 text-center" style={{ background: "linear-gradient(135deg, #3B6FC015 0%, #F8F9FC 100%)" }}>
        <div className="mx-auto max-w-3xl">
          <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: "#3B6FC0", color: "white" }}>
            <CategoryIcon name={info.icon} size={28} strokeWidth={1.75} />
          </span>
          <h1
            className="mb-3 text-3xl font-bold text-foreground sm:text-4xl"
            style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
          >
            {info.title}
          </h1>
          <p className="text-lg text-text-muted">{info.description}</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {specialGames.map((game) => (
            <Link
              key={game.id}
              href={`/nostalgia-trivia/${game.id}`}
              className="card-enterprise group flex flex-col p-6"
            >
              <GameIcon gameId={game.id} color="#3B6FC0" />
              <h2
                className="mb-2 text-lg font-bold text-foreground"
                style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
              >
                {game.title}
              </h2>
              <p className="mb-4 flex-1 text-base text-text-muted">{game.description}</p>
              <div className="flex items-center justify-between">
                <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-sm font-bold text-primary">
                  {game.count}
                </span>
                <span className="text-sm font-bold text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  Play &rarr;
                </span>
              </div>
            </Link>
          ))}

          {quizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} basePath="/nostalgia-trivia" iconColor="#3B6FC0" />
          ))}
        </div>
      </div>
    </div>
  );
}
