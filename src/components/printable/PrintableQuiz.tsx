import type { Quiz } from "@/lib/types";

export default function PrintableQuiz({
  quiz,
  showAnswers,
}: {
  quiz: Quiz;
  showAnswers?: boolean;
}) {
  const letters = ["A", "B", "C", "D"];

  if (!quiz?.questions) {
    return (
      <div className="p-8 text-center border-2 border-dashed border-red-200 rounded-xl">
        <h2 className="text-xl font-bold text-red-600">Print Data Error</h2>
        <p className="mt-2 text-gray-600">The questions for this quiz could not be loaded.</p>
        <p className="text-xs mt-4 text-gray-400">ID: {quiz?.id || 'unknown'}</p>
      </div>
    );
  }

  return (
    <>
      {/* Puzzle Section */}
      <div className="mb-12">
        <div className="mb-8 rounded-lg bg-gray-50 border border-gray-300 p-4 print:bg-transparent print:border-black">
          <p className="text-base font-medium italic text-black">
            <span className="font-bold not-italic">Instructions:</span> {quiz.description}
          </p>
        </div>

        <ol className="grid gap-x-12 gap-y-8 sm:grid-cols-2 text-base text-black">
          {quiz.questions.map((q, i) => (
            <li key={q.id} className="print-no-break flex flex-col">
              <div className="flex gap-2 mb-3">
                <span className="font-bold text-black">{i + 1}.</span>
                <p className="font-semibold leading-snug text-black">{q.question}</p>
              </div>
              <div className="ml-6 flex flex-col gap-2">
                {q.options.map((opt, j) => (
                  <div key={j} className="flex items-center gap-3">
                    {/* Circle for checking the answer */}
                    <div className="h-5 w-5 shrink-0 rounded-full border-2 border-black flex items-center justify-center">
                      <span className="text-[10px] font-bold opacity-0 print:opacity-100">{letters[j]}</span>
                    </div>
                    <span className="text-black">{opt}</span>
                  </div>
                ))}
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

            <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 md:grid-cols-3 text-sm text-black">
              {quiz.questions.map((q, i) => (
                <div key={q.id} className="print-no-break border border-gray-200 p-3 rounded print:border-black">
                  <div className="font-bold mb-1">Question {i + 1}</div>
                  <div className="font-semibold">
                    {letters[q.correctAnswer]}. {q.options[q.correctAnswer]}
                  </div>
                  {q.explanation && (
                    <p className="mt-2 text-xs italic text-gray-700 print:text-black">
                      {q.explanation}
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
