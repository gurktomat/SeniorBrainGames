import type { Metadata } from "next";
import { notFound } from "next/navigation";
import QuizEngine from "@/components/QuizEngine";
import TrueOrFalseEngine from "@/components/TrueOrFalseEngine";
import WhoAmIEngine from "@/components/WhoAmIEngine";
import SortingEngine from "@/components/SortingEngine";
import { getQuizzesByCategory, getQuizBySlug, specialGameSlugs } from "@/lib/quizzes";

import trueOrFalseData from "@/data/general-knowledge/true-or-false.json";
import whoAmIData from "@/data/general-knowledge/who-am-i.json";
import scienceSortingData from "@/data/general-knowledge/science-sorting.json";

const specialGames: Record<string, { title: string; description: string }> = {
  "true-or-false": { title: "True or False", description: "Test your knowledge — is this statement true or false?" },
  "who-am-i": { title: "Who Am I?", description: "Guess the famous person from progressive clues — fewer clues means more points!" },
  "science-sorting": { title: "Science Sorting", description: "Sort items into the correct science categories!" },
};

export function generateStaticParams() {
  const quizSlugs = getQuizzesByCategory("general-knowledge").map((q) => ({
    slug: q.id,
  }));
  const gameSlugs = (specialGameSlugs["general-knowledge"] || []).map((s) => ({
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
  const quiz = getQuizBySlug("general-knowledge", slug);
  if (quiz) {
    return { title: quiz.title, description: quiz.description };
  }
  const special = specialGames[slug];
  if (special) {
    return { title: special.title, description: special.description };
  }
  return {};
}

export default async function GeneralKnowledgeQuizPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Check if it's a regular quiz
  const quiz = getQuizBySlug("general-knowledge", slug);
  if (quiz) {
    return <QuizEngine quiz={quiz} />;
  }

  // Special game engines
  switch (slug) {
    case "true-or-false":
      return (
        <TrueOrFalseEngine
          title={trueOrFalseData.title}
          statements={trueOrFalseData.statements}
        />
      );
    case "who-am-i":
      return (
        <WhoAmIEngine
          title={whoAmIData.title}
          puzzles={whoAmIData.puzzles}
        />
      );
    case "science-sorting":
      return (
        <SortingEngine
          title={scienceSortingData.title}
          rounds={scienceSortingData.rounds}
        />
      );
    default:
      notFound();
  }
}
