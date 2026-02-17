import type { Metadata } from "next";
import QuizCard from "@/components/QuizCard";
import { getQuizzesByCategory, categoryInfo } from "@/lib/quizzes";

export const metadata: Metadata = {
  title: "Nostalgia Trivia — 1950s, 60s, 70s & 80s Quizzes",
  description:
    "Travel back in time with fun nostalgia trivia quizzes! Test your memory of music, movies, TV shows, and culture from the 1950s through the 1980s.",
};

export default function NostalgiaTrivia() {
  const quizzes = getQuizzesByCategory("nostalgia-trivia");
  const info = categoryInfo["nostalgia-trivia"];

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
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} basePath="/nostalgia-trivia" />
        ))}
      </div>
    </div>
  );
}
