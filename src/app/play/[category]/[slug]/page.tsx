import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { GameCategory } from "@/lib/types";
import QuizEngine from "@/components/QuizEngine";
import PrintButton from "@/components/printable/PrintButton";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedGames from "@/components/RelatedGames";
import { getQuizzesByCategory, getQuizBySlug, categoryInfo } from "@/lib/quizzes";
import { getGameRating } from "@/lib/db";

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

// --- Nostalgia data ---
import timelineSortData from "@/data/nostalgia-trivia/timeline-sort.json";
import nostalgiaFactOrFictionData from "@/data/nostalgia-trivia/nostalgia-fact-or-fiction.json";
import decadeSortingData from "@/data/nostalgia-trivia/decade-sorting.json";
import nostalgiaWhoAmIData from "@/data/nostalgia-trivia/nostalgia-who-am-i.json";
import nostalgiaHangmanData from "@/data/nostalgia-trivia/nostalgia-hangman.json";
import nostalgiaRiddlesData from "@/data/nostalgia-trivia/nostalgia-riddles.json";
import vintageSpellingData from "@/data/nostalgia-trivia/vintage-spelling-bee.json";
import oldTimeSayingsData from "@/data/nostalgia-trivia/old-time-sayings.json";
import retroWordAssocData from "@/data/nostalgia-trivia/retro-word-association.json";
import nostalgiaMatchingData from "@/data/nostalgia-trivia/nostalgia-matching.json";
import nostalgiaEstimationData from "@/data/nostalgia-trivia/nostalgia-estimation.json";

// --- General knowledge data ---
import trueOrFalseData from "@/data/general-knowledge/true-or-false.json";
import whoAmIData from "@/data/general-knowledge/who-am-i.json";
import scienceSortingData from "@/data/general-knowledge/science-sorting.json";
import historyTimelineData from "@/data/general-knowledge/history-timeline.json";
import scienceTrueOrFalseData from "@/data/general-knowledge/science-true-or-false.json";
import whatInTheWorldData from "@/data/general-knowledge/what-in-the-world.json";
import inventionsTimelineData from "@/data/general-knowledge/inventions-timeline.json";
import animalKingdomSortingData from "@/data/general-knowledge/animal-kingdom-sorting.json";
import mentalMathData from "@/data/general-knowledge/mental-math.json";
import logicPatternsData from "@/data/general-knowledge/logic-patterns.json";
import observationChallengeData from "@/data/general-knowledge/observation-challenge.json";
import geographySortingData from "@/data/general-knowledge/geography-sorting.json";

// --- Word games data ---
import wordScrambleData from "@/data/word-games/word-scramble.json";
import proverbData from "@/data/word-games/complete-the-proverb.json";
import spellingData from "@/data/word-games/spelling-bee.json";
import wordAssocData from "@/data/word-games/word-association.json";
import crosswordData from "@/data/word-games/crossword-classic.json";
import wordSearchData from "@/data/word-games/word-search.json";
import hangmanData from "@/data/word-games/hangman.json";
import wordLadderData from "@/data/word-games/word-ladder.json";
import cryptogramData from "@/data/word-games/cryptogram.json";
import anagramData from "@/data/word-games/anagram-challenge.json";
import missingVowelsData from "@/data/word-games/missing-vowels.json";
import emojiDecoderData from "@/data/word-games/emoji-decoder.json";
import riddleData from "@/data/word-games/riddle-challenge.json";
import firstLinesData from "@/data/word-games/famous-first-lines.json";
import grammarTFData from "@/data/word-games/grammar-true-or-false.json";
import crosswordNatureScienceData from "@/data/word-games/crossword-nature-science.json";
import wordSearchAnimalsData from "@/data/word-games/word-search-animals.json";
import foodWordScrambleData from "@/data/word-games/food-word-scramble.json";
import cryptogramPoetryData from "@/data/word-games/cryptogram-poetry.json";
import wordLadderChallengeData from "@/data/word-games/word-ladder-challenge.json";
import historySpellingBeeData from "@/data/word-games/history-spelling-bee.json";
import wordSearchTravelData from "@/data/word-games/word-search-travel.json";

// --- Memory games data ---
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
import natureCardMatchData from "@/data/memory-games/nature-card-match.json";
import colorSequenceChallengeData from "@/data/memory-games/color-sequence-challenge.json";
import numberRecallChallengeData from "@/data/memory-games/number-recall-challenge.json";
import whatsChangedData from "@/data/memory-games/whats-changed.json";
import sudokuChallengeData from "@/data/memory-games/sudoku-challenge.json";
import slidingPuzzleChallengeData from "@/data/memory-games/sliding-puzzle-challenge.json";
import famousPairsMatchingData from "@/data/memory-games/famous-pairs-matching.json";

export const revalidate = 300;
export const dynamicParams = true;

const VALID_CATEGORIES = new Set(["nostalgia-trivia", "general-knowledge", "word-games", "memory-games"]);

// Special games metadata per category
const specialGames: Record<string, Record<string, { title: string; description: string }>> = {
  "nostalgia-trivia": {
    "timeline-sort": { title: "Timeline Sort", description: "Put historical events in the correct chronological order!" },
    "nostalgia-fact-or-fiction": { title: "Nostalgia Fact or Fiction", description: "Can you tell which nostalgic facts from the 1950s–1980s are true and which are made up?" },
    "decade-sorting": { title: "Decade Sorting", description: "Sort pop culture items into their correct decade!" },
    "nostalgia-who-am-i": { title: "Nostalgia Who Am I?", description: "Guess the pop culture icon from progressive clues!" },
    "nostalgia-hangman": { title: "Nostalgia Hangman", description: "Guess classic TV shows, movies, and songs one letter at a time!" },
    "nostalgia-riddles": { title: "Nostalgia Riddles", description: "Can you solve these riddles about retro items and events?" },
    "vintage-spelling-bee": { title: "Vintage Spelling Bee", description: "Spell these vintage and retro words correctly!" },
    "old-time-sayings": { title: "Old-Time Sayings", description: "Complete these classic old-time proverbs and sayings!" },
    "retro-word-association": { title: "Retro Word Association", description: "Find the word that connects the retro-themed group!" },
    "nostalgia-matching": { title: "Nostalgia Matching", description: "Match classic actors to their shows, songs to their artists, and more!" },
    "nostalgia-estimation": { title: "Nostalgia Estimation", description: "How close can you guess? Test your knowledge of nostalgia facts and figures!" },
  },
  "general-knowledge": {
    "true-or-false": { title: "True or False", description: "Test your knowledge — is this statement true or false?" },
    "who-am-i": { title: "Who Am I?", description: "Guess the famous person from progressive clues — fewer clues means more points!" },
    "science-sorting": { title: "Science Sorting", description: "Sort items into the correct science categories!" },
    "history-timeline": { title: "History Timeline", description: "Put world history events in the correct chronological order!" },
    "science-true-or-false": { title: "Science True or False", description: "Is this science fact true or false? Test your scientific knowledge!" },
    "what-in-the-world": { title: "What in the World?", description: "Guess the famous landmark or place from progressive clues!" },
    "inventions-timeline": { title: "Inventions Timeline", description: "Put great inventions in the correct chronological order!" },
    "animal-kingdom-sorting": { title: "Animal Kingdom Sorting", description: "Sort animals into the correct categories!" },
    "mental-math": { title: "Mental Math", description: "Challenge your mental arithmetic skills!" },
    "logic-patterns": { title: "Logic Patterns", description: "Find the pattern and choose what comes next in the sequence!" },
    "observation-challenge": { title: "Observation Challenge", description: "Study the items carefully, then spot what changed!" },
    "geography-sorting": { title: "Geography Sorting", description: "Sort countries, cities, and landmarks into their correct continents and regions!" },
  },
  "word-games": {
    "word-scramble": { title: "Word Scramble", description: "Unscramble the letters to find the hidden word!" },
    "complete-the-proverb": { title: "Complete the Proverb", description: "Can you finish these well-known proverbs and sayings?" },
    "spelling-bee": { title: "Spelling Bee", description: "Test your spelling skills with commonly misspelled words!" },
    "word-association": { title: "Word Association", description: "Find the word that connects the group!" },
    "crossword-classic": { title: "Classic Crossword", description: "Solve classic crossword puzzles — fill the grid using the across and down clues!" },
    "word-search": { title: "Word Search", description: "Find all the hidden words in the grid — look across and down!" },
    "hangman": { title: "Hangman", description: "Guess the word one letter at a time before you run out of lives!" },
    "word-ladder": { title: "Word Ladder", description: "Change one letter at a time to transform the start word into the end word!" },
    "cryptogram": { title: "Cryptogram", description: "Decode the secret message by figuring out the letter substitutions!" },
    "anagram-challenge": { title: "Anagram Challenge", description: "Unscramble themed anagram puzzles — each round has a different theme!" },
    "missing-vowels": { title: "Missing Vowels", description: "The vowels have been removed — can you figure out the original phrase?" },
    "emoji-decoder": { title: "Emoji Decoder", description: "Decode emoji sequences into movies, songs, and phrases!" },
    "riddle-challenge": { title: "Riddle Challenge", description: "Can you solve these classic riddles? Type your answer and see if you're right!" },
    "famous-first-lines": { title: "Famous First Lines", description: "Guess the book from its famous opening line!" },
    "grammar-true-or-false": { title: "Grammar True or False", description: "Is this sentence grammatically correct? Test your grammar knowledge!" },
    "crossword-nature-science": { title: "Nature & Science Crossword", description: "Solve crossword puzzles themed around nature and science!" },
    "word-search-animals": { title: "Animal Word Search", description: "Find animal names hidden in the grid!" },
    "food-word-scramble": { title: "Food Word Scramble", description: "Unscramble the letters to find the food or cooking word!" },
    "cryptogram-poetry": { title: "Poetry Cryptogram", description: "Decode famous poetry lines by figuring out the letter substitutions!" },
    "word-ladder-challenge": { title: "Word Ladder Challenge", description: "Change one letter at a time to climb from the start word to the end word!" },
    "history-spelling-bee": { title: "History Spelling Bee", description: "Spell historical terms, famous names, and landmark words correctly!" },
    "word-search-travel": { title: "Travel Word Search", description: "Find travel and geography words hidden in the grid!" },
  },
  "memory-games": {
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
    "minesweeper": { title: "Minesweeper", description: "Classic mine-clearing puzzle — reveal all safe cells without hitting a mine!" },
    "nature-card-match": { title: "Nature Card Match", description: "Match nature-themed cards by flipping pairs!" },
    "color-sequence-challenge": { title: "Color Sequence Challenge", description: "Watch the colors flash, then repeat the sequence from memory!" },
    "number-recall-challenge": { title: "Number Recall Challenge", description: "Flash a number sequence, then recall it from memory!" },
    "whats-changed": { title: "What's Changed?", description: "Study the items carefully, then figure out which one disappeared!" },
    "sudoku-challenge": { title: "Sudoku Challenge", description: "Fill the grid so every row, column, and 3×3 box contains 1-9!" },
    "sliding-puzzle-challenge": { title: "Sliding Puzzle Challenge", description: "Slide the numbered tiles into the correct order!" },
    "famous-pairs-matching": { title: "Famous Pairs Matching", description: "Match famous duos, partners, and sidekicks from TV, music, and history!" },
  },
};

// Printable slugs per category
const printableSlugs: Record<string, Set<string>> = {
  "nostalgia-trivia": new Set([
    ...getQuizzesByCategory("nostalgia-trivia").map((q) => q.id),
    "nostalgia-riddles", "nostalgia-fact-or-fiction",
  ]),
  "general-knowledge": new Set([
    ...getQuizzesByCategory("general-knowledge").map((q) => q.id),
    "true-or-false", "science-true-or-false",
  ]),
  "word-games": new Set([
    ...getQuizzesByCategory("word-games").map((q) => q.id),
    "word-scramble", "food-word-scramble",
    "crossword-classic", "crossword-nature-science",
    "word-search", "word-search-animals",
    "word-ladder", "word-ladder-challenge",
    "cryptogram", "cryptogram-poetry",
    "riddle-challenge", "grammar-true-or-false",
  ]),
  "memory-games": new Set([
    ...getQuizzesByCategory("memory-games").map((q) => q.id),
    "sudoku-puzzles", "sudoku-challenge", "memory-true-or-false",
  ]),
};

function getCategoryLabel(category: string): string {
  return categoryInfo[category as GameCategory]?.title ?? category;
}

function getAllCategoryGames(category: string) {
  const catSpecial = specialGames[category] ?? {};
  return [
    ...Object.entries(catSpecial).map(([id, g]) => ({ id, title: g.title })),
    ...getQuizzesByCategory(category as GameCategory).map((q) => ({ id: q.id, title: q.title })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  if (!VALID_CATEGORIES.has(category)) notFound();

  const quiz = getQuizBySlug(category, slug);
  if (quiz) {
    return {
      title: quiz.title,
      description: quiz.description,
      alternates: { canonical: `/play/${category}/${slug}` },
      openGraph: { title: quiz.title, description: quiz.description },
    };
  }
  const special = specialGames[category]?.[slug];
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

function PageShell({ category, slug, title, description, rating, children }: { category: string; slug: string; title: string; description: string; rating?: { avgRating: number; ratingCount: number } | null; children: React.ReactNode }) {
  const label = getCategoryLabel(category);
  const isPrintable = printableSlugs[category]?.has(slug) ?? false;
  const allGames = getAllCategoryGames(category);

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
      <RelatedGames category={category} categoryLabel={label} currentSlug={slug} games={allGames} />
    </>
  );
}

// Renders the special game engine for a given slug
function SpecialGameEngine({ slug }: { slug: string }): React.ReactNode {
  switch (slug) {
    // --- Nostalgia ---
    case "timeline-sort": return <TimelineSortEngine title={timelineSortData.title} rounds={timelineSortData.rounds} />;
    case "nostalgia-fact-or-fiction": return <TrueOrFalseEngine title={nostalgiaFactOrFictionData.title} statements={nostalgiaFactOrFictionData.statements} />;
    case "decade-sorting": return <SortingEngine title={decadeSortingData.title} rounds={decadeSortingData.rounds} />;
    case "nostalgia-who-am-i": return <WhoAmIEngine title={nostalgiaWhoAmIData.title} puzzles={nostalgiaWhoAmIData.puzzles} />;
    case "nostalgia-hangman": return <HangmanEngine title={nostalgiaHangmanData.title} words={nostalgiaHangmanData.words} />;
    case "nostalgia-riddles": return <RiddleEngine title={nostalgiaRiddlesData.title} riddles={nostalgiaRiddlesData.riddles} />;
    case "vintage-spelling-bee": return <SpellingBeeEngine title={vintageSpellingData.title} words={vintageSpellingData.words} />;
    case "old-time-sayings": return <ProverbEngine title={oldTimeSayingsData.title} questions={oldTimeSayingsData.questions} />;
    case "retro-word-association": return <WordAssociationEngine title={retroWordAssocData.title} puzzles={retroWordAssocData.puzzles} />;
    case "nostalgia-matching": return <MatchingPairsEngine title={nostalgiaMatchingData.title} rounds={nostalgiaMatchingData.rounds} />;
    case "nostalgia-estimation": return <EstimationEngine title={nostalgiaEstimationData.title} questions={nostalgiaEstimationData.questions} />;
    // --- General Knowledge ---
    case "true-or-false": return <TrueOrFalseEngine title={trueOrFalseData.title} statements={trueOrFalseData.statements} />;
    case "who-am-i": return <WhoAmIEngine title={whoAmIData.title} puzzles={whoAmIData.puzzles} />;
    case "science-sorting": return <SortingEngine title={scienceSortingData.title} rounds={scienceSortingData.rounds} />;
    case "history-timeline": return <TimelineSortEngine title={historyTimelineData.title} rounds={historyTimelineData.rounds} />;
    case "science-true-or-false": return <TrueOrFalseEngine title={scienceTrueOrFalseData.title} statements={scienceTrueOrFalseData.statements} />;
    case "what-in-the-world": return <WhoAmIEngine title={whatInTheWorldData.title} puzzles={whatInTheWorldData.puzzles} />;
    case "inventions-timeline": return <TimelineSortEngine title={inventionsTimelineData.title} rounds={inventionsTimelineData.rounds} />;
    case "animal-kingdom-sorting": return <SortingEngine title={animalKingdomSortingData.title} rounds={animalKingdomSortingData.rounds} />;
    case "mental-math": return <MathChallengeEngine title={mentalMathData.title} levels={mentalMathData.levels} />;
    case "logic-patterns": return <PatternEngine title={logicPatternsData.title} puzzles={logicPatternsData.puzzles} />;
    case "observation-challenge": return <SpotDifferenceEngine title={observationChallengeData.title} rounds={observationChallengeData.rounds} />;
    case "geography-sorting": return <SortingEngine title={geographySortingData.title} rounds={geographySortingData.rounds} />;
    // --- Word Games ---
    case "word-scramble": return <WordScrambleEngine title={wordScrambleData.title} puzzles={wordScrambleData.puzzles} />;
    case "complete-the-proverb": return <ProverbEngine title={proverbData.title} questions={proverbData.questions} />;
    case "spelling-bee": return <SpellingBeeEngine title={spellingData.title} words={spellingData.words} />;
    case "word-association": return <WordAssociationEngine title={wordAssocData.title} puzzles={wordAssocData.puzzles} />;
    case "crossword-classic": return <CrosswordEngine title={crosswordData.title} puzzles={crosswordData.puzzles as React.ComponentProps<typeof CrosswordEngine>["puzzles"]} />;
    case "word-search": return <WordSearchEngine title={wordSearchData.title} puzzles={wordSearchData.puzzles} />;
    case "hangman": return <HangmanEngine title={hangmanData.title} words={hangmanData.words} />;
    case "word-ladder": return <WordLadderEngine title={wordLadderData.title} puzzles={wordLadderData.puzzles} />;
    case "cryptogram": return <CryptogramEngine title={cryptogramData.title} puzzles={cryptogramData.puzzles} />;
    case "anagram-challenge": return <AnagramEngine title={anagramData.title} rounds={anagramData.rounds} />;
    case "missing-vowels": return <MissingVowelsEngine title={missingVowelsData.title} rounds={missingVowelsData.rounds} />;
    case "emoji-decoder": return <EmojiDecoderEngine title={emojiDecoderData.title} rounds={emojiDecoderData.rounds} />;
    case "riddle-challenge": return <RiddleEngine title={riddleData.title} riddles={riddleData.riddles} />;
    case "famous-first-lines": return <FirstLinesEngine title={firstLinesData.title} lines={firstLinesData.lines} />;
    case "grammar-true-or-false": return <TrueOrFalseEngine title={grammarTFData.title} statements={grammarTFData.statements} />;
    case "crossword-nature-science": return <CrosswordEngine title={crosswordNatureScienceData.title} puzzles={crosswordNatureScienceData.puzzles as React.ComponentProps<typeof CrosswordEngine>["puzzles"]} />;
    case "word-search-animals": return <WordSearchEngine title={wordSearchAnimalsData.title} puzzles={wordSearchAnimalsData.puzzles} />;
    case "food-word-scramble": return <WordScrambleEngine title={foodWordScrambleData.title} puzzles={foodWordScrambleData.puzzles} />;
    case "cryptogram-poetry": return <CryptogramEngine title={cryptogramPoetryData.title} puzzles={cryptogramPoetryData.puzzles} />;
    case "word-ladder-challenge": return <WordLadderEngine title={wordLadderChallengeData.title} puzzles={wordLadderChallengeData.puzzles} />;
    case "history-spelling-bee": return <SpellingBeeEngine title={historySpellingBeeData.title} words={historySpellingBeeData.words} />;
    case "word-search-travel": return <WordSearchEngine title={wordSearchTravelData.title} puzzles={wordSearchTravelData.puzzles} />;
    // --- Memory Games ---
    case "memory-card-match": return <MemoryCardEngine title={memoryCardData.title} levels={memoryCardData.levels} />;
    case "spot-the-difference": return <SpotDifferenceEngine title={spotDiffData.title} rounds={spotDiffData.rounds} />;
    case "whats-missing": return <WhatsMissingEngine title={whatsMissingData.title} rounds={whatsMissingData.rounds} />;
    case "pattern-recognition": return <PatternEngine title={patternData.title} puzzles={patternData.puzzles} />;
    case "color-shape-sorting": return <SortingEngine title={sortingData.title} rounds={sortingData.rounds} />;
    case "sudoku-puzzles": return <SudokuEngine title={sudokuData.title} puzzles={sudokuData.puzzles} />;
    case "sliding-puzzle": return <SlidingPuzzleEngine title={slidingPuzzleData.title} puzzles={slidingPuzzleData.puzzles} />;
    case "sequence-memory": return <SequenceMemoryEngine title={sequenceMemoryData.title} levels={sequenceMemoryData.levels} />;
    case "matching-pairs": return <MatchingPairsEngine title={matchingPairsData.title} rounds={matchingPairsData.rounds} />;
    case "math-challenge": return <MathChallengeEngine title={mathChallengeData.title} levels={mathChallengeData.levels} />;
    case "number-memory": return <NumberMemoryEngine title={numberMemoryData.title} rounds={numberMemoryData.rounds} />;
    case "estimation-game": return <EstimationEngine title={estimationData.title} questions={estimationData.questions} />;
    case "memory-true-or-false": return <TrueOrFalseEngine title={memoryTrueOrFalseData.title} statements={memoryTrueOrFalseData.statements} />;
    case "what-am-i": return <WhoAmIEngine title={whatAmIData.title} puzzles={whatAmIData.puzzles} />;
    case "minesweeper": return <MinesweeperEngine title="Minesweeper" />;
    case "nature-card-match": return <MemoryCardEngine title={natureCardMatchData.title} levels={natureCardMatchData.levels} />;
    case "color-sequence-challenge": return <SequenceMemoryEngine title={colorSequenceChallengeData.title} levels={colorSequenceChallengeData.levels} />;
    case "number-recall-challenge": return <NumberMemoryEngine title={numberRecallChallengeData.title} rounds={numberRecallChallengeData.rounds} />;
    case "whats-changed": return <WhatsMissingEngine title={whatsChangedData.title} rounds={whatsChangedData.rounds} />;
    case "sudoku-challenge": return <SudokuEngine title={sudokuChallengeData.title} puzzles={sudokuChallengeData.puzzles} />;
    case "sliding-puzzle-challenge": return <SlidingPuzzleEngine title={slidingPuzzleChallengeData.title} puzzles={slidingPuzzleChallengeData.puzzles} />;
    case "famous-pairs-matching": return <MatchingPairsEngine title={famousPairsMatchingData.title} rounds={famousPairsMatchingData.rounds} />;
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

  const rating = await getGameRating(slug);

  // Regular quiz
  const quiz = getQuizBySlug(category, slug);
  if (quiz) {
    return (
      <PageShell category={category} slug={slug} title={quiz.title} description={quiz.description} rating={rating}>
        <QuizEngine quiz={quiz} />
      </PageShell>
    );
  }

  // Special game
  const special = specialGames[category]?.[slug];
  if (!special) notFound();

  const engine = SpecialGameEngine({ slug });
  if (!engine) notFound();

  return (
    <PageShell category={category} slug={slug} title={special.title} description={special.description} rating={rating}>
      {engine}
    </PageShell>
  );
}
