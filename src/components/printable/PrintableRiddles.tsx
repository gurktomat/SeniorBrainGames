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
      {/* Puzzle Section */}
      <div className="mb-12">
        <div className="mb-8 rounded-lg bg-gray-50 border border-gray-300 p-4 print:bg-transparent print:border-black">
          <p className="text-base font-medium italic text-black">
            <span className="font-bold not-italic">Instructions:</span> Read each riddle carefully. Use the hint if you get stuck, and write your answer on the line provided.
          </p>
        </div>

        <ol className="grid gap-x-12 gap-y-10 sm:grid-cols-2 text-base text-black">
          {riddles.map((r, i) => (
            <li key={r.id} className="print-no-break flex flex-col">
              <div className="flex gap-2 mb-2">
                <span className="font-bold text-black min-w-[20px]">{i + 1}.</span>
                <div>
                  <p className="font-semibold leading-relaxed text-black">{r.riddle}</p>
                </div>
              </div>
              <div className="ml-7 flex flex-col gap-4">
                <p className="text-sm italic text-gray-700 print:text-black">Hint: {r.hint}</p>
                <div className="border-b border-black w-full" />
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Answer key */}
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

            <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 md:grid-cols-3 text-sm text-black">
              {riddles.map((r, i) => (
                <div key={r.id} className="print-no-break border border-gray-200 p-3 rounded print:border-black">
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold">Q{i + 1}:</span>
                    <span className="font-bold capitalize">{r.answer}</span>
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
