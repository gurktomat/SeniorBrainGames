import type { Metadata } from "next";
import Link from "next/link";
import { categoryInfo } from "@/lib/quizzes";
import { categoryColors } from "@/lib/gameIcons";
import CategoryIcon from "@/components/CategoryIcon";
import type { GameCategory } from "@/lib/types";

export const metadata: Metadata = {
  title: "Play Brain Games",
  description: "Browse all brain game categories — nostalgia trivia, general knowledge, word games, and memory games. Find your next challenge!",
  alternates: { canonical: "/play" },
};

const categories: GameCategory[] = ["nostalgia-trivia", "general-knowledge", "word-games", "memory-games"];

export default function PlayPage() {
  return (
    <div>
      <div className="px-6 py-12 text-center" style={{ background: "var(--gradient-warm)" }}>
        <div className="mx-auto max-w-3xl">
          <h1
            className="mb-3 text-3xl font-bold text-foreground sm:text-4xl"
            style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
          >
            Play Brain Games
          </h1>
          <p className="text-lg text-text-muted">
            Choose a category to start training your brain!
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="grid gap-6 sm:grid-cols-2">
          {categories.map((cat) => {
            const info = categoryInfo[cat];
            const color = categoryColors[cat] ?? "#7C5CFC";
            return (
              <Link
                key={cat}
                href={`/play/${cat}`}
                className="card-playful group flex items-start gap-4 p-6"
              >
                <span
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-transform group-hover:scale-105"
                  style={{ background: color, color: "white" }}
                >
                  <CategoryIcon name={info.icon} size={28} strokeWidth={1.75} />
                </span>
                <div className="flex-1">
                  <h2
                    className="mb-1 text-xl font-bold text-foreground"
                    style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
                  >
                    {info.title}
                  </h2>
                  <p className="text-base text-text-muted">{info.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
