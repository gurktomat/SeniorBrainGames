"use client";

import { useState, useCallback } from "react";

interface SpellingWord {
  id: string;
  word: string;
  definition: string;
  hint: string;
  difficulty: string;
}

export default function SpellingBeeEngine({
  title,
  words,
}: {
  title: string;
  words: SpellingWord[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [guess, setGuess] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const word = words[currentIndex];

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (result !== null) return;
      const isCorrect =
        guess.trim().toUpperCase() === word.word.toUpperCase();
      setResult(isCorrect ? "correct" : "wrong");
      if (isCorrect) setScore((s) => s + 1);

      setTimeout(() => {
        if (currentIndex + 1 < words.length) {
          setCurrentIndex((i) => i + 1);
          setGuess("");
          setShowHint(false);
          setResult(null);
        } else {
          setFinished(true);
        }
      }, 2000);
    },
    [guess, word, result, currentIndex, words.length],
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
    const percentage = Math.round((score / words.length) * 100);
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
            {score} out of {words.length} correct
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
          {currentIndex + 1} / {words.length}
        </span>
      </div>

      <div
        className="mb-8 h-3 w-full overflow-hidden rounded-full bg-border"
        role="progressbar"
        aria-valuenow={currentIndex + 1}
        aria-valuemin={1}
        aria-valuemax={words.length}
      >
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{
            width: `${((currentIndex + 1) / words.length) * 100}%`,
          }}
        />
      </div>

      <div className="rounded-2xl bg-surface p-8 shadow-sm text-center">
        <p className="mb-2 text-base text-text-muted">Spell this word:</p>
        <p className="mb-6 text-xl text-foreground">{word.definition}</p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4"
        >
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            disabled={result !== null}
            placeholder="Type the word..."
            autoFocus
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            className="w-full max-w-xs rounded-xl border-2 border-border bg-background px-5 py-4 text-center text-xl font-semibold text-foreground focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/30"
            aria-label="Spell the word"
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
            {word.hint}
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
              ? "Correct spelling!"
              : `The correct spelling is: ${word.word}`}
          </div>
        )}
      </div>
    </div>
  );
}
