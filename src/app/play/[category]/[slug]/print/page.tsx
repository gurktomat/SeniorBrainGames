import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ComponentProps } from "react";
import GamePrintLayout from "@/components/printable/GamePrintLayout";
import type { GameCategory } from "@/lib/types";
import fs from "fs/promises";
import path from "path";
import { printableSpecials as printableRegistry } from "@/lib/printable-shared";

export const metadata: Metadata = { robots: "noindex, nofollow" };

import PrintableQuiz from "@/components/printable/PrintableQuiz";
import PrintableTrueOrFalse from "@/components/printable/PrintableTrueOrFalse";
import PrintableRiddles from "@/components/printable/PrintableRiddles";
import PrintableCrossword from "@/components/printable/PrintableCrossword";
import PrintableWordSearch from "@/components/printable/PrintableWordSearch";
import PrintableWordScramble from "@/components/printable/PrintableWordScramble";
import PrintableWordLadder from "@/components/printable/PrintableWordLadder";
import PrintableCryptogram from "@/components/printable/PrintableCryptogram";
import PrintableSudoku from "@/components/printable/PrintableSudoku";
import { getQuizBySlug, getQuizzesByCategory } from "@/lib/quizzes";

const VALID_CATEGORIES: GameCategory[] = ["nostalgia-trivia", "general-knowledge", "word-games", "memory-games"];

// Display titles for special printable games
const printableTitles: Record<string, string> = {
  "nostalgia-riddles": "Nostalgia Riddles",
  "nostalgia-fact-or-fiction": "Nostalgia Fact or Fiction",
  "true-or-false": "True or False",
  "science-true-or-false": "Science True or False",
  "word-scramble": "Word Scramble",
  "food-word-scramble": "Food Word Scramble",
  "crossword-classic": "Classic Crossword",
  "crossword-nature-science": "Nature & Science Crossword",
  "word-search": "Word Search",
  "word-search-animals": "Animal Word Search",
  "word-ladder": "Word Ladder",
  "word-ladder-challenge": "Word Ladder Challenge",
  "cryptogram": "Cryptogram",
  "cryptogram-poetry": "Poetry Cryptogram",
  "riddle-challenge": "Riddle Challenge",
  "grammar-true-or-false": "Grammar True or False",
  "sudoku-puzzles": "Sudoku",
  "sudoku-challenge": "Sudoku Challenge",
  "memory-true-or-false": "Memory True or False",
};

type CrosswordPuzzle = ComponentProps<typeof PrintableCrossword>["puzzle"];
type WordSearchPuzzle = ComponentProps<typeof PrintableWordSearch>["puzzle"];
type CryptogramPuzzle = ComponentProps<typeof PrintableCryptogram>["puzzle"];
type SudokuPuzzle = ComponentProps<typeof PrintableSudoku>["puzzle"];
type RiddleList = ComponentProps<typeof PrintableRiddles>["riddles"];
type TrueFalseStatements = ComponentProps<typeof PrintableTrueOrFalse>["statements"];
type WordScramblePuzzles = ComponentProps<typeof PrintableWordScramble>["puzzles"];
type WordLadderPuzzles = ComponentProps<typeof PrintableWordLadder>["puzzles"];
type SpecialPrintData = {
  title?: string;
  riddles?: RiddleList;
  statements?: TrueFalseStatements;
  puzzles?: unknown[];
};

async function getSpecialGameData(category: string, slug: string) {
  try {
    const dataPath = path.join(process.cwd(), "src/data", category, `${slug}.json`);
    const content = await fs.readFile(dataPath, "utf-8");
    return JSON.parse(content);
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const params = [];
  for (const category of VALID_CATEGORIES) {
    const quizzes = await getQuizzesByCategory(category);
    const quizSlugs = quizzes
      .filter((q) => q && q.id)
      .map((q) => ({ category, slug: q.id }));
    
    const specialSlugs = (printableRegistry[category] || [])
      .map((s) => ({ category, slug: s }));
    params.push(...quizSlugs, ...specialSlugs);
  }
  return params.filter(p => p.category && p.slug);
}

function SpecialPrintContent({
  slug,
  data,
  showAnswers,
}: {
  slug: string;
  data: SpecialPrintData | null;
  showAnswers: boolean;
}) {
  if (!data) return <div className="p-8 text-center text-red-600">Game data could not be loaded for printing.</div>;

  switch (slug) {
    // Nostalgia
    case "nostalgia-riddles":
      return <PrintableRiddles title="Nostalgia Riddles" riddles={data.riddles ?? []} showAnswers={showAnswers} />;
    case "nostalgia-fact-or-fiction":
      return <PrintableTrueOrFalse title={data.title} statements={data.statements ?? []} showAnswers={showAnswers} />;

    // General knowledge
    case "true-or-false":
      return <PrintableTrueOrFalse title={data.title} statements={data.statements ?? []} showAnswers={showAnswers} />;
    case "science-true-or-false":
      return <PrintableTrueOrFalse title={data.title} statements={data.statements ?? []} showAnswers={showAnswers} />;

    // Word games
    case "word-scramble":
      return <PrintableWordScramble title="Word Scramble" puzzles={(data.puzzles as WordScramblePuzzles | undefined) ?? []} showAnswers={showAnswers} />;
    case "food-word-scramble":
      return <PrintableWordScramble title="Food Word Scramble" puzzles={(data.puzzles as WordScramblePuzzles | undefined) ?? []} showAnswers={showAnswers} />;
    case "crossword-classic":
      if (!data?.puzzles) return <div>Data error: puzzles missing</div>;
      return (
        <>
          {(data.puzzles as CrosswordPuzzle[]).map((puzzle, i) => (
            <div key={puzzle.id}>
              {i > 0 && <div className="print-page-break" />}
              <PrintableCrossword puzzle={puzzle} showAnswers={showAnswers} />
            </div>
          ))}
        </>
      );
    case "crossword-nature-science":
      if (!data?.puzzles) return <div>Data error: puzzles missing</div>;
      return (
        <>
          {(data.puzzles as CrosswordPuzzle[]).map((puzzle, i) => (
            <div key={puzzle.id}>
              {i > 0 && <div className="print-page-break" />}
              <PrintableCrossword puzzle={puzzle} showAnswers={showAnswers} />
            </div>
          ))}
        </>
      );
    case "word-search":
      if (!data?.puzzles) return <div>Data error: puzzles missing</div>;
      return (
        <>
          {(data.puzzles as WordSearchPuzzle[]).map((puzzle, i) => (
            <div key={puzzle.id}>
              {i > 0 && <div className="print-page-break" />}
              <PrintableWordSearch puzzle={puzzle} showAnswers={showAnswers} />
            </div>
          ))}
        </>
      );
    case "word-search-animals":
      if (!data?.puzzles) return <div>Data error: puzzles missing</div>;
      return (
        <>
          {(data.puzzles as WordSearchPuzzle[]).map((puzzle, i) => (
            <div key={puzzle.id}>
              {i > 0 && <div className="print-page-break" />}
              <PrintableWordSearch puzzle={puzzle} showAnswers={showAnswers} />
            </div>
          ))}
        </>
      );
    case "word-ladder":
      return <PrintableWordLadder title="Word Ladder" puzzles={(data.puzzles as WordLadderPuzzles | undefined) ?? []} showAnswers={showAnswers} />;
    case "word-ladder-challenge":
      return <PrintableWordLadder title="Word Ladder Challenge" puzzles={(data.puzzles as WordLadderPuzzles | undefined) ?? []} showAnswers={showAnswers} />;
    case "cryptogram":
      if (!data?.puzzles) return <div>Data error: puzzles missing</div>;
      return (
        <>
          {(data.puzzles as CryptogramPuzzle[]).map((puzzle, i) => (
            <div key={puzzle.id}>
              {i > 0 && <div className="print-page-break" />}
              <PrintableCryptogram puzzle={puzzle} showAnswers={showAnswers} />
            </div>
          ))}
        </>
      );
    case "cryptogram-poetry":
      if (!data?.puzzles) return <div>Data error: puzzles missing</div>;
      return (
        <>
          {(data.puzzles as CryptogramPuzzle[]).map((puzzle, i) => (
            <div key={puzzle.id}>
              {i > 0 && <div className="print-page-break" />}
              <PrintableCryptogram puzzle={puzzle} showAnswers={showAnswers} />
            </div>
          ))}
        </>
      );
    case "riddle-challenge":
      return <PrintableRiddles title="Riddle Challenge" riddles={data.riddles ?? []} showAnswers={showAnswers} />;
    case "grammar-true-or-false":
      return <PrintableTrueOrFalse title={data.title} statements={data.statements ?? []} showAnswers={showAnswers} />;

    // Memory games
    case "sudoku-puzzles":
      if (!data?.puzzles) return <div>Data error: puzzles missing</div>;
      return (
        <>
          {(data.puzzles as SudokuPuzzle[]).map((puzzle, i) => (
            <div key={puzzle.id}>
              {i > 0 && <div className="print-page-break" />}
              <PrintableSudoku puzzle={puzzle} showAnswers={showAnswers} />
            </div>
          ))}
        </>
      );
    case "sudoku-challenge":
      if (!data?.puzzles) return <div>Data error: puzzles missing</div>;
      return (
        <>
          {(data.puzzles as SudokuPuzzle[]).map((puzzle, i) => (
            <div key={puzzle.id}>
              {i > 0 && <div className="print-page-break" />}
              <PrintableSudoku puzzle={puzzle} showAnswers={showAnswers} />
            </div>
          ))}
        </>
      );
    case "memory-true-or-false":
      return <PrintableTrueOrFalse title={data.title} statements={data.statements ?? []} showAnswers={showAnswers} />;

    default:
      return null;
  }
}

export default async function UnifiedPrintPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string; slug: string }>;
  searchParams: Promise<{ answers?: string }>;
}) {
  const { category, slug } = await params;
  const { answers } = await searchParams;
  const showAnswers = answers === "true";

  if (!VALID_CATEGORIES.includes(category as GameCategory)) notFound();

  // Quiz game
  const quiz = await getQuizBySlug(category as GameCategory, slug);
  if (quiz && Array.isArray(quiz.questions)) {
    return (
      <GamePrintLayout backHref={`/play/${category}/${slug}`} backLabel="Back to Game" title={quiz.title}>
        <PrintableQuiz quiz={quiz} showAnswers={showAnswers} />
      </GamePrintLayout>
    );
  }

  // Special printable game
  const isPrintable = (printableRegistry[category] || []).includes(slug);
  const title = printableTitles[slug];
  
  if (isPrintable && title) {
    const data = await getSpecialGameData(category, slug);
    return (
      <GamePrintLayout backHref={`/play/${category}/${slug}`} backLabel="Back to Game" title={title}>
        <SpecialPrintContent slug={slug} data={data} showAnswers={showAnswers} />
      </GamePrintLayout>
    );
  }

  notFound();
}
