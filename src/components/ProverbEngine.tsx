"use client";

import { useState, useCallback, useMemo } from "react";
import StarRating from "./StarRating";
import { shuffleArray } from "@/lib/shuffle";

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
  const shuffledQuestions = useMemo(() => shuffleArray(questions), [questions]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = shuffledQuestions[currentIndex];
  const correct = selected !== null && selected === q.correctAnswer;

  const handleSelect = useCallback(
    (index: number) => {
      if (selected !== null) return;
      setSelected(index);
      if (index === q.correctAnswer) setScore((s) => s + 1);

      setTimeout(() => {
        if (currentIndex + 1 < shuffledQuestions.length) {
          setCurrentIndex((i) => i + 1);
          setSelected(null);
        } else {
          setFinished(true);
        }
      }, 1500);
    },
    [selected, q.correctAnswer, currentIndex, shuffledQuestions.length],
  );

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    const percentage = Math.round((score / shuffledQuestions.length) * 100);
    return (
      <div className="mx-auto w-full max-w-2xl px-6 py-8 text-center">
        <div className="rounded-2xl border border-border bg-surface p-8" style={{ boxShadow: "var(--shadow-lg)" }}>
          <h2 className="mb-2 text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}>
            Game Complete!
          </h2>
          <p className="mb-6 text-lg text-text-muted">{title}</p>
          <span className="text-5xl font-bold text-primary">{percentage}%</span>
          <p className="mt-2 text-lg text-foreground">{score} out of {shuffledQuestions.length} correct</p>
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
          {currentIndex + 1} / {shuffledQuestions.length}
        </span>
      </div>

      <div className="mb-8 h-2 w-full overflow-hidden rounded-full bg-border" role="progressbar" aria-valuenow={currentIndex + 1} aria-valuemin={1} aria-valuemax={shuffledQuestions.length}>
        <div className="progress-bar-gradient h-full transition-all duration-500" style={{ width: `${((currentIndex + 1) / shuffledQuestions.length) * 100}%` }} />
      </div>

      <div className="mb-6">
        <h2 className="mb-6 text-xl font-semibold leading-relaxed text-foreground sm:text-2xl">
          {q.proverb}
        </h2>

        <div className="flex flex-col gap-3" role="group" aria-label="Options">
          {q.options.map((option, i) => {
            let style = "border border-border bg-surface text-foreground hover:border-primary-200 hover:bg-primary-50";
            if (selected !== null) {
              if (i === q.correctAnswer) {
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

        {selected !== null && q.explanation && (
          <p className="mt-4 rounded-xl border border-secondary-light/30 bg-warm-bg p-4 text-base text-text-muted">
            {q.explanation}
          </p>
        )}
      </div>
    </div>
  );
}
