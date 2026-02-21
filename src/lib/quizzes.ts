import type { Quiz, GameCategory } from "./types";
import nostalgiaTrivia from "./quizzes-nostalgia";
import generalKnowledge from "./quizzes-general";
import wordGameQuizzes from "./quizzes-word";
import memoryGameQuizzes from "./quizzes-memory";

const allQuizzes: Quiz[] = [
  ...nostalgiaTrivia,
  ...generalKnowledge,
  ...wordGameQuizzes,
  ...memoryGameQuizzes,
];

export function getAllQuizzes(): Quiz[] {
  return allQuizzes;
}

export function getQuizzesByCategory(category: GameCategory): Quiz[] {
  switch (category) {
    case "nostalgia-trivia":
      return nostalgiaTrivia;
    case "general-knowledge":
      return generalKnowledge;
    case "word-games":
      return wordGameQuizzes;
    case "memory-games":
      return memoryGameQuizzes;
    default:
      return [];
  }
}

export function getQuizBySlug(
  category: string,
  slug: string,
): Quiz | undefined {
  return allQuizzes.find((q) => q.id === slug && q.gameCategory === category);
}

export function getQuizById(id: string): Quiz | undefined {
  return allQuizzes.find((q) => q.id === id);
}

export function getDailyChallenge(): Quiz {
  const today = new Date();
  const dateString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }

  // Pick 5 questions deterministically from all quizzes
  const allQuestions = allQuizzes.flatMap((q) => q.questions);
  const selected = [];
  const seed = Math.abs(hash);
  for (let i = 0; i < 5 && i < allQuestions.length; i++) {
    const index = (seed + i * 7919) % allQuestions.length;
    selected.push(allQuestions[index]);
  }

  return {
    id: `daily-${dateString}`,
    title: "Daily Challenge",
    description: "5 questions from across all categories — a new challenge every day!",
    gameCategory: "nostalgia-trivia",
    questions: selected,
  };
}

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

// Non-quiz game slugs for the special game engines

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
