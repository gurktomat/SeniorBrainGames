"use client";

import { useState, useCallback, useMemo } from "react";
import StarRating from "./StarRating";

// ─── Types ───────────────────────────────────────────────────────────────────

interface SlidingPuzzleData {
  id: string;
  title: string;
  description: string;
  size: number;
  tiles: number[];
}

// ─── Utility Functions ───────────────────────────────────────────────────────

function countInversions(tiles: number[]): number {
  let inversions = 0;
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i] === 0) continue;
    for (let j = i + 1; j < tiles.length; j++) {
      if (tiles[j] === 0) continue;
      if (tiles[i] > tiles[j]) inversions++;
    }
  }
  return inversions;
}

function isSolvable(tiles: number[], size: number): boolean {
  const inversions = countInversions(tiles);

  if (size % 2 === 1) {
    // Odd-size grid: solvable if inversions count is even
    return inversions % 2 === 0;
  } else {
    // Even-size grid: find row of blank from bottom (1-indexed)
    const blankIndex = tiles.indexOf(0);
    const blankRow = Math.floor(blankIndex / size);
    const blankRowFromBottom = size - blankRow;
    return (inversions + blankRowFromBottom) % 2 === 0;
  }
}

function isComplete(tiles: number[]): boolean {
  const n = tiles.length;
  for (let i = 0; i < n - 1; i++) {
    if (tiles[i] !== i + 1) return false;
  }
  return tiles[n - 1] === 0;
}

function getAdjacentToEmpty(tiles: number[], size: number): number[] {
  const emptyIndex = tiles.indexOf(0);
  const emptyRow = Math.floor(emptyIndex / size);
  const emptyCol = emptyIndex % size;
  const adjacent: number[] = [];

  // Up
  if (emptyRow > 0) adjacent.push((emptyRow - 1) * size + emptyCol);
  // Down
  if (emptyRow < size - 1) adjacent.push((emptyRow + 1) * size + emptyCol);
  // Left
  if (emptyCol > 0) adjacent.push(emptyRow * size + (emptyCol - 1));
  // Right
  if (emptyCol < size - 1) adjacent.push(emptyRow * size + (emptyCol + 1));

  return adjacent;
}

function shuffleTiles(size: number): number[] {
  const n = size * size;
  let tiles: number[];

  do {
    tiles = Array.from({ length: n }, (_, i) => i + 1);
    tiles[n - 1] = 0;

    // Fisher-Yates shuffle
    for (let i = tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
  } while (!isSolvable(tiles, size) || isComplete(tiles));

  return tiles;
}

// ─── Main Engine ─────────────────────────────────────────────────────────────

export default function SlidingPuzzleEngine({
  title,
  puzzles,
}: {
  title: string;
  puzzles: SlidingPuzzleData[];
}) {
  const [puzzleIndex, setPuzzleIndex] = useState(0);

  return (
    <SlidingPuzzleView
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

// ─── Puzzle View ─────────────────────────────────────────────────────────────

function SlidingPuzzleView({
  title,
  puzzle,
  puzzleIndex,
  totalPuzzles,
  onNextPuzzle,
  onRestart,
}: {
  title: string;
  puzzle: SlidingPuzzleData;
  puzzleIndex: number;
  totalPuzzles: number;
  onNextPuzzle: () => void;
  onRestart: () => void;
}) {
  const [tiles, setTiles] = useState<number[]>([...puzzle.tiles]);
  const [moves, setMoves] = useState(0);
  const [phase, setPhase] = useState<"playing" | "complete">("playing");

  const adjacentIndices = useMemo(
    () => new Set(getAdjacentToEmpty(tiles, puzzle.size)),
    [tiles, puzzle.size],
  );

  const goalPositions = useMemo(() => {
    // Map: tile number -> goal index
    const map = new Map<number, number>();
    const n = puzzle.size * puzzle.size;
    for (let i = 0; i < n - 1; i++) {
      map.set(i + 1, i);
    }
    map.set(0, n - 1);
    return map;
  }, [puzzle.size]);

  const handleTileClick = useCallback(
    (clickedIndex: number) => {
      if (phase !== "playing") return;
      if (!adjacentIndices.has(clickedIndex)) return;

      const emptyIndex = tiles.indexOf(0);
      const newTiles = [...tiles];
      [newTiles[clickedIndex], newTiles[emptyIndex]] = [
        newTiles[emptyIndex],
        newTiles[clickedIndex],
      ];

      setTiles(newTiles);
      setMoves((m) => m + 1);

      if (isComplete(newTiles)) {
        setTimeout(() => setPhase("complete"), 300);
      }
    },
    [phase, tiles, adjacentIndices],
  );

  const handleShuffle = useCallback(() => {
    const newTiles = shuffleTiles(puzzle.size);
    setTiles(newTiles);
    setMoves(0);
    setPhase("playing");
  }, [puzzle.size]);

  // ─── Completion Screen ───────────────────────────────────────────────────

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
          <p className="mb-2 text-lg text-text-muted">{puzzle.title}</p>
          <p className="mb-6 text-base text-text-muted">
            Solved in{" "}
            <span className="font-bold text-primary">{moves}</span>{" "}
            move{moves !== 1 ? "s" : ""}
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

  // ─── Tile size calculation ────────────────────────────────────────────────

  // Responsive tile size: ~72px on desktop, smaller for larger grids
  const tileSize = puzzle.size === 3 ? 80 : 68;
  const gapSize = 4;
  const containerSize = puzzle.size * tileSize + (puzzle.size - 1) * gapSize;

  // ─── Render ─────────────────────────────────────────────────────────────

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
        <span
          className="rounded-full px-4 py-1.5 text-sm font-bold text-white"
          style={{ background: "var(--gradient-primary)" }}
        >
          {puzzleIndex + 1} / {totalPuzzles}
        </span>
      </div>

      {/* Move counter & description */}
      <div className="mb-4 flex items-center justify-between rounded-xl border border-primary-200 bg-primary-50 px-4 py-3">
        <p className="text-base font-semibold text-primary">
          {puzzle.description}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-text-muted">Moves:</span>
          <span
            className="inline-flex min-w-[2.5rem] items-center justify-center rounded-lg bg-primary px-2 py-1 text-lg font-bold text-white"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {moves}
          </span>
        </div>
      </div>

      {/* Puzzle grid area */}
      <div className="mb-6 flex justify-center">
        <div
          className="relative"
          style={{
            width: `${containerSize}px`,
            height: `${containerSize}px`,
          }}
        >
          {tiles.map((tile, index) => {
            if (tile === 0) return null;

            const row = Math.floor(index / puzzle.size);
            const col = index % puzzle.size;
            const left = col * (tileSize + gapSize);
            const top = row * (tileSize + gapSize);

            const isAdjacent = adjacentIndices.has(index);
            const isInCorrectPosition = goalPositions.get(tile) === index;

            return (
              <button
                key={tile}
                onClick={() => handleTileClick(index)}
                disabled={!isAdjacent}
                className={`absolute flex items-center justify-center rounded-xl font-bold shadow-md transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary/20 ${
                  isAdjacent
                    ? "cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                    : "cursor-default"
                } ${
                  isInCorrectPosition
                    ? "bg-primary/80 text-white"
                    : "bg-primary text-white"
                }`}
                style={{
                  width: `${tileSize}px`,
                  height: `${tileSize}px`,
                  left: `${left}px`,
                  top: `${top}px`,
                  fontSize:
                    puzzle.size === 3 ? "1.75rem" : "1.5rem",
                }}
                aria-label={`Tile ${tile}${isAdjacent ? ", click to slide" : ""}`}
              >
                {tile}
              </button>
            );
          })}
        </div>
      </div>

      {/* Shuffle button */}
      <div className="flex justify-center">
        <button
          onClick={handleShuffle}
          className="cursor-pointer rounded-xl border-2 border-secondary bg-surface px-6 py-2.5 text-base font-bold text-secondary-dark transition-colors duration-200 hover:bg-secondary-light/10 focus:outline-none focus:ring-4 focus:ring-secondary/20"
        >
          Shuffle
        </button>
      </div>
    </div>
  );
}
