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
  
  // Basic validation to prevent infinite loops
  if (
    typeof word.startRow !== "number" ||
    typeof word.startCol !== "number" ||
    typeof word.endRow !== "number" ||
    typeof word.endCol !== "number"
  ) {
    return cells;
  }

  const dr = Math.sign(word.endRow - word.startRow);
  const dc = Math.sign(word.endCol - word.startCol);
  
  // If both are 0, it's just a single cell or invalid
  if (dr === 0 && dc === 0) {
    cells.add(`${word.startRow},${word.startCol}`);
    return cells;
  }

  // Safety check for NaN which could cause infinite loops
  if (isNaN(dr) || isNaN(dc)) {
    return cells;
  }

  let r = word.startRow;
  let c = word.startCol;
  
  // Limit iterations to prevent any unforeseen infinite loops
  let safetyCounter = 0;
  const maxIterations = 100; // Word searches are usually small

  while (
    (r !== word.endRow + dr || c !== word.endCol + dc) && 
    safetyCounter < maxIterations
  ) {
    cells.add(`${r},${c}`);
    r += dr;
    c += dc;
    safetyCounter++;
  }
  return cells;
}

export default function PrintableWordSearch({ puzzle, showAnswers }: { puzzle: WordSearchPuzzle; showAnswers?: boolean }) {
  const allWordCells = new Set<string>();
  for (const w of puzzle.words) {
    for (const key of getWordCells(w)) {
      allWordCells.add(key);
    }
  }

  return (
    <>
      {/* Puzzle Section */}
      <div className="mb-12">
        <div className="mb-8 rounded-lg bg-gray-50 border border-gray-300 p-4 print:bg-transparent print:border-black">
          <p className="text-base font-medium italic text-black">
            <span className="font-bold not-italic">Instructions:</span> Find all {puzzle.words.length} hidden words in the grid. Words can go across or down.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Grid */}
          <div className="inline-block rounded-xl border-4 border-black p-4 bg-white" style={{ fontFamily: "monospace" }}>
            {puzzle.grid.map((row, r) => (
              <div key={r} className="flex">
                {row.split("").map((ch, c) => (
                  <span
                    key={c}
                    className="inline-flex items-center justify-center text-xl font-bold text-black"
                    style={{ width: 36, height: 36 }}
                  >
                    {ch}
                  </span>
                ))}
              </div>
            ))}
          </div>

          {/* Word list */}
          <div className="flex-1 min-w-[200px]">
            <h3 className="text-xl font-bold border-b-2 border-black pb-2 mb-4 uppercase tracking-widest text-black">Word List</h3>
            <div className="flex flex-col flex-wrap gap-x-6 gap-y-3 text-lg font-medium text-black max-h-[400px]">
              {puzzle.words.map((w) => (
                <div key={w.word} className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded border-2 border-black flex-shrink-0" />
                  <span className="uppercase tracking-widest">{w.word}</span>
                </div>
              ))}
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

            <div className="inline-block rounded-xl border-4 border-black p-4 bg-white" style={{ fontFamily: "monospace" }}>
              {puzzle.grid.map((row, r) => (
                <div key={r} className="flex">
                  {row.split("").map((ch, c) => {
                    const isWord = allWordCells.has(`${r},${c}`);
                    return (
                      <span
                        key={c}
                        className={`inline-flex items-center justify-center text-xl ${
                          isWord ? "font-black text-black bg-gray-200 print:bg-gray-300" : "font-normal text-gray-400"
                        }`}
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: isWord ? '4px' : '0'
                        }}
                      >
                        {ch}
                      </span>
                    );
                  })}
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold uppercase tracking-widest text-black">
              {puzzle.words.map((w) => (
                <span key={w.word}>{w.word}</span>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
