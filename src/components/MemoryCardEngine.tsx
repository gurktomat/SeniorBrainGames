"use client";

import { useState, useCallback, useEffect } from "react";

interface Pair {
  emoji: string;
  label: string;
}

interface Level {
  id: string;
  name: string;
  gridSize: string;
  pairs: Pair[];
}

interface Card {
  id: number;
  emoji: string;
  label: string;
  flipped: boolean;
  matched: boolean;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function MemoryCardEngine({
  title,
  levels,
}: {
  title: string;
  levels: Level[];
}) {
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [finished, setFinished] = useState(false);

  const startLevel = useCallback((level: Level) => {
    setSelectedLevel(level);
    const allCards: Card[] = shuffleArray(
      level.pairs.flatMap((pair, idx) => [
        { id: idx * 2, emoji: pair.emoji, label: pair.label, flipped: false, matched: false },
        { id: idx * 2 + 1, emoji: pair.emoji, label: pair.label, flipped: false, matched: false },
      ]),
    );
    setCards(allCards);
    setFlippedIds([]);
    setMoves(0);
    setMatchedPairs(0);
    setFinished(false);
  }, []);

  const handleCardClick = useCallback(
    (cardId: number) => {
      if (flippedIds.length >= 2) return;
      const card = cards.find((c) => c.id === cardId);
      if (!card || card.flipped || card.matched) return;

      const newFlipped = [...flippedIds, cardId];
      setFlippedIds(newFlipped);
      setCards((prev) =>
        prev.map((c) => (c.id === cardId ? { ...c, flipped: true } : c)),
      );

      if (newFlipped.length === 2) {
        setMoves((m) => m + 1);
        const [firstId, secondId] = newFlipped;
        const first = cards.find((c) => c.id === firstId)!;
        const second = cards.find((c) => c.id === secondId)!;

        if (first.emoji === second.emoji) {
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                c.id === firstId || c.id === secondId
                  ? { ...c, matched: true }
                  : c,
              ),
            );
            setFlippedIds([]);
            setMatchedPairs((p) => {
              const newP = p + 1;
              if (selectedLevel && newP === selectedLevel.pairs.length) {
                setFinished(true);
              }
              return newP;
            });
          }, 500);
        } else {
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                c.id === firstId || c.id === secondId
                  ? { ...c, flipped: false }
                  : c,
              ),
            );
            setFlippedIds([]);
          }, 1000);
        }
      }
    },
    [cards, flippedIds, selectedLevel],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedLevel || finished) return;
      const unmatched = cards.filter((c) => !c.matched && !c.flipped);
      if (e.key >= "1" && e.key <= "9") {
        const idx = parseInt(e.key) - 1;
        if (idx < unmatched.length) {
          handleCardClick(unmatched[idx].id);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cards, selectedLevel, finished, handleCardClick]);

  if (!selectedLevel) {
    return (
      <div className="mx-auto w-full max-w-2xl">
        <h1
          className="mb-6 text-2xl font-bold text-foreground"
          style={{
            fontFamily: "var(--font-merriweather), var(--font-heading)",
          }}
        >
          {title}
        </h1>
        <p className="mb-6 text-lg text-text-muted">Choose a difficulty level:</p>
        <div className="flex flex-col gap-4">
          {levels.map((level) => (
            <button
              key={level.id}
              onClick={() => startLevel(level)}
              className="w-full cursor-pointer rounded-xl border-2 border-border bg-surface px-6 py-5 text-left text-xl font-semibold text-foreground transition-all hover:border-primary hover:bg-primary/5 focus:outline-none focus:ring-4 focus:ring-primary/30"
            >
              {level.name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="mx-auto w-full max-w-2xl text-center">
        <div className="rounded-2xl bg-surface p-8 shadow-sm">
          <h2
            className="mb-2 text-3xl font-bold text-foreground"
            style={{
              fontFamily: "var(--font-merriweather), var(--font-heading)",
            }}
          >
            All Pairs Found!
          </h2>
          <p className="mb-6 text-xl text-text-muted">
            You completed it in {moves} moves
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={() => startLevel(selectedLevel)}
              className="cursor-pointer rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary/30"
            >
              Play Again
            </button>
            <button
              onClick={() => setSelectedLevel(null)}
              className="cursor-pointer rounded-xl border-2 border-border px-8 py-4 text-lg font-semibold text-foreground transition-colors hover:bg-background focus:outline-none focus:ring-4 focus:ring-primary/30"
            >
              Choose Level
            </button>
          </div>
        </div>
      </div>
    );
  }

  const gridCols =
    selectedLevel.gridSize === "small"
      ? "grid-cols-3 sm:grid-cols-4"
      : selectedLevel.gridSize === "medium"
        ? "grid-cols-4"
        : "grid-cols-4 sm:grid-cols-5";

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-6 flex items-center justify-between">
        <h1
          className="text-2xl font-bold text-foreground"
          style={{
            fontFamily: "var(--font-merriweather), var(--font-heading)",
          }}
        >
          {title}
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-lg text-text-muted">
            Pairs: {matchedPairs}/{selectedLevel.pairs.length}
          </span>
          <span className="rounded-full bg-primary/10 px-4 py-2 text-lg font-semibold text-primary">
            Moves: {moves}
          </span>
        </div>
      </div>

      <div className={`grid ${gridCols} gap-3`} role="grid" aria-label="Memory card grid">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            disabled={card.flipped || card.matched}
            aria-label={
              card.flipped || card.matched
                ? card.label
                : "Hidden card"
            }
            className={`aspect-square cursor-pointer rounded-xl text-4xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/30 ${
              card.matched
                ? "border-2 border-success/30 bg-success/10"
                : card.flipped
                  ? "border-2 border-primary bg-surface"
                  : "border-2 border-border bg-primary/10 hover:bg-primary/20"
            }`}
          >
            {card.flipped || card.matched ? (
              <span role="img" aria-label={card.label}>
                {card.emoji}
              </span>
            ) : (
              <span className="text-2xl text-primary/40">?</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
