"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import StarRating from "./StarRating";
import type { CrosswordDirection, CrosswordClue } from "@/lib/types";
import {
  initializeGrid,
  findCurrentWord,
  getNextCell,
  getPreviousCell,
  getNextCellArrow,
  checkAllCorrect,
  type CellState,
} from "@/lib/crosswordUtils";

interface CrosswordPuzzleData {
  id: string;
  title: string;
  description: string;
  rows: number;
  cols: number;
  grid: string[];
  clues: CrosswordClue[];
}

interface Selection {
  row: number;
  col: number;
  direction: CrosswordDirection;
}

// ─── Main Engine ──────────────────────────────────────────────────────────────

export default function CrosswordEngine({
  title,
  puzzles,
}: {
  title: string;
  puzzles: CrosswordPuzzleData[];
}) {
  const [puzzleIndex, setPuzzleIndex] = useState(0);

  // Key-based remount: when puzzleIndex changes, CrosswordPuzzleView remounts with fresh state
  return (
    <CrosswordPuzzleView
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

function CrosswordPuzzleView({
  title,
  puzzle,
  puzzleIndex,
  totalPuzzles,
  onNextPuzzle,
  onRestart,
}: {
  title: string;
  puzzle: CrosswordPuzzleData;
  puzzleIndex: number;
  totalPuzzles: number;
  onNextPuzzle: () => void;
  onRestart: () => void;
}) {
  const { cells: initialCells, words: initialWords } = useMemo(
    () => initializeGrid(puzzle),
    [puzzle],
  );

  const [cells, setCells] = useState<CellState[][]>(initialCells);
  const [selection, setSelection] = useState<Selection | null>(null);
  const [hintsRemaining, setHintsRemaining] = useState(3);
  const [phase, setPhase] = useState<"playing" | "complete">("playing");

  const words = initialWords;
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  // Current word cells for highlighting
  const currentWordCells = useMemo(() => {
    if (!selection) return new Set<string>();
    const word = findCurrentWord(words, selection.row, selection.col, selection.direction);
    if (!word) return new Set<string>();
    return new Set(word.cells.map((c) => `${c.row},${c.col}`));
  }, [selection, words]);

  // Active clue
  const activeClue = useMemo(() => {
    if (!selection) return null;
    const word = findCurrentWord(words, selection.row, selection.col, selection.direction);
    if (!word) return null;
    return puzzle.clues.find(
      (c) => c.number === word.number && c.direction === word.direction,
    ) ?? null;
  }, [selection, words, puzzle.clues]);

  // ─── Input Handlers ───────────────────────────────────────────────────────

  const handleCellClick = useCallback(
    (row: number, col: number) => {
      if (phase !== "playing") return;
      if (cells[row][col].isBlack) return;

      if (selection && selection.row === row && selection.col === col) {
        // Toggle direction on re-click
        setSelection({
          row,
          col,
          direction: selection.direction === "across" ? "down" : "across",
        });
      } else {
        const dir = selection?.direction ?? "across";
        setSelection({ row, col, direction: dir });
      }

      // Focus hidden input for mobile keyboard
      setTimeout(() => hiddenInputRef.current?.focus(), 10);
    },
    [phase, cells, selection],
  );

  const handleClueClick = useCallback(
    (clue: CrosswordClue) => {
      if (phase !== "playing") return;
      const word = words.find(
        (w) => w.number === clue.number && w.direction === clue.direction,
      );
      if (word && word.cells.length > 0) {
        setSelection({
          row: word.cells[0].row,
          col: word.cells[0].col,
          direction: clue.direction,
        });
        setTimeout(() => hiddenInputRef.current?.focus(), 10);
      }
    },
    [phase, words],
  );

  const typeLetter = useCallback(
    (letter: string) => {
      if (!selection || phase !== "playing") return;
      const { row, col, direction } = selection;
      const cell = cells[row][col];
      if (cell.isBlack || cell.revealed) {
        // Move to next cell if current is revealed
        const next = getNextCell(row, col, direction, cells);
        if (next) setSelection({ ...next, direction });
        return;
      }

      setCells((prev) => {
        const updated = prev.map((r) => r.map((c) => ({ ...c })));
        updated[row][col].letter = letter.toUpperCase();
        updated[row][col].validation = "none";
        return updated;
      });

      // Auto-advance
      const next = getNextCell(row, col, direction, cells);
      if (next) setSelection({ ...next, direction });
    },
    [selection, phase, cells],
  );

  const handleBackspace = useCallback(() => {
    if (!selection || phase !== "playing") return;
    const { row, col, direction } = selection;
    const cell = cells[row][col];

    if (cell.letter && !cell.revealed) {
      // Clear current cell
      setCells((prev) => {
        const updated = prev.map((r) => r.map((c) => ({ ...c })));
        updated[row][col].letter = "";
        updated[row][col].validation = "none";
        return updated;
      });
    } else {
      // Move to previous cell and clear it
      const prev = getPreviousCell(row, col, direction, cells);
      if (prev) {
        setSelection({ ...prev, direction });
        if (!cells[prev.row][prev.col].revealed) {
          setCells((old) => {
            const updated = old.map((r) => r.map((c) => ({ ...c })));
            updated[prev.row][prev.col].letter = "";
            updated[prev.row][prev.col].validation = "none";
            return updated;
          });
        }
      }
    }
  }, [selection, phase, cells]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent | KeyboardEvent) => {
      if (phase !== "playing" || !selection) return;

      if (e.key === "Tab") {
        e.preventDefault();
        setSelection((s) =>
          s ? { ...s, direction: s.direction === "across" ? "down" : "across" } : s,
        );
        return;
      }

      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        const next = getNextCellArrow(
          selection.row,
          selection.col,
          e.key as "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight",
          cells,
        );
        if (next) {
          const newDir =
            e.key === "ArrowUp" || e.key === "ArrowDown" ? "down" : "across";
          setSelection({ ...next, direction: newDir });
        }
        return;
      }

      if (e.key === "Backspace") {
        e.preventDefault();
        handleBackspace();
        return;
      }

      if (/^[a-zA-Z]$/.test(e.key)) {
        e.preventDefault();
        typeLetter(e.key);
      }
    },
    [phase, selection, cells, handleBackspace, typeLetter],
  );

  // Global keyboard listener
  useEffect(() => {
    const handler = (e: KeyboardEvent) => handleKeyDown(e);
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleKeyDown]);

  // ─── Toolbar Actions ──────────────────────────────────────────────────────

  const handleCheck = useCallback(() => {
    setCells((prev) => {
      const updated = prev.map((r) =>
        r.map((c) => {
          if (c.isBlack || !c.letter) return c;
          return {
            ...c,
            validation: c.letter === c.solution ? ("correct" as const) : ("wrong" as const),
          };
        }),
      );

      // Check for completion
      if (checkAllCorrect(updated)) {
        setTimeout(() => setPhase("complete"), 600);
      }

      return updated;
    });
  }, []);

  const handleReveal = useCallback(() => {
    if (!selection || hintsRemaining <= 0) return;
    const { row, col } = selection;
    const cell = cells[row][col];
    if (cell.isBlack || cell.revealed) return;

    setHintsRemaining((h) => h - 1);
    setCells((prev) => {
      const updated = prev.map((r) => r.map((c) => ({ ...c })));
      updated[row][col].letter = updated[row][col].solution;
      updated[row][col].revealed = true;
      updated[row][col].validation = "correct";

      if (checkAllCorrect(updated)) {
        setTimeout(() => setPhase("complete"), 600);
      }

      return updated;
    });
  }, [selection, hintsRemaining, cells]);

  const handleClear = useCallback(() => {
    setCells((prev) =>
      prev.map((r) =>
        r.map((c) => {
          if (c.isBlack || c.revealed) return c;
          return { ...c, letter: "", validation: "none" as const };
        }),
      ),
    );
  }, []);

  const handleNextPuzzle = onNextPuzzle;
  const handleRestart = onRestart;

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
          <p className="mb-6 text-base text-text-muted">
            {hintsRemaining === 3
              ? "Solved without any hints — outstanding!"
              : `Solved with ${3 - hintsRemaining} hint${3 - hintsRemaining > 1 ? "s" : ""} used.`}
          </p>
          <StarRating />
          <div className="flex flex-col items-center gap-3">
            {puzzleIndex + 1 < totalPuzzles ? (
              <button
                onClick={handleNextPuzzle}
                className="btn-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
              >
                Next Puzzle
              </button>
            ) : (
              <button
                onClick={handleRestart}
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

  // ─── Across and Down clues ────────────────────────────────────────────────

  const acrossClues = puzzle.clues.filter((c) => c.direction === "across");
  const downClues = puzzle.clues.filter((c) => c.direction === "down");

  // ─── Render ───────────────────────────────────────────────────────────────

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

      {/* Active clue banner */}
      <div
        className="mb-4 rounded-xl border border-primary-200 bg-primary-50 px-4 py-3"
        role="status"
        aria-live="polite"
      >
        <p className="text-base font-semibold text-primary">
          {activeClue
            ? `${activeClue.number} ${activeClue.direction === "across" ? "Across" : "Down"}: ${activeClue.clue}`
            : "Tap a cell to begin"}
        </p>
      </div>

      {/* Main layout: grid + clues */}
      <div className="flex flex-col gap-6 md:flex-row">
        {/* Grid section */}
        <div className="flex-shrink-0 md:w-[60%]">
          <div className="overflow-x-auto">
            <CrosswordGrid
              cells={cells}
              selection={selection}
              currentWordCells={currentWordCells}
              onCellClick={handleCellClick}
            />
          </div>

          {/* Hidden input for mobile keyboard */}
          <input
            ref={hiddenInputRef}
            type="text"
            inputMode="text"
            autoCapitalize="characters"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            className="absolute opacity-0"
            style={{ fontSize: "16px", width: 0, height: 0 }}
            onInput={(e) => {
              const input = e.currentTarget;
              const val = input.value;
              if (val && /[a-zA-Z]/.test(val[val.length - 1])) {
                typeLetter(val[val.length - 1]);
              }
              input.value = "";
            }}
            onKeyDown={(e) => {
              if (e.key === "Backspace") {
                e.preventDefault();
                handleBackspace();
              }
            }}
            aria-label="Type letters for crossword"
          />

          {/* Toolbar */}
          <CrosswordToolbar
            onCheck={handleCheck}
            onReveal={handleReveal}
            onClear={handleClear}
            hintsRemaining={hintsRemaining}
            hasSelection={!!selection}
          />
        </div>

        {/* Clue panel */}
        <div className="flex-1 md:w-[40%]">
          <CrosswordCluePanel
            acrossClues={acrossClues}
            downClues={downClues}
            activeClue={activeClue}
            onClueClick={handleClueClick}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Grid Component ─────────────────────────────────────────────────────────

function CrosswordGrid({
  cells,
  selection,
  currentWordCells,
  onCellClick,
}: {
  cells: CellState[][];
  selection: Selection | null;
  currentWordCells: Set<string>;
  onCellClick: (row: number, col: number) => void;
}) {
  const rows = cells.length;
  const cols = cells[0].length;

  return (
    <div
      role="grid"
      aria-label="Crossword puzzle grid"
      className="mx-auto inline-grid gap-0 border border-primary-dark"
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(36px, 48px))`,
        gridTemplateRows: `repeat(${rows}, minmax(36px, 48px))`,
      }}
    >
      {cells.flat().map((cell) => {
        const key = `${cell.row},${cell.col}`;
        const isSelected =
          selection?.row === cell.row && selection?.col === cell.col;
        const isInWord = currentWordCells.has(key);

        let bgClass = "bg-surface";
        let borderClass = "border-border";

        if (cell.isBlack) {
          bgClass = "bg-primary-dark";
          borderClass = "border-primary-dark";
        } else if (cell.validation === "correct") {
          bgClass = isSelected ? "bg-success/20" : "bg-success/10";
          borderClass = "border-success";
        } else if (cell.validation === "wrong") {
          bgClass = isSelected ? "bg-error/20" : "bg-error/10";
          borderClass = "border-error";
        } else if (isSelected) {
          bgClass = "bg-primary-50";
          borderClass = "border-primary border-2";
        } else if (isInWord) {
          bgClass = "bg-primary-50/50";
          borderClass = "border-primary-200";
        }

        return (
          <div
            key={key}
            role="gridcell"
            tabIndex={isSelected ? 0 : -1}
            aria-label={
              cell.isBlack
                ? "Black cell"
                : `Row ${cell.row + 1}, Column ${cell.col + 1}${cell.number ? `, number ${cell.number}` : ""}${cell.letter ? `, letter ${cell.letter}` : ", empty"}`
            }
            className={`relative flex cursor-pointer items-center justify-center border ${bgClass} ${borderClass} select-none transition-colors duration-150 focus:outline-none focus:ring-4 focus:ring-primary/20`}
            onClick={() => onCellClick(cell.row, cell.col)}
          >
            {cell.number && (
              <span className="absolute left-0.5 top-0 text-[10px] font-bold leading-tight text-text-muted">
                {cell.number}
              </span>
            )}
            {!cell.isBlack && (
              <span
                className={`text-lg font-bold leading-none sm:text-xl ${
                  cell.revealed
                    ? "italic text-primary"
                    : cell.validation === "correct"
                      ? "text-success"
                      : cell.validation === "wrong"
                        ? "text-error"
                        : "text-foreground"
                }`}
              >
                {cell.letter}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Clue Panel ─────────────────────────────────────────────────────────────

function CrosswordCluePanel({
  acrossClues,
  downClues,
  activeClue,
  onClueClick,
}: {
  acrossClues: CrosswordClue[];
  downClues: CrosswordClue[];
  activeClue: CrosswordClue | null;
  onClueClick: (clue: CrosswordClue) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
      <div>
        <h3
          className="mb-2 text-base font-bold text-foreground"
          style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
        >
          Across
        </h3>
        <ul className="space-y-1">
          {acrossClues.map((clue) => {
            const isActive =
              activeClue?.number === clue.number &&
              activeClue?.direction === clue.direction;
            return (
              <li key={`a${clue.number}`}>
                <button
                  onClick={() => onClueClick(clue)}
                  className={`w-full cursor-pointer rounded-lg px-3 py-2 text-left text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                    isActive
                      ? "bg-primary-50 font-semibold text-primary"
                      : "text-foreground hover:bg-primary-50/50"
                  }`}
                >
                  <span className="mr-1 font-bold">{clue.number}.</span>
                  {clue.clue}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <h3
          className="mb-2 text-base font-bold text-foreground"
          style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
        >
          Down
        </h3>
        <ul className="space-y-1">
          {downClues.map((clue) => {
            const isActive =
              activeClue?.number === clue.number &&
              activeClue?.direction === clue.direction;
            return (
              <li key={`d${clue.number}`}>
                <button
                  onClick={() => onClueClick(clue)}
                  className={`w-full cursor-pointer rounded-lg px-3 py-2 text-left text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                    isActive
                      ? "bg-primary-50 font-semibold text-primary"
                      : "text-foreground hover:bg-primary-50/50"
                  }`}
                >
                  <span className="mr-1 font-bold">{clue.number}.</span>
                  {clue.clue}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

// ─── Toolbar ────────────────────────────────────────────────────────────────

function CrosswordToolbar({
  onCheck,
  onReveal,
  onClear,
  hintsRemaining,
  hasSelection,
}: {
  onCheck: () => void;
  onReveal: () => void;
  onClear: () => void;
  hintsRemaining: number;
  hasSelection: boolean;
}) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      <button
        onClick={onCheck}
        className="cursor-pointer rounded-xl border-2 border-primary bg-surface px-4 py-2 text-sm font-bold text-primary transition-colors duration-200 hover:bg-primary-50 focus:outline-none focus:ring-4 focus:ring-primary/20"
      >
        Check
      </button>
      <button
        onClick={onReveal}
        disabled={!hasSelection || hintsRemaining <= 0}
        className="cursor-pointer rounded-xl border-2 border-secondary bg-surface px-4 py-2 text-sm font-bold text-secondary-dark transition-colors duration-200 hover:bg-secondary-light/10 focus:outline-none focus:ring-4 focus:ring-secondary/20 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Reveal ({hintsRemaining})
      </button>
      <button
        onClick={onClear}
        className="cursor-pointer rounded-xl border-2 border-border bg-surface px-4 py-2 text-sm font-bold text-text-muted transition-colors duration-200 hover:bg-background focus:outline-none focus:ring-4 focus:ring-primary/20"
      >
        Clear
      </button>
    </div>
  );
}
