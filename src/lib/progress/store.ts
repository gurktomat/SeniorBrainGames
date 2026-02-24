import type {
  ProgressState,
  GamePlayRecord,
  XPGain,
  BadgeId,
  GamePlayResult,
} from "./types";
import { calculateXP, getLevelInfo } from "./xp";
import { checkNewBadges } from "./badges";

const STORAGE_KEY = "sbg_progress";

// Old storage keys for migration
const OLD_STREAK_KEY = "sbg-streak";
const OLD_DAILY_KEY = "sbg-daily-completed";
const OLD_LAST_PLAYED_KEY = "sbg-last-played";

function getToday(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function getYesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function createDefaultState(): ProgressState {
  const now = new Date().toISOString();
  return {
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
    createdAt: now,
    lastUpdatedAt: now,
  };
}

export function getProgress(): ProgressState {
  if (typeof window === "undefined") return createDefaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultState();
    return JSON.parse(raw);
  } catch {
    return createDefaultState();
  }
}

export function saveProgress(state: ProgressState): void {
  if (typeof window === "undefined") return;
  try {
    state.lastUpdatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage might be full
  }
}

function updateStreak(state: ProgressState): boolean {
  const today = getToday();
  const yesterday = getYesterday();

  if (state.streaks.lastPlayedDate === today) {
    return false; // already played today
  }

  if (state.streaks.lastPlayedDate === yesterday) {
    state.streaks.current += 1;
  } else if (state.streaks.lastPlayedDate !== today) {
    // Missed a day — check for streak freeze
    if (state.streaks.freezesAvailable > 0 && state.streaks.current > 0) {
      state.streaks.freezesAvailable -= 1;
      state.streaks.freezeUsedDate = yesterday;
      state.streaks.current += 1;
    } else {
      state.streaks.current = 1;
    }
  }

  state.streaks.lastPlayedDate = today;

  if (state.streaks.current > state.streaks.longest) {
    state.streaks.longest = state.streaks.current;
  }

  // Award streak freeze every 7-day milestone
  if (state.streaks.current > 0 && state.streaks.current % 7 === 0) {
    state.streaks.freezesAvailable = Math.min(
      state.streaks.freezesAvailable + 1,
      2
    );
  }

  return true;
}

export function recordGamePlay(
  record: Omit<GamePlayRecord, "playedAt">
): GamePlayResult {
  const state = getProgress();
  const previousLevel = state.level;

  // Add play record
  const fullRecord: GamePlayRecord = {
    ...record,
    playedAt: new Date().toISOString(),
  };

  // Keep last 500 games to prevent unbounded growth
  state.gamesPlayed.push(fullRecord);
  if (state.gamesPlayed.length > 500) {
    state.gamesPlayed = state.gamesPlayed.slice(-500);
  }

  // Calculate XP
  const xpGained = calculateXP({
    score: record.score,
    isSpecial: false, // caller can set this if needed
    isDaily: record.isDaily,
  });
  state.xp += xpGained.total;

  // Update level
  const levelInfo = getLevelInfo(state.xp);
  state.level = levelInfo.level;

  // Update daily challenge count
  if (record.isDaily) {
    state.dailyChallengesCompleted += 1;
  }

  // Update streak
  const streakUpdated = updateStreak(state);

  // Check badges
  const newBadges = checkNewBadges(state);
  state.badges.push(...newBadges);

  // Save
  saveProgress(state);

  return {
    state,
    xpGained,
    newBadges,
    streakUpdated,
    leveledUp: state.level > previousLevel,
  };
}

export function migrateOldStorage(): void {
  if (typeof window === "undefined") return;

  // Only migrate if new store doesn't exist yet
  if (localStorage.getItem(STORAGE_KEY)) return;

  const state = createDefaultState();
  let migrated = false;

  // Migrate old streak
  try {
    const oldStreak = localStorage.getItem(OLD_STREAK_KEY);
    if (oldStreak) {
      const parsed = JSON.parse(oldStreak);
      if (parsed.count && parsed.lastDate) {
        state.streaks.current = parsed.count;
        state.streaks.longest = parsed.count;
        state.streaks.lastPlayedDate = parsed.lastDate;
        migrated = true;
      }
    }
  } catch {
    // ignore
  }

  // Migrate daily completion
  try {
    const oldDaily = localStorage.getItem(OLD_DAILY_KEY);
    if (oldDaily) {
      state.dailyChallengesCompleted = 1; // we know at least 1
      migrated = true;
    }
  } catch {
    // ignore
  }

  if (migrated) {
    // Mark onboarding as complete for existing users
    state.preferences.onboardingComplete = true;
    saveProgress(state);

    // Clean up old keys
    try {
      localStorage.removeItem(OLD_STREAK_KEY);
      localStorage.removeItem(OLD_DAILY_KEY);
      localStorage.removeItem(OLD_LAST_PLAYED_KEY);
    } catch {
      // ignore
    }
  }
}
