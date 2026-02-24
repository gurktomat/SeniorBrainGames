import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discover",
  description: "Discover curated game collections and find new brain training challenges.",
  alternates: { canonical: "/discover" },
};

export default function DiscoverPage() {
  return (
    <div className="px-6 py-12">
      <div className="mx-auto max-w-4xl text-center">
        <h1
          className="mb-3 text-3xl font-bold text-foreground sm:text-4xl"
          style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
        >
          Discover
        </h1>
        <p className="text-lg text-text-muted">
          Explore curated collections and find new games to challenge yourself.
        </p>
        <div className="mt-8 rounded-xl border border-border bg-surface-alt p-8">
          <p className="text-xl text-text-muted">Coming soon — being built right now!</p>
        </div>
      </div>
    </div>
  );
}
