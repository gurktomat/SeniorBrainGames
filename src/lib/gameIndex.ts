import { getAllQuizzes, categoryInfo } from "./quizzes";
import type { GameCategory } from "./types";

export interface GameEntry {
  id: string;
  title: string;
  description: string;
  category: GameCategory;
  categoryLabel: string;
  href: string;
}

const specialGames: { id: string; title: string; description: string; category: GameCategory }[] = [
  // Word Games (15)
  { id: "word-scramble", title: "Word Scramble", description: "Unscramble the letters to find the hidden word!", category: "word-games" },
  { id: "complete-the-proverb", title: "Complete the Proverb", description: "Can you finish these well-known proverbs and sayings?", category: "word-games" },
  { id: "spelling-bee", title: "Spelling Bee", description: "Test your spelling skills with commonly misspelled words!", category: "word-games" },
  { id: "word-association", title: "Word Association", description: "Find the word that connects the group!", category: "word-games" },
  { id: "crossword-classic", title: "Classic Crossword", description: "Solve classic crossword puzzles — fill the grid using the across and down clues!", category: "word-games" },
  { id: "word-search", title: "Word Search", description: "Find all the hidden words in the grid — look across and down!", category: "word-games" },
  { id: "hangman", title: "Hangman", description: "Guess the word one letter at a time before you run out of lives!", category: "word-games" },
  { id: "word-ladder", title: "Word Ladder", description: "Change one letter at a time to transform the start word into the end word!", category: "word-games" },
  { id: "cryptogram", title: "Cryptogram", description: "Decode the secret message by figuring out the letter substitutions!", category: "word-games" },
  { id: "anagram-challenge", title: "Anagram Challenge", description: "Unscramble themed anagram puzzles — each round has a different theme!", category: "word-games" },
  { id: "missing-vowels", title: "Missing Vowels", description: "The vowels have been removed — can you figure out the original phrase?", category: "word-games" },
  { id: "emoji-decoder", title: "Emoji Decoder", description: "Decode emoji sequences into movies, songs, and phrases!", category: "word-games" },
  { id: "riddle-challenge", title: "Riddle Challenge", description: "Can you solve these classic riddles? Type your answer and see if you're right!", category: "word-games" },
  { id: "famous-first-lines", title: "Famous First Lines", description: "Guess the book from its famous opening line!", category: "word-games" },
  { id: "grammar-true-or-false", title: "Grammar True or False", description: "Is this sentence grammatically correct? Test your grammar knowledge!", category: "word-games" },
  // Nostalgia Trivia (4)
  { id: "timeline-sort", title: "Timeline Sort", description: "Put historical events in the correct chronological order!", category: "nostalgia-trivia" },
  { id: "nostalgia-fact-or-fiction", title: "Nostalgia Fact or Fiction", description: "Can you tell which nostalgic facts from the 1950s–1980s are true and which are made up?", category: "nostalgia-trivia" },
  { id: "decade-sorting", title: "Decade Sorting", description: "Sort pop culture items into their correct decade!", category: "nostalgia-trivia" },
  { id: "nostalgia-who-am-i", title: "Nostalgia Who Am I?", description: "Guess the pop culture icon from progressive clues!", category: "nostalgia-trivia" },
  // General Knowledge (4)
  { id: "true-or-false", title: "True or False", description: "Test your knowledge — is this statement true or false?", category: "general-knowledge" },
  { id: "who-am-i", title: "Who Am I?", description: "Guess the famous person from progressive clues — fewer clues means more points!", category: "general-knowledge" },
  { id: "science-sorting", title: "Science Sorting", description: "Sort items into the correct science categories!", category: "general-knowledge" },
  { id: "history-timeline", title: "History Timeline", description: "Put world history events in the correct chronological order!", category: "general-knowledge" },
  // Memory Games (14)
  { id: "memory-card-match", title: "Memory Card Match", description: "Flip cards to find matching pairs! Test your memory with this classic game.", category: "memory-games" },
  { id: "spot-the-difference", title: "Spot the Difference", description: "Look carefully at the items, then spot what changed!", category: "memory-games" },
  { id: "whats-missing", title: "What's Missing?", description: "Study the items carefully, then figure out which one disappeared!", category: "memory-games" },
  { id: "pattern-recognition", title: "Pattern Recognition", description: "Find the pattern and choose what comes next in the sequence!", category: "memory-games" },
  { id: "color-shape-sorting", title: "Color & Shape Sorting", description: "Sort items into the correct categories as quickly as you can!", category: "memory-games" },
  { id: "sudoku-puzzles", title: "Sudoku", description: "Fill the grid so every row, column, and 3×3 box contains the numbers 1-9!", category: "memory-games" },
  { id: "sliding-puzzle", title: "Sliding Puzzle", description: "Slide the tiles into the correct order — a classic brain teaser!", category: "memory-games" },
  { id: "sequence-memory", title: "Sequence Memory", description: "Watch the colors light up, then repeat the sequence from memory!", category: "memory-games" },
  { id: "matching-pairs", title: "Matching Pairs", description: "Match each item on the left with its partner on the right!", category: "memory-games" },
  { id: "math-challenge", title: "Math Challenge", description: "Exercise your mental math skills with fun arithmetic puzzles!", category: "memory-games" },
  { id: "number-memory", title: "Number Memory", description: "Flash a number sequence, then recall it from memory!", category: "memory-games" },
  { id: "estimation-game", title: "Estimation Game", description: "How close can you guess? Test your estimation skills with fun number questions!", category: "memory-games" },
  { id: "memory-true-or-false", title: "Memory True or False", description: "Test what you know about the brain, memory, and psychology!", category: "memory-games" },
  { id: "what-am-i", title: "What Am I?", description: "Guess the everyday object from progressive clues — fewer clues means more points!", category: "memory-games" },
  { id: "minesweeper", title: "Minesweeper", description: "Classic mine-clearing puzzle — reveal all safe cells without hitting a mine!", category: "memory-games" },
];

export const allGames: GameEntry[] = [
  ...specialGames.map((g) => ({
    id: g.id,
    title: g.title,
    description: g.description,
    category: g.category,
    categoryLabel: categoryInfo[g.category].title,
    href: `/${g.category}/${g.id}`,
  })),
  ...getAllQuizzes().map((q) => ({
    id: q.id,
    title: q.title,
    description: q.description,
    category: q.gameCategory,
    categoryLabel: categoryInfo[q.gameCategory].title,
    href: `/${q.gameCategory}/${q.id}`,
  })),
];
