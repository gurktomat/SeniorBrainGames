interface WordSearchWord {
  word: string;
  startRow: number;
  startCol: number;
  endRow: number;
  endCol: number;
}

interface WordSearchPuzzle {
  id: string;
  title: string;
  grid: string[];
  words: WordSearchWord[];
}

function getWordCells(word: WordSearchWord): Set<string> {
  const cells = new Set<string>();
  const dr = Math.sign(word.endRow - word.startRow);
  const dc = Math.sign(word.endCol - word.startCol);
  let r = word.startRow;
  let c = word.startCol;
  while (r !== word.endRow + dr || c !== word.endCol + dc) {
    cells.add(`${r},${c}`);
    r += dr;
    c += dc;
  }
  return cells;
}

export default function PrintableWordSearch({ puzzle }: { puzzle: WordSearchPuzzle }) {
  const allWordCells = new Set<string>();
  for (const w of puzzle.words) {
    for (const key of getWordCells(w)) {
      allWordCells.add(key);
    }
  }

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
          Find all {puzzle.words.length} hidden words in the grid. Words can go across or down.
        </p>

        {/* Grid */}
        <div className="mb-6 inline-block rounded border border-gray-300 p-2" style={{ fontFamily: "monospace" }}>
          {puzzle.grid.map((row, r) => (
            <div key={r} className="flex">
              {row.split("").map((ch, c) => (
                <span
                  key={c}
                  className="inline-flex items-center justify-center text-lg font-medium"
                  style={{ width: 32, height: 32 }}
                >
                  {ch}
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* Word list */}
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-base font-medium">
          {puzzle.words.map((w) => (
            <span key={w.word}>{w.word}</span>
          ))}
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

        <div className="inline-block rounded border border-gray-300 p-2" style={{ fontFamily: "monospace" }}>
          {puzzle.grid.map((row, r) => (
            <div key={r} className="flex">
              {row.split("").map((ch, c) => (
                <span
                  key={c}
                  className="inline-flex items-center justify-center text-lg"
                  style={{
                    width: 32,
                    height: 32,
                    fontWeight: allWordCells.has(`${r},${c}`) ? 800 : 300,
                    opacity: allWordCells.has(`${r},${c}`) ? 1 : 0.35,
                  }}
                >
                  {ch}
                </span>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-base font-bold">
          {puzzle.words.map((w) => (
            <span key={w.word}>{w.word}</span>
          ))}
        </div>
      </div>
    </>
  );
}
