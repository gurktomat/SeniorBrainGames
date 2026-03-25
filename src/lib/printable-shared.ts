export const printableSpecials: Record<string, string[]> = {
  "nostalgia-trivia": ["nostalgia-riddles", "nostalgia-fact-or-fiction"],
  "general-knowledge": ["true-or-false", "science-true-or-false"],
  "word-games": [
    "word-scramble",
    "food-word-scramble",
    "crossword-classic",
    "crossword-nature-science",
    "word-search",
    "word-search-animals",
    "word-ladder",
    "word-ladder-challenge",
    "cryptogram",
    "cryptogram-poetry",
    "riddle-challenge",
    "grammar-true-or-false",
  ],
  "memory-games": ["sudoku-puzzles", "sudoku-challenge", "memory-true-or-false"],
};

/**
 * Checks if a special game (not a standard quiz) is printable.
 */
export function isSpecialPrintable(category: string, slug: string): boolean {
  return (printableSpecials[category] || []).includes(slug);
}
