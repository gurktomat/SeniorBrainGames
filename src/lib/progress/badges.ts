import type { BadgeDefinition, BadgeId, ProgressState } from "./types";

const CATEGORIES = ["nostalgia-trivia", "general-knowledge", "word-games", "memory-games"];

function countGamesInCategory(state: ProgressState, category: string): number {
  return state.gamesPlayed.filter((g) => g.category === category).length;
}

function countPerfectScores(state: ProgressState): number {
  return state.gamesPlayed.filter((g) => g.isPerfect).length;
}

function uniqueCategoriesPlayed(state: ProgressState): number {
  const cats = new Set(state.gamesPlayed.map((g) => g.category));
  return cats.size;
}

function uniqueGameSlugsPlayed(state: ProgressState): number {
  const slugs = new Set(state.gamesPlayed.map((g) => g.slug));
  return slugs.size;
}

export const ALL_BADGES: BadgeDefinition[] = [
  // Getting Started
  {
    id: "first-game",
    name: "First Steps",
    description: "Play your first game",
    collection: "getting-started",
    tier: "bronze",
    icon: "rocket",
    check: (s) => s.gamesPlayed.length >= 1,
  },
  {
    id: "first-perfect",
    name: "Flawless",
    description: "Get a perfect score on any game",
    collection: "getting-started",
    tier: "silver",
    icon: "star",
    check: (s) => countPerfectScores(s) >= 1,
  },
  {
    id: "tried-all-categories",
    name: "Well-Rounded",
    description: "Play a game in every category",
    collection: "getting-started",
    tier: "gold",
    icon: "globe",
    check: (s) => uniqueCategoriesPlayed(s) >= 4,
  },

  // Consistency (streaks)
  {
    id: "streak-3",
    name: "Getting Warm",
    description: "Reach a 3-day streak",
    collection: "consistency",
    tier: "bronze",
    icon: "flame",
    check: (s) => s.streaks.current >= 3 || s.streaks.longest >= 3,
  },
  {
    id: "streak-7",
    name: "On Fire",
    description: "Reach a 7-day streak",
    collection: "consistency",
    tier: "bronze",
    icon: "flame",
    check: (s) => s.streaks.current >= 7 || s.streaks.longest >= 7,
  },
  {
    id: "streak-14",
    name: "Dedicated",
    description: "Reach a 14-day streak",
    collection: "consistency",
    tier: "silver",
    icon: "flame",
    check: (s) => s.streaks.current >= 14 || s.streaks.longest >= 14,
  },
  {
    id: "streak-30",
    name: "Unstoppable",
    description: "Reach a 30-day streak",
    collection: "consistency",
    tier: "gold",
    icon: "flame",
    check: (s) => s.streaks.current >= 30 || s.streaks.longest >= 30,
  },
  {
    id: "streak-100",
    name: "Legend",
    description: "Reach a 100-day streak",
    collection: "consistency",
    tier: "gold",
    icon: "crown",
    check: (s) => s.streaks.current >= 100 || s.streaks.longest >= 100,
  },

  // Category Master — one set per category
  ...CATEGORIES.flatMap((cat) => {
    const label = cat
      .split("-")
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(" ");
    return [
      {
        id: `category-${cat}-bronze`,
        name: `${label} Fan`,
        description: `Play 10 ${label} games`,
        collection: "category-master" as const,
        tier: "bronze" as const,
        icon: "trophy",
        check: (s: ProgressState) => countGamesInCategory(s, cat) >= 10,
      },
      {
        id: `category-${cat}-silver`,
        name: `${label} Pro`,
        description: `Play 25 ${label} games`,
        collection: "category-master" as const,
        tier: "silver" as const,
        icon: "trophy",
        check: (s: ProgressState) => countGamesInCategory(s, cat) >= 25,
      },
      {
        id: `category-${cat}-gold`,
        name: `${label} Master`,
        description: `Play 50 ${label} games`,
        collection: "category-master" as const,
        tier: "gold" as const,
        icon: "trophy",
        check: (s: ProgressState) => countGamesInCategory(s, cat) >= 50,
      },
    ];
  }),

  // Challenge Seeker
  {
    id: "daily-5",
    name: "Regular",
    description: "Complete 5 daily challenges",
    collection: "challenge-seeker",
    tier: "bronze",
    icon: "calendar",
    check: (s) => s.dailyChallengesCompleted >= 5,
  },
  {
    id: "daily-25",
    name: "Committed",
    description: "Complete 25 daily challenges",
    collection: "challenge-seeker",
    tier: "silver",
    icon: "calendar",
    check: (s) => s.dailyChallengesCompleted >= 25,
  },
  {
    id: "daily-50",
    name: "Daily Devotee",
    description: "Complete 50 daily challenges",
    collection: "challenge-seeker",
    tier: "gold",
    icon: "calendar",
    check: (s) => s.dailyChallengesCompleted >= 50,
  },

  // Explorer
  {
    id: "explorer-10",
    name: "Curious Mind",
    description: "Try 10 different games",
    collection: "explorer",
    tier: "silver",
    icon: "compass",
    check: (s) => uniqueGameSlugsPlayed(s) >= 10,
  },

  // Perfectionist
  {
    id: "perfect-5",
    name: "Sharp Mind",
    description: "Get 5 perfect scores",
    collection: "perfectionist",
    tier: "bronze",
    icon: "zap",
    check: (s) => countPerfectScores(s) >= 5,
  },
  {
    id: "perfect-10",
    name: "Brilliant",
    description: "Get 10 perfect scores",
    collection: "perfectionist",
    tier: "silver",
    icon: "zap",
    check: (s) => countPerfectScores(s) >= 10,
  },
  {
    id: "perfect-25",
    name: "Genius",
    description: "Get 25 perfect scores",
    collection: "perfectionist",
    tier: "gold",
    icon: "zap",
    check: (s) => countPerfectScores(s) >= 25,
  },
];

export function checkNewBadges(state: ProgressState): BadgeId[] {
  const earned = new Set(state.badges);
  const newBadges: BadgeId[] = [];

  for (const badge of ALL_BADGES) {
    if (!earned.has(badge.id) && badge.check(state)) {
      newBadges.push(badge.id);
    }
  }

  return newBadges;
}

export function getBadgeDefinition(id: BadgeId): BadgeDefinition | undefined {
  return ALL_BADGES.find((b) => b.id === id);
}
