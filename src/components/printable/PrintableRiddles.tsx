interface Riddle {
  id: string;
  riddle: string;
  answer: string;
  hint: string;
}

export default function PrintableRiddles({
  title,
  riddles,
  showAnswers,
}: {
  title: string;
  riddles: Riddle[];
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
          Read each riddle and write your answer in the space provided.
        </p>

        <ol className="space-y-6 text-base">
          {riddles.map((r, i) => (
            <li key={r.id}>
              <div className="flex gap-3">
                <span className="font-bold text-primary">{i + 1}.</span>
                <div>
                  <p className="font-medium">{r.riddle}</p>
                  <p className="mt-1 text-sm text-text-muted">Hint: {r.hint}</p>
                  <div className="mt-2 border-b-2 border-dotted border-gray-400" style={{ width: 300 }}>
                    &nbsp;
                  </div>
                </div>
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
              {riddles.map((r, i) => (
                <li key={r.id} className="flex gap-3">
                  <span className="font-bold text-primary">{i + 1}.</span>
                  <span className="font-bold capitalize">{r.answer}</span>
                </li>
              ))}
            </ol>
          </div>
        </>
      )}
    </>
  );
}
