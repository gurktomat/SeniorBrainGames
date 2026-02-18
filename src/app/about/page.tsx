import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About SeniorBrainGames",
  description:
    "Learn about SeniorBrainGames — our mission to keep minds sharp with fun, free brain games designed for seniors.",
};

export default function AboutPage() {
  return (
    <div>
      <div className="px-6 py-12 text-center" style={{ background: "var(--gradient-warm)" }}>
        <div className="mx-auto max-w-3xl">
          <h1
            className="mb-3 text-3xl font-bold text-foreground sm:text-4xl"
            style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
          >
            About SeniorBrainGames
          </h1>
          <p className="text-lg text-text-muted">Keeping minds sharp, one game at a time</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="space-y-8 text-lg leading-relaxed text-foreground">
          <p>
            SeniorBrainGames is a free online platform designed to keep your mind
            sharp and active through fun, engaging brain games. We believe that
            mental exercise should be enjoyable, accessible, and available to
            everyone.
          </p>

          <div className="rounded-2xl border border-border bg-surface p-8" style={{ boxShadow: "var(--shadow-sm)" }}>
            <h2 className="mb-4 text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}>
              Our Mission
            </h2>
            <p className="text-text-muted">
              Research shows that regular mental stimulation can help maintain
              cognitive function as we age. Our mission is simple: to provide
              high-quality, enjoyable brain games that make keeping your mind active
              feel like play, not work.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}>
            What We Offer
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "Nostalgia Trivia", desc: "Travel back in time with trivia from the 1950s through the 1980s" },
              { title: "General Knowledge", desc: "Challenge yourself with questions about geography, history, science, and more" },
              { title: "Word Games", desc: "Scrambles, proverbs, synonyms, and spelling challenges" },
              { title: "Memory Games", desc: "Card matching, pattern recognition, and visual puzzles" },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-surface p-5" style={{ boxShadow: "var(--shadow-sm)" }}>
                <p className="mb-1 font-bold text-primary">{item.title}</p>
                <p className="text-base text-text-muted">{item.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}>
            Designed for You
          </h2>
          <p>
            Every aspect of SeniorBrainGames is designed with accessibility in
            mind. Large text, high contrast, clear navigation, and keyboard
            support ensure that everyone can enjoy our games comfortably.
          </p>
          <p>
            All games are completely free and require no sign-up or account. Just
            visit, play, and enjoy!
          </p>
        </div>
      </div>
    </div>
  );
}
