import { initializeGrid } from "@/lib/crosswordUtils";

interface CrosswordClue {
  number: number;
  direction: "across" | "down";
  clue: string;
}

interface CrosswordPuzzle {
  id: string;
  title: string;
  rows: number;
  cols: number;
  grid: string[];
  clues: CrosswordClue[];
}

export default function PrintableCrossword({ puzzle, showAnswers }: { puzzle: CrosswordPuzzle; showAnswers?: boolean }) {
  const { cells } = initializeGrid(puzzle);
  const acrossClues = puzzle.clues.filter((c) => c.direction === "across");
  const downClues = puzzle.clues.filter((c) => c.direction === "down");

  return (
    <>
      {/* Puzzle Section */}
      <div className="mb-12">
        <div className="mb-8 rounded-lg bg-gray-50 border border-gray-300 p-4 print:bg-transparent print:border-black">
          <p className="text-base font-medium italic text-black">
            <span className="font-bold not-italic">Instructions:</span> Fill in the grid using the Across and Down clues below.
          </p>
        </div>

        <div className="flex flex-col xl:flex-row gap-10">
          {/* Grid */}
          <div className="inline-block border-2 border-black self-start bg-white shadow-sm print:shadow-none">
            {cells.map((row, r) => (
              <div key={r} className="flex">
                {row.map((cell, c) => (
                  <div
                    key={c}
                    className="relative flex items-center justify-center border border-black"
                    style={{
                      width: 40,
                      height: 40,
                      background: cell.isBlack ? "#000" : "#fff",
                    }}
                  >
                    {cell.number && (
                      <span className="absolute left-1 top-0.5 text-[10px] font-bold leading-none text-black">
                        {cell.number}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Clues */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm text-black">
            <div>
              <h3 className="mb-3 text-lg font-black uppercase tracking-widest border-b-2 border-black pb-1">Across</h3>
              <ol className="space-y-2">
                {acrossClues.map((c) => (
                  <li key={c.number} className="flex gap-2">
                    <span className="font-bold min-w-[20px] text-right">{c.number}.</span>
                    <span>{c.clue}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h3 className="mb-3 text-lg font-black uppercase tracking-widest border-b-2 border-black pb-1">Down</h3>
              <ol className="space-y-2">
                {downClues.map((c) => (
                  <li key={c.number} className="flex gap-2">
                    <span className="font-bold min-w-[20px] text-right">{c.number}.</span>
                    <span>{c.clue}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
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

            <div className="inline-block border-2 border-black bg-white">
              {cells.map((row, r) => (
                <div key={r} className="flex">
                  {row.map((cell, c) => (
                    <div
                      key={c}
                      className="relative flex items-center justify-center border border-black"
                      style={{
                        width: 40,
                        height: 40,
                        background: cell.isBlack ? "#000" : "#fff",
                      }}
                    >
                      {cell.number && (
                        <span className="absolute left-1 top-0.5 text-[10px] font-bold leading-none text-black">
                          {cell.number}
                        </span>
                      )}
                      {!cell.isBlack && (
                        <span className="text-lg font-bold text-black uppercase">{cell.solution}</span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
