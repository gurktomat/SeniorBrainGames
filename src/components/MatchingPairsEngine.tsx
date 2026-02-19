"use client";

import { useState, useCallback, useRef, useMemo } from "react";
import StarRating from "./StarRating";
import { shuffleArray } from "@/lib/shuffle";

interface Pair {
  left: string;
  right: string;
}

interface Round {
  id: string;
  title: string;
  description: string;
  pairs: Pair[];
}

// ─── Main Engine ──────────────────────────────────────────────────────────────

export default function MatchingPairsEngine({
  title,
  rounds,
}: {
  title: string;
  rounds: Round[];
}) {
  const shuffledRounds = useMemo(() => shuffleArray(rounds), [rounds]);
  const [roundIndex, setRoundIndex] = useState(0);

  // Key-based remount: when roundIndex changes, MatchingPairsRoundView remounts with fresh state
  return (
    <MatchingPairsRoundView
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

// ─── Round View ───────────────────────────────────────────────────────────────

function MatchingPairsRoundView({
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
  const totalPairs = round.pairs.length;

  // Shuffle the right column on mount (lazy initializer runs once)
  const [shuffledRightIndices] = useState<number[]>(() =>
    shuffleArray(Array.from({ length: round.pairs.length }, (_, i) => i)),
  );

  const [matchedPairs, setMatchedPairs] = useState<Set<number>>(new Set());
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [selectedRight, setSelectedRight] = useState<number | null>(null);
  const [wrongPair, setWrongPair] = useState<{
    left: number;
    right: number;
  } | null>(null);
  const [phase, setPhase] = useState<"playing" | "complete">("playing");
  const [attempts, setAttempts] = useState(0);
  const wrongTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ─── Match evaluation ─────────────────────────────────────────────────

  const evaluateMatch = useCallback(
    (leftIdx: number, rightDisplayIdx: number) => {
      const originalRightIndex = shuffledRightIndices[rightDisplayIdx];
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (leftIdx === originalRightIndex) {
        // Correct match
        const next = new Set(matchedPairs);
        next.add(leftIdx);
        setMatchedPairs(next);
        setSelectedLeft(null);
        setSelectedRight(null);

        // Check for completion
        if (next.size === totalPairs) {
          setTimeout(() => setPhase("complete"), 400);
        }
      } else {
        // Wrong match — flash red briefly
        setWrongPair({ left: leftIdx, right: rightDisplayIdx });
        wrongTimerRef.current = setTimeout(() => {
          setWrongPair(null);
          setSelectedLeft(null);
          setSelectedRight(null);
          wrongTimerRef.current = null;
        }, 1000);
      }
    },
    [shuffledRightIndices, attempts, matchedPairs, totalPairs],
  );

  // ─── Click Handlers ──────────────────────────────────────────────────────

  const handleLeftClick = useCallback(
    (index: number) => {
      if (phase !== "playing") return;
      if (matchedPairs.has(index)) return;
      if (wrongPair) return; // Don't allow clicks during wrong flash

      if (selectedLeft === index) {
        // Deselect
        setSelectedLeft(null);
        return;
      }

      // If the right side is already selected, evaluate the match
      if (selectedRight !== null) {
        setSelectedLeft(index);
        evaluateMatch(index, selectedRight);
      } else {
        setSelectedLeft(index);
      }
    },
    [phase, matchedPairs, wrongPair, selectedLeft, selectedRight, evaluateMatch],
  );

  const handleRightClick = useCallback(
    (displayIndex: number) => {
      if (phase !== "playing") return;
      const originalIndex = shuffledRightIndices[displayIndex];
      if (matchedPairs.has(originalIndex)) return;
      if (wrongPair) return;

      if (selectedRight === displayIndex) {
        // Deselect
        setSelectedRight(null);
        return;
      }

      // If the left side is already selected, evaluate the match
      if (selectedLeft !== null) {
        setSelectedRight(displayIndex);
        evaluateMatch(selectedLeft, displayIndex);
      } else {
        setSelectedRight(displayIndex);
      }
    },
    [phase, matchedPairs, wrongPair, selectedRight, selectedLeft, shuffledRightIndices, evaluateMatch],
  );

  // ─── Helper: get style classes for items ────────────────────────────────

  const getLeftItemClasses = useCallback(
    (index: number) => {
      if (matchedPairs.has(index)) {
        return "bg-success/15 text-success border-success/30 cursor-default";
      }
      if (wrongPair && wrongPair.left === index) {
        return "bg-error/15 border-error text-error cursor-default";
      }
      if (selectedLeft === index) {
        return "bg-primary-50 border-primary ring-2 ring-primary cursor-pointer";
      }
      return "bg-surface border-border hover:bg-primary-50/50 cursor-pointer";
    },
    [matchedPairs, wrongPair, selectedLeft],
  );

  const getRightItemClasses = useCallback(
    (displayIndex: number) => {
      const originalIndex = shuffledRightIndices[displayIndex];
      if (matchedPairs.has(originalIndex)) {
        return "bg-success/15 text-success border-success/30 cursor-default";
      }
      if (wrongPair && wrongPair.right === displayIndex) {
        return "bg-error/15 border-error text-error cursor-default";
      }
      if (selectedRight === displayIndex) {
        return "bg-primary-50 border-primary ring-2 ring-primary cursor-pointer";
      }
      return "bg-surface border-border hover:bg-primary-50/50 cursor-pointer";
    },
    [matchedPairs, wrongPair, selectedRight, shuffledRightIndices],
  );

  // ─── Completion Screen ──────────────────────────────────────────────────

  if (phase === "complete") {
    return (
      <div className="mx-auto w-full max-w-2xl px-6 py-8 text-center">
        <div
          className="rounded-2xl border border-border bg-surface p-8"
          style={{ boxShadow: "var(--shadow-lg)" }}
        >
          <h2
            className="mb-2 text-3xl font-bold text-foreground"
            style={{
              fontFamily: "var(--font-merriweather), var(--font-heading)",
            }}
          >
            Round Complete!
          </h2>
          <p className="mb-2 text-lg text-text-muted">{round.title}</p>
          <p className="mb-6 text-base text-text-muted">
            Matched all pairs in {attempts} attempt{attempts !== 1 ? "s" : ""}
          </p>
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

  // ─── Render ─────────────────────────────────────────────────────────────

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1
            className="text-xl font-bold text-foreground sm:text-2xl"
            style={{
              fontFamily: "var(--font-merriweather), var(--font-heading)",
            }}
          >
            {title}
          </h1>
          <p className="text-sm text-text-muted">
            {round.title} ({roundIndex + 1} of {totalRounds})
          </p>
        </div>
        <span
          className="rounded-full px-4 py-1.5 text-sm font-bold text-white"
          style={{ background: "var(--gradient-primary)" }}
        >
          {roundIndex + 1} / {totalRounds}
        </span>
      </div>

      {/* Description */}
      <div
        className="mb-4 rounded-xl border border-primary-200 bg-primary-50 px-4 py-3"
        role="status"
        aria-live="polite"
      >
        <p className="text-base font-semibold text-primary">
          {round.description}
        </p>
      </div>

      {/* Score */}
      <div className="mb-4 flex items-center gap-4 text-base font-semibold text-text-muted">
        <span>
          Matched: {matchedPairs.size} of {totalPairs}
        </span>
        <span className="text-border">|</span>
        <span>Attempts: {attempts}</span>
      </div>

      {/* Two-column matching area */}
      <div className="flex gap-4 sm:gap-8">
        {/* Left column */}
        <div className="flex flex-1 flex-col gap-2">
          <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-text-muted">
            Items
          </h3>
          {round.pairs.map((pair, i) => (
            <button
              key={i}
              onClick={() => handleLeftClick(i)}
              disabled={matchedPairs.has(i) || wrongPair !== null}
              className={`relative min-h-[48px] rounded-xl border-2 px-4 py-3 text-left text-base font-semibold transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary/20 ${getLeftItemClasses(i)}`}
              aria-label={`Left item: ${pair.left}${matchedPairs.has(i) ? " (matched)" : ""}`}
            >
              <span className="flex items-center gap-2">
                {matchedPairs.has(i) && (
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-success"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
                {pair.left}
              </span>
            </button>
          ))}
        </div>

        {/* Right column */}
        <div className="flex flex-1 flex-col gap-2">
          <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-text-muted">
            Matches
          </h3>
          {shuffledRightIndices.map((origIdx, displayIdx) => (
            <button
              key={displayIdx}
              onClick={() => handleRightClick(displayIdx)}
              disabled={
                matchedPairs.has(origIdx) || wrongPair !== null
              }
              className={`relative min-h-[48px] rounded-xl border-2 px-4 py-3 text-left text-base font-semibold transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary/20 ${getRightItemClasses(displayIdx)}`}
              aria-label={`Right item: ${round.pairs[origIdx].right}${matchedPairs.has(origIdx) ? " (matched)" : ""}`}
            >
              <span className="flex items-center gap-2">
                {matchedPairs.has(origIdx) && (
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-success"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
                {round.pairs[origIdx].right}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
