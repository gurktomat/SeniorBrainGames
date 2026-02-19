"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import StarRating from "./StarRating";

// ─── Types ───────────────────────────────────────────────────────────────────

interface SequenceLevel {
  id: string;
  title: string;
  description: string;
  colorCount: number;
  colors: string[];
  colorNames: string[];
  startLength: number;
  maxLength: number;
}

type Phase = "watching" | "playing" | "success" | "gameover" | "complete";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function generateSequence(length: number, colorCount: number): number[] {
  const seq: number[] = [];
  for (let i = 0; i < length; i++) {
    seq.push(Math.floor(Math.random() * colorCount));
  }
  return seq;
}

// ─── Main Engine ─────────────────────────────────────────────────────────────

export default function SequenceMemoryEngine({
  title,
  levels,
}: {
  title: string;
  levels: SequenceLevel[];
}) {
  const [levelIndex, setLevelIndex] = useState(0);

  // Key-based remount: when levelIndex changes, SequenceLevelView remounts with fresh state
  return (
    <SequenceLevelView
      key={levelIndex}
      title={title}
      level={levels[levelIndex]}
      levelIndex={levelIndex}
      totalLevels={levels.length}
      onNextLevel={() => setLevelIndex((i) => i + 1)}
      onRestart={() => setLevelIndex(0)}
    />
  );
}

// ─── Level View ──────────────────────────────────────────────────────────────

function SequenceLevelView({
  title,
  level,
  levelIndex,
  totalLevels,
  onNextLevel,
  onRestart,
}: {
  title: string;
  level: SequenceLevel;
  levelIndex: number;
  totalLevels: number;
  onNextLevel: () => void;
  onRestart: () => void;
}) {
  const { colorCount, colors, colorNames, startLength, maxLength } = level;

  const [sequence, setSequence] = useState<number[]>(() =>
    generateSequence(startLength, colorCount),
  );
  const [playerInput, setPlayerInput] = useState<number[]>([]);
  const [phase, setPhase] = useState<Phase>("watching");
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [wrongColor, setWrongColor] = useState<string | null>(null);

  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // ─── Cleanup all timeouts on unmount ─────────────────────────────────────

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach((id) => clearTimeout(id));
    timeoutsRef.current = [];
  }, []);

  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, [clearAllTimeouts]);

  // Helper to schedule a timeout and track it for cleanup
  const scheduleTimeout = useCallback(
    (fn: () => void, ms: number) => {
      const id = setTimeout(() => {
        // Remove from tracking after it fires
        timeoutsRef.current = timeoutsRef.current.filter((t) => t !== id);
        fn();
      }, ms);
      timeoutsRef.current.push(id);
      return id;
    },
    [],
  );

  // ─── Sequence Playback ─────────────────────────────────────────────────────

  const playSequence = useCallback(
    (seq: number[]) => {
      setPhase("watching");
      setPlayerInput([]);
      setActiveButton(null);

      // Each step: 600ms lit + 300ms gap = 900ms per step
      const lightDuration = 600;
      const gapDuration = 300;
      const stepDuration = lightDuration + gapDuration;

      // Initial delay before playback starts
      const initialDelay = 600;

      seq.forEach((colorIdx, i) => {
        // Light up
        scheduleTimeout(() => {
          setActiveButton(colorIdx);
        }, initialDelay + i * stepDuration);

        // Turn off
        scheduleTimeout(() => {
          setActiveButton(null);
        }, initialDelay + i * stepDuration + lightDuration);
      });

      // After all steps complete, switch to playing phase
      scheduleTimeout(() => {
        setPhase("playing");
        setPlayerInput([]);
      }, initialDelay + seq.length * stepDuration);
    },
    [scheduleTimeout],
  );

  // ─── Start playback on mount ───────────────────────────────────────────────

  useEffect(() => {
    playSequence(sequence);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Handle button click ──────────────────────────────────────────────────

  const handleButtonClick = useCallback(
    (colorIndex: number) => {
      if (phase !== "playing") return;

      // Flash the clicked button briefly
      setActiveButton(colorIndex);
      scheduleTimeout(() => {
        setActiveButton(null);
      }, 200);

      const expectedIndex = playerInput.length;
      const expected = sequence[expectedIndex];

      if (colorIndex === expected) {
        // Correct click
        const newInput = [...playerInput, colorIndex];
        setPlayerInput(newInput);

        if (newInput.length === sequence.length) {
          // Full sequence entered correctly
          const newScore = sequence.length;
          setScore(newScore);
          setBestScore((prev) => Math.max(prev, newScore));

          if (sequence.length >= maxLength) {
            // Reached max length — perfect completion!
            setPhase("complete");
          } else {
            // Round success — show message, then auto-advance
            setPhase("success");
            scheduleTimeout(() => {
              const extendedSequence = [
                ...sequence,
                Math.floor(Math.random() * colorCount),
              ];
              setSequence(extendedSequence);
              playSequence(extendedSequence);
            }, 1500);
          }
        }
      } else {
        // Wrong click
        const correctName = colorNames[expected];
        setWrongColor(correctName);
        const finalScore = sequence.length - 1;
        setScore(finalScore);
        setBestScore((prev) => Math.max(prev, finalScore));
        setPhase("gameover");
      }
    },
    [
      phase,
      playerInput,
      sequence,
      maxLength,
      colorCount,
      colorNames,
      scheduleTimeout,
      playSequence,
    ],
  );

  // ─── Restart handler ─────────────────────────────────────────────────────

  const handleRestart = useCallback(() => {
    clearAllTimeouts();
    setActiveButton(null);
    setWrongColor(null);
    const newSeq = generateSequence(startLength, colorCount);
    setSequence(newSeq);
    setPlayerInput([]);
    setScore(0);
    playSequence(newSeq);
  }, [startLength, colorCount, clearAllTimeouts, playSequence]);

  // ─── Phase label ──────────────────────────────────────────────────────────

  const phaseLabel = useMemo(() => {
    switch (phase) {
      case "watching":
        return "Watch carefully...";
      case "playing":
        return "Your turn! Repeat the sequence";
      case "success":
        return `Correct! Round ${sequence.length} complete`;
      case "gameover":
        return `Wrong! The correct color was ${wrongColor}. You reached round ${score}!`;
      case "complete":
        return `Perfect! You completed all ${maxLength} rounds!`;
    }
  }, [phase, sequence.length, wrongColor, score, maxLength]);

  // ─── Grid layout class ────────────────────────────────────────────────────

  const gridClass = useMemo(() => {
    switch (colorCount) {
      case 4:
        return "grid-cols-2"; // 2x2
      case 5:
        return "grid-cols-3"; // 3-2 arrangement
      case 6:
        return "grid-cols-3"; // 2x3
      default:
        return "grid-cols-2";
    }
  }, [colorCount]);

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="mx-auto w-full max-w-lg px-4 py-6 sm:px-6">
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
          <p className="text-sm text-text-muted">{level.description}</p>
        </div>
        <span
          className="rounded-full px-4 py-1.5 text-sm font-bold text-white"
          style={{ background: "var(--gradient-primary)" }}
        >
          {level.title}
        </span>
      </div>

      {/* Stats row */}
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-text-muted">Round</span>
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary-50 text-sm font-bold text-primary">
            {sequence.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-text-muted">Score</span>
          <span className="inline-flex h-8 min-w-[2rem] items-center justify-center rounded-full bg-primary-50 px-2 text-sm font-bold text-primary">
            {score}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-text-muted">Best</span>
          <span className="text-sm font-bold text-foreground">{bestScore}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-text-muted">Level</span>
          <span className="text-sm font-bold text-foreground">
            {levelIndex + 1} / {totalLevels}
          </span>
        </div>
      </div>

      {/* Phase label banner */}
      <div
        className={`mb-6 rounded-xl border px-4 py-3 ${
          phase === "watching"
            ? "border-primary-200 bg-primary-50"
            : phase === "playing"
              ? "border-success/30 bg-success/5"
              : phase === "success"
                ? "border-success/30 bg-success/10"
                : phase === "gameover"
                  ? "border-error/30 bg-error/5"
                  : "border-success/30 bg-success/10"
        }`}
        role="status"
        aria-live="polite"
      >
        <p
          className={`text-center text-lg font-semibold ${
            phase === "watching"
              ? "text-primary animate-pulse"
              : phase === "playing"
                ? "text-success"
                : phase === "success"
                  ? "text-success"
                  : phase === "gameover"
                    ? "text-error"
                    : "text-success"
          }`}
          style={{ fontSize: "18px" }}
        >
          {phaseLabel}
        </p>
      </div>

      {/* Color buttons grid */}
      <div className="mb-6 flex justify-center">
        <div className={`inline-grid ${gridClass} gap-3`}>
          {colors.map((color, index) => {
            const isActive = activeButton === index;

            return (
              <button
                key={index}
                type="button"
                onClick={() => handleButtonClick(index)}
                disabled={phase !== "playing"}
                className={`rounded-2xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                  isActive
                    ? "scale-110 shadow-lg ring-4 ring-white"
                    : "opacity-70 hover:opacity-90"
                } ${phase === "playing" ? "cursor-pointer" : "cursor-default"}`}
                style={{
                  backgroundColor: color,
                  width: "90px",
                  height: "90px",
                  filter: isActive ? "brightness(1.3)" : "brightness(0.8)",
                }}
                aria-label={`${colorNames[index]} button`}
              />
            );
          })}
        </div>
      </div>

      {/* Progress indicator during playing phase */}
      {phase === "playing" && (
        <div className="mx-auto mb-4 max-w-md">
          <div className="flex items-center justify-center gap-1.5">
            {sequence.map((_, idx) => (
              <div
                key={idx}
                className={`h-3 w-3 rounded-full transition-all duration-200 ${
                  idx < playerInput.length
                    ? "bg-success scale-110"
                    : idx === playerInput.length
                      ? "bg-primary animate-pulse"
                      : "bg-border"
                }`}
                aria-label={`Step ${idx + 1}${idx < playerInput.length ? ", completed" : idx === playerInput.length ? ", current" : ""}`}
              />
            ))}
          </div>
          <p
            className="mt-2 text-center text-text-muted"
            style={{ fontSize: "18px" }}
          >
            {playerInput.length} of {sequence.length}
          </p>
        </div>
      )}

      {/* Success message (auto-advances) */}
      {phase === "success" && (
        <div className="text-center">
          <p
            className="text-2xl font-bold text-success"
            style={{
              fontFamily: "var(--font-merriweather), var(--font-heading)",
            }}
          >
            Correct!
          </p>
          <p
            className="mt-1 text-text-muted"
            style={{ fontSize: "18px" }}
          >
            Get ready for the next round...
          </p>
        </div>
      )}

      {/* Game Over screen (inline) */}
      {phase === "gameover" && (
        <div
          className="mt-6 rounded-2xl border border-border bg-surface p-6 text-center"
          style={{ boxShadow: "var(--shadow-md)" }}
        >
          <h3
            className="mb-2 text-2xl font-bold text-foreground"
            style={{
              fontFamily: "var(--font-merriweather), var(--font-heading)",
            }}
          >
            Game Over!
          </h3>
          <p className="mb-2 text-lg text-text-muted">
            You remembered {score} colors in a row
          </p>
          <p className="mb-4 text-base text-text-muted">
            Best this session: {bestScore}
          </p>
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={handleRestart}
              className="btn-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
            >
              Try Again
            </button>
            {levelIndex + 1 < totalLevels && (
              <button
                onClick={onNextLevel}
                className="cursor-pointer rounded-xl border-2 border-primary bg-surface px-6 py-3 text-lg font-bold text-primary transition-colors duration-200 hover:bg-primary-50 focus:outline-none focus:ring-4 focus:ring-primary/20"
              >
                Next Level
              </button>
            )}
          </div>
        </div>
      )}

      {/* Complete screen (reached maxLength) */}
      {phase === "complete" && (
        <div
          className="mt-6 rounded-2xl border border-border bg-surface p-8 text-center"
          style={{ boxShadow: "var(--shadow-lg)" }}
        >
          <h2
            className="mb-2 text-3xl font-bold text-foreground"
            style={{
              fontFamily: "var(--font-merriweather), var(--font-heading)",
            }}
          >
            Perfect Memory!
          </h2>
          <p className="mb-2 text-lg text-text-muted">{level.title}</p>
          <p className="mb-2 text-base text-text-muted">
            You completed all {maxLength} rounds!
          </p>
          <p className="mb-6 text-base text-text-muted">
            Remembered a sequence of {maxLength} colors — outstanding!
          </p>
          <StarRating />
          <div className="flex flex-col items-center gap-3">
            {levelIndex + 1 < totalLevels ? (
              <button
                onClick={onNextLevel}
                className="btn-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
              >
                Next Level
              </button>
            ) : (
              <button
                onClick={onRestart}
                className="btn-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
              >
                Play Again
              </button>
            )}
            {levelIndex + 1 < totalLevels && (
              <button
                onClick={handleRestart}
                className="cursor-pointer rounded-xl border-2 border-primary bg-surface px-6 py-3 text-lg font-bold text-primary transition-colors duration-200 hover:bg-primary-50 focus:outline-none focus:ring-4 focus:ring-primary/20"
              >
                Replay Level
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
