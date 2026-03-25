import { generateOgImage } from "@/lib/ogImage";
import { getQuizBySlug, getQuizzesByCategory } from "@/lib/quizzes";
import { specialGameSlugs, categoryInfo } from "@/lib/quizzes-shared";
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

export async function generateStaticParams() {
  const params = [];
  for (const category of VALID_CATEGORIES) {
    const quizzes = await getQuizzesByCategory(category);
    const quizSlugs = quizzes
      .filter((q) => q && q.id)
      .map((q) => ({ category, slug: q.id }));
    
    const gameSlugs = (specialGameSlugs[category] || [])
      .filter(Boolean)
      .map((s) => ({
        category,
        slug: s,
      }));
    params.push(...quizSlugs, ...gameSlugs);
  }
  return params.filter(p => p.category && p.slug);
}

export default async function Image({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const quiz = await getQuizBySlug(category as GameCategory, slug);
  const info = categoryInfo[category as GameCategory];
  const title = quiz?.title || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return generateOgImage({
    title,
    subtitle: info?.title ?? "Brain Games",
    category: category as GameCategory,
  });
}
