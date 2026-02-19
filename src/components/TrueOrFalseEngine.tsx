"use client";

import { useState, useCallback } from "react";
import StarRating from "./StarRating";

interface Statement {
  id: string;
  statement: string;
  answer: boolean;
  explanation: string;
}

export default function TrueOrFalseEngine({
  title,
  statements,
}: {
  title: string;
  statements: Statement[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const item = statements[currentIndex];

  const handleAnswer = useCallback(
    (chosen: boolean) => {
      if (result !== null) return;
      const isCorrect = chosen === item.answer;
      setResult(isCorrect ? "correct" : "wrong");
      if (isCorrect) setScore((s) => s + 1);

      setTimeout(
        () => {
          if (currentIndex + 1 < statements.length) {
            setCurrentIndex((i) => i + 1);
            setResult(null);
          } else {
            setFinished(true);
          }
        },
        isCorrect ? 1500 : 2000,
      );
    },
    [result, item, currentIndex, statements.length],
  );

  const handleRestart = () => {
    setCurrentIndex(0);
    setResult(null);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    const percentage = Math.round((score / statements.length) * 100);
    return (
      <div className="mx-auto w-full max-w-2xl px-6 py-8 text-center">
        <div
          className="rounded-2xl border border-border bg-surface p-8"
          style={{ boxShadow: "var(--shadow-lg)" }}
        >
          <h2
            className="mb-2 text-3xl font-bold text-foreground"
            style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
          >
            Game Complete!
          </h2>
          <p className="mb-6 text-lg text-text-muted">{title}</p>
          <span className="text-5xl font-bold text-primary">{percentage}%</span>
          <p className="mt-2 text-lg text-foreground">
            {score} out of {statements.length} correct
          </p>
          <StarRating />
          <button
            onClick={handleRestart}
            className="btn-primary mt-8 focus:outline-none focus:ring-4 focus:ring-primary/20"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1
          className="text-xl font-bold text-foreground sm:text-2xl"
          style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
        >
          {title}
        </h1>
        <span
          className="rounded-full px-4 py-1.5 text-sm font-bold text-white"
          style={{ background: "var(--gradient-primary)" }}
        >
          {currentIndex + 1} / {statements.length}
        </span>
      </div>

      <div
        className="mb-8 h-2 w-full overflow-hidden rounded-full bg-border"
        role="progressbar"
        aria-valuenow={currentIndex + 1}
        aria-valuemin={1}
        aria-valuemax={statements.length}
      >
        <div
          className="progress-bar-gradient h-full transition-all duration-500"
          style={{ width: `${((currentIndex + 1) / statements.length) * 100}%` }}
        />
      </div>

      <div
        className="rounded-2xl border border-border bg-surface p-8 text-center"
        style={{ boxShadow: "var(--shadow-md)" }}
      >
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-text-muted">
          True or False?
        </p>
        <p className="mb-8 text-xl font-semibold text-foreground sm:text-2xl">
          {item.statement}
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => handleAnswer(true)}
            disabled={result !== null}
            className="flex-1 max-w-[160px] rounded-xl border-2 border-green-500 bg-green-50 px-6 py-4 text-xl font-bold text-green-700 transition-all hover:bg-green-100 disabled:opacity-50 focus:outline-none focus:ring-4 focus:ring-green-500/20"
          >
            TRUE
          </button>
          <button
            onClick={() => handleAnswer(false)}
            disabled={result !== null}
            className="flex-1 max-w-[160px] rounded-xl border-2 border-red-500 bg-red-50 px-6 py-4 text-xl font-bold text-red-700 transition-all hover:bg-red-100 disabled:opacity-50 focus:outline-none focus:ring-4 focus:ring-red-500/20"
          >
            FALSE
          </button>
        </div>

        {result !== null && (
          <div
            role="status"
            aria-live="polite"
            className={`mt-6 rounded-xl border p-4 text-lg font-semibold ${
              result === "correct"
                ? "border-success/20 bg-success/10 text-foreground"
                : "border-error/20 bg-error/10 text-foreground"
            }`}
          >
            <p className="mb-1">
              {result === "correct" ? "Correct!" : `Wrong! The answer is ${item.answer ? "TRUE" : "FALSE"}.`}
            </p>
            <p className="text-base font-normal text-text-muted">
              {item.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
