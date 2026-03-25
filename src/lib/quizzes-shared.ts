import type { GameCategory } from "./types";

// Category metadata for UI
export const categoryInfo: Record<
  GameCategory,
  { title: string; description: string; icon: string; slug: string }
> = {
  "nostalgia-trivia": {
    title: "Nostalgia Trivia",
    description:
      "Travel back in time with trivia from the 1950s through the 1980s. Test your memory of music, movies, TV, and culture!",
    icon: "radio",
    slug: "nostalgia-trivia",
  },
  "general-knowledge": {
    title: "General Knowledge",
    description:
      "Challenge yourself with questions about geography, history, science, nature, and more!",
    icon: "globe",
    slug: "general-knowledge",
  },
  "word-games": {
    title: "Word Games",
    description:
      "Scrambles, proverbs, synonyms, and more — give your vocabulary a workout!",
    icon: "type",
    slug: "word-games",
  },
  "memory-games": {
    title: "Memory Games",
    description:
      "Card matching, pattern recognition, and visual puzzles to sharpen your memory!",
    icon: "brain",
    slug: "memory-games",
  },
};

export const specialGameSlugs: Record<string, string[]> = {
  "word-games": [
    "word-scramble",
    "complete-the-proverb",
    "spelling-bee",
    "word-association",
    "crossword-classic",
    "word-search",
    "hangman",
    "word-ladder",
    "cryptogram",
    "anagram-challenge",
    "missing-vowels",
    "emoji-decoder",
    "riddle-challenge",
    "famous-first-lines",
    "grammar-true-or-false",
    "crossword-nature-science",
    "word-search-animals",
    "food-word-scramble",
    "cryptogram-poetry",
    "word-ladder-challenge",
    "history-spelling-bee",
    "word-search-travel",
  ],
  "nostalgia-trivia": [
    "timeline-sort",
    "nostalgia-fact-or-fiction",
    "decade-sorting",
    "nostalgia-who-am-i",
    "nostalgia-hangman",
    "nostalgia-riddles",
    "vintage-spelling-bee",
    "old-time-sayings",
    "retro-word-association",
    "nostalgia-matching",
    "nostalgia-estimation",
  ],
  "general-knowledge": [
    "true-or-false",
    "who-am-i",
    "science-sorting",
    "history-timeline",
    "science-true-or-false",
    "what-in-the-world",
    "inventions-timeline",
    "animal-kingdom-sorting",
    "mental-math",
    "logic-patterns",
    "observation-challenge",
    "geography-sorting",
  ],
  "memory-games": [
    "memory-card-match",
    "spot-the-difference",
    "whats-missing",
    "pattern-recognition",
    "color-shape-sorting",
    "sudoku-puzzles",
    "sliding-puzzle",
    "sequence-memory",
    "matching-pairs",
    "math-challenge",
    "number-memory",
    "estimation-game",
    "memory-true-or-false",
    "what-am-i",
    "minesweeper",
    "nature-card-match",
    "color-sequence-challenge",
    "number-recall-challenge",
    "whats-changed",
    "sudoku-challenge",
    "sliding-puzzle-challenge",
    "famous-pairs-matching",
  ],
};
