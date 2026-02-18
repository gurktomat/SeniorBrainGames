import type { Metadata } from "next";
import QuizCard from "@/components/QuizCard";
import { getQuizzesByCategory, categoryInfo } from "@/lib/quizzes";
import CategoryIcon from "@/components/CategoryIcon";

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
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} basePath="/general-knowledge" iconColor="#0891B2" />
          ))}
        </div>
      </div>
    </div>
  );
}
