"use client";

import { useState, useCallback, useEffect, useRef } from "react";

interface Round {
  id: string;
  items: string[];
  missingIndex: number;
  options: string[];
  correctAnswer: number;
}

export default function WhatsMissingEngine({
  title,
  rounds,
}: {
  title: string;
  rounds: Round[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<"memorize" | "guess">("memorize");
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const countRef = useRef(5);

  const round = rounds[currentIndex];

  useEffect(() => {
    if (phase !== "memorize") return;
    countRef.current = 5;
    const timer = setInterval(() => {
      countRef.current -= 1;
      if (countRef.current <= 0) {
        clearInterval(timer);
        setCountdown(0);
        setPhase("guess");
      } else {
        setCountdown(countRef.current);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [phase, currentIndex]);

  const handleSelect = useCallback(
    (index: number) => {
      if (selected !== null || phase !== "guess") return;
      setSelected(index);
      if (index === round.correctAnswer) setScore((s) => s + 1);

      setTimeout(() => {
        if (currentIndex + 1 < rounds.length) {
          setCurrentIndex((i) => i + 1);
          setSelected(null);
          setPhase("memorize");
        } else {
          setFinished(true);
        }
      }, 1500);
    },
    [selected, phase, round.correctAnswer, currentIndex, rounds.length],
  );

  const handleRestart = () => {
    setCurrentIndex(0);
    setPhase("memorize");
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    const percentage = Math.round((score / rounds.length) * 100);
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
            {score} out of {rounds.length} correct
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

  const visibleItems =
    phase === "memorize"
      ? round.items
      : round.items.filter((_, i) => i !== round.missingIndex);

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
          {currentIndex + 1} / {rounds.length}
        </span>
      </div>

      <div
        className="mb-8 h-3 w-full overflow-hidden rounded-full bg-border"
        role="progressbar"
        aria-valuenow={currentIndex + 1}
        aria-valuemin={1}
        aria-valuemax={rounds.length}
      >
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{
            width: `${((currentIndex + 1) / rounds.length) * 100}%`,
          }}
        />
      </div>

      <div className="rounded-2xl bg-surface p-8 shadow-sm text-center">
        {phase === "memorize" ? (
          <>
            <p className="mb-4 text-lg font-semibold text-primary">
              Memorize these items! ({countdown}s)
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {visibleItems.map((item, i) => (
                <span key={i} className="text-5xl" role="img">
                  {item}
                </span>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="mb-4 text-lg font-semibold text-foreground">
              One item is missing! Which one was it?
            </p>
            <div className="mb-6 flex flex-wrap justify-center gap-4">
              {visibleItems.map((item, i) => (
                <span key={i} className="text-5xl" role="img">
                  {item}
                </span>
              ))}
              <span className="flex h-16 w-16 items-center justify-center rounded-xl border-2 border-dashed border-primary/40 text-3xl text-primary/40">
                ?
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-3" role="group" aria-label="Options">
              {round.options.map((option, i) => {
                let style =
                  "border-2 border-border bg-surface hover:border-primary hover:bg-primary/5";
                if (selected !== null) {
                  if (i === round.correctAnswer) {
                    style = "border-2 border-success bg-success/10";
                  } else if (i === selected && selected !== round.correctAnswer) {
                    style = "border-2 border-error bg-error/10";
                  }
                }
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    disabled={selected !== null}
                    className={`cursor-pointer rounded-xl p-4 text-4xl transition-all focus:outline-none focus:ring-4 focus:ring-primary/30 ${style}`}
                    aria-label={`Option: ${option}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {selected !== null && (
              <div
                role="status"
                aria-live="polite"
                className={`mt-4 rounded-lg p-4 text-lg font-semibold ${
                  selected === round.correctAnswer
                    ? "bg-success/10 text-foreground"
                    : "bg-error/10 text-foreground"
                }`}
              >
                {selected === round.correctAnswer
                  ? "Correct! Great memory!"
                  : `The missing item was: ${round.options[round.correctAnswer]}`}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
