import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import PrintButton from "@/components/printable/PrintButton";
import PrintableCrossword from "@/components/printable/PrintableCrossword";
import PrintableWordSearch from "@/components/printable/PrintableWordSearch";
import PrintableSudoku from "@/components/printable/PrintableSudoku";
import PrintableWordScramble from "@/components/printable/PrintableWordScramble";
import PrintableRiddles from "@/components/printable/PrintableRiddles";
import PrintableWordLadder from "@/components/printable/PrintableWordLadder";

import crosswordData from "@/data/word-games/crossword-classic.json";
import wordSearchData from "@/data/word-games/word-search.json";
import sudokuData from "@/data/memory-games/sudoku-puzzles.json";
import wordScrambleData from "@/data/word-games/word-scramble.json";
import riddleData from "@/data/word-games/riddle-challenge.json";
import wordLadderData from "@/data/word-games/word-ladder.json";

type PuzzleType = "crossword" | "word-search" | "sudoku" | "word-scramble" | "riddles" | "word-ladder";

interface PuzzleConfig {
  type: PuzzleType;
  title: string;
  description: string;
}

const puzzleConfigs: Record<string, PuzzleConfig> = {
  // Crossword (1 per puzzle)
  "crossword-everyday-words": {
    type: "crossword",
    title: "Crossword — Everyday Words",
    description: "A printable crossword puzzle with everyday vocabulary words and answer key.",
  },
  "crossword-classic-movies-music": {
    type: "crossword",
    title: "Crossword — Classic Movies & Music",
    description: "A printable crossword puzzle themed around classic movies and music with answer key.",
  },
  "crossword-around-the-world": {
    type: "crossword",
    title: "Crossword — Around the World",
    description: "A printable geography-themed crossword puzzle with answer key.",
  },
  // Word Search (1 per puzzle)
  "word-search-nature-words": {
    type: "word-search",
    title: "Word Search — Nature Words",
    description: "A printable nature-themed word search puzzle with answer key.",
  },
  "word-search-kitchen-cooking": {
    type: "word-search",
    title: "Word Search — Kitchen & Cooking",
    description: "A printable kitchen-themed word search puzzle with answer key.",
  },
  "word-search-around-the-house": {
    type: "word-search",
    title: "Word Search — Around the House",
    description: "A printable household-themed word search puzzle with answer key.",
  },
  // Sudoku (1 per puzzle)
  "sudoku-easy": {
    type: "sudoku",
    title: "Sudoku — Easy",
    description: "A printable easy sudoku puzzle with solution.",
  },
  "sudoku-medium": {
    type: "sudoku",
    title: "Sudoku — Medium",
    description: "A printable medium-difficulty sudoku puzzle with solution.",
  },
  "sudoku-hard": {
    type: "sudoku",
    title: "Sudoku — Hard",
    description: "A printable hard sudoku puzzle with solution.",
  },
  // Word Scramble (5 per sheet)
  "word-scramble-sheet-1": {
    type: "word-scramble",
    title: "Word Scramble — Sheet 1 (Easy)",
    description: "5 easy printable word scramble puzzles with hints and answer key.",
  },
  "word-scramble-sheet-2": {
    type: "word-scramble",
    title: "Word Scramble — Sheet 2 (Medium)",
    description: "5 medium printable word scramble puzzles with hints and answer key.",
  },
  "word-scramble-sheet-3": {
    type: "word-scramble",
    title: "Word Scramble — Sheet 3 (Hard)",
    description: "5 hard printable word scramble puzzles with hints and answer key.",
  },
  // Riddles (5 per sheet)
  "riddles-sheet-1": {
    type: "riddles",
    title: "Riddles — Sheet 1",
    description: "5 printable riddles with hints and answer key.",
  },
  "riddles-sheet-2": {
    type: "riddles",
    title: "Riddles — Sheet 2",
    description: "5 printable riddles with hints and answer key.",
  },
  "riddles-sheet-3": {
    type: "riddles",
    title: "Riddles — Sheet 3",
    description: "5 printable riddles with hints and answer key.",
  },
  "riddles-sheet-4": {
    type: "riddles",
    title: "Riddles — Sheet 4",
    description: "5 printable riddles with hints and answer key.",
  },
  // Word Ladder (5 per sheet)
  "word-ladder-sheet-1": {
    type: "word-ladder",
    title: "Word Ladder — Sheet 1",
    description: "5 printable word ladder puzzles with hints and answer key.",
  },
  "word-ladder-sheet-2": {
    type: "word-ladder",
    title: "Word Ladder — Sheet 2",
    description: "5 printable word ladder puzzles with hints and answer key.",
  },
};

const allSlugs = Object.keys(puzzleConfigs);

export function generateStaticParams() {
  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const config = puzzleConfigs[slug];
  if (!config) return {};
  return {
    title: config.title,
    description: config.description,
    alternates: { canonical: `/printable-puzzles/${slug}` },
    openGraph: { title: config.title, description: config.description },
  };
}

// Map slug → crossword puzzle index
const crosswordMap: Record<string, number> = {
  "crossword-everyday-words": 0,
  "crossword-classic-movies-music": 1,
  "crossword-around-the-world": 2,
};

const wordSearchMap: Record<string, number> = {
  "word-search-nature-words": 0,
  "word-search-kitchen-cooking": 1,
  "word-search-around-the-house": 2,
};

const sudokuMap: Record<string, number> = {
  "sudoku-easy": 0,
  "sudoku-medium": 1,
  "sudoku-hard": 2,
};

function PuzzleContent({ slug }: { slug: string }) {
  const config = puzzleConfigs[slug];
  if (!config) return null;

  switch (config.type) {
    case "crossword": {
      const puzzle = crosswordData.puzzles[crosswordMap[slug]] as React.ComponentProps<typeof PrintableCrossword>["puzzle"];
      return <PrintableCrossword puzzle={puzzle} />;
    }
    case "word-search": {
      const puzzle = wordSearchData.puzzles[wordSearchMap[slug]];
      return <PrintableWordSearch puzzle={puzzle} />;
    }
    case "sudoku": {
      const puzzle = sudokuData.puzzles[sudokuMap[slug]];
      return <PrintableSudoku puzzle={puzzle} />;
    }
    case "word-scramble": {
      const sheetNum = parseInt(slug.split("-").pop()!, 10);
      const perSheet = 5;
      const start = (sheetNum - 1) * perSheet;
      const puzzles = wordScrambleData.puzzles.slice(start, start + perSheet);
      return <PrintableWordScramble title={config.title} puzzles={puzzles} />;
    }
    case "riddles": {
      const sheetNum = parseInt(slug.split("-").pop()!, 10);
      const perSheet = 5;
      const start = (sheetNum - 1) * perSheet;
      const riddles = riddleData.riddles.slice(start, start + perSheet);
      return <PrintableRiddles title={config.title} riddles={riddles} />;
    }
    case "word-ladder": {
      const sheetNum = parseInt(slug.split("-").pop()!, 10);
      const perSheet = 5;
      const start = (sheetNum - 1) * perSheet;
      const puzzles = wordLadderData.puzzles.slice(start, start + perSheet);
      return <PrintableWordLadder title={config.title} puzzles={puzzles} />;
    }
  }
}

export default async function PrintablePuzzlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const config = puzzleConfigs[slug];
  if (!config) notFound();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://seniorbraingames.org" },
            { "@type": "ListItem", position: 2, name: "Printable Puzzles", item: "https://seniorbraingames.org/printable-puzzles" },
            { "@type": "ListItem", position: 3, name: config.title, item: `https://seniorbraingames.org/printable-puzzles/${slug}` },
          ],
        }}
      />
      <Breadcrumbs
        items={[
          { label: "Printable Puzzles", href: "/printable-puzzles" },
          { label: config.title },
        ]}
      />

      <section className="mx-auto max-w-4xl px-6 py-8">
        {/* Screen-only controls */}
        <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/printable-puzzles"
            className="inline-flex items-center gap-2 text-base font-medium text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            All Printable Puzzles
          </Link>
          <PrintButton />
        </div>

        {/* Print header */}
        <div className="mb-8 flex items-start justify-between">
          <h1
            className="text-2xl font-bold text-primary sm:text-3xl"
            style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
          >
            {config.title}
          </h1>
          <span className="hidden text-sm text-text-muted print:block">
            seniorbraingames.org
          </span>
        </div>

        {/* Puzzle + answer key (with page break between) */}
        <PuzzleContent slug={slug} />
      </section>
    </>
  );
}
