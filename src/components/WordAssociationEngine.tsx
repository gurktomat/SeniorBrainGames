"use client";

import { useState, useCallback } from "react";

interface Puzzle {
  id: string;
  words: string[];
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export default function WordAssociationEngine({
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
      <div className="mx-auto w-full max-w-2xl px-6 py-8 text-center">
        <div className="rounded-2xl border border-border bg-surface p-8" style={{ boxShadow: "var(--shadow-lg)" }}>
          <h2 className="mb-2 text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}>
            Game Complete!
          </h2>
          <p className="mb-6 text-lg text-text-muted">{title}</p>
          <span className="text-5xl font-bold text-primary">{percentage}%</span>
          <p className="mt-2 text-lg text-foreground">{score} out of {puzzles.length} correct</p>
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
          {currentIndex + 1} / {puzzles.length}
        </span>
      </div>

      <div className="mb-8 h-2 w-full overflow-hidden rounded-full bg-border" role="progressbar" aria-valuenow={currentIndex + 1} aria-valuemin={1} aria-valuemax={puzzles.length}>
        <div className="progress-bar-gradient h-full transition-all duration-500" style={{ width: `${((currentIndex + 1) / puzzles.length) * 100}%` }} />
      </div>

      <div className="mb-6">
        <p className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-text-muted">
          What do these words have in common?
        </p>
        <div className="mb-6 flex flex-wrap justify-center gap-3">
          {puzzle.words.map((word, i) => (
            <span key={i} className="rounded-xl bg-primary-50 px-5 py-3 text-xl font-semibold text-primary">
              {word}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-3" role="group" aria-label="Options">
          {puzzle.options.map((option, i) => {
            let style = "border border-border bg-surface text-foreground hover:border-primary-200 hover:bg-primary-50";
            if (selected !== null) {
              if (i === puzzle.correctAnswer) {
                style = "border-2 border-success bg-success/10 text-foreground";
              } else if (i === selected && !correct) {
                style = "border-2 border-error bg-error/10 text-foreground";
              } else {
                style = "border border-border bg-background text-text-muted";
              }
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={selected !== null}
                className={`w-full cursor-pointer rounded-xl px-5 py-4 text-left text-lg font-medium transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary/20 ${style} ${selected !== null ? "cursor-default" : ""}`}
                style={selected === null ? { boxShadow: "var(--shadow-sm)" } : undefined}
              >
                {option}
              </button>
            );
          })}
        </div>

        {selected !== null && puzzle.explanation && (
          <p className="mt-4 rounded-xl border border-secondary-light/30 bg-warm-bg p-4 text-base text-text-muted">
            {puzzle.explanation}
          </p>
        )}
      </div>
    </div>
  );
}
