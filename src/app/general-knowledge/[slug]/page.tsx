import type { Metadata } from "next";
import { notFound } from "next/navigation";
import QuizEngine from "@/components/QuizEngine";
import { getQuizzesByCategory, getQuizBySlug } from "@/lib/quizzes";

export function generateStaticParams() {
  return getQuizzesByCategory("general-knowledge").map((quiz) => ({
    slug: quiz.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const quiz = getQuizBySlug("general-knowledge", slug);
  if (!quiz) return {};
  return {
    title: quiz.title,
    description: quiz.description,
  };
}

export default async function GeneralKnowledgeQuizPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const quiz = getQuizBySlug("general-knowledge", slug);

  if (!quiz) {
    notFound();
  }

  return <QuizEngine quiz={quiz} />;
}
