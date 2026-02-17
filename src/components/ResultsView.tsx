"use client";

import Link from "next/link";
import type { Quiz, QuizResult } from "@/lib/types";
import ShareButton from "./ShareButton";

export default function ResultsView({
  result,
  quiz,
  onRestart,
}: {
  result: QuizResult;
  quiz: Quiz;
  onRestart: () => void;
}) {
  const percentage = Math.round(
    (result.correctAnswers / result.totalQuestions) * 100,
  );

  let message: string;
  if (percentage === 100)
    message = "Perfect score! You have an amazing memory!";
  else if (percentage >= 75) message = "Great job! You really know your stuff!";
  else if (percentage >= 50) message = "Not bad! Those were some tricky ones.";
  else message = "Good effort! Why not try again?";

  const categoryPath = quiz.gameCategory ? `/${quiz.gameCategory}` : "/";

  return (
    <div className="mx-auto w-full max-w-2xl text-center">
      <div className="mb-8 rounded-2xl bg-surface p-8 shadow-sm">
        <h2
          className="mb-2 text-3xl font-bold text-foreground"
          style={{
            fontFamily: "var(--font-merriweather), var(--font-heading)",
          }}
        >
          Quiz Complete!
        </h2>
        <p className="mb-6 text-xl text-text-muted">{quiz.title}</p>

        <div className="mb-6">
          <span className="text-6xl font-bold text-primary">{percentage}%</span>
          <p className="mt-2 text-xl text-foreground">
            {result.correctAnswers} out of {result.totalQuestions} correct
          </p>
        </div>

        <p className="mb-8 text-xl font-medium text-foreground">{message}</p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={onRestart}
            className="w-full cursor-pointer rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary/30 sm:w-auto"
          >
            Try Again
          </button>
          <ShareButton quizTitle={quiz.title} percentage={percentage} />
          <Link
            href={categoryPath}
            className="w-full rounded-xl border-2 border-border px-8 py-4 text-lg font-semibold text-foreground transition-colors hover:bg-background focus:outline-none focus:ring-4 focus:ring-primary/30 sm:w-auto"
          >
            More Quizzes
          </Link>
        </div>
      </div>

      <div className="mt-8 text-left">
        <h3
          className="mb-4 text-2xl font-bold text-foreground"
          style={{
            fontFamily: "var(--font-merriweather), var(--font-heading)",
          }}
        >
          Your Answers
        </h3>
        <div className="flex flex-col gap-3">
          {result.answers.map((answer, i) => {
            const q = quiz.questions[i];
            return (
              <div
                key={q.id}
                className={`rounded-xl border-2 p-4 ${
                  answer.correct
                    ? "border-success/30 bg-success/10"
                    : "border-error/30 bg-error/10"
                }`}
              >
                <p className="text-lg font-medium text-foreground">
                  {i + 1}. {q.question}
                </p>
                <p className="mt-1 text-base text-foreground">
                  Your answer:{" "}
                  <span
                    className={
                      answer.correct
                        ? "font-semibold text-success"
                        : "font-semibold text-error"
                    }
                  >
                    {q.options[answer.selectedAnswer]}
                  </span>
                </p>
                {!answer.correct && (
                  <p className="mt-1 text-base text-foreground">
                    Correct answer:{" "}
                    <span className="font-semibold text-success">
                      {q.options[q.correctAnswer]}
                    </span>
                  </p>
                )}
                {q.explanation && (
                  <p className="mt-2 text-base text-text-muted">
                    {q.explanation}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
