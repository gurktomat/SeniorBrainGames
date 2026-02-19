interface WordLadderPuzzle {
  id: string;
  title: string;
  startWord: string;
  endWord: string;
  solution: string[];
  hint: string;
}

export default function PrintableWordLadder({
  title,
  puzzles,
}: {
  title: string;
  puzzles: WordLadderPuzzle[];
}) {
  return (
    <>
      {/* Puzzle */}
      <div className="print-no-break">
        <h2
          className="mb-4 text-2xl font-bold text-primary"
          style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
        >
          {title}
        </h2>
        <p className="mb-6 text-text-muted">
          Change one letter at a time to get from the start word to the end word.
          Each step must be a real word.
        </p>

        <ol className="space-y-6 text-base">
          {puzzles.map((p, i) => {
            const blanks = p.solution.length - 2; // minus start and end
            return (
              <li key={p.id}>
                <div className="flex gap-3">
                  <span className="font-bold text-primary">{i + 1}.</span>
                  <div>
                    <p className="font-medium">{p.title}</p>
                    <p className="mt-1 text-sm text-text-muted">Hint: {p.hint}</p>
                    <div className="mt-3 flex flex-col items-start gap-2">
                      <span
                        className="rounded bg-primary-50 px-3 py-1 text-lg font-bold tracking-widest"
                        style={{ fontFamily: "monospace" }}
                      >
                        {p.startWord}
                      </span>
                      {Array.from({ length: blanks }).map((_, j) => (
                        <div
                          key={j}
                          className="border-b-2 border-dotted border-gray-400"
                          style={{ width: 120, height: 28 }}
                        />
                      ))}
                      <span
                        className="rounded bg-primary-50 px-3 py-1 text-lg font-bold tracking-widest"
                        style={{ fontFamily: "monospace" }}
                      >
                        {p.endWord}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Page break + Answer Key */}
      <div className="print-page-break" />
      <div className="print-no-break">
        <h2
          className="mb-4 text-2xl font-bold text-primary"
          style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
        >
          Answer Key &mdash; {title}
        </h2>

        <ol className="space-y-4 text-base">
          {puzzles.map((p, i) => (
            <li key={p.id}>
              <div className="flex gap-3">
                <span className="font-bold text-primary">{i + 1}.</span>
                <div>
                  <p className="mb-1 font-medium">{p.title}</p>
                  <p
                    className="font-bold tracking-widest"
                    style={{ fontFamily: "monospace" }}
                  >
                    {p.solution.join(" → ")}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
