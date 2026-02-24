"use client";

import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import StarRating from "./StarRating";

// ─── Types ───────────────────────────────────────────────────────────────────

type Difficulty = "easy" | "medium" | "hard";

interface DifficultyConfig {
  rows: number;
  cols: number;
  mines: number;
  label: string;
}

const DIFFICULTIES: Record<Difficulty, DifficultyConfig> = {
  easy: { rows: 9, cols: 9, mines: 10, label: "Easy" },
  medium: { rows: 12, cols: 12, mines: 25, label: "Medium" },
  hard: { rows: 16, cols: 16, mines: 40, label: "Hard" },
};

interface Cell {
  hasMine: boolean;
  revealed: boolean;
  flagged: boolean;
  adjacentMines: number;
}

type GamePhase = "selecting" | "playing" | "won" | "lost";

// Classic minesweeper number colors
const NUMBER_COLORS: Record<number, string> = {
  1: "#2563eb", // blue
  2: "#16a34a", // green
  3: "#dc2626", // red
  4: "#7c3aed", // purple
  5: "#b91c1c", // dark red
  6: "#0891b2", // teal
  7: "#1e293b", // dark
  8: "#6b7280", // gray
};

// ─── Board Generation ────────────────────────────────────────────────────────

function createEmptyBoard(rows: number, cols: number): Cell[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      hasMine: false,
      revealed: false,
      flagged: false,
      adjacentMines: 0,
    }))
  );
}

function placeMines(
  board: Cell[][],
  rows: number,
  cols: number,
  mines: number,
  safeRow: number,
  safeCol: number
): Cell[][] {
  const newBoard = board.map((r) => r.map((c) => ({ ...c })));
  // Safe zone: the clicked cell and its neighbors
  const safeSet = new Set<string>();
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      const nr = safeRow + dr;
      const nc = safeCol + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
        safeSet.add(`${nr},${nc}`);
      }
    }
  }

  let placed = 0;
  while (placed < mines) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    if (!newBoard[r][c].hasMine && !safeSet.has(`${r},${c}`)) {
      newBoard[r][c].hasMine = true;
      placed++;
    }
  }

  // Calculate adjacent mine counts
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (newBoard[r][c].hasMine) continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && newBoard[nr][nc].hasMine) {
            count++;
          }
        }
      }
      newBoard[r][c].adjacentMines = count;
    }
  }

  return newBoard;
}

function floodFill(board: Cell[][], rows: number, cols: number, startRow: number, startCol: number): Cell[][] {
  const newBoard = board.map((r) => r.map((c) => ({ ...c })));
  const stack: [number, number][] = [[startRow, startCol]];

  while (stack.length > 0) {
    const [r, c] = stack.pop()!;
    if (r < 0 || r >= rows || c < 0 || c >= cols) continue;
    if (newBoard[r][c].revealed || newBoard[r][c].flagged || newBoard[r][c].hasMine) continue;

    newBoard[r][c].revealed = true;

    if (newBoard[r][c].adjacentMines === 0) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          stack.push([r + dr, c + dc]);
        }
      }
    }
  }

  return newBoard;
}

function checkWin(board: Cell[][], rows: number, cols: number): boolean {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!board[r][c].hasMine && !board[r][c].revealed) return false;
    }
  }
  return true;
}

function revealAllMines(board: Cell[][], rows: number, cols: number): Cell[][] {
  return board.map((row) =>
    row.map((cell) => (cell.hasMine ? { ...cell, revealed: true } : { ...cell }))
  );
}

// ─── Main Engine ─────────────────────────────────────────────────────────────

export default function MinesweeperEngine({ title }: { title: string }) {
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);

  if (!difficulty) {
    return <DifficultySelector title={title} onSelect={setDifficulty} />;
  }

  return (
    <MinesweeperGame
      key={difficulty}
      title={title}
      difficulty={difficulty}
      onChangeDifficulty={() => setDifficulty(null)}
    />
  );
}

// ─── Difficulty Selector ─────────────────────────────────────────────────────

function DifficultySelector({
  title,
  onSelect,
}: {
  title: string;
  onSelect: (d: Difficulty) => void;
}) {
  const levels: { key: Difficulty; desc: string; color: string }[] = [
    { key: "easy", desc: "9 x 9 grid, 10 mines", color: "bg-success/15 text-success" },
    { key: "medium", desc: "12 x 12 grid, 25 mines", color: "bg-secondary-light/20 text-secondary-dark" },
    { key: "hard", desc: "16 x 16 grid, 40 mines", color: "bg-error/15 text-error" },
  ];

  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-8">
      <h1
        className="mb-2 text-center text-2xl font-bold text-foreground sm:text-3xl"
        style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
      >
        {title}
      </h1>
      <p className="mb-8 text-center text-lg text-text-muted">
        Choose your difficulty level to begin.
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        {levels.map((level) => {
          const cfg = DIFFICULTIES[level.key];
          return (
            <button
              key={level.key}
              onClick={() => onSelect(level.key)}
              className="card-playful group flex cursor-pointer flex-col items-center p-6 text-center transition-transform hover:scale-[1.02]"
            >
              <span className={`mb-3 rounded-full px-4 py-1.5 text-sm font-bold ${level.color}`}>
                {cfg.label}
              </span>
              <p className="mb-1 text-base font-bold text-foreground">{level.desc}</p>
              <p className="text-sm text-text-muted">
                {cfg.mines} mines to find
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Game View ───────────────────────────────────────────────────────────────

function MinesweeperGame({
  title,
  difficulty,
  onChangeDifficulty,
}: {
  title: string;
  difficulty: Difficulty;
  onChangeDifficulty: () => void;
}) {
  const config = DIFFICULTIES[difficulty];
  const { rows, cols, mines } = config;

  const [board, setBoard] = useState<Cell[][]>(() => createEmptyBoard(rows, cols));
  const [phase, setPhase] = useState<GamePhase>("playing");
  const [firstClick, setFirstClick] = useState(true);
  const [flagMode, setFlagMode] = useState(false);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [timerStarted, setTimerStarted] = useState(false);
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const flagCount = useMemo(
    () => board.flat().filter((c) => c.flagged).length,
    [board]
  );

  // Timer
  useEffect(() => {
    if (timerStarted && phase === "playing") {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((s) => s + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerStarted, phase]);

  const formatTime = useCallback((secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }, []);

  // ─── Cell Actions ──────────────────────────────────────────────────────────

  const revealCell = useCallback(
    (r: number, c: number) => {
      if (phase !== "playing") return;

      let currentBoard = board;

      // First click: place mines ensuring safety
      if (firstClick) {
        currentBoard = placeMines(currentBoard, rows, cols, mines, r, c);
        setFirstClick(false);
        setTimerStarted(true);
      }

      const cell = currentBoard[r][c];
      if (cell.revealed || cell.flagged) return;

      if (cell.hasMine) {
        const finalBoard = revealAllMines(currentBoard, rows, cols);
        // Mark the clicked mine specially
        finalBoard[r][c] = { ...finalBoard[r][c], revealed: true };
        setBoard(finalBoard);
        setPhase("lost");
        return;
      }

      const newBoard = floodFill(currentBoard, rows, cols, r, c);
      setBoard(newBoard);

      if (checkWin(newBoard, rows, cols)) {
        setPhase("won");
      }
    },
    [board, phase, firstClick, rows, cols, mines]
  );

  const toggleFlag = useCallback(
    (r: number, c: number) => {
      if (phase !== "playing") return;
      const cell = board[r][c];
      if (cell.revealed) return;

      setBoard((prev) => {
        const newBoard = prev.map((row) => row.map((cell) => ({ ...cell })));
        newBoard[r][c].flagged = !newBoard[r][c].flagged;
        return newBoard;
      });
    },
    [board, phase]
  );

  const handleCellClick = useCallback(
    (r: number, c: number) => {
      if (flagMode) {
        toggleFlag(r, c);
      } else {
        revealCell(r, c);
      }
    },
    [flagMode, revealCell, toggleFlag]
  );

  const handleContextMenu = useCallback(
    (e: React.MouseEvent, r: number, c: number) => {
      e.preventDefault();
      toggleFlag(r, c);
    },
    [toggleFlag]
  );

  const handleTouchStart = useCallback(
    (r: number, c: number) => {
      if (flagMode) return; // In flag mode, normal tap handles it
      longPressTimerRef.current = setTimeout(() => {
        toggleFlag(r, c);
        longPressTimerRef.current = null;
      }, 500);
    },
    [flagMode, toggleFlag]
  );

  const handleTouchEnd = useCallback(() => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  }, []);

  const handleNewGame = useCallback(() => {
    setBoard(createEmptyBoard(rows, cols));
    setPhase("playing");
    setFirstClick(true);
    setFlagMode(false);
    setSelectedCell(null);
    setElapsedSeconds(0);
    setTimerStarted(false);
  }, [rows, cols]);

  // ─── Keyboard Navigation ──────────────────────────────────────────────────

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (phase !== "playing") return;

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          setSelectedCell((prev) => {
            if (!prev) return { row: 0, col: 0 };
            return { row: Math.max(0, prev.row - 1), col: prev.col };
          });
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelectedCell((prev) => {
            if (!prev) return { row: 0, col: 0 };
            return { row: Math.min(rows - 1, prev.row + 1), col: prev.col };
          });
          break;
        case "ArrowLeft":
          e.preventDefault();
          setSelectedCell((prev) => {
            if (!prev) return { row: 0, col: 0 };
            return { row: prev.row, col: Math.max(0, prev.col - 1) };
          });
          break;
        case "ArrowRight":
          e.preventDefault();
          setSelectedCell((prev) => {
            if (!prev) return { row: 0, col: 0 };
            return { row: prev.row, col: Math.min(cols - 1, prev.col + 1) };
          });
          break;
        case " ":
        case "Enter":
          e.preventDefault();
          if (selectedCell) revealCell(selectedCell.row, selectedCell.col);
          break;
        case "f":
        case "F":
          e.preventDefault();
          if (selectedCell) toggleFlag(selectedCell.row, selectedCell.col);
          break;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [phase, rows, cols, selectedCell, revealCell, toggleFlag]);

  // ─── Completion Screens ────────────────────────────────────────────────────

  if (phase === "won" || phase === "lost") {
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
            {phase === "won" ? "You Win!" : "Game Over"}
          </h2>
          <p className="mb-1 text-lg text-text-muted">
            {phase === "won"
              ? "You cleared the minefield!"
              : "You hit a mine!"}
          </p>
          <p className={`mb-2 inline-block rounded-full px-3 py-1 text-sm font-bold ${
            difficulty === "easy"
              ? "bg-success/15 text-success"
              : difficulty === "medium"
                ? "bg-secondary-light/20 text-secondary-dark"
                : "bg-error/15 text-error"
          }`}>
            {config.label}
          </p>
          <p className="mb-6 text-base text-text-muted">
            Time: {formatTime(elapsedSeconds)}
          </p>
          {phase === "won" && <StarRating />}
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={handleNewGame}
              className="btn-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
            >
              Play Again
            </button>
            <button
              onClick={onChangeDifficulty}
              className="cursor-pointer text-sm font-bold text-primary transition-colors hover:text-primary-dark"
            >
              Change Difficulty
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Playing Render ────────────────────────────────────────────────────────

  // Calculate cell size based on grid dimensions
  const cellSize = difficulty === "hard" ? "min(calc((100vw - 48px) / 16), 32px)" : difficulty === "medium" ? "min(calc((100vw - 48px) / 12), 38px)" : "min(calc((100vw - 48px) / 9), 42px)";

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
          <p className="text-sm text-text-muted">
            Find all safe cells without hitting a mine
          </p>
        </div>
        <span className={`rounded-full px-3 py-1 text-sm font-bold ${
          difficulty === "easy"
            ? "bg-success/15 text-success"
            : difficulty === "medium"
              ? "bg-secondary-light/20 text-secondary-dark"
              : "bg-error/15 text-error"
        }`}>
          {config.label}
        </span>
      </div>

      {/* Stats bar */}
      <div className="mb-4 flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-2">
        <div className="flex items-center gap-1.5 text-base font-bold text-error">
          <span aria-label="Mines remaining" role="img">💣</span>
          <span>{mines - flagCount}</span>
        </div>
        <div className="text-base font-bold text-text-muted tabular-nums">
          {formatTime(elapsedSeconds)}
        </div>
        <button
          onClick={handleNewGame}
          className="cursor-pointer rounded-lg border border-border bg-background px-3 py-1 text-sm font-bold text-text-muted transition-colors hover:bg-surface"
        >
          New Game
        </button>
      </div>

      {/* Grid */}
      <div className="mb-4 flex justify-center overflow-x-auto">
        <div
          role="grid"
          aria-label="Minesweeper grid"
          className="inline-grid border-2 border-primary-dark"
          style={{
            gridTemplateColumns: `repeat(${cols}, ${cellSize})`,
            gridTemplateRows: `repeat(${rows}, ${cellSize})`,
          }}
        >
          {board.flat().map((cell, idx) => {
            const r = Math.floor(idx / cols);
            const c = idx % cols;
            const isSelected = selectedCell?.row === r && selectedCell?.col === c;

            let bgClass = "bg-primary-50/60";
            let content: React.ReactNode = null;

            if (cell.revealed) {
              if (cell.hasMine) {
                bgClass = "bg-error/20";
                content = <span className="text-base leading-none">💣</span>;
              } else {
                bgClass = "bg-surface";
                if (cell.adjacentMines > 0) {
                  content = (
                    <span
                      className="text-sm font-bold leading-none sm:text-base"
                      style={{ color: NUMBER_COLORS[cell.adjacentMines] || "#1e293b" }}
                    >
                      {cell.adjacentMines}
                    </span>
                  );
                }
              }
            } else if (cell.flagged) {
              content = <span className="text-base leading-none">🚩</span>;
            }

            return (
              <div
                key={`${r},${c}`}
                role="gridcell"
                tabIndex={isSelected ? 0 : -1}
                aria-label={`Row ${r + 1}, Column ${c + 1}${cell.revealed ? (cell.hasMine ? ", mine" : cell.adjacentMines > 0 ? `, ${cell.adjacentMines} adjacent mines` : ", empty") : cell.flagged ? ", flagged" : ", hidden"}`}
                className={`flex cursor-pointer items-center justify-center border-r border-b border-border select-none transition-colors duration-75 ${bgClass} ${
                  isSelected ? "ring-2 ring-inset ring-primary" : ""
                } ${!cell.revealed && !cell.flagged ? "hover:bg-primary-100/60" : ""}`}
                onClick={() => handleCellClick(r, c)}
                onContextMenu={(e) => handleContextMenu(e, r, c)}
                onTouchStart={() => handleTouchStart(r, c)}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={handleTouchEnd}
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>

      {/* Flag mode toggle (primarily for mobile) */}
      <div className="flex justify-center gap-3">
        <button
          onClick={() => setFlagMode((f) => !f)}
          className={`cursor-pointer rounded-xl border-2 px-5 py-2.5 text-sm font-bold transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-primary/20 ${
            flagMode
              ? "border-primary bg-primary-50 text-primary"
              : "border-border bg-surface text-text-muted hover:bg-background"
          }`}
        >
          🚩 Flag Mode {flagMode ? "ON" : "OFF"}
        </button>
      </div>

      {/* Help text */}
      <p className="mt-4 text-center text-sm text-text-muted">
        <span className="hidden sm:inline">Left-click to reveal, right-click to flag. </span>
        <span className="sm:hidden">Tap to reveal, use flag mode or long-press to flag. </span>
        Arrow keys + Space/Enter to navigate, F to flag.
      </p>
    </div>
  );
}
