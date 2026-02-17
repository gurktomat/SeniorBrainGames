"use client";

import { useSyncExternalStore, useRef, useCallback } from "react";
import type { Quiz } from "@/lib/types";
import QuizEngine from "@/components/QuizEngine";
import { isDailyCompleted, markDailyCompleted, updateStreak } from "@/lib/storage";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot() {
  return isDailyCompleted();
}

function getServerSnapshot() {
  return false;
}

export default function DailyChallengeClient({ quiz }: { quiz: Quiz }) {
  const completed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const hasNotified = useRef(false);

  const handleClick = useCallback(() => {
    setTimeout(() => {
      const resultsEl = document.querySelector('[class*="text-6xl"]');
      if (resultsEl && !hasNotified.current) {
        markDailyCompleted();
        updateStreak();
        hasNotified.current = true;
      }
    }, 2000);
  }, []);

  return (
    <div>
      {completed && (
        <div className="mb-6 rounded-xl bg-success/10 px-6 py-4 text-center text-lg font-semibold text-foreground">
          You&apos;ve already completed today&apos;s challenge! Come back
          tomorrow for a new one.
        </div>
      )}
      <div onClickCapture={handleClick}>
        <QuizEngine quiz={quiz} />
      </div>
    </div>
  );
}
