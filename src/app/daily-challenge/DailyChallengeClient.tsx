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
      const resultsEl = document.querySelector('[class*="text-5xl"]') || document.querySelector('[class*="text-4xl"]');
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
        <div className="border-b border-success/20 px-6 py-4 text-center text-base font-bold text-foreground" style={{ background: "linear-gradient(135deg, #16A34A10 0%, #F8F9FC 100%)" }}>
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
