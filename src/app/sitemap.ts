import type { MetadataRoute } from "next";
import { getAllQuizzes, specialGameSlugs } from "@/lib/quizzes";
import { getAllArticles } from "@/lib/blog";
import { printablePuzzleSections } from "@/lib/printablePuzzles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://seniorbraingames.org";
  const lastModified = new Date();

  const staticPages = [
    { url: baseUrl, changeFrequency: "daily" as const, priority: 1, lastModified },
    { url: `${baseUrl}/nostalgia-trivia`, changeFrequency: "weekly" as const, priority: 0.9, lastModified },
    { url: `${baseUrl}/general-knowledge`, changeFrequency: "weekly" as const, priority: 0.9, lastModified },
    { url: `${baseUrl}/word-games`, changeFrequency: "weekly" as const, priority: 0.9, lastModified },
    { url: `${baseUrl}/memory-games`, changeFrequency: "weekly" as const, priority: 0.9, lastModified },
    { url: `${baseUrl}/daily-challenge`, changeFrequency: "daily" as const, priority: 0.8, lastModified },
    { url: `${baseUrl}/about`, changeFrequency: "monthly" as const, priority: 0.5, lastModified },
    { url: `${baseUrl}/privacy`, changeFrequency: "monthly" as const, priority: 0.3, lastModified },
    { url: `${baseUrl}/faq`, changeFrequency: "monthly" as const, priority: 0.5, lastModified },
  ];

  // Quiz pages
  const quizPages = getAllQuizzes().map((quiz) => ({
    url: `${baseUrl}/${quiz.gameCategory}/${quiz.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    lastModified,
  }));

  // Special game pages
  const gamePages = Object.entries(specialGameSlugs).flatMap(
    ([category, slugs]) =>
      slugs.map((slug) => ({
        url: `${baseUrl}/${category}/${slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.7,
        lastModified,
      })),
  );

  // Printable puzzles (derived from shared registry)
  const printableSlugs = printablePuzzleSections.flatMap((s) => s.puzzles.map((p) => p.slug));
  const printablePages = [
    { url: `${baseUrl}/printable-puzzles`, changeFrequency: "monthly" as const, priority: 0.8, lastModified },
    ...printableSlugs.map((slug) => ({
      url: `${baseUrl}/printable-puzzles/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      lastModified,
    })),
  ];

  // Blog pages
  const blogPages = [
    { url: `${baseUrl}/blog`, changeFrequency: "weekly" as const, priority: 0.8, lastModified },
    ...getAllArticles().map((article) => ({
      url: `${baseUrl}/blog/${article.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      lastModified,
    })),
  ];

  return [...staticPages, ...quizPages, ...gamePages, ...printablePages, ...blogPages];
}
