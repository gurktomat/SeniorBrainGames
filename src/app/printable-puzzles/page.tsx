import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { Printer, Grid3X3, Search, Hash, Shuffle, HelpCircle, Footprints, Lock, Table2, Route } from "lucide-react";
import { printablePuzzleSections } from "@/lib/printablePuzzles";

export const metadata: Metadata = {
  title: "Printable Puzzles — Free Puzzle Sheets for Seniors",
  description:
    "Free printable puzzles for seniors: crosswords, word search, sudoku, word scramble, riddles, word ladders, cryptograms, logic grid puzzles, and mazes. Print or save as PDF — no account needed!",
  alternates: { canonical: "/printable-puzzles" },
  openGraph: {
    title: "Printable Puzzles — Free Puzzle Sheets for Seniors",
    description:
      "Free printable puzzles for seniors: crosswords, word search, sudoku, word scramble, riddles, word ladders, cryptograms, logic grids, and mazes.",
  },
};

const sectionIcons: Record<string, ReactNode> = {
  grid: <Grid3X3 className="h-6 w-6" />,
  search: <Search className="h-6 w-6" />,
  hash: <Hash className="h-6 w-6" />,
  shuffle: <Shuffle className="h-6 w-6" />,
  helpCircle: <HelpCircle className="h-6 w-6" />,
  footprints: <Footprints className="h-6 w-6" />,
  lock: <Lock className="h-6 w-6" />,
  table: <Table2 className="h-6 w-6" />,
  route: <Route className="h-6 w-6" />,
};

const sections = printablePuzzleSections.map((s) => ({
  ...s,
  icon: sectionIcons[s.iconName] ?? null,
}));

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
                    className="card-playful flex items-center gap-3 px-5 py-4"
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
