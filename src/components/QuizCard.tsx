import Link from "next/link";
import type { Quiz } from "@/lib/types";

export default function QuizCard({
  quiz,
  basePath,
}: {
  quiz: Quiz;
  basePath: string;
}) {
  return (
    <Link
      href={`${basePath}/${quiz.id}`}
      className="block rounded-2xl border-2 border-border bg-surface p-6 shadow-sm transition-all hover:border-primary hover:shadow-md focus:outline-none focus:ring-4 focus:ring-primary/30 active:scale-[0.98]"
    >
      <h2
        className="mb-2 text-xl font-bold text-foreground"
        style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
      >
        {quiz.title}
      </h2>
      <p className="mb-4 text-lg text-text-muted">{quiz.description}</p>
      <span className="inline-block rounded-full bg-primary/10 px-4 py-2 text-base font-semibold text-primary">
        {quiz.questions.length} Questions
      </span>
    </Link>
  );
}
