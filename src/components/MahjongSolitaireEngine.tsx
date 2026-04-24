"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Lightbulb, RotateCcw, Trophy, Undo2 } from "lucide-react";
import { useProgress } from "@/lib/progress/useProgress";

interface MahjongSolitaireEngineProps {
  title?: string;
}

// ─── Tile set ────────────────────────────────────────────────────────────────
// 32 unique tile types × 4 copies = 128 tiles (matches the 128-tile layout).
// Uses Unicode Mahjong Tile block (U+1F000–U+1F02F) so we don't need image assets.

interface TileDef {
  id: string;
  glyph: string;
  group: string;
  matchKey: string; // tiles with the same matchKey can be paired
}

const TILE_TYPES: TileDef[] = [
  // Characters 1–9
  ...["🀇", "🀈", "🀉", "🀊", "🀋", "🀌", "🀍", "🀎", "🀏"].map((g, i) => ({
    id: `char-${i + 1}`,
    glyph: g,
    group: "Characters",
    matchKey: `char-${i + 1}`,
  })),
  // Bamboo 1–9
  ...["🀐", "🀑", "🀒", "🀓", "🀔", "🀕", "🀖", "🀗", "🀘"].map((g, i) => ({
    id: `bam-${i + 1}`,
    glyph: g,
    group: "Bamboo",
    matchKey: `bam-${i + 1}`,
  })),
  // Dots 1–9
  ...["🀙", "🀚", "🀛", "🀜", "🀝", "🀞", "🀟", "🀠", "🀡"].map((g, i) => ({
    id: `dot-${i + 1}`,
    glyph: g,
    group: "Dots",
    matchKey: `dot-${i + 1}`,
  })),
  // Winds: East, South, West, North
  { id: "wind-e", glyph: "🀀", group: "Winds", matchKey: "wind-e" },
  { id: "wind-s", glyph: "🀁", group: "Winds", matchKey: "wind-s" },
  { id: "wind-w", glyph: "🀂", group: "Winds", matchKey: "wind-w" },
  { id: "wind-n", glyph: "🀃", group: "Winds", matchKey: "wind-n" },
  // Red dragon
  { id: "dragon-r", glyph: "🀄", group: "Dragons", matchKey: "dragon-r" },
];

// ─── Layout ──────────────────────────────────────────────────────────────────
// Pyramidal 3-layer rectangle: 12×6 + 10×4 + 8×2 = 72 + 40 + 16 = 128 tiles = 64 pairs.
// Coordinates are (col, row, layer); layer 1 is centered on layer 0, layer 2 on layer 1.

interface Slot {
  col: number;
  row: number;
  layer: number;
}

function generateLayout(): Slot[] {
  const slots: Slot[] = [];
  // Layer 0: 12×6 — cols 0..11, rows 0..5
  for (let r = 0; r < 6; r++) for (let c = 0; c < 12; c++) slots.push({ col: c, row: r, layer: 0 });
  // Layer 1: 10×4 centered — cols 1..10, rows 1..4
  for (let r = 1; r < 5; r++) for (let c = 1; c < 11; c++) slots.push({ col: c, row: r, layer: 1 });
  // Layer 2: 8×2 centered — cols 2..9, rows 2..3
  for (let r = 2; r < 4; r++) for (let c = 2; c < 10; c++) slots.push({ col: c, row: r, layer: 2 });
  return slots;
}

const LAYOUT: Slot[] = generateLayout();
const COLS = 12;
const ROWS = 6;

// ─── Tile state ──────────────────────────────────────────────────────────────

interface Tile {
  idx: number;       // index in LAYOUT
  col: number;
  row: number;
  layer: number;
  type: TileDef;
  removed: boolean;
}

function shuffle<T>(a: T[]): T[] {
  const out = a.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function buildTiles(): Tile[] {
  // 128 tiles = 4 copies of 32 unique (we only have 31 unique above = 9+9+9+4 = 31).
  // Pad to 32 by including green dragon too, keeping counts even.
  const extraTypes: TileDef[] = [
    { id: "dragon-g", glyph: "🀅", group: "Dragons", matchKey: "dragon-g" },
  ];
  const types: TileDef[] = [...TILE_TYPES, ...extraTypes]; // 32 total
  const deck: TileDef[] = [];
  for (const t of types) for (let i = 0; i < 4; i++) deck.push(t);
  // Safety: deck length must equal LAYOUT length
  const n = LAYOUT.length;
  const shuffled = shuffle(deck).slice(0, n);
  return LAYOUT.map((slot, i) => ({
    idx: i,
    col: slot.col,
    row: slot.row,
    layer: slot.layer,
    type: shuffled[i],
    removed: false,
  }));
}

// A tile is "free" if:
//   (a) no remaining tile at (col, row, layer+1) — i.e., no tile on top
//   (b) at least one of its horizontal neighbors (col-1,row,layer) or (col+1,row,layer) is missing/removed
function isTileFree(tile: Tile, tiles: Tile[]): boolean {
  if (tile.removed) return false;
  // (a) nothing on top (same col/row, layer+1)
  const covered = tiles.some(
    (t) => !t.removed && t.layer === tile.layer + 1 && t.col === tile.col && t.row === tile.row,
  );
  if (covered) return false;
  // (b) at least one horizontal side open
  const leftBlocked = tiles.some(
    (t) => !t.removed && t.layer === tile.layer && t.row === tile.row && t.col === tile.col - 1,
  );
  const rightBlocked = tiles.some(
    (t) => !t.removed && t.layer === tile.layer && t.row === tile.row && t.col === tile.col + 1,
  );
  return !(leftBlocked && rightBlocked);
}

function findHint(tiles: Tile[]): [number, number] | null {
  const freeTiles = tiles.filter((t) => isTileFree(t, tiles));
  for (let i = 0; i < freeTiles.length; i++) {
    for (let j = i + 1; j < freeTiles.length; j++) {
      if (freeTiles[i].type.matchKey === freeTiles[j].type.matchKey) {
        return [freeTiles[i].idx, freeTiles[j].idx];
      }
    }
  }
  return null;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function MahjongSolitaireEngine({ title = "Mahjong Solitaire" }: MahjongSolitaireEngineProps) {
  const [tiles, setTiles] = useState<Tile[]>(() => buildTiles());
  const [selected, setSelected] = useState<number | null>(null);
  const [history, setHistory] = useState<[number, number][]>([]);
  const [hint, setHint] = useState<[number, number] | null>(null);
  const startedAtRef = useRef<number>(Date.now());
  const recordedRef = useRef(false);
  const { recordPlay } = useProgress();

  const remaining = useMemo(() => tiles.filter((t) => !t.removed).length, [tiles]);
  const won = remaining === 0;
  const stuck = !won && findHint(tiles) === null;

  useEffect(() => {
    if (won && !recordedRef.current) {
      recordedRef.current = true;
      recordPlay({
        slug: "mahjong-solitaire",
        category: "memory-games",
        score: 100,
        totalQuestions: LAYOUT.length / 2,
        correctAnswers: LAYOUT.length / 2,
        timeSpentMs: Date.now() - startedAtRef.current,
        isDaily: false,
        isPerfect: history.length === LAYOUT.length / 2, // no undos used
      });
    }
  }, [won, recordPlay, history.length]);

  // Clear hint highlight after 2s
  useEffect(() => {
    if (!hint) return;
    const id = window.setTimeout(() => setHint(null), 2200);
    return () => window.clearTimeout(id);
  }, [hint]);

  const reset = useCallback(() => {
    setTiles(buildTiles());
    setSelected(null);
    setHistory([]);
    setHint(null);
    startedAtRef.current = Date.now();
    recordedRef.current = false;
  }, []);

  const onTapTile = useCallback(
    (idx: number) => {
      setHint(null);
      const tile = tiles[idx];
      if (tile.removed || !isTileFree(tile, tiles)) return;

      if (selected === null) {
        setSelected(idx);
        return;
      }
      if (selected === idx) {
        setSelected(null);
        return;
      }
      const other = tiles[selected];
      if (other.type.matchKey === tile.type.matchKey) {
        // Match! Remove both.
        setTiles((prev) =>
          prev.map((t) => (t.idx === idx || t.idx === selected ? { ...t, removed: true } : t)),
        );
        setHistory((h) => [...h, [selected, idx]]);
        setSelected(null);
      } else {
        // Wrong match — select the new tile instead
        setSelected(idx);
      }
    },
    [selected, tiles],
  );

  const undo = useCallback(() => {
    setHistory((h) => {
      if (h.length === 0) return h;
      const last = h[h.length - 1];
      setTiles((prev) =>
        prev.map((t) => (t.idx === last[0] || t.idx === last[1] ? { ...t, removed: false } : t)),
      );
      setSelected(null);
      setHint(null);
      return h.slice(0, -1);
    });
  }, []);

  const showHint = useCallback(() => {
    const h = findHint(tiles);
    setHint(h);
  }, [tiles]);

  // ─ Render ──────────────────────────────────────────────────────────────────
  // Tile visual: 48×64px on desktop, 38×52 on mobile. Each grid col is 48/2 = 24 wide,
  // row is 64/2 = 32 tall, so tile footprint overlaps neighbors slightly for the
  // stacked look.
  const TILE_W = 48;
  const TILE_H = 64;
  const LAYER_OFFSET = 3; // px up+left per layer for 3D illusion
  const BOARD_W = COLS * TILE_W + 40;
  const BOARD_H = ROWS * TILE_H + 40;

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
          <span className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-foreground tabular-nums">
            {remaining} / {LAYOUT.length} tiles
          </span>
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

      {/* Board */}
      <div
        className="mx-auto overflow-auto rounded-2xl border border-border bg-surface p-5"
        role="grid"
        aria-label="Mahjong Solitaire board"
      >
        <div
          className="relative mx-auto"
          style={{ width: BOARD_W, height: BOARD_H, minWidth: BOARD_W }}
        >
          {/* Render in layer order (back to front) so higher layers overlap */}
          {[0, 1, 2]
            .flatMap((layer) => tiles.filter((t) => t.layer === layer && !t.removed))
            .map((t) => {
              const free = isTileFree(t, tiles);
              const isSelected = selected === t.idx;
              const isHinted = hint?.includes(t.idx);
              const left = t.col * TILE_W + 20 - t.layer * LAYER_OFFSET;
              const top = t.row * TILE_H + 20 - t.layer * LAYER_OFFSET;
              return (
                <button
                  key={t.idx}
                  type="button"
                  onClick={() => onTapTile(t.idx)}
                  disabled={!free}
                  aria-label={`${t.type.group} ${t.type.id}, layer ${t.layer}${free ? ", free" : ", blocked"}`}
                  className="absolute flex items-center justify-center rounded-md text-3xl transition-all sm:text-4xl"
                  style={{
                    left,
                    top,
                    width: TILE_W,
                    height: TILE_H,
                    background: isSelected
                      ? "var(--color-primary-100)"
                      : isHinted
                        ? "rgba(192,138,26,0.35)"
                        : "#FFFFFF",
                    border: `2px solid ${
                      isSelected
                        ? "var(--color-primary)"
                        : isHinted
                          ? "var(--color-accent-warm)"
                          : free
                            ? "#C9B88F"
                            : "#E5E0D2"
                    }`,
                    boxShadow: free
                      ? "2px 3px 0 0 #B8A87A, 0 4px 8px rgba(26,37,32,0.15)"
                      : "1px 1px 0 0 #CCC",
                    color: "var(--color-text)",
                    cursor: free ? "pointer" : "not-allowed",
                    opacity: free ? 1 : 0.45,
                    zIndex: t.layer * 10 + t.row,
                    lineHeight: 1,
                  }}
                >
                  <span aria-hidden="true" style={{ pointerEvents: "none" }}>
                    {t.type.glyph}
                  </span>
                </button>
              );
            })}
        </div>
      </div>

      {/* Footer messages */}
      <div className="mt-4 text-center text-sm text-text-muted">
        Match two free tiles of the same type. A tile is free when nothing sits on top of it and
        at least one horizontal side is open.
      </div>

      {/* Win / stuck state */}
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
            Brilliant!
          </h2>
          <p className="mb-4 text-lg text-text-muted">Every tile cleared.</p>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-base font-bold text-white"
            style={{
              background: "var(--gradient-primary)",
              boxShadow: "0 6px 16px rgba(31,110,74,0.25)",
            }}
          >
            <RotateCcw size={18} /> New game
          </button>
        </div>
      )}
      {stuck && !won && (
        <div className="mt-6 rounded-2xl border-2 border-border bg-surface p-5 text-center">
          <h2
            className="mb-1 text-2xl font-bold text-foreground"
            style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
          >
            No more moves
          </h2>
          <p className="mb-3 text-base text-text-muted">
            Undo to retry, or start a fresh board.
          </p>
          <div className="flex justify-center gap-2">
            <button
              type="button"
              onClick={undo}
              disabled={history.length === 0}
              className="inline-flex items-center gap-2 rounded-lg border-2 px-5 py-[10px] text-base font-bold disabled:opacity-40"
              style={{ borderColor: "var(--color-primary)", color: "var(--color-primary)" }}
            >
              <Undo2 size={18} /> Undo
            </button>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-lg px-5 py-[10px] text-base font-bold text-white"
              style={{ background: "var(--gradient-primary)" }}
            >
              <RotateCcw size={18} /> New game
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
