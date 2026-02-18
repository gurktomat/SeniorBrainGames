"use client";

import { useState, useCallback, useRef, useEffect } from "react";

interface Problem {
  id: string;
  question: string;
  options: number[];
  correctAnswer: number;
  explanation: string;
}

interface Level {
  id: string;
  title: string;
  description: string;
  problems: Problem[];
}

// ─── Main Engine ──────────────────────────────────────────────────────────────

export default function MathChallengeEngine({
  title,
  levels,
}: {
  title: string;
  levels: Level[];
}) {
  const [levelIndex, setLevelIndex] = useState(0);

  // Key-based remount: when levelIndex changes, MathLevelView remounts with fresh state
  return (
    <MathLevelView
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

// ─── Difficulty Badge ─────────────────────────────────────────────────────────

function DifficultyBadge({ levelIndex }: { levelIndex: number }) {
  const labels = ["Easy", "Medium", "Hard"];
  const styles = [
    "bg-success/15 text-success",
    "bg-secondary-light/20 text-secondary-dark",
    "bg-error/15 text-error",
  ];
  const label = labels[levelIndex] ?? labels[0];
  const style = styles[levelIndex] ?? styles[0];

  return (
    <span className={`rounded-full px-3 py-1 text-sm font-bold ${style}`}>
      {label}
    </span>
  );
}

// ─── Level View ───────────────────────────────────────────────────────────────

function MathLevelView({
  title,
  level,
  levelIndex,
  totalLevels,
  onNextLevel,
  onRestart,
}: {
  title: string;
  level: Level;
  levelIndex: number;
  totalLevels: number;
  onNextLevel: () => void;
  onRestart: () => void;
}) {
  const problems = level.problems;
  const total = problems.length;

  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<"none" | "correct" | "wrong">("none");
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<"playing" | "reviewing" | "complete">("playing");

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clean up auto-advance timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const problem = problems[currentProblem];

  const advanceToNext = useCallback(() => {
    if (currentProblem + 1 < total) {
      setCurrentProblem((i) => i + 1);
      setSelectedAnswer(null);
      setFeedback("none");
      setPhase("playing");
    } else {
      setPhase("complete");
    }
  }, [currentProblem, total]);

  const handleOptionClick = useCallback(
    (optionIndex: number) => {
      if (selectedAnswer !== null) return; // Prevent double-clicking
      setSelectedAnswer(optionIndex);

      if (optionIndex === problem.correctAnswer) {
        setFeedback("correct");
        setScore((s) => s + 1);
        // Auto-advance after 1.5s on correct
        timerRef.current = setTimeout(() => {
          advanceToNext();
        }, 1500);
      } else {
        setFeedback("wrong");
        setPhase("reviewing");
        // Manual "Next" button will appear
      }
    },
    [selectedAnswer, problem.correctAnswer, advanceToNext],
  );

  const handleNext = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    advanceToNext();
  }, [advanceToNext]);

  // ─── Completion Screen ────────────────────────────────────────────────────

  if (phase === "complete") {
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
            Challenge Complete!
          </h2>
          <p className="mb-2 text-lg text-text-muted">{level.title}</p>
          <p className="mb-6 text-4xl font-bold text-primary">
            {score} / {total}
          </p>
          <p className="mb-6 text-base text-text-muted">
            {score === total
              ? "Perfect score — outstanding!"
              : score >= 7
                ? "Great job!"
                : "Keep practicing!"}
          </p>
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
          </div>
        </div>
      </div>
    );
  }

  // ─── Playing / Reviewing Screen ───────────────────────────────────────────

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-6 sm:px-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1
            className="text-xl font-bold text-foreground sm:text-2xl"
            style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
          >
            {title}
          </h1>
          <p className="text-sm text-text-muted">{level.title}</p>
        </div>
        <div className="flex items-center gap-2">
          <DifficultyBadge levelIndex={levelIndex} />
          <span
            className="rounded-full px-4 py-1.5 text-sm font-bold text-white"
            style={{ background: "var(--gradient-primary)" }}
          >
            {score} / {total}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-border">
        <div
          className="progress-bar-gradient h-full transition-all duration-500"
          style={{ width: `${((currentProblem + 1) / total) * 100}%` }}
        />
      </div>

      {/* Problem counter */}
      <p className="mb-4 text-center text-base font-semibold text-text-muted">
        Question {currentProblem + 1} of {total}
      </p>

      {/* Question */}
      <div className="mb-8 text-center">
        <h2
          className="text-2xl font-bold text-foreground sm:text-3xl"
          style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
        >
          {problem.question}
        </h2>
      </div>

      {/* Options grid — 2x2 */}
      <div className="mx-auto grid max-w-lg grid-cols-2 gap-4">
        {problem.options.map((option, idx) => {
          let btnClass =
            "bg-surface border-2 border-border rounded-xl text-xl font-bold text-foreground hover:bg-primary-50 hover:border-primary";

          if (selectedAnswer !== null) {
            if (idx === problem.correctAnswer) {
              // Reveal the correct answer
              if (selectedAnswer === idx) {
                // Player selected this and it's correct
                btnClass =
                  "bg-success/20 border-2 border-success rounded-xl text-xl font-bold text-success";
              } else {
                // Reveal correct (player got it wrong, highlight the right one)
                btnClass =
                  "bg-success/10 border-2 border-success rounded-xl text-xl font-bold text-success";
              }
            } else if (idx === selectedAnswer) {
              // Player selected this and it's wrong
              btnClass =
                "bg-error/20 border-2 border-error rounded-xl text-xl font-bold text-error";
            } else {
              // Unselected, not the answer — dim it
              btnClass =
                "bg-surface border-2 border-border rounded-xl text-xl font-bold text-text-muted opacity-50";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleOptionClick(idx)}
              disabled={selectedAnswer !== null}
              className={`${btnClass} min-h-[60px] cursor-pointer px-4 py-4 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-primary/20 disabled:cursor-default`}
              aria-label={`Answer: ${option}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Explanation (shown when wrong) */}
      {feedback === "wrong" && (
        <div className="mt-6 text-center">
          <p className="text-base text-text-muted">{problem.explanation}</p>
          <button
            onClick={handleNext}
            className="btn-primary mt-4 focus:outline-none focus:ring-4 focus:ring-primary/20"
          >
            Next
          </button>
        </div>
      )}

      {/* Correct feedback indicator */}
      {feedback === "correct" && (
        <p className="mt-6 text-center text-lg font-semibold text-success">
          Correct!
        </p>
      )}
    </div>
  );
}
