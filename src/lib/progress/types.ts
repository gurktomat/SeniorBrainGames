export interface GamePlayRecord {
  slug: string;
  category: string;
  score: number; // percentage 0-100
  totalQuestions: number;
  correctAnswers: number;
  playedAt: string; // ISO date
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

export type BadgeId = string;

export type BadgeTier = "bronze" | "silver" | "gold";

export type BadgeCollection =
  | "getting-started"
  | "consistency"
  | "category-master"
  | "challenge-seeker"
  | "explorer"
  | "perfectionist";

export interface BadgeDefinition {
  id: BadgeId;
  name: string;
  description: string;
  collection: BadgeCollection;
  tier: BadgeTier;
  icon: string;
  check: (state: ProgressState) => boolean;
}

export interface UserPreferences {
  favoriteCategories: string[];
  sessionLength: "quick" | "relaxed" | "deep-focus";
  onboardingComplete: boolean;
}

export interface ProgressState {
  xp: number;
  level: number;
  streaks: StreakData;
  badges: BadgeId[];
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

export interface GamePlayResult {
  state: ProgressState;
  xpGained: XPGain;
  newBadges: BadgeId[];
  streakUpdated: boolean;
  leveledUp: boolean;
}
