import type { MetadataRoute } from "next";
import { getAllQuizzes, specialGameSlugs } from "@/lib/quizzes";
import { getAllArticles } from "@/lib/blog";

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

  // Printable puzzles
  const printableSlugs = [
    "crossword-everyday-words", "crossword-classic-movies-music", "crossword-around-the-world",
    "word-search-nature-words", "word-search-kitchen-cooking", "word-search-around-the-house",
    "sudoku-easy", "sudoku-medium", "sudoku-hard",
    "word-scramble-sheet-1", "word-scramble-sheet-2", "word-scramble-sheet-3",
    "riddles-sheet-1", "riddles-sheet-2", "riddles-sheet-3", "riddles-sheet-4",
    "word-ladder-sheet-1", "word-ladder-sheet-2",
    "cryptogram-1", "cryptogram-2", "cryptogram-3",
    "logic-grid-1", "logic-grid-2", "logic-grid-3",
    "maze-easy", "maze-medium", "maze-hard",
  ];
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
