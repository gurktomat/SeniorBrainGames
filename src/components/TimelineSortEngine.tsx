"use client";

import { useState, useCallback, useMemo } from "react";
import StarRating from "./StarRating";
import { shuffleArray } from "@/lib/shuffle";

interface TimelineEvent {
  text: string;
  year: number;
}

interface Round {
  id: string;
  theme: string;
  events: TimelineEvent[];
}

export default function TimelineSortEngine({
  title,
  rounds,
}: {
  title: string;
  rounds: Round[];
}) {
  const shuffledRounds = useMemo(() => shuffleArray(rounds), [rounds]);
  const [roundIndex, setRoundIndex] = useState(0);

  return (
    <TimelineRoundView
      key={roundIndex}
      title={title}
      round={shuffledRounds[roundIndex]}
      roundIndex={roundIndex}
      totalRounds={shuffledRounds.length}
      onNextRound={() => setRoundIndex((i) => i + 1)}
      onRestart={() => setRoundIndex(0)}
    />
  );
}

function TimelineRoundView({
  title,
  round,
  roundIndex,
  totalRounds,
  onNextRound,
  onRestart,
}: {
  title: string;
  round: Round;
  roundIndex: number;
  totalRounds: number;
  onNextRound: () => void;
  onRestart: () => void;
}) {
  const shuffled = useMemo(
    () => shuffleArray(round.events.map((e, i) => ({ ...e, originalIndex: i }))),
    [round.events],
  );

  const [selected, setSelected] = useState<number[]>([]);
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<"playing" | "roundComplete">("playing");
  const totalEvents = round.events.length;

  const correctOrder = useMemo(
    () =>
      [...round.events]
        .sort((a, b) => a.year - b.year)
        .map((e) => e.text),
    [round.events],
  );

  const handleSelect = useCallback(
    (shuffledIdx: number) => {
      if (result !== null) return;
      if (selected.includes(shuffledIdx)) return;
      setSelected((prev) => [...prev, shuffledIdx]);
    },
    [result, selected],
  );

  const handleUndo = useCallback(() => {
    if (result !== null) return;
    setSelected((prev) => prev.slice(0, -1));
  }, [result]);

  const handleCheck = useCallback(() => {
    if (selected.length !== totalEvents) return;
    const playerOrder = selected.map((i) => shuffled[i].text);
    const isCorrect = playerOrder.every((t, i) => t === correctOrder[i]);
    setResult(isCorrect ? "correct" : "wrong");
    if (isCorrect) setScore((s) => s + 1);

    setTimeout(() => {
      setSelected([]);
      setResult(null);
      setPhase("roundComplete");
    }, 2500);
  }, [selected, totalEvents, shuffled, correctOrder]);

  if (phase === "roundComplete") {
    const isCorrect = score > 0;
    return (
      <div className="mx-auto w-full max-w-2xl px-6 py-8 text-center">
        <div
          className="rounded-2xl border border-border bg-surface p-8"
          style={{ boxShadow: "var(--shadow-lg)" }}
        >
          <h2
            className="mb-2 text-3xl font-bold text-foreground"
            style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
          >
            Round Complete!
          </h2>
          <p className="mb-2 text-lg text-text-muted">Theme: {round.theme}</p>
          <p className="mb-6 text-lg text-text-muted">
            Round {roundIndex + 1} of {totalRounds}
          </p>
          <p className="mb-4 text-xl font-semibold text-foreground">
            {isCorrect ? "You got the order right!" : "Not quite — here's the correct order:"}
          </p>
          <div className="mx-auto mb-6 max-w-md space-y-2">
            {correctOrder.map((text, i) => {
              const ev = round.events.find((e) => e.text === text)!;
              return (
                <div
                  key={text}
                  className="flex items-center gap-3 rounded-xl border border-border bg-background p-3"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-base font-semibold text-foreground">{text}</span>
                  <span className="ml-auto text-sm font-bold text-text-muted">{ev.year}</span>
                </div>
              );
            })}
          </div>
          <StarRating />
          <div className="flex flex-col items-center gap-3">
            {roundIndex + 1 < totalRounds ? (
              <button
                onClick={onNextRound}
                className="btn-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
              >
                Next Round
              </button>
            ) : (
              <button
                onClick={onRestart}
                className="btn-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
              >
                Play Again
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1
            className="text-xl font-bold text-foreground sm:text-2xl"
            style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
          >
            {title}
          </h1>
          <p className="text-sm text-text-muted">
            Round {roundIndex + 1}: {round.theme}
          </p>
        </div>
        <span
          className="rounded-full px-4 py-1.5 text-sm font-bold text-white"
          style={{ background: "var(--gradient-primary)" }}
        >
          {roundIndex + 1} / {totalRounds}
        </span>
      </div>

      <div
        className="rounded-2xl border border-border bg-surface p-6 sm:p-8"
        style={{ boxShadow: "var(--shadow-md)" }}
      >
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-text-muted">
          Tap events in chronological order (earliest first)
        </p>
        <p className="mb-6 text-base text-text-muted">Theme: {round.theme}</p>

        {/* Available events */}
        <div className="mb-6 space-y-2">
          {shuffled.map((event, idx) => {
            const isSelected = selected.includes(idx);
            const orderNum = selected.indexOf(idx) + 1;
            return (
              <button
                key={event.text}
                onClick={() => handleSelect(idx)}
                disabled={isSelected || result !== null}
                className={`w-full rounded-xl border-2 p-4 text-left text-lg font-semibold transition-all focus:outline-none focus:ring-4 focus:ring-primary/20 ${
                  isSelected
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background text-foreground hover:border-primary/50"
                } disabled:cursor-default`}
              >
                <span className="flex items-center gap-3">
                  {isSelected ? (
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                      {orderNum}
                    </span>
                  ) : (
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-border text-sm font-bold text-text-muted">
                      ?
                    </span>
                  )}
                  {event.text}
                </span>
              </button>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-3">
          <button
            onClick={handleUndo}
            disabled={selected.length === 0 || result !== null}
            className="rounded-xl border border-border bg-background px-5 py-3 text-base font-semibold text-foreground transition-colors hover:bg-border/50 disabled:opacity-50 focus:outline-none focus:ring-4 focus:ring-primary/20"
          >
            Undo
          </button>
          <button
            onClick={handleCheck}
            disabled={selected.length !== totalEvents || result !== null}
            className="btn-primary disabled:opacity-50 focus:outline-none focus:ring-4 focus:ring-primary/20"
          >
            Check Order
          </button>
        </div>

        {result !== null && (
          <div
            role="status"
            aria-live="polite"
            className={`mt-6 rounded-xl border p-4 text-center text-lg font-semibold ${
              result === "correct"
                ? "border-success/20 bg-success/10 text-foreground"
                : "border-error/20 bg-error/10 text-foreground"
            }`}
          >
            {result === "correct"
              ? "Perfect! You got the order right!"
              : "Not quite — see the correct order next."}
          </div>
        )}
      </div>
    </div>
  );
}
