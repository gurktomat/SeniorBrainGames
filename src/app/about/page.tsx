import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "About SeniorBrainGames",
  description:
    "Learn about SeniorBrainGames — our mission to keep minds sharp with fun, free brain games designed for seniors.",
  alternates: { canonical: "/about" },
};

const faqs = [
  {
    question: "Are the brain games really free?",
    answer: "Yes! All 100 brain games on SeniorBrainGames are completely free. No sign-up, no account, no hidden fees — just visit and play.",
  },
  {
    question: "Do brain games help seniors stay sharp?",
    answer: "Research suggests that regular mental stimulation through puzzles, trivia, and games can help maintain cognitive function as we age. While brain games are not a medical treatment, they provide enjoyable mental exercise.",
  },
  {
    question: "What types of games are available?",
    answer: "We offer 4 categories: Nostalgia Trivia (1950s–1980s pop culture), General Knowledge (science, history, geography), Word Games (scrambles, crosswords, riddles), and Memory Games (card matching, patterns, puzzles).",
  },
  {
    question: "Do I need to create an account?",
    answer: "No account is needed. You can start playing instantly. Your daily challenge streak is tracked locally in your browser.",
  },
  {
    question: "Is the site accessible for people with vision difficulties?",
    answer: "Yes. We use large text (minimum 18px), high contrast colors that meet WCAG AA standards, clear navigation, and full keyboard support so everyone can enjoy the games comfortably.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }}
      />
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

          <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="mb-2 text-xl font-bold text-foreground">{faq.question}</h3>
                <p className="text-text-muted">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
