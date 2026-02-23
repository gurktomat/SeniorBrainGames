# SeniorBrainGames Full Redesign — Design Document

**Date**: 2026-02-23
**Approach**: Lumosity-Inspired Full Rebuild (Approach A)
**Vibe**: Playful & inviting, brain-training feel with gamification

---

## 1. Color Palette & Visual Identity

### Primary Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--primary` | `#7C5CFC` | Primary actions, nav accents, progress rings |
| `--primary-light` | `#A78BFA` | Hover states, backgrounds |
| `--primary-dark` | `#5B3FD9` | Active states, text on light |
| `--secondary` | `#2DD4BF` | Success, streaks, positive feedback |
| `--accent` | `#FF7A6E` | Badges, alerts, CTAs, daily challenge |
| `--accent-warm` | `#FBBF24` | Stars, achievements, gold badges |
| `--bg` | `#FAFAF8` | Page background |
| `--bg-dark` | `#0F0D1A` | Dark mode background |
| `--surface` | `#FFFFFF` | Cards, modals |
| `--surface-alt` | `#F3F0FF` | Secondary surfaces, section backgrounds |
| `--text` | `#1E1B2E` | Primary text |
| `--text-muted` | `#6B7280` | Secondary text |

### Category Colors

| Category | Color |
|----------|-------|
| Nostalgia Trivia | `#6366F1` (indigo) |
| General Knowledge | `#0EA5E9` (sky blue) |
| Word Games | `#F59E0B` (amber) |
| Memory Games | `#10B981` (emerald) |

### Typography

- **Headings**: Merriweather (serif)
- **Body**: Inter (replaces Source Sans 3)
- **Minimum size**: 18px (accessibility)
- **Accent/Labels**: Inter Semi-bold with letter-spacing

### Shape Language

- Cards: `border-radius: 12px`
- Buttons: `border-radius: 8px`
- Avatars/badges: `border-radius: full`
- Subtle gradient overlays on cards (5% opacity purple wash)

---

## 2. Navigation & Information Architecture

### Top Navigation (Desktop)

- Sticky, clean white surface (no glassmorphism)
- Left: Logo + wordmark
- Center: **Play** | **My Progress** | **Discover** | **Daily Challenge**
- Right: Streak flame + count, Search (Ctrl+K), Theme toggle, Account avatar

### Mobile Bottom Tab Bar

5 tabs: Play (Gamepad) | Progress (BarChart) | Daily (Calendar) | Discover (Compass) | More (Menu)

### Route Structure

| Route | Purpose |
|-------|---------|
| `/` | Personal dashboard (returning) / welcome (new visitor) |
| `/play` | Browse all categories with filters |
| `/play/[category]` | Category listing |
| `/play/[category]/[slug]` | Game page |
| `/progress` | Stats, achievements, badges, history |
| `/discover` | Curated collections, trending, editor's picks |
| `/daily-challenge` | Daily challenge (enhanced) |
| `/printable-puzzles` | Kept as-is |
| `/account` | Sign-up/login, settings, data export |

**SEO**: 301 redirects from old routes (`/nostalgia-trivia/...` → `/play/nostalgia-trivia/...`).

---

## 3. Homepage / Personal Dashboard

### New Visitor Onboarding (3 steps, skippable)

1. "What interests you?" — pick 1-4 categories (visual cards)
2. "How much time do you have?" — Quick (5 min) / Relaxed (15 min) / Deep Focus (30+)
3. "Welcome! Here's your dashboard"

Preferences stored in localStorage.

### Returning User Dashboard (top to bottom)

1. **Welcome Banner** — greeting, streak count with flame, daily challenge CTA
2. **Continue Playing** — horizontal scroll of recently played games with progress
3. **Recommended For You** — 4-card grid based on preferences + history
4. **Today's Stats Strip** — games played today, streak, best category, total played
5. **Quick Play by Category** — 2x2 grid of category cards with "play random" buttons
6. **Trending & Top Rated** — horizontal carousel from DB ratings
7. **Footer** — printables, about, FAQ, privacy, blog

### Key Details

- Dashboard loads from localStorage first (instant), hydrates with DB data if logged in
- "Surprise Me" floating action button persists
- Game completion triggers celebration animation before returning to dashboard

---

## 4. Game Pages & Completion Flow

### Pre-Game Screen

- Game title, category badge, difficulty dots, estimated time
- Best score (if played before)
- Large "Start Playing" button
- Expandable "How to Play" section

### During Game

- Minimal chrome: back arrow, game title (small), progress indicator
- Full-width game area, maximum focus
- Thin progress bar at top (category-colored)

### Game Completion Screen

- Celebration animation (confetti for good scores, encouragement for lower)
- Animated circular score ring
- Score breakdown: correct/total, time, improvement vs last attempt
- XP earned animation (+25 XP)
- Badges unlocked (if any, with shimmer)
- Streak update
- CTAs: "Play Again" (outline) | "Next Game" (primary) | "Back to Dashboard" (text)
- Collapsible "Review Answers" section below

---

## 5. Gamification System

### XP System

- Quiz: 10 XP base + score bonus (90%+=15, 70%+=10, 50%+=5)
- Special engine game: 15 XP base + same bonuses
- Daily challenge: 25 XP
- Perfect score: +10 XP bonus
- Level system: exponential curve (L1=0, L2=100, L3=250, ...)

### Streak System

- Any game played counts toward daily streak (not just daily challenge)
- Streak counter in nav (flame icon + number)
- Milestones: 3, 7, 14, 30, 100 days → badge unlocks
- Streak freeze: one free pass earned every 7-day streak (max 2 stored)

### Badges/Achievements

| Collection | Examples |
|-----------|---------|
| Getting Started | First Game, First Perfect, Tried All Categories |
| Consistency | 3/7/14/30/100-Day Streak |
| Category Master | 10/25/50 games in category, 80%+ avg |
| Challenge Seeker | 5/25/50 daily challenges |
| Explorer | 10 game types tried, played a printable |
| Perfectionist | 5/10/25 perfect scores |

Bronze/silver/gold tiers. Unearned shown as locked silhouettes.

### Progress Page (`/progress`)

1. Profile card — level, XP, XP-to-next progress bar, total games
2. Streak section — current, longest, activity heatmap (GitHub-style)
3. Category breakdown — 4 cards with games played, avg score, trend arrow
4. Badges grid — earned/locked states, progress toward next
5. Recent activity — timeline of last 10 games with scores

### Data Storage

- localStorage key: `sbg_progress`
- Structure: `{ xp, level, streaks, badges[], gamesPlayed[], preferences }`
- Optional Supabase sync on account creation
- Merge strategy: DB wins on conflicts

---

## 6. Discover Page & Browse Page

### Discover (`/discover`)

1. **Featured Collection Banner** — weekly rotating curated collection (5-8 games)
2. **Quick Collections Row** — "5-Minute Games", "Challenge Yourself", "New This Week", "Most Popular", "Hidden Gems"
3. **Trending Now** — 6-card grid, most played last 7 days
4. **Game of the Day** — single card, existing seed logic

### Browse/Play (`/play`)

1. **Filter Bar** (sticky) — category pills, sort (popular/rated/newest), type filter, difficulty filter
2. **Game Grid** — responsive 1→2→3 cols, cards with icon/title/category pill/difficulty/rating/play count
3. **Category Sub-pages** (`/play/[category]`) — filtered grid with hero banner + special games highlighted

### Collections Data Model

- `src/lib/collections.ts`
- `{ slug, title, description, emoji, games: string[], featured: boolean }`
- Featured rotates weekly via date seed

---

## 7. Account System & Dark Mode

### Optional Accounts

- Magic link email auth (Supabase Auth, no passwords)
- Account page: display name, sync toggle, data export, delete account, theme pref
- No-account: everything works via localStorage
- Dismissible "Save your progress" banner on progress page

### Dark Mode

- Background: `#0F0D1A` (deep purple-black)
- Surfaces: `#1A1726`
- Primary lightens to `#A78BFA` for contrast
- Card borders: `rgba(124, 92, 252, 0.15)`
- Teal/coral stay vibrant
- Celebration animations adapt colors

---

## Technical Notes

- Framework: Next.js 16 (App Router), kept as-is
- New dependency: `supabase-js` for optional auth
- New dependency: `framer-motion` for celebration animations & micro-interactions
- Font swap: Source Sans 3 → Inter (via next/font)
- All gamification state localStorage-first, DB-sync optional
- Existing game engines untouched (only wrapper/chrome changes)
- Existing rating system kept, enhanced with play count tracking
- Print system kept as-is
