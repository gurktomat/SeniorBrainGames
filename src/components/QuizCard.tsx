import Link from "next/link";
import type { Quiz } from "@/lib/types";
import { GameIcon } from "@/lib/gameIcons";

export default function QuizCard({
  quiz,
  basePath,
  iconColor,
}: {
  quiz: Quiz;
  basePath: string;
  iconColor: string;
}) {
  return (
    <Link
      href={`${basePath}/${quiz.id}`}
      className="card-enterprise group flex flex-col p-6"
    >
      <GameIcon gameId={quiz.id} color={iconColor} />
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
  );
}
