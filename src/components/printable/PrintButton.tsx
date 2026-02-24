import Link from "next/link";
import { Printer, FileText } from "lucide-react";

const btnBase =
  "inline-flex items-center gap-2 rounded-xl px-5 py-3 text-lg font-semibold shadow-md transition-all hover:shadow-lg";

export default function PrintButton({
  category,
  slug,
}: {
  category: string;
  slug: string;
}) {
  const base = `/play/${category}/${slug}/print`;

  return (
    <div className="no-print flex flex-wrap gap-3">
      <Link
        href={base}
        target="_blank"
        className={`${btnBase} bg-primary text-white hover:bg-primary-dark`}
      >
        <Printer className="h-5 w-5" />
        Print
      </Link>
      <Link
        href={`${base}?answers=true`}
        target="_blank"
        className={`${btnBase} bg-emerald-600 text-white hover:bg-emerald-700`}
      >
        <FileText className="h-5 w-5" />
        Print with Answers
      </Link>
    </div>
  );
}
