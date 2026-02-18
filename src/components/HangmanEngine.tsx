"use client";

import { useState, useCallback, useMemo, useEffect } from "react";

interface HangmanWord {
  id: string;
  word: string;
  hint: string;
  category: string;
}

const MAX_WRONG = 6;

const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

// ─── Outer Wrapper (manages wordIndex, score, remount) ──────────────────────

export default function HangmanEngine({
  title,
  words,
}: {
  title: string;
  words: HangmanWord[];
}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [totalPlayed, setTotalPlayed] = useState(0);
  const [allComplete, setAllComplete] = useState(false);

  const handleWordWon = useCallback(() => {
    setScore((s) => s + 1);
    setTotalPlayed((t) => t + 1);
  }, []);

  const handleWordLost = useCallback(() => {
    setTotalPlayed((t) => t + 1);
  }, []);

  const handleNextWord = useCallback(() => {
    if (wordIndex + 1 < words.length) {
      setWordIndex((i) => i + 1);
    } else {
      setAllComplete(true);
    }
  }, [wordIndex, words.length]);

  const handleRestart = useCallback(() => {
    setWordIndex(0);
    setScore(0);
    setTotalPlayed(0);
    setAllComplete(false);
  }, []);

  // ─── Final Completion Screen ─────────────────────────────────────────────

  if (allComplete) {
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
            All Words Complete!
          </h2>
          <p className="mb-6 text-lg text-text-muted">
            You got {score} out of {totalPlayed} words correct!
          </p>
          <button
            onClick={handleRestart}
            className="btn-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  // Key-based remount: inner component resets when wordIndex changes
  return (
    <HangmanWordView
      key={wordIndex}
      title={title}
      wordData={words[wordIndex]}
      wordIndex={wordIndex}
      totalWords={words.length}
      score={score}
      onWon={handleWordWon}
      onLost={handleWordLost}
      onNextWord={handleNextWord}
    />
  );
}

// ─── Inner Component (handles a single word) ────────────────────────────────

function HangmanWordView({
  title,
  wordData,
  wordIndex,
  totalWords,
  score,
  onWon,
  onLost,
  onNextWord,
}: {
  title: string;
  wordData: HangmanWord;
  wordIndex: number;
  totalWords: number;
  score: number;
  onWon: () => void;
  onLost: () => void;
  onNextWord: () => void;
}) {
  const word = wordData.word;

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [phase, setPhase] = useState<"playing" | "won" | "lost">("playing");
  const [showHint, setShowHint] = useState(false);

  // Derived state
  const wrongGuesses = useMemo(
    () => guessedLetters.filter((l) => !word.includes(l)).length,
    [guessedLetters, word],
  );

  // Guess a letter — checks win/loss inline after updating state
  const guessLetter = useCallback(
    (letter: string) => {
      const upper = letter.toUpperCase();
      if (phase !== "playing") return;
      if (guessedLetters.includes(upper)) return;
      if (!/^[A-Z]$/.test(upper)) return;

      const newGuessed = [...guessedLetters, upper];
      setGuessedLetters(newGuessed);

      // Check win
      const allRevealed = word.split("").every((l) => newGuessed.includes(l));
      if (allRevealed) {
        setPhase("won");
        onWon();
        return;
      }

      // Check loss
      const newWrong = newGuessed.filter((l) => !word.includes(l)).length;
      if (newWrong >= MAX_WRONG) {
        setPhase("lost");
        onLost();
      }
    },
    [phase, guessedLetters, word, onWon, onLost],
  );

  // Physical keyboard listener
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (/^[a-zA-Z]$/.test(e.key)) {
        e.preventDefault();
        guessLetter(e.key);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [guessLetter]);

  // Letter status for keyboard styling
  const getLetterStatus = useCallback(
    (letter: string): "unused" | "correct" | "wrong" => {
      if (!guessedLetters.includes(letter)) return "unused";
      return word.includes(letter) ? "correct" : "wrong";
    },
    [guessedLetters, word],
  );

  // ─── Won / Lost Overlay ──────────────────────────────────────────────────

  const renderResult = () => {
    if (phase === "playing") return null;

    return (
      <div
        className="mt-6 rounded-2xl border border-border bg-surface p-6 text-center"
        style={{ boxShadow: "var(--shadow-md)" }}
        role="status"
        aria-live="polite"
      >
        {phase === "won" ? (
          <>
            <h3
              className="mb-2 text-2xl font-bold text-success"
              style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
            >
              Well Done!
            </h3>
            <p className="mb-4 text-lg text-foreground">
              The word was: <span className="font-bold">{word}</span>
            </p>
          </>
        ) : (
          <>
            <h3
              className="mb-2 text-2xl font-bold text-error"
              style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
            >
              Out of Lives!
            </h3>
            <p className="mb-4 text-lg text-foreground">
              The word was: <span className="font-bold">{word}</span>
            </p>
          </>
        )}
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          {phase === "lost" && (
            <button
              onClick={() => {
                setGuessedLetters([]);
                setPhase("playing");
                setShowHint(false);
              }}
              className="btn-secondary focus:outline-none focus:ring-4 focus:ring-primary/20"
            >
              Try Again
            </button>
          )}
          <button
            onClick={onNextWord}
            className="btn-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
          >
            Next Word
          </button>
        </div>
      </div>
    );
  };

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-6 sm:px-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1
            className="text-xl font-bold text-foreground sm:text-2xl"
            style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
          >
            {title}
          </h1>
          <p className="text-sm text-text-muted">
            Score: {score} correct
          </p>
        </div>
        <span
          className="rounded-full px-4 py-1.5 text-sm font-bold text-white"
          style={{ background: "var(--gradient-primary)" }}
        >
          {wordIndex + 1} / {totalWords}
        </span>
      </div>

      {/* Progress bar */}
      <div
        className="mb-6 h-2 w-full overflow-hidden rounded-full bg-border"
        role="progressbar"
        aria-valuenow={wordIndex + 1}
        aria-valuemin={1}
        aria-valuemax={totalWords}
      >
        <div
          className="progress-bar-gradient h-full transition-all duration-500"
          style={{ width: `${((wordIndex + 1) / totalWords) * 100}%` }}
        />
      </div>

      {/* Game area */}
      <div
        className="rounded-2xl border border-border bg-surface p-6 sm:p-8"
        style={{ boxShadow: "var(--shadow-md)" }}
      >
        {/* Category label */}
        <p className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-text-muted">
          {wordData.category}
        </p>

        {/* Lives (hearts) */}
        <div className="mb-6 flex items-center justify-center gap-1" aria-label={`${MAX_WRONG - wrongGuesses} lives remaining`}>
          {Array.from({ length: MAX_WRONG }).map((_, i) => (
            <span
              key={i}
              className={`text-2xl transition-all duration-300 ${
                i < MAX_WRONG - wrongGuesses
                  ? "text-error"
                  : "text-text-muted/30"
              }`}
              style={
                i === MAX_WRONG - wrongGuesses && wrongGuesses > 0
                  ? { animation: "hangman-shake 0.4s ease-in-out" }
                  : undefined
              }
            >
              ♥
            </span>
          ))}
        </div>

        {/* Word display */}
        <div
          className="mb-8 flex flex-wrap items-center justify-center gap-2"
          aria-label={
            phase !== "playing"
              ? `The word is ${word}`
              : `Word with ${word.split("").filter((l) => guessedLetters.includes(l)).length} of ${word.length} letters revealed`
          }
        >
          {word.split("").map((letter, i) => {
            const isRevealed = guessedLetters.includes(letter) || phase === "lost";
            return (
              <span
                key={i}
                className="inline-flex h-12 w-10 items-center justify-center border-b-4 border-primary text-3xl font-bold text-foreground sm:h-14 sm:w-12"
                style={
                  isRevealed && guessedLetters.includes(letter)
                    ? { animation: "hangman-pop 0.3s ease-out" }
                    : undefined
                }
              >
                {isRevealed ? letter : ""}
              </span>
            );
          })}
        </div>

        {/* On-screen keyboard */}
        <div className="mb-4 flex flex-col items-center gap-2">
          {KEYBOARD_ROWS.map((row, rowIdx) => (
            <div key={rowIdx} className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
              {row.map((letter) => {
                const status = getLetterStatus(letter);
                const isDisabled = phase !== "playing" || guessedLetters.includes(letter);

                let btnClass =
                  "inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl text-lg font-bold transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary/20 sm:min-h-[48px] sm:min-w-[48px] sm:text-xl";

                if (status === "unused") {
                  btnClass += " bg-surface border-2 border-border text-foreground";
                  if (!isDisabled) {
                    btnClass += " hover:bg-primary-50 cursor-pointer";
                  }
                } else if (status === "correct") {
                  btnClass += " bg-success/10 border-2 border-success text-success";
                } else {
                  btnClass += " bg-error/10 border-2 border-error text-error opacity-50";
                }

                if (isDisabled) {
                  btnClass += " cursor-default";
                }

                return (
                  <button
                    key={letter}
                    onClick={() => guessLetter(letter)}
                    disabled={isDisabled}
                    className={btnClass}
                    aria-label={`Letter ${letter}${status === "correct" ? ", correct" : status === "wrong" ? ", wrong" : ""}`}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Hint button */}
        {!showHint && phase === "playing" && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setShowHint(true)}
              className="text-base font-semibold text-primary hover:text-primary-dark hover:underline focus:outline-none focus:ring-4 focus:ring-primary/20 rounded-lg px-3 py-1"
            >
              Show Hint
            </button>
          </div>
        )}

        {/* Hint display */}
        {showHint && (
          <div className="mt-4 rounded-xl border border-secondary-light/30 bg-warm-bg p-4 text-center">
            <p className="text-base text-foreground">
              <span className="font-semibold text-secondary-dark">Hint:</span>{" "}
              {wordData.hint}
            </p>
          </div>
        )}
      </div>

      {/* Result section (won/lost) */}
      {renderResult()}

      {/* Inline CSS for animations */}
      <style jsx>{`
        @keyframes hangman-pop {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          60% {
            transform: scale(1.15);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes hangman-shake {
          0%,
          100% {
            transform: translateX(0);
          }
          20% {
            transform: translateX(-3px);
          }
          40% {
            transform: translateX(3px);
          }
          60% {
            transform: translateX(-2px);
          }
          80% {
            transform: translateX(2px);
          }
        }
      `}</style>
    </div>
  );
}
