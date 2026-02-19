"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import StarRating from "./StarRating";

interface SudokuPuzzleData {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  grid: number[][];
  solution: number[][];
}

interface CellData {
  value: number;
  isGiven: boolean;
  isError: boolean;
  notes: number[];
}

interface CellPosition {
  row: number;
  col: number;
}

// ─── Main Engine ──────────────────────────────────────────────────────────────

export default function SudokuEngine({
  title,
  puzzles,
}: {
  title: string;
  puzzles: SudokuPuzzleData[];
}) {
  const [puzzleIndex, setPuzzleIndex] = useState(0);

  return (
    <SudokuPuzzleView
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

function SudokuPuzzleView({
  title,
  puzzle,
  puzzleIndex,
  totalPuzzles,
  onNextPuzzle,
  onRestart,
}: {
  title: string;
  puzzle: SudokuPuzzleData;
  puzzleIndex: number;
  totalPuzzles: number;
  onNextPuzzle: () => void;
  onRestart: () => void;
}) {
  const initialCells = useMemo(() => {
    const grid: CellData[][] = [];
    for (let r = 0; r < 9; r++) {
      const row: CellData[] = [];
      for (let c = 0; c < 9; c++) {
        const val = puzzle.grid[r][c];
        row.push({
          value: val,
          isGiven: val !== 0,
          isError: false,
          notes: [],
        });
      }
      grid.push(row);
    }
    return grid;
  }, [puzzle]);

  const [cells, setCells] = useState<CellData[][]>(initialCells);
  const [selectedCell, setSelectedCell] = useState<CellPosition | null>(null);
  const [notesMode, setNotesMode] = useState(false);
  const [phase, setPhase] = useState<"playing" | "complete">("playing");
  const [hintsRemaining, setHintsRemaining] = useState(3);

  // ─── Helpers ───────────────────────────────────────────────────────────────

  const checkCompletion = useCallback(
    (grid: CellData[][]) => {
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (grid[r][c].value !== puzzle.solution[r][c]) {
            return false;
          }
        }
      }
      return true;
    },
    [puzzle.solution],
  );

  // Selected cell value for same-number highlighting
  const selectedValue = useMemo(() => {
    if (!selectedCell) return 0;
    return cells[selectedCell.row][selectedCell.col].value;
  }, [selectedCell, cells]);

  // Same row/col/box set for region highlighting
  const regionCells = useMemo(() => {
    if (!selectedCell) return new Set<string>();
    const set = new Set<string>();
    const { row, col } = selectedCell;
    // Same row
    for (let c = 0; c < 9; c++) set.add(`${row},${c}`);
    // Same col
    for (let r = 0; r < 9; r++) set.add(`${r},${col}`);
    // Same box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let r = boxRow; r < boxRow + 3; r++) {
      for (let c = boxCol; c < boxCol + 3; c++) {
        set.add(`${r},${c}`);
      }
    }
    return set;
  }, [selectedCell]);

  // ─── Cell Actions ──────────────────────────────────────────────────────────

  const handleCellClick = useCallback(
    (row: number, col: number) => {
      if (phase !== "playing") return;
      setSelectedCell({ row, col });
    },
    [phase],
  );

  const handleNumberInput = useCallback(
    (num: number) => {
      if (!selectedCell || phase !== "playing") return;
      const { row, col } = selectedCell;
      const cell = cells[row][col];
      if (cell.isGiven) return;

      if (notesMode) {
        setCells((prev) => {
          const updated = prev.map((r) =>
            r.map((c) => ({ ...c, notes: [...c.notes] })),
          );
          const currentNotes = updated[row][col].notes;
          const idx = currentNotes.indexOf(num);
          if (idx >= 0) {
            currentNotes.splice(idx, 1);
          } else {
            currentNotes.push(num);
            currentNotes.sort((a, b) => a - b);
          }
          updated[row][col].notes = currentNotes;
          updated[row][col].value = 0;
          updated[row][col].isError = false;
          return updated;
        });
      } else {
        setCells((prev) => {
          const updated = prev.map((r) =>
            r.map((c) => ({ ...c, notes: [...c.notes] })),
          );
          updated[row][col].value = num;
          updated[row][col].notes = [];
          updated[row][col].isError = false;

          if (checkCompletion(updated)) {
            setTimeout(() => setPhase("complete"), 400);
          }

          return updated;
        });
      }
    },
    [selectedCell, phase, cells, notesMode, checkCompletion],
  );

  const handleErase = useCallback(() => {
    if (!selectedCell || phase !== "playing") return;
    const { row, col } = selectedCell;
    const cell = cells[row][col];
    if (cell.isGiven) return;

    setCells((prev) => {
      const updated = prev.map((r) =>
        r.map((c) => ({ ...c, notes: [...c.notes] })),
      );
      updated[row][col].value = 0;
      updated[row][col].notes = [];
      updated[row][col].isError = false;
      return updated;
    });
  }, [selectedCell, phase, cells]);

  const handleCheck = useCallback(() => {
    setCells((prev) => {
      const updated = prev.map((r) =>
        r.map((c) => ({ ...c, notes: [...c.notes] })),
      );
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (!updated[r][c].isGiven && updated[r][c].value !== 0) {
            updated[r][c].isError =
              updated[r][c].value !== puzzle.solution[r][c];
          }
        }
      }
      return updated;
    });
  }, [puzzle.solution]);

  const handleHint = useCallback(() => {
    if (!selectedCell || hintsRemaining <= 0 || phase !== "playing") return;
    const { row, col } = selectedCell;
    const cell = cells[row][col];
    if (cell.isGiven) return;

    setHintsRemaining((h) => h - 1);
    setCells((prev) => {
      const updated = prev.map((r) =>
        r.map((c) => ({ ...c, notes: [...c.notes] })),
      );
      updated[row][col].value = puzzle.solution[row][col];
      updated[row][col].notes = [];
      updated[row][col].isError = false;
      updated[row][col].isGiven = true;

      if (checkCompletion(updated)) {
        setTimeout(() => setPhase("complete"), 400);
      }

      return updated;
    });
  }, [selectedCell, hintsRemaining, phase, cells, puzzle.solution, checkCompletion]);

  // ─── Arrow Key Navigation ──────────────────────────────────────────────────

  const moveSelection = useCallback(
    (dr: number, dc: number) => {
      setSelectedCell((prev) => {
        if (!prev) return { row: 0, col: 0 };
        const newRow = Math.max(0, Math.min(8, prev.row + dr));
        const newCol = Math.max(0, Math.min(8, prev.col + dc));
        return { row: newRow, col: newCol };
      });
    },
    [],
  );

  // ─── Keyboard Listener ────────────────────────────────────────────────────

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (phase !== "playing") return;

      if (e.key >= "1" && e.key <= "9") {
        e.preventDefault();
        handleNumberInput(parseInt(e.key, 10));
        return;
      }

      if (e.key === "Backspace" || e.key === "Delete") {
        e.preventDefault();
        handleErase();
        return;
      }

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          moveSelection(-1, 0);
          break;
        case "ArrowDown":
          e.preventDefault();
          moveSelection(1, 0);
          break;
        case "ArrowLeft":
          e.preventDefault();
          moveSelection(0, -1);
          break;
        case "ArrowRight":
          e.preventDefault();
          moveSelection(0, 1);
          break;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [phase, handleNumberInput, handleErase, moveSelection]);

  // ─── Difficulty Label ──────────────────────────────────────────────────────

  const difficultyColor = useMemo(() => {
    switch (puzzle.difficulty) {
      case "easy":
        return "bg-success/15 text-success";
      case "medium":
        return "bg-secondary-light/20 text-secondary-dark";
      case "hard":
        return "bg-error/15 text-error";
      default:
        return "bg-primary-50 text-primary";
    }
  }, [puzzle.difficulty]);

  // ─── Completion Screen ─────────────────────────────────────────────────────

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
            Puzzle Complete!
          </h2>
          <p className="mb-1 text-lg text-text-muted">{puzzle.title}</p>
          <p
            className={`mb-4 inline-block rounded-full px-3 py-1 text-sm font-bold ${difficultyColor}`}
          >
            {puzzle.difficulty.charAt(0).toUpperCase() +
              puzzle.difficulty.slice(1)}
          </p>
          <p className="mb-6 text-base text-text-muted">
            {hintsRemaining === 3
              ? "Solved without any hints — outstanding!"
              : `Solved with ${3 - hintsRemaining} hint${3 - hintsRemaining > 1 ? "s" : ""} used.`}
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

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-6 sm:px-6">
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
            {puzzle.title} ({puzzleIndex + 1} of {totalPuzzles})
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-sm font-bold ${difficultyColor}`}
          >
            {puzzle.difficulty.charAt(0).toUpperCase() +
              puzzle.difficulty.slice(1)}
          </span>
          <span
            className="rounded-full px-4 py-1.5 text-sm font-bold text-white"
            style={{ background: "var(--gradient-primary)" }}
          >
            {puzzleIndex + 1} / {totalPuzzles}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="mb-4 text-base text-text-muted">{puzzle.description}</p>

      {/* Grid */}
      <div className="mb-4 flex justify-center">
        <SudokuGrid
          cells={cells}
          selectedCell={selectedCell}
          selectedValue={selectedValue}
          regionCells={regionCells}
          onCellClick={handleCellClick}
        />
      </div>

      {/* Toolbar */}
      <SudokuToolbar
        notesMode={notesMode}
        onToggleNotes={() => setNotesMode((n) => !n)}
        onCheck={handleCheck}
        onErase={handleErase}
        onHint={handleHint}
        hintsRemaining={hintsRemaining}
        hasSelection={
          !!selectedCell && !cells[selectedCell.row][selectedCell.col].isGiven
        }
      />

      {/* Number Pad */}
      <SudokuNumberPad
        onNumberClick={handleNumberInput}
        notesMode={notesMode}
      />
    </div>
  );
}

// ─── Grid Component ─────────────────────────────────────────────────────────

function SudokuGrid({
  cells,
  selectedCell,
  selectedValue,
  regionCells,
  onCellClick,
}: {
  cells: CellData[][];
  selectedCell: CellPosition | null;
  selectedValue: number;
  regionCells: Set<string>;
  onCellClick: (row: number, col: number) => void;
}) {
  return (
    <div
      role="grid"
      aria-label="Sudoku puzzle grid"
      className="inline-grid border-2 border-primary-dark"
      style={{
        gridTemplateColumns: "repeat(9, minmax(36px, 44px))",
        gridTemplateRows: "repeat(9, minmax(36px, 44px))",
      }}
    >
      {cells.flat().map((cell, idx) => {
        const row = Math.floor(idx / 9);
        const col = idx % 9;
        const key = `${row},${col}`;
        const isSelected =
          selectedCell?.row === row && selectedCell?.col === col;
        const isInRegion = regionCells.has(key);
        const isSameNumber =
          selectedValue !== 0 && cell.value === selectedValue && !isSelected;

        // Border logic for 3x3 box separators
        const borderRight =
          col === 2 || col === 5
            ? "border-r-2 border-r-primary-dark"
            : "border-r border-r-border";
        const borderBottom =
          row === 2 || row === 5
            ? "border-b-2 border-b-primary-dark"
            : "border-b border-b-border";

        // Background logic
        let bgClass = "bg-surface";
        if (cell.isError) {
          bgClass = "bg-error/10";
        } else if (isSelected) {
          bgClass = "bg-primary-50";
        } else if (isSameNumber) {
          bgClass = "bg-primary-100";
        } else if (isInRegion) {
          bgClass = "bg-primary-50/40";
        }

        // Text color logic
        let textClass = "text-foreground";
        if (cell.isError) {
          textClass = "text-error";
        } else if (cell.isGiven) {
          textClass = "font-bold text-foreground";
        } else {
          textClass = "text-primary";
        }

        // Border highlight for selected cell
        const selectedBorder = isSelected
          ? "ring-2 ring-inset ring-primary"
          : "";

        return (
          <div
            key={key}
            role="gridcell"
            tabIndex={isSelected ? 0 : -1}
            aria-label={`Row ${row + 1}, Column ${col + 1}${cell.value ? `, value ${cell.value}` : ", empty"}${cell.isGiven ? ", given" : ""}`}
            className={`relative flex cursor-pointer items-center justify-center select-none transition-colors duration-100 ${borderRight} ${borderBottom} ${bgClass} ${selectedBorder}`}
            style={{ minWidth: 36, minHeight: 36 }}
            onClick={() => onCellClick(row, col)}
          >
            {cell.value !== 0 ? (
              <span
                className={`text-lg leading-none sm:text-xl ${textClass}`}
                style={{ fontSize: "clamp(18px, 5vw, 1.25rem)" }}
              >
                {cell.value}
              </span>
            ) : cell.notes.length > 0 ? (
              <div
                className="grid h-full w-full"
                style={{
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gridTemplateRows: "repeat(3, 1fr)",
                }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                  <span
                    key={n}
                    className="flex items-center justify-center text-text-muted"
                    style={{ fontSize: "9px", lineHeight: 1 }}
                  >
                    {cell.notes.includes(n) ? n : ""}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

// ─── Toolbar ────────────────────────────────────────────────────────────────

function SudokuToolbar({
  notesMode,
  onToggleNotes,
  onCheck,
  onErase,
  onHint,
  hintsRemaining,
  hasSelection,
}: {
  notesMode: boolean;
  onToggleNotes: () => void;
  onCheck: () => void;
  onErase: () => void;
  onHint: () => void;
  hintsRemaining: number;
  hasSelection: boolean;
}) {
  return (
    <div className="mb-4 flex flex-wrap justify-center gap-2">
      <button
        onClick={onToggleNotes}
        className={`cursor-pointer rounded-xl border-2 px-4 py-2 text-sm font-bold transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-primary/20 ${
          notesMode
            ? "border-primary bg-primary-50 text-primary"
            : "border-border bg-surface text-text-muted hover:bg-background"
        }`}
      >
        Notes {notesMode ? "ON" : "OFF"}
      </button>
      <button
        onClick={onCheck}
        className="cursor-pointer rounded-xl border-2 border-primary bg-surface px-4 py-2 text-sm font-bold text-primary transition-colors duration-200 hover:bg-primary-50 focus:outline-none focus:ring-4 focus:ring-primary/20"
      >
        Check
      </button>
      <button
        onClick={onErase}
        disabled={!hasSelection}
        className="cursor-pointer rounded-xl border-2 border-border bg-surface px-4 py-2 text-sm font-bold text-text-muted transition-colors duration-200 hover:bg-background focus:outline-none focus:ring-4 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Erase
      </button>
      <button
        onClick={onHint}
        disabled={!hasSelection || hintsRemaining <= 0}
        className="cursor-pointer rounded-xl border-2 border-secondary bg-surface px-4 py-2 text-sm font-bold text-secondary-dark transition-colors duration-200 hover:bg-secondary-light/10 focus:outline-none focus:ring-4 focus:ring-secondary/20 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Hint ({hintsRemaining})
      </button>
    </div>
  );
}

// ─── Number Pad ─────────────────────────────────────────────────────────────

function SudokuNumberPad({
  onNumberClick,
  notesMode,
}: {
  onNumberClick: (num: number) => void;
  notesMode: boolean;
}) {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-9 gap-1.5 sm:gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => onNumberClick(num)}
            className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl text-lg font-bold transition-colors duration-150 focus:outline-none focus:ring-4 focus:ring-primary/20 sm:h-12 sm:w-12 sm:text-xl ${
              notesMode
                ? "border-2 border-primary-200 bg-primary-50 text-primary hover:bg-primary-100"
                : "border-2 border-primary bg-surface text-primary hover:bg-primary-50"
            }`}
            aria-label={`${notesMode ? "Toggle note " : "Enter "}${num}`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}
