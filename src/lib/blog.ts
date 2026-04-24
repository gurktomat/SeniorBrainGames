import { type BlogArticle, articleMetadata } from "./blog-shared";
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
import solitaireMahjongBingo from "@/data/blog/solitaire-mahjong-bingo-benefits-for-seniors";
import mahjongSolitaireBeginners from "@/data/blog/mahjong-solitaire-for-beginners";
import bingoGuide from "@/data/blog/bingo-for-seniors-complete-guide";

export type { BlogArticle };

const articles: BlogArticle[] = [
  mahjongSolitaireBeginners,
  bingoGuide,
  solitaireMahjongBingo,
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

export function getAllArticles() {
  return articleMetadata;
}

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return articles.find((a) => a.slug === slug);
}
