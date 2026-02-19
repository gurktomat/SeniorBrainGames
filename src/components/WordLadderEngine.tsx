"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import StarRating from "./StarRating";

interface WordLadderPuzzle {
  id: string;
  title: string;
  startWord: string;
  endWord: string;
  solution: string[];
  hint: string;
}

// ─── Main Engine ──────────────────────────────────────────────────────────────

export default function WordLadderEngine({
  title,
  puzzles,
}: {
  title: string;
  puzzles: WordLadderPuzzle[];
}) {
  const [puzzleIndex, setPuzzleIndex] = useState(0);

  // Key-based remount: when puzzleIndex changes, WordLadderPuzzleView remounts with fresh state
  return (
    <WordLadderPuzzleView
      key={puzzleIndex}
      title={title}
      puzzle={puzzles[puzzleIndex]}
      puzzleIndex={puzzleIndex}
      totalPuzzles={puzzles.length}
      onNextPuzzle={() => setPuzzleIndex((i) => i + 1)}
      onRestart={() => setPuzzleIndex(0)}
    />
  );
}

// ─── Puzzle View ──────────────────────────────────────────────────────────────

function WordLadderPuzzleView({
  title,
  puzzle,
  puzzleIndex,
  totalPuzzles,
  onNextPuzzle,
  onRestart,
}: {
  title: string;
  puzzle: WordLadderPuzzle;
  puzzleIndex: number;
  totalPuzzles: number;
  onNextPuzzle: () => void;
  onRestart: () => void;
}) {
  const { solution, startWord, endWord } = puzzle;
  const wordLength = startWord.length;

  // userWords: words the player has confirmed so far, starting with the start word
  const [userWords, setUserWords] = useState<string[]>([startWord]);
  const [currentInput, setCurrentInput] = useState("");
  const [phase, setPhase] = useState<"playing" | "complete">("playing");
  const [showHint, setShowHint] = useState(false);
  const [error, setError] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const errorTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // The index into the solution array that the user needs to find next
  const nextSolutionIndex = useMemo(() => userWords.length, [userWords]);

  // How many intermediate steps (not counting start and end)
  const totalIntermediateSteps = solution.length - 2;
  const completedIntermediateSteps = useMemo(
    () => Math.max(0, userWords.length - 1),
    [userWords],
  );

  // Focus input on mount
  useEffect(() => {
    if (phase === "playing") {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [phase]);

  // Cleanup error timeout on unmount
  useEffect(() => {
    return () => {
      if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
    };
  }, []);

  // Show a temporary error message for 2 seconds
  const showError = useCallback((msg: string) => {
    if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
    setError(msg);
    errorTimeoutRef.current = setTimeout(() => {
      setError("");
      errorTimeoutRef.current = null;
    }, 2000);
  }, []);

  // Check if two words differ by exactly one letter
  const diffsByOne = useCallback((a: string, b: string): boolean => {
    if (a.length !== b.length) return false;
    let diffs = 0;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) diffs++;
    }
    return diffs === 1;
  }, []);

  // Submit handler
  const handleSubmit = useCallback(() => {
    if (phase !== "playing") return;

    const word = currentInput.toUpperCase().trim();
    if (!word) return;

    // Validation 1: same length
    if (word.length !== wordLength) {
      showError(`Word must be ${wordLength} letters long`);
      return;
    }

    // Validation 2: must differ by exactly one letter from previous word
    const previousWord = userWords[userWords.length - 1];
    if (!diffsByOne(previousWord, word)) {
      showError("Must change exactly one letter");
      return;
    }

    // Validation 3: must match the next word in the solution
    const expectedWord = solution[nextSolutionIndex];
    if (word !== expectedWord) {
      showError("Not a step in the solution");
      return;
    }

    // Valid word -- add it
    const updatedWords = [...userWords, word];
    setUserWords(updatedWords);
    setCurrentInput("");

    // Check for completion
    if (updatedWords.length === solution.length) {
      setTimeout(() => setPhase("complete"), 400);
    } else {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [phase, currentInput, wordLength, userWords, solution, nextSolutionIndex, showError, diffsByOne]);

  // Handle Enter key in input
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit],
  );

  // Generate dynamic hint about which position to change
  const positionalHint = useMemo(() => {
    if (nextSolutionIndex >= solution.length) return "";
    const prev = userWords[userWords.length - 1];
    const next = solution[nextSolutionIndex];
    for (let i = 0; i < prev.length; i++) {
      if (prev[i] !== next[i]) {
        return `Try changing letter ${i + 1}`;
      }
    }
    return "";
  }, [userWords, solution, nextSolutionIndex]);

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
            Puzzle Complete!
          </h2>
          <p className="mb-2 text-lg text-text-muted">{puzzle.title}</p>
          <p className="mb-4 text-base text-text-muted">
            You climbed from{" "}
            <span className="font-bold text-success">{startWord}</span> to{" "}
            <span className="font-bold text-primary">{endWord}</span> in{" "}
            {solution.length - 1} steps!
          </p>

          {/* Show the completed ladder */}
          <div className="mb-6 flex flex-col items-center gap-1">
            {solution.map((word, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="flex gap-1.5">
                  {word.split("").map((letter, li) => (
                    <div
                      key={li}
                      className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-success bg-success/10 text-xl font-bold text-success"
                    >
                      {letter}
                    </div>
                  ))}
                </div>
                {i < solution.length - 1 && (
                  <span className="text-xl text-success">&#8595;</span>
                )}
              </div>
            ))}
          </div>

          <StarRating />
          <div className="flex flex-col items-center gap-3">
            {puzzleIndex + 1 < totalPuzzles ? (
              <button
                onClick={onNextPuzzle}
                className="btn-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
              >
                Next Puzzle
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

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="mx-auto w-full max-w-lg px-4 py-6 sm:px-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1
            className="text-xl font-bold text-foreground sm:text-2xl"
            style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
          >
            {title}
          </h1>
          <p className="text-sm text-text-muted">
            {puzzle.title} ({puzzleIndex + 1} of {totalPuzzles})
          </p>
        </div>
        <span
          className="rounded-full px-4 py-1.5 text-sm font-bold text-white"
          style={{ background: "var(--gradient-primary)" }}
        >
          {puzzleIndex + 1} / {totalPuzzles}
        </span>
      </div>

      {/* Step counter banner */}
      <div
        className="mb-4 rounded-xl border border-primary-200 bg-primary-50 px-4 py-3"
        role="status"
        aria-live="polite"
      >
        <p className="text-base font-semibold text-primary">
          Step {completedIntermediateSteps} of {totalIntermediateSteps + 1} &mdash; Change one letter to make a new word
        </p>
      </div>

      {/* Ladder display */}
      <div className="mb-6 flex flex-col items-center gap-0">
        {solution.map((solutionWord, stepIndex) => {
          const isStartWord = stepIndex === 0;
          const isEndWord = stepIndex === solution.length - 1;
          const isFound = stepIndex < userWords.length;
          const isNextTarget = stepIndex === nextSolutionIndex && !isEndWord;
          const isFutureStep = stepIndex > nextSolutionIndex && !isEndWord;

          return (
            <div key={stepIndex} className="flex flex-col items-center">
              {/* Word row */}
              <div className="flex gap-1.5">
                {isStartWord && isFound && (
                  // Start word: green background
                  <>
                    {solutionWord.split("").map((letter, li) => (
                      <div
                        key={li}
                        className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-success bg-success/20"
                      >
                        <span
                          className="text-xl font-bold text-success"
                          style={{ fontSize: "clamp(18px, 5vw, 22px)" }}
                        >
                          {letter}
                        </span>
                      </div>
                    ))}
                    <div className="ml-2 flex items-center">
                      <span className="text-sm font-semibold text-success">START</span>
                    </div>
                  </>
                )}

                {isEndWord && (
                  // End word: shown grayed at bottom
                  <>
                    {solutionWord.split("").map((letter, li) => (
                      <div
                        key={li}
                        className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-border bg-text-muted/10"
                      >
                        <span
                          className="text-xl font-bold text-text-muted"
                          style={{ fontSize: "clamp(18px, 5vw, 22px)" }}
                        >
                          {letter}
                        </span>
                      </div>
                    ))}
                    <div className="ml-2 flex items-center">
                      <span className="text-sm font-semibold text-text-muted">END</span>
                    </div>
                  </>
                )}

                {!isStartWord && !isEndWord && isFound && (
                  // Found intermediate words: primary background
                  <>
                    {userWords[stepIndex].split("").map((letter, li) => {
                      const prevWord = userWords[stepIndex - 1];
                      const isChanged = prevWord[li] !== letter;
                      return (
                        <div
                          key={li}
                          className={`flex h-12 w-12 items-center justify-center rounded-xl border-2 ${
                            isChanged
                              ? "border-primary bg-primary-50"
                              : "border-primary/50 bg-primary-50/50"
                          }`}
                        >
                          <span
                            className={`text-xl font-bold ${
                              isChanged ? "text-primary" : "text-primary/70"
                            }`}
                            style={{ fontSize: "clamp(18px, 5vw, 22px)" }}
                          >
                            {letter}
                          </span>
                        </div>
                      );
                    })}
                  </>
                )}

                {isNextTarget && (
                  // Current target: empty dashed boxes
                  <>
                    {Array.from({ length: wordLength }).map((_, li) => (
                      <div
                        key={li}
                        className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-dashed border-border bg-surface"
                      >
                        <span
                          className="text-xl font-bold text-text-muted"
                          style={{ fontSize: "clamp(18px, 5vw, 22px)" }}
                        >
                          ?
                        </span>
                      </div>
                    ))}
                  </>
                )}

                {isFutureStep && (
                  // Future steps: empty dashed boxes
                  <>
                    {Array.from({ length: wordLength }).map((_, li) => (
                      <div
                        key={li}
                        className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-dashed border-border bg-surface"
                      >
                        <span
                          className="text-xl font-bold text-text-muted/40"
                          style={{ fontSize: "clamp(18px, 5vw, 22px)" }}
                        >
                          ?
                        </span>
                      </div>
                    ))}
                  </>
                )}
              </div>

              {/* Arrow between steps */}
              {stepIndex < solution.length - 1 && (
                <span
                  className={`my-1 text-xl ${
                    stepIndex < userWords.length - 1
                      ? "text-success"
                      : stepIndex === userWords.length - 1
                        ? "text-primary"
                        : "text-text-muted"
                  }`}
                >
                  &#8595;
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Input area */}
      <div className="mb-4 flex flex-col items-center gap-3">
        <div className="flex w-full max-w-xs items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            inputMode="text"
            autoCapitalize="characters"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            maxLength={wordLength}
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value.toUpperCase().replace(/[^A-Z]/g, ""))}
            onKeyDown={handleKeyDown}
            placeholder={`Type a ${wordLength}-letter word`}
            className="w-full rounded-xl border-2 border-primary bg-surface px-4 py-3 text-center text-xl font-bold uppercase tracking-widest text-foreground transition-colors duration-150 placeholder:text-text-muted/50 placeholder:normal-case placeholder:tracking-normal placeholder:text-base placeholder:font-normal focus:outline-none focus:ring-4 focus:ring-primary/20"
            style={{ fontSize: "clamp(18px, 5vw, 22px)" }}
            aria-label={`Enter the next word in the ladder`}
          />
          <button
            onClick={handleSubmit}
            className="btn-primary shrink-0 focus:outline-none focus:ring-4 focus:ring-primary/20"
          >
            Submit
          </button>
        </div>

        {/* Error message */}
        {error && (
          <p
            className="text-base font-semibold text-error"
            role="alert"
            aria-live="assertive"
          >
            {error}
          </p>
        )}
      </div>

      {/* Hint button and display */}
      <div className="mb-4 flex flex-col items-center gap-2">
        {!showHint ? (
          <button
            onClick={() => setShowHint(true)}
            className="cursor-pointer rounded-xl border-2 border-secondary bg-surface px-5 py-2.5 text-base font-bold text-secondary-dark transition-colors duration-200 hover:bg-secondary-light/10 focus:outline-none focus:ring-4 focus:ring-secondary/20"
          >
            Show Hint
          </button>
        ) : (
          <div className="rounded-xl border border-secondary bg-secondary-light/10 px-5 py-3 text-center">
            <p className="text-base font-semibold text-secondary-dark">
              {puzzle.hint}
            </p>
            {positionalHint && (
              <p className="mt-1 text-sm text-secondary-dark/70">
                {positionalHint}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="mb-1 flex justify-between text-sm text-text-muted">
          <span>Progress</span>
          <span>
            {completedIntermediateSteps} of {totalIntermediateSteps + 1} steps
          </span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-primary-50">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${totalIntermediateSteps + 1 > 0 ? (completedIntermediateSteps / (totalIntermediateSteps + 1)) * 100 : 0}%`,
              background: "var(--gradient-success)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
