"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Lightbulb, RotateCcw, Trophy, Undo2 } from "lucide-react";
import { useProgress } from "@/lib/progress/useProgress";

interface SolitaireEngineProps {
  title?: string;
}

// ─── Cards ────────────────────────────────────────────────────────────────────

type Suit = "S" | "H" | "D" | "C";
const SUITS: Suit[] = ["S", "H", "D", "C"];
const SUIT_GLYPH: Record<Suit, string> = { S: "♠", H: "♥", D: "♦", C: "♣" };
const SUIT_COLOR: Record<Suit, "red" | "black"> = { S: "black", C: "black", H: "red", D: "red" };

const RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"] as const;
type Rank = (typeof RANKS)[number];
const RANK_VALUE: Record<Rank, number> = {
  A: 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, J: 11, Q: 12, K: 13,
};

interface Card {
  id: string;
  rank: Rank;
  suit: Suit;
}

function newDeck(): Card[] {
  const deck: Card[] = [];
  for (const s of SUITS) for (const r of RANKS) deck.push({ id: `${r}${s}`, rank: r, suit: s });
  return deck;
}

function shuffle<T>(a: T[]): T[] {
  const out = a.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// ─── Game state ──────────────────────────────────────────────────────────────

interface TableauCard {
  card: Card;
  faceUp: boolean;
}

interface GameState {
  stock: Card[];
  waste: Card[];
  foundations: [Card[], Card[], Card[], Card[]]; // indexed by SUIT_INDEX
  tableau: TableauCard[][]; // 7 columns
}

function deal(): GameState {
  const deck = shuffle(newDeck());
  const tableau: TableauCard[][] = [];
  let i = 0;
  for (let col = 0; col < 7; col++) {
    const column: TableauCard[] = [];
    for (let row = 0; row <= col; row++) {
      column.push({ card: deck[i++], faceUp: row === col });
    }
    tableau.push(column);
  }
  const stock = deck.slice(i);
  return {
    stock,
    waste: [],
    foundations: [[], [], [], []],
    tableau,
  };
}

// ─── Selection + moves ───────────────────────────────────────────────────────

type Source =
  | { kind: "waste" }
  | { kind: "tableau"; col: number; row: number } // move this card + everything below it
  | { kind: "foundation"; idx: number };

type Destination =
  | { kind: "tableau"; col: number }
  | { kind: "foundation"; idx: number };

function canStackOnTableau(moving: Card, onto: Card | null): boolean {
  if (!onto) return moving.rank === "K";
  if (SUIT_COLOR[moving.suit] === SUIT_COLOR[onto.suit]) return false;
  return RANK_VALUE[moving.rank] === RANK_VALUE[onto.rank] - 1;
}

function canPlaceOnFoundation(moving: Card, top: Card | null): boolean {
  if (!top) return moving.rank === "A";
  if (moving.suit !== top.suit) return false;
  return RANK_VALUE[moving.rank] === RANK_VALUE[top.rank] + 1;
}

function getMovingCards(state: GameState, source: Source): Card[] {
  if (source.kind === "waste") {
    const top = state.waste[state.waste.length - 1];
    return top ? [top] : [];
  }
  if (source.kind === "foundation") {
    const pile = state.foundations[source.idx];
    const top = pile[pile.length - 1];
    return top ? [top] : [];
  }
  const col = state.tableau[source.col];
  // Need contiguous face-up suffix starting at row
  const sel = col.slice(source.row);
  if (!sel.every((t) => t.faceUp)) return [];
  return sel.map((t) => t.card);
}

function applyMove(state: GameState, source: Source, dest: Destination): GameState | null {
  const moving = getMovingCards(state, source);
  if (moving.length === 0) return null;

  // Validate dest
  if (dest.kind === "foundation") {
    if (moving.length !== 1) return null; // can only move single to foundation
    const top = state.foundations[dest.idx][state.foundations[dest.idx].length - 1] ?? null;
    if (!canPlaceOnFoundation(moving[0], top)) return null;
  } else {
    const destCol = state.tableau[dest.col];
    const top = destCol.length ? destCol[destCol.length - 1].card : null;
    if (!canStackOnTableau(moving[0], top)) return null;
  }

  // Apply
  const next: GameState = {
    stock: state.stock.slice(),
    waste: state.waste.slice(),
    foundations: [
      state.foundations[0].slice(),
      state.foundations[1].slice(),
      state.foundations[2].slice(),
      state.foundations[3].slice(),
    ],
    tableau: state.tableau.map((c) => c.map((t) => ({ ...t }))),
  };

  // Remove from source
  if (source.kind === "waste") {
    next.waste.pop();
  } else if (source.kind === "foundation") {
    next.foundations[source.idx].pop();
  } else {
    next.tableau[source.col] = next.tableau[source.col].slice(0, source.row);
    // flip new top face-up if there's one
    const col = next.tableau[source.col];
    if (col.length > 0 && !col[col.length - 1].faceUp) {
      col[col.length - 1] = { ...col[col.length - 1], faceUp: true };
    }
  }

  // Add to dest
  if (dest.kind === "foundation") {
    next.foundations[dest.idx].push(moving[0]);
  } else {
    moving.forEach((c) => next.tableau[dest.col].push({ card: c, faceUp: true }));
  }

  return next;
}

// Attempt to auto-route moving cards to any legal destination (foundation preferred)
function autoDestinations(state: GameState, source: Source): Destination[] {
  const moving = getMovingCards(state, source);
  if (moving.length === 0) return [];
  const dests: Destination[] = [];
  // Foundations (only single card moves)
  if (moving.length === 1) {
    for (let i = 0; i < 4; i++) {
      const top = state.foundations[i][state.foundations[i].length - 1] ?? null;
      if (canPlaceOnFoundation(moving[0], top)) dests.push({ kind: "foundation", idx: i });
    }
  }
  // Tableau columns
  for (let col = 0; col < 7; col++) {
    if (source.kind === "tableau" && source.col === col) continue;
    const c = state.tableau[col];
    const top = c.length ? c[c.length - 1].card : null;
    if (canStackOnTableau(moving[0], top)) dests.push({ kind: "tableau", col });
  }
  return dests;
}

function findAnyLegalMove(state: GameState): { source: Source; dest: Destination } | null {
  const sources: Source[] = [];
  if (state.waste.length) sources.push({ kind: "waste" });
  for (let col = 0; col < 7; col++) {
    const c = state.tableau[col];
    // any face-up card in this column can be a source
    for (let r = 0; r < c.length; r++) {
      if (c[r].faceUp) sources.push({ kind: "tableau", col, row: r });
    }
  }
  for (const src of sources) {
    const dests = autoDestinations(state, src);
    if (dests.length) return { source: src, dest: dests[0] };
  }
  return null;
}

function isWon(state: GameState): boolean {
  return state.foundations.every((p) => p.length === 13);
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function SolitaireEngine({ title = "Solitaire" }: SolitaireEngineProps) {
  const [state, setState] = useState<GameState>(() => deal());
  const [history, setHistory] = useState<GameState[]>([]);
  const [selected, setSelected] = useState<Source | null>(null);
  const [hint, setHint] = useState<{ source: Source; dest: Destination } | null>(null);
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const recordedRef = useRef(false);
  const { recordPlay } = useProgress();

  const won = useMemo(() => isWon(state), [state]);

  useEffect(() => {
    if (won && !recordedRef.current) {
      recordedRef.current = true;
      recordPlay({
        slug: "klondike-solitaire",
        category: "memory-games",
        score: 100,
        totalQuestions: 52,
        correctAnswers: 52,
        timeSpentMs: Date.now() - startedAt,
        isDaily: false,
        isPerfect: history.length <= 60, // heuristic: "efficient win" = few moves
      });
    }
  }, [won, recordPlay, history.length, startedAt]);

  // clear hint
  useEffect(() => {
    if (!hint) return;
    const id = window.setTimeout(() => setHint(null), 2200);
    return () => window.clearTimeout(id);
  }, [hint]);

  const pushHistory = useCallback((prev: GameState) => {
    setHistory((h) => [...h.slice(-40), prev]);
  }, []);

  const reset = () => {
    setState(deal());
    setHistory([]);
    setSelected(null);
    setHint(null);
    setStartedAt(Date.now());
    recordedRef.current = false;
  };

  const undo = () => {
    setHistory((h) => {
      if (h.length === 0) return h;
      const prev = h[h.length - 1];
      setState(prev);
      setSelected(null);
      setHint(null);
      return h.slice(0, -1);
    });
  };

  const commitMove = useCallback(
    (source: Source, dest: Destination) => {
      const next = applyMove(state, source, dest);
      if (!next) return false;
      pushHistory(state);
      setState(next);
      setSelected(null);
      setHint(null);
      return true;
    },
    [state, pushHistory],
  );

  const onStockClick = () => {
    pushHistory(state);
    if (state.stock.length === 0) {
      // recycle waste -> stock
      setState({
        ...state,
        stock: state.waste.slice().reverse(),
        waste: [],
      });
    } else {
      const top = state.stock[state.stock.length - 1];
      setState({
        ...state,
        stock: state.stock.slice(0, -1),
        waste: [...state.waste, top],
      });
    }
    setSelected(null);
    setHint(null);
  };

  // Clicking a card/pile: if nothing selected, select it (if it has movable cards).
  // If something selected, try to move selection to this target.
  const onTap = (target: Source | Destination, isSourceCandidate: boolean) => {
    // If a source is already selected, try to move it to target
    if (selected) {
      // Same-slot click → deselect
      if (
        isSourceCandidate &&
        (target as Source).kind === selected.kind &&
        JSON.stringify(target) === JSON.stringify(selected)
      ) {
        setSelected(null);
        return;
      }
      const dest: Destination | null =
        (target as Destination).kind === "foundation" || (target as Destination).kind === "tableau"
          ? (target as Destination)
          : null;
      if (dest) {
        const moved = commitMove(selected, dest);
        if (moved) return;
      }
      // if move didn't work, fall through to maybe re-select on source-capable target
      if (isSourceCandidate) {
        setSelected(target as Source);
        return;
      }
      setSelected(null);
      return;
    }
    // No selection yet — make one if target is a valid source with movable cards
    if (isSourceCandidate) {
      const src = target as Source;
      if (getMovingCards(state, src).length > 0) {
        setSelected(src);
      }
    }
  };

  const onDoubleClick = (source: Source) => {
    const dests = autoDestinations(state, source);
    // prefer foundation
    const foundation = dests.find((d) => d.kind === "foundation");
    if (foundation) {
      commitMove(source, foundation);
      return;
    }
    if (dests.length === 1) commitMove(source, dests[0]);
  };

  const showHint = () => setHint(findAnyLegalMove(state));

  // ─ Render helpers ──────────────────────────────────────────────────────────
  const CARD_W = 72;
  const CARD_H = 104;
  const STACK_OFFSET_UP = 28;   // face-up tableau card offset
  const STACK_OFFSET_DOWN = 14; // face-down tableau card offset

  const isHintSource = (src: Source) =>
    hint && JSON.stringify(hint.source) === JSON.stringify(src);
  const isHintDest = (dst: Destination) =>
    hint && JSON.stringify(hint.dest) === JSON.stringify(dst);

  const renderCard = (
    card: Card,
    opts: {
      faceUp: boolean;
      selected?: boolean;
      hinted?: boolean;
      key: string;
      top?: number;
      left?: number;
      absolute?: boolean;
      onClick?: () => void;
      onDoubleClick?: () => void;
      ariaLabel?: string;
    },
  ) => {
    const color = SUIT_COLOR[card.suit] === "red" ? "#B54A2B" : "#1A2520";
    return (
      <button
        key={opts.key}
        type="button"
        onClick={opts.onClick}
        onDoubleClick={opts.onDoubleClick}
        aria-label={opts.ariaLabel ?? `${card.rank} of ${card.suit}`}
        className="flex flex-col rounded-lg border-2 px-1.5 py-1 text-left transition-all"
        style={{
          position: opts.absolute ? "absolute" : "relative",
          top: opts.top,
          left: opts.left,
          width: CARD_W,
          height: CARD_H,
          background: opts.faceUp ? "#FFFFFF" : "linear-gradient(135deg, #1F6E4A 0%, #2F9966 100%)",
          borderColor: opts.selected
            ? "var(--color-primary)"
            : opts.hinted
              ? "var(--color-accent-warm)"
              : opts.faceUp
                ? "#D9D2C2"
                : "#124A30",
          boxShadow: opts.selected
            ? "0 0 0 3px var(--color-primary-200), 0 4px 8px rgba(26,37,32,0.2)"
            : "0 2px 4px rgba(26,37,32,0.15)",
          cursor: "pointer",
        }}
      >
        {opts.faceUp ? (
          <>
            <div className="flex items-center justify-between" style={{ color }}>
              <span
                className="font-bold leading-none"
                style={{ fontFamily: "var(--font-merriweather), var(--font-heading)", fontSize: 18 }}
              >
                {card.rank}
              </span>
              <span className="text-xl leading-none">{SUIT_GLYPH[card.suit]}</span>
            </div>
            <div className="mt-auto flex justify-center text-4xl" style={{ color }}>
              <span aria-hidden="true">{SUIT_GLYPH[card.suit]}</span>
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-2xl text-white opacity-80">
            ✦
          </div>
        )}
      </button>
    );
  };

  const emptySlot = (
    onClick: () => void,
    hinted: boolean,
    label: string,
    glyph?: string,
  ) => (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex items-center justify-center rounded-lg border-2 border-dashed transition-all"
      style={{
        width: CARD_W,
        height: CARD_H,
        borderColor: hinted ? "var(--color-accent-warm)" : "#D9D2C2",
        background: hinted ? "rgba(192,138,26,0.10)" : "rgba(255,255,255,0.35)",
        color: "var(--color-text-light)",
        fontSize: 28,
      }}
    >
      {glyph ?? ""}
    </button>
  );

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6">
      {/* Header */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h1
          className="text-2xl font-bold text-foreground sm:text-3xl"
          style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
        >
          {title}
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={undo}
            disabled={history.length === 0 || won}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-foreground hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Undo2 size={16} /> Undo
          </button>
          <button
            type="button"
            onClick={showHint}
            disabled={won}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-foreground hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Lightbulb size={16} /> Hint
          </button>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-foreground hover:border-primary hover:text-primary"
          >
            <RotateCcw size={16} /> New game
          </button>
        </div>
      </div>

      {/* Top row: stock, waste, foundations */}
      <div className="mb-5 overflow-x-auto rounded-2xl border border-border p-4" style={{ background: "linear-gradient(180deg, rgba(31,110,74,0.04) 0%, rgba(192,138,26,0.04) 100%)" }}>
        <div className="flex items-start gap-3" style={{ minWidth: CARD_W * 7 + 48 }}>
          {/* Stock */}
          <div className="flex flex-col items-center gap-1" style={{ width: CARD_W }}>
            {state.stock.length > 0 ? (
              <button
                type="button"
                onClick={onStockClick}
                aria-label={`Stock pile, ${state.stock.length} cards`}
                className="flex items-center justify-center rounded-lg border-2 text-2xl text-white"
                style={{
                  width: CARD_W,
                  height: CARD_H,
                  background: "linear-gradient(135deg, #1F6E4A 0%, #2F9966 100%)",
                  borderColor: "#124A30",
                  boxShadow: "0 2px 4px rgba(26,37,32,0.15)",
                }}
              >
                ✦
              </button>
            ) : (
              emptySlot(onStockClick, false, "Recycle waste to stock", "↻")
            )}
            <span className="text-xs tabular-nums text-text-muted">Stock</span>
          </div>

          {/* Waste */}
          <div className="flex flex-col items-center gap-1" style={{ width: CARD_W }}>
            {state.waste.length > 0
              ? renderCard(state.waste[state.waste.length - 1], {
                  faceUp: true,
                  key: "waste-top",
                  selected: selected?.kind === "waste",
                  hinted: !!isHintSource({ kind: "waste" }),
                  onClick: () => onTap({ kind: "waste" }, true),
                  onDoubleClick: () => onDoubleClick({ kind: "waste" }),
                  ariaLabel: `Waste top card: ${state.waste[state.waste.length - 1].rank} of ${state.waste[state.waste.length - 1].suit}`,
                })
              : emptySlot(() => {}, false, "Waste pile (empty)")}
            <span className="text-xs tabular-nums text-text-muted">Waste</span>
          </div>

          {/* spacer */}
          <div style={{ width: 24 }} />

          {/* Foundations */}
          {state.foundations.map((pile, i) => {
            const top = pile[pile.length - 1];
            const suitLabel = SUITS[i];
            return (
              <div key={i} className="flex flex-col items-center gap-1" style={{ width: CARD_W }}>
                {top
                  ? renderCard(top, {
                      faceUp: true,
                      key: `found-${i}`,
                      selected: selected?.kind === "foundation" && selected.idx === i,
                      hinted: !!(isHintDest({ kind: "foundation", idx: i }) || isHintSource({ kind: "foundation", idx: i })),
                      onClick: () => onTap({ kind: "foundation", idx: i }, true),
                      onDoubleClick: () => onDoubleClick({ kind: "foundation", idx: i }),
                    })
                  : emptySlot(
                      () => onTap({ kind: "foundation", idx: i }, false),
                      !!isHintDest({ kind: "foundation", idx: i }),
                      `Foundation ${suitLabel}`,
                      SUIT_GLYPH[suitLabel],
                    )}
                <span className="text-xs tabular-nums text-text-muted">{SUIT_GLYPH[suitLabel]}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tableau */}
      <div className="overflow-x-auto rounded-2xl border border-border bg-surface p-4">
        <div className="flex items-start gap-3" style={{ minWidth: CARD_W * 7 + 40 }}>
          {state.tableau.map((col, colIdx) => {
            const colHeight = Math.max(
              CARD_H,
              CARD_H +
                col.reduce((acc, tc) => acc + (tc.faceUp ? STACK_OFFSET_UP : STACK_OFFSET_DOWN), 0) -
                (col.length > 0 ? (col[col.length - 1].faceUp ? STACK_OFFSET_UP : STACK_OFFSET_DOWN) : 0),
            );
            return (
              <div
                key={colIdx}
                className="relative"
                style={{ width: CARD_W, minHeight: colHeight }}
              >
                {col.length === 0 &&
                  emptySlot(
                    () => onTap({ kind: "tableau", col: colIdx }, false),
                    !!isHintDest({ kind: "tableau", col: colIdx }),
                    `Tableau column ${colIdx + 1} (empty, drop King here)`,
                    "K",
                  )}
                {col.map((tc, rowIdx) => {
                  let top = 0;
                  for (let r = 0; r < rowIdx; r++) {
                    top += col[r].faceUp ? STACK_OFFSET_UP : STACK_OFFSET_DOWN;
                  }
                  const src: Source = { kind: "tableau", col: colIdx, row: rowIdx };
                  const isSelected =
                    selected?.kind === "tableau" &&
                    selected.col === colIdx &&
                    selected.row <= rowIdx;
                  const isDropTarget =
                    rowIdx === col.length - 1 && !!isHintDest({ kind: "tableau", col: colIdx });
                  return renderCard(tc.card, {
                    faceUp: tc.faceUp,
                    absolute: true,
                    top,
                    left: 0,
                    selected: isSelected,
                    hinted: !!isHintSource(src) || isDropTarget,
                    key: `t-${colIdx}-${rowIdx}`,
                    onClick: () => {
                      if (!tc.faceUp) return;
                      onTap(src, true);
                    },
                    onDoubleClick: () => {
                      if (!tc.faceUp) return;
                      onDoubleClick(src);
                    },
                  });
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Help */}
      <div className="mt-4 text-center text-sm text-text-muted">
        Tap a card to select it, then tap a destination. Double-tap to send to the nearest legal
        spot. Build foundations up by suit from Ace to King.
      </div>

      {/* Win */}
      {won && (
        <div
          className="mt-6 rounded-2xl border-2 p-6 text-center"
          style={{
            borderColor: "var(--color-primary)",
            background:
              "linear-gradient(135deg, rgba(31,110,74,0.08) 0%, rgba(192,138,26,0.08) 100%)",
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
            You won!
          </h2>
          <p className="mb-4 text-lg text-text-muted">All 52 cards home on the foundations.</p>
          <button
            type="button"
            onClick={reset}
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
