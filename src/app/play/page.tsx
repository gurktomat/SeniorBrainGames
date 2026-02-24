import type { Metadata } from "next";
import PlayBrowseClient from "./PlayBrowseClient";

export const metadata: Metadata = {
  title: "Play Brain Games",
  description: "Browse all brain game categories — nostalgia trivia, general knowledge, word games, and memory games. Find your next challenge!",
  alternates: { canonical: "/play" },
};

export default function PlayPage() {
  return (
    <div>
      <div className="px-6 py-10 text-center" style={{ background: "var(--gradient-warm)" }}>
        <div className="mx-auto max-w-3xl">
          <h1
            className="mb-2 text-3xl font-bold text-foreground sm:text-4xl"
            style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
          >
            Play Brain Games
          </h1>
          <p className="text-lg text-text-muted">
            Browse all {1569} games across 4 categories
          </p>
        </div>
      </div>
      <PlayBrowseClient />
    </div>
  );
}
