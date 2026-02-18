"use client";

import { useState, useCallback } from "react";

interface EstimationQuestion {
  id: string;
  question: string;
  answer: number;
  unit: string;
  funFact: string;
}

function scoreGuess(guess: number, answer: number): "correct" | "close" | "wrong" {
  const ratio = Math.abs(guess - answer) / answer;
  if (ratio <= 0.1) return "correct";
  if (ratio <= 0.25) return "close";
  return "wrong";
}

export default function EstimationEngine({
  title,
  questions,
}: {
  title: string;
  questions: EstimationQuestion[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState<"correct" | "close" | "wrong" | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[currentIndex];

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (result !== null) return;
      const numGuess = parseInt(guess.replace(/,/g, ""), 10);
      if (isNaN(numGuess)) return;
      const rating = scoreGuess(numGuess, question.answer);
      setResult(rating);
      if (rating === "correct") setScore((s) => s + 2);
      else if (rating === "close") setScore((s) => s + 1);

      setTimeout(() => {
        if (currentIndex + 1 < questions.length) {
          setCurrentIndex((i) => i + 1);
          setGuess("");
          setResult(null);
        } else {
          setFinished(true);
        }
      }, 3000);
    },
    [guess, question, result, currentIndex, questions.length],
  );

  const handleRestart = () => {
    setCurrentIndex(0);
    setGuess("");
    setResult(null);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    const maxScore = questions.length * 2;
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
          <p className="mt-1 text-base text-text-muted">2 pts for spot-on, 1 pt for close</p>
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
          {currentIndex + 1} / {questions.length}
        </span>
      </div>

      <div className="mb-8 h-2 w-full overflow-hidden rounded-full bg-border" role="progressbar" aria-valuenow={currentIndex + 1} aria-valuemin={1} aria-valuemax={questions.length}>
        <div className="progress-bar-gradient h-full transition-all duration-500" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
      </div>

      <div className="rounded-2xl border border-border bg-surface p-8 text-center" style={{ boxShadow: "var(--shadow-md)" }}>
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-text-muted">How close can you guess?</p>
        <p className="mb-6 text-xl font-semibold text-foreground sm:text-2xl" style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}>
          {question.question}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              inputMode="numeric"
              value={guess}
              onChange={(e) => setGuess(e.target.value.replace(/[^0-9,.-]/g, ""))}
              disabled={result !== null}
              placeholder="Your guess..."
              autoFocus
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              className="w-full max-w-xs rounded-xl border border-border bg-background px-5 py-4 text-center text-xl font-semibold text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
              aria-label="Your numeric guess"
            />
            {question.unit && (
              <span className="text-lg font-semibold text-text-muted">{question.unit}</span>
            )}
          </div>
          <button type="submit" disabled={result !== null || guess.trim() === ""} className="btn-primary disabled:opacity-50 focus:outline-none focus:ring-4 focus:ring-primary/20">
            Submit Guess
          </button>
        </form>

        {result !== null && (
          <div
            role="status"
            aria-live="polite"
            className={`mt-6 rounded-xl border p-4 text-lg font-semibold ${
              result === "correct"
                ? "border-success/20 bg-success/10 text-foreground"
                : result === "close"
                  ? "border-secondary-light/30 bg-warm-bg text-foreground"
                  : "border-error/20 bg-error/10 text-foreground"
            }`}
          >
            {result === "correct" && "Spot on! Within 10%!"}
            {result === "close" && "Close! Within 25%!"}
            {result === "wrong" && "Not quite!"}
            <p className="mt-2 text-base font-normal">
              The answer is <strong>{question.answer.toLocaleString()} {question.unit}</strong>
            </p>
            <p className="mt-1 text-sm font-normal text-text-muted">{question.funFact}</p>
          </div>
        )}
      </div>
    </div>
  );
}
