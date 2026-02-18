import type { Metadata } from "next";
import Link from "next/link";
import QuizCard from "@/components/QuizCard";
import { getQuizzesByCategory, categoryInfo } from "@/lib/quizzes";
import CategoryIcon from "@/components/CategoryIcon";
import { GameIcon } from "@/lib/gameIcons";

export const metadata: Metadata = {
  title: "General Knowledge Quizzes — Science, History, Geography & More",
  description:
    "Test your general knowledge with fun quizzes about geography, history, science, nature, food, and more!",
};

const specialGames = [
  {
    id: "true-or-false",
    title: "True or False",
    description: "Test your knowledge — is this statement true or false?",
    count: "20 Statements",
  },
  {
    id: "who-am-i",
    title: "Who Am I?",
    description: "Guess the famous person from progressive clues — fewer clues means more points!",
    count: "15 Puzzles",
  },
  {
    id: "science-sorting",
    title: "Science Sorting",
    description: "Sort items into the correct science categories!",
    count: "10 Rounds",
  },
  {
    id: "history-timeline",
    title: "History Timeline",
    description: "Put world history events in the correct chronological order!",
    count: "10 Rounds",
  },
];

export default function GeneralKnowledge() {
  const quizzes = getQuizzesByCategory("general-knowledge");
  const info = categoryInfo["general-knowledge"];

  return (
    <div>
      <div className="mb-12 px-6 py-12 text-center" style={{ background: "linear-gradient(135deg, #0891B215 0%, #F8F9FC 100%)" }}>
        <div className="mx-auto max-w-3xl">
          <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: "#0891B2", color: "white" }}>
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
              href={`/general-knowledge/${game.id}`}
              className="card-enterprise group flex flex-col p-6"
            >
              <GameIcon gameId={game.id} color="#0891B2" />
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
            <QuizCard key={quiz.id} quiz={quiz} basePath="/general-knowledge" iconColor="#0891B2" />
          ))}
        </div>
      </div>
    </div>
  );
}
