"use client";

import { useState, useCallback, useMemo } from "react";
import type { Quiz, QuizResult } from "@/lib/types";
import QuestionView from "./QuestionView";
import ResultsView from "./ResultsView";
import { shuffleArray } from "@/lib/shuffle";

export default function QuizEngine({ quiz }: { quiz: Quiz }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizResult["answers"]>([]);
  const [finished, setFinished] = useState(false);

  const shuffledQuiz = useMemo(
    () => ({ ...quiz, questions: shuffleArray(quiz.questions) }),
    [quiz],
  );

  const question = shuffledQuiz.questions[currentIndex];

  const handleAnswer = useCallback(
    (selectedAnswer: number) => {
      const correct = selectedAnswer === question.correctAnswer;
      const newAnswers = [
        ...answers,
        { questionId: question.id, selectedAnswer, correct },
      ];
      setAnswers(newAnswers);

      if (currentIndex + 1 < shuffledQuiz.questions.length) {
        setTimeout(() => setCurrentIndex((i) => i + 1), 1200);
      } else {
        setTimeout(() => setFinished(true), 1200);
      }
    },
    [answers, currentIndex, question, shuffledQuiz.questions.length],
  );

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setAnswers([]);
    setFinished(false);
  }, []);

  if (finished) {
    const result: QuizResult = {
      quizId: shuffledQuiz.id,
      totalQuestions: shuffledQuiz.questions.length,
      correctAnswers: answers.filter((a) => a.correct).length,
      answers,
    };
    return (
      <ResultsView result={result} quiz={shuffledQuiz} onRestart={handleRestart} />
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1
          className="text-xl font-bold text-foreground sm:text-2xl"
          style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
        >
          {shuffledQuiz.title}
        </h1>
        <span className="rounded-full px-4 py-1.5 text-sm font-bold text-white" style={{ background: "var(--gradient-primary)" }}>
          {currentIndex + 1} / {shuffledQuiz.questions.length}
        </span>
      </div>

      <div
        className="mb-8 h-2 w-full overflow-hidden rounded-full bg-border"
        role="progressbar"
        aria-valuenow={currentIndex + 1}
        aria-valuemin={1}
        aria-valuemax={shuffledQuiz.questions.length}
        aria-label={`Question ${currentIndex + 1} of ${shuffledQuiz.questions.length}`}
      >
        <div
          className="progress-bar-gradient h-full transition-all duration-500"
          style={{
            width: `${((currentIndex + 1) / shuffledQuiz.questions.length) * 100}%`,
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
