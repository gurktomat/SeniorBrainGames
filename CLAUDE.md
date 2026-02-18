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

## Game Categories & Routes
- `/nostalgia-trivia` — 8 nostalgia quizzes (1950s-1980s)
- `/general-knowledge` — 8 general knowledge quizzes
- `/word-games` — 6 word games (scramble, proverbs, synonyms, definitions, spelling, association)
- `/memory-games` — 6 memory games (card match, spot difference, what's missing, patterns, picture quiz, sorting)
- `/daily-challenge` — 5-question daily quiz (force-dynamic, localStorage tracking)

## Data Organization
- `/src/data/nostalgia-trivia/` — 8 quiz JSON files
- `/src/data/general-knowledge/` — 8 quiz JSON files
- `/src/data/word-games/` — 6 game JSON files (mixed formats)
- `/src/data/memory-games/` — 6 game JSON files (mixed formats)

## Game Engines
- `QuizEngine` — Standard multiple-choice quiz (used by trivia, general knowledge, synonym, definition, picture quiz)
- `WordScrambleEngine` — Text input unscramble game
- `ProverbEngine` — Fill-in-the-blank proverb completion
- `SpellingBeeEngine` — Text input spelling game
- `WordAssociationEngine` — Multiple choice word grouping
- `MemoryCardEngine` — Emoji-based card flip matching (3 difficulty levels)
- `SpotDifferenceEngine` — Memorize-then-find-change game
- `WhatsMissingEngine` — Memorize-then-identify-missing game
- `PatternEngine` — Number/shape sequence completion
- `SortingEngine` — Tap-to-sort category assignment

## Key Files
- `src/lib/types.ts` — All TypeScript types (Question, Quiz, GameCategory, game-specific types)
- `src/lib/quizzes.ts` — Quiz registry with getQuizzesByCategory(), getQuizBySlug(), getDailyChallenge()
- `src/lib/storage.ts` — localStorage utilities for streaks and daily completion
- `src/app/globals.css` — Design system CSS variables and Tailwind theme
