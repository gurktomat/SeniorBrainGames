# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# SeniorBrainGames.org

## Tech Stack
- Next.js with TypeScript
- Deployed on Vercel
- Tailwind CSS for styling

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

## Architecture
- /app — Next.js app router pages
- /components — Reusable React components
- /data — JSON quiz data files
- /lib — Utility functions and types

## Quiz Engine
- Quiz data lives in /src/data/ as JSON files (one per decade)
- Types defined in /src/lib/types.ts (Question, Quiz, QuizResult)
- Quiz registry in /src/lib/quizzes.ts — add new quizzes here
- QuizEngine component manages quiz state (current question, answers, results)
- Static params generated from quiz registry for /quiz/[id] routes

## Current Sprint
- Building initial quiz engine
- Creating nostalgia trivia content (1950s-1980s)
