import type { Metadata } from "next";
import { notFound } from "next/navigation";
import QuizEngine from "@/components/QuizEngine";
import MemoryCardEngine from "@/components/MemoryCardEngine";
import SpotDifferenceEngine from "@/components/SpotDifferenceEngine";
import WhatsMissingEngine from "@/components/WhatsMissingEngine";
import PatternEngine from "@/components/PatternEngine";
import SortingEngine from "@/components/SortingEngine";
import SudokuEngine from "@/components/SudokuEngine";
import SlidingPuzzleEngine from "@/components/SlidingPuzzleEngine";
import SequenceMemoryEngine from "@/components/SequenceMemoryEngine";
import MatchingPairsEngine from "@/components/MatchingPairsEngine";
import MathChallengeEngine from "@/components/MathChallengeEngine";
import NumberMemoryEngine from "@/components/NumberMemoryEngine";
import { getQuizBySlug, getQuizzesByCategory, specialGameSlugs } from "@/lib/quizzes";

import memoryCardData from "@/data/memory-games/memory-card-match.json";
import spotDiffData from "@/data/memory-games/spot-the-difference.json";
import whatsMissingData from "@/data/memory-games/whats-missing.json";
import patternData from "@/data/memory-games/pattern-recognition.json";
import sortingData from "@/data/memory-games/color-shape-sorting.json";
import sudokuData from "@/data/memory-games/sudoku-puzzles.json";
import slidingPuzzleData from "@/data/memory-games/sliding-puzzle.json";
import sequenceMemoryData from "@/data/memory-games/sequence-memory.json";
import matchingPairsData from "@/data/memory-games/matching-pairs.json";
import mathChallengeData from "@/data/memory-games/math-challenge.json";
import numberMemoryData from "@/data/memory-games/number-memory.json";

const specialGames: Record<string, { title: string; description: string }> = {
  "memory-card-match": { title: "Memory Card Match", description: "Flip cards to find matching pairs!" },
  "spot-the-difference": { title: "Spot the Difference", description: "Look carefully at the items, then spot what changed!" },
  "whats-missing": { title: "What's Missing?", description: "Study the items carefully, then figure out which one disappeared!" },
  "pattern-recognition": { title: "Pattern Recognition", description: "Find the pattern and choose what comes next!" },
  "color-shape-sorting": { title: "Color & Shape Sorting", description: "Sort items into the correct categories!" },
  "sudoku-puzzles": { title: "Sudoku", description: "Fill the grid so every row, column, and 3×3 box contains 1-9!" },
  "sliding-puzzle": { title: "Sliding Puzzle", description: "Slide the tiles into the correct order!" },
  "sequence-memory": { title: "Sequence Memory", description: "Watch the colors light up, then repeat the sequence from memory!" },
  "matching-pairs": { title: "Matching Pairs", description: "Match each item on the left with its partner on the right!" },
  "math-challenge": { title: "Math Challenge", description: "Exercise your mental math skills with fun arithmetic puzzles!" },
  "number-memory": { title: "Number Memory", description: "Flash a number sequence, then recall it from memory!" },
};

export function generateStaticParams() {
  const quizSlugs = getQuizzesByCategory("memory-games").map((q) => ({
    slug: q.id,
  }));
  const gameSlugs = (specialGameSlugs["memory-games"] || []).map((s) => ({
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
  const quiz = getQuizBySlug("memory-games", slug);
  if (quiz) {
    return { title: quiz.title, description: quiz.description };
  }
  const special = specialGames[slug];
  if (special) {
    return { title: special.title, description: special.description };
  }
  return {};
}

export default async function MemoryGamePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Check if it's a regular quiz
  const quiz = getQuizBySlug("memory-games", slug);
  if (quiz) {
    return <QuizEngine quiz={quiz} />;
  }

  // Special game engines
  switch (slug) {
    case "memory-card-match":
      return (
        <MemoryCardEngine
          title={memoryCardData.title}
          levels={memoryCardData.levels}
        />
      );
    case "spot-the-difference":
      return (
        <SpotDifferenceEngine
          title={spotDiffData.title}
          rounds={spotDiffData.rounds}
        />
      );
    case "whats-missing":
      return (
        <WhatsMissingEngine
          title={whatsMissingData.title}
          rounds={whatsMissingData.rounds}
        />
      );
    case "pattern-recognition":
      return (
        <PatternEngine
          title={patternData.title}
          puzzles={patternData.puzzles}
        />
      );
    case "color-shape-sorting":
      return (
        <SortingEngine
          title={sortingData.title}
          rounds={sortingData.rounds}
        />
      );
    case "sudoku-puzzles":
      return (
        <SudokuEngine
          title={sudokuData.title}
          puzzles={sudokuData.puzzles}
        />
      );
    case "sliding-puzzle":
      return (
        <SlidingPuzzleEngine
          title={slidingPuzzleData.title}
          puzzles={slidingPuzzleData.puzzles}
        />
      );
    case "sequence-memory":
      return (
        <SequenceMemoryEngine
          title={sequenceMemoryData.title}
          levels={sequenceMemoryData.levels}
        />
      );
    case "matching-pairs":
      return (
        <MatchingPairsEngine
          title={matchingPairsData.title}
          rounds={matchingPairsData.rounds}
        />
      );
    case "math-challenge":
      return (
        <MathChallengeEngine
          title={mathChallengeData.title}
          levels={mathChallengeData.levels}
        />
      );
    case "number-memory":
      return (
        <NumberMemoryEngine
          title={numberMemoryData.title}
          rounds={numberMemoryData.rounds}
        />
      );
    default:
      notFound();
  }
}
