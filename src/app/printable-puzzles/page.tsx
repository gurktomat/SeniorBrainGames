import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { Printer, Grid3X3, Search, Hash, Shuffle, HelpCircle, Footprints } from "lucide-react";

export const metadata: Metadata = {
  title: "Printable Puzzles — Free Puzzle Sheets for Seniors",
  description:
    "Free printable puzzles for seniors: crosswords, word search, sudoku, word scramble, riddles, and word ladders. Print or save as PDF — no account needed!",
  alternates: { canonical: "/printable-puzzles" },
  openGraph: {
    title: "Printable Puzzles — Free Puzzle Sheets for Seniors",
    description:
      "Free printable puzzles for seniors: crosswords, word search, sudoku, word scramble, riddles, and word ladders.",
  },
};

interface PuzzleLink {
  slug: string;
  label: string;
}

interface PuzzleSection {
  title: string;
  description: string;
  icon: React.ReactNode;
  puzzles: PuzzleLink[];
}

const sections: PuzzleSection[] = [
  {
    title: "Crossword Puzzles",
    description: "Classic crossword grids with across & down clues.",
    icon: <Grid3X3 className="h-6 w-6" />,
    puzzles: [
      { slug: "crossword-everyday-words", label: "Everyday Words" },
      { slug: "crossword-classic-movies-music", label: "Classic Movies & Music" },
      { slug: "crossword-around-the-world", label: "Around the World" },
    ],
  },
  {
    title: "Word Search",
    description: "Find hidden words in the letter grid.",
    icon: <Search className="h-6 w-6" />,
    puzzles: [
      { slug: "word-search-nature-words", label: "Nature Words" },
      { slug: "word-search-kitchen-cooking", label: "Kitchen & Cooking" },
      { slug: "word-search-around-the-house", label: "Around the House" },
    ],
  },
  {
    title: "Sudoku",
    description: "Fill the 9×9 grid — every row, column, and box needs 1–9.",
    icon: <Hash className="h-6 w-6" />,
    puzzles: [
      { slug: "sudoku-easy", label: "Easy" },
      { slug: "sudoku-medium", label: "Medium" },
      { slug: "sudoku-hard", label: "Hard" },
    ],
  },
  {
    title: "Word Scramble",
    description: "Unscramble the jumbled letters to find real words.",
    icon: <Shuffle className="h-6 w-6" />,
    puzzles: [
      { slug: "word-scramble-sheet-1", label: "Sheet 1 (Easy)" },
      { slug: "word-scramble-sheet-2", label: "Sheet 2 (Medium)" },
      { slug: "word-scramble-sheet-3", label: "Sheet 3 (Hard)" },
    ],
  },
  {
    title: "Riddles",
    description: "Classic riddles with hints — write your answers on the line.",
    icon: <HelpCircle className="h-6 w-6" />,
    puzzles: [
      { slug: "riddles-sheet-1", label: "Riddles 1–5" },
      { slug: "riddles-sheet-2", label: "Riddles 6–10" },
      { slug: "riddles-sheet-3", label: "Riddles 11–15" },
      { slug: "riddles-sheet-4", label: "Riddles 16–20" },
    ],
  },
  {
    title: "Word Ladder",
    description: "Change one letter at a time to transform one word into another.",
    icon: <Footprints className="h-6 w-6" />,
    puzzles: [
      { slug: "word-ladder-sheet-1", label: "Ladders 1–5" },
      { slug: "word-ladder-sheet-2", label: "Ladders 6–10" },
    ],
  },
];

export default function PrintablePuzzlesPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://seniorbraingames.org" },
            { "@type": "ListItem", position: 2, name: "Printable Puzzles", item: "https://seniorbraingames.org/printable-puzzles" },
          ],
        }}
      />
      <Breadcrumbs items={[{ label: "Printable Puzzles" }]} />

      <section className="mx-auto max-w-4xl px-6 py-10">
        <h1
          className="mb-3 text-3xl font-bold text-primary sm:text-4xl"
          style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
        >
          Printable Puzzles
        </h1>
        <p className="mb-10 text-lg text-text-muted">
          Free printable puzzle sheets with answer keys. Click any puzzle, then use the
          Print button — or save as PDF from your browser&apos;s print dialog. No account needed!
        </p>

        <div className="space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary">
                  {section.icon}
                </span>
                <div>
                  <h2
                    className="text-xl font-bold text-foreground"
                    style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
                  >
                    {section.title}
                  </h2>
                  <p className="text-sm text-text-muted">{section.description}</p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {section.puzzles.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/printable-puzzles/${p.slug}`}
                    className="card-enterprise flex items-center gap-3 px-5 py-4"
                  >
                    <Printer className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-base font-medium text-foreground">
                      {p.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
