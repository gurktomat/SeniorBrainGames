interface Statement {
  id: string;
  statement: string;
  answer: boolean;
  explanation: string;
}

export default function PrintableTrueOrFalse({
  title,
  statements,
  showAnswers,
}: {
  title: string;
  statements: Statement[];
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
          Read each statement and circle True or False.
        </p>

        <ol className="space-y-5 text-base">
          {statements.map((s, i) => (
            <li key={s.id}>
              <div className="flex gap-3">
                <span className="font-bold text-primary">{i + 1}.</span>
                <div className="flex-1">
                  <p className="font-medium">{s.statement}</p>
                  <div className="mt-2 flex gap-6">
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        className="inline-block rounded border-2 border-gray-400"
                        style={{ width: 18, height: 18 }}
                      />
                      <span className="font-semibold">True</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        className="inline-block rounded border-2 border-gray-400"
                        style={{ width: 18, height: 18 }}
                      />
                      <span className="font-semibold">False</span>
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Answer key */}
      {showAnswers && (
        <>
          <div className="print-page-break" />
          <div className="print-no-break">
            <h2
              className="mb-4 text-2xl font-bold text-primary"
              style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
            >
              Answer Key &mdash; {title}
            </h2>

            <ol className="space-y-3 text-base">
              {statements.map((s, i) => (
                <li key={s.id}>
                  <div className="flex gap-3">
                    <span className="font-bold text-primary">{i + 1}.</span>
                    <div>
                      <span className="font-bold">{s.answer ? "True" : "False"}</span>
                      <p className="mt-0.5 text-sm text-text-muted">{s.explanation}</p>
                    </div>
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
