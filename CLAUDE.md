# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# SeniorBrainGames.org

## Tech Stack
- Next.js 16 with TypeScript
- Self-hosted via nginx + PM2 (run `pm2 restart seniorbraingames` after `bun run build` to deploy)
- Tailwind CSS v4 for styling
- Google Fonts: Merriweather (headings) + Source Sans 3 (body)

## Commands
- `bun dev` — Start dev server (Turbopack)
- `bun run build` — Production build
- `bun run lint` — Run ESLint
- `bun test` — Run tests

## Conventions
- Use `bun` not `npm`
- Run `bun test` before committing
- Mobile-first responsive design
- Minimum 18px font size for accessibility
- WCAG AA contrast compliance required
- Use CSS variables from globals.css for colors (--color-primary, --color-secondary, etc.)
- Use Tailwind theme classes: text-primary, bg-surface, border-border, etc.
- Headings use Merriweather font via inline style: `style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}`

## Architecture
- /app — Next.js app router pages with 4 category routes
- /components — Reusable React components and game engines
- /data — JSON quiz/game data organized by category subdirectory
- /lib — Utility functions, types, quiz registry, and storage

## Game Categories & Routes (1569 games total)
- `/nostalgia-trivia` — 391 games (11 special + 380 quiz)
- `/general-knowledge` — 398 games (12 special + 386 quiz)
- `/word-games` — 390 games (22 special + 368 quiz)
- `/memory-games` — 390 games (22 special + 368 quiz)
- `/daily-challenge` — 5-question daily quiz (force-dynamic, localStorage tracking)

## Data Organization
- `/src/data/nostalgia-trivia/` — quiz + special game JSON files
- `/src/data/general-knowledge/` — quiz + special game JSON files
- `/src/data/word-games/` — quiz + special game JSON files
- `/src/data/memory-games/` — quiz + special game JSON files

## Game Engines
- `QuizEngine` — Standard multiple-choice quiz (used by all quiz-type games)
- `WordScrambleEngine` — Text input unscramble game
- `ProverbEngine` — Fill-in-the-blank proverb completion
- `SpellingBeeEngine` — Text input spelling game
- `WordAssociationEngine` — Multiple choice word grouping
- `MemoryCardEngine` — Emoji-based card flip matching (3 difficulty levels)
- `SpotDifferenceEngine` — Memorize-then-find-change game
- `WhatsMissingEngine` — Memorize-then-identify-missing game
- `PatternEngine` — Number/shape sequence completion
- `SortingEngine` — Tap-to-sort category assignment (reused for color-shape, decade, science sorting)
- `TimelineSortEngine` — Drag-to-sort chronological ordering (reused for nostalgia + history timeline)
- `TrueOrFalseEngine` — True/false statement game (reused for general-knowledge, nostalgia, grammar, memory)
- `WhoAmIEngine` — Progressive clue guessing (reused for who-am-i, nostalgia-who-am-i, what-am-i)
- `RiddleEngine` — Text input riddle solving
- `CrosswordEngine` — Crossword puzzle game
- `WordSearchEngine` — Word search grid game
- `HangmanEngine` — Classic hangman game
- `WordLadderEngine` — Step-by-step word transformation
- `CryptogramEngine` — Decode encrypted messages
- `SudokuEngine` — Sudoku puzzles
- `SlidingPuzzleEngine` — Tile sliding puzzle
- `SequenceMemoryEngine` — Color sequence recall
- `MatchingPairsEngine` — Left-right pair matching
- `MathChallengeEngine` — Arithmetic puzzles
- `NumberMemoryEngine` — Number sequence recall
- `EstimationEngine` — Numeric estimation with closeness scoring

## Adding New Games

### Quiz-type games (JSON only)
1. Create JSON in `/src/data/<category>/<slug>.json` with format: `{ id, title, description, gameCategory, questions: [...] }`
2. Import in the appropriate `src/lib/quizzes-<category>.ts` file, add to array
3. Add icon mapping in `src/lib/gameIcons.tsx`

### Special engine games
1. Create data JSON in `/src/data/<category>/<slug>.json`
2. If new engine needed, create in `/src/components/`
3. Import engine + data in `src/app/<category>/[slug]/page.tsx`, add metadata + switch case
4. Add to `specialGames` array in `src/app/<category>/page.tsx` (listing page)
5. Add slug to `specialGameSlugs` in `src/lib/quizzes.ts`
6. Add icon mapping in `src/lib/gameIcons.tsx`

## Key Files
- `src/lib/types.ts` — All TypeScript types (Question, Quiz, GameCategory, game-specific types)
- `src/lib/quizzes.ts` — Main quiz registry (exports getAllQuizzes, getQuizBySlug, getDailyChallenge, specialGameSlugs, categoryInfo)
- `src/lib/quizzes-nostalgia.ts` — Nostalgia trivia quiz imports and array
- `src/lib/quizzes-general.ts` — General knowledge quiz imports and array
- `src/lib/quizzes-word.ts` — Word games quiz imports and array
- `src/lib/quizzes-memory.ts` — Memory games quiz imports and array
- `src/lib/gameIcons.tsx` — Icon mapping for all game slugs + category colors
- `src/lib/storage.ts` — localStorage utilities for streaks and daily completion
- `src/app/globals.css` — Design system CSS variables and Tailwind theme
