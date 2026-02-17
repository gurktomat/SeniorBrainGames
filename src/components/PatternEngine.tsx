"use client";

import { useState, useCallback } from "react";

interface Puzzle {
  id: string;
  sequence: string[];
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export default function PatternEngine({
  title,
  puzzles,
}: {
  title: string;
  puzzles: Puzzle[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const puzzle = puzzles[currentIndex];
  const correct = selected !== null && selected === puzzle.correctAnswer;

  const handleSelect = useCallback(
    (index: number) => {
      if (selected !== null) return;
      setSelected(index);
      if (index === puzzle.correctAnswer) setScore((s) => s + 1);

      setTimeout(() => {
        if (currentIndex + 1 < puzzles.length) {
          setCurrentIndex((i) => i + 1);
          setSelected(null);
        } else {
          setFinished(true);
        }
      }, 1500);
    },
    [selected, puzzle.correctAnswer, currentIndex, puzzles.length],
  );

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelected(null);
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

      <div className="mb-6">
        <p className="mb-4 text-base text-text-muted text-center">
          What comes next in the pattern?
        </p>
        <div className="mb-6 flex flex-wrap justify-center gap-3">
          {puzzle.sequence.map((item, i) => (
            <span
              key={i}
              className={`rounded-xl px-5 py-3 text-2xl font-semibold ${
                item === "?"
                  ? "bg-secondary/20 text-secondary-dark"
                  : "bg-primary/10 text-primary"
              }`}
            >
              {item}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-3" role="group" aria-label="Answer options">
          {puzzle.options.map((option, i) => {
            let style =
              "border-2 border-border bg-surface text-foreground hover:border-primary hover:bg-primary/5";
            if (selected !== null) {
              if (i === puzzle.correctAnswer) {
                style = "border-2 border-success bg-success/10 text-foreground";
              } else if (i === selected && !correct) {
                style = "border-2 border-error bg-error/10 text-foreground";
              } else {
                style = "border-2 border-border bg-background text-text-muted";
              }
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={selected !== null}
                className={`w-full cursor-pointer rounded-xl px-5 py-4 text-center text-xl font-medium transition-all focus:outline-none focus:ring-4 focus:ring-primary/30 ${style} ${selected !== null ? "cursor-default" : ""}`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {selected !== null && puzzle.explanation && (
          <p className="mt-4 rounded-lg bg-secondary/15 p-4 text-base text-text-muted">
            {puzzle.explanation}
          </p>
        )}
      </div>
    </div>
  );
}
