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

const articles: BlogArticle[] = [
  bestBrainExercises,
  benefitsOfPuzzles,
  freePrintablePuzzles,
  keepMindSharp,
  dailyBrainTraining,
];

export function getAllArticles(): BlogArticle[] {
  return [...articles].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return articles.find((a) => a.slug === slug);
}
