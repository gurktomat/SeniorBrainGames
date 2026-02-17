"use client";

import { useSyncExternalStore } from "react";
import { getStreak } from "@/lib/storage";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot() {
  return getStreak().count;
}

function getServerSnapshot() {
  return 0;
}

export default function StreakBanner() {
  const streak = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (streak < 2) return null;

  return (
    <div
      className="mb-6 rounded-xl bg-secondary/15 px-6 py-4 text-center text-lg font-semibold text-foreground"
      role="status"
    >
      You&apos;ve played {streak} days in a row! Keep the streak going!
    </div>
  );
}
