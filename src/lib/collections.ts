export interface Collection {
  slug: string;
  title: string;
  description: string;
  emoji: string;
  games: { slug: string; category: string }[];
  featured: boolean;
}

export const collections: Collection[] = [
  {
    slug: "morning-warm-up",
    title: "Morning Brain Warm-Up",
    description: "Start your day with these quick, energizing games",
    emoji: "☀️",
    games: [
      { slug: "word-scramble", category: "word-games" },
      { slug: "true-or-false", category: "general-knowledge" },
      { slug: "memory-card-match", category: "memory-games" },
      { slug: "complete-the-proverb", category: "word-games" },
      { slug: "pattern-recognition", category: "memory-games" },
      { slug: "spelling-bee", category: "word-games" },
    ],
    featured: true,
  },
  {
    slug: "five-minute-games",
    title: "5-Minute Games",
    description: "Perfect for a quick brain break",
    emoji: "⏱️",
    games: [
      { slug: "hangman", category: "word-games" },
      { slug: "word-association", category: "word-games" },
      { slug: "nostalgia-fact-or-fiction", category: "nostalgia-trivia" },
      { slug: "matching-pairs", category: "memory-games" },
      { slug: "missing-vowels", category: "word-games" },
      { slug: "estimation-game", category: "memory-games" },
      { slug: "mental-math", category: "general-knowledge" },
      { slug: "emoji-decoder", category: "word-games" },
    ],
    featured: false,
  },
  {
    slug: "challenge-yourself",
    title: "Challenge Yourself",
    description: "Ready for a real brain workout? These games will push you",
    emoji: "💪",
    games: [
      { slug: "cryptogram", category: "word-games" },
      { slug: "sudoku-puzzles", category: "memory-games" },
      { slug: "timeline-sort", category: "nostalgia-trivia" },
      { slug: "logic-patterns", category: "general-knowledge" },
      { slug: "word-ladder", category: "word-games" },
      { slug: "sliding-puzzle", category: "memory-games" },
    ],
    featured: false,
  },
  {
    slug: "memory-bootcamp",
    title: "Memory Bootcamp",
    description: "Strengthen your memory with these focused exercises",
    emoji: "🧠",
    games: [
      { slug: "memory-card-match", category: "memory-games" },
      { slug: "sequence-memory", category: "memory-games" },
      { slug: "number-memory", category: "memory-games" },
      { slug: "spot-the-difference", category: "memory-games" },
      { slug: "whats-missing", category: "memory-games" },
      { slug: "observation-challenge", category: "general-knowledge" },
    ],
    featured: false,
  },
  {
    slug: "word-wizard",
    title: "Word Wizard",
    description: "A curated mix of the best word games for vocabulary lovers",
    emoji: "✍️",
    games: [
      { slug: "crossword-classic", category: "word-games" },
      { slug: "word-search", category: "word-games" },
      { slug: "anagram-challenge", category: "word-games" },
      { slug: "cryptogram-poetry", category: "word-games" },
      { slug: "famous-first-lines", category: "word-games" },
      { slug: "riddle-challenge", category: "word-games" },
    ],
    featured: false,
  },
  {
    slug: "trip-down-memory-lane",
    title: "Trip Down Memory Lane",
    description: "Relive the golden days with nostalgia-packed games",
    emoji: "📻",
    games: [
      { slug: "nostalgia-who-am-i", category: "nostalgia-trivia" },
      { slug: "decade-sorting", category: "nostalgia-trivia" },
      { slug: "nostalgia-hangman", category: "nostalgia-trivia" },
      { slug: "old-time-sayings", category: "nostalgia-trivia" },
      { slug: "vintage-spelling-bee", category: "nostalgia-trivia" },
      { slug: "retro-word-association", category: "nostalgia-trivia" },
    ],
    featured: false,
  },
];

export function getFeaturedCollection(): Collection {
  return collections.find((c) => c.featured) ?? collections[0];
}
