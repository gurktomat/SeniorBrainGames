interface WordScramblePuzzle {
  id: string;
  scrambled: string;
  answer: string;
  hint: string;
}

export default function PrintableWordScramble({
  title,
  puzzles,
  showAnswers,
}: {
  title: string;
  puzzles: WordScramblePuzzle[];
  showAnswers?: boolean;
}) {
  return (
    <>
      {/* Puzzle Section */}
      <div className="mb-12">
        <div className="mb-8 rounded-lg bg-gray-50 border border-gray-300 p-4 print:bg-transparent print:border-black">
          <p className="text-base font-medium italic text-black">
            <span className="font-bold not-italic">Instructions:</span> Unscramble each word using the hint. Write your answer on the line provided.
          </p>
        </div>

        <ol className="grid gap-x-16 gap-y-10 sm:grid-cols-2 text-base text-black">
          {puzzles.map((p, i) => (
            <li key={p.id} className="print-no-break flex flex-col">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-bold text-black">{i + 1}.</span>
                <span
                  className="text-xl font-bold tracking-[0.2em] uppercase"
                  style={{ fontFamily: "monospace" }}
                >
                  {p.scrambled}
                </span>
              </div>
              <div className="ml-6 flex flex-col gap-4">
                <div className="text-gray-700 italic print:text-black">
                  Hint: {p.hint}
                </div>
                <div className="border-b border-black w-full" />
              </div>
            </li>
          ))}
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

            <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2 md:grid-cols-3 text-sm text-black">
              {puzzles.map((p, i) => (
                <div key={p.id} className="print-no-break border border-gray-200 p-3 rounded print:border-black flex flex-col">
                  <div className="font-bold mb-1">Word {i + 1}</div>
                  <div className="font-semibold uppercase tracking-wider">
                    {p.answer}
                  </div>
                  <div className="text-xs text-gray-500 print:text-black mt-1 uppercase tracking-widest font-mono">
                    ({p.scrambled})
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
