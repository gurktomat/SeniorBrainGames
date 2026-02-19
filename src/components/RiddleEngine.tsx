"use client";

import { useState, useCallback, useMemo } from "react";
import StarRating from "./StarRating";
import { shuffleArray } from "@/lib/shuffle";

interface Riddle {
  id: string;
  riddle: string;
  answer: string;
  hint: string;
}

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/^(the|a|an)\s+/i, "")
    .replace(/[^a-z0-9]/g, "");
}

export default function RiddleEngine({
  title,
  riddles,
}: {
  title: string;
  riddles: Riddle[];
}) {
  const shuffledRiddles = useMemo(() => shuffleArray(riddles), [riddles]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [guess, setGuess] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const riddle = shuffledRiddles[currentIndex];

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (result !== null) return;
      const isCorrect = normalize(guess.trim()) === normalize(riddle.answer);
      setResult(isCorrect ? "correct" : "wrong");
      if (isCorrect) setScore((s) => s + 1);

      setTimeout(() => {
        if (currentIndex + 1 < shuffledRiddles.length) {
          setCurrentIndex((i) => i + 1);
          setGuess("");
          setShowHint(false);
          setResult(null);
        } else {
          setFinished(true);
        }
      }, 2000);
    },
    [guess, riddle, result, currentIndex, shuffledRiddles.length],
  );

  const handleRestart = () => {
    setCurrentIndex(0);
    setGuess("");
    setShowHint(false);
    setResult(null);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    const percentage = Math.round((score / shuffledRiddles.length) * 100);
    return (
      <div className="mx-auto w-full max-w-2xl px-6 py-8 text-center">
        <div className="rounded-2xl border border-border bg-surface p-8" style={{ boxShadow: "var(--shadow-lg)" }}>
          <h2 className="mb-2 text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}>
            Game Complete!
          </h2>
          <p className="mb-6 text-lg text-text-muted">{title}</p>
          <span className="text-5xl font-bold text-primary">{percentage}%</span>
          <p className="mt-2 text-lg text-foreground">{score} out of {shuffledRiddles.length} correct</p>
          <StarRating />
          <button onClick={handleRestart} className="btn-primary mt-8 focus:outline-none focus:ring-4 focus:ring-primary/20">
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground sm:text-2xl" style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}>
          {title}
        </h1>
        <span className="rounded-full px-4 py-1.5 text-sm font-bold text-white" style={{ background: "var(--gradient-primary)" }}>
          {currentIndex + 1} / {shuffledRiddles.length}
        </span>
      </div>

      <div className="mb-8 h-2 w-full overflow-hidden rounded-full bg-border" role="progressbar" aria-valuenow={currentIndex + 1} aria-valuemin={1} aria-valuemax={shuffledRiddles.length}>
        <div className="progress-bar-gradient h-full transition-all duration-500" style={{ width: `${((currentIndex + 1) / shuffledRiddles.length) * 100}%` }} />
      </div>

      <div className="rounded-2xl border border-border bg-surface p-8 text-center" style={{ boxShadow: "var(--shadow-md)" }}>
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-text-muted">Solve the Riddle</p>
        <p className="mb-6 text-xl font-semibold text-foreground sm:text-2xl" style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}>
          {riddle.riddle}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            disabled={result !== null}
            placeholder="Type your answer..."
            autoFocus
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            className="w-full max-w-sm rounded-xl border border-border bg-background px-5 py-4 text-center text-xl font-semibold text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
            aria-label="Your answer"
          />
          <button type="submit" disabled={result !== null || guess.trim() === ""} className="btn-primary disabled:opacity-50 focus:outline-none focus:ring-4 focus:ring-primary/20">
            Submit
          </button>
        </form>

        {!showHint && result === null && (
          <button onClick={() => setShowHint(true)} className="mt-4 text-base font-semibold text-primary hover:text-primary-dark hover:underline">
            Need a hint?
          </button>
        )}

        {showHint && result === null && (
          <p className="mt-4 rounded-xl border border-secondary-light/30 bg-warm-bg p-4 text-base text-foreground">
            {riddle.hint}
          </p>
        )}

        {result !== null && (
          <div
            role="status"
            aria-live="polite"
            className={`mt-4 rounded-xl border p-4 text-lg font-semibold ${
              result === "correct"
                ? "border-success/20 bg-success/10 text-foreground"
                : "border-error/20 bg-error/10 text-foreground"
            }`}
          >
            {result === "correct" ? "Correct! Well done!" : `The answer was: ${riddle.answer}`}
          </div>
        )}
      </div>
    </div>
  );
}
