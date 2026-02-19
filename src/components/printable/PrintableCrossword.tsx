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

export default function PrintableCrossword({ puzzle }: { puzzle: CrosswordPuzzle }) {
  const { cells } = initializeGrid(puzzle);
  const acrossClues = puzzle.clues.filter((c) => c.direction === "across");
  const downClues = puzzle.clues.filter((c) => c.direction === "down");

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
          Fill in the grid using the Across and Down clues below.
        </p>

        {/* Grid */}
        <div className="mb-8 inline-block border-2 border-black">
          {cells.map((row, r) => (
            <div key={r} className="flex">
              {row.map((cell, c) => (
                <div
                  key={c}
                  className="relative flex items-center justify-center border border-gray-400"
                  style={{
                    width: 38,
                    height: 38,
                    background: cell.isBlack ? "#000" : "#fff",
                  }}
                >
                  {cell.number && (
                    <span className="absolute left-0.5 top-0 text-[9px] font-bold leading-none">
                      {cell.number}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Clues */}
        <div className="grid grid-cols-2 gap-8 text-base">
          <div>
            <h3 className="mb-2 text-lg font-bold">Across</h3>
            <ol className="space-y-1">
              {acrossClues.map((c) => (
                <li key={c.number}>
                  <span className="font-semibold">{c.number}.</span> {c.clue}
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-bold">Down</h3>
            <ol className="space-y-1">
              {downClues.map((c) => (
                <li key={c.number}>
                  <span className="font-semibold">{c.number}.</span> {c.clue}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Page break + Answer Key */}
      <div className="print-page-break" />
      <div className="print-no-break">
        <h2
          className="mb-4 text-2xl font-bold text-primary"
          style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
        >
          Answer Key &mdash; {puzzle.title}
        </h2>

        <div className="inline-block border-2 border-black">
          {cells.map((row, r) => (
            <div key={r} className="flex">
              {row.map((cell, c) => (
                <div
                  key={c}
                  className="relative flex items-center justify-center border border-gray-400"
                  style={{
                    width: 38,
                    height: 38,
                    background: cell.isBlack ? "#000" : "#fff",
                  }}
                >
                  {cell.number && (
                    <span className="absolute left-0.5 top-0 text-[9px] font-bold leading-none">
                      {cell.number}
                    </span>
                  )}
                  {!cell.isBlack && (
                    <span className="text-base font-bold">{cell.solution}</span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
