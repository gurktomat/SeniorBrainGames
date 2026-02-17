"use client";

import { useState, useCallback } from "react";

interface Puzzle {
  id: string;
  scrambled: string;
  answer: string;
  hint: string;
  difficulty: string;
}

export default function WordScrambleEngine({
  title,
  puzzles,
}: {
  title: string;
  puzzles: Puzzle[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [guess, setGuess] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const puzzle = puzzles[currentIndex];

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (result !== null) return;
      const isCorrect =
        guess.trim().toUpperCase() === puzzle.answer.toUpperCase();
      setResult(isCorrect ? "correct" : "wrong");
      if (isCorrect) setScore((s) => s + 1);

      setTimeout(() => {
        if (currentIndex + 1 < puzzles.length) {
          setCurrentIndex((i) => i + 1);
          setGuess("");
          setShowHint(false);
          setResult(null);
        } else {
          setFinished(true);
        }
      }, 1500);
    },
    [guess, puzzle, result, currentIndex, puzzles.length],
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
    const percentage = Math.round((score / puzzles.length) * 100);
    return (
      <div className="mx-auto w-full max-w-2xl text-center">
        <div className="rounded-2xl bg-surface p-8 shadow-sm">
          <h2
            className="mb-2 text-3xl font-bold text-foreground"
            style={{
              fontFamily: "var(--font-merriweather), var(--font-heading)",
            }}
          >
            Game Complete!
          </h2>
          <p className="mb-6 text-xl text-text-muted">{title}</p>
          <span className="text-6xl font-bold text-primary">
            {percentage}%
          </span>
          <p className="mt-2 text-xl text-foreground">
            {score} out of {puzzles.length} correct
          </p>
          <button
            onClick={handleRestart}
            className="mt-8 cursor-pointer rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary/30"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-6 flex items-center justify-between">
        <h1
          className="text-2xl font-bold text-foreground"
          style={{
            fontFamily: "var(--font-merriweather), var(--font-heading)",
          }}
        >
          {title}
        </h1>
        <span className="rounded-full bg-primary/10 px-4 py-2 text-lg font-semibold text-primary">
          {currentIndex + 1} / {puzzles.length}
        </span>
      </div>

      <div
        className="mb-8 h-3 w-full overflow-hidden rounded-full bg-border"
        role="progressbar"
        aria-valuenow={currentIndex + 1}
        aria-valuemin={1}
        aria-valuemax={puzzles.length}
      >
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{
            width: `${((currentIndex + 1) / puzzles.length) * 100}%`,
          }}
        />
      </div>

      <div className="rounded-2xl bg-surface p-8 shadow-sm text-center">
        <p className="mb-2 text-base text-text-muted">Unscramble this word:</p>
        <p
          className="mb-6 text-4xl font-bold tracking-widest text-primary"
          aria-label={`Scrambled letters: ${puzzle.scrambled.split("").join(" ")}`}
        >
          {puzzle.scrambled}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            disabled={result !== null}
            placeholder="Type your answer..."
            autoFocus
            className="w-full max-w-xs rounded-xl border-2 border-border bg-background px-5 py-4 text-center text-xl font-semibold text-foreground focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/30"
            aria-label="Your answer"
          />
          <button
            type="submit"
            disabled={result !== null || guess.trim() === ""}
            className="cursor-pointer rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary/30 disabled:opacity-50"
          >
            Submit
          </button>
        </form>

        {!showHint && result === null && (
          <button
            onClick={() => setShowHint(true)}
            className="mt-4 text-lg text-primary underline hover:text-primary-dark"
          >
            Need a hint?
          </button>
        )}

        {showHint && result === null && (
          <p className="mt-4 rounded-lg bg-secondary/15 p-4 text-lg text-foreground">
            {puzzle.hint}
          </p>
        )}

        {result !== null && (
          <div
            role="status"
            aria-live="polite"
            className={`mt-4 rounded-lg p-4 text-lg font-semibold ${
              result === "correct"
                ? "bg-success/10 text-foreground"
                : "bg-error/10 text-foreground"
            }`}
          >
            {result === "correct"
              ? "Correct! Well done!"
              : `The answer was: ${puzzle.answer}`}
          </div>
        )}
      </div>
    </div>
  );
}
