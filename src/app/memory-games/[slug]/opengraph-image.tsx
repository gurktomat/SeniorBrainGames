import { generateOgImage } from "@/lib/ogImage";
import { getQuizBySlug, specialGameSlugs, getQuizzesByCategory } from "@/lib/quizzes";

export const alt = "Memory Game — SeniorBrainGames";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const specialGames: Record<string, string> = {
  "memory-card-match": "Memory Card Match",
  "spot-the-difference": "Spot the Difference",
  "whats-missing": "What's Missing?",
  "pattern-recognition": "Pattern Recognition",
  "color-shape-sorting": "Color & Shape Sorting",
  "sudoku-puzzles": "Sudoku",
  "sliding-puzzle": "Sliding Puzzle",
  "sequence-memory": "Sequence Memory",
  "matching-pairs": "Matching Pairs",
  "math-challenge": "Math Challenge",
  "number-memory": "Number Memory",
  "estimation-game": "Estimation Game",
  "memory-true-or-false": "Memory True or False",
  "what-am-i": "What Am I?",
  "minesweeper": "Minesweeper",
};

export function generateStaticParams() {
  const quizSlugs = getQuizzesByCategory("memory-games").map((q) => ({ slug: q.id }));
  const gameSlugs = (specialGameSlugs["memory-games"] || []).map((s) => ({ slug: s }));
  return [...quizSlugs, ...gameSlugs];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const quiz = getQuizBySlug("memory-games", slug);
  const title = quiz?.title || specialGames[slug] || "Memory Games";

  return generateOgImage({
    title,
    subtitle: "Memory Games",
    category: "memory-games",
  });
}
