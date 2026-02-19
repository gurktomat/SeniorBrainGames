interface SudokuPuzzle {
  id: string;
  title: string;
  difficulty: string;
  grid: number[][];
  solution: number[][];
}

function SudokuGrid({ grid, showAll }: { grid: number[][]; showAll?: boolean }) {
  return (
    <div className="inline-block border-[3px] border-black">
      {grid.map((row, r) => (
        <div key={r} className="flex">
          {row.map((val, c) => {
            const isGiven = grid[r][c] !== 0;
            const borderR = c < 8 && (c + 1) % 3 === 0 ? "border-r-[3px] border-r-black" : "border-r border-r-gray-400";
            const borderB = r < 8 && (r + 1) % 3 === 0 ? "border-b-[3px] border-b-black" : "border-b border-b-gray-400";
            return (
              <div
                key={c}
                className={`flex items-center justify-center text-lg ${borderR} ${borderB}`}
                style={{ width: 40, height: 40 }}
              >
                {showAll ? (
                  <span className="font-bold">{val}</span>
                ) : isGiven ? (
                  <span className="font-bold">{val}</span>
                ) : null}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default function PrintableSudoku({ puzzle, showAnswers }: { puzzle: SudokuPuzzle; showAnswers?: boolean }) {
  return (
    <>
      {/* Puzzle */}
      <div className="print-no-break">
        <h2
          className="mb-4 text-2xl font-bold text-primary"
          style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
        >
          {puzzle.title}
        </h2>
        <p className="mb-6 text-text-muted">
          Fill the grid so every row, column, and 3&times;3 box contains the numbers 1&ndash;9.
          Difficulty: <span className="font-semibold capitalize">{puzzle.difficulty}</span>
        </p>

        <SudokuGrid grid={puzzle.grid} />
      </div>

      {/* Page break + Answer Key */}
      {showAnswers !== false && (
        <>
          <div className="print-page-break" />
          <div className="print-no-break">
            <h2
              className="mb-4 text-2xl font-bold text-primary"
              style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
            >
              Answer Key &mdash; {puzzle.title}
            </h2>

            <SudokuGrid grid={puzzle.solution} showAll />
          </div>
        </>
      )}
    </>
  );
}
