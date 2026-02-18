import type { Metadata } from "next";
import Link from "next/link";
import { getQuizzesByCategory, categoryInfo } from "@/lib/quizzes";
import CategoryIcon from "@/components/CategoryIcon";
import QuizCard from "@/components/QuizCard";
import { GameIcon } from "@/lib/gameIcons";

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
  {
    id: "sudoku-puzzles",
    title: "Sudoku",
    description: "Fill the grid so every row, column, and 3×3 box contains the numbers 1-9!",
    count: "3 Puzzles",
  },
  {
    id: "sliding-puzzle",
    title: "Sliding Puzzle",
    description: "Slide the tiles into the correct order — a classic brain teaser!",
    count: "3 Levels",
  },
  {
    id: "sequence-memory",
    title: "Sequence Memory",
    description: "Watch the colors light up, then repeat the sequence from memory!",
    count: "3 Levels",
  },
  {
    id: "matching-pairs",
    title: "Matching Pairs",
    description: "Match each item on the left with its partner on the right!",
    count: "10 Rounds",
  },
  {
    id: "math-challenge",
    title: "Math Challenge",
    description: "Exercise your mental math skills with fun arithmetic puzzles!",
    count: "3 Levels",
  },
];

export default function MemoryGames() {
  const quizzes = getQuizzesByCategory("memory-games");
  const info = categoryInfo["memory-games"];

  return (
    <div>
      <div className="mb-12 px-6 py-12 text-center" style={{ background: "linear-gradient(135deg, #16A34A15 0%, #F8F9FC 100%)" }}>
        <div className="mx-auto max-w-3xl">
          <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: "#16A34A", color: "white" }}>
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
              href={`/memory-games/${game.id}`}
              className="card-enterprise group flex flex-col p-6"
            >
              <GameIcon gameId={game.id} color="#16A34A" />
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
            <QuizCard key={quiz.id} quiz={quiz} basePath="/memory-games" iconColor="#16A34A" />
          ))}
        </div>
      </div>
    </div>
  );
}
