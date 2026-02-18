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
      className="border-b border-secondary/20 px-6 py-3 text-center text-base font-bold text-foreground"
      style={{ background: "var(--gradient-warm)" }}
      role="status"
    >
      You&apos;ve played {streak} days in a row! Keep the streak going!
    </div>
  );
}
