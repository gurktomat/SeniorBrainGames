import type { Quiz, GameCategory } from "./types";

// Nostalgia Trivia quizzes
import fiftiesNostalgia from "@/data/nostalgia-trivia/fifties-nostalgia.json";
import sixtiesMusic from "@/data/nostalgia-trivia/sixties-music.json";
import classicHollywood from "@/data/nostalgia-trivia/classic-hollywood.json";
import seventiesNostalgia from "@/data/nostalgia-trivia/seventies-nostalgia.json";
import classicTv from "@/data/nostalgia-trivia/classic-tv.json";
import sixtiesNostalgia from "@/data/nostalgia-trivia/sixties-nostalgia.json";
import eightiesNostalgia from "@/data/nostalgia-trivia/eighties-nostalgia.json";
import classicCommercials from "@/data/nostalgia-trivia/classic-commercials.json";

// General Knowledge quizzes
import famousLandmarks from "@/data/general-knowledge/famous-landmarks.json";
import usPresidents from "@/data/general-knowledge/us-presidents.json";
import natureAnimals from "@/data/general-knowledge/nature-animals.json";
import geographyChallenge from "@/data/general-knowledge/geography-challenge.json";
import foodCooking from "@/data/general-knowledge/food-cooking.json";
import scienceInventions from "@/data/general-knowledge/science-inventions.json";
import americanHistory from "@/data/general-knowledge/american-history.json";
import humanBodyHealth from "@/data/general-knowledge/human-body-health.json";

// Word Games (quiz-format ones)
import synonymChallenge from "@/data/word-games/synonym-challenge.json";
import whatsTheWord from "@/data/word-games/whats-the-word.json";

// Memory Games (quiz-format ones)
import pictureQuiz from "@/data/memory-games/picture-quiz.json";

const nostalgiaTrivia: Quiz[] = [
  fiftiesNostalgia as Quiz,
  sixtiesMusic as Quiz,
  classicHollywood as Quiz,
  seventiesNostalgia as Quiz,
  classicTv as Quiz,
  sixtiesNostalgia as Quiz,
  eightiesNostalgia as Quiz,
  classicCommercials as Quiz,
];

const generalKnowledge: Quiz[] = [
  famousLandmarks as Quiz,
  usPresidents as Quiz,
  natureAnimals as Quiz,
  geographyChallenge as Quiz,
  foodCooking as Quiz,
  scienceInventions as Quiz,
  americanHistory as Quiz,
  humanBodyHealth as Quiz,
];

const wordGameQuizzes: Quiz[] = [
  synonymChallenge as Quiz,
  whatsTheWord as Quiz,
];

const memoryGameQuizzes: Quiz[] = [pictureQuiz as Quiz];

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
    icon: "📻",
    slug: "nostalgia-trivia",
  },
  "general-knowledge": {
    title: "General Knowledge",
    description:
      "Challenge yourself with questions about geography, history, science, nature, and more!",
    icon: "🌍",
    slug: "general-knowledge",
  },
  "word-games": {
    title: "Word Games",
    description:
      "Scrambles, proverbs, synonyms, and more — give your vocabulary a workout!",
    icon: "📝",
    slug: "word-games",
  },
  "memory-games": {
    title: "Memory Games",
    description:
      "Card matching, pattern recognition, and visual puzzles to sharpen your memory!",
    icon: "🧩",
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
  ],
  "memory-games": [
    "memory-card-match",
    "spot-the-difference",
    "whats-missing",
    "pattern-recognition",
    "color-shape-sorting",
  ],
};
