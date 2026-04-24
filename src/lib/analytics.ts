// Lightweight wrapper around gtag for our custom events.
// GA4 is loaded site-wide via layout.tsx; this file never adds new scripts.
// All events are no-ops if gtag isn't available (SSR, ad-blockers, etc.).

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    // Next.js's Script component exposes gtag at window.gtag once loaded.
    gtag?: (command: string, event: string, params?: GtagParams) => void;
  }
}

function safeGtag(event: string, params: GtagParams): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  try {
    window.gtag("event", event, params);
  } catch {
    // Swallow analytics errors — they must never break user flow.
  }
}

export function trackGameComplete(params: {
  slug: string;
  category: string;
  score: number;
  durationSeconds: number;
  isPerfect: boolean;
  isDaily: boolean;
}): void {
  safeGtag("game_complete", {
    game_slug: params.slug,
    game_category: params.category,
    score: params.score,
    duration_seconds: Math.round(params.durationSeconds),
    is_perfect: params.isPerfect,
    is_daily: params.isDaily,
  });
}

export function trackLevelUp(level: number): void {
  safeGtag("level_up", { level });
}

export function trackBadgeEarned(badgeId: string): void {
  safeGtag("badge_earned", { badge_id: badgeId });
}
