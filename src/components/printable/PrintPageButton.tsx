"use client";

import { Printer } from "lucide-react";

export default function PrintPageButton() {
  return (
    <button
      onClick={() => window.print()}
      className="no-print inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-lg font-semibold text-white shadow-md transition-all hover:bg-primary-dark hover:shadow-lg"
    >
      <Printer className="h-5 w-5" />
      Print
    </button>
  );
}
