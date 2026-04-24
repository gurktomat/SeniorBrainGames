import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { GameCategory } from "@/lib/types";
import QuizEngine from "@/components/QuizEngine";
import PrintButton from "@/components/printable/PrintButton";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedGames from "@/components/RelatedGames";
import { getCategoryGameLinks, getQuizBySlug, getQuizzesByCategory, categoryInfo } from "@/lib/quizzes";
import { getGameRating } from "@/lib/db";
import { specialGamesMetadata } from "@/lib/special-games-data";
import { isSpecialPrintable } from "@/lib/printable-shared";
import fs from "fs/promises";
import path from "path";

// Engines
import TimelineSortEngine from "@/components/TimelineSortEngine";
import TrueOrFalseEngine from "@/components/TrueOrFalseEngine";
import SortingEngine from "@/components/SortingEngine";
import WhoAmIEngine from "@/components/WhoAmIEngine";
import HangmanEngine from "@/components/HangmanEngine";
import RiddleEngine from "@/components/RiddleEngine";
import SpellingBeeEngine from "@/components/SpellingBeeEngine";
import ProverbEngine from "@/components/ProverbEngine";
import WordAssociationEngine from "@/components/WordAssociationEngine";
import MatchingPairsEngine from "@/components/MatchingPairsEngine";
import EstimationEngine from "@/components/EstimationEngine";
import MathChallengeEngine from "@/components/MathChallengeEngine";
import PatternEngine from "@/components/PatternEngine";
import SpotDifferenceEngine from "@/components/SpotDifferenceEngine";
import WordScrambleEngine from "@/components/WordScrambleEngine";
import CrosswordEngine from "@/components/CrosswordEngine";
import WordSearchEngine from "@/components/WordSearchEngine";
import WordLadderEngine from "@/components/WordLadderEngine";
import CryptogramEngine from "@/components/CryptogramEngine";
import AnagramEngine from "@/components/AnagramEngine";
import MissingVowelsEngine from "@/components/MissingVowelsEngine";
import EmojiDecoderEngine from "@/components/EmojiDecoderEngine";
import FirstLinesEngine from "@/components/FirstLinesEngine";
import MemoryCardEngine from "@/components/MemoryCardEngine";
import WhatsMissingEngine from "@/components/WhatsMissingEngine";
import SudokuEngine from "@/components/SudokuEngine";
import SlidingPuzzleEngine from "@/components/SlidingPuzzleEngine";
import SequenceMemoryEngine from "@/components/SequenceMemoryEngine";
import NumberMemoryEngine from "@/components/NumberMemoryEngine";
import MinesweeperEngine from "@/components/MinesweeperEngine";
import SolitaireEngine from "@/components/SolitaireEngine";
import MahjongSolitaireEngine from "@/components/MahjongSolitaireEngine";
import BingoEngine from "@/components/BingoEngine";

// Self-contained engines that generate their own state and need no JSON data file.
const DATALESS_SPECIAL_SLUGS = new Set(["minesweeper", "klondike-solitaire", "mahjong-solitaire", "bingo"]);

export const revalidate = 300;
export const dynamicParams = true;

const VALID_CATEGORIES = new Set(["nostalgia-trivia", "general-knowledge", "word-games", "memory-games"]);

export async function generateStaticParams() {
  const params = [];
  const categories = ["nostalgia-trivia", "general-knowledge", "word-games", "memory-games"] as const;
  
  for (const category of categories) {
    // Quizzes
    const quizzes = await getQuizzesByCategory(category);
    const quizSlugs = quizzes
      .filter((q) => q && q.id)
      .map((q) => ({ category, slug: q.id }));
    
    // Special games
    const specialSlugs = Object.keys(specialGamesMetadata[category] ?? {})
      .filter(Boolean)
      .map((s) => ({ category, slug: s }));
      
    params.push(...quizSlugs, ...specialSlugs);
  }
  return params.filter(p => p.category && p.slug);
}

function getCategoryLabel(category: string): string {
  return categoryInfo[category as GameCategory]?.title ?? category;
}

async function getSpecialGameData(category: string, slug: string) {
  if (DATALESS_SPECIAL_SLUGS.has(slug)) return null;
  try {
    const dataPath = path.join(process.cwd(), "src/data", category, `${slug}.json`);
    const content = await fs.readFile(dataPath, "utf-8");
    const data = JSON.parse(content);
    if (!data) return null;
    return data;
  } catch (error) {
    console.error(`Error loading special game data for ${category}/${slug}:`, error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  if (!VALID_CATEGORIES.has(category)) notFound();

  const quiz = await getQuizBySlug(category, slug);
  if (quiz) {
    return {
      title: quiz.title,
      description: quiz.description,
      alternates: { canonical: `/play/${category}/${slug}` },
      openGraph: { title: quiz.title, description: quiz.description },
    };
  }
  const special = specialGamesMetadata[category]?.[slug];
  if (special) {
    return {
      title: special.title,
      description: special.description,
      alternates: { canonical: `/play/${category}/${slug}` },
      openGraph: { title: special.title, description: special.description },
    };
  }
  notFound();
}

function GameStructuredData({ category, slug, title, description, rating }: { category: string; slug: string; title: string; description: string; rating?: { avgRating: number; ratingCount: number } | null }) {
  const url = `https://seniorbraingames.org/play/${category}/${slug}`;
  const label = getCategoryLabel(category);

  const webApp: Record<string, unknown> = {
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
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  if (rating && rating.ratingCount >= 1) {
    webApp.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: rating.avgRating,
      ratingCount: rating.ratingCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://seniorbraingames.org" },
            { "@type": "ListItem", position: 2, name: label, item: `https://seniorbraingames.org/play/${category}` },
            { "@type": "ListItem", position: 3, name: title, item: url },
          ],
        }}
      />
      <JsonLd data={webApp} />
    </>
  );
}

const categorySupportCopy: Record<GameCategory, string> = {
  "nostalgia-trivia":
    "Nostalgia trivia encourages long-term recall by bringing back familiar music, movies, television, and cultural moments.",
  "general-knowledge":
    "General knowledge games mix recall, reasoning, and pattern recognition to keep each round varied and mentally engaging.",
  "word-games":
    "Word games are useful for vocabulary, reading confidence, and language-focused problem-solving at a comfortable pace.",
  "memory-games":
    "Memory games support focus, short-term recall, and pattern recognition with visual and logic-based challenges.",
};

function GameOverview({
  category,
  slug,
  title,
  description,
  isPrintable,
  questionCount,
}: {
  category: GameCategory;
  slug: string;
  title: string;
  description: string;
  isPrintable?: boolean;
  questionCount?: number;
}) {
  const label = getCategoryLabel(category);
  const gameplayCopy =
    typeof questionCount === "number"
      ? `This quiz includes ${questionCount} questions, so it works well as a quick session or as part of a longer brain-training routine.`
      : "You can play at your own pace, replay the challenge, and use it as part of a regular routine for light mental exercise.";

  return (
    <section className="mx-auto max-w-3xl px-6 py-10">
      <div className="rounded-2xl border border-border bg-surface p-8" style={{ boxShadow: "var(--shadow-sm)" }}>
        <h2
          className="mb-4 text-2xl font-bold text-foreground"
          style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
        >
          About {title}
        </h2>
        <p className="text-base leading-relaxed text-text-muted">
          {description} This free {label.toLowerCase()} activity is built for older adults who want clear, readable browser-based games without sign-up friction.
        </p>
        <p className="mt-4 text-base leading-relaxed text-text-muted">
          {categorySupportCopy[category]} {gameplayCopy}
          {isPrintable ? " A printable version is available if you prefer offline play or want to share the game at home, in a classroom, or in a group setting." : ""}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={`/play/${category}`} className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary">
            Explore more {label}
          </Link>
          <Link href="/daily-challenge" className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary">
            Try the Daily Challenge
          </Link>
          {isPrintable && (
            <Link href={`/play/${category}/${slug}/print`} className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary">
              Print this game
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

function PageShell({ 
  category, 
  slug, 
  title, 
  description, 
  games,
  rating, 
  isPrintable,
  questionCount,
  children 
}: { 
  category: GameCategory; 
  slug: string; 
  title: string; 
  description: string; 
  games: { id: string; title: string; description: string }[];
  rating?: { avgRating: number; ratingCount: number } | null; 
  isPrintable?: boolean;
  questionCount?: number;
  children: React.ReactNode 
}) {
  const label = getCategoryLabel(category);

  return (
    <>
      <GameStructuredData category={category} slug={slug} title={title} description={description} rating={rating} />
      <Breadcrumbs items={[{ label, href: `/play/${category}` }, { label: title }]} />
      
      {isPrintable && (
        <div className="mx-auto mt-4 flex max-w-3xl justify-end px-6">
          <PrintButton category={category} slug={slug} />
        </div>
      )}
      
      {children}
      <GameOverview
        category={category}
        slug={slug}
        title={title}
        description={description}
        isPrintable={isPrintable}
        questionCount={questionCount}
      />
      <RelatedGames category={category} categoryLabel={label} currentSlug={slug} games={games} />
    </>
  );
}

// Renders the special game engine for a given slug
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SpecialGameEngine({ slug, data }: { slug: string; data: any }): React.ReactNode {
  if (!data && !DATALESS_SPECIAL_SLUGS.has(slug)) return <div>Game data not available.</div>;

  switch (slug) {
    // --- Nostalgia ---
    case "timeline-sort": 
      if (!data?.rounds) return <div>Data error: rounds missing</div>;
      return <TimelineSortEngine title={data.title} rounds={data.rounds} />;
    case "nostalgia-fact-or-fiction": 
      if (!data?.statements) return <div>Data error: statements missing</div>;
      return <TrueOrFalseEngine title={data.title} statements={data.statements} />;
    case "decade-sorting": 
      if (!data?.rounds) return <div>Data error: rounds missing</div>;
      return <SortingEngine title={data.title} rounds={data.rounds} />;
    case "nostalgia-who-am-i": 
      if (!data?.puzzles) return <div>Data error: puzzles missing</div>;
      return <WhoAmIEngine title={data.title} puzzles={data.puzzles} />;
    case "nostalgia-hangman": 
      if (!data?.words) return <div>Data error: words missing</div>;
      return <HangmanEngine title={data.title} words={data.words} />;
    case "nostalgia-riddles": 
      if (!data?.riddles) return <div>Data error: riddles missing</div>;
      return <RiddleEngine title={data.title} riddles={data.riddles} />;
    case "vintage-spelling-bee": 
      if (!data?.words) return <div>Data error: words missing</div>;
      return <SpellingBeeEngine title={data.title} words={data.words} />;
    case "old-time-sayings": 
      if (!data?.questions) return <div>Data error: questions missing</div>;
      return <ProverbEngine title={data.title} questions={data.questions} />;
    case "retro-word-association": 
      if (!data?.puzzles) return <div>Data error: puzzles missing</div>;
      return <WordAssociationEngine title={data.title} puzzles={data.puzzles} />;
    case "nostalgia-matching": 
      if (!data?.rounds) return <div>Data error: rounds missing</div>;
      return <MatchingPairsEngine title={data.title} rounds={data.rounds} />;
    case "nostalgia-estimation": 
      if (!data?.questions) return <div>Data error: questions missing</div>;
      return <EstimationEngine title={data.title} questions={data.questions} />;
    case "classic-hollywood-leading-ladies":
      if (!data?.puzzles) return <div>Data error: puzzles missing</div>;
      return <WhoAmIEngine title={data.title} puzzles={data.puzzles} />;
    case "greatest-crooners":
      if (!data?.puzzles) return <div>Data error: puzzles missing</div>;
      return <WhoAmIEngine title={data.title} puzzles={data.puzzles} />;

    // --- General Knowledge ---
    case "true-or-false": 
      if (!data?.statements) return <div>Data error: statements missing</div>;
      return <TrueOrFalseEngine title={data.title} statements={data.statements} />;
    case "who-am-i": 
      if (!data?.puzzles) return <div>Data error: puzzles missing</div>;
      return <WhoAmIEngine title={data.title} puzzles={data.puzzles} />;
    case "science-sorting": 
      if (!data?.rounds) return <div>Data error: rounds missing</div>;
      return <SortingEngine title={data.title} rounds={data.rounds} />;
    case "history-timeline": 
      if (!data?.rounds) return <div>Data error: rounds missing</div>;
      return <TimelineSortEngine title={data.title} rounds={data.rounds} />;
    case "science-true-or-false": 
      if (!data?.statements) return <div>Data error: statements missing</div>;
      return <TrueOrFalseEngine title={data.title} statements={data.statements} />;
    case "what-in-the-world": 
      if (!data?.puzzles) return <div>Data error: puzzles missing</div>;
      return <WhoAmIEngine title={data.title} puzzles={data.puzzles} />;
    case "inventions-timeline": 
      if (!data?.rounds) return <div>Data error: rounds missing</div>;
      return <TimelineSortEngine title={data.title} rounds={data.rounds} />;
    case "animal-kingdom-sorting": 
      if (!data?.rounds) return <div>Data error: rounds missing</div>;
      return <SortingEngine title={data.title} rounds={data.rounds} />;
    case "mental-math": 
      if (!data?.levels) return <div>Data error: levels missing</div>;
      return <MathChallengeEngine title={data.title} levels={data.levels} />;
    case "logic-patterns": 
      if (!data?.puzzles) return <div>Data error: puzzles missing</div>;
      return <PatternEngine title={data.title} puzzles={data.puzzles} />;
    case "observation-challenge": 
      if (!data?.rounds) return <div>Data error: rounds missing</div>;
      return <SpotDifferenceEngine title={data.title} rounds={data.rounds} />;
    case "geography-sorting": 
      if (!data?.rounds) return <div>Data error: rounds missing</div>;
      return <SortingEngine title={data.title} rounds={data.rounds} />;
    case "wonders-of-the-world":
      if (!data?.puzzles) return <div>Data error: puzzles missing</div>;
      return <WhoAmIEngine title={data.title} puzzles={data.puzzles} />;

    // --- Word Games ---
    case "word-scramble": 
      if (!data?.puzzles) return <div>Data error: puzzles missing</div>;
      return <WordScrambleEngine title={data.title} puzzles={data.puzzles} />;
    case "complete-the-proverb": 
      if (!data?.questions) return <div>Data error: questions missing</div>;
      return <ProverbEngine title={data.title} questions={data.questions} />;
    case "spelling-bee": 
      if (!data?.words) return <div>Data error: words missing</div>;
      return <SpellingBeeEngine title={data.title} words={data.words} />;
    case "word-association": 
      if (!data?.puzzles) return <div>Data error: puzzles missing</div>;
      return <WordAssociationEngine title={data.title} puzzles={data.puzzles} />;
    case "crossword-classic": 
      if (!data?.puzzles) return <div>Data error: puzzles missing</div>;
      return <CrosswordEngine title={data.title} puzzles={data.puzzles} />;
    case "word-search": 
      if (!data?.puzzles) return <div>Data error: puzzles missing</div>;
      return <WordSearchEngine title={data.title} puzzles={data.puzzles} />;
    case "hangman": 
      if (!data?.words) return <div>Data error: words missing</div>;
      return <HangmanEngine title={data.title} words={data.words} />;
    case "word-ladder": 
      if (!data?.puzzles) return <div>Data error: puzzles missing</div>;
      return <WordLadderEngine title={data.title} puzzles={data.puzzles} />;
    case "cryptogram": 
      if (!data?.puzzles) return <div>Data error: puzzles missing</div>;
      return <CryptogramEngine title={data.title} puzzles={data.puzzles} />;
    case "anagram-challenge": 
      if (!data?.rounds) return <div>Data error: rounds missing</div>;
      return <AnagramEngine title={data.title} rounds={data.rounds} />;
    case "missing-vowels": 
      if (!data?.rounds) return <div>Data error: rounds missing</div>;
      return <MissingVowelsEngine title={data.title} rounds={data.rounds} />;
    case "emoji-decoder": 
      if (!data?.rounds) return <div>Data error: rounds missing</div>;
      return <EmojiDecoderEngine title={data.title} rounds={data.rounds} />;
    case "riddle-challenge": 
      if (!data?.riddles) return <div>Data error: riddles missing</div>;
      return <RiddleEngine title={data.title} riddles={data.riddles} />;
    case "famous-first-lines": 
      if (!data?.lines) return <div>Data error: lines missing</div>;
      return <FirstLinesEngine title={data.title} lines={data.lines} />;
    case "grammar-true-or-false": 
      if (!data?.statements) return <div>Data error: statements missing</div>;
      return <TrueOrFalseEngine title={data.title} statements={data.statements} />;
    case "crossword-nature-science": 
      if (!data?.puzzles) return <div>Data error: puzzles missing</div>;
      return <CrosswordEngine title={data.title} puzzles={data.puzzles} />;
    case "word-search-animals": 
      if (!data?.puzzles) return <div>Data error: puzzles missing</div>;
      return <WordSearchEngine title={data.title} puzzles={data.puzzles} />;
    case "food-word-scramble": 
      if (!data?.puzzles) return <div>Data error: puzzles missing</div>;
      return <WordScrambleEngine title={data.title} puzzles={data.puzzles} />;
    case "cryptogram-poetry": 
      if (!data?.puzzles) return <div>Data error: puzzles missing</div>;
      return <CryptogramEngine title={data.title} puzzles={data.puzzles} />;
    case "word-ladder-challenge": 
      if (!data?.puzzles) return <div>Data error: puzzles missing</div>;
      return <WordLadderEngine title={data.title} puzzles={data.puzzles} />;
    case "history-spelling-bee": 
      if (!data?.words) return <div>Data error: words missing</div>;
      return <SpellingBeeEngine title={data.title} words={data.words} />;
    case "word-search-travel": 
      if (!data?.puzzles) return <div>Data error: puzzles missing</div>;
      return <WordSearchEngine title={data.title} puzzles={data.puzzles} />;

    // --- Memory Games ---
    case "memory-card-match": 
      if (!data?.levels) return <div>Data error: levels missing</div>;
      return <MemoryCardEngine title={data.title} levels={data.levels} />;
    case "spot-the-difference": 
      if (!data?.rounds) return <div>Data error: rounds missing</div>;
      return <SpotDifferenceEngine title={data.title} rounds={data.rounds} />;
    case "whats-missing": 
      if (!data?.rounds) return <div>Data error: rounds missing</div>;
      return <WhatsMissingEngine title={data.title} rounds={data.rounds} />;
    case "pattern-recognition": 
      if (!data?.puzzles) return <div>Data error: puzzles missing</div>;
      return <PatternEngine title={data.title} puzzles={data.puzzles} />;
    case "color-shape-sorting": 
      if (!data?.rounds) return <div>Data error: rounds missing</div>;
      return <SortingEngine title={data.title} rounds={data.rounds} />;
    case "sudoku-puzzles": 
      if (!data?.puzzles) return <div>Data error: puzzles missing</div>;
      return <SudokuEngine title={data.title} puzzles={data.puzzles} />;
    case "sliding-puzzle": 
      if (!data?.puzzles) return <div>Data error: puzzles missing</div>;
      return <SlidingPuzzleEngine title={data.title} puzzles={data.puzzles} />;
    case "sequence-memory": 
      if (!data?.levels) return <div>Data error: levels missing</div>;
      return <SequenceMemoryEngine title={data.title} levels={data.levels} />;
    case "matching-pairs": 
      if (!data?.rounds) return <div>Data error: rounds missing</div>;
      return <MatchingPairsEngine title={data.title} rounds={data.rounds} />;
    case "math-challenge": 
      if (!data?.levels) return <div>Data error: levels missing</div>;
      return <MathChallengeEngine title={data.title} levels={data.levels} />;
    case "number-memory": 
      if (!data?.rounds) return <div>Data error: rounds missing</div>;
      return <NumberMemoryEngine title={data.title} rounds={data.rounds} />;
    case "estimation-game": 
      if (!data?.questions) return <div>Data error: questions missing</div>;
      return <EstimationEngine title={data.title} questions={data.questions} />;
    case "memory-true-or-false": 
      if (!data?.statements) return <div>Data error: statements missing</div>;
      return <TrueOrFalseEngine title={data.title} statements={data.statements} />;
    case "what-am-i": 
      if (!data?.puzzles) return <div>Data error: puzzles missing</div>;
      return <WhoAmIEngine title={data.title} puzzles={data.puzzles} />;
    case "minesweeper": return <MinesweeperEngine title="Minesweeper" />;
    case "klondike-solitaire": return <SolitaireEngine title="Solitaire" />;
    case "mahjong-solitaire": return <MahjongSolitaireEngine title="Mahjong Solitaire" />;
    case "bingo": return <BingoEngine title="Bingo" />;
    case "nature-card-match": 
      if (!data?.levels) return <div>Data error: levels missing</div>;
      return <MemoryCardEngine title={data.title} levels={data.levels} />;
    case "color-sequence-challenge": 
      if (!data?.levels) return <div>Data error: levels missing</div>;
      return <SequenceMemoryEngine title={data.title} levels={data.levels} />;
    case "number-recall-challenge": 
      if (!data?.rounds) return <div>Data error: rounds missing</div>;
      return <NumberMemoryEngine title={data.title} rounds={data.rounds} />;
    case "whats-changed": 
      if (!data?.rounds) return <div>Data error: rounds missing</div>;
      return <WhatsMissingEngine title={data.title} rounds={data.rounds} />;
    case "sudoku-challenge": 
      if (!data?.puzzles) return <div>Data error: puzzles missing</div>;
      return <SudokuEngine title={data.title} puzzles={data.puzzles} />;
    case "sliding-puzzle-challenge": 
      if (!data?.puzzles) return <div>Data error: puzzles missing</div>;
      return <SlidingPuzzleEngine title={data.title} puzzles={data.puzzles} />;
    case "famous-pairs-matching": 
      if (!data?.rounds) return <div>Data error: rounds missing</div>;
      return <MatchingPairsEngine title={data.title} rounds={data.rounds} />;
    default: return null;
  }
}

export default async function GamePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  if (!VALID_CATEGORIES.has(category)) notFound();
  const typedCategory = category as GameCategory;

  const rating = await getGameRating(slug);
  const games = await getCategoryGameLinks(typedCategory);

  // Regular quiz
  const quiz = await getQuizBySlug(category, slug);
  if (quiz && quiz.questions) {
    return (
      <PageShell 
        category={typedCategory} 
        slug={slug} 
        title={quiz.title} 
        description={quiz.description} 
        games={games}
        rating={rating}
        isPrintable={true}
        questionCount={quiz.questions.length}
      >
        <QuizEngine quiz={quiz} />
      </PageShell>
    );
  }

  // Special game
  const special = specialGamesMetadata[category]?.[slug];
  if (!special) notFound();

  const isPrintable = isSpecialPrintable(category, slug);

  const data = await getSpecialGameData(category, slug);
  if (!data && !DATALESS_SPECIAL_SLUGS.has(slug)) {
    return (
      <PageShell 
        category={typedCategory} 
        slug={slug} 
        title={special.title} 
        description={special.description} 
        games={games}
        rating={rating}
        isPrintable={isPrintable}
      >
        <div className="mx-auto w-full max-w-2xl px-6 py-8 text-center">
          <div className="rounded-2xl border border-border bg-surface p-8">
            <h2 className="text-xl font-bold text-foreground">Game data not available</h2>
            <p className="mt-2 text-text-muted">Please try again later.</p>
          </div>
        </div>
      </PageShell>
    );
  }
  const engine = SpecialGameEngine({ slug, data });
  if (!engine) notFound();

  return (
    <PageShell 
      category={typedCategory} 
      slug={slug} 
      title={special.title} 
      description={special.description} 
      games={games}
      rating={rating}
      isPrintable={isPrintable}
    >
      {engine}
    </PageShell>
  );
}
