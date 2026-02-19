import { notFound } from "next/navigation";
import GamePrintLayout from "@/components/printable/GamePrintLayout";
import PrintableQuiz from "@/components/printable/PrintableQuiz";
import PrintableTrueOrFalse from "@/components/printable/PrintableTrueOrFalse";
import PrintableCrossword from "@/components/printable/PrintableCrossword";
import PrintableWordSearch from "@/components/printable/PrintableWordSearch";
import PrintableWordScramble from "@/components/printable/PrintableWordScramble";
import PrintableRiddles from "@/components/printable/PrintableRiddles";
import PrintableWordLadder from "@/components/printable/PrintableWordLadder";
import PrintableCryptogram from "@/components/printable/PrintableCryptogram";
import { getQuizBySlug, getQuizzesByCategory } from "@/lib/quizzes";

import crosswordData from "@/data/word-games/crossword-classic.json";
import crosswordNatureScienceData from "@/data/word-games/crossword-nature-science.json";
import wordSearchData from "@/data/word-games/word-search.json";
import wordSearchAnimalsData from "@/data/word-games/word-search-animals.json";
import wordScrambleData from "@/data/word-games/word-scramble.json";
import foodWordScrambleData from "@/data/word-games/food-word-scramble.json";
import riddleData from "@/data/word-games/riddle-challenge.json";
import wordLadderData from "@/data/word-games/word-ladder.json";
import wordLadderChallengeData from "@/data/word-games/word-ladder-challenge.json";
import cryptogramData from "@/data/word-games/cryptogram.json";
import cryptogramPoetryData from "@/data/word-games/cryptogram-poetry.json";
import grammarTFData from "@/data/word-games/grammar-true-or-false.json";

const printableSpecials: Record<string, string> = {
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
};

export function generateStaticParams() {
  const quizSlugs = getQuizzesByCategory("word-games").map((q) => ({ slug: q.id }));
  const specialSlugs = Object.keys(printableSpecials).map((s) => ({ slug: s }));
  return [...quizSlugs, ...specialSlugs];
}

function SpecialPrintContent({ slug, showAnswers }: { slug: string; showAnswers: boolean }) {
  switch (slug) {
    case "word-scramble":
      return <PrintableWordScramble title="Word Scramble" puzzles={wordScrambleData.puzzles} showAnswers={showAnswers} />;
    case "food-word-scramble":
      return <PrintableWordScramble title="Food Word Scramble" puzzles={foodWordScrambleData.puzzles} showAnswers={showAnswers} />;
    case "crossword-classic":
      return (
        <>
          {crosswordData.puzzles.map((puzzle, i) => (
            <div key={puzzle.id}>
              {i > 0 && <div className="print-page-break" />}
              <PrintableCrossword puzzle={puzzle as React.ComponentProps<typeof PrintableCrossword>["puzzle"]} showAnswers={showAnswers} />
            </div>
          ))}
        </>
      );
    case "crossword-nature-science":
      return (
        <>
          {crosswordNatureScienceData.puzzles.map((puzzle, i) => (
            <div key={puzzle.id}>
              {i > 0 && <div className="print-page-break" />}
              <PrintableCrossword puzzle={puzzle as React.ComponentProps<typeof PrintableCrossword>["puzzle"]} showAnswers={showAnswers} />
            </div>
          ))}
        </>
      );
    case "word-search":
      return (
        <>
          {wordSearchData.puzzles.map((puzzle, i) => (
            <div key={puzzle.id}>
              {i > 0 && <div className="print-page-break" />}
              <PrintableWordSearch puzzle={puzzle} showAnswers={showAnswers} />
            </div>
          ))}
        </>
      );
    case "word-search-animals":
      return (
        <>
          {wordSearchAnimalsData.puzzles.map((puzzle, i) => (
            <div key={puzzle.id}>
              {i > 0 && <div className="print-page-break" />}
              <PrintableWordSearch puzzle={puzzle} showAnswers={showAnswers} />
            </div>
          ))}
        </>
      );
    case "word-ladder":
      return <PrintableWordLadder title="Word Ladder" puzzles={wordLadderData.puzzles} showAnswers={showAnswers} />;
    case "word-ladder-challenge":
      return <PrintableWordLadder title="Word Ladder Challenge" puzzles={wordLadderChallengeData.puzzles} showAnswers={showAnswers} />;
    case "cryptogram":
      return (
        <>
          {cryptogramData.puzzles.map((puzzle, i) => (
            <div key={puzzle.id}>
              {i > 0 && <div className="print-page-break" />}
              <PrintableCryptogram puzzle={puzzle} showAnswers={showAnswers} />
            </div>
          ))}
        </>
      );
    case "cryptogram-poetry":
      return (
        <>
          {cryptogramPoetryData.puzzles.map((puzzle, i) => (
            <div key={puzzle.id}>
              {i > 0 && <div className="print-page-break" />}
              <PrintableCryptogram puzzle={puzzle} showAnswers={showAnswers} />
            </div>
          ))}
        </>
      );
    case "riddle-challenge":
      return <PrintableRiddles title="Riddle Challenge" riddles={riddleData.riddles} showAnswers={showAnswers} />;
    case "grammar-true-or-false":
      return <PrintableTrueOrFalse title={grammarTFData.title} statements={grammarTFData.statements} showAnswers={showAnswers} />;
    default:
      return null;
  }
}

export default async function WordGamesPrintPage({
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
  const quiz = getQuizBySlug("word-games", slug);
  if (quiz) {
    return (
      <GamePrintLayout backHref={`/word-games/${slug}`} backLabel="Back to Game" title={quiz.title}>
        <PrintableQuiz quiz={quiz} showAnswers={showAnswers} />
      </GamePrintLayout>
    );
  }

  // Special printable game
  const title = printableSpecials[slug];
  if (title) {
    return (
      <GamePrintLayout backHref={`/word-games/${slug}`} backLabel="Back to Game" title={title}>
        <SpecialPrintContent slug={slug} showAnswers={showAnswers} />
      </GamePrintLayout>
    );
  }

  notFound();
}
