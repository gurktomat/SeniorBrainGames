import type { Metadata } from "next";
import { notFound } from "next/navigation";
import QuizEngine from "@/components/QuizEngine";
import { getQuizzesByCategory, getQuizBySlug } from "@/lib/quizzes";

export function generateStaticParams() {
  return getQuizzesByCategory("nostalgia-trivia").map((quiz) => ({
    slug: quiz.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const quiz = getQuizBySlug("nostalgia-trivia", slug);
  if (!quiz) return {};
  return {
    title: quiz.title,
    description: quiz.description,
  };
}

export default async function NostalgiaQuizPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const quiz = getQuizBySlug("nostalgia-trivia", slug);

  if (!quiz) {
    notFound();
  }

  return <QuizEngine quiz={quiz} />;
}
