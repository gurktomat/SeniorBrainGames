import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Progress",
  description: "Track your brain training progress, XP, streaks, and badges.",
  alternates: { canonical: "/progress" },
};

export default function ProgressPage() {
  return (
    <div className="px-6 py-12">
      <div className="mx-auto max-w-4xl text-center">
        <h1
          className="mb-3 text-3xl font-bold text-foreground sm:text-4xl"
          style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
        >
          My Progress
        </h1>
        <p className="text-lg text-text-muted">
          Your brain training stats, XP, streaks, and badges will appear here.
        </p>
        <div className="mt-8 rounded-xl border border-border bg-surface-alt p-8">
          <p className="text-xl text-text-muted">Coming soon — being built right now!</p>
        </div>
      </div>
    </div>
  );
}
