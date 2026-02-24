import { describe, it, expect } from "bun:test";
import { checkNewBadges, ALL_BADGES } from "./badges";
import type { ProgressState } from "./types";

function makeState(overrides: Partial<ProgressState> = {}): ProgressState {
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
    createdAt: "2026-01-01T00:00:00Z",
    lastUpdatedAt: "2026-01-01T00:00:00Z",
    ...overrides,
  };
}

function makePlay(category: string, slug: string, score = 80) {
  return {
    slug,
    category,
    score,
    totalQuestions: 10,
    correctAnswers: Math.round(score / 10),
    playedAt: "2026-01-01T00:00:00Z",
    timeSpentMs: 60000,
    isDaily: false,
    isPerfect: score === 100,
  };
}

describe("checkNewBadges", () => {
  it("returns empty for fresh state", () => {
    const state = makeState();
    expect(checkNewBadges(state)).toEqual([]);
  });

  it("awards first-game badge", () => {
    const state = makeState({
      gamesPlayed: [makePlay("word-games", "test-quiz")],
    });
    const newBadges = checkNewBadges(state);
    expect(newBadges).toContain("first-game");
  });

  it("does not re-award earned badges", () => {
    const state = makeState({
      gamesPlayed: [makePlay("word-games", "test-quiz")],
      badges: ["first-game"],
    });
    const newBadges = checkNewBadges(state);
    expect(newBadges).not.toContain("first-game");
  });

  it("awards first-perfect badge for 100% score", () => {
    const state = makeState({
      gamesPlayed: [makePlay("word-games", "test-quiz", 100)],
    });
    const newBadges = checkNewBadges(state);
    expect(newBadges).toContain("first-perfect");
  });

  it("awards tried-all-categories when all 4 played", () => {
    const state = makeState({
      gamesPlayed: [
        makePlay("nostalgia-trivia", "quiz-1"),
        makePlay("general-knowledge", "quiz-2"),
        makePlay("word-games", "quiz-3"),
        makePlay("memory-games", "quiz-4"),
      ],
    });
    const newBadges = checkNewBadges(state);
    expect(newBadges).toContain("tried-all-categories");
  });

  it("awards streak badges based on current streak", () => {
    const state = makeState({
      streaks: {
        current: 7,
        longest: 7,
        lastPlayedDate: "2026-01-07",
        freezesAvailable: 0,
        freezeUsedDate: null,
      },
    });
    const newBadges = checkNewBadges(state);
    expect(newBadges).toContain("streak-3");
    expect(newBadges).toContain("streak-7");
    expect(newBadges).not.toContain("streak-14");
  });

  it("awards category-master badges at thresholds", () => {
    const games = Array.from({ length: 10 }, (_, i) =>
      makePlay("word-games", `quiz-${i}`)
    );
    const state = makeState({ gamesPlayed: games });
    const newBadges = checkNewBadges(state);
    expect(newBadges).toContain("category-word-games-bronze");
    expect(newBadges).not.toContain("category-word-games-silver");
  });

  it("awards daily challenge badges", () => {
    const state = makeState({ dailyChallengesCompleted: 5 });
    const newBadges = checkNewBadges(state);
    expect(newBadges).toContain("daily-5");
    expect(newBadges).not.toContain("daily-25");
  });

  it("awards explorer badge for 10 unique games", () => {
    const games = Array.from({ length: 10 }, (_, i) =>
      makePlay("word-games", `unique-quiz-${i}`)
    );
    const state = makeState({ gamesPlayed: games });
    const newBadges = checkNewBadges(state);
    expect(newBadges).toContain("explorer-10");
  });

  it("awards perfectionist badges", () => {
    const games = Array.from({ length: 5 }, (_, i) =>
      makePlay("word-games", `quiz-${i}`, 100)
    );
    const state = makeState({ gamesPlayed: games });
    const newBadges = checkNewBadges(state);
    expect(newBadges).toContain("perfect-5");
    expect(newBadges).not.toContain("perfect-10");
  });
});

describe("ALL_BADGES", () => {
  it("has unique IDs", () => {
    const ids = ALL_BADGES.map((b) => b.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has at least 30 badges", () => {
    expect(ALL_BADGES.length).toBeGreaterThanOrEqual(25);
  });
});
