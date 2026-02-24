import { generateOgImage } from "@/lib/ogImage";
import { getQuizBySlug, specialGameSlugs, getQuizzesByCategory, categoryInfo } from "@/lib/quizzes";
import type { GameCategory } from "@/lib/types";

export const alt = "Brain Game — SeniorBrainGames";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const VALID_CATEGORIES: GameCategory[] = [
  "nostalgia-trivia",
  "general-knowledge",
  "word-games",
  "memory-games",
];

export function generateStaticParams() {
  return VALID_CATEGORIES.flatMap((category) => {
    const quizSlugs = getQuizzesByCategory(category).map((q) => ({
      category,
      slug: q.id,
    }));
    const gameSlugs = (specialGameSlugs[category] || []).map((s) => ({
      category,
      slug: s,
    }));
    return [...quizSlugs, ...gameSlugs];
  });
}

export default async function Image({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const quiz = getQuizBySlug(category as GameCategory, slug);
  const info = categoryInfo[category as GameCategory];
  const title = quiz?.title || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return generateOgImage({
    title,
    subtitle: info?.title ?? "Brain Games",
    category: category as GameCategory,
  });
}
