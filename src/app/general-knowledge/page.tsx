import type { Metadata } from "next";
import QuizCard from "@/components/QuizCard";
import { getQuizzesByCategory, categoryInfo } from "@/lib/quizzes";

export const metadata: Metadata = {
  title: "General Knowledge Quizzes — Science, History, Geography & More",
  description:
    "Test your general knowledge with fun quizzes about geography, history, science, nature, food, and more!",
};

export default function GeneralKnowledge() {
  const quizzes = getQuizzesByCategory("general-knowledge");
  const info = categoryInfo["general-knowledge"];

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
          <QuizCard
            key={quiz.id}
            quiz={quiz}
            basePath="/general-knowledge"
          />
        ))}
      </div>
    </div>
  );
}
