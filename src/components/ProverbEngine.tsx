"use client";

import { useState, useCallback } from "react";

interface ProverbQuestion {
  id: string;
  proverb: string;
  blank: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export default function ProverbEngine({
  title,
  questions,
}: {
  title: string;
  questions: ProverbQuestion[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[currentIndex];
  const correct = selected !== null && selected === q.correctAnswer;

  const handleSelect = useCallback(
    (index: number) => {
      if (selected !== null) return;
      setSelected(index);
      if (index === q.correctAnswer) setScore((s) => s + 1);

      setTimeout(() => {
        if (currentIndex + 1 < questions.length) {
          setCurrentIndex((i) => i + 1);
          setSelected(null);
        } else {
          setFinished(true);
        }
      }, 1500);
    },
    [selected, q.correctAnswer, currentIndex, questions.length],
  );

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100);
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
            {score} out of {questions.length} correct
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
          {currentIndex + 1} / {questions.length}
        </span>
      </div>

      <div
        className="mb-8 h-3 w-full overflow-hidden rounded-full bg-border"
        role="progressbar"
        aria-valuenow={currentIndex + 1}
        aria-valuemin={1}
        aria-valuemax={questions.length}
      >
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{
            width: `${((currentIndex + 1) / questions.length) * 100}%`,
          }}
        />
      </div>

      <div className="mb-6">
        <h2 className="mb-6 text-xl font-semibold leading-relaxed text-foreground sm:text-2xl">
          {q.proverb}
        </h2>

        <div className="flex flex-col gap-3" role="group" aria-label="Options">
          {q.options.map((option, i) => {
            let style =
              "border-2 border-border bg-surface text-foreground hover:border-primary hover:bg-primary/5";
            if (selected !== null) {
              if (i === q.correctAnswer) {
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
                className={`w-full cursor-pointer rounded-xl px-5 py-4 text-left text-lg font-medium transition-all focus:outline-none focus:ring-4 focus:ring-primary/30 ${style} ${selected !== null ? "cursor-default" : ""}`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {selected !== null && q.explanation && (
          <p className="mt-4 rounded-lg bg-secondary/15 p-4 text-base text-text-muted">
            {q.explanation}
          </p>
        )}
      </div>
    </div>
  );
}
