import { generateOgImage } from "@/lib/ogImage";
import { getQuizBySlug, specialGameSlugs, getQuizzesByCategory } from "@/lib/quizzes";

export const alt = "Word Game — SeniorBrainGames";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const specialGames: Record<string, string> = {
  "word-scramble": "Word Scramble",
  "complete-the-proverb": "Complete the Proverb",
  "spelling-bee": "Spelling Bee",
  "word-association": "Word Association",
  "crossword-classic": "Classic Crossword",
  "word-search": "Word Search",
  "hangman": "Hangman",
  "word-ladder": "Word Ladder",
  "cryptogram": "Cryptogram",
  "anagram-challenge": "Anagram Challenge",
  "missing-vowels": "Missing Vowels",
  "emoji-decoder": "Emoji Decoder",
  "riddle-challenge": "Riddle Challenge",
  "famous-first-lines": "Famous First Lines",
  "grammar-true-or-false": "Grammar True or False",
};

export function generateStaticParams() {
  const quizSlugs = getQuizzesByCategory("word-games").map((q) => ({ slug: q.id }));
  const gameSlugs = (specialGameSlugs["word-games"] || []).map((s) => ({ slug: s }));
  return [...quizSlugs, ...gameSlugs];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const quiz = getQuizBySlug("word-games", slug);
  const title = quiz?.title || specialGames[slug] || "Word Games";

  return generateOgImage({
    title,
    subtitle: "Word Games",
    category: "word-games",
  });
}
