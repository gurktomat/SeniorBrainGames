"use client";

import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import StarRating from "./StarRating";
import { shuffleArray } from "@/lib/shuffle";

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
  const shuffledRounds = useMemo(() => shuffleArray(rounds), [rounds]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<"memorize" | "guess">("memorize");
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const countRef = useRef(5);

  const round = shuffledRounds[currentIndex];

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
        if (currentIndex + 1 < shuffledRounds.length) {
          setCurrentIndex((i) => i + 1);
          setSelected(null);
          setPhase("memorize");
        } else {
          setFinished(true);
        }
      }, 1500);
    },
    [selected, phase, round.correctAnswer, currentIndex, shuffledRounds.length],
  );

  const handleRestart = () => {
    setCurrentIndex(0);
    setPhase("memorize");
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    const percentage = Math.round((score / shuffledRounds.length) * 100);
    return (
      <div className="mx-auto w-full max-w-2xl px-6 py-8 text-center">
        <div className="rounded-2xl border border-border bg-surface p-8" style={{ boxShadow: "var(--shadow-lg)" }}>
          <h2 className="mb-2 text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}>
            Game Complete!
          </h2>
          <p className="mb-6 text-lg text-text-muted">{title}</p>
          <span className="text-5xl font-bold text-primary">{percentage}%</span>
          <p className="mt-2 text-lg text-foreground">{score} out of {shuffledRounds.length} correct</p>
          <StarRating />
          <button onClick={handleRestart} className="btn-primary mt-8 focus:outline-none focus:ring-4 focus:ring-primary/20">
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
    <div className="mx-auto w-full max-w-2xl px-6 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground sm:text-2xl" style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}>
          {title}
        </h1>
        <span className="rounded-full px-4 py-1.5 text-sm font-bold text-white" style={{ background: "var(--gradient-primary)" }}>
          {currentIndex + 1} / {shuffledRounds.length}
        </span>
      </div>

      <div className="mb-8 h-2 w-full overflow-hidden rounded-full bg-border" role="progressbar" aria-valuenow={currentIndex + 1} aria-valuemin={1} aria-valuemax={shuffledRounds.length}>
        <div className="progress-bar-gradient h-full transition-all duration-500" style={{ width: `${((currentIndex + 1) / shuffledRounds.length) * 100}%` }} />
      </div>

      <div className="rounded-2xl border border-border bg-surface p-8 text-center" style={{ boxShadow: "var(--shadow-md)" }}>
        {phase === "memorize" ? (
          <>
            <p className="mb-4 text-base font-bold text-primary">
              Memorize these items! ({countdown}s)
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {visibleItems.map((item, i) => (
                <span key={i} className="text-5xl" role="img">{item}</span>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="mb-4 text-base font-semibold text-foreground">
              One item is missing! Which one was it?
            </p>
            <div className="mb-6 flex flex-wrap justify-center gap-4">
              {visibleItems.map((item, i) => (
                <span key={i} className="text-5xl" role="img">{item}</span>
              ))}
              <span className="flex h-16 w-16 items-center justify-center rounded-xl border-2 border-dashed border-primary/30 text-3xl text-primary/30">
                ?
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-3" role="group" aria-label="Options">
              {round.options.map((option, i) => {
                let style = "border border-border bg-surface hover:border-primary-200 hover:bg-primary-50";
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
                    className={`cursor-pointer rounded-xl p-4 text-4xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary/20 ${style}`}
                    aria-label={`Option: ${option}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {selected !== null && (
              <div role="status" aria-live="polite" className={`mt-4 rounded-xl border p-4 text-lg font-semibold ${selected === round.correctAnswer ? "border-success/20 bg-success/10 text-foreground" : "border-error/20 bg-error/10 text-foreground"}`}>
                {selected === round.correctAnswer ? "Correct! Great memory!" : `The missing item was: ${round.options[round.correctAnswer]}`}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
