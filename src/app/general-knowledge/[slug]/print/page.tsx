import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GamePrintLayout from "@/components/printable/GamePrintLayout";

export const metadata: Metadata = { robots: "noindex, nofollow" };
import PrintableQuiz from "@/components/printable/PrintableQuiz";
import PrintableTrueOrFalse from "@/components/printable/PrintableTrueOrFalse";
import { getQuizBySlug, getQuizzesByCategory } from "@/lib/quizzes";

import trueOrFalseData from "@/data/general-knowledge/true-or-false.json";
import scienceTrueOrFalseData from "@/data/general-knowledge/science-true-or-false.json";

const printableSpecials: Record<string, string> = {
  "true-or-false": "True or False",
  "science-true-or-false": "Science True or False",
};

export function generateStaticParams() {
  const quizSlugs = getQuizzesByCategory("general-knowledge").map((q) => ({ slug: q.id }));
  const specialSlugs = Object.keys(printableSpecials).map((s) => ({ slug: s }));
  return [...quizSlugs, ...specialSlugs];
}

function SpecialPrintContent({ slug, showAnswers }: { slug: string; showAnswers: boolean }) {
  switch (slug) {
    case "true-or-false":
      return <PrintableTrueOrFalse title={trueOrFalseData.title} statements={trueOrFalseData.statements} showAnswers={showAnswers} />;
    case "science-true-or-false":
      return <PrintableTrueOrFalse title={scienceTrueOrFalseData.title} statements={scienceTrueOrFalseData.statements} showAnswers={showAnswers} />;
    default:
      return null;
  }
}

export default async function GeneralKnowledgePrintPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ answers?: string }>;
}) {
  const { slug } = await params;
  const { answers } = await searchParams;
  const showAnswers = answers === "true";

  // Quiz game
  const quiz = getQuizBySlug("general-knowledge", slug);
  if (quiz) {
    return (
      <GamePrintLayout backHref={`/general-knowledge/${slug}`} backLabel="Back to Game" title={quiz.title}>
        <PrintableQuiz quiz={quiz} showAnswers={showAnswers} />
      </GamePrintLayout>
    );
  }

  // Special printable game
  const title = printableSpecials[slug];
  if (title) {
    return (
      <GamePrintLayout backHref={`/general-knowledge/${slug}`} backLabel="Back to Game" title={title}>
        <SpecialPrintContent slug={slug} showAnswers={showAnswers} />
      </GamePrintLayout>
    );
  }

  notFound();
}
