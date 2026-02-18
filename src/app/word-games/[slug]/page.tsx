import type { Metadata } from "next";
import { notFound } from "next/navigation";
import QuizEngine from "@/components/QuizEngine";
import WordScrambleEngine from "@/components/WordScrambleEngine";
import ProverbEngine from "@/components/ProverbEngine";
import SpellingBeeEngine from "@/components/SpellingBeeEngine";
import WordAssociationEngine from "@/components/WordAssociationEngine";
import CrosswordEngine from "@/components/CrosswordEngine";
import { getQuizBySlug, getQuizzesByCategory, specialGameSlugs } from "@/lib/quizzes";

import wordScrambleData from "@/data/word-games/word-scramble.json";
import proverbData from "@/data/word-games/complete-the-proverb.json";
import spellingData from "@/data/word-games/spelling-bee.json";
import wordAssocData from "@/data/word-games/word-association.json";
import crosswordData from "@/data/word-games/crossword-classic.json";

const specialGames: Record<string, { title: string; description: string }> = {
  "word-scramble": { title: "Word Scramble", description: "Unscramble the letters to find the hidden word!" },
  "complete-the-proverb": { title: "Complete the Proverb", description: "Can you finish these well-known proverbs and sayings?" },
  "spelling-bee": { title: "Spelling Bee", description: "Test your spelling skills with commonly misspelled words!" },
  "word-association": { title: "Word Association", description: "Find the word that connects the group!" },
  "crossword-classic": { title: "Classic Crossword", description: "Solve classic crossword puzzles — fill the grid using the across and down clues!" },
};

export function generateStaticParams() {
  const quizSlugs = getQuizzesByCategory("word-games").map((q) => ({
    slug: q.id,
  }));
  const gameSlugs = (specialGameSlugs["word-games"] || []).map((s) => ({
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
  const quiz = getQuizBySlug("word-games", slug);
  if (quiz) {
    return { title: quiz.title, description: quiz.description };
  }
  const special = specialGames[slug];
  if (special) {
    return { title: special.title, description: special.description };
  }
  return {};
}

export default async function WordGamePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Check if it's a regular quiz
  const quiz = getQuizBySlug("word-games", slug);
  if (quiz) {
    return <QuizEngine quiz={quiz} />;
  }

  // Special game engines
  switch (slug) {
    case "word-scramble":
      return (
        <WordScrambleEngine
          title={wordScrambleData.title}
          puzzles={wordScrambleData.puzzles}
        />
      );
    case "complete-the-proverb":
      return (
        <ProverbEngine
          title={proverbData.title}
          questions={proverbData.questions}
        />
      );
    case "spelling-bee":
      return (
        <SpellingBeeEngine
          title={spellingData.title}
          words={spellingData.words}
        />
      );
    case "word-association":
      return (
        <WordAssociationEngine
          title={wordAssocData.title}
          puzzles={wordAssocData.puzzles}
        />
      );
    case "crossword-classic":
      return (
        <CrosswordEngine
          title={crosswordData.title}
          puzzles={crosswordData.puzzles as React.ComponentProps<typeof CrosswordEngine>["puzzles"]}
        />
      );
    default:
      notFound();
  }
}
