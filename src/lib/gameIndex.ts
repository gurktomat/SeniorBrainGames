import { getAllQuizzes, categoryInfo } from "./quizzes";
import { getAllArticles } from "./blog";
import type { GameCategory } from "./types";

export interface GameEntry {
  id: string;
  title: string;
  description: string;
  category: GameCategory | "blog";
  categoryLabel: string;
  href: string;
  keywords?: string[];
}

const specialGames: { id: string; title: string; description: string; category: GameCategory; keywords?: string[] }[] = [
  // Word Games (15)
  { id: "word-scramble", title: "Word Scramble", description: "Unscramble the letters to find the hidden word!", category: "word-games", keywords: ["anagrams", "letters", "scrambled"] },
  { id: "complete-the-proverb", title: "Complete the Proverb", description: "Can you finish these well-known proverbs and sayings?", category: "word-games", keywords: ["sayings", "idioms", "phrases"] },
  { id: "spelling-bee", title: "Spelling Bee", description: "Test your spelling skills with commonly misspelled words!", category: "word-games", keywords: ["dictionary", "writing", "orthography"] },
  { id: "word-association", title: "Word Association", description: "Find the word that connects the group!", category: "word-games", keywords: ["synonyms", "relationships", "connections"] },
  { id: "crossword-classic", title: "Classic Crossword", description: "Solve classic crossword puzzles — fill the grid using the across and down clues!", category: "word-games", keywords: ["newspaper", "puzzle", "grids"] },
  { id: "word-search", title: "Word Search", description: "Find all the hidden words in the grid — look across and down!", category: "word-games", keywords: ["hidden", "grid", "letters"] },
  { id: "hangman", title: "Hangman", description: "Guess the word one letter at a time before you run out of lives!", category: "word-games", keywords: ["letters", "guessing", "alphabet"] },
  { id: "word-ladder", title: "Word Ladder", description: "Change one letter at a time to transform the start word into the end word!", category: "word-games", keywords: ["transformation", "steps", "progression"] },
  { id: "cryptogram", title: "Cryptogram", description: "Decode the secret message by figuring out the letter substitutions!", category: "word-games", keywords: ["secret code", "cipher", "encryption", "decoding"] },
  { id: "anagram-challenge", title: "Anagram Challenge", description: "Unscramble themed anagram puzzles — each round has a different theme!", category: "word-games", keywords: ["scramble", "letters", "unscramble"] },
  { id: "missing-vowels", title: "Missing Vowels", description: "The vowels have been removed — can you figure out the original phrase?", category: "word-games", keywords: ["vowels", "phrases", "guessing"] },
  { id: "emoji-decoder", title: "Emoji Decoder", description: "Decode emoji sequences into movies, songs, and phrases!", category: "word-games", keywords: ["symbols", "pictures", "visual"] },
  { id: "riddle-challenge", title: "Riddle Challenge", description: "Can you solve these classic riddles? Type your answer and see if you're right!", category: "word-games", keywords: ["logic", "puzzles", "brain teasers"] },
  { id: "famous-first-lines", title: "Famous First Lines", description: "Guess the book from its famous opening line!", category: "word-games", keywords: ["literature", "reading", "books", "authors"] },
  { id: "grammar-true-or-false", title: "Grammar True or False", description: "Is this sentence grammatically correct? Test your grammar knowledge!", category: "word-games", keywords: ["english", "writing", "sentences"] },
  // Nostalgia Trivia (4)
  { id: "timeline-sort", title: "Timeline Sort", description: "Put historical events in the correct chronological order!", category: "nostalgia-trivia", keywords: ["history", "dates", "events", "order"] },
  { id: "nostalgia-fact-or-fiction", title: "Nostalgia Fact or Fiction", description: "Can you tell which nostalgic facts from the 1950s–1980s are true and which are made up?", category: "nostalgia-trivia", keywords: ["facts", "history", "retro", "trivia"] },
  { id: "decade-sorting", title: "Decade Sorting", description: "Sort pop culture items into their correct decade!", category: "nostalgia-trivia", keywords: ["history", "years", "retro", "1950s", "1960s", "1970s", "1980s"] },
  { id: "nostalgia-who-am-i", title: "Nostalgia Who Am I?", description: "Guess the pop culture icon from progressive clues!", category: "nostalgia-trivia", keywords: ["famous people", "celebrities", "actors", "musicians"] },
  // General Knowledge (4)
  { id: "true-or-false", title: "True or False", description: "Test your knowledge — is this statement true or false?", category: "general-knowledge", keywords: ["facts", "trivia", "guessing"] },
  { id: "who-am-i", title: "Who Am I?", description: "Guess the famous person from progressive clues — fewer clues means more points!", category: "general-knowledge", keywords: ["history", "biography", "celebrities"] },
  { id: "science-sorting", title: "Science Sorting", description: "Sort items into the correct science categories!", category: "general-knowledge", keywords: ["biology", "chemistry", "physics", "nature"] },
  { id: "history-timeline", title: "History Timeline", description: "Put world history events in the correct chronological order!", category: "general-knowledge", keywords: ["dates", "events", "civilization"] },
  // Memory Games (14)
  { id: "memory-card-match", title: "Memory Card Match", description: "Flip cards to find matching pairs! Test your memory with this classic game.", category: "memory-games", keywords: ["concentration", "pairs", "cards", "matching"] },
  { id: "spot-the-difference", title: "Spot the Difference", description: "Look carefully at the items, then spot what changed!", category: "memory-games", keywords: ["observation", "visual", "details"] },
  { id: "whats-missing", title: "What's Missing?", description: "Study the items carefully, then figure out which one disappeared!", category: "memory-games", keywords: ["observation", "memory", "visual"] },
  { id: "pattern-recognition", title: "Pattern Recognition", description: "Find the pattern and choose what comes next in the sequence!", category: "memory-games", keywords: ["logic", "sequences", "shapes", "numbers"] },
  { id: "color-shape-sorting", title: "Color & Shape Sorting", description: "Sort items into the correct categories as quickly as you can!", category: "memory-games", keywords: ["visual", "sorting", "categories", "colors"] },
  { id: "sudoku-puzzles", title: "Sudoku", description: "Fill the grid so every row, column, and 3×3 box contains the numbers 1-9!", category: "memory-games", keywords: ["logic", "numbers", "math", "grid"] },
  { id: "sliding-puzzle", title: "Sliding Puzzle", description: "Slide the tiles into the correct order — a classic brain teaser!", category: "memory-games", keywords: ["tiles", "order", "shuffling", "numbers"] },
  { id: "sequence-memory", title: "Sequence Memory", description: "Watch the colors light up, then repeat the sequence from memory!", category: "memory-games", keywords: ["pattern", "simon says", "colors", "recall"] },
  { id: "matching-pairs", title: "Matching Pairs", description: "Match each item on the left with its partner on the right!", category: "memory-games", keywords: ["pairs", "connections", "relationships"] },
  { id: "math-challenge", title: "Math Challenge", description: "Exercise your mental math skills with fun arithmetic puzzles!", category: "memory-games", keywords: ["arithmetic", "numbers", "calculations", "addition", "subtraction"] },
  { id: "number-memory", title: "Number Memory", description: "Flash a number sequence, then recall it from memory!", category: "memory-games", keywords: ["digits", "recall", "short-term memory"] },
  { id: "estimation-game", title: "Estimation Game", description: "How close can you guess? Test your estimation skills with fun number questions!", category: "memory-games", keywords: ["guessing", "numbers", "approximations"] },
  { id: "memory-true-or-false", title: "Memory True or False", description: "Test what you know about the brain, memory, and psychology!", category: "memory-games", keywords: ["brain facts", "psychology", "biology"] },
  { id: "what-am-i", title: "What Am I?", description: "Guess the everyday object from progressive clues — fewer clues means more points!", category: "memory-games", keywords: ["objects", "riddles", "guessing"] },
  { id: "minesweeper", title: "Minesweeper", description: "Classic mine-clearing puzzle — reveal all safe cells without hitting a mine!", category: "memory-games", keywords: ["logic", "strategy", "grid"] },
  // Batch 13 — 25 new games
  // Word Games (5)
  { id: "crossword-nature-science", title: "Nature & Science Crossword", description: "Solve crossword puzzles themed around nature and science!", category: "word-games", keywords: ["biology", "animals", "plants", "grid"] },
  { id: "word-search-animals", title: "Animal Word Search", description: "Find animal names hidden in the grid!", category: "word-games", keywords: ["nature", "wildlife", "hidden"] },
  { id: "food-word-scramble", title: "Food Word Scramble", description: "Unscramble the letters to find the food or cooking word!", category: "word-games", keywords: ["cooking", "kitchen", "ingredients"] },
  { id: "cryptogram-poetry", title: "Poetry Cryptogram", description: "Decode famous poetry lines by figuring out the letter substitutions!", category: "word-games", keywords: ["literature", "quotes", "rhymes"] },
  { id: "word-ladder-challenge", title: "Word Ladder Challenge", description: "Change one letter at a time to climb from the start word to the end word!", category: "word-games", keywords: ["transformation", "steps", "progression"] },
  // Nostalgia Trivia (7)
  { id: "nostalgia-hangman", title: "Nostalgia Hangman", description: "Guess classic TV shows, movies, and songs one letter at a time!", category: "nostalgia-trivia", keywords: ["guessing", "entertainment", "vintage"] },
  { id: "nostalgia-riddles", title: "Nostalgia Riddles", description: "Can you solve these riddles about retro items and events?", category: "nostalgia-trivia", keywords: ["retro", "vintage", "brain teasers"] },
  { id: "vintage-spelling-bee", title: "Vintage Spelling Bee", description: "Spell these vintage and retro words correctly!", category: "nostalgia-trivia", keywords: ["letters", "dictionary", "writing"] },
  { id: "old-time-sayings", title: "Old-Time Sayings", description: "Complete these classic old-time proverbs and sayings!", category: "nostalgia-trivia", keywords: ["proverbs", "idioms", "phrases"] },
  { id: "retro-word-association", title: "Retro Word Association", description: "Find the word that connects the retro-themed group!", category: "nostalgia-trivia", keywords: ["relationships", "connections", "synonyms"] },
  { id: "nostalgia-matching", title: "Nostalgia Matching", description: "Match classic actors to their shows, songs to their artists, and more!", category: "nostalgia-trivia", keywords: ["pairs", "entertainment", "vintage"] },
  { id: "nostalgia-estimation", title: "Nostalgia Estimation", description: "How close can you guess? Test your knowledge of nostalgia facts and figures!", category: "nostalgia-trivia", keywords: ["guessing", "numbers", "dates"] },
  // General Knowledge (7)
  { id: "science-true-or-false", title: "Science True or False", description: "Is this science fact true or false? Test your scientific knowledge!", category: "general-knowledge", keywords: ["biology", "nature", "physics", "chemistry"] },
  { id: "what-in-the-world", title: "What in the World?", description: "Guess the famous landmark or place from progressive clues!", category: "general-knowledge", keywords: ["geography", "travel", "landmarks", "places"] },
  { id: "inventions-timeline", title: "Inventions Timeline", description: "Put great inventions in the correct chronological order!", category: "general-knowledge", keywords: ["history", "dates", "technology"] },
  { id: "animal-kingdom-sorting", title: "Animal Kingdom Sorting", description: "Sort animals into the correct categories!", category: "general-knowledge", keywords: ["nature", "biology", "zoology"] },
  { id: "mental-math", title: "Mental Math", description: "Challenge your mental arithmetic skills!", category: "general-knowledge", keywords: ["arithmetic", "numbers", "addition", "subtraction"] },
  { id: "logic-patterns", title: "Logic Patterns", description: "Find the pattern and choose what comes next in the sequence!", category: "general-knowledge", keywords: ["sequences", "shapes", "numbers"] },
  { id: "observation-challenge", title: "Observation Challenge", description: "Study the items carefully, then spot what changed!", category: "general-knowledge", keywords: ["visual", "details", "changes"] },
  // Memory Games (6)
  { id: "nature-card-match", title: "Nature Card Match", description: "Match nature-themed cards by flipping pairs!", category: "memory-games", keywords: ["biology", "plants", "animals", "cards"] },
  { id: "color-sequence-challenge", title: "Color Sequence Challenge", description: "Watch the colors flash, then repeat the sequence from memory!", category: "memory-games", keywords: ["recall", "colors", "pattern"] },
  { id: "number-recall-challenge", title: "Number Recall Challenge", description: "Flash a number sequence, then recall it from memory!", category: "memory-games", keywords: ["digits", "recall", "short-term memory"] },
  { id: "whats-changed", title: "What's Changed?", description: "Study the items carefully, then figure out which one disappeared!", category: "memory-games", keywords: ["observation", "memory", "visual"] },
  { id: "sudoku-challenge", title: "Sudoku Challenge", description: "Fill the grid so every row, column, and 3×3 box contains 1-9!", category: "memory-games", keywords: ["numbers", "logic", "grid"] },
  { id: "sliding-puzzle-challenge", title: "Sliding Puzzle Challenge", description: "Slide the numbered tiles into the correct order!", category: "memory-games", keywords: ["tiles", "numbers", "order"] },
  // Batch 14 — 4 new special games
  { id: "history-spelling-bee", title: "History Spelling Bee", description: "Spell historical terms, famous names, and landmark words correctly!", category: "word-games", keywords: ["dates", "events", "civilization", "letters"] },
  { id: "word-search-travel", title: "Travel Word Search", description: "Find travel and geography words hidden in the grid!", category: "word-games", keywords: ["places", "landmarks", "destinations"] },
  { id: "geography-sorting", title: "Geography Sorting", description: "Sort countries, cities, and landmarks into their correct continents and regions!", category: "general-knowledge", keywords: ["maps", "places", "travel", "locations"] },
  { id: "famous-pairs-matching", title: "Famous Pairs Matching", description: "Match famous duos, partners, and sidekicks from TV, music, and history!", category: "memory-games", keywords: ["pairs", "entertainment", "history", "vintage"] },
  { id: "classic-hollywood-leading-ladies", title: "Classic Hollywood Leading Ladies", description: "How well do you remember the silver screen's most iconic actresses? Audrey, Marilyn, and more!", category: "nostalgia-trivia", keywords: ["actresses", "movies", "stars", "silver screen", "cinema"] },
  { id: "greatest-crooners", title: "Greatest Crooners of the 20th Century", description: "Golden voices of Frank Sinatra, Dean Martin, and the crooning era!", category: "nostalgia-trivia", keywords: ["singers", "music", "sinatra", "vocals", "standard"] },
  { id: "wonders-of-the-world", title: "Wonders of the World", description: "How well do you know the world's most famous landmarks and ancient wonders?", category: "general-knowledge", keywords: ["geography", "landmarks", "history", "monuments", "travel"] },
];

export const allGames: GameEntry[] = [
  ...specialGames.map((g) => ({
    id: g.id,
    title: g.title,
    description: g.description,
    category: g.category,
    categoryLabel: categoryInfo[g.category].title,
    href: `/${g.category}/${g.id}`,
    keywords: g.keywords,
  })),
  ...getAllQuizzes().map((q) => ({
    id: q.id,
    title: q.title,
    description: q.description,
    category: q.gameCategory,
    categoryLabel: categoryInfo[q.gameCategory].title,
    href: `/${q.gameCategory}/${q.id}`,
  })),
  ...getAllArticles().map((a) => ({
    id: a.slug,
    title: a.title,
    description: a.description,
    category: "blog" as const,
    categoryLabel: "Blog",
    href: `/blog/${a.slug}`,
  })),
];
