import type { Metadata } from "next";
import { notFound } from "next/navigation";
import QuizEngine from "@/components/QuizEngine";
import TimelineSortEngine from "@/components/TimelineSortEngine";
import { getQuizzesByCategory, getQuizBySlug, specialGameSlugs } from "@/lib/quizzes";

import timelineSortData from "@/data/nostalgia-trivia/timeline-sort.json";

const specialGames: Record<string, { title: string; description: string }> = {
  "timeline-sort": { title: "Timeline Sort", description: "Put historical events in the correct chronological order!" },
};

export function generateStaticParams() {
  const quizSlugs = getQuizzesByCategory("nostalgia-trivia").map((q) => ({
    slug: q.id,
  }));
  const gameSlugs = (specialGameSlugs["nostalgia-trivia"] || []).map((s) => ({
    slug: s,
  }));
  return [...quizSlugs, ...gameSlugs];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const quiz = getQuizBySlug("nostalgia-trivia", slug);
  if (quiz) {
    return { title: quiz.title, description: quiz.description };
  }
  const special = specialGames[slug];
  if (special) {
    return { title: special.title, description: special.description };
  }
  return {};
}

export default async function NostalgiaQuizPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Check if it's a regular quiz
  const quiz = getQuizBySlug("nostalgia-trivia", slug);
  if (quiz) {
    return <QuizEngine quiz={quiz} />;
  }

  // Special game engines
  switch (slug) {
    case "timeline-sort":
      return (
        <TimelineSortEngine
          title={timelineSortData.title}
          rounds={timelineSortData.rounds}
        />
      );
    default:
      notFound();
  }
}
