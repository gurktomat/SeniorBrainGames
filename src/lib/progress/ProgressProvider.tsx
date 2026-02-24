"use client";

import {
  createContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type {
  ProgressState,
  GamePlayRecord,
  XPGain,
  BadgeId,
  UserPreferences,
} from "./types";
import {
  getProgress,
  saveProgress,
  recordGamePlay,
  migrateOldStorage,
  createDefaultState,
} from "./store";

export interface ProgressContextType {
  progress: ProgressState;
  isLoaded: boolean;
  recordPlay: (record: Omit<GamePlayRecord, "playedAt">) => {
    xpGained: XPGain;
    newBadges: BadgeId[];
    streakUpdated: boolean;
    leveledUp: boolean;
  };
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
}

export const ProgressContext = createContext<ProgressContextType>({
  progress: createDefaultState(),
  isLoaded: false,
  recordPlay: () => ({
    xpGained: { base: 0, scoreBonus: 0, perfectBonus: 0, dailyBonus: 0, total: 0 },
    newBadges: [],
    streakUpdated: false,
    leveledUp: false,
  }),
  updatePreferences: () => {},
});

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressState>(createDefaultState);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    migrateOldStorage();
    setProgress(getProgress());
    setIsLoaded(true);
  }, []);

  const recordPlay = useCallback(
    (record: Omit<GamePlayRecord, "playedAt">) => {
      const result = recordGamePlay(record);
      setProgress({ ...result.state });
      return {
        xpGained: result.xpGained,
        newBadges: result.newBadges,
        streakUpdated: result.streakUpdated,
        leveledUp: result.leveledUp,
      };
    },
    []
  );

  const updatePreferences = useCallback(
    (prefs: Partial<UserPreferences>) => {
      setProgress((prev) => {
        const updated = {
          ...prev,
          preferences: { ...prev.preferences, ...prefs },
        };
        saveProgress(updated);
        return updated;
      });
    },
    []
  );

  return (
    <ProgressContext.Provider
      value={{ progress, isLoaded, recordPlay, updatePreferences }}
    >
      {children}
    </ProgressContext.Provider>
  );
}
