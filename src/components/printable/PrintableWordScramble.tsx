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
      {/* Puzzle */}
      <div className="print-no-break">
        <h2
          className="mb-4 text-2xl font-bold text-primary"
          style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
        >
          {title}
        </h2>
        <p className="mb-6 text-text-muted">
          Unscramble each word using the hint. Write your answer on the line.
        </p>

        <ol className="space-y-5 text-base">
          {puzzles.map((p, i) => (
            <li key={p.id}>
              <div className="flex items-baseline gap-4">
                <span className="font-bold text-primary">{i + 1}.</span>
                <span
                  className="text-xl font-bold tracking-widest"
                  style={{ fontFamily: "monospace" }}
                >
                  {p.scrambled}
                </span>
              </div>
              <div className="ml-8 mt-1 text-text-muted">
                Hint: {p.hint}
              </div>
              <div className="ml-8 mt-2 border-b-2 border-dotted border-gray-400" style={{ width: 250 }}>
                &nbsp;
              </div>
            </li>
          ))}
        </ol>
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
              Answer Key &mdash; {title}
            </h2>

            <ol className="space-y-2 text-base">
              {puzzles.map((p, i) => (
                <li key={p.id} className="flex items-baseline gap-3">
                  <span className="font-bold text-primary">{i + 1}.</span>
                  <span className="font-mono font-bold">{p.answer}</span>
                  <span className="text-text-muted">({p.scrambled})</span>
                </li>
              ))}
            </ol>
          </div>
        </>
      )}
    </>
  );
}
