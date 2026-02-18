import type { Metadata } from "next";
import { notFound } from "next/navigation";
import QuizEngine from "@/components/QuizEngine";
import JsonLd from "@/components/JsonLd";
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
import EstimationEngine from "@/components/EstimationEngine";
import TrueOrFalseEngine from "@/components/TrueOrFalseEngine";
import WhoAmIEngine from "@/components/WhoAmIEngine";
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
import estimationData from "@/data/memory-games/estimation-game.json";
import memoryTrueOrFalseData from "@/data/memory-games/memory-true-or-false.json";
import whatAmIData from "@/data/memory-games/what-am-i.json";

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
  "estimation-game": { title: "Estimation Game", description: "How close can you guess? Test your estimation skills with fun number questions!" },
  "memory-true-or-false": { title: "Memory True or False", description: "Test what you know about the brain, memory, and psychology!" },
  "what-am-i": { title: "What Am I?", description: "Guess the everyday object from progressive clues — fewer clues means more points!" },
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
    return {
      title: quiz.title,
      description: quiz.description,
      alternates: { canonical: `/memory-games/${slug}` },
      openGraph: { title: quiz.title, description: quiz.description },
    };
  }
  const special = specialGames[slug];
  if (special) {
    return {
      title: special.title,
      description: special.description,
      alternates: { canonical: `/memory-games/${slug}` },
      openGraph: { title: special.title, description: special.description },
    };
  }
  return {};
}

function GameStructuredData({ slug, title, description }: { slug: string; title: string; description: string }) {
  const url = `https://seniorbraingames.org/memory-games/${slug}`;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://seniorbraingames.org" },
            { "@type": "ListItem", position: 2, name: "Memory Games", item: "https://seniorbraingames.org/memory-games" },
            { "@type": "ListItem", position: 3, name: title, item: url },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: title,
          description,
          url,
          applicationCategory: "Game",
          genre: "Brain Game",
          audience: { "@type": "PeopleAudience", suggestedMinAge: 50 },
          isAccessibleForFree: true,
          inLanguage: "en",
        }}
      />
    </>
  );
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
    return (
      <>
        <GameStructuredData slug={slug} title={quiz.title} description={quiz.description} />
        <QuizEngine quiz={quiz} />
      </>
    );
  }

  // Special game engines
  const special = specialGames[slug];
  if (!special) notFound();

  const breadcrumb = <GameStructuredData slug={slug} title={special.title} description={special.description} />;

  switch (slug) {
    case "memory-card-match":
      return (<>{breadcrumb}<MemoryCardEngine title={memoryCardData.title} levels={memoryCardData.levels} /></>);
    case "spot-the-difference":
      return (<>{breadcrumb}<SpotDifferenceEngine title={spotDiffData.title} rounds={spotDiffData.rounds} /></>);
    case "whats-missing":
      return (<>{breadcrumb}<WhatsMissingEngine title={whatsMissingData.title} rounds={whatsMissingData.rounds} /></>);
    case "pattern-recognition":
      return (<>{breadcrumb}<PatternEngine title={patternData.title} puzzles={patternData.puzzles} /></>);
    case "color-shape-sorting":
      return (<>{breadcrumb}<SortingEngine title={sortingData.title} rounds={sortingData.rounds} /></>);
    case "sudoku-puzzles":
      return (<>{breadcrumb}<SudokuEngine title={sudokuData.title} puzzles={sudokuData.puzzles} /></>);
    case "sliding-puzzle":
      return (<>{breadcrumb}<SlidingPuzzleEngine title={slidingPuzzleData.title} puzzles={slidingPuzzleData.puzzles} /></>);
    case "sequence-memory":
      return (<>{breadcrumb}<SequenceMemoryEngine title={sequenceMemoryData.title} levels={sequenceMemoryData.levels} /></>);
    case "matching-pairs":
      return (<>{breadcrumb}<MatchingPairsEngine title={matchingPairsData.title} rounds={matchingPairsData.rounds} /></>);
    case "math-challenge":
      return (<>{breadcrumb}<MathChallengeEngine title={mathChallengeData.title} levels={mathChallengeData.levels} /></>);
    case "number-memory":
      return (<>{breadcrumb}<NumberMemoryEngine title={numberMemoryData.title} rounds={numberMemoryData.rounds} /></>);
    case "estimation-game":
      return (<>{breadcrumb}<EstimationEngine title={estimationData.title} questions={estimationData.questions} /></>);
    case "memory-true-or-false":
      return (<>{breadcrumb}<TrueOrFalseEngine title={memoryTrueOrFalseData.title} statements={memoryTrueOrFalseData.statements} /></>);
    case "what-am-i":
      return (<>{breadcrumb}<WhoAmIEngine title={whatAmIData.title} puzzles={whatAmIData.puzzles} /></>);
    default:
      notFound();
  }
}
