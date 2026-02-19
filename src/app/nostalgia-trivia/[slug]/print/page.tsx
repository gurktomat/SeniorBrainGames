import { notFound } from "next/navigation";
import GamePrintLayout from "@/components/printable/GamePrintLayout";
import PrintableQuiz from "@/components/printable/PrintableQuiz";
import PrintableTrueOrFalse from "@/components/printable/PrintableTrueOrFalse";
import PrintableRiddles from "@/components/printable/PrintableRiddles";
import { getQuizBySlug, getQuizzesByCategory } from "@/lib/quizzes";

import nostalgiaFactOrFictionData from "@/data/nostalgia-trivia/nostalgia-fact-or-fiction.json";
import nostalgiaRiddlesData from "@/data/nostalgia-trivia/nostalgia-riddles.json";

const printableSpecials: Record<string, string> = {
  "nostalgia-riddles": "Nostalgia Riddles",
  "nostalgia-fact-or-fiction": "Nostalgia Fact or Fiction",
};

export function generateStaticParams() {
  const quizSlugs = getQuizzesByCategory("nostalgia-trivia").map((q) => ({ slug: q.id }));
  const specialSlugs = Object.keys(printableSpecials).map((s) => ({ slug: s }));
  return [...quizSlugs, ...specialSlugs];
}

function SpecialPrintContent({ slug, showAnswers }: { slug: string; showAnswers: boolean }) {
  switch (slug) {
    case "nostalgia-riddles":
      return <PrintableRiddles title="Nostalgia Riddles" riddles={nostalgiaRiddlesData.riddles} showAnswers={showAnswers} />;
    case "nostalgia-fact-or-fiction":
      return <PrintableTrueOrFalse title={nostalgiaFactOrFictionData.title} statements={nostalgiaFactOrFictionData.statements} showAnswers={showAnswers} />;
    default:
      return null;
  }
}

export default async function NostalgiaPrintPage({
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
  const quiz = getQuizBySlug("nostalgia-trivia", slug);
  if (quiz) {
    return (
      <GamePrintLayout backHref={`/nostalgia-trivia/${slug}`} backLabel="Back to Game" title={quiz.title}>
        <PrintableQuiz quiz={quiz} showAnswers={showAnswers} />
      </GamePrintLayout>
    );
  }

  // Special printable game
  const title = printableSpecials[slug];
  if (title) {
    return (
      <GamePrintLayout backHref={`/nostalgia-trivia/${slug}`} backLabel="Back to Game" title={title}>
        <SpecialPrintContent slug={slug} showAnswers={showAnswers} />
      </GamePrintLayout>
    );
  }

  notFound();
}
