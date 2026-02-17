import Link from "next/link";
import type { Quiz } from "@/lib/types";

const decadeEmoji: Record<string, string> = {
  "1950s": "🎵",
  "1960s": "✌️",
  "1970s": "🕺",
  "1980s": "🎸",
};

export default function QuizCard({ quiz }: { quiz: Quiz }) {
  const decade = quiz.questions[0]?.decade ?? "1950s";
  const emoji = decadeEmoji[decade] ?? "🧠";

  return (
    <Link
      href={`/quiz/${quiz.id}`}
      className="block rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-400 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-[0.98]"
    >
      <div className="mb-2 text-4xl">{emoji}</div>
      <h2 className="mb-2 text-2xl font-bold text-gray-900">{quiz.title}</h2>
      <p className="mb-4 text-lg text-gray-600">{quiz.description}</p>
      <span className="inline-block rounded-full bg-blue-100 px-4 py-2 text-base font-semibold text-blue-800">
        {quiz.questions.length} Questions
      </span>
    </Link>
  );
}
