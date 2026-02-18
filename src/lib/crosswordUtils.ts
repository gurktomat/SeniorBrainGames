import type { CrosswordDirection, CrosswordClue } from "./types";

interface CrosswordGridInput {
  rows: number;
  cols: number;
  grid: string[];
  clues: CrosswordClue[];
}

export interface CellState {
  row: number;
  col: number;
  solution: string;
  letter: string;
  isBlack: boolean;
  number: number | null;
  validation: "none" | "correct" | "wrong";
  revealed: boolean;
}

export interface WordInfo {
  number: number;
  direction: CrosswordDirection;
  cells: { row: number; col: number }[];
}

function isWhite(grid: string[], row: number, col: number, rows: number, cols: number): boolean {
  if (row < 0 || row >= rows || col < 0 || col >= cols) return false;
  return grid[row][col] !== "#";
}

export function initializeGrid(puzzle: CrosswordGridInput): {
  cells: CellState[][];
  words: WordInfo[];
} {
  const { rows, cols, grid, clues } = puzzle;
  let clueNumber = 0;
  const cells: CellState[][] = [];
  const words: WordInfo[] = [];

  // First pass: create cells and assign numbers
  const numberMap: Record<string, number> = {};

  for (let r = 0; r < rows; r++) {
    const row: CellState[] = [];
    for (let c = 0; c < cols; c++) {
      const ch = grid[r][c];
      const black = ch === "#";
      let num: number | null = null;

      if (!black) {
        const startsAcross = !isWhite(grid, r, c - 1, rows, cols) && isWhite(grid, r, c + 1, rows, cols);
        const startsDown = !isWhite(grid, r - 1, c, rows, cols) && isWhite(grid, r + 1, c, rows, cols);

        if (startsAcross || startsDown) {
          clueNumber++;
          num = clueNumber;
          numberMap[`${r},${c}`] = clueNumber;
        }
      }

      row.push({
        row: r,
        col: c,
        solution: black ? "#" : ch.toUpperCase(),
        letter: "",
        isBlack: black,
        number: num,
        validation: "none",
        revealed: false,
      });
    }
    cells.push(row);
  }

  // Second pass: build words from clues
  for (const clue of clues) {
    // Find the cell with this clue number
    let startRow = -1;
    let startCol = -1;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (cells[r][c].number === clue.number) {
          startRow = r;
          startCol = c;
          break;
        }
      }
      if (startRow >= 0) break;
    }

    if (startRow < 0) continue;

    const wordCells: { row: number; col: number }[] = [];
    if (clue.direction === "across") {
      for (let c = startCol; c < cols && !cells[startRow][c].isBlack; c++) {
        wordCells.push({ row: startRow, col: c });
      }
    } else {
      for (let r = startRow; r < rows && !cells[r][startCol].isBlack; r++) {
        wordCells.push({ row: r, col: startCol });
      }
    }

    words.push({ number: clue.number, direction: clue.direction, cells: wordCells });
  }

  return { cells, words };
}

export function findCurrentWord(
  words: WordInfo[],
  row: number,
  col: number,
  direction: CrosswordDirection,
): WordInfo | null {
  // Try preferred direction first
  const match = words.find(
    (w) => w.direction === direction && w.cells.some((c) => c.row === row && c.col === col),
  );
  if (match) return match;
  // Fall back to other direction
  const alt = direction === "across" ? "down" : "across";
  return words.find(
    (w) => w.direction === alt && w.cells.some((c) => c.row === row && c.col === col),
  ) ?? null;
}

export function getNextCell(
  row: number,
  col: number,
  direction: CrosswordDirection,
  cells: CellState[][],
): { row: number; col: number } | null {
  const nr = direction === "down" ? row + 1 : row;
  const nc = direction === "across" ? col + 1 : col;
  if (nr >= cells.length || nc >= cells[0].length) return null;
  if (cells[nr][nc].isBlack) return null;
  return { row: nr, col: nc };
}

export function getPreviousCell(
  row: number,
  col: number,
  direction: CrosswordDirection,
  cells: CellState[][],
): { row: number; col: number } | null {
  const nr = direction === "down" ? row - 1 : row;
  const nc = direction === "across" ? col - 1 : col;
  if (nr < 0 || nc < 0) return null;
  if (cells[nr][nc].isBlack) return null;
  return { row: nr, col: nc };
}

export function getNextCellArrow(
  row: number,
  col: number,
  arrowKey: "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight",
  cells: CellState[][],
): { row: number; col: number } | null {
  const deltas: Record<string, [number, number]> = {
    ArrowUp: [-1, 0],
    ArrowDown: [1, 0],
    ArrowLeft: [0, -1],
    ArrowRight: [0, 1],
  };
  const [dr, dc] = deltas[arrowKey];
  let nr = row + dr;
  let nc = col + dc;

  while (nr >= 0 && nr < cells.length && nc >= 0 && nc < cells[0].length) {
    if (!cells[nr][nc].isBlack) return { row: nr, col: nc };
    nr += dr;
    nc += dc;
  }
  return null;
}

export function checkAllCorrect(cells: CellState[][]): boolean {
  for (const row of cells) {
    for (const cell of row) {
      if (!cell.isBlack && cell.letter !== cell.solution) return false;
    }
  }
  return true;
}
