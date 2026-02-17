"use client";

import { useState, useCallback } from "react";
import type { Quiz, QuizResult } from "@/lib/types";
import QuestionView from "./QuestionView";
import ResultsView from "./ResultsView";

export default function QuizEngine({ quiz }: { quiz: Quiz }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizResult["answers"]>([]);
  const [finished, setFinished] = useState(false);

  const question = quiz.questions[currentIndex];

  const handleAnswer = useCallback(
    (selectedAnswer: number) => {
      const correct = selectedAnswer === question.correctAnswer;
      const newAnswers = [
        ...answers,
        { questionId: question.id, selectedAnswer, correct },
      ];
      setAnswers(newAnswers);

      if (currentIndex + 1 < quiz.questions.length) {
        setTimeout(() => setCurrentIndex((i) => i + 1), 800);
      } else {
        setTimeout(() => setFinished(true), 800);
      }
    },
    [answers, currentIndex, question, quiz.questions.length]
  );

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setAnswers([]);
    setFinished(false);
  }, []);

  if (finished) {
    const result: QuizResult = {
      quizId: quiz.id,
      totalQuestions: quiz.questions.length,
      correctAnswers: answers.filter((a) => a.correct).length,
      answers,
    };
    return <ResultsView result={result} quiz={quiz} onRestart={handleRestart} />;
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{quiz.title}</h1>
        <span className="rounded-full bg-gray-100 px-4 py-2 text-lg font-semibold text-gray-700">
          {currentIndex + 1} / {quiz.questions.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-8 h-3 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-500"
          style={{
            width: `${((currentIndex + 1) / quiz.questions.length) * 100}%`,
          }}
        />
      </div>

      <QuestionView
        key={question.id}
        question={question}
        onAnswer={handleAnswer}
      />
    </div>
  );
}
