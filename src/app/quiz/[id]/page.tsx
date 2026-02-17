import { notFound } from "next/navigation";
import { getQuizById, quizzes } from "@/lib/quizzes";
import QuizEngine from "@/components/QuizEngine";

export function generateStaticParams() {
  return quizzes.map((quiz) => ({ id: quiz.id }));
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const quiz = getQuizById(id);

  if (!quiz) {
    notFound();
  }

  return <QuizEngine quiz={quiz} />;
}
