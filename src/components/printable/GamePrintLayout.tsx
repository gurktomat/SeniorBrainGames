import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PrintPageButton from "./PrintPageButton";

export default function GamePrintLayout({
  backHref,
  backLabel,
  title,
  children,
}: {
  backHref: string;
  backLabel: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="print-worksheet-wrapper bg-gray-100 min-h-screen py-8">
      <section className="worksheet-container mx-auto max-w-[800px] bg-white p-[0.5in] sm:shadow-2xl">
        {/* Screen-only controls */}
        <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-4">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-base font-medium text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            {backLabel}
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-gray-500 sm:inline">Use &ldquo;Save as PDF&rdquo; in the print dialog for best results</span>
            <PrintPageButton />
          </div>
        </div>

        {/* Professional Worksheet Header (Print & Screen) */}
        <div className="worksheet-header mb-8 border-b-4 border-black pb-4">
          <div className="flex items-end justify-between mb-4">
            <div>
              <div className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-1">
                SeniorBrainGames.org
              </div>
              <h1
                className="text-3xl font-black text-black sm:text-4xl"
                style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
              >
                {title}
              </h1>
            </div>
            <div className="flex flex-col gap-3 text-right">
              <div className="flex items-end justify-end gap-2 text-base font-medium text-black">
                <span>Name:</span>
                <span className="inline-block w-48 border-b border-black">&nbsp;</span>
              </div>
              <div className="flex items-end justify-end gap-2 text-base font-medium text-black">
                <span>Date:</span>
                <span className="inline-block w-48 border-b border-black">&nbsp;</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="worksheet-content text-black">
          {children}
        </div>

        {/* Professional Worksheet Footer (Only shows in print or at bottom of container) */}
        <div className="worksheet-footer mt-12 border-t-2 border-gray-300 pt-4 text-center text-sm font-medium text-gray-500 print:fixed print:bottom-0 print:left-0 print:w-full print:bg-white print:border-t print:border-black print:pb-4 print:mt-0">
          <p>Find more free puzzles and brain games at <strong>www.SeniorBrainGames.org</strong></p>
          <p className="mt-1 text-xs text-gray-400">© {new Date().getFullYear()} SeniorBrainGames</p>
        </div>
      </section>
    </div>
  );
}
