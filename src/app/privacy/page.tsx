import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "SeniorBrainGames privacy policy — how we handle your data.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1
        className="mb-6 text-3xl font-bold text-foreground sm:text-4xl"
        style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
      >
        Privacy Policy
      </h1>

      <div className="space-y-6 text-lg leading-relaxed text-foreground">
        <p>
          <strong>Last updated:</strong> February 2026
        </p>

        <h2
          className="text-2xl font-bold text-foreground"
          style={{
            fontFamily: "var(--font-merriweather), var(--font-heading)",
          }}
        >
          Summary
        </h2>
        <p>
          SeniorBrainGames respects your privacy. We do not collect personal
          information, require accounts, or use tracking cookies. Your game
          progress is stored only in your browser.
        </p>

        <h2
          className="text-2xl font-bold text-foreground"
          style={{
            fontFamily: "var(--font-merriweather), var(--font-heading)",
          }}
        >
          What Data We Store
        </h2>
        <p>
          We use your browser&apos;s localStorage to save:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Your daily challenge completion status</li>
          <li>Your play streak (consecutive days played)</li>
        </ul>
        <p>
          This data never leaves your device. It is not sent to any server or
          shared with any third party. You can clear it at any time by clearing
          your browser data.
        </p>

        <h2
          className="text-2xl font-bold text-foreground"
          style={{
            fontFamily: "var(--font-merriweather), var(--font-heading)",
          }}
        >
          Cookies
        </h2>
        <p>
          SeniorBrainGames does not use cookies for tracking. We may use
          essential cookies required for basic website functionality.
        </p>

        <h2
          className="text-2xl font-bold text-foreground"
          style={{
            fontFamily: "var(--font-merriweather), var(--font-heading)",
          }}
        >
          Third-Party Services
        </h2>
        <p>
          We use Google Fonts to serve web fonts. Google may collect standard
          usage data as described in their privacy policy. No other third-party
          services are used.
        </p>

        <h2
          className="text-2xl font-bold text-foreground"
          style={{
            fontFamily: "var(--font-merriweather), var(--font-heading)",
          }}
        >
          Contact
        </h2>
        <p>
          If you have any questions about this privacy policy, please reach out
          through our website.
        </p>
      </div>
    </div>
  );
}
