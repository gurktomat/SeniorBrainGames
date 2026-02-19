export interface BlogArticle {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  content: string;
}

import bestBrainExercises from "@/data/blog/best-brain-exercises-for-seniors";
import benefitsOfPuzzles from "@/data/blog/benefits-of-puzzles-for-elderly";
import freePrintablePuzzles from "@/data/blog/free-printable-puzzles-for-seniors";
import keepMindSharp from "@/data/blog/how-to-keep-your-mind-sharp-after-60";
import dailyBrainTraining from "@/data/blog/daily-brain-training-for-older-adults";
import funActivities from "@/data/blog/fun-activities-for-seniors-at-home";
import memoryGames from "@/data/blog/memory-games-for-seniors";
import wordGames from "@/data/blog/word-games-for-older-adults";
import triviaGames from "@/data/blog/trivia-games-for-seniors";
import improveMemory from "@/data/blog/how-to-improve-memory-after-70";

const articles: BlogArticle[] = [
  bestBrainExercises,
  benefitsOfPuzzles,
  freePrintablePuzzles,
  keepMindSharp,
  dailyBrainTraining,
  funActivities,
  memoryGames,
  wordGames,
  triviaGames,
  improveMemory,
];

export function getAllArticles(): BlogArticle[] {
  return [...articles].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return articles.find((a) => a.slug === slug);
}
