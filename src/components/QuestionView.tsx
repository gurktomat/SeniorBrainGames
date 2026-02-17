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
    if (selected !== null) return; // already answered
    setSelected(index);
    onAnswer(index);
  };

  return (
    <div>
      <h2 className="mb-6 text-xl font-semibold leading-relaxed text-gray-900 sm:text-2xl">
        {question.question}
      </h2>

      <div className="mb-6 flex flex-col gap-3">
        {question.options.map((option, i) => {
          let style =
            "border-2 border-gray-200 bg-white text-gray-900 hover:border-blue-400 hover:bg-blue-50";

          if (selected !== null) {
            if (i === question.correctAnswer) {
              style = "border-2 border-green-500 bg-green-50 text-green-900";
            } else if (i === selected && !isCorrect(selected, question)) {
              style = "border-2 border-red-400 bg-red-50 text-red-900";
            } else {
              style = "border-2 border-gray-200 bg-gray-50 text-gray-400";
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={selected !== null}
              className={`w-full cursor-pointer rounded-xl px-5 py-4 text-left text-lg font-medium transition-all focus:outline-none focus:ring-4 focus:ring-blue-300 ${style} ${
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
          className="text-lg text-blue-600 underline hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {showHint ? "" : "Need a hint?"}
        </button>
      )}

      {showHint && selected === null && (
        <p className="mt-2 rounded-lg bg-yellow-50 p-4 text-lg text-yellow-800">
          💡 {question.hint}
        </p>
      )}

      {selected !== null && (
        <p
          className={`mt-4 rounded-lg p-4 text-lg font-semibold ${
            isCorrect(selected, question)
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-800"
          }`}
        >
          {isCorrect(selected, question)
            ? "Correct! Well done!"
            : `Not quite — the answer is: ${question.options[question.correctAnswer]}`}
        </p>
      )}
    </div>
  );
}

function isCorrect(selected: number, question: Question): boolean {
  return selected === question.correctAnswer;
}
