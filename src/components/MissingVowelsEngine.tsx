"use client";

import { useState, useCallback } from "react";
import StarRating from "./StarRating";

interface Phrase {
  display: string;
  answer: string;
  hint: string;
}

interface Round {
  id: string;
  theme: string;
  phrases: Phrase[];
}

export default function MissingVowelsEngine({
  title,
  rounds,
}: {
  title: string;
  rounds: Round[];
}) {
  const [roundIndex, setRoundIndex] = useState(0);

  return (
    <MissingVowelsRoundView
      key={roundIndex}
      title={title}
      round={rounds[roundIndex]}
      roundIndex={roundIndex}
      totalRounds={rounds.length}
      onNextRound={() => setRoundIndex((i) => i + 1)}
      onRestart={() => setRoundIndex(0)}
    />
  );
}

function MissingVowelsRoundView({
  title,
  round,
  roundIndex,
  totalRounds,
  onNextRound,
  onRestart,
}: {
  title: string;
  round: Round;
  roundIndex: number;
  totalRounds: number;
  onNextRound: () => void;
  onRestart: () => void;
}) {
  const phrases = round.phrases;
  const total = phrases.length;

  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [guess, setGuess] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<"playing" | "roundComplete">("playing");

  const phrase = phrases[currentPhrase];

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (result !== null) return;
      const isCorrect =
        guess.trim().toUpperCase() === phrase.answer.toUpperCase();
      setResult(isCorrect ? "correct" : "wrong");
      if (isCorrect) setScore((s) => s + 1);

      setTimeout(() => {
        if (currentPhrase + 1 < total) {
          setCurrentPhrase((i) => i + 1);
          setGuess("");
          setShowHint(false);
          setResult(null);
        } else {
          setPhase("roundComplete");
        }
      }, 2000);
    },
    [guess, phrase, result, currentPhrase, total],
  );

  if (phase === "roundComplete") {
    const percentage = Math.round((score / total) * 100);
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
            Round Complete!
          </h2>
          <p className="mb-2 text-lg text-text-muted">
            Theme: {round.theme}
          </p>
          <p className="mb-6 text-lg text-text-muted">
            Round {roundIndex + 1} of {totalRounds}
          </p>
          <span className="text-5xl font-bold text-primary">{percentage}%</span>
          <p className="mt-2 text-lg text-foreground">
            {score} out of {total} correct
          </p>
          <StarRating />
          <div className="mt-8 flex flex-col items-center gap-3">
            {roundIndex + 1 < totalRounds ? (
              <button
                onClick={onNextRound}
                className="btn-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
              >
                Next Round
              </button>
            ) : (
              <button
                onClick={onRestart}
                className="btn-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
              >
                Play Again
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1
            className="text-xl font-bold text-foreground sm:text-2xl"
            style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
          >
            {title}
          </h1>
          <p className="text-sm text-text-muted">
            Round {roundIndex + 1}: {round.theme}
          </p>
        </div>
        <span
          className="rounded-full px-4 py-1.5 text-sm font-bold text-white"
          style={{ background: "var(--gradient-primary)" }}
        >
          {currentPhrase + 1} / {total}
        </span>
      </div>

      <div
        className="mb-8 h-2 w-full overflow-hidden rounded-full bg-border"
        role="progressbar"
        aria-valuenow={currentPhrase + 1}
        aria-valuemin={1}
        aria-valuemax={total}
      >
        <div
          className="progress-bar-gradient h-full transition-all duration-500"
          style={{ width: `${((currentPhrase + 1) / total) * 100}%` }}
        />
      </div>

      <div
        className="rounded-2xl border border-border bg-surface p-8 text-center"
        style={{ boxShadow: "var(--shadow-md)" }}
      >
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-text-muted">
          Fill in the vowels — Theme: {round.theme}
        </p>
        <p
          className="mb-6 text-2xl font-bold tracking-wider text-primary sm:text-3xl"
          style={{ fontFamily: "monospace" }}
          aria-label={`Missing vowels puzzle: ${phrase.display}`}
        >
          {phrase.display}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            disabled={result !== null}
            placeholder="Type the full phrase..."
            autoFocus
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            className="w-full max-w-sm rounded-xl border border-border bg-background px-5 py-4 text-center text-xl font-semibold text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
            aria-label="Your answer"
          />
          <button
            type="submit"
            disabled={result !== null || guess.trim() === ""}
            className="btn-primary disabled:opacity-50 focus:outline-none focus:ring-4 focus:ring-primary/20"
          >
            Submit
          </button>
        </form>

        {!showHint && result === null && (
          <button
            onClick={() => setShowHint(true)}
            className="mt-4 text-base font-semibold text-primary hover:text-primary-dark hover:underline"
          >
            Need a hint?
          </button>
        )}

        {showHint && result === null && (
          <p className="mt-4 rounded-xl border border-secondary-light/30 bg-warm-bg p-4 text-base text-foreground">
            {phrase.hint}
          </p>
        )}

        {result !== null && (
          <div
            role="status"
            aria-live="polite"
            className={`mt-4 rounded-xl border p-4 text-lg font-semibold ${
              result === "correct"
                ? "border-success/20 bg-success/10 text-foreground"
                : "border-error/20 bg-error/10 text-foreground"
            }`}
          >
            {result === "correct"
              ? "Correct! Well done!"
              : `The answer was: ${phrase.answer}`}
          </div>
        )}
      </div>
    </div>
  );
}
