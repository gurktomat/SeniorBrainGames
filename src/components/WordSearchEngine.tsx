"use client";

import { useState, useCallback, useMemo } from "react";

interface WordEntry {
  word: string;
  startRow: number;
  startCol: number;
  endRow: number;
  endCol: number;
}

interface WordSearchPuzzleData {
  id: string;
  title: string;
  description: string;
  grid: string[];
  words: WordEntry[];
}

// ─── Main Engine ──────────────────────────────────────────────────────────────

export default function WordSearchEngine({
  title,
  puzzles,
}: {
  title: string;
  puzzles: WordSearchPuzzleData[];
}) {
  const [puzzleIndex, setPuzzleIndex] = useState(0);

  // Key-based remount: when puzzleIndex changes, WordSearchPuzzleView remounts with fresh state
  return (
    <WordSearchPuzzleView
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

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Return the set of (row,col) keys that a word occupies */
function getWordCellKeys(w: WordEntry): Set<string> {
  const keys = new Set<string>();
  if (w.startRow === w.endRow) {
    for (let c = w.startCol; c <= w.endCol; c++) keys.add(`${w.startRow},${c}`);
  } else {
    for (let r = w.startRow; r <= w.endRow; r++) keys.add(`${r},${w.startCol}`);
  }
  return keys;
}

/** Extract the letters between two cells (same row or same col, inclusive) */
function extractWord(
  grid: string[],
  r1: number,
  c1: number,
  r2: number,
  c2: number,
): string {
  let result = "";
  if (r1 === r2) {
    const minC = Math.min(c1, c2);
    const maxC = Math.max(c1, c2);
    for (let c = minC; c <= maxC; c++) result += grid[r1][c];
  } else if (c1 === c2) {
    const minR = Math.min(r1, r2);
    const maxR = Math.max(r1, r2);
    for (let r = minR; r <= maxR; r++) result += grid[r][c1];
  }
  return result;
}

// ─── Puzzle View ──────────────────────────────────────────────────────────────

function WordSearchPuzzleView({
  title,
  puzzle,
  puzzleIndex,
  totalPuzzles,
  onNextPuzzle,
  onRestart,
}: {
  title: string;
  puzzle: WordSearchPuzzleData;
  puzzleIndex: number;
  totalPuzzles: number;
  onNextPuzzle: () => void;
  onRestart: () => void;
}) {
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set());
  const [selectionStart, setSelectionStart] = useState<{ row: number; col: number } | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<{ row: number; col: number } | null>(null);
  const [phase, setPhase] = useState<"playing" | "complete">("playing");
  const [hintsUsed, setHintsUsed] = useState(0);

  const { grid, words } = puzzle;
  const rows = grid.length;
  const cols = grid[0].length;

  // Pre-compute the set of cell keys each found word covers
  const foundCellKeys = useMemo(() => {
    const keys = new Set<string>();
    for (const w of words) {
      if (foundWords.has(w.word)) {
        for (const k of getWordCellKeys(w)) keys.add(k);
      }
    }
    return keys;
  }, [foundWords, words]);

  // Cells in the current selection range
  const selectionCellKeys = useMemo(() => {
    const keys = new Set<string>();
    if (!selectionStart) return keys;
    if (!selectionEnd) {
      keys.add(`${selectionStart.row},${selectionStart.col}`);
      return keys;
    }
    const { row: r1, col: c1 } = selectionStart;
    const { row: r2, col: c2 } = selectionEnd;
    if (r1 === r2) {
      const minC = Math.min(c1, c2);
      const maxC = Math.max(c1, c2);
      for (let c = minC; c <= maxC; c++) keys.add(`${r1},${c}`);
    } else if (c1 === c2) {
      const minR = Math.min(r1, r2);
      const maxR = Math.max(r1, r2);
      for (let r = minR; r <= maxR; r++) keys.add(`${r},${c1}`);
    }
    return keys;
  }, [selectionStart, selectionEnd]);

  // ─── Cell Click Handler ──────────────────────────────────────────────────

  const handleCellClick = useCallback(
    (row: number, col: number) => {
      if (phase !== "playing") return;

      if (!selectionStart) {
        // First click — set start
        setSelectionStart({ row, col });
        setSelectionEnd(null);
        return;
      }

      if (!selectionEnd) {
        // Second click — must be same row or same col as start
        const { row: sr, col: sc } = selectionStart;

        // Clicking the same cell — deselect
        if (row === sr && col === sc) {
          setSelectionStart(null);
          return;
        }

        // Must be in same row or same column
        if (row !== sr && col !== sc) {
          // Invalid — restart selection at the new cell
          setSelectionStart({ row, col });
          setSelectionEnd(null);
          return;
        }

        // Valid second click
        setSelectionEnd({ row, col });

        // Check if the selected letters spell one of the hidden words
        const extracted = extractWord(grid, sr, sc, row, col);

        const matchedWord = words.find(
          (w) =>
            !foundWords.has(w.word) &&
            w.word === extracted &&
            // Verify exact position match
            Math.min(sr, row) === w.startRow &&
            Math.min(sc, col) === w.startCol &&
            Math.max(sr, row) === w.endRow &&
            Math.max(sc, col) === w.endCol,
        );

        if (matchedWord) {
          const newFound = new Set(foundWords);
          newFound.add(matchedWord.word);
          setFoundWords(newFound);

          // Brief delay to show selection, then clear
          setTimeout(() => {
            setSelectionStart(null);
            setSelectionEnd(null);
            if (newFound.size === words.length) {
              setPhase("complete");
            }
          }, 350);
        } else {
          // Not a match — clear selection after a brief flash
          setTimeout(() => {
            setSelectionStart(null);
            setSelectionEnd(null);
          }, 300);
        }
        return;
      }

      // Already have start + end — start new selection
      setSelectionStart({ row, col });
      setSelectionEnd(null);
    },
    [phase, selectionStart, selectionEnd, foundWords, grid, words],
  );

  // ─── Reveal Word (Hint) ─────────────────────────────────────────────────

  const handleReveal = useCallback(() => {
    if (hintsUsed >= 3) return;
    const remaining = words.filter((w) => !foundWords.has(w.word));
    if (remaining.length === 0) return;

    const toReveal = remaining[0];
    const newFound = new Set(foundWords);
    newFound.add(toReveal.word);
    setFoundWords(newFound);
    setHintsUsed((h) => h + 1);
    setSelectionStart(null);
    setSelectionEnd(null);

    if (newFound.size === words.length) {
      setTimeout(() => setPhase("complete"), 400);
    }
  }, [hintsUsed, words, foundWords]);

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
            style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
          >
            Puzzle Complete!
          </h2>
          <p className="mb-2 text-lg text-text-muted">{puzzle.title}</p>
          <p className="mb-6 text-base text-text-muted">
            {hintsUsed === 0
              ? "Found every word without hints — outstanding!"
              : `Found all words with ${hintsUsed} hint${hintsUsed > 1 ? "s" : ""} used.`}
          </p>
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

  // ─── Render ─────────────────────────────────────────────────────────────

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6">
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
            {puzzle.title} — {puzzle.description}
          </p>
        </div>
        <span
          className="rounded-full px-4 py-1.5 text-sm font-bold text-white"
          style={{ background: "var(--gradient-primary)" }}
        >
          {puzzleIndex + 1} / {totalPuzzles}
        </span>
      </div>

      {/* Instruction banner */}
      <div
        className="mb-4 rounded-xl border border-primary-200 bg-primary-50 px-4 py-3"
        role="status"
        aria-live="polite"
      >
        <p className="text-base font-semibold text-primary">
          {selectionStart && !selectionEnd
            ? "Now tap a second cell in the same row or column to complete your selection"
            : `Tap a cell to start selecting a word (${foundWords.size} of ${words.length} found)`}
        </p>
      </div>

      {/* Main layout: grid + word list */}
      <div className="flex flex-col gap-6 md:flex-row">
        {/* Grid section */}
        <div className="flex-shrink-0 md:w-[65%]">
          <div className="overflow-x-auto">
            <WordSearchGrid
              grid={grid}
              rows={rows}
              cols={cols}
              foundCellKeys={foundCellKeys}
              selectionCellKeys={selectionCellKeys}
              onCellClick={handleCellClick}
            />
          </div>

          {/* Reveal button */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={handleReveal}
              disabled={hintsUsed >= 3}
              className="cursor-pointer rounded-xl border-2 border-secondary bg-surface px-4 py-2 text-sm font-bold text-secondary-dark transition-colors duration-200 hover:bg-secondary-light/10 focus:outline-none focus:ring-4 focus:ring-secondary/20 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Reveal Word ({3 - hintsUsed} left)
            </button>
          </div>
        </div>

        {/* Word list panel */}
        <div className="flex-1 md:w-[35%]">
          <WordListPanel words={words} foundWords={foundWords} />
        </div>
      </div>
    </div>
  );
}

// ─── Grid Component ─────────────────────────────────────────────────────────

function WordSearchGrid({
  grid,
  rows,
  cols,
  foundCellKeys,
  selectionCellKeys,
  onCellClick,
}: {
  grid: string[];
  rows: number;
  cols: number;
  foundCellKeys: Set<string>;
  selectionCellKeys: Set<string>;
  onCellClick: (row: number, col: number) => void;
}) {
  return (
    <div
      role="grid"
      aria-label="Word search puzzle grid"
      className="mx-auto inline-grid gap-0 border border-border"
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(36px, 48px))`,
        gridTemplateRows: `repeat(${rows}, minmax(36px, 48px))`,
      }}
    >
      {Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => {
          const key = `${r},${c}`;
          const letter = grid[r][c];
          const isFound = foundCellKeys.has(key);
          const isSelected = selectionCellKeys.has(key);

          let bgClass = "bg-surface";
          let borderClass = "border-border";
          let textClass = "text-foreground";

          if (isFound) {
            bgClass = "bg-success/20";
            borderClass = "border-success/40";
            textClass = "text-success";
          } else if (isSelected) {
            bgClass = "bg-primary-50";
            borderClass = "border-primary";
            textClass = "text-primary";
          }

          return (
            <div
              key={key}
              role="gridcell"
              aria-label={`Row ${r + 1}, Column ${c + 1}, letter ${letter}${isFound ? ", found" : ""}`}
              className={`flex cursor-pointer items-center justify-center border ${bgClass} ${borderClass} select-none transition-colors duration-150 focus:outline-none focus:ring-4 focus:ring-primary/20`}
              onClick={() => onCellClick(r, c)}
            >
              <span className={`text-lg font-bold leading-none sm:text-xl ${textClass}`}>
                {letter}
              </span>
            </div>
          );
        }),
      )}
    </div>
  );
}

// ─── Word List Panel ────────────────────────────────────────────────────────

function WordListPanel({
  words,
  foundWords,
}: {
  words: WordEntry[];
  foundWords: Set<string>;
}) {
  return (
    <div>
      <h3
        className="mb-3 text-base font-bold text-foreground"
        style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
      >
        Words to Find
      </h3>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-1">
        {words.map((w) => {
          const isFound = foundWords.has(w.word);
          return (
            <li
              key={w.word}
              className={`rounded-lg px-3 py-2 text-lg font-semibold transition-colors duration-200 ${
                isFound
                  ? "bg-success/10 text-success line-through"
                  : "bg-surface text-foreground"
              }`}
              style={{ minHeight: "44px", display: "flex", alignItems: "center" }}
            >
              {w.word}
            </li>
          );
        })}
      </ul>
      <p className="mt-4 text-sm text-text-muted">
        {foundWords.size} of {words.length} words found
      </p>
    </div>
  );
}
