"use client";

import { useState, useCallback, useEffect, useRef } from "react";

interface Round {
  id: string;
  original: string[];
  changed: string[];
  changedIndex: number;
  hint?: string;
}

export default function SpotDifferenceEngine({
  title,
  rounds,
}: {
  title: string;
  rounds: Round[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<"memorize" | "find">("memorize");
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showHint, setShowHint] = useState(false);
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
        setPhase("find");
      } else {
        setCountdown(countRef.current);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [phase, currentIndex]);

  const handleSelect = useCallback(
    (index: number) => {
      if (selected !== null || phase !== "find") return;
      setSelected(index);
      if (index === round.changedIndex) setScore((s) => s + 1);

      setTimeout(() => {
        if (currentIndex + 1 < rounds.length) {
          setCurrentIndex((i) => i + 1);
          setSelected(null);
          setPhase("memorize");
          setShowHint(false);
        } else {
          setFinished(true);
        }
      }, 1500);
    },
    [selected, phase, round.changedIndex, currentIndex, rounds.length],
  );

  const handleRestart = () => {
    setCurrentIndex(0);
    setPhase("memorize");
    setSelected(null);
    setScore(0);
    setFinished(false);
    setShowHint(false);
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
          <button onClick={handleRestart} className="btn-primary mt-8 focus:outline-none focus:ring-4 focus:ring-primary/20">
            Play Again
          </button>
        </div>
      </div>
    );
  }

  const items = phase === "memorize" ? round.original : round.changed;

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
        {phase === "memorize" ? (
          <>
            <p className="mb-4 text-base font-bold text-primary">
              Memorize these items! ({countdown}s)
            </p>
            <div className="flex flex-wrap justify-center gap-4" aria-live="polite">
              {items.map((item, i) => (
                <span key={i} className="text-5xl" role="img">{item}</span>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="mb-4 text-base font-semibold text-foreground">
              Which item changed? Tap the one that&apos;s different!
            </p>
            <div className="flex flex-wrap justify-center gap-4" role="group" aria-label="Items to check">
              {items.map((item, i) => {
                let style = "bg-surface border border-border hover:border-primary-200 hover:bg-primary-50";
                if (selected !== null) {
                  if (i === round.changedIndex) {
                    style = "bg-success/10 border-2 border-success";
                  } else if (i === selected && selected !== round.changedIndex) {
                    style = "bg-error/10 border-2 border-error";
                  }
                }
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    disabled={selected !== null}
                    className={`cursor-pointer rounded-xl p-4 text-5xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary/20 ${style}`}
                    aria-label={`Item ${i + 1}`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>

            {!showHint && selected === null && round.hint && (
              <button onClick={() => setShowHint(true)} className="mt-4 text-base font-semibold text-primary hover:text-primary-dark hover:underline">
                Need a hint?
              </button>
            )}

            {showHint && selected === null && round.hint && (
              <p className="mt-4 rounded-xl border border-secondary-light/30 bg-warm-bg p-4 text-base text-foreground">
                {round.hint}
              </p>
            )}

            {selected !== null && (
              <div role="status" aria-live="polite" className={`mt-4 rounded-xl border p-4 text-lg font-semibold ${selected === round.changedIndex ? "border-success/20 bg-success/10 text-foreground" : "border-error/20 bg-error/10 text-foreground"}`}>
                {selected === round.changedIndex ? "Correct! Good eye!" : `The changed item was at position ${round.changedIndex + 1}`}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
