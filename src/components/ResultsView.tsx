"use client";

import Link from "next/link";
import type { Quiz, QuizResult } from "@/lib/types";

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
    (result.correctAnswers / result.totalQuestions) * 100
  );

  let message: string;
  if (percentage === 100) message = "Perfect score! You have an amazing memory!";
  else if (percentage >= 75) message = "Great job! You really know your stuff!";
  else if (percentage >= 50) message = "Not bad! Those were some tricky ones.";
  else message = "Good effort! Why not try again?";

  return (
    <div className="mx-auto w-full max-w-2xl text-center">
      <div className="mb-8 rounded-2xl bg-white p-8 shadow-sm">
        <h2 className="mb-2 text-3xl font-bold text-gray-900">
          Quiz Complete!
        </h2>
        <p className="mb-6 text-xl text-gray-600">{quiz.title}</p>

        <div className="mb-6">
          <span className="text-6xl font-bold text-blue-700">{percentage}%</span>
          <p className="mt-2 text-xl text-gray-700">
            {result.correctAnswers} out of {result.totalQuestions} correct
          </p>
        </div>

        <p className="mb-8 text-xl font-medium text-gray-800">{message}</p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={onRestart}
            className="w-full cursor-pointer rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="w-full rounded-xl border-2 border-gray-300 px-8 py-4 text-lg font-semibold text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
          >
            Back to Quizzes
          </Link>
        </div>
      </div>

      {/* Answer review */}
      <div className="mt-8 text-left">
        <h3 className="mb-4 text-2xl font-bold text-gray-900">Your Answers</h3>
        <div className="flex flex-col gap-3">
          {result.answers.map((answer, i) => {
            const q = quiz.questions[i];
            return (
              <div
                key={q.id}
                className={`rounded-xl border-2 p-4 ${
                  answer.correct
                    ? "border-green-200 bg-green-50"
                    : "border-red-200 bg-red-50"
                }`}
              >
                <p className="text-lg font-medium text-gray-900">
                  {i + 1}. {q.question}
                </p>
                <p className="mt-1 text-base text-gray-700">
                  Your answer:{" "}
                  <span
                    className={
                      answer.correct
                        ? "font-semibold text-green-700"
                        : "font-semibold text-red-700"
                    }
                  >
                    {q.options[answer.selectedAnswer]}
                  </span>
                </p>
                {!answer.correct && (
                  <p className="mt-1 text-base text-gray-700">
                    Correct answer:{" "}
                    <span className="font-semibold text-green-700">
                      {q.options[q.correctAnswer]}
                    </span>
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
