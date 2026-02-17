"use client";

const STREAK_KEY = "sbg-streak";
const LAST_PLAYED_KEY = "sbg-last-played";
const DAILY_COMPLETED_KEY = "sbg-daily-completed";

interface StreakData {
  count: number;
  lastDate: string;
}

function getToday(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function getYesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function getStreak(): StreakData {
  if (typeof window === "undefined") return { count: 0, lastDate: "" };
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (!raw) return { count: 0, lastDate: "" };
    return JSON.parse(raw);
  } catch {
    return { count: 0, lastDate: "" };
  }
}

export function updateStreak(): StreakData {
  const today = getToday();
  const yesterday = getYesterday();
  const current = getStreak();

  if (current.lastDate === today) {
    return current;
  }

  let newCount: number;
  if (current.lastDate === yesterday) {
    newCount = current.count + 1;
  } else {
    newCount = 1;
  }

  const data: StreakData = { count: newCount, lastDate: today };
  try {
    localStorage.setItem(STREAK_KEY, JSON.stringify(data));
  } catch {
    // localStorage might be full or unavailable
  }
  return data;
}

export function markDailyCompleted(): void {
  try {
    localStorage.setItem(DAILY_COMPLETED_KEY, getToday());
  } catch {
    // ignore
  }
}

export function isDailyCompleted(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(DAILY_COMPLETED_KEY) === getToday();
  } catch {
    return false;
  }
}

export function recordLastPlayed(quizId: string): void {
  try {
    localStorage.setItem(LAST_PLAYED_KEY, JSON.stringify({ quizId, date: getToday() }));
  } catch {
    // ignore
  }
}
