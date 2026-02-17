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
            "border-2 border-border bg-surface text-foreground hover:border-primary hover:bg-primary/5";

          if (selected !== null) {
            if (i === question.correctAnswer) {
              style = "border-2 border-success bg-success/10 text-foreground";
            } else if (i === selected && !correct) {
              style = "border-2 border-error bg-error/10 text-foreground";
            } else {
              style = "border-2 border-border bg-background text-text-muted";
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={selected !== null}
              aria-label={`Option ${String.fromCharCode(65 + i)}: ${option}`}
              className={`w-full cursor-pointer rounded-xl px-5 py-4 text-left text-lg font-medium transition-all focus:outline-none focus:ring-4 focus:ring-primary/30 ${style} ${
                selected !== null ? "cursor-default" : ""
              }`}
            >
              <span className="mr-3 inline-block w-8 text-center font-bold">
                {String.fromCharCode(65 + i)}.
              </span>
              {option}
            </button>
          );
        })}
      </div>

      {question.hint && selected === null && (
        <button
          onClick={() => setShowHint(true)}
          className="text-lg text-primary underline hover:text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          {showHint ? "" : "Need a hint?"}
        </button>
      )}

      {showHint && selected === null && (
        <p className="mt-2 rounded-lg bg-secondary/15 p-4 text-lg text-foreground">
          {question.hint}
        </p>
      )}

      {selected !== null && (
        <div
          role="status"
          aria-live="polite"
          className={`mt-4 rounded-lg p-4 text-lg font-semibold ${
            correct ? "bg-success/10 text-foreground" : "bg-error/10 text-foreground"
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
