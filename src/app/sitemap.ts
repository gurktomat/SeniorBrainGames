import type { MetadataRoute } from "next";
import { getQuizzesByCategory, specialGameSlugs } from "@/lib/quizzes";
import { getAllArticles } from "@/lib/blog";
import { printablePuzzleSections } from "@/lib/printablePuzzles";
import type { GameCategory } from "@/lib/types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://seniorbraingames.org";

  const staticPages = [
    { url: baseUrl, changeFrequency: "daily" as const, priority: 1 },
    { url: `${baseUrl}/play`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/play/nostalgia-trivia`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/play/general-knowledge`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/play/word-games`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/play/memory-games`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/daily-challenge`, changeFrequency: "daily" as const, priority: 0.8 },
    { url: `${baseUrl}/discover`, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/privacy`, changeFrequency: "monthly" as const, priority: 0.3 },
    { url: `${baseUrl}/faq`, changeFrequency: "monthly" as const, priority: 0.5 },
  ];

  // Quiz pages
  const categories: GameCategory[] = ["nostalgia-trivia", "general-knowledge", "word-games", "memory-games"];
  const quizPages = [];
  
  for (const category of categories) {
    const quizzes = await getQuizzesByCategory(category);
    const pages = quizzes.map((quiz) => ({
      url: `${baseUrl}/play/${category}/${quiz.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
    quizPages.push(...pages);
  }

  // Special game pages
  const gamePages = Object.entries(specialGameSlugs).flatMap(
    ([category, slugs]) =>
      slugs.map((slug) => ({
        url: `${baseUrl}/play/${category}/${slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
  );

  // Printable puzzles (derived from shared registry)
  const printableSlugs = printablePuzzleSections.flatMap((s) => s.puzzles.map((p) => p.slug));
  const printablePages = [
    { url: `${baseUrl}/printable-puzzles`, changeFrequency: "monthly" as const, priority: 0.8 },
    ...printableSlugs.map((slug) => ({
      url: `${baseUrl}/printable-puzzles/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  // Blog pages
  const blogPages = [
    { url: `${baseUrl}/blog`, changeFrequency: "weekly" as const, priority: 0.8 },
    ...getAllArticles().map((article) => ({
      url: `${baseUrl}/blog/${article.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      lastModified: new Date(article.date),
    })),
  ];

  return [...staticPages, ...quizPages, ...gamePages, ...printablePages, ...blogPages];
}
