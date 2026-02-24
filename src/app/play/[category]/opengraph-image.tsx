import { generateOgImage } from "@/lib/ogImage";
import { categoryInfo } from "@/lib/quizzes";
import type { GameCategory } from "@/lib/types";

export const alt = "Brain Games Category — SeniorBrainGames";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const VALID_CATEGORIES: GameCategory[] = [
  "nostalgia-trivia",
  "general-knowledge",
  "word-games",
  "memory-games",
];

export function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({ category }));
}

export default async function Image({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const info = categoryInfo[category as GameCategory];
  if (!info) {
    return generateOgImage({ title: "Brain Games", subtitle: "SeniorBrainGames" });
  }
  return generateOgImage({
    title: info.title,
    subtitle: info.description,
    category: category as GameCategory,
  });
}
