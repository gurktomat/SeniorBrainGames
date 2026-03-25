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
      {/* Puzzle Section */}
      <div className="mb-12">
        <div className="mb-8 rounded-lg bg-gray-50 border border-gray-300 p-4 print:bg-transparent print:border-black">
          <p className="text-base font-medium italic text-black">
            <span className="font-bold not-italic">Instructions:</span> Read each statement carefully and mark whether it is True (T) or False (F).
          </p>
        </div>

        <ol className="space-y-6 text-base text-black">
          {statements.map((s, i) => (
            <li key={s.id} className="print-no-break flex gap-4">
              <span className="font-bold text-black min-w-[24px]">{i + 1}.</span>
              <div className="flex-1">
                <p className="font-semibold leading-relaxed text-black">{s.statement}</p>
                <div className="mt-3 flex gap-8">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div className="h-5 w-5 rounded border-2 border-black"></div>
                    <span className="font-bold tracking-wide uppercase text-sm">True</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div className="h-5 w-5 rounded border-2 border-black"></div>
                    <span className="font-bold tracking-wide uppercase text-sm">False</span>
                  </label>
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
          <div className="mt-12 border-t-4 border-black pt-8">
            <h2
              className="mb-6 text-2xl font-black text-black"
              style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
            >
              Answer Key
            </h2>

            <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 text-sm text-black">
              {statements.map((s, i) => (
                <div key={s.id} className="print-no-break border border-gray-200 p-3 rounded print:border-black">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-bold">Q{i + 1}:</span>
                    <span className="font-bold uppercase tracking-wider">{s.answer ? "True" : "False"}</span>
                  </div>
                  {s.explanation && (
                    <p className="mt-1 text-xs italic text-gray-700 print:text-black">
                      {s.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
