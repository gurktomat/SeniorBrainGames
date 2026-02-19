import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GamePrintLayout from "@/components/printable/GamePrintLayout";

export const metadata: Metadata = { robots: "noindex, nofollow" };
import PrintableQuiz from "@/components/printable/PrintableQuiz";
import PrintableTrueOrFalse from "@/components/printable/PrintableTrueOrFalse";
import PrintableSudoku from "@/components/printable/PrintableSudoku";
import { getQuizBySlug, getQuizzesByCategory } from "@/lib/quizzes";

import sudokuData from "@/data/memory-games/sudoku-puzzles.json";
import sudokuChallengeData from "@/data/memory-games/sudoku-challenge.json";
import memoryTrueOrFalseData from "@/data/memory-games/memory-true-or-false.json";

const printableSpecials: Record<string, string> = {
  "sudoku-puzzles": "Sudoku",
  "sudoku-challenge": "Sudoku Challenge",
  "memory-true-or-false": "Memory True or False",
};

export function generateStaticParams() {
  const quizSlugs = getQuizzesByCategory("memory-games").map((q) => ({ slug: q.id }));
  const specialSlugs = Object.keys(printableSpecials).map((s) => ({ slug: s }));
  return [...quizSlugs, ...specialSlugs];
}

function SpecialPrintContent({ slug, showAnswers }: { slug: string; showAnswers: boolean }) {
  switch (slug) {
    case "sudoku-puzzles":
      return (
        <>
          {sudokuData.puzzles.map((puzzle, i) => (
            <div key={puzzle.id}>
              {i > 0 && <div className="print-page-break" />}
              <PrintableSudoku puzzle={puzzle} showAnswers={showAnswers} />
            </div>
          ))}
        </>
      );
    case "sudoku-challenge":
      return (
        <>
          {sudokuChallengeData.puzzles.map((puzzle, i) => (
            <div key={puzzle.id}>
              {i > 0 && <div className="print-page-break" />}
              <PrintableSudoku puzzle={puzzle} showAnswers={showAnswers} />
            </div>
          ))}
        </>
      );
    case "memory-true-or-false":
      return <PrintableTrueOrFalse title={memoryTrueOrFalseData.title} statements={memoryTrueOrFalseData.statements} showAnswers={showAnswers} />;
    default:
      return null;
  }
}

export default async function MemoryGamesPrintPage({
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
  const quiz = getQuizBySlug("memory-games", slug);
  if (quiz) {
    return (
      <GamePrintLayout backHref={`/memory-games/${slug}`} backLabel="Back to Game" title={quiz.title}>
        <PrintableQuiz quiz={quiz} showAnswers={showAnswers} />
      </GamePrintLayout>
    );
  }

  // Special printable game
  const title = printableSpecials[slug];
  if (title) {
    return (
      <GamePrintLayout backHref={`/memory-games/${slug}`} backLabel="Back to Game" title={title}>
        <SpecialPrintContent slug={slug} showAnswers={showAnswers} />
      </GamePrintLayout>
    );
  }

  notFound();
}
