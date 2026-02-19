"use client";

import Link from "next/link";
import type { Quiz, QuizResult } from "@/lib/types";
import ShareButton from "./ShareButton";
import StarRating from "./StarRating";

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

  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-8 text-center">
      <div className="mb-8 rounded-2xl border border-border bg-surface p-8" style={{ boxShadow: "var(--shadow-lg)" }}>
        <h2
          className="mb-2 text-3xl font-bold text-foreground"
          style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
        >
          Quiz Complete!
        </h2>
        <p className="mb-8 text-lg text-text-muted">{quiz.title}</p>

        {/* Circular progress */}
        <div className="relative mx-auto mb-6 h-36 w-36">
          <svg className="stat-ring -rotate-90" width="144" height="144" viewBox="0 0 120 120" aria-hidden="true">
            <circle cx="60" cy="60" r="54" fill="none" stroke="#E2E8F0" strokeWidth="8" />
            <circle
              cx="60" cy="60" r="54" fill="none"
              stroke="url(#scoreGradient)" strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
            />
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1B4965" />
                <stop offset="100%" stopColor="#2D6A8F" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-primary">{percentage}%</span>
          </div>
        </div>

        <p className="mb-2 text-lg text-foreground">
          {result.correctAnswers} out of {result.totalQuestions} correct
        </p>
        <p className="mb-4 text-lg font-medium text-text-muted">{message}</p>

        <StarRating />

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={onRestart}
            className="btn-primary w-full focus:outline-none focus:ring-4 focus:ring-primary/20 sm:w-auto"
          >
            Try Again
          </button>
          <ShareButton quizTitle={quiz.title} percentage={percentage} />
          <Link
            href={categoryPath}
            className="btn-secondary w-full text-center focus:outline-none focus:ring-4 focus:ring-primary/20 sm:w-auto"
          >
            More Quizzes
          </Link>
        </div>
      </div>

      <div className="mt-8 text-left">
        <h3
          className="mb-4 text-xl font-bold text-foreground"
          style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
        >
          Your Answers
        </h3>
        <div className="flex flex-col gap-3">
          {result.answers.map((answer, i) => {
            const q = quiz.questions[i];
            return (
              <div
                key={q.id}
                className={`rounded-xl border p-4 ${
                  answer.correct
                    ? "border-success/20 bg-success/5"
                    : "border-error/20 bg-error/5"
                }`}
              >
                <p className="text-base font-semibold text-foreground">
                  {i + 1}. {q.question}
                </p>
                <p className="mt-1 text-sm text-foreground">
                  Your answer:{" "}
                  <span
                    className={
                      answer.correct
                        ? "font-bold text-success"
                        : "font-bold text-error"
                    }
                  >
                    {q.options[answer.selectedAnswer]}
                  </span>
                </p>
                {!answer.correct && (
                  <p className="mt-1 text-sm text-foreground">
                    Correct answer:{" "}
                    <span className="font-bold text-success">
                      {q.options[q.correctAnswer]}
                    </span>
                  </p>
                )}
                {q.explanation && (
                  <p className="mt-2 text-sm text-text-muted">
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
