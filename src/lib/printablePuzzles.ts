export interface PrintablePuzzleLink {
  slug: string;
  label: string;
}

export interface PrintablePuzzleSectionData {
  title: string;
  description: string;
  iconName: string;
  puzzles: PrintablePuzzleLink[];
}

export const printablePuzzleSections: PrintablePuzzleSectionData[] = [
  {
    title: "Crossword Puzzles",
    description: "Classic crossword grids with across & down clues.",
    iconName: "grid",
    puzzles: [
      { slug: "crossword-everyday-words", label: "Everyday Words" },
      { slug: "crossword-classic-movies-music", label: "Classic Movies & Music" },
      { slug: "crossword-around-the-world", label: "Around the World" },
      { slug: "crossword-nature-science-1", label: "Nature & Science 1" },
      { slug: "crossword-nature-science-2", label: "Nature & Science 2" },
      { slug: "crossword-nature-science-3", label: "Nature & Science 3" },
    ],
  },
  {
    title: "Word Search",
    description: "Find hidden words in the letter grid.",
    iconName: "search",
    puzzles: [
      { slug: "word-search-nature-words", label: "Nature Words" },
      { slug: "word-search-kitchen-cooking", label: "Kitchen & Cooking" },
      { slug: "word-search-around-the-house", label: "Around the House" },
      { slug: "word-search-animals-1", label: "Animals 1" },
      { slug: "word-search-animals-2", label: "Animals 2" },
      { slug: "word-search-animals-3", label: "Animals 3" },
    ],
  },
  {
    title: "Sudoku",
    description: "Fill the 9×9 grid — every row, column, and box needs 1–9.",
    iconName: "hash",
    puzzles: [
      { slug: "sudoku-easy", label: "Easy" },
      { slug: "sudoku-medium", label: "Medium" },
      { slug: "sudoku-hard", label: "Hard" },
      { slug: "sudoku-challenge-1", label: "Challenge 1" },
      { slug: "sudoku-challenge-2", label: "Challenge 2" },
      { slug: "sudoku-challenge-3", label: "Challenge 3" },
    ],
  },
  {
    title: "Word Scramble",
    description: "Unscramble the jumbled letters to find real words.",
    iconName: "shuffle",
    puzzles: [
      { slug: "word-scramble-sheet-1", label: "Sheet 1 (Easy)" },
      { slug: "word-scramble-sheet-2", label: "Sheet 2 (Medium)" },
      { slug: "word-scramble-sheet-3", label: "Sheet 3 (Hard)" },
      { slug: "food-scramble-sheet-1", label: "Food 1–5" },
      { slug: "food-scramble-sheet-2", label: "Food 6–10" },
      { slug: "food-scramble-sheet-3", label: "Food 11–15" },
    ],
  },
  {
    title: "Riddles",
    description: "Classic riddles with hints — write your answers on the line.",
    iconName: "helpCircle",
    puzzles: [
      { slug: "riddles-sheet-1", label: "Riddles 1–5" },
      { slug: "riddles-sheet-2", label: "Riddles 6–10" },
      { slug: "riddles-sheet-3", label: "Riddles 11–15" },
      { slug: "riddles-sheet-4", label: "Riddles 16–20" },
      { slug: "nostalgia-riddles-sheet-1", label: "Nostalgia 1–5" },
      { slug: "nostalgia-riddles-sheet-2", label: "Nostalgia 6–10" },
      { slug: "nostalgia-riddles-sheet-3", label: "Nostalgia 11–15" },
      { slug: "nostalgia-riddles-sheet-4", label: "Nostalgia 16–20" },
    ],
  },
  {
    title: "Word Ladder",
    description: "Change one letter at a time to transform one word into another.",
    iconName: "footprints",
    puzzles: [
      { slug: "word-ladder-sheet-1", label: "Ladders 1–5" },
      { slug: "word-ladder-sheet-2", label: "Ladders 6–10" },
      { slug: "word-ladder-challenge-sheet-1", label: "Challenge 1–5" },
      { slug: "word-ladder-challenge-sheet-2", label: "Challenge 6–10" },
    ],
  },
  {
    title: "Cryptograms",
    description: "Crack the substitution cipher to reveal a famous quote.",
    iconName: "lock",
    puzzles: [
      { slug: "cryptogram-1", label: "Cryptogram 1" },
      { slug: "cryptogram-2", label: "Cryptogram 2" },
      { slug: "cryptogram-3", label: "Cryptogram 3" },
      { slug: "poetry-cryptogram-1", label: "Poetry 1" },
      { slug: "poetry-cryptogram-2", label: "Poetry 2" },
      { slug: "poetry-cryptogram-3", label: "Poetry 3" },
    ],
  },
  {
    title: "Logic Grid Puzzles",
    description: "Use clues and elimination to match every item in the grid.",
    iconName: "table",
    puzzles: [
      { slug: "logic-grid-1", label: "The Garden Club (Easy)" },
      { slug: "logic-grid-2", label: "Movie Night (Medium)" },
      { slug: "logic-grid-3", label: "The Bake Sale (Hard)" },
    ],
  },
  {
    title: "Mazes",
    description: "Find the path from start to finish through the maze.",
    iconName: "route",
    puzzles: [
      { slug: "maze-easy", label: "Easy" },
      { slug: "maze-medium", label: "Medium" },
      { slug: "maze-hard", label: "Hard" },
    ],
  },
];

export const printablePuzzleCount = printablePuzzleSections.reduce(
  (sum, s) => sum + s.puzzles.length,
  0,
);
