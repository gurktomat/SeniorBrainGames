import { generateOgImage } from "@/lib/ogImage";

const puzzleTitles: Record<string, string> = {
  "crossword-everyday-words": "Crossword — Everyday Words",
  "crossword-classic-movies-music": "Crossword — Classic Movies & Music",
  "crossword-around-the-world": "Crossword — Around the World",
  "word-search-nature-words": "Word Search — Nature Words",
  "word-search-kitchen-cooking": "Word Search — Kitchen & Cooking",
  "word-search-around-the-house": "Word Search — Around the House",
  "sudoku-easy": "Sudoku — Easy",
  "sudoku-medium": "Sudoku — Medium",
  "sudoku-hard": "Sudoku — Hard",
  "word-scramble-sheet-1": "Word Scramble Sheet 1",
  "word-scramble-sheet-2": "Word Scramble Sheet 2",
  "word-scramble-sheet-3": "Word Scramble Sheet 3",
  "riddles-sheet-1": "Riddles Sheet 1",
  "riddles-sheet-2": "Riddles Sheet 2",
  "riddles-sheet-3": "Riddles Sheet 3",
  "riddles-sheet-4": "Riddles Sheet 4",
  "word-ladder-sheet-1": "Word Ladder Sheet 1",
  "word-ladder-sheet-2": "Word Ladder Sheet 2",
  "cryptogram-1": "Cryptogram 1",
  "cryptogram-2": "Cryptogram 2",
  "cryptogram-3": "Cryptogram 3",
  "logic-grid-1": "Logic Grid Puzzle 1",
  "logic-grid-2": "Logic Grid Puzzle 2",
  "logic-grid-3": "Logic Grid Puzzle 3",
  "maze-easy": "Maze — Easy",
  "maze-medium": "Maze — Medium",
  "maze-hard": "Maze — Hard",
};

export function generateStaticParams() {
  return Object.keys(puzzleTitles).map((slug) => ({ slug }));
}

export const alt = "Printable Puzzle — SeniorBrainGames";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = puzzleTitles[slug] || "Printable Puzzle";

  return generateOgImage({
    title,
    subtitle: "Printable Puzzles",
    category: "printable-puzzles",
  });
}
