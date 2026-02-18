"use client";

import { useState } from "react";
import type { Question } from "@/lib/types";

export default function QuestionView({
  question,
  onAnswer,
}: {
  question: Question;
  onAnswer: (selected: number) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);

  const handleSelect = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    onAnswer(index);
  };

  const correct = selected !== null && selected === question.correctAnswer;

  return (
    <div>
      <h2 className="mb-6 text-xl font-semibold leading-relaxed text-foreground sm:text-2xl">
        {question.question}
      </h2>

      <div className="mb-6 flex flex-col gap-3" role="group" aria-label="Answer options">
        {question.options.map((option, i) => {
          let style =
            "border border-border bg-surface text-foreground hover:border-primary-200 hover:bg-primary-50";

          if (selected !== null) {
            if (i === question.correctAnswer) {
              style = "border-2 border-success bg-success/10 text-foreground";
            } else if (i === selected && !correct) {
              style = "border-2 border-error bg-error/10 text-foreground";
            } else {
              style = "border border-border bg-background text-text-muted";
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={selected !== null}
              aria-label={`Option ${String.fromCharCode(65 + i)}: ${option}`}
              className={`w-full cursor-pointer rounded-xl px-5 py-4 text-left text-lg font-medium transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary/20 ${style} ${
                selected !== null ? "cursor-default" : ""
              }`}
              style={selected === null ? { boxShadow: "var(--shadow-sm)" } : undefined}
            >
              <span className="mr-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50 text-sm font-bold text-primary">
                {String.fromCharCode(65 + i)}
              </span>
              {option}
            </button>
          );
        })}
      </div>

      {question.hint && selected === null && (
        <button
          onClick={() => setShowHint(true)}
          className="text-base font-semibold text-primary underline-offset-2 hover:text-primary-dark hover:underline focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          {showHint ? "" : "Need a hint?"}
        </button>
      )}

      {showHint && selected === null && (
        <p className="mt-2 rounded-xl border border-secondary-light/30 bg-warm-bg p-4 text-base text-foreground">
          {question.hint}
        </p>
      )}

      {selected !== null && (
        <div
          role="status"
          aria-live="polite"
          className={`mt-4 rounded-xl p-4 text-lg font-semibold ${
            correct ? "border border-success/20 bg-success/10 text-foreground" : "border border-error/20 bg-error/10 text-foreground"
          }`}
        >
          <p>
            {correct
              ? "Correct! Well done!"
              : `Not quite — the answer is: ${question.options[question.correctAnswer]}`}
          </p>
          {question.explanation && (
            <p className="mt-2 text-base font-normal text-text-muted">
              {question.explanation}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
