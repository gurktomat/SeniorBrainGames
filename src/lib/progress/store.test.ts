import { describe, it, expect, beforeEach } from "bun:test";
import { createDefaultState } from "./store";
import { calculateXP } from "./xp";
import { checkNewBadges } from "./badges";
import type { ProgressState } from "./types";

// Note: We can't easily test localStorage in bun:test,
// so we test the pure functions that the store uses.

describe("createDefaultState", () => {
  it("returns a valid default state", () => {
    const state = createDefaultState();
    expect(state.xp).toBe(0);
    expect(state.level).toBe(1);
    expect(state.streaks.current).toBe(0);
    expect(state.badges).toEqual([]);
    expect(state.gamesPlayed).toEqual([]);
    expect(state.preferences.onboardingComplete).toBe(false);
    expect(state.dailyChallengesCompleted).toBe(0);
  });
});

describe("recordGamePlay integration logic", () => {
  it("calculates correct XP for a play record", () => {
    const xp = calculateXP({ score: 80, isSpecial: false, isDaily: false });
    expect(xp.base).toBe(10);
    expect(xp.scoreBonus).toBe(10); // 70%+ bonus
    expect(xp.total).toBe(20);
  });

  it("awards badges after recording a play", () => {
    const state = createDefaultState();
    state.gamesPlayed.push({
      slug: "test",
      category: "word-games",
      score: 100,
      totalQuestions: 10,
      correctAnswers: 10,
      playedAt: new Date().toISOString(),
      timeSpentMs: 60000,
      isDaily: false,
      isPerfect: true,
    });

    const newBadges = checkNewBadges(state);
    expect(newBadges).toContain("first-game");
    expect(newBadges).toContain("first-perfect");
  });

  it("increments daily challenge count correctly", () => {
    const state = createDefaultState();
    state.dailyChallengesCompleted = 4;
    state.dailyChallengesCompleted += 1; // simulating recordGamePlay
    const newBadges = checkNewBadges(state);
    expect(newBadges).toContain("daily-5");
  });
});
