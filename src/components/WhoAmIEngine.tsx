"use client";

import { useState, useCallback, useMemo } from "react";
import StarRating from "./StarRating";
import { shuffleArray } from "@/lib/shuffle";

interface WhoAmIPuzzle {
  id: string;
  answer: string;
  clues: string[];
}

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/^(the|a|an)\s+/i, "")
    .replace(/[^a-z0-9]/g, "");
}

export default function WhoAmIEngine({
  title,
  puzzles,
}: {
  title: string;
  puzzles: WhoAmIPuzzle[];
}) {
  const shuffledPuzzles = useMemo(() => shuffleArray(puzzles), [puzzles]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cluesRevealed, setCluesRevealed] = useState(1);
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const puzzle = shuffledPuzzles[currentIndex];
  const maxClues = puzzle.clues.length;

  const advance = useCallback(() => {
    if (currentIndex + 1 < shuffledPuzzles.length) {
      setCurrentIndex((i) => i + 1);
      setCluesRevealed(1);
      setGuess("");
      setResult(null);
    } else {
      setFinished(true);
    }
  }, [currentIndex, shuffledPuzzles.length]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (result !== null) return;
      const isCorrect = normalize(guess.trim()) === normalize(puzzle.answer);
      if (isCorrect) {
        const points = maxClues - cluesRevealed + 1;
        setScore((s) => s + points);
        setResult("correct");
        setTimeout(advance, 2000);
      } else if (cluesRevealed < maxClues) {
        setCluesRevealed((c) => c + 1);
        setGuess("");
      } else {
        setResult("wrong");
        setTimeout(advance, 2500);
      }
    },
    [guess, puzzle, result, cluesRevealed, maxClues, advance],
  );

  const handleRestart = () => {
    setCurrentIndex(0);
    setCluesRevealed(1);
    setGuess("");
    setResult(null);
    setScore(0);
    setFinished(false);
  };

  const maxScore = shuffledPuzzles.length * maxClues;

  if (finished) {
    const percentage = Math.round((score / maxScore) * 100);
    return (
      <div className="mx-auto w-full max-w-2xl px-6 py-8 text-center">
        <div className="rounded-2xl border border-border bg-surface p-8" style={{ boxShadow: "var(--shadow-lg)" }}>
          <h2 className="mb-2 text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}>
            Game Complete!
          </h2>
          <p className="mb-6 text-lg text-text-muted">{title}</p>
          <span className="text-5xl font-bold text-primary">{percentage}%</span>
          <p className="mt-2 text-lg text-foreground">{score} out of {maxScore} points</p>
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
          {currentIndex + 1} / {shuffledPuzzles.length}
        </span>
      </div>

      <div className="mb-8 h-2 w-full overflow-hidden rounded-full bg-border" role="progressbar" aria-valuenow={currentIndex + 1} aria-valuemin={1} aria-valuemax={shuffledPuzzles.length}>
        <div className="progress-bar-gradient h-full transition-all duration-500" style={{ width: `${((currentIndex + 1) / shuffledPuzzles.length) * 100}%` }} />
      </div>

      <div className="rounded-2xl border border-border bg-surface p-8 text-center" style={{ boxShadow: "var(--shadow-md)" }}>
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-text-muted">Who Am I?</p>
        <p className="mb-4 text-sm text-text-muted">
          {cluesRevealed < maxClues
            ? `Clue ${cluesRevealed} of ${maxClues} — ${maxClues - cluesRevealed + 1} points if correct`
            : `Final clue — 1 point if correct`}
        </p>

        <div className="mb-6 space-y-3 text-left">
          {puzzle.clues.slice(0, cluesRevealed).map((clue, i) => (
            <div
              key={i}
              className={`rounded-xl border px-4 py-3 text-lg ${
                i === cluesRevealed - 1
                  ? "border-primary/30 bg-primary-50 font-semibold text-foreground"
                  : "border-border bg-background text-text-muted"
              }`}
            >
              <span className="mr-2 font-bold text-primary">#{i + 1}</span>
              {clue}
            </div>
          ))}
        </div>

        {result === null && (
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
            <input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Type your guess..."
              autoFocus
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              className="w-full max-w-sm rounded-xl border border-border bg-background px-5 py-4 text-center text-xl font-semibold text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
              aria-label="Your guess"
            />
            <button type="submit" disabled={guess.trim() === ""} className="btn-primary disabled:opacity-50 focus:outline-none focus:ring-4 focus:ring-primary/20">
              {cluesRevealed < maxClues ? "Guess" : "Final Answer"}
            </button>
          </form>
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
            {result === "correct"
              ? `Correct! +${maxClues - cluesRevealed + 1} points`
              : `The answer was: ${puzzle.answer}`}
          </div>
        )}
      </div>
    </div>
  );
}
