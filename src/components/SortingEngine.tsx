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
            {score} out of {rounds.length} rounds perfect
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

      <div className="rounded-2xl bg-surface p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-foreground text-center">
          {round.title}
        </h2>
        <p className="mb-6 text-base text-text-muted text-center">
          Tap each item, then tap the category it belongs to.
        </p>

        <div className="mb-6 flex flex-col gap-3">
          {round.items.map((item, itemIdx) => {
            const assigned = assignments[itemIdx];
            let itemStyle = "border-border bg-background";
            if (checked) {
              itemStyle =
                assigned === round.correctMapping[itemIdx]
                  ? "border-success bg-success/10"
                  : "border-error bg-error/10";
            } else if (assigned !== undefined) {
              itemStyle = "border-primary bg-primary/5";
            }

            return (
              <div key={itemIdx} className={`flex items-center justify-between rounded-xl border-2 px-4 py-3 ${itemStyle}`}>
                <span className="text-xl">
                  <span className="mr-3 text-2xl">{item.emoji}</span>
                  {item.label}
                </span>
                <div className="flex gap-2">
                  {round.categories.map((cat, catIdx) => (
                    <button
                      key={catIdx}
                      onClick={() => handleAssign(itemIdx, catIdx)}
                      disabled={checked}
                      className={`cursor-pointer rounded-lg px-3 py-2 text-base font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                        assigned === catIdx
                          ? "bg-primary text-white"
                          : "bg-border/50 text-text-muted hover:bg-primary/10 hover:text-primary"
                      }`}
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
          <button
            onClick={handleCheck}
            disabled={!allAssigned}
            className="w-full cursor-pointer rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary/30 disabled:opacity-50"
          >
            Check Answers
          </button>
        )}

        {checked && (
          <div
            role="status"
            aria-live="polite"
            className={`rounded-lg p-4 text-lg font-semibold text-center ${
              round.items.every(
                (_, i) => assignments[i] === round.correctMapping[i],
              )
                ? "bg-success/10 text-foreground"
                : "bg-error/10 text-foreground"
            }`}
          >
            {round.items.every(
              (_, i) => assignments[i] === round.correctMapping[i],
            )
              ? "All correct! Great sorting!"
              : "Some items were in the wrong category."}
          </div>
        )}
      </div>
    </div>
  );
}
