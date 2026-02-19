"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import StarRating from "./StarRating";

interface CryptogramPuzzleData {
  id: string;
  title: string;
  author: string;
  plaintext: string;
  cipher: Record<string, string>;
  encoded: string;
}

const MAX_HINTS = 5;

// ─── Main Engine ──────────────────────────────────────────────────────────────

export default function CryptogramEngine({
  title,
  puzzles,
}: {
  title: string;
  puzzles: CryptogramPuzzleData[];
}) {
  const [puzzleIndex, setPuzzleIndex] = useState(0);

  // Key-based remount: when puzzleIndex changes, inner view remounts with fresh state
  return (
    <CryptogramPuzzleView
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

// ─── Inner Puzzle View ────────────────────────────────────────────────────────

function CryptogramPuzzleView({
  title,
  puzzle,
  puzzleIndex,
  totalPuzzles,
  onNextPuzzle,
  onRestart,
}: {
  title: string;
  puzzle: CryptogramPuzzleData;
  puzzleIndex: number;
  totalPuzzles: number;
  onNextPuzzle: () => void;
  onRestart: () => void;
}) {
  // Build reverse cipher: cipher letter -> plaintext letter
  const reverseCipher = useMemo(() => {
    const rev: Record<string, string> = {};
    for (const [plain, coded] of Object.entries(puzzle.cipher)) {
      rev[coded] = plain;
    }
    return rev;
  }, [puzzle.cipher]);

  // Unique cipher letters that appear in the encoded text
  const cipherLettersInPuzzle = useMemo(() => {
    const letters = new Set<string>();
    for (const ch of puzzle.encoded) {
      if (/[A-Z]/.test(ch)) letters.add(ch);
    }
    return letters;
  }, [puzzle.encoded]);

  // Frequency count of cipher letters in the encoded text
  const cipherFrequency = useMemo(() => {
    const freq: Record<string, number> = {};
    for (const ch of puzzle.encoded) {
      if (/[A-Z]/.test(ch)) {
        freq[ch] = (freq[ch] || 0) + 1;
      }
    }
    return freq;
  }, [puzzle.encoded]);

  // Split encoded text into words of character objects
  const encodedWords = useMemo(() => {
    const words: Array<Array<{ char: string; index: number; isLetter: boolean }>> = [];
    let currentWord: Array<{ char: string; index: number; isLetter: boolean }> = [];

    for (let i = 0; i < puzzle.encoded.length; i++) {
      const ch = puzzle.encoded[i];
      if (ch === " ") {
        if (currentWord.length > 0) {
          words.push(currentWord);
          currentWord = [];
        }
      } else {
        currentWord.push({
          char: ch,
          index: i,
          isLetter: /[A-Z]/.test(ch),
        });
      }
    }
    if (currentWord.length > 0) {
      words.push(currentWord);
    }
    return words;
  }, [puzzle.encoded]);

  // Player state
  const [userMapping, setUserMapping] = useState<Record<string, string>>({});
  const [selectedCipherLetter, setSelectedCipherLetter] = useState<string | null>(null);
  const [phase, setPhase] = useState<"playing" | "complete">("playing");
  const [hintsUsed, setHintsUsed] = useState(0);
  const [validation, setValidation] = useState<Record<string, "correct" | "wrong" | "none">>({});

  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const gameRef = useRef<HTMLDivElement>(null);

  // Check if puzzle is complete
  const checkCompletion = useCallback(
    (mapping: Record<string, string>) => {
      for (const cipherLetter of cipherLettersInPuzzle) {
        const expected = reverseCipher[cipherLetter];
        if (!expected) continue;
        if (mapping[cipherLetter] !== expected) {
          return false;
        }
      }
      return true;
    },
    [cipherLettersInPuzzle, reverseCipher],
  );

  // Handle selecting a cipher letter
  const handleSelectCipherLetter = useCallback(
    (cipherLetter: string) => {
      if (phase !== "playing") return;
      setSelectedCipherLetter((prev) => (prev === cipherLetter ? null : cipherLetter));
      setValidation({});
      setTimeout(() => hiddenInputRef.current?.focus(), 10);
    },
    [phase],
  );

  // Assign a letter to the selected cipher letter
  const assignLetter = useCallback(
    (plainLetter: string) => {
      if (!selectedCipherLetter || phase !== "playing") return;
      const upper = plainLetter.toUpperCase();
      if (!/^[A-Z]$/.test(upper)) return;

      let nextSelected: string | null = null;
      let didComplete = false;

      setUserMapping((prev) => {
        const updated = { ...prev };

        // If user types the same letter already assigned, clear it
        if (updated[selectedCipherLetter] === upper) {
          delete updated[selectedCipherLetter];
          return updated;
        }

        // Remove any existing mapping that uses this plaintext letter
        for (const [key, val] of Object.entries(updated)) {
          if (val === upper && key !== selectedCipherLetter) {
            delete updated[key];
          }
        }
        updated[selectedCipherLetter] = upper;

        // Check completion
        if (checkCompletion(updated)) {
          didComplete = true;
        }

        // Auto-advance to next unassigned cipher letter in text order
        const orderedLetters: string[] = [];
        const seen = new Set<string>();
        for (const ch of puzzle.encoded) {
          if (/[A-Z]/.test(ch) && !seen.has(ch)) {
            orderedLetters.push(ch);
            seen.add(ch);
          }
        }
        const currentIdx = orderedLetters.indexOf(selectedCipherLetter);
        for (let offset = 1; offset <= orderedLetters.length; offset++) {
          const nextIdx = (currentIdx + offset) % orderedLetters.length;
          const nextLetter = orderedLetters[nextIdx];
          if (!updated[nextLetter] && nextLetter !== selectedCipherLetter) {
            nextSelected = nextLetter;
            break;
          }
        }

        return updated;
      });

      setValidation({});

      if (nextSelected) {
        setSelectedCipherLetter(nextSelected);
      }

      if (didComplete) {
        setTimeout(() => setPhase("complete"), 400);
      }
    },
    [selectedCipherLetter, phase, checkCompletion, puzzle.encoded],
  );

  // Clear the assignment for the selected cipher letter
  const clearSelected = useCallback(() => {
    if (!selectedCipherLetter || phase !== "playing") return;
    setUserMapping((prev) => {
      const updated = { ...prev };
      delete updated[selectedCipherLetter];
      return updated;
    });
    setValidation({});
  }, [selectedCipherLetter, phase]);

  // Navigate to next/previous cipher letter
  const navigateLetters = useCallback(
    (direction: "next" | "prev") => {
      const orderedLetters: string[] = [];
      const seen = new Set<string>();
      for (const ch of puzzle.encoded) {
        if (/[A-Z]/.test(ch) && !seen.has(ch)) {
          orderedLetters.push(ch);
          seen.add(ch);
        }
      }
      if (orderedLetters.length === 0) return;

      if (!selectedCipherLetter) {
        setSelectedCipherLetter(orderedLetters[0]);
        return;
      }

      const currentIdx = orderedLetters.indexOf(selectedCipherLetter);
      if (currentIdx === -1) {
        setSelectedCipherLetter(orderedLetters[0]);
        return;
      }

      const nextIdx =
        direction === "next"
          ? (currentIdx + 1) % orderedLetters.length
          : (currentIdx - 1 + orderedLetters.length) % orderedLetters.length;
      setSelectedCipherLetter(orderedLetters[nextIdx]);
    },
    [selectedCipherLetter, puzzle.encoded],
  );

  // Keyboard handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (phase !== "playing") return;

      // Only intercept when focus is within the game area or body (not nav, other UI)
      const target = e.target as HTMLElement;
      const isInGame = gameRef.current?.contains(target);
      const isBody = target === document.body || target === document.documentElement;
      if (!isInGame && !isBody) return;

      if (e.key === "Tab") {
        e.preventDefault();
        navigateLetters(e.shiftKey ? "prev" : "next");
        return;
      }

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        navigateLetters("next");
        return;
      }

      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        navigateLetters("prev");
        return;
      }

      if (e.key === "Backspace" || e.key === "Delete") {
        e.preventDefault();
        clearSelected();
        return;
      }

      if (e.key === "Escape") {
        setSelectedCipherLetter(null);
        return;
      }

      if (/^[a-zA-Z]$/.test(e.key)) {
        e.preventDefault();
        assignLetter(e.key);
      }
    },
    [phase, navigateLetters, clearSelected, assignLetter],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // ─── Toolbar Actions ──────────────────────────────────────────────────────

  const handleCheck = useCallback(() => {
    const newValidation: Record<string, "correct" | "wrong" | "none"> = {};
    for (const cipherLetter of cipherLettersInPuzzle) {
      if (!userMapping[cipherLetter]) {
        newValidation[cipherLetter] = "none";
      } else if (userMapping[cipherLetter] === reverseCipher[cipherLetter]) {
        newValidation[cipherLetter] = "correct";
      } else {
        newValidation[cipherLetter] = "wrong";
      }
    }
    setValidation(newValidation);

    if (checkCompletion(userMapping)) {
      setTimeout(() => setPhase("complete"), 600);
    }
  }, [cipherLettersInPuzzle, userMapping, reverseCipher, checkCompletion]);

  const handleHint = useCallback(() => {
    if (hintsUsed >= MAX_HINTS || phase !== "playing") return;

    // Find cipher letters not yet correctly mapped
    const unsolved = Array.from(cipherLettersInPuzzle).filter(
      (cl) => userMapping[cl] !== reverseCipher[cl],
    );
    if (unsolved.length === 0) return;

    const target = unsolved[Math.floor(Math.random() * unsolved.length)];
    const correctPlain = reverseCipher[target];

    let didComplete = false;

    setHintsUsed((h) => h + 1);
    setUserMapping((prev) => {
      const updated = { ...prev };
      // Remove any existing assignment of this plaintext letter
      for (const [key, val] of Object.entries(updated)) {
        if (val === correctPlain && key !== target) {
          delete updated[key];
        }
      }
      updated[target] = correctPlain;

      if (checkCompletion(updated)) {
        didComplete = true;
      }

      return updated;
    });

    setValidation((v) => ({ ...v, [target]: "correct" }));
    setSelectedCipherLetter(target);

    if (didComplete) {
      setTimeout(() => setPhase("complete"), 600);
    }
  }, [hintsUsed, phase, cipherLettersInPuzzle, userMapping, reverseCipher, checkCompletion]);

  const handleClear = useCallback(() => {
    setUserMapping({});
    setValidation({});
    setSelectedCipherLetter(null);
  }, []);

  // ─── Completion Screen ────────────────────────────────────────────────────

  if (phase === "complete") {
    return (
      <div className="mx-auto w-full max-w-2xl px-6 py-8 text-center">
        <div
          className="rounded-2xl border border-border bg-surface p-8"
          style={{ boxShadow: "var(--shadow-lg)" }}
        >
          <h2
            className="mb-4 text-3xl font-bold text-foreground"
            style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
          >
            Puzzle Complete!
          </h2>
          <blockquote className="mb-3 text-xl font-semibold leading-relaxed text-foreground">
            &ldquo;{puzzle.plaintext}&rdquo;
          </blockquote>
          <p
            className="mb-6 text-lg italic text-text-muted"
            style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
          >
            &mdash; {puzzle.author}
          </p>
          <p className="mb-6 text-base text-text-muted">
            {hintsUsed === 0
              ? "Solved without any hints -- outstanding!"
              : `Solved with ${hintsUsed} hint${hintsUsed > 1 ? "s" : ""} used.`}
          </p>
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
    <div ref={gameRef} className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6">
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

      {/* Instructions banner */}
      <div
        className="mb-4 rounded-xl border border-primary-200 bg-primary-50 px-4 py-3"
        role="status"
        aria-live="polite"
      >
        <p className="text-base font-semibold text-primary">
          {selectedCipherLetter
            ? `Selected: ${selectedCipherLetter} ${userMapping[selectedCipherLetter] ? `= ${userMapping[selectedCipherLetter]}` : "-- type a letter (A-Z) to assign"}`
            : "Click an encoded letter to select it, then type your guess"}
        </p>
      </div>

      {/* Cryptogram Display */}
      <div
        className="mb-6 rounded-2xl border border-border bg-surface p-4 sm:p-6"
        style={{ boxShadow: "var(--shadow-md)" }}
      >
        <div
          className="flex flex-wrap items-end gap-x-4 gap-y-4"
          role="group"
          aria-label="Cryptogram puzzle"
        >
          {encodedWords.map((word, wordIdx) => (
            <div key={wordIdx} className="inline-flex items-end gap-0.5">
              {word.map((cell) => {
                if (!cell.isLetter) {
                  // Punctuation -- render as-is
                  return (
                    <div
                      key={cell.index}
                      className="inline-flex min-w-[16px] flex-col items-center justify-end"
                    >
                      <span className="text-lg font-bold text-foreground">{cell.char}</span>
                    </div>
                  );
                }

                const cipherLetter = cell.char;
                const isSelected = selectedCipherLetter === cipherLetter;
                const userGuess = userMapping[cipherLetter] || "";
                const letterValidation = validation[cipherLetter] || "none";

                // Bottom text color
                let bottomTextClass = "text-foreground";
                let borderClass = "border-border";
                let bgClass = "";

                if (letterValidation === "correct") {
                  bottomTextClass = "text-success";
                  borderClass = "border-success";
                } else if (letterValidation === "wrong") {
                  bottomTextClass = "text-error";
                  borderClass = "border-error";
                } else if (userGuess) {
                  bottomTextClass = "text-primary";
                  borderClass = "border-primary";
                }

                if (isSelected) {
                  bgClass = "bg-primary-50";
                  if (letterValidation === "none") {
                    borderClass = "border-primary";
                  }
                }

                return (
                  <button
                    key={cell.index}
                    type="button"
                    onClick={() => handleSelectCipherLetter(cipherLetter)}
                    className={`inline-flex min-w-[32px] cursor-pointer flex-col items-center rounded-md px-1 py-0.5 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary/30 ${bgClass}`}
                    aria-label={`Cipher letter ${cipherLetter}${userGuess ? `, guessed ${userGuess}` : ", empty"}`}
                  >
                    {/* Top: cipher letter (small, muted) */}
                    <span className="select-none text-xs leading-tight text-text-muted">
                      {cipherLetter}
                    </span>
                    {/* Bottom: user guess (large, primary) */}
                    <span
                      className={`min-h-[28px] w-full border-b-2 text-center text-lg font-bold leading-tight ${bottomTextClass} ${borderClass}`}
                    >
                      {userGuess || "\u00A0"}
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Author attribution */}
        <p className="mt-4 text-right text-base italic text-text-muted">
          &mdash; {puzzle.author}
        </p>
      </div>

      {/* Toolbar */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={handleCheck}
          className="cursor-pointer rounded-xl border-2 border-primary bg-surface px-4 py-2 text-sm font-bold text-primary transition-colors duration-200 hover:bg-primary-50 focus:outline-none focus:ring-4 focus:ring-primary/20"
        >
          Check
        </button>
        <button
          onClick={handleHint}
          disabled={hintsUsed >= MAX_HINTS}
          className="cursor-pointer rounded-xl border-2 border-secondary bg-surface px-4 py-2 text-sm font-bold text-secondary-dark transition-colors duration-200 hover:bg-secondary-light/10 focus:outline-none focus:ring-4 focus:ring-secondary/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Hint ({MAX_HINTS - hintsUsed} left)
        </button>
        <button
          onClick={handleClear}
          className="cursor-pointer rounded-xl border-2 border-border bg-surface px-4 py-2 text-sm font-bold text-text-muted transition-colors duration-200 hover:bg-background focus:outline-none focus:ring-4 focus:ring-primary/20"
        >
          Clear All
        </button>
      </div>

      {/* Letter Frequency Helper */}
      <div
        className="rounded-2xl border border-border bg-surface p-4 sm:p-6"
        style={{ boxShadow: "var(--shadow-sm)" }}
      >
        <h3
          className="mb-3 text-base font-bold text-foreground"
          style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
        >
          Letter Frequency
        </h3>
        <div className="flex flex-wrap gap-2">
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => {
            const freq = cipherFrequency[letter] || 0;
            if (freq === 0) return null;

            const userGuess = userMapping[letter] || "";
            const isSelected = selectedCipherLetter === letter;
            const letterValidation = validation[letter] || "none";

            let bgClass = "bg-background";
            let textClass = "text-foreground";

            if (isSelected) {
              bgClass = "bg-primary-50";
            }
            if (letterValidation === "correct") {
              textClass = "text-success";
            } else if (letterValidation === "wrong") {
              textClass = "text-error";
            } else if (userGuess) {
              textClass = "text-primary";
            }

            return (
              <button
                key={letter}
                type="button"
                onClick={() => handleSelectCipherLetter(letter)}
                className={`inline-flex min-w-[44px] cursor-pointer flex-col items-center rounded-lg border border-border px-2 py-1.5 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary/30 ${bgClass}`}
                aria-label={`Cipher letter ${letter}, appears ${freq} time${freq !== 1 ? "s" : ""}${userGuess ? `, mapped to ${userGuess}` : ""}`}
              >
                <span className="text-xs font-bold text-text-muted">{letter}</span>
                <span className={`text-sm font-bold ${textClass}`}>
                  {userGuess || "?"}
                </span>
                <span className="text-xs text-text-muted">({freq})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation help */}
      <p className="mt-4 text-center text-sm text-text-muted">
        Use Tab or arrow keys to navigate between letters. Type A-Z to assign. Backspace to clear.
      </p>

      {/* Hidden input for mobile keyboard */}
      <input
        ref={hiddenInputRef}
        type="text"
        inputMode="text"
        autoCapitalize="characters"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        className="fixed opacity-0"
        style={{ fontSize: "16px", width: "1px", height: "1px", top: "-100px", left: "0" }}
        onInput={(e) => {
          const input = e.currentTarget;
          const val = input.value;
          if (val && /[a-zA-Z]/.test(val[val.length - 1])) {
            assignLetter(val[val.length - 1]);
          }
          input.value = "";
        }}
        onKeyDown={(e) => {
          if (e.key === "Backspace") {
            e.preventDefault();
            clearSelected();
          }
        }}
        aria-label="Type letters for cryptogram"
      />
    </div>
  );
}
