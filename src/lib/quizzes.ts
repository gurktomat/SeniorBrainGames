import type { Quiz, GameCategory } from "./types";
import fs from "fs/promises";
import path from "path";
import { cache } from "react";
import { specialGamesMetadata } from "./special-games-data";

const VALID_CATEGORIES = new Set<GameCategory>([
  "nostalgia-trivia",
  "general-knowledge",
  "word-games",
  "memory-games",
]);

function normalizeQuiz(category: GameCategory, data: unknown): Quiz | null {
  if (!data || typeof data !== "object") return null;

  const quiz = data as Partial<Quiz>;
  if (typeof quiz.id !== "string" || typeof quiz.title !== "string" || typeof quiz.description !== "string") {
    return null;
  }
  if (!Array.isArray(quiz.questions)) return null;

  const gameCategory = quiz.gameCategory ?? category;
  if (!VALID_CATEGORIES.has(gameCategory)) return null;

  return {
    ...quiz,
    gameCategory,
    questions: quiz.questions,
  } as Quiz;
}

// Helper to load a quiz from JSON file
async function loadQuizFile(category: GameCategory, slug: string): Promise<Quiz | null> {
  try {
    const dataPath = path.join(process.cwd(), "src/data", category, `${slug}.json`);
    const content = await fs.readFile(dataPath, "utf-8");
    return normalizeQuiz(category, JSON.parse(content));
  } catch {
    return null;
  }
}

export async function getQuizzesByCategory(category: GameCategory): Promise<Quiz[]> {
  try {
    const dirPath = path.join(process.cwd(), "src/data", category);
    const files = await fs.readdir(dirPath);
    const quizzes = await Promise.all(
      files
        .filter(f => f.endsWith(".json"))
        .map(f => loadQuizFile(category, f.replace(".json", "")))
    );
    return quizzes.filter((q): q is Quiz => q !== null);
  } catch {
    return [];
  }
}

export interface CategoryGameLink {
  id: string;
  title: string;
  description: string;
}

export const getCategoryGameLinks = cache(async (category: GameCategory): Promise<CategoryGameLink[]> => {
  const quizzes = await getQuizzesByCategory(category);
  const quizLinks = quizzes.map((quiz) => ({
    id: quiz.id,
    title: quiz.title,
    description: quiz.description,
  }));
  const specialLinks = Object.entries(specialGamesMetadata[category] ?? {}).map(([id, game]) => ({
    id,
    title: game.title,
    description: game.description,
  }));

  return [...specialLinks, ...quizLinks];
});

export async function getQuizBySlug(
  category: string,
  slug: string,
): Promise<Quiz | null> {
  if (!VALID_CATEGORIES.has(category as GameCategory)) return null;
  return loadQuizFile(category as GameCategory, slug);
}

export async function getQuizById(id: string): Promise<Quiz | null> {
  // Since we don't know the category, we'd have to search all.
  // In practice, we usually have the category from the URL.
  const categories: GameCategory[] = ["nostalgia-trivia", "general-knowledge", "word-games", "memory-games"];
  for (const cat of categories) {
    const quiz = await loadQuizFile(cat, id);
    if (quiz) return quiz;
  }
  return null;
}

export async function getDailyChallenge(): Promise<Quiz> {
  const today = new Date();
  const dateString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  
  // Deterministic but "random" category for the day
  const categories: GameCategory[] = ["nostalgia-trivia", "general-knowledge", "word-games", "memory-games"];
  const catIndex = (today.getFullYear() + today.getMonth() + today.getDate()) % categories.length;
  const category = categories[catIndex];
  
  // Load some quizzes from that category
  const quizzes = await getQuizzesByCategory(category);
  const allQuestions = quizzes.flatMap(q => q.questions);
  
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }

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
    gameCategory: category,
    questions: selected,
  };
}

export { categoryInfo, specialGameSlugs } from "./quizzes-shared";
