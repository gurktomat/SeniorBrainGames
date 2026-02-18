"use client";

import { useState, useCallback } from "react";

interface SortItem {
  label: string;
  emoji: string;
}

interface SortRound {
  id: string;
  title: string;
  items: SortItem[];
  categories: string[];
  correctMapping: number[];
}

export default function SortingEngine({
  title,
  rounds,
}: {
  title: string;
  rounds: SortRound[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [assignments, setAssignments] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const round = rounds[currentIndex];

  const handleAssign = useCallback(
    (itemIndex: number, categoryIndex: number) => {
      if (checked) return;
      setAssignments((prev) => ({ ...prev, [itemIndex]: categoryIndex }));
    },
    [checked],
  );

  const handleCheck = useCallback(() => {
    if (checked) return;
    setChecked(true);
    const allCorrect = round.items.every(
      (_, i) => assignments[i] === round.correctMapping[i],
    );
    if (allCorrect) setScore((s) => s + 1);

    setTimeout(() => {
      if (currentIndex + 1 < rounds.length) {
        setCurrentIndex((i) => i + 1);
        setAssignments({});
        setChecked(false);
      } else {
        setFinished(true);
      }
    }, 2000);
  }, [checked, round, assignments, currentIndex, rounds.length]);

  const handleRestart = () => {
    setCurrentIndex(0);
    setAssignments({});
    setChecked(false);
    setScore(0);
    setFinished(false);
  };

  const allAssigned = round.items.every((_, i) => assignments[i] !== undefined);

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
          <p className="mt-2 text-lg text-foreground">{score} out of {rounds.length} rounds perfect</p>
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

      <div className="rounded-2xl border border-border bg-surface p-6" style={{ boxShadow: "var(--shadow-md)" }}>
        <h2 className="mb-2 text-center text-lg font-bold text-foreground">{round.title}</h2>
        <p className="mb-6 text-center text-sm text-text-muted">
          Tap each item, then tap the category it belongs to.
        </p>

        <div className="mb-6 flex flex-col gap-3">
          {round.items.map((item, itemIdx) => {
            const assigned = assignments[itemIdx];
            let itemStyle = "border-border bg-background";
            if (checked) {
              itemStyle =
                assigned === round.correctMapping[itemIdx]
                  ? "border-success bg-success/5"
                  : "border-error bg-error/5";
            } else if (assigned !== undefined) {
              itemStyle = "border-primary bg-primary-50";
            }

            return (
              <div key={itemIdx} className={`flex items-center justify-between rounded-xl border px-4 py-3 transition-all duration-200 ${itemStyle}`}>
                <span className="text-lg">
                  <span className="mr-3 text-2xl">{item.emoji}</span>
                  {item.label}
                </span>
                <div className="flex gap-2">
                  {round.categories.map((cat, catIdx) => (
                    <button
                      key={catIdx}
                      onClick={() => handleAssign(itemIdx, catIdx)}
                      disabled={checked}
                      className={`cursor-pointer rounded-lg px-3 py-2 text-sm font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                        assigned === catIdx
                          ? "text-white"
                          : "bg-background text-text-muted hover:bg-primary-50 hover:text-primary"
                      }`}
                      style={assigned === catIdx ? { background: "var(--gradient-primary)" } : undefined}
                      aria-label={`Assign ${item.label} to ${cat}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {!checked && (
          <button onClick={handleCheck} disabled={!allAssigned} className="btn-primary w-full disabled:opacity-50 focus:outline-none focus:ring-4 focus:ring-primary/20">
            Check Answers
          </button>
        )}

        {checked && (
          <div
            role="status"
            aria-live="polite"
            className={`rounded-xl border p-4 text-center text-lg font-semibold ${
              round.items.every((_, i) => assignments[i] === round.correctMapping[i])
                ? "border-success/20 bg-success/10 text-foreground"
                : "border-error/20 bg-error/10 text-foreground"
            }`}
          >
            {round.items.every((_, i) => assignments[i] === round.correctMapping[i])
              ? "All correct! Great sorting!"
              : "Some items were in the wrong category."}
          </div>
        )}
      </div>
    </div>
  );
}
