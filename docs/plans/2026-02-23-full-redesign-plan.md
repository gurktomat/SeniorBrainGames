# SeniorBrainGames Full Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform SeniorBrainGames from a content-first brain games site into a personalized, gamified brain training platform with Lumosity-inspired design.

**Architecture:** Incremental migration — new design tokens + data layer first, then page-by-page rebuilds. Existing game engines stay untouched; only their wrapper chrome changes. Route migration with 301 redirects preserves SEO.

**Tech Stack:** Next.js 16 (App Router), Tailwind CSS v4, Inter font (replaces Source Sans 3), framer-motion (animations), Supabase Auth (optional accounts), PostgreSQL (existing), localStorage (gamification state)

**Design doc:** `docs/plans/2026-02-23-full-redesign-design.md`

---

## Phase 1: Foundation

### Task 1: Install Dependencies & Swap Fonts

**Files:**
- Modify: `package.json`
- Modify: `src/app/layout.tsx`

**Step 1: Install new dependencies**

Run: `cd /home/gurktomat/SeniorBrainGames && bun add framer-motion @supabase/supabase-js`

**Step 2: Swap Source Sans 3 → Inter in layout.tsx**

In `src/app/layout.tsx`, replace the Source_Sans_3 import and config:

```tsx
// Replace:
import { Source_Sans_3, Merriweather } from "next/font/google";
const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

// With:
import { Inter, Merriweather } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});
```

Update the body className to use `inter.variable` instead of `sourceSans.variable`.

**Step 3: Verify build**

Run: `bun run build`
Expected: Build succeeds with no errors.

**Step 4: Commit**

```bash
git add package.json bun.lockb src/app/layout.tsx
git commit -m "feat: install framer-motion + supabase, swap Source Sans 3 → Inter"
```

---

### Task 2: Update Design Tokens (CSS Variables)

**Files:**
- Modify: `src/app/globals.css`

**Step 1: Replace color variables in `:root` block**

Replace ALL color-related CSS variables in the `:root` selector with the new palette:

```css
:root {
  /* Primary palette */
  --color-primary: #7C5CFC;
  --color-primary-light: #A78BFA;
  --color-primary-dark: #5B3FD9;
  --color-secondary: #2DD4BF;
  --color-accent: #FF7A6E;
  --color-accent-warm: #FBBF24;

  /* Backgrounds */
  --color-background: #FAFAF8;
  --color-surface: #FFFFFF;
  --color-surface-alt: #F3F0FF;

  /* Text */
  --color-text: #1E1B2E;
  --color-text-muted: #6B7280;
  --color-text-light: #9CA3AF;

  /* Semantic */
  --color-success: #10B981;
  --color-error: #EF4444;
  --color-warning: #F59E0B;
  --color-info: #0EA5E9;

  /* Borders */
  --color-border: #E5E7EB;
  --color-border-light: #F3F4F6;

  /* Category colors */
  --color-cat-nostalgia: #6366F1;
  --color-cat-general: #0EA5E9;
  --color-cat-word: #F59E0B;
  --color-cat-memory: #10B981;

  /* Gradients */
  --gradient-primary: linear-gradient(135deg, #7C5CFC 0%, #A78BFA 100%);
  --gradient-hero: linear-gradient(135deg, #7C5CFC 0%, #A78BFA 50%, #2DD4BF 100%);
  --gradient-warm: linear-gradient(180deg, #FAFAF8 0%, #F3F0FF 100%);
  --gradient-card: linear-gradient(180deg, #FFFFFF 0%, #FAFAF8 100%);

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(124, 92, 252, 0.06);
  --shadow-md: 0 4px 12px rgba(124, 92, 252, 0.08);
  --shadow-lg: 0 8px 24px rgba(124, 92, 252, 0.12);
  --shadow-xl: 0 16px 48px rgba(124, 92, 252, 0.16);

  /* Shape */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-full: 9999px;
}
```

**Step 2: Update dark mode variables**

Replace the `.dark` selector variables:

```css
.dark {
  --color-primary: #A78BFA;
  --color-primary-light: #C4B5FD;
  --color-primary-dark: #7C5CFC;
  --color-secondary: #2DD4BF;
  --color-accent: #FF7A6E;
  --color-accent-warm: #FBBF24;

  --color-background: #0F0D1A;
  --color-surface: #1A1726;
  --color-surface-alt: #231F33;

  --color-text: #F1F0F7;
  --color-text-muted: #9CA3AF;
  --color-text-light: #6B7280;

  --color-border: rgba(124, 92, 252, 0.15);
  --color-border-light: rgba(124, 92, 252, 0.08);

  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.5);
  --shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.6);
}
```

**Step 3: Update Tailwind `@theme inline` block**

Map the new CSS variables into Tailwind theme tokens (update the existing `@theme inline` block to reference the new variable names).

**Step 4: Remove old gradient classes and enterprise card styles**

Remove `.card-enterprise`, `.glass-nav`, `.hero-gradient`, and the old gradient definitions. Replace with new utility classes:

```css
.card-playful {
  background: var(--gradient-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-playful:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}
```

**Step 5: Update category colors in gameIcons.tsx**

In `src/lib/gameIcons.tsx`, update the `categoryColors` object:

```tsx
export const categoryColors: Record<string, string> = {
  "nostalgia-trivia": "#6366F1",
  "general-knowledge": "#0EA5E9",
  "word-games": "#F59E0B",
  "memory-games": "#10B981",
};
```

**Step 6: Verify build**

Run: `bun run build`

**Step 7: Commit**

```bash
git add src/app/globals.css src/lib/gameIcons.tsx
git commit -m "feat: replace design tokens with Lumosity-inspired palette"
```

---

## Phase 2: Gamification Data Layer

### Task 3: Create Progress Types

**Files:**
- Create: `src/lib/progress/types.ts`

**Step 1: Define all gamification types**

```typescript
export interface GamePlayRecord {
  slug: string;
  category: string;
  score: number;       // percentage 0-100
  totalQuestions: number;
  correctAnswers: number;
  playedAt: string;    // ISO date
  timeSpentMs: number;
  isDaily: boolean;
  isPerfect: boolean;
}

export interface StreakData {
  current: number;
  longest: number;
  lastPlayedDate: string; // YYYY-MM-DD
  freezesAvailable: number;
  freezeUsedDate: string | null;
}

export type BadgeId = string; // e.g. "first-game", "streak-7", "category-master-word-bronze"

export type BadgeTier = "bronze" | "silver" | "gold";

export interface Badge {
  id: BadgeId;
  name: string;
  description: string;
  collection: BadgeCollection;
  tier: BadgeTier;
  icon: string; // emoji or icon name
  unlockedAt: string | null; // ISO date, null = locked
}

export type BadgeCollection =
  | "getting-started"
  | "consistency"
  | "category-master"
  | "challenge-seeker"
  | "explorer"
  | "perfectionist";

export interface UserPreferences {
  favoriteCategories: string[];
  sessionLength: "quick" | "relaxed" | "deep-focus";
  onboardingComplete: boolean;
}

export interface ProgressState {
  xp: number;
  level: number;
  streaks: StreakData;
  badges: BadgeId[];       // earned badge IDs
  gamesPlayed: GamePlayRecord[];
  preferences: UserPreferences;
  dailyChallengesCompleted: number;
  createdAt: string;
  lastUpdatedAt: string;
}

export interface XPGain {
  base: number;
  scoreBonus: number;
  perfectBonus: number;
  dailyBonus: number;
  total: number;
}

export interface LevelInfo {
  level: number;
  currentXP: number;
  xpForCurrentLevel: number;
  xpForNextLevel: number;
  progressPercent: number;
}
```

**Step 2: Commit**

```bash
git add src/lib/progress/types.ts
git commit -m "feat: add gamification type definitions"
```

---

### Task 4: Create XP & Level Calculation Utilities

**Files:**
- Create: `src/lib/progress/xp.ts`
- Create: `src/lib/progress/xp.test.ts`

**Step 1: Write failing tests**

```typescript
// src/lib/progress/xp.test.ts
import { describe, it, expect } from "bun:test";
import { calculateXP, getLevelInfo, getXPForLevel } from "./xp";

describe("calculateXP", () => {
  it("gives 10 base XP for quiz completion", () => {
    const result = calculateXP({ score: 40, isSpecial: false, isDaily: false });
    expect(result.base).toBe(10);
    expect(result.total).toBe(10);
  });

  it("gives 15 base XP for special game completion", () => {
    const result = calculateXP({ score: 40, isSpecial: true, isDaily: false });
    expect(result.base).toBe(15);
  });

  it("gives 25 base XP for daily challenge", () => {
    const result = calculateXP({ score: 40, isSpecial: false, isDaily: true });
    expect(result.dailyBonus).toBe(25);
  });

  it("gives score bonus for 50%+", () => {
    const result = calculateXP({ score: 55, isSpecial: false, isDaily: false });
    expect(result.scoreBonus).toBe(5);
  });

  it("gives score bonus for 70%+", () => {
    const result = calculateXP({ score: 75, isSpecial: false, isDaily: false });
    expect(result.scoreBonus).toBe(10);
  });

  it("gives score bonus for 90%+", () => {
    const result = calculateXP({ score: 95, isSpecial: false, isDaily: false });
    expect(result.scoreBonus).toBe(15);
  });

  it("gives perfect score bonus for 100%", () => {
    const result = calculateXP({ score: 100, isSpecial: false, isDaily: false });
    expect(result.perfectBonus).toBe(10);
    expect(result.total).toBe(10 + 15 + 10); // base + 90%+ bonus + perfect
  });
});

describe("getLevelInfo", () => {
  it("returns level 1 for 0 XP", () => {
    const info = getLevelInfo(0);
    expect(info.level).toBe(1);
    expect(info.progressPercent).toBe(0);
  });

  it("returns level 2 for 100 XP", () => {
    const info = getLevelInfo(100);
    expect(info.level).toBe(2);
  });

  it("shows correct progress within a level", () => {
    const info = getLevelInfo(50);
    expect(info.level).toBe(1);
    expect(info.progressPercent).toBe(50); // 50/100 = 50%
  });
});
```

**Step 2: Run tests to verify they fail**

Run: `cd /home/gurktomat/SeniorBrainGames && bun test src/lib/progress/xp.test.ts`
Expected: FAIL — module not found

**Step 3: Implement XP calculations**

```typescript
// src/lib/progress/xp.ts
import type { XPGain, LevelInfo } from "./types";

interface CalculateXPInput {
  score: number;       // 0-100 percentage
  isSpecial: boolean;
  isDaily: boolean;
}

export function calculateXP({ score, isSpecial, isDaily }: CalculateXPInput): XPGain {
  const base = isSpecial ? 15 : 10;
  const scoreBonus = score >= 90 ? 15 : score >= 70 ? 10 : score >= 50 ? 5 : 0;
  const perfectBonus = score === 100 ? 10 : 0;
  const dailyBonus = isDaily ? 25 : 0;

  return {
    base,
    scoreBonus,
    perfectBonus,
    dailyBonus,
    total: base + scoreBonus + perfectBonus + dailyBonus,
  };
}

// XP thresholds: Level N requires sum of (N-1) * 100 + ((N-1)*(N-2)/2) * 50
// Simplified: L1=0, L2=100, L3=250, L4=450, L5=700, ...
const LEVEL_THRESHOLDS: number[] = [];
(function buildThresholds() {
  let total = 0;
  LEVEL_THRESHOLDS.push(0); // Level 1
  for (let i = 1; i <= 100; i++) {
    total += 100 + (i - 1) * 50;
    LEVEL_THRESHOLDS.push(total);
  }
})();

export function getXPForLevel(level: number): number {
  return LEVEL_THRESHOLDS[level - 1] ?? Infinity;
}

export function getLevelInfo(xp: number): LevelInfo {
  let level = 1;
  for (let i = 1; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i]) {
      level = i + 1;
    } else {
      break;
    }
  }

  const xpForCurrentLevel = LEVEL_THRESHOLDS[level - 1] ?? 0;
  const xpForNextLevel = LEVEL_THRESHOLDS[level] ?? xpForCurrentLevel + 1000;
  const xpInLevel = xp - xpForCurrentLevel;
  const xpNeeded = xpForNextLevel - xpForCurrentLevel;
  const progressPercent = Math.round((xpInLevel / xpNeeded) * 100);

  return {
    level,
    currentXP: xp,
    xpForCurrentLevel,
    xpForNextLevel,
    progressPercent,
  };
}
```

**Step 4: Run tests**

Run: `bun test src/lib/progress/xp.test.ts`
Expected: All tests PASS.

**Step 5: Commit**

```bash
git add src/lib/progress/xp.ts src/lib/progress/xp.test.ts
git commit -m "feat: add XP calculation and level system with tests"
```

---

### Task 5: Create Badge Definitions & Checker

**Files:**
- Create: `src/lib/progress/badges.ts`
- Create: `src/lib/progress/badges.test.ts`

**Step 1: Write failing tests for badge checking**

Test key badge scenarios: first game, streak milestones, category mastery, perfect scores.

**Step 2: Implement badge definitions**

Define all badges as a constant array with their unlock conditions. Create a `checkNewBadges(state: ProgressState): BadgeId[]` function that compares current state against all badge conditions and returns newly earned badge IDs.

Badge conditions to implement:
- `first-game`: gamesPlayed.length >= 1
- `first-perfect`: any game with score === 100
- `tried-all-categories`: played at least 1 game in each of 4 categories
- `streak-3`, `streak-7`, `streak-14`, `streak-30`, `streak-100`: current streak >= N
- `category-{cat}-{tier}`: 10 (bronze), 25 (silver), 50 (gold) games in category
- `daily-5`, `daily-25`, `daily-50`: dailyChallengesCompleted >= N
- `explorer-10`: 10+ unique game types tried
- `perfect-5`, `perfect-10`, `perfect-25`: N+ perfect scores

**Step 3: Run tests, verify pass**

**Step 4: Commit**

```bash
git add src/lib/progress/badges.ts src/lib/progress/badges.test.ts
git commit -m "feat: add badge definitions and unlock checker"
```

---

### Task 6: Create Progress Store (localStorage Manager)

**Files:**
- Create: `src/lib/progress/store.ts`
- Create: `src/lib/progress/store.test.ts`
- Modify: `src/lib/storage.ts` (migrate old keys)

**Step 1: Write failing tests**

Test: `getProgress()` returns default state, `recordGamePlay()` adds entry + updates XP + checks badges, `updateStreak()` handles day transitions + freeze logic.

**Step 2: Implement the store**

```typescript
// src/lib/progress/store.ts
import type { ProgressState, GamePlayRecord } from "./types";
import { calculateXP, getLevelInfo } from "./xp";
import { checkNewBadges } from "./badges";

const STORAGE_KEY = "sbg_progress";

const DEFAULT_STATE: ProgressState = {
  xp: 0,
  level: 1,
  streaks: {
    current: 0,
    longest: 0,
    lastPlayedDate: "",
    freezesAvailable: 0,
    freezeUsedDate: null,
  },
  badges: [],
  gamesPlayed: [],
  preferences: {
    favoriteCategories: [],
    sessionLength: "relaxed",
    onboardingComplete: false,
  },
  dailyChallengesCompleted: 0,
  createdAt: new Date().toISOString(),
  lastUpdatedAt: new Date().toISOString(),
};

export function getProgress(): ProgressState { ... }
export function saveProgress(state: ProgressState): void { ... }
export function recordGamePlay(record: Omit<GamePlayRecord, "playedAt">): {
  state: ProgressState;
  xpGained: XPGain;
  newBadges: BadgeId[];
  streakUpdated: boolean;
  leveledUp: boolean;
} { ... }
export function migrateOldStorage(): void { ... } // reads old sbg-streak, sbg-daily-completed keys
```

The `recordGamePlay` function is the main integration point — it:
1. Adds the play record
2. Calculates + adds XP
3. Updates level via `getLevelInfo()`
4. Updates streak (checks date vs lastPlayedDate)
5. Awards streak freezes every 7-day milestone
6. Checks for new badges
7. Saves to localStorage
8. Returns summary for UI animations

**Step 3: Add migration from old storage format**

Read existing `sbg-streak` and `sbg-daily-completed` localStorage keys, convert to new format, write to `sbg_progress`, delete old keys. Call this on first load.

**Step 4: Run tests**

**Step 5: Commit**

```bash
git add src/lib/progress/
git commit -m "feat: add progress store with localStorage persistence"
```

---

### Task 7: Create Progress React Context

**Files:**
- Create: `src/lib/progress/ProgressProvider.tsx`
- Create: `src/lib/progress/useProgress.ts`

**Step 1: Create the context provider**

```tsx
// src/lib/progress/ProgressProvider.tsx
"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { ProgressState, GamePlayRecord } from "./types";
import type { XPGain, BadgeId } from "./types";
import { getProgress, recordGamePlay, migrateOldStorage } from "./store";

interface ProgressContextType {
  progress: ProgressState;
  recordPlay: (record: Omit<GamePlayRecord, "playedAt">) => {
    xpGained: XPGain;
    newBadges: BadgeId[];
    streakUpdated: boolean;
    leveledUp: boolean;
  };
  isLoaded: boolean;
}

// Provider wraps the app in layout.tsx
// useProgress() hook for consuming components
```

**Step 2: Add provider to layout.tsx**

Wrap children in `<ProgressProvider>` inside the existing `<ThemeProvider>`.

**Step 3: Commit**

```bash
git add src/lib/progress/ProgressProvider.tsx src/lib/progress/useProgress.ts src/app/layout.tsx
git commit -m "feat: add ProgressProvider context to app layout"
```

---

## Phase 3: Navigation Redesign

### Task 8: Build New Navigation Component

**Files:**
- Create: `src/components/NavigationNew.tsx`
- Modify: `src/app/layout.tsx`

**Step 1: Build desktop navigation**

New nav structure:
- Sticky white bar, no glassmorphism
- Left: Logo + "SeniorBrainGames" text
- Center: Play, My Progress, Discover, Daily Challenge (links styled as pills with active state)
- Right: Streak flame + count (from useProgress), Search trigger (Ctrl+K), ThemeToggle, user avatar placeholder

Use `usePathname()` for active state. Streak count reads from `useProgress().progress.streaks.current`.

**Step 2: Build mobile bottom tab bar**

For screens below `lg:` breakpoint:
- Fixed bottom bar with 5 tabs: Play, Progress, Daily, Discover, More
- Icons from lucide-react: Gamepad2, BarChart3, Calendar, Compass, Menu
- Active tab shows primary color, others muted
- The top nav on mobile shows only logo + streak + search

**Step 3: Replace old Navigation in layout.tsx**

Swap `<Navigation />` for `<NavigationNew />`. Keep old file for reference until migration complete.

**Step 4: Verify build + visual check**

Run: `bun run build`

**Step 5: Commit**

```bash
git add src/components/NavigationNew.tsx src/app/layout.tsx
git commit -m "feat: add activity-first navigation with mobile bottom tabs"
```

---

### Task 9: Update Footer

**Files:**
- Modify: `src/app/layout.tsx` (footer section)

**Step 1: Simplify footer**

Replace current footer with a clean 3-column layout:
- Column 1: Logo + tagline ("Train your brain, one game at a time")
- Column 2: Quick links (Play, Progress, Discover, Daily Challenge, Printable Puzzles)
- Column 3: Info (About, FAQ, Blog, Privacy)
- Bottom row: Copyright + "Made with care for seniors"

Use new design tokens (border-border, text-muted, surface-alt background).

**Step 2: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: redesign footer with simplified layout"
```

---

## Phase 4: Route Migration

### Task 10: Create New Route Structure with Redirects

**Files:**
- Create: `src/app/play/page.tsx` (browse all)
- Create: `src/app/play/[category]/page.tsx` (category listing)
- Create: `src/app/play/[category]/[slug]/page.tsx` (game page)
- Create: `src/app/progress/page.tsx` (placeholder)
- Create: `src/app/discover/page.tsx` (placeholder)
- Create: `src/app/account/page.tsx` (placeholder)
- Modify: `src/app/nostalgia-trivia/page.tsx` → redirect
- Modify: `src/app/general-knowledge/page.tsx` → redirect
- Modify: `src/app/word-games/page.tsx` → redirect
- Modify: `src/app/memory-games/page.tsx` → redirect
- Modify: `next.config.ts` (add redirects)

**Step 1: Add 301 redirects in next.config.ts**

```typescript
async redirects() {
  const categories = ["nostalgia-trivia", "general-knowledge", "word-games", "memory-games"];
  return categories.flatMap((cat) => [
    {
      source: `/${cat}`,
      destination: `/play/${cat}`,
      permanent: true,
    },
    {
      source: `/${cat}/:slug`,
      destination: `/play/${cat}/:slug`,
      permanent: true,
    },
    {
      source: `/${cat}/:slug/print`,
      destination: `/play/${cat}/:slug/print`,
      permanent: true,
    },
  ]);
},
```

**Step 2: Copy existing category page logic into new `/play/[category]/page.tsx`**

This is a single dynamic route that handles all 4 categories. Read the category from params, use `categoryInfo` from quizzes.ts, and render the same listing UI (to be restyled in Phase 5).

**Step 3: Copy existing game page logic into new `/play/[category]/[slug]/page.tsx`**

Combine all 4 category `[slug]/page.tsx` files into one dynamic handler. The switch statement for special games needs to handle all categories.

**Step 4: Create placeholder pages for /progress, /discover, /account**

Simple pages with "Coming soon" content and the new nav. These get built out in later phases.

**Step 5: Verify redirects work**

Run: `bun dev`, test that `/nostalgia-trivia` redirects to `/play/nostalgia-trivia`

**Step 6: Commit**

```bash
git add src/app/play/ src/app/progress/ src/app/discover/ src/app/account/ next.config.ts
git commit -m "feat: migrate routes to /play/ prefix with 301 redirects"
```

---

## Phase 5: Game Card & Game Page Redesign

### Task 11: Create New GameCard Component

**Files:**
- Create: `src/components/GameCardNew.tsx`

**Step 1: Build the new card**

Props: title, slug, category, description, difficulty (optional), rating (optional), playCount (optional), isSpecial (boolean)

Design:
- `card-playful` base class (rounded-xl, subtle shadow, hover lift)
- Left color accent border (4px, category color)
- Category pill badge (colored background + white text, rounded-full)
- Difficulty dots (1-3 filled circles)
- Star rating (if 3+ ratings)
- Responsive: full info on desktop, compact on mobile

**Step 2: Commit**

```bash
git add src/components/GameCardNew.tsx
git commit -m "feat: add redesigned GameCard with category accents"
```

---

### Task 12: Create Pre-Game Screen Component

**Files:**
- Create: `src/components/PreGameScreen.tsx`

**Step 1: Build pre-game screen**

Shown before any game starts. Props: title, category, description, difficulty, estimatedTime, bestScore (from progress), onStart callback.

Layout:
- Centered card (max-w-lg)
- Game title (Merriweather, large)
- Category pill
- Difficulty dots + estimated time
- Best score (if exists): "Your best: 8/10"
- Large purple "Start Playing" button
- Expandable "How to Play" section (if provided)

Uses framer-motion for entrance animation (fade up).

**Step 2: Commit**

```bash
git add src/components/PreGameScreen.tsx
git commit -m "feat: add pre-game screen with best score display"
```

---

### Task 13: Create Game Completion Screen with Celebrations

**Files:**
- Create: `src/components/GameCompletionScreen.tsx`
- Create: `src/components/Confetti.tsx`
- Create: `src/components/XPAnimation.tsx`
- Create: `src/components/BadgeUnlock.tsx`

**Step 1: Build confetti component**

Lightweight canvas-based confetti animation. Triggers on mount, auto-cleans up. Takes `count` and `duration` props. Uses framer-motion for orchestration.

**Step 2: Build XP animation**

Displays "+25 XP" floating up with fade-out. Uses framer-motion animate.

**Step 3: Build badge unlock modal**

Shows newly unlocked badge with shimmer animation, badge icon, name, and description. Dismissible.

**Step 4: Build GameCompletionScreen**

Replaces ResultsView for the new design. Props: score, totalQuestions, correctAnswers, timeSpentMs, xpGained (XPGain), newBadges (Badge[]), streakCount, leveledUp, onPlayAgain, onNextGame, onBackToDashboard.

Layout:
- Confetti (if score >= 70%)
- Animated circular score ring (SVG, category-colored, fills on mount)
- Score text + encouraging message
- XP animation
- Badge unlocks (if any)
- Streak display
- 3 CTA buttons
- Collapsible "Review Answers" accordion

**Step 5: Commit**

```bash
git add src/components/GameCompletionScreen.tsx src/components/Confetti.tsx src/components/XPAnimation.tsx src/components/BadgeUnlock.tsx
git commit -m "feat: add game completion screen with confetti and XP animations"
```

---

### Task 14: Integrate New Game Flow into Game Pages

**Files:**
- Modify: `src/app/play/[category]/[slug]/page.tsx`
- Modify: `src/components/QuizEngine.tsx`

**Step 1: Add pre-game → playing → completion state machine to game page**

The game page now manages three states:
1. `pre-game`: shows PreGameScreen
2. `playing`: shows existing engine (QuizEngine, etc.)
3. `completed`: shows GameCompletionScreen

When game engine signals completion, call `recordPlay()` from ProgressProvider, capture the result (XP, badges, streak), pass to GameCompletionScreen.

**Step 2: Modify QuizEngine to support minimal chrome mode**

Add optional prop `minimalChrome?: boolean`. When true:
- Hide breadcrumbs
- Show thin progress bar at top
- Only show back arrow + title + progress indicator

**Step 3: Test the full flow**

Run dev server, play a quiz game through pre-game → playing → completion. Verify XP shows, streak updates, localStorage persists.

**Step 4: Commit**

```bash
git add src/app/play/[category]/[slug]/page.tsx src/components/QuizEngine.tsx
git commit -m "feat: integrate pre-game → playing → completion flow with gamification"
```

---

## Phase 6: Homepage Dashboard

### Task 15: Create Onboarding Flow

**Files:**
- Create: `src/components/Onboarding.tsx`

**Step 1: Build 3-step onboarding component**

Uses framer-motion for step transitions (slide left/right).

Step 1: "What interests you?" — 4 category cards (selectable, multi-select, category-colored)
Step 2: "How much time do you have?" — 3 option cards (Quick 5min, Relaxed 15min, Deep Focus 30+)
Step 3: "Welcome!" — brief message, CTA to dashboard

"Skip" link in top-right of each step. Progress dots at bottom.

Saves to progress store preferences on completion.

**Step 2: Commit**

```bash
git add src/components/Onboarding.tsx
git commit -m "feat: add 3-step onboarding flow for new visitors"
```

---

### Task 16: Build Dashboard Homepage

**Files:**
- Create: `src/app/DashboardClient.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Build DashboardClient component**

This is the main homepage for returning users. Reads from `useProgress()`.

Sections (each as a separate sub-component for clarity):
1. **WelcomeBanner** — greeting based on time of day, streak flame, daily challenge CTA
2. **ContinuePlaying** — horizontal scroll of last 3 played games (from gamesPlayed array)
3. **RecommendedForYou** — 4-card grid based on preferences + play frequency per category
4. **TodaysStats** — 4 mini stat cards in a row (games today, streak, best category, total played)
5. **QuickPlayCategories** — 2x2 grid of category cards with "Play Random" button each
6. **TrendingTopRated** — horizontal carousel (reuse existing getTopRatedGames DB call)

**Step 2: Update page.tsx to switch between onboarding and dashboard**

```tsx
// src/app/page.tsx
export default function HomePage() {
  return <DashboardClient />;
}
```

DashboardClient checks `progress.preferences.onboardingComplete`:
- false → show `<Onboarding />`
- true → show dashboard sections

For server data (top rated games), pass as props from the server component page.tsx.

**Step 3: Commit**

```bash
git add src/app/DashboardClient.tsx src/app/page.tsx
git commit -m "feat: build personalized dashboard homepage with onboarding"
```

---

## Phase 7: Play/Browse Page

### Task 17: Build Play Page with Filters

**Files:**
- Modify: `src/app/play/page.tsx`

**Step 1: Build the browse page**

Layout:
- Sticky filter bar below nav: category pills (All, Nostalgia, General, Word, Memory), sort dropdown, type filter
- Game grid using GameCardNew
- Pagination or "Load More" (start with pagination, 24 per page)

All filtering is client-side since game data is static (imported from quizzes.ts).

**Step 2: Commit**

```bash
git add src/app/play/page.tsx
git commit -m "feat: build play/browse page with filters and game grid"
```

---

### Task 18: Rebuild Category Listing Pages

**Files:**
- Modify: `src/app/play/[category]/page.tsx`

**Step 1: Redesign category page**

- Hero banner with category color gradient, icon, title, game count
- "Special Challenges" section — highlighted cards for special engine games
- "All Games" grid with GameCardNew components
- Use new design tokens throughout

**Step 2: Commit**

```bash
git add src/app/play/[category]/page.tsx
git commit -m "feat: redesign category listing pages with new cards"
```

---

## Phase 8: Progress Page

### Task 19: Build Progress Page

**Files:**
- Modify: `src/app/progress/page.tsx`
- Create: `src/components/ActivityHeatmap.tsx`
- Create: `src/components/BadgeGrid.tsx`
- Create: `src/components/CategoryBreakdown.tsx`

**Step 1: Build ActivityHeatmap**

GitHub contribution-style grid showing daily play activity for last 90 days. Each cell colored by intensity (0 games = gray, 1 = light primary, 2+ = dark primary). Reads from gamesPlayed dates.

**Step 2: Build BadgeGrid**

Displays all possible badges in a grid. Earned badges show full color + unlock date. Locked badges show as grayscale silhouettes with progress bar toward next unlock.

**Step 3: Build CategoryBreakdown**

4 cards (one per category). Each shows: games played count, average score with trend arrow (compare last 10 vs previous 10), favorite game type in category.

**Step 4: Assemble progress page**

Layout:
1. Profile card — level ring, XP bar, total games, member since
2. Streak section — current/longest + heatmap
3. Category breakdown — 4 cards
4. Badges grid
5. Recent activity — last 10 games timeline

**Step 5: Commit**

```bash
git add src/app/progress/page.tsx src/components/ActivityHeatmap.tsx src/components/BadgeGrid.tsx src/components/CategoryBreakdown.tsx
git commit -m "feat: build progress page with heatmap, badges, and stats"
```

---

## Phase 9: Discover Page & Collections

### Task 20: Create Collections Data

**Files:**
- Create: `src/lib/collections.ts`

**Step 1: Define collection data model and initial collections**

```typescript
export interface Collection {
  slug: string;
  title: string;
  description: string;
  emoji: string;
  games: string[]; // game slugs
  featured: boolean;
}

export const collections: Collection[] = [
  {
    slug: "morning-warm-up",
    title: "Morning Brain Warm-Up",
    description: "Start your day with these quick, energizing games",
    emoji: "sunrise",
    games: [/* 6-8 easy/quick game slugs */],
    featured: true,
  },
  {
    slug: "five-minute-games",
    title: "5-Minute Games",
    description: "Perfect for a quick brain break",
    emoji: "clock",
    games: [/* 8 short game slugs */],
    featured: false,
  },
  // ... more collections: "challenge-yourself", "memory-bootcamp", "word-wizard", "hidden-gems"
];

export function getFeaturedCollection(): Collection {
  // Rotate weekly using date seed (same as game-of-the-day pattern)
  const featured = collections.filter(c => c.featured);
  const weekNumber = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
  return featured[weekNumber % featured.length];
}
```

**Step 2: Commit**

```bash
git add src/lib/collections.ts
git commit -m "feat: add curated game collections data"
```

---

### Task 21: Build Discover Page

**Files:**
- Modify: `src/app/discover/page.tsx`

**Step 1: Build discover page**

Layout:
1. Featured collection hero banner (large card with gradient, collection title, game count, "Start Collection" CTA)
2. Quick collections horizontal scroll row (5 collection cards)
3. Trending now — 6-card grid (use existing getTopRatedGames or add play count sorting)
4. Game of the Day — single large card (reuse existing deterministic seed logic from current homepage)

**Step 2: Commit**

```bash
git add src/app/discover/page.tsx
git commit -m "feat: build discover page with collections and trending"
```

---

## Phase 10: Account System

### Task 22: Set Up Supabase Auth

**Files:**
- Create: `src/lib/supabase.ts`
- Create: `src/app/account/page.tsx`
- Create: `src/app/auth/callback/route.ts`

**Step 1: Create Supabase client**

```typescript
// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

**Step 2: Build account page**

- "Save your progress across devices" hero
- Email input + "Send Magic Link" button
- If logged in: display name, email, sync toggle, export data button, delete account button, theme preference
- If not logged in: magic link form + "Continue without account" link

**Step 3: Build auth callback route**

Handle Supabase magic link redirect, exchange code for session, redirect to dashboard.

**Step 4: Add progress sync logic**

On login: read localStorage progress, read DB progress (if exists), merge (DB wins on conflicts), write merged state to both localStorage and DB.

**Step 5: Commit**

```bash
git add src/lib/supabase.ts src/app/account/ src/app/auth/
git commit -m "feat: add Supabase magic link auth with progress sync"
```

---

## Phase 11: Polish & Cleanup

### Task 23: Update All Remaining Pages

**Files:**
- Modify: `src/app/about/page.tsx`
- Modify: `src/app/faq/page.tsx`
- Modify: `src/app/privacy/page.tsx`
- Modify: `src/app/blog/page.tsx`
- Modify: `src/app/printable-puzzles/page.tsx`

**Step 1: Restyle all secondary pages**

Apply new design tokens to all remaining pages:
- Update color classes to use new variables
- Update card styles to use `card-playful`
- Update headings to use new Merriweather + Inter pairing
- Ensure dark mode works with new palette

**Step 2: Commit**

```bash
git add src/app/about/ src/app/faq/ src/app/privacy/ src/app/blog/ src/app/printable-puzzles/
git commit -m "feat: restyle secondary pages with new design tokens"
```

---

### Task 24: Remove Old Route Files & Navigation

**Files:**
- Delete: `src/app/nostalgia-trivia/` (old category routes — redirects handle these now)
- Delete: `src/app/general-knowledge/`
- Delete: `src/app/word-games/`
- Delete: `src/app/memory-games/`
- Delete: `src/components/Navigation.tsx` (replaced by NavigationNew.tsx)
- Rename: `src/components/NavigationNew.tsx` → `src/components/Navigation.tsx`

**Step 1: Verify redirects are working**

Test all old routes redirect properly before deleting.

**Step 2: Remove old files**

**Step 3: Rename NavigationNew → Navigation**

Update import in layout.tsx.

**Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove old route files and navigation, finalize migration"
```

---

### Task 25: Update SEO Metadata & Sitemap

**Files:**
- Modify: `src/app/sitemap.ts`
- Modify: `src/app/robots.ts`
- Modify: `src/app/manifest.ts`
- Modify: `src/app/layout.tsx` (metadata)

**Step 1: Update sitemap to use /play/ prefix**

**Step 2: Update manifest theme colors to new primary (#7C5CFC)**

**Step 3: Update root metadata description**

**Step 4: Commit**

```bash
git add src/app/sitemap.ts src/app/robots.ts src/app/manifest.ts src/app/layout.tsx
git commit -m "feat: update SEO metadata and sitemap for new routes"
```

---

### Task 26: Final Build & Deploy

**Step 1: Run full test suite**

Run: `bun test`
Expected: All tests pass.

**Step 2: Run production build**

Run: `bun run build`
Expected: Build succeeds with no errors.

**Step 3: Deploy**

Run: `pm2 restart seniorbraingames`

**Step 4: Smoke test production site**

Verify: homepage dashboard, game flow, progress tracking, redirects, dark mode.

**Step 5: Final commit if any fixes needed**

---

## Task Dependency Graph

```
Phase 1: [Task 1] → [Task 2]
Phase 2: [Task 3] → [Task 4] → [Task 5] → [Task 6] → [Task 7]
Phase 3: [Task 8] → [Task 9]
Phase 4: [Task 10] (depends on Phase 3)
Phase 5: [Task 11] → [Task 12] → [Task 13] → [Task 14] (depends on Phase 2 + 4)
Phase 6: [Task 15] → [Task 16] (depends on Phase 2 + 5)
Phase 7: [Task 17] → [Task 18] (depends on Phase 4 + 5)
Phase 8: [Task 19] (depends on Phase 2)
Phase 9: [Task 20] → [Task 21] (depends on Phase 4)
Phase 10: [Task 22] (depends on Phase 2)
Phase 11: [Task 23] → [Task 24] → [Task 25] → [Task 26] (depends on all above)
```

Phases 3, 8, 9, 10 can run in parallel once Phase 2 is complete.
