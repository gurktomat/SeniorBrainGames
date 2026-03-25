"use client";

import { useState, useCallback, useMemo } from "react";
import type { Quiz, QuizResult } from "@/lib/types";
import QuestionView from "./QuestionView";
import ResultsView from "./ResultsView";
import { shuffleArray } from "@/lib/shuffle";

interface QuizEngineProps {
  quiz: Quiz;
  onComplete?: (result: QuizResult) => void;
}

export default function QuizEngine({ quiz, onComplete }: QuizEngineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizResult["answers"]>([]);
  const [finished, setFinished] = useState(false);

  const shuffledQuiz = useMemo(() => {
    if (!quiz || !quiz.questions || !Array.isArray(quiz.questions)) {
      return { ...quiz, questions: [] };
    }
    return { ...quiz, questions: shuffleArray(quiz.questions) };
  }, [quiz]);

  if (
    !quiz ||
    !quiz.questions ||
    !Array.isArray(quiz.questions) ||
    quiz.questions.length === 0
  ) {
    return (
      <div className="mx-auto w-full max-w-2xl px-6 py-8 text-center">
        <div
          className="rounded-2xl border border-border bg-surface p-8"
          style={{ boxShadow: "var(--shadow-lg)" }}
        >
          <h2
            className="mb-2 text-3xl font-bold text-foreground"
            style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
          >
            Game data not available
          </h2>
          <p className="text-lg text-text-muted">
            We couldn't load the game data for "{quiz?.title || "this quiz"}". Please try again
            later.
          </p>
        </div>
      </div>
    );
  }

  const question = shuffledQuiz.questions && shuffledQuiz.questions.length > 0 
    ? shuffledQuiz.questions[currentIndex] 
    : null;

  const handleAnswer = useCallback(
    (selectedAnswer: number) => {
      if (!question) return;
      const correct = selectedAnswer === question.correctAnswer;
      const newAnswers = [
        ...answers,
        { questionId: question.id, selectedAnswer, correct },
      ];
      setAnswers(newAnswers);

      if (currentIndex + 1 < (shuffledQuiz.questions?.length ?? 0)) {
        setTimeout(() => setCurrentIndex((i) => i + 1), 1200);
      } else {
        setTimeout(() => setFinished(true), 1200);
      }
    },
    [answers, currentIndex, question, shuffledQuiz.questions?.length],
  );

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setAnswers([]);
    setFinished(false);
  }, []);

  if (finished) {
    const result: QuizResult = {
      quizId: shuffledQuiz.id,
      totalQuestions: shuffledQuiz.questions?.length ?? 0,
      correctAnswers: answers.filter((a) => a.correct).length,
      answers,
    };
    if (onComplete) {
      onComplete(result);
      return null;
    }
    return (
      <ResultsView result={result} quiz={shuffledQuiz} onRestart={handleRestart} />
    );
  }

  if (!question) {
    return (
      <div className="mx-auto w-full max-w-2xl px-6 py-8 text-center">
        <div className="rounded-2xl border border-border bg-surface p-8">
          <h2 className="text-xl font-bold text-foreground">Question not available</h2>
        </div>
      </div>
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
          {currentIndex + 1} / {shuffledQuiz.questions?.length ?? 0}
        </span>
      </div>

      <div
        className="mb-8 h-2 w-full overflow-hidden rounded-full bg-border"
        role="progressbar"
        aria-valuenow={currentIndex + 1}
        aria-valuemin={1}
        aria-valuemax={shuffledQuiz.questions?.length ?? 0}
        aria-label={`Question ${currentIndex + 1} of ${shuffledQuiz.questions?.length ?? 0}`}
      >
        <div
          className="progress-bar-gradient h-full transition-all duration-500"
          style={{
            width: `${((currentIndex + 1) / (shuffledQuiz.questions?.length ?? 1)) * 100}%`,
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
