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
    expect(result.total).toBe(15);
  });

  it("gives 25 daily bonus XP for daily challenge", () => {
    const result = calculateXP({ score: 40, isSpecial: false, isDaily: true });
    expect(result.dailyBonus).toBe(25);
    expect(result.total).toBe(10 + 25);
  });

  it("gives score bonus for 50%+", () => {
    const result = calculateXP({ score: 55, isSpecial: false, isDaily: false });
    expect(result.scoreBonus).toBe(5);
    expect(result.total).toBe(15);
  });

  it("gives score bonus for 70%+", () => {
    const result = calculateXP({ score: 75, isSpecial: false, isDaily: false });
    expect(result.scoreBonus).toBe(10);
    expect(result.total).toBe(20);
  });

  it("gives score bonus for 90%+", () => {
    const result = calculateXP({ score: 95, isSpecial: false, isDaily: false });
    expect(result.scoreBonus).toBe(15);
    expect(result.total).toBe(25);
  });

  it("gives perfect score bonus for 100%", () => {
    const result = calculateXP({ score: 100, isSpecial: false, isDaily: false });
    expect(result.perfectBonus).toBe(10);
    expect(result.total).toBe(10 + 15 + 10); // base + 90%+ bonus + perfect
  });

  it("stacks all bonuses for perfect daily special game", () => {
    const result = calculateXP({ score: 100, isSpecial: true, isDaily: true });
    expect(result.total).toBe(15 + 15 + 10 + 25); // special base + 90% + perfect + daily
  });
});

describe("getXPForLevel", () => {
  it("returns 0 for level 1", () => {
    expect(getXPForLevel(1)).toBe(0);
  });

  it("returns 100 for level 2", () => {
    expect(getXPForLevel(2)).toBe(100);
  });

  it("returns 250 for level 3", () => {
    expect(getXPForLevel(3)).toBe(250);
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
    expect(info.progressPercent).toBe(50);
  });

  it("handles exact level boundary", () => {
    const info = getLevelInfo(250);
    expect(info.level).toBe(3);
    expect(info.progressPercent).toBe(0);
  });

  it("handles mid-level XP", () => {
    const info = getLevelInfo(175); // halfway between L2(100) and L3(250)
    expect(info.level).toBe(2);
    expect(info.progressPercent).toBe(50);
  });
});
