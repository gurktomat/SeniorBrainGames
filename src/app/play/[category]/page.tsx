import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Star, Printer } from "lucide-react";
import type { GameCategory } from "@/lib/types";
import QuizCard from "@/components/QuizCard";
import { getQuizzesByCategory, categoryInfo } from "@/lib/quizzes";
import CategoryIcon from "@/components/CategoryIcon";
import { GameIcon, categoryColors } from "@/lib/gameIcons";
import JsonLd from "@/components/JsonLd";
import { getCategoryRatings } from "@/lib/db";

export const revalidate = 300;

const VALID_CATEGORIES = ["nostalgia-trivia", "general-knowledge", "word-games", "memory-games"] as const;

type SpecialGame = { id: string; title: string; description: string; count: string };

const specialGamesByCategory: Record<string, SpecialGame[]> = {
  "nostalgia-trivia": [
    { id: "timeline-sort", title: "Timeline Sort", description: "Put historical events in the correct chronological order!", count: "10 Rounds" },
    { id: "nostalgia-fact-or-fiction", title: "Nostalgia Fact or Fiction", description: "Can you tell which nostalgic facts from the 1950s–1980s are true and which are made up?", count: "20 Statements" },
    { id: "decade-sorting", title: "Decade Sorting", description: "Sort pop culture items into their correct decade!", count: "10 Rounds" },
    { id: "nostalgia-who-am-i", title: "Nostalgia Who Am I?", description: "Guess the pop culture icon from progressive clues!", count: "15 Puzzles" },
    { id: "nostalgia-hangman", title: "Nostalgia Hangman", description: "Guess classic TV shows, movies, and songs one letter at a time!", count: "30 Words" },
    { id: "nostalgia-riddles", title: "Nostalgia Riddles", description: "Can you solve these riddles about retro items and events?", count: "20 Riddles" },
    { id: "vintage-spelling-bee", title: "Vintage Spelling Bee", description: "Spell these vintage and retro words correctly!", count: "15 Words" },
    { id: "old-time-sayings", title: "Old-Time Sayings", description: "Complete these classic old-time proverbs and sayings!", count: "15 Sayings" },
    { id: "retro-word-association", title: "Retro Word Association", description: "Find the word that connects the retro-themed group!", count: "15 Puzzles" },
    { id: "nostalgia-matching", title: "Nostalgia Matching", description: "Match classic actors to their shows, songs to their artists, and more!", count: "10 Rounds" },
    { id: "nostalgia-estimation", title: "Nostalgia Estimation", description: "How close can you guess? Test your knowledge of nostalgia facts and figures!", count: "15 Questions" },
  ],
  "general-knowledge": [
    { id: "true-or-false", title: "True or False", description: "Test your knowledge — is this statement true or false?", count: "20 Statements" },
    { id: "who-am-i", title: "Who Am I?", description: "Guess the famous person from progressive clues — fewer clues means more points!", count: "15 Puzzles" },
    { id: "science-sorting", title: "Science Sorting", description: "Sort items into the correct science categories!", count: "10 Rounds" },
    { id: "history-timeline", title: "History Timeline", description: "Put world history events in the correct chronological order!", count: "10 Rounds" },
    { id: "science-true-or-false", title: "Science True or False", description: "Is this science fact true or false? Test your scientific knowledge!", count: "20 Statements" },
    { id: "what-in-the-world", title: "What in the World?", description: "Guess the famous landmark or place from progressive clues!", count: "15 Puzzles" },
    { id: "inventions-timeline", title: "Inventions Timeline", description: "Put great inventions in the correct chronological order!", count: "10 Rounds" },
    { id: "animal-kingdom-sorting", title: "Animal Kingdom Sorting", description: "Sort animals into the correct categories!", count: "10 Rounds" },
    { id: "mental-math", title: "Mental Math", description: "Challenge your mental arithmetic skills!", count: "3 Levels" },
    { id: "logic-patterns", title: "Logic Patterns", description: "Find the pattern and choose what comes next in the sequence!", count: "15 Puzzles" },
    { id: "observation-challenge", title: "Observation Challenge", description: "Study the items carefully, then spot what changed!", count: "15 Rounds" },
    { id: "geography-sorting", title: "Geography Sorting", description: "Sort countries, cities, and landmarks into their correct continents and regions!", count: "10 Rounds" },
  ],
  "word-games": [
    { id: "word-scramble", title: "Word Scramble", description: "Unscramble the letters to find the hidden word!", count: "15 Puzzles" },
    { id: "complete-the-proverb", title: "Complete the Proverb", description: "Can you finish these well-known proverbs and sayings?", count: "15 Proverbs" },
    { id: "spelling-bee", title: "Spelling Bee", description: "Test your spelling skills with commonly misspelled words!", count: "15 Words" },
    { id: "word-association", title: "Word Association", description: "Find the word that connects the group!", count: "15 Puzzles" },
    { id: "crossword-classic", title: "Classic Crossword", description: "Solve classic crossword puzzles — fill the grid using the across and down clues!", count: "3 Puzzles" },
    { id: "word-search", title: "Word Search", description: "Find all the hidden words in the grid — look across and down!", count: "3 Puzzles" },
    { id: "hangman", title: "Hangman", description: "Guess the word one letter at a time before you run out of lives!", count: "30 Words" },
    { id: "word-ladder", title: "Word Ladder", description: "Change one letter at a time to transform the start word into the end word!", count: "10 Puzzles" },
    { id: "cryptogram", title: "Cryptogram", description: "Decode the secret message by figuring out the letter substitutions!", count: "10 Puzzles" },
    { id: "anagram-challenge", title: "Anagram Challenge", description: "Unscramble themed anagram puzzles — each round has a different theme!", count: "10 Rounds" },
    { id: "missing-vowels", title: "Missing Vowels", description: "The vowels have been removed — can you figure out the original phrase?", count: "10 Rounds" },
    { id: "emoji-decoder", title: "Emoji Decoder", description: "Decode emoji sequences into movies, songs, and phrases!", count: "10 Rounds" },
    { id: "riddle-challenge", title: "Riddle Challenge", description: "Can you solve these classic riddles? Type your answer and see if you're right!", count: "20 Riddles" },
    { id: "famous-first-lines", title: "Famous First Lines", description: "Guess the book from its famous opening line!", count: "15 Lines" },
    { id: "grammar-true-or-false", title: "Grammar True or False", description: "Is this sentence grammatically correct? Test your grammar knowledge!", count: "20 Statements" },
    { id: "crossword-nature-science", title: "Nature & Science Crossword", description: "Solve crossword puzzles themed around nature and science!", count: "3 Puzzles" },
    { id: "word-search-animals", title: "Animal Word Search", description: "Find animal names hidden in the grid!", count: "3 Puzzles" },
    { id: "food-word-scramble", title: "Food Word Scramble", description: "Unscramble the letters to find the food or cooking word!", count: "15 Puzzles" },
    { id: "cryptogram-poetry", title: "Poetry Cryptogram", description: "Decode famous poetry lines by figuring out the letter substitutions!", count: "10 Puzzles" },
    { id: "word-ladder-challenge", title: "Word Ladder Challenge", description: "Change one letter at a time to climb from the start word to the end word!", count: "10 Puzzles" },
    { id: "history-spelling-bee", title: "History Spelling Bee", description: "Spell historical terms, famous names, and landmark words correctly!", count: "15 Words" },
    { id: "word-search-travel", title: "Travel Word Search", description: "Find travel and geography words hidden in the grid!", count: "3 Puzzles" },
  ],
  "memory-games": [
    { id: "memory-card-match", title: "Memory Card Match", description: "Flip cards to find matching pairs! Test your memory with this classic game.", count: "3 Levels" },
    { id: "spot-the-difference", title: "Spot the Difference", description: "Look carefully at the items, then spot what changed!", count: "15 Rounds" },
    { id: "whats-missing", title: "What's Missing?", description: "Study the items carefully, then figure out which one disappeared!", count: "15 Rounds" },
    { id: "pattern-recognition", title: "Pattern Recognition", description: "Find the pattern and choose what comes next in the sequence!", count: "15 Puzzles" },
    { id: "color-shape-sorting", title: "Color & Shape Sorting", description: "Sort items into the correct categories as quickly as you can!", count: "10 Rounds" },
    { id: "sudoku-puzzles", title: "Sudoku", description: "Fill the grid so every row, column, and 3×3 box contains the numbers 1-9!", count: "3 Puzzles" },
    { id: "sliding-puzzle", title: "Sliding Puzzle", description: "Slide the tiles into the correct order — a classic brain teaser!", count: "3 Levels" },
    { id: "sequence-memory", title: "Sequence Memory", description: "Watch the colors light up, then repeat the sequence from memory!", count: "3 Levels" },
    { id: "matching-pairs", title: "Matching Pairs", description: "Match each item on the left with its partner on the right!", count: "10 Rounds" },
    { id: "math-challenge", title: "Math Challenge", description: "Exercise your mental math skills with fun arithmetic puzzles!", count: "3 Levels" },
    { id: "number-memory", title: "Number Memory", description: "Flash a number sequence, then recall it from memory!", count: "15 Rounds" },
    { id: "estimation-game", title: "Estimation Game", description: "How close can you guess? Test your estimation skills with fun number questions!", count: "15 Questions" },
    { id: "memory-true-or-false", title: "Memory True or False", description: "Test what you know about the brain, memory, and psychology!", count: "20 Statements" },
    { id: "what-am-i", title: "What Am I?", description: "Guess the everyday object from progressive clues — fewer clues means more points!", count: "15 Puzzles" },
    { id: "minesweeper", title: "Minesweeper", description: "Classic mine-clearing puzzle — reveal all safe cells without hitting a mine!", count: "3 Levels" },
    { id: "nature-card-match", title: "Nature Card Match", description: "Match nature-themed cards by flipping pairs!", count: "3 Levels" },
    { id: "color-sequence-challenge", title: "Color Sequence Challenge", description: "Watch the colors flash, then repeat the sequence from memory!", count: "3 Levels" },
    { id: "number-recall-challenge", title: "Number Recall Challenge", description: "Flash a number sequence, then recall it from memory!", count: "20 Rounds" },
    { id: "whats-changed", title: "What's Changed?", description: "Study the items carefully, then figure out which one disappeared!", count: "15 Rounds" },
    { id: "sudoku-challenge", title: "Sudoku Challenge", description: "Fill the grid so every row, column, and 3×3 box contains 1-9!", count: "3 Puzzles" },
    { id: "sliding-puzzle-challenge", title: "Sliding Puzzle Challenge", description: "Slide the numbered tiles into the correct order!", count: "3 Levels" },
    { id: "famous-pairs-matching", title: "Famous Pairs Matching", description: "Match famous duos, partners, and sidekicks from TV, music, and history!", count: "10 Rounds" },
  ],
};

const printableGames: Record<string, Set<string>> = {
  "nostalgia-trivia": new Set(["nostalgia-riddles"]),
  "general-knowledge": new Set(),
  "word-games": new Set([
    "crossword-classic", "word-search", "word-scramble", "riddle-challenge", "word-ladder",
    "crossword-nature-science", "word-search-animals", "food-word-scramble", "cryptogram-poetry", "word-ladder-challenge",
  ]),
  "memory-games": new Set(["sudoku-puzzles", "sudoku-challenge"]),
};

const categoryMeta: Record<string, { title: string; description: string }> = {
  "nostalgia-trivia": {
    title: "Nostalgia Trivia — 1950s, 60s, 70s & 80s Quizzes",
    description: "Travel back in time with fun nostalgia trivia quizzes! Test your memory of music, movies, TV shows, and culture from the 1950s through the 1980s.",
  },
  "general-knowledge": {
    title: "General Knowledge Quizzes — Science, History, Geography & More",
    description: "Test your general knowledge with fun quizzes about geography, history, science, nature, food, and more!",
  },
  "word-games": {
    title: "Word Games — Scrambles, Proverbs, Synonyms & More",
    description: "Challenge your vocabulary with fun word games! Word scrambles, proverbs, synonym challenges, spelling bees, and more.",
  },
  "memory-games": {
    title: "Memory Games — Card Match, Patterns, Sorting & More",
    description: "Sharpen your memory with fun games! Card matching, pattern recognition, spot the difference, and more cognitive exercises.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const meta = categoryMeta[category];
  if (!meta) notFound();
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/play/${category}` },
  };
}

export function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({ category }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const info = categoryInfo[category as GameCategory];
  if (!info) notFound();

  const specials = specialGamesByCategory[category] ?? [];
  const quizzes = getQuizzesByCategory(category as GameCategory);
  const ratings = await getCategoryRatings(category);
  const color = categoryColors[category] ?? "#7C5CFC";
  const printables = printableGames[category] ?? new Set();

  const allGames = [
    ...specials.map((g) => ({ id: g.id, title: g.title })),
    ...quizzes.map((q) => ({ id: q.id, title: q.title })),
  ];

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: info.title,
          description: info.description,
          url: `https://seniorbraingames.org/play/${category}`,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: allGames.map((g, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `https://seniorbraingames.org/play/${category}/${g.id}`,
              name: g.title,
            })),
          },
        }}
      />
      <div
        className="mb-12 px-6 py-12 text-center"
        style={{ background: `linear-gradient(135deg, ${color}15 0%, #F8F9FC 100%)` }}
      >
        <div className="mx-auto max-w-3xl">
          <span
            className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{ background: color, color: "white" }}
          >
            <CategoryIcon name={info.icon} size={28} strokeWidth={1.75} />
          </span>
          <h1
            className="mb-3 text-3xl font-bold text-foreground sm:text-4xl"
            style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
          >
            {info.title}
          </h1>
          <p className="text-lg text-text-muted">{info.description}</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {specials.map((game) => (
            <Link
              key={game.id}
              href={`/play/${category}/${game.id}`}
              className="card-playful group relative flex flex-col p-6"
            >
              {printables.has(game.id) && (
                <span
                  className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-purple-50 px-2.5 py-1 text-xs font-bold text-purple-700"
                  title="Printable version available"
                >
                  <Printer size={12} /> Printable
                </span>
              )}
              <GameIcon gameId={game.id} color={color} />
              <h2
                className="mb-2 text-lg font-bold text-foreground"
                style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
              >
                {game.title}
              </h2>
              <p className="mb-4 flex-1 text-base text-text-muted">{game.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-sm font-bold text-primary">
                    {game.count}
                  </span>
                  {ratings[game.id] && ratings[game.id].ratingCount >= 3 && (
                    <span className="flex items-center gap-1 text-sm text-text-muted">
                      <Star size={14} fill="#f59e0b" stroke="#f59e0b" />
                      {ratings[game.id].avgRating}
                    </span>
                  )}
                </div>
                <span className="text-sm font-bold text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  Play &rarr;
                </span>
              </div>
            </Link>
          ))}

          {quizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} basePath={`/play/${category}`} iconColor={color} rating={ratings[quiz.id]} />
          ))}
        </div>
      </div>
    </div>
  );
}
