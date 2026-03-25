interface WordLadderPuzzle {
  id: string;
  title: string;
  startWord: string;
  endWord: string;
  solution: string[];
  hint: string;
}

export default function PrintableWordLadder({
  puzzles,
  showAnswers,
}: {
  title?: string;
  puzzles: WordLadderPuzzle[];
  showAnswers?: boolean;
}) {
  return (
    <>
      {/* Puzzle Section */}
      <div className="mb-12">
        <div className="mb-8 rounded-lg bg-gray-50 border border-gray-300 p-4 print:bg-transparent print:border-black">
          <p className="text-base font-medium italic text-black">
            <span className="font-bold not-italic">Instructions:</span> Change one letter at a time to get from the start word to the end word. Each step must be a real word.
          </p>
        </div>

        <ol className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 text-base text-black">
          {puzzles.map((p, i) => {
            const blanks = p.solution.length - 2; // minus start and end
            return (
              <li key={p.id} className="print-no-break flex flex-col">
                <div className="flex gap-2 mb-3">
                  <span className="font-bold text-black">{i + 1}.</span>
                  <div>
                    <p className="font-semibold leading-snug">{p.title}</p>
                    <p className="text-xs italic text-gray-600 print:text-black mt-1">Hint: {p.hint}</p>
                  </div>
                </div>
                <div className="ml-6 flex flex-col items-center gap-3 bg-gray-50 print:bg-transparent p-4 rounded border border-gray-200 print:border-black">
                  <span
                    className="text-lg font-black tracking-[0.2em] uppercase"
                    style={{ fontFamily: "monospace" }}
                  >
                    {p.startWord}
                  </span>
                  {Array.from({ length: blanks }).map((_, j) => (
                    <div
                      key={j}
                      className="border-b-2 border-black w-24 h-6"
                    />
                  ))}
                  <span
                    className="text-lg font-black tracking-[0.2em] uppercase"
                    style={{ fontFamily: "monospace" }}
                  >
                    {p.endWord}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
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

            <ol className="grid gap-x-8 gap-y-6 sm:grid-cols-2 md:grid-cols-3 text-sm text-black">
              {puzzles.map((p, i) => (
                <li key={p.id} className="print-no-break border border-gray-200 p-3 rounded print:border-black">
                  <div className="font-bold mb-1">Q{i + 1}: {p.title}</div>
                  <div className="flex flex-col items-center py-2">
                    {p.solution.map((step, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <span className="font-mono font-bold uppercase tracking-widest">{step}</span>
                        {idx < p.solution.length - 1 && (
                          <span className="text-gray-400 my-0.5">↓</span>
                        )}
                      </div>
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </>
      )}
    </>
  );
}
