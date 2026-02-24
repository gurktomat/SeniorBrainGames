"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, ChevronDown, ChevronUp, Clock, Trophy } from "lucide-react";
import { categoryColors } from "@/lib/gameIcons";
import { categoryInfo } from "@/lib/quizzes";
import type { GameCategory } from "@/lib/types";

interface PreGameScreenProps {
  title: string;
  category: string;
  description: string;
  difficulty?: 1 | 2 | 3;
  estimatedTime?: string;
  bestScore?: { correct: number; total: number } | null;
  howToPlay?: string;
  onStart: () => void;
}

function DifficultyDots({ level }: { level: 1 | 2 | 3 }) {
  const labels = ["Easy", "Medium", "Hard"];
  return (
    <div className="flex items-center gap-2">
      <span className="flex items-center gap-1">
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className={`inline-block h-2.5 w-2.5 rounded-full ${
              i <= level ? "bg-accent" : "bg-border"
            }`}
          />
        ))}
      </span>
      <span className="text-sm text-text-muted">{labels[level - 1]}</span>
    </div>
  );
}

export default function PreGameScreen({
  title,
  category,
  description,
  difficulty,
  estimatedTime,
  bestScore,
  howToPlay,
  onStart,
}: PreGameScreenProps) {
  const [showHowTo, setShowHowTo] = useState(false);
  const color = categoryColors[category] ?? "#7C5CFC";
  const info = categoryInfo[category as GameCategory];
  const categoryLabel = info?.title ?? category;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mx-auto max-w-lg px-6 py-12"
    >
      <div className="card-playful overflow-hidden">
        {/* Color accent top bar */}
        <div className="h-1.5" style={{ background: color }} />

        <div className="p-8 text-center">
          {/* Category pill */}
          <span
            className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-bold text-white"
            style={{ background: color }}
          >
            {categoryLabel}
          </span>

          {/* Title */}
          <h1
            className="mb-3 text-2xl font-bold text-foreground sm:text-3xl"
            style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
          >
            {title}
          </h1>

          {/* Description */}
          <p className="mb-6 text-base text-text-muted">{description}</p>

          {/* Info chips */}
          <div className="mb-6 flex flex-wrap items-center justify-center gap-4">
            {difficulty && <DifficultyDots level={difficulty} />}
            {estimatedTime && (
              <div className="flex items-center gap-1.5 text-sm text-text-muted">
                <Clock size={14} />
                <span>{estimatedTime}</span>
              </div>
            )}
          </div>

          {/* Best score */}
          {bestScore && (
            <div className="mb-6 flex items-center justify-center gap-2 rounded-lg bg-primary-50 px-4 py-2.5">
              <Trophy size={16} className="text-primary" />
              <span className="text-sm font-semibold text-primary">
                Your best: {bestScore.correct}/{bestScore.total}
              </span>
            </div>
          )}

          {/* Start button */}
          <button
            onClick={onStart}
            className="btn-primary inline-flex items-center gap-2 px-8 py-3 text-lg font-bold"
          >
            <Play size={20} fill="currentColor" />
            Start Playing
          </button>

          {/* How to play expandable */}
          {howToPlay && (
            <div className="mt-6 border-t border-border pt-4">
              <button
                onClick={() => setShowHowTo(!showHowTo)}
                className="mx-auto flex items-center gap-1.5 text-sm font-semibold text-text-muted transition-colors hover:text-primary"
              >
                How to Play
                {showHowTo ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {showHowTo && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-3 text-sm leading-relaxed text-text-muted"
                >
                  {howToPlay}
                </motion.p>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
