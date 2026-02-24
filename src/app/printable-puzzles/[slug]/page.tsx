import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import PrintPageButton from "@/components/printable/PrintPageButton";
import PrintableCrossword from "@/components/printable/PrintableCrossword";
import PrintableWordSearch from "@/components/printable/PrintableWordSearch";
import PrintableSudoku from "@/components/printable/PrintableSudoku";
import PrintableWordScramble from "@/components/printable/PrintableWordScramble";
import PrintableRiddles from "@/components/printable/PrintableRiddles";
import PrintableWordLadder from "@/components/printable/PrintableWordLadder";
import PrintableCryptogram from "@/components/printable/PrintableCryptogram";
import PrintableLogicGrid from "@/components/printable/PrintableLogicGrid";
import PrintableMaze from "@/components/printable/PrintableMaze";
import PrintableTrueOrFalse from "@/components/printable/PrintableTrueOrFalse";

import crosswordData from "@/data/word-games/crossword-classic.json";
import crosswordNatureScienceData from "@/data/word-games/crossword-nature-science.json";
import wordSearchData from "@/data/word-games/word-search.json";
import wordSearchAnimalsData from "@/data/word-games/word-search-animals.json";
import sudokuData from "@/data/memory-games/sudoku-puzzles.json";
import sudokuChallengeData from "@/data/memory-games/sudoku-challenge.json";
import wordScrambleData from "@/data/word-games/word-scramble.json";
import foodWordScrambleData from "@/data/word-games/food-word-scramble.json";
import riddleData from "@/data/word-games/riddle-challenge.json";
import nostalgiaRiddleData from "@/data/nostalgia-trivia/nostalgia-riddles.json";
import wordLadderData from "@/data/word-games/word-ladder.json";
import wordLadderChallengeData from "@/data/word-games/word-ladder-challenge.json";
import cryptogramData from "@/data/word-games/cryptogram.json";
import cryptogramPoetryData from "@/data/word-games/cryptogram-poetry.json";
import logicGridData from "@/data/printable/logic-grid-puzzles.json";
import mazeData from "@/data/printable/mazes.json";
import premiumData from "@/data/printable/premium-puzzles.json";

type PuzzleType = "crossword" | "word-search" | "sudoku" | "word-scramble" | "riddles" | "word-ladder" | "cryptogram" | "logic-grid" | "maze" | "finish-phrase";

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
  "crossword-nature-science-1": {
    type: "crossword",
    title: "Crossword — Nature & Science 1",
    description: "A printable nature and science themed crossword puzzle with answer key.",
  },
  "crossword-nature-science-2": {
    type: "crossword",
    title: "Crossword — Nature & Science 2",
    description: "A printable nature and science themed crossword puzzle with answer key.",
  },
  "crossword-nature-science-3": {
    type: "crossword",
    title: "Crossword — Nature & Science 3",
    description: "A printable nature and science themed crossword puzzle with answer key.",
  },
  // Premium - Everyday Crossword
  "crossword-everyday": {
    type: "crossword",
    title: "Crossword — Everyday Words",
    description: "A simple printable crossword with everyday vocabulary.",
  },
  // Word Search (1 per puzzle)
  "word-search-1950s": {
    type: "word-search",
    title: "Word Search — 1950s Nostalgia",
    description: "Find hidden words related to the 1950s era.",
  },
  "word-search-nature-words": {
    type: "word-search",
    title: "Word Search — Nature Words",
    description: "A printable nature-themed word search puzzle with answer key.",
  },
  "finish-phrase-proverbs": {
    type: "finish-phrase",
    title: "Classic Proverbs Challenge",
    description: "Complete the famous proverbs and sayings.",
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
  "word-search-animals-1": {
    type: "word-search",
    title: "Word Search — Animals 1",
    description: "A printable animal-themed word search puzzle with answer key.",
  },
  "word-search-animals-2": {
    type: "word-search",
    title: "Word Search — Animals 2",
    description: "A printable animal-themed word search puzzle with answer key.",
  },
  "word-search-animals-3": {
    type: "word-search",
    title: "Word Search — Animals 3",
    description: "A printable animal-themed word search puzzle with answer key.",
  },
  // Sudoku (1 per puzzle)
  "sudoku-garden": {
    type: "sudoku",
    title: "Sudoku — Garden Edition (Easy)",
    description: "A relaxing, easy printable sudoku puzzle.",
  },
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
  "sudoku-challenge-1": {
    type: "sudoku",
    title: "Sudoku — Challenge 1",
    description: "A printable sudoku challenge puzzle with solution.",
  },
  "sudoku-challenge-2": {
    type: "sudoku",
    title: "Sudoku — Challenge 2",
    description: "A printable sudoku challenge puzzle with solution.",
  },
  "sudoku-challenge-3": {
    type: "sudoku",
    title: "Sudoku — Challenge 3",
    description: "A printable sudoku challenge puzzle with solution.",
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
  "food-scramble-sheet-1": {
    type: "word-scramble",
    title: "Food Word Scramble — Sheet 1",
    description: "5 printable food-themed word scramble puzzles with hints and answer key.",
  },
  "food-scramble-sheet-2": {
    type: "word-scramble",
    title: "Food Word Scramble — Sheet 2",
    description: "5 printable food-themed word scramble puzzles with hints and answer key.",
  },
  "food-scramble-sheet-3": {
    type: "word-scramble",
    title: "Food Word Scramble — Sheet 3",
    description: "5 printable food-themed word scramble puzzles with hints and answer key.",
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
  "nostalgia-riddles-sheet-1": {
    type: "riddles",
    title: "Nostalgia Riddles — Sheet 1",
    description: "5 printable nostalgia-themed riddles with hints and answer key.",
  },
  "nostalgia-riddles-sheet-2": {
    type: "riddles",
    title: "Nostalgia Riddles — Sheet 2",
    description: "5 printable nostalgia-themed riddles with hints and answer key.",
  },
  "nostalgia-riddles-sheet-3": {
    type: "riddles",
    title: "Nostalgia Riddles — Sheet 3",
    description: "5 printable nostalgia-themed riddles with hints and answer key.",
  },
  "nostalgia-riddles-sheet-4": {
    type: "riddles",
    title: "Nostalgia Riddles — Sheet 4",
    description: "5 printable nostalgia-themed riddles with hints and answer key.",
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
  "word-ladder-challenge-sheet-1": {
    type: "word-ladder",
    title: "Word Ladder Challenge — Sheet 1",
    description: "5 printable word ladder challenge puzzles with hints and answer key.",
  },
  "word-ladder-challenge-sheet-2": {
    type: "word-ladder",
    title: "Word Ladder Challenge — Sheet 2",
    description: "5 printable word ladder challenge puzzles with hints and answer key.",
  },
  // Cryptograms (1 per puzzle, reuse existing data)
  "cryptogram-1": {
    type: "cryptogram",
    title: "Cryptogram — Puzzle 1",
    description: "A printable cryptogram puzzle — decode the substitution cipher to reveal a famous quote.",
  },
  "cryptogram-2": {
    type: "cryptogram",
    title: "Cryptogram — Puzzle 2",
    description: "A printable cryptogram puzzle — decode the substitution cipher to reveal a famous quote.",
  },
  "cryptogram-3": {
    type: "cryptogram",
    title: "Cryptogram — Puzzle 3",
    description: "A printable cryptogram puzzle — decode the substitution cipher to reveal a famous quote.",
  },
  "poetry-cryptogram-1": {
    type: "cryptogram",
    title: "Poetry Cryptogram — Puzzle 1",
    description: "A printable poetry cryptogram puzzle — decode the substitution cipher to reveal a famous poem line.",
  },
  "poetry-cryptogram-2": {
    type: "cryptogram",
    title: "Poetry Cryptogram — Puzzle 2",
    description: "A printable poetry cryptogram puzzle — decode the substitution cipher to reveal a famous poem line.",
  },
  "poetry-cryptogram-3": {
    type: "cryptogram",
    title: "Poetry Cryptogram — Puzzle 3",
    description: "A printable poetry cryptogram puzzle — decode the substitution cipher to reveal a famous poem line.",
  },
  // Logic Grid Puzzles
  "logic-grid-1": {
    type: "logic-grid",
    title: "Logic Grid — The Garden Club",
    description: "A printable logic grid puzzle — use clues to match people, flowers, and months.",
  },
  "logic-grid-2": {
    type: "logic-grid",
    title: "Logic Grid — Movie Night",
    description: "A printable logic grid puzzle — use clues to match people, genres, and days.",
  },
  "logic-grid-3": {
    type: "logic-grid",
    title: "Logic Grid — The Bake Sale",
    description: "A printable logic grid puzzle — use clues to match people, treats, and toppings.",
  },
  // Mazes
  "maze-nature-walk": {
    type: "maze",
    title: "Maze — Nature Walk",
    description: "A gentle printable maze puzzle with solution.",
  },
  "maze-easy": {
    type: "maze",
    title: "Maze — Easy",
    description: "A printable easy maze puzzle with solution path.",
  },
  "maze-medium": {
    type: "maze",
    title: "Maze — Medium",
    description: "A printable medium-difficulty maze puzzle with solution path.",
  },
  "maze-hard": {
    type: "maze",
    title: "Maze — Hard",
    description: "A printable hard maze puzzle with solution path.",
  },
};

export const dynamicParams = true;

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
const crosswordMap: Record<string, { data: typeof crosswordData; index: number }> = {
  "crossword-everyday-words": { data: crosswordData, index: 0 },
  "crossword-classic-movies-music": { data: crosswordData, index: 1 },
  "crossword-around-the-world": { data: crosswordData, index: 2 },
  "crossword-nature-science-1": { data: crosswordNatureScienceData, index: 0 },
  "crossword-nature-science-2": { data: crosswordNatureScienceData, index: 1 },
  "crossword-nature-science-3": { data: crosswordNatureScienceData, index: 2 },
};

const wordSearchMap: Record<string, { data: typeof wordSearchData; index: number }> = {
  "word-search-nature-words": { data: wordSearchData, index: 0 },
  "word-search-kitchen-cooking": { data: wordSearchData, index: 1 },
  "word-search-around-the-house": { data: wordSearchData, index: 2 },
  "word-search-animals-1": { data: wordSearchAnimalsData, index: 0 },
  "word-search-animals-2": { data: wordSearchAnimalsData, index: 1 },
  "word-search-animals-3": { data: wordSearchAnimalsData, index: 2 },
};

const sudokuMap: Record<string, { data: typeof sudokuData; index: number }> = {
  "sudoku-easy": { data: sudokuData, index: 0 },
  "sudoku-medium": { data: sudokuData, index: 1 },
  "sudoku-hard": { data: sudokuData, index: 2 },
  "sudoku-challenge-1": { data: sudokuChallengeData, index: 0 },
  "sudoku-challenge-2": { data: sudokuChallengeData, index: 1 },
  "sudoku-challenge-3": { data: sudokuChallengeData, index: 2 },
};

const cryptogramMap: Record<string, { data: typeof cryptogramData; index: number }> = {
  "cryptogram-1": { data: cryptogramData, index: 0 },
  "cryptogram-2": { data: cryptogramData, index: 1 },
  "cryptogram-3": { data: cryptogramData, index: 2 },
  "poetry-cryptogram-1": { data: cryptogramPoetryData, index: 0 },
  "poetry-cryptogram-2": { data: cryptogramPoetryData, index: 1 },
  "poetry-cryptogram-3": { data: cryptogramPoetryData, index: 2 },
};

const logicGridMap: Record<string, number> = {
  "logic-grid-1": 0,
  "logic-grid-2": 1,
  "logic-grid-3": 2,
};

const mazeMap: Record<string, number> = {
  "maze-easy": 0,
  "maze-medium": 1,
  "maze-hard": 2,
};

function PuzzleContent({ slug }: { slug: string }) {
  const config = puzzleConfigs[slug];
  if (!config) return null;

  switch (config.type) {
    case "crossword": {
      if (slug === "crossword-everyday") {
        const puzzle = premiumData.puzzles.find((p) => p.id === slug) as unknown as React.ComponentProps<typeof PrintableCrossword>["puzzle"];
        return <PrintableCrossword puzzle={puzzle} />;
      }
      const entry = crosswordMap[slug];
      const puzzle = entry.data.puzzles[entry.index] as React.ComponentProps<typeof PrintableCrossword>["puzzle"];
      return <PrintableCrossword puzzle={puzzle} />;
    }
    case "word-search": {
      if (slug === "word-search-1950s") {
        const puzzle = premiumData.puzzles.find((p) => p.id === slug) as unknown as React.ComponentProps<typeof PrintableWordSearch>["puzzle"];
        return <PrintableWordSearch puzzle={puzzle} />;
      }
      const entry = wordSearchMap[slug];
      const puzzle = entry.data.puzzles[entry.index];
      return <PrintableWordSearch puzzle={puzzle} />;
    }
    case "sudoku": {
      if (slug === "sudoku-garden") {
        const puzzle = premiumData.puzzles.find((p) => p.id === slug) as unknown as React.ComponentProps<typeof PrintableSudoku>["puzzle"];
        return <PrintableSudoku puzzle={puzzle} />;
      }
      const entry = sudokuMap[slug];
      const puzzle = entry.data.puzzles[entry.index];
      return <PrintableSudoku puzzle={puzzle} />;
    }
    case "finish-phrase": {
      const puzzle = premiumData.puzzles.find((p) => p.id === slug) as any;
      if (!puzzle) return null;
      return (
        <PrintableTrueOrFalse
          title={puzzle.title}
          statements={puzzle.questions.map((q: any, i: number) => ({
            id: `q-${i}`,
            statement: q.question,
            answer: true, // Placeholder
            explanation: `Answer: ${q.answer}`,
          }))}
        />
      );
    }
    case "word-scramble": {
      const sheetNum = parseInt(slug.split("-").pop()!, 10);
      const perSheet = 5;
      const start = (sheetNum - 1) * perSheet;
      const source = slug.startsWith("food-scramble") ? foodWordScrambleData : wordScrambleData;
      const puzzles = source.puzzles.slice(start, start + perSheet);
      return <PrintableWordScramble title={config.title} puzzles={puzzles} />;
    }
    case "riddles": {
      const sheetNum = parseInt(slug.split("-").pop()!, 10);
      const perSheet = 5;
      const start = (sheetNum - 1) * perSheet;
      const source = slug.startsWith("nostalgia-riddles") ? nostalgiaRiddleData : riddleData;
      const riddles = source.riddles.slice(start, start + perSheet);
      return <PrintableRiddles title={config.title} riddles={riddles} />;
    }
    case "word-ladder": {
      const sheetNum = parseInt(slug.split("-").pop()!, 10);
      const perSheet = 5;
      const start = (sheetNum - 1) * perSheet;
      const source = slug.startsWith("word-ladder-challenge") ? wordLadderChallengeData : wordLadderData;
      const puzzles = source.puzzles.slice(start, start + perSheet);
      return <PrintableWordLadder title={config.title} puzzles={puzzles} />;
    }
    case "cryptogram": {
      const entry = cryptogramMap[slug];
      const puzzle = entry.data.puzzles[entry.index];
      return <PrintableCryptogram puzzle={puzzle} />;
    }
    case "logic-grid": {
      const puzzle = logicGridData.puzzles[logicGridMap[slug]] as unknown as React.ComponentProps<typeof PrintableLogicGrid>["puzzle"];
      return <PrintableLogicGrid puzzle={puzzle} />;
    }
    case "maze": {
      if (slug === "maze-nature-walk") {
        const puzzle = premiumData.puzzles.find((p) => p.id === slug) as unknown as React.ComponentProps<typeof PrintableMaze>["puzzle"];
        return <PrintableMaze puzzle={puzzle} />;
      }
      const puzzle = mazeData.puzzles[mazeMap[slug]] as React.ComponentProps<typeof PrintableMaze>["puzzle"];
      return <PrintableMaze puzzle={puzzle} />;
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
          <PrintPageButton />
        </div>

        <div id="printable-area">
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
        </div>
      </section>
    </>
  );
}
