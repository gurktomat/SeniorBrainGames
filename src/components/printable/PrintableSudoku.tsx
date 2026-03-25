interface SudokuPuzzle {
  id: string;
  title: string;
  difficulty: string;
  grid: number[][];
  solution: number[][];
}

function SudokuGrid({ grid, solution, showAll }: { grid: number[][]; solution: number[][]; showAll?: boolean }) {
  return (
    <div className="inline-block border-[4px] border-black bg-white shadow-sm print:shadow-none">
      {grid.map((row, r) => (
        <div key={r} className="flex">
          {row.map((val, c) => {
            const isGiven = grid[r][c] !== 0;
            const borderR = c < 8 && (c + 1) % 3 === 0 ? "border-r-[4px] border-r-black" : "border-r border-r-gray-400 print:border-r-black";
            const borderB = r < 8 && (r + 1) % 3 === 0 ? "border-b-[4px] border-b-black" : "border-b border-b-gray-400 print:border-b-black";
            
            let displayVal = "";
            let textStyle = "text-black";
            
            if (showAll) {
               displayVal = solution[r][c].toString();
               textStyle = isGiven ? "font-black text-black" : "font-semibold text-gray-500 print:text-gray-700";
            } else if (isGiven) {
               displayVal = val.toString();
               textStyle = "font-black text-black";
            }

            return (
              <div
                key={c}
                className={`flex items-center justify-center text-2xl ${borderR} ${borderB} ${textStyle}`}
                style={{ width: 48, height: 48 }}
              >
                {displayVal}
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
      {/* Puzzle Section */}
      <div className="mb-12">
        <div className="mb-8 rounded-lg bg-gray-50 border border-gray-300 p-4 print:bg-transparent print:border-black flex justify-between items-center">
          <p className="text-base font-medium italic text-black">
            <span className="font-bold not-italic">Instructions:</span> Fill the grid so every row, column, and 3&times;3 box contains the numbers 1&ndash;9.
          </p>
          <div className="text-sm font-bold uppercase tracking-widest border-2 border-black px-3 py-1 rounded">
            Level: {puzzle.difficulty}
          </div>
        </div>

        <div className="flex justify-center">
          <SudokuGrid grid={puzzle.grid} solution={puzzle.solution} />
        </div>
      </div>

      {/* Answer Key */}
      {showAnswers !== false && (
        <>
          <div className="print-page-break" />
          <div className="mt-12 border-t-4 border-black pt-8">
            <h2
              className="mb-6 text-2xl font-black text-black"
              style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
            >
              Answer Key
            </h2>

            <div className="flex justify-center">
              <SudokuGrid grid={puzzle.grid} solution={puzzle.solution} showAll />
            </div>
          </div>
        </>
      )}
    </>
  );
}
