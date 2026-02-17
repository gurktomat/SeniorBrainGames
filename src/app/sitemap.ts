import type { MetadataRoute } from "next";
import { getAllQuizzes, specialGameSlugs } from "@/lib/quizzes";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://seniorbraingames.org";

  const staticPages = [
    { url: baseUrl, changeFrequency: "daily" as const, priority: 1 },
    { url: `${baseUrl}/nostalgia-trivia`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/general-knowledge`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/word-games`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/memory-games`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/daily-challenge`, changeFrequency: "daily" as const, priority: 0.8 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/privacy`, changeFrequency: "monthly" as const, priority: 0.3 },
  ];

  // Quiz pages
  const quizPages = getAllQuizzes().map((quiz) => ({
    url: `${baseUrl}/${quiz.gameCategory}/${quiz.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Special game pages
  const gamePages = Object.entries(specialGameSlugs).flatMap(
    ([category, slugs]) =>
      slugs.map((slug) => ({
        url: `${baseUrl}/${category}/${slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
  );

  return [...staticPages, ...quizPages, ...gamePages];
}
