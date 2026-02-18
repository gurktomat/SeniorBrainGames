// Game category types
export type GameCategory =
  | "nostalgia-trivia"
  | "general-knowledge"
  | "word-games"
  | "memory-games";

export type Decade = "1940s" | "1950s" | "1960s" | "1970s" | "1980s";

export type QuestionCategory =
  | "music"
  | "movies"
  | "tv"
  | "history"
  | "culture"
  | "science"
  | "geography"
  | "food"
  | "nature"
  | "health"
  | "language"
  | "memory"
  | "visual";

export type Difficulty = "easy" | "medium" | "hard";

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  hint?: string;
  explanation?: string;
  difficulty?: Difficulty;
  tags?: string[];
  decade?: Decade;
  category?: QuestionCategory;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  gameCategory: GameCategory;
  questions: Question[];
}

export interface QuizResult {
  quizId: string;
  totalQuestions: number;
  correctAnswers: number;
  answers: { questionId: string; selectedAnswer: number; correct: boolean }[];
}

// Word Games types
export interface WordScramblePuzzle {
  id: string;
  scrambled: string;
  answer: string;
  hint: string;
  difficulty: Difficulty;
}

export interface WordScrambleGame {
  id: string;
  title: string;
  description: string;
  gameCategory: "word-games";
  puzzles: WordScramblePuzzle[];
}

export interface ProverbQuestion {
  id: string;
  proverb: string;
  blank: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface ProverbGame {
  id: string;
  title: string;
  description: string;
  gameCategory: "word-games";
  questions: ProverbQuestion[];
}

export interface SpellingWord {
  id: string;
  word: string;
  definition: string;
  hint: string;
  difficulty: Difficulty;
}

export interface SpellingBeeGame {
  id: string;
  title: string;
  description: string;
  gameCategory: "word-games";
  words: SpellingWord[];
}

export interface WordAssociationPuzzle {
  id: string;
  words: string[];
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface WordAssociationGame {
  id: string;
  title: string;
  description: string;
  gameCategory: "word-games";
  puzzles: WordAssociationPuzzle[];
}

// Memory Games types
export interface MemoryCardGame {
  id: string;
  title: string;
  description: string;
  gameCategory: "memory-games";
  pairs: { emoji: string; label: string }[];
  gridSize: "small" | "medium" | "large";
}

export interface SpotDifferenceGame {
  id: string;
  title: string;
  description: string;
  gameCategory: "memory-games";
  rounds: {
    id: string;
    items: string[];
    changed: string[];
    hint?: string;
  }[];
}

export interface WhatsMissingGame {
  id: string;
  title: string;
  description: string;
  gameCategory: "memory-games";
  rounds: {
    id: string;
    items: string[];
    missingIndex: number;
    options: string[];
    correctAnswer: number;
  }[];
}

export interface PatternPuzzle {
  id: string;
  sequence: string[];
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface PatternGame {
  id: string;
  title: string;
  description: string;
  gameCategory: "memory-games";
  puzzles: PatternPuzzle[];
}

export interface SortingRound {
  id: string;
  items: { label: string; emoji: string }[];
  categories: string[];
  correctMapping: number[];
}

export interface SortingGame {
  id: string;
  title: string;
  description: string;
  gameCategory: "memory-games";
  rounds: SortingRound[];
}

// Crossword types
export type CrosswordDirection = "across" | "down";

export interface CrosswordClue {
  number: number;
  direction: CrosswordDirection;
  clue: string;
}

export interface CrosswordPuzzle {
  id: string;
  title: string;
  description: string;
  gameCategory: "word-games";
  gameType: "crossword";
  rows: number;
  cols: number;
  /** Array of strings, one per row. "#" = black cell, A-Z = solution letter */
  grid: string[];
  clues: CrosswordClue[];
}

// Union type for all game data
export type GameData =
  | Quiz
  | WordScrambleGame
  | ProverbGame
  | SpellingBeeGame
  | WordAssociationGame
  | MemoryCardGame
  | SpotDifferenceGame
  | WhatsMissingGame
  | PatternGame
  | SortingGame
  | CrosswordPuzzle;
