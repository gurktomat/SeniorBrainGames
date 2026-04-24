"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Play, Pause, RotateCcw, Trophy, Volume2, VolumeX } from "lucide-react";
import { useProgress } from "@/lib/progress/useProgress";

interface BingoEngineProps {
  title?: string;
}

type Phase = "ready" | "playing" | "won";

type WinPattern = "line" | "blackout";

interface WinInfo {
  pattern: WinPattern;
  cells: number[]; // flat indices of winning cells (0..24)
}

const COLUMN_RANGES: Array<[number, number]> = [
  [1, 15],   // B
  [16, 30],  // I
  [31, 45],  // N
  [46, 60],  // G
  [61, 75],  // O
];

// ─── Card generation ─────────────────────────────────────────────────────────

function generateCard(): number[] {
  // 5x5 column-major: card[col][row]
  const card: number[] = [];
  for (let col = 0; col < 5; col++) {
    const [min, max] = COLUMN_RANGES[col];
    const pool: number[] = [];
    for (let n = min; n <= max; n++) pool.push(n);
    // shuffle
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    // pick 5, place at [row*5 + col]
    for (let row = 0; row < 5; row++) {
      card[row * 5 + col] = pool[row];
    }
  }
  // FREE center (index 12)
  card[12] = 0;
  return card;
}

function columnLetter(n: number): string {
  if (n <= 15) return "B";
  if (n <= 30) return "I";
  if (n <= 45) return "N";
  if (n <= 60) return "G";
  return "O";
}

// All 12 standard "line" win patterns: 5 rows, 5 columns, 2 diagonals
const LINE_PATTERNS: number[][] = (() => {
  const rows = [0, 1, 2, 3, 4].map((r) => [r * 5, r * 5 + 1, r * 5 + 2, r * 5 + 3, r * 5 + 4]);
  const cols = [0, 1, 2, 3, 4].map((c) => [c, c + 5, c + 10, c + 15, c + 20]);
  const diag1 = [0, 6, 12, 18, 24];
  const diag2 = [4, 8, 12, 16, 20];
  return [...rows, ...cols, diag1, diag2];
})();

function checkWin(card: number[], marks: Set<number>): WinInfo | null {
  // blackout first (rarer, bigger)
  const allMarked = card.every((n) => n === 0 || marks.has(n));
  if (allMarked) {
    return { pattern: "blackout", cells: Array.from({ length: 25 }, (_, i) => i) };
  }
  for (const line of LINE_PATTERNS) {
    const won = line.every((i) => card[i] === 0 || marks.has(card[i]));
    if (won) return { pattern: "line", cells: line };
  }
  return null;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function BingoEngine({ title = "Bingo" }: BingoEngineProps) {
  type UserPhase = "ready" | "playing";
  const [userPhase, setUserPhase] = useState<UserPhase>("ready");
  const [card, setCard] = useState<number[]>(() => generateCard());
  const [drawn, setDrawn] = useState<number[]>([]); // order of draws
  const [marks, setMarks] = useState<Set<number>>(() => new Set());
  const [autoDraw, setAutoDraw] = useState(true);
  const [paused, setPaused] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const recordedRef = useRef(false);
  const { recordPlay } = useProgress();

  const drawnSet = useMemo(() => new Set(drawn), [drawn]);

  // Win is a derived computation — no setState-in-effect cascade needed.
  const win = useMemo(
    () => (userPhase === "playing" ? checkWin(card, marks) : null),
    [card, marks, userPhase],
  );
  const phase: Phase = win ? "won" : userPhase;
  const currentBall = drawn[drawn.length - 1];

  const resetGame = useCallback(() => {
    setCard(generateCard());
    setDrawn([]);
    setMarks(new Set());
    setUserPhase("ready");
    setPaused(false);
    setStartedAt(null);
    recordedRef.current = false;
  }, []);

  const drawOne = useCallback(() => {
    setDrawn((prev) => {
      if (prev.length >= 75) return prev;
      const remaining: number[] = [];
      const drawnS = new Set(prev);
      for (let n = 1; n <= 75; n++) if (!drawnS.has(n)) remaining.push(n);
      if (remaining.length === 0) return prev;
      const next = remaining[Math.floor(Math.random() * remaining.length)];

      // play a gentle beep if sound on
      if (soundOn && typeof window !== "undefined" && "AudioContext" in window) {
        try {
          const AC = (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext);
          const ctx = new AC();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.value = 660;
          gain.gain.setValueAtTime(0.0001, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
          osc.connect(gain).connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.2);
        } catch {
          /* no-op */
        }
      }

      return [...prev, next];
    });
  }, [soundOn]);

  // Auto-draw ticker (3s between balls)
  useEffect(() => {
    if (phase !== "playing" || !autoDraw || paused || win) return;
    const id = window.setInterval(() => drawOne(), 3000);
    return () => window.clearInterval(id);
  }, [phase, autoDraw, paused, win, drawOne]);

  const onStart = () => {
    setUserPhase("playing");
    setStartedAt(Date.now());
  };

  // Record a completed game exactly once
  useEffect(() => {
    if (win && !recordedRef.current) {
      recordedRef.current = true;
      recordPlay({
        slug: "bingo",
        category: "memory-games",
        score: 100,
        totalQuestions: 1,
        correctAnswers: 1,
        timeSpentMs: startedAt ? Date.now() - startedAt : 0,
        isDaily: false,
        isPerfect: win.pattern === "blackout",
      });
    }
  }, [win, recordPlay, startedAt]);

  const onTapCell = (idx: number) => {
    if (phase !== "playing") return;
    const n = card[idx];
    if (n === 0) return; // FREE
    if (!drawnSet.has(n)) return; // can't mark un-called numbers
    setMarks((prev) => {
      const next = new Set(prev);
      if (next.has(n)) next.delete(n);
      else next.add(n);
      return next;
    });
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1
          className="text-2xl font-bold text-foreground sm:text-3xl"
          style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
        >
          {title}
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSoundOn((s) => !s)}
            aria-label={soundOn ? "Mute draw sound" : "Enable draw sound"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-text-muted hover:text-primary"
          >
            {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
          <label className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 text-sm font-semibold text-foreground">
            <input
              type="checkbox"
              checked={autoDraw}
              onChange={(e) => setAutoDraw(e.target.checked)}
              className="h-4 w-4 accent-[var(--color-primary)]"
            />
            Auto-draw
          </label>
          <button
            type="button"
            onClick={resetGame}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-foreground hover:border-primary hover:text-primary"
          >
            <RotateCcw size={16} /> New card
          </button>
        </div>
      </div>

      {/* Current ball + status */}
      <div className="mb-6 flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface p-6 sm:flex-row sm:justify-between sm:gap-6">
        <div className="flex items-center gap-4">
          <div
            className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-full text-white shadow-md"
            style={{
              background: "var(--gradient-primary)",
              fontFamily: "var(--font-merriweather), var(--font-heading)",
            }}
            aria-live="polite"
          >
            {currentBall ? (
              <>
                <span className="text-xs font-bold opacity-80">{columnLetter(currentBall)}</span>
                <span className="text-3xl font-bold leading-none">{currentBall}</span>
              </>
            ) : (
              <span className="text-sm font-semibold">Ready</span>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-widest text-text-muted">
              Current ball
            </p>
            <p className="text-base text-foreground">
              {drawn.length === 0
                ? "Press Start to begin the draw."
                : `Ball ${drawn.length} of 75`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {phase === "ready" && (
            <button
              type="button"
              onClick={onStart}
              className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-base font-bold text-white"
              style={{
                background: "var(--gradient-primary)",
                boxShadow: "0 6px 16px rgba(31,110,74,0.25)",
              }}
            >
              <Play size={18} /> Start
            </button>
          )}
          {phase === "playing" && (
            <>
              {!autoDraw && (
                <button
                  type="button"
                  onClick={drawOne}
                  className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-base font-bold text-white"
                  style={{
                    background: "var(--gradient-primary)",
                    boxShadow: "0 6px 16px rgba(31,110,74,0.25)",
                  }}
                >
                  <Play size={18} /> Draw next
                </button>
              )}
              {autoDraw && (
                <button
                  type="button"
                  onClick={() => setPaused((p) => !p)}
                  className="inline-flex items-center gap-2 rounded-lg border-2 px-5 py-[10px] text-base font-bold"
                  style={{ borderColor: "var(--color-primary)", color: "var(--color-primary)" }}
                >
                  {paused ? <><Play size={18} /> Resume</> : <><Pause size={18} /> Pause</>}
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Bingo card */}
      <div className="mb-6 rounded-2xl border border-border bg-surface p-4 sm:p-6">
        <div className="mb-3 grid grid-cols-5 gap-2 text-center">
          {["B", "I", "N", "G", "O"].map((l) => (
            <div
              key={l}
              className="rounded-lg py-2 text-2xl font-bold text-white"
              style={{
                background: "var(--gradient-primary)",
                fontFamily: "var(--font-merriweather), var(--font-heading)",
              }}
            >
              {l}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-5 gap-2">
          {card.map((n, idx) => {
            const isFree = n === 0;
            const isCalled = !isFree && drawnSet.has(n);
            const isMarked = isFree || marks.has(n);
            const isWinCell = win?.cells.includes(idx);
            return (
              <button
                key={idx}
                type="button"
                onClick={() => onTapCell(idx)}
                disabled={!isFree && !isCalled}
                aria-pressed={isMarked}
                aria-label={isFree ? "Free space" : `Number ${n}${isCalled ? ", called" : ", not called"}${isMarked ? ", marked" : ""}`}
                className="relative aspect-square rounded-xl border-2 text-2xl font-bold transition-all sm:text-3xl"
                style={{
                  background: isWinCell
                    ? "var(--gradient-primary)"
                    : isMarked
                      ? "var(--color-primary-100)"
                      : "var(--color-surface)",
                  borderColor: isWinCell
                    ? "var(--color-primary)"
                    : isMarked
                      ? "var(--color-primary)"
                      : "var(--color-border)",
                  color: isWinCell
                    ? "#fff"
                    : isMarked
                      ? "var(--color-primary-dark)"
                      : isCalled
                        ? "var(--color-text)"
                        : "var(--color-text-muted)",
                  fontFamily: "var(--font-merriweather), var(--font-heading)",
                  cursor: isFree || isCalled ? "pointer" : "default",
                  opacity: !isFree && !isCalled && !isMarked ? 0.85 : 1,
                }}
              >
                {isFree ? "★" : n}
                {isMarked && !isWinCell && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-2 rounded-full border-[3px]"
                    style={{ borderColor: "var(--color-accent)" }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Called numbers log */}
      <div className="mb-6 rounded-2xl border border-border bg-surface p-4">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-text-muted">
          Called ({drawn.length}/75)
        </p>
        {drawn.length === 0 ? (
          <p className="text-sm text-text-light">Numbers will appear here as they&apos;re drawn.</p>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {drawn.map((n) => (
              <span
                key={n}
                className="inline-flex h-8 min-w-[2.5rem] items-center justify-center rounded-md border border-border bg-background px-2 text-sm font-bold tabular-nums text-foreground"
              >
                {columnLetter(n)}-{n}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Win celebration */}
      {phase === "won" && win && (
        <div
          className="rounded-2xl border-2 p-6 text-center"
          style={{
            borderColor: "var(--color-primary)",
            background: "linear-gradient(135deg, rgba(31,110,74,0.08) 0%, rgba(192,138,26,0.08) 100%)",
          }}
        >
          <Trophy
            size={48}
            className="mx-auto mb-3"
            style={{ color: "var(--color-accent-warm)" }}
            strokeWidth={1.8}
          />
          <h2
            className="mb-1 text-3xl font-bold text-foreground"
            style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
          >
            BINGO!
          </h2>
          <p className="mb-4 text-lg text-text-muted">
            {win.pattern === "blackout"
              ? "Blackout! Every number on your card was called."
              : `You won in ${drawn.length} ${drawn.length === 1 ? "ball" : "balls"}.`}
          </p>
          <button
            type="button"
            onClick={resetGame}
            className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-base font-bold text-white"
            style={{
              background: "var(--gradient-primary)",
              boxShadow: "0 6px 16px rgba(31,110,74,0.25)",
            }}
          >
            <RotateCcw size={18} /> Play again
          </button>
        </div>
      )}
    </div>
  );
}
