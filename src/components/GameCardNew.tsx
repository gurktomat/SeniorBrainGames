import Link from "next/link";
import { Star } from "lucide-react";
import { GameIcon, categoryColors } from "@/lib/gameIcons";
import { categoryInfo } from "@/lib/quizzes";
import type { GameCategory } from "@/lib/types";

interface GameCardNewProps {
  title: string;
  slug: string;
  category: string;
  description: string;
  count?: string;
  difficulty?: 1 | 2 | 3;
  rating?: { avgRating: number; ratingCount: number } | null;
  isSpecial?: boolean;
}

function DifficultyDots({ level }: { level: 1 | 2 | 3 }) {
  return (
    <span className="flex items-center gap-0.5" title={`Difficulty: ${level}/3`}>
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={`inline-block h-2 w-2 rounded-full ${
            i <= level ? "bg-accent" : "bg-border"
          }`}
        />
      ))}
    </span>
  );
}

export default function GameCardNew({
  title,
  slug,
  category,
  description,
  count,
  difficulty,
  rating,
  isSpecial = false,
}: GameCardNewProps) {
  const color = categoryColors[category] ?? "#7C5CFC";
  const info = categoryInfo[category as GameCategory];
  const categoryLabel = info?.title ?? category;

  return (
    <Link
      href={`/play/${category}/${slug}`}
      className="card-playful group relative flex flex-col overflow-hidden"
    >
      {/* Left accent border */}
      <div
        className="absolute left-0 top-0 h-full w-1"
        style={{ background: color }}
      />

      <div className="flex flex-col p-5 pl-6">
        {/* Top row: icon + category pill */}
        <div className="mb-3 flex items-start justify-between">
          <GameIcon gameId={slug} color={color} />
          <span
            className="rounded-full px-2.5 py-1 text-xs font-bold text-white"
            style={{ background: color }}
          >
            {categoryLabel}
          </span>
        </div>

        {/* Title */}
        <h3
          className="mb-1.5 text-lg font-bold text-foreground"
          style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
        >
          {title}
        </h3>

        {/* Description */}
        <p className="mb-4 flex-1 text-base leading-relaxed text-text-muted">
          {description}
        </p>

        {/* Bottom row: count, difficulty, rating, play arrow */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {count && (
              <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-sm font-bold text-primary">
                {count}
              </span>
            )}
            {difficulty && <DifficultyDots level={difficulty} />}
            {rating && rating.ratingCount >= 3 && (
              <span className="flex items-center gap-1 text-sm text-text-muted">
                <Star size={14} fill="#f59e0b" stroke="#f59e0b" />
                {rating.avgRating}
              </span>
            )}
          </div>
          <span className="text-sm font-bold text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            Play &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
