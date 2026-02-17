import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About SeniorBrainGames",
  description:
    "Learn about SeniorBrainGames — our mission to keep minds sharp with fun, free brain games designed for seniors.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1
        className="mb-6 text-3xl font-bold text-foreground sm:text-4xl"
        style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
      >
        About SeniorBrainGames
      </h1>

      <div className="space-y-6 text-lg leading-relaxed text-foreground">
        <p>
          SeniorBrainGames is a free online platform designed to keep your mind
          sharp and active through fun, engaging brain games. We believe that
          mental exercise should be enjoyable, accessible, and available to
          everyone.
        </p>

        <h2
          className="text-2xl font-bold text-foreground"
          style={{
            fontFamily: "var(--font-merriweather), var(--font-heading)",
          }}
        >
          Our Mission
        </h2>
        <p>
          Research shows that regular mental stimulation can help maintain
          cognitive function as we age. Our mission is simple: to provide
          high-quality, enjoyable brain games that make keeping your mind active
          feel like play, not work.
        </p>

        <h2
          className="text-2xl font-bold text-foreground"
          style={{
            fontFamily: "var(--font-merriweather), var(--font-heading)",
          }}
        >
          What We Offer
        </h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Nostalgia Trivia</strong> — Travel back in time with trivia
            from the 1950s through the 1980s
          </li>
          <li>
            <strong>General Knowledge</strong> — Challenge yourself with
            questions about geography, history, science, and more
          </li>
          <li>
            <strong>Word Games</strong> — Scrambles, proverbs, synonyms, and
            spelling challenges
          </li>
          <li>
            <strong>Memory Games</strong> — Card matching, pattern recognition,
            and visual puzzles
          </li>
          <li>
            <strong>Daily Challenge</strong> — A new 5-question quiz every day
            to build your streak
          </li>
        </ul>

        <h2
          className="text-2xl font-bold text-foreground"
          style={{
            fontFamily: "var(--font-merriweather), var(--font-heading)",
          }}
        >
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
  );
}
