"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import StarRating from "./StarRating";

interface NumberRound {
  id: string;
  sequence: string;
  displayTime: number;
}

export default function NumberMemoryEngine({
  title,
  rounds,
}: {
  title: string;
  rounds: NumberRound[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<"showing" | "input" | "result">("showing");
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const round = rounds[currentIndex];

  useEffect(() => {
    if (phase === "showing") {
      timerRef.current = setTimeout(() => {
        setPhase("input");
      }, round.displayTime);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [phase, round.displayTime]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (phase !== "input") return;
      const isCorrect = guess.trim() === round.sequence;
      setResult(isCorrect ? "correct" : "wrong");
      if (isCorrect) setScore((s) => s + 1);
      setPhase("result");

      setTimeout(() => {
        if (currentIndex + 1 < rounds.length) {
          setCurrentIndex((i) => i + 1);
          setGuess("");
          setResult(null);
          setPhase("showing");
        } else {
          setFinished(true);
        }
      }, 2000);
    },
    [guess, round, phase, currentIndex, rounds.length],
  );

  const handleRestart = () => {
    setCurrentIndex(0);
    setGuess("");
    setResult(null);
    setScore(0);
    setFinished(false);
    setPhase("showing");
  };

  if (finished) {
    const percentage = Math.round((score / rounds.length) * 100);
    return (
      <div className="mx-auto w-full max-w-2xl px-6 py-8 text-center">
        <div className="rounded-2xl border border-border bg-surface p-8" style={{ boxShadow: "var(--shadow-lg)" }}>
          <h2 className="mb-2 text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}>
            Game Complete!
          </h2>
          <p className="mb-6 text-lg text-text-muted">{title}</p>
          <span className="text-5xl font-bold text-primary">{percentage}%</span>
          <p className="mt-2 text-lg text-foreground">{score} out of {rounds.length} correct</p>
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
          {currentIndex + 1} / {rounds.length}
        </span>
      </div>

      <div className="mb-8 h-2 w-full overflow-hidden rounded-full bg-border" role="progressbar" aria-valuenow={currentIndex + 1} aria-valuemin={1} aria-valuemax={rounds.length}>
        <div className="progress-bar-gradient h-full transition-all duration-500" style={{ width: `${((currentIndex + 1) / rounds.length) * 100}%` }} />
      </div>

      <div className="rounded-2xl border border-border bg-surface p-8 text-center" style={{ boxShadow: "var(--shadow-md)" }}>
        {phase === "showing" && (
          <>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-text-muted">Remember this number</p>
            <p className="mb-6 font-mono text-4xl font-bold tracking-widest text-primary sm:text-5xl">
              {round.sequence}
            </p>
            <p className="text-base text-text-muted">Memorize it before it disappears...</p>
          </>
        )}

        {phase === "input" && (
          <>
            <p className="mb-6 text-sm font-semibold uppercase tracking-wider text-text-muted">What was the number?</p>
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={guess}
                onChange={(e) => setGuess(e.target.value.replace(/[^0-9]/g, ""))}
                placeholder="Type the number..."
                autoFocus
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                className="w-full max-w-xs rounded-xl border border-border bg-background px-5 py-4 text-center font-mono text-2xl font-bold tracking-widest text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
                aria-label="Type the number"
              />
              <button type="submit" disabled={guess.trim() === ""} className="btn-primary disabled:opacity-50 focus:outline-none focus:ring-4 focus:ring-primary/20">
                Submit
              </button>
            </form>
          </>
        )}

        {phase === "result" && result !== null && (
          <div
            role="status"
            aria-live="polite"
            className={`rounded-xl border p-6 text-lg font-semibold ${
              result === "correct"
                ? "border-success/20 bg-success/10 text-foreground"
                : "border-error/20 bg-error/10 text-foreground"
            }`}
          >
            {result === "correct"
              ? "Correct! Great memory!"
              : `The number was: ${round.sequence}`}
          </div>
        )}
      </div>
    </div>
  );
}
