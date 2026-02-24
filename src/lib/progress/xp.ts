import type { XPGain, LevelInfo } from "./types";

interface CalculateXPInput {
  score: number; // 0-100 percentage
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

// XP thresholds: L1=0, L2=100, L3=250, L4=450, L5=700, ...
// Each level requires 100 + (level-1)*50 more XP than the last
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
