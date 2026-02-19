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
    <section className="mx-auto max-w-4xl px-6 py-8">
      {/* Screen-only controls */}
      <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-4">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-base font-medium text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
        </Link>
        <PrintPageButton />
      </div>

      {/* Print header */}
      <div className="mb-8 flex items-start justify-between">
        <h1
          className="text-2xl font-bold text-primary sm:text-3xl"
          style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
        >
          {title}
        </h1>
        <span className="hidden text-sm text-text-muted print:block">
          seniorbraingames.org
        </span>
      </div>

      {children}
    </section>
  );
}
