import type { Quiz } from "@/lib/types";

export default function PrintableQuiz({
  quiz,
  showAnswers,
}: {
  quiz: Quiz;
  showAnswers?: boolean;
}) {
  const letters = ["A", "B", "C", "D"];

  return (
    <>
      {/* Puzzle */}
      <div className="print-no-break">
        <h2
          className="mb-4 text-2xl font-bold text-primary"
          style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
        >
          {quiz.title}
        </h2>
        <p className="mb-6 text-text-muted">{quiz.description}</p>

        <ol className="space-y-6 text-base">
          {quiz.questions.map((q, i) => (
            <li key={q.id}>
              <div className="flex gap-3">
                <span className="font-bold text-primary">{i + 1}.</span>
                <div className="flex-1">
                  <p className="font-medium">{q.question}</p>
                  <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1">
                    {q.options.map((opt, j) => (
                      <div key={j} className="flex items-baseline gap-2">
                        <span className="font-semibold text-primary">{letters[j]}.</span>
                        <span>{opt}</span>
                      </div>
                    ))}
                  </div>
                  <div
                    className="mt-2 border-b-2 border-dotted border-gray-400"
                    style={{ width: 120 }}
                  >
                    &nbsp;
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
              Answer Key &mdash; {quiz.title}
            </h2>

            <ol className="space-y-3 text-base">
              {quiz.questions.map((q, i) => (
                <li key={q.id}>
                  <div className="flex gap-3">
                    <span className="font-bold text-primary">{i + 1}.</span>
                    <div>
                      <span className="font-bold">{letters[q.correctAnswer]}. {q.options[q.correctAnswer]}</span>
                      {q.explanation && (
                        <p className="mt-0.5 text-sm text-text-muted">{q.explanation}</p>
                      )}
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
