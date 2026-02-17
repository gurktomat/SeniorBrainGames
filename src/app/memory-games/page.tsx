import type { Metadata } from "next";
import Link from "next/link";
import { getQuizzesByCategory, categoryInfo } from "@/lib/quizzes";

export const metadata: Metadata = {
  title: "Memory Games — Card Match, Patterns, Sorting & More",
  description:
    "Sharpen your memory with fun games! Card matching, pattern recognition, spot the difference, and more cognitive exercises.",
};

const specialGames = [
  {
    id: "memory-card-match",
    title: "Memory Card Match",
    description:
      "Flip cards to find matching pairs! Test your memory with this classic game.",
    count: "3 Levels",
  },
  {
    id: "spot-the-difference",
    title: "Spot the Difference",
    description: "Look carefully at the items, then spot what changed!",
    count: "15 Rounds",
  },
  {
    id: "whats-missing",
    title: "What's Missing?",
    description:
      "Study the items carefully, then figure out which one disappeared!",
    count: "15 Rounds",
  },
  {
    id: "pattern-recognition",
    title: "Pattern Recognition",
    description:
      "Find the pattern and choose what comes next in the sequence!",
    count: "15 Puzzles",
  },
  {
    id: "color-shape-sorting",
    title: "Color & Shape Sorting",
    description: "Sort items into the correct categories as quickly as you can!",
    count: "10 Rounds",
  },
];

export default function MemoryGames() {
  const quizzes = getQuizzesByCategory("memory-games");
  const info = categoryInfo["memory-games"];

  return (
    <div>
      <div className="mb-8 text-center">
        <p className="mb-2 text-4xl">{info.icon}</p>
        <h1
          className="mb-3 text-3xl font-bold text-foreground sm:text-4xl"
          style={{
            fontFamily: "var(--font-merriweather), var(--font-heading)",
          }}
        >
          {info.title}
        </h1>
        <p className="text-xl text-text-muted">{info.description}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {specialGames.map((game) => (
          <Link
            key={game.id}
            href={`/memory-games/${game.id}`}
            className="block rounded-2xl border-2 border-border bg-surface p-6 shadow-sm transition-all hover:border-primary hover:shadow-md focus:outline-none focus:ring-4 focus:ring-primary/30 active:scale-[0.98]"
          >
            <h2
              className="mb-2 text-xl font-bold text-foreground"
              style={{
                fontFamily: "var(--font-merriweather), var(--font-heading)",
              }}
            >
              {game.title}
            </h2>
            <p className="mb-4 text-lg text-text-muted">{game.description}</p>
            <span className="inline-block rounded-full bg-primary/10 px-4 py-2 text-base font-semibold text-primary">
              {game.count}
            </span>
          </Link>
        ))}

        {quizzes.map((quiz) => (
          <Link
            key={quiz.id}
            href={`/memory-games/${quiz.id}`}
            className="block rounded-2xl border-2 border-border bg-surface p-6 shadow-sm transition-all hover:border-primary hover:shadow-md focus:outline-none focus:ring-4 focus:ring-primary/30 active:scale-[0.98]"
          >
            <h2
              className="mb-2 text-xl font-bold text-foreground"
              style={{
                fontFamily: "var(--font-merriweather), var(--font-heading)",
              }}
            >
              {quiz.title}
            </h2>
            <p className="mb-4 text-lg text-text-muted">{quiz.description}</p>
            <span className="inline-block rounded-full bg-primary/10 px-4 py-2 text-base font-semibold text-primary">
              {quiz.questions.length} Questions
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
