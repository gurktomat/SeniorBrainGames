import type { Metadata } from "next";
import Link from "next/link";
import { getQuizzesByCategory, categoryInfo } from "@/lib/quizzes";
import CategoryIcon from "@/components/CategoryIcon";

export const metadata: Metadata = {
  title: "Word Games — Scrambles, Proverbs, Synonyms & More",
  description:
    "Challenge your vocabulary with fun word games! Word scrambles, proverbs, synonym challenges, spelling bees, and more.",
};

const specialGames = [
  {
    id: "word-scramble",
    title: "Word Scramble",
    description: "Unscramble the letters to find the hidden word!",
    count: "15 Puzzles",
  },
  {
    id: "complete-the-proverb",
    title: "Complete the Proverb",
    description: "Can you finish these well-known proverbs and sayings?",
    count: "15 Proverbs",
  },
  {
    id: "spelling-bee",
    title: "Spelling Bee",
    description: "Test your spelling skills with commonly misspelled words!",
    count: "15 Words",
  },
  {
    id: "word-association",
    title: "Word Association",
    description: "Find the word that connects the group!",
    count: "15 Puzzles",
  },
  {
    id: "crossword-classic",
    title: "Classic Crossword",
    description: "Solve classic crossword puzzles — fill the grid using the across and down clues!",
    count: "3 Puzzles",
  },
];

export default function WordGames() {
  const quizzes = getQuizzesByCategory("word-games");
  const info = categoryInfo["word-games"];

  return (
    <div>
      <div className="mb-12 px-6 py-12 text-center" style={{ background: "linear-gradient(135deg, #E8983E15 0%, #F8F9FC 100%)" }}>
        <div className="mx-auto max-w-3xl">
          <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: "#E8983E", color: "white" }}>
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
              href={`/word-games/${game.id}`}
              className="card-enterprise group flex flex-col p-6"
            >
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
            <Link
              key={quiz.id}
              href={`/word-games/${quiz.id}`}
              className="card-enterprise group flex flex-col p-6"
            >
              <h2
                className="mb-2 text-lg font-bold text-foreground"
                style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
              >
                {quiz.title}
              </h2>
              <p className="mb-4 flex-1 text-base text-text-muted">{quiz.description}</p>
              <div className="flex items-center justify-between">
                <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-sm font-bold text-primary">
                  {quiz.questions.length} Questions
                </span>
                <span className="text-sm font-bold text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  Play &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
