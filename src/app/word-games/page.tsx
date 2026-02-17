import type { Metadata } from "next";
import Link from "next/link";
import { getQuizzesByCategory, categoryInfo } from "@/lib/quizzes";

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
];

export default function WordGames() {
  const quizzes = getQuizzesByCategory("word-games");
  const info = categoryInfo["word-games"];

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
            href={`/word-games/${game.id}`}
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
            href={`/word-games/${quiz.id}`}
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
