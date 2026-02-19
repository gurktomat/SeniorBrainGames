import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "FAQ — Frequently Asked Questions",
  description:
    "Common questions about SeniorBrainGames — free brain games, printable puzzles, daily challenges, and more for seniors.",
  alternates: { canonical: "/faq" },
};

interface FAQ {
  question: string;
  answer: string;
  answerJsx: React.ReactNode;
}

const faqCategories: { title: string; faqs: FAQ[] }[] = [
  {
    title: "Getting Started",
    faqs: [
      {
        question: "What is SeniorBrainGames?",
        answer:
          "SeniorBrainGames is a free website with over 100 brain games designed for seniors. It includes trivia, word games, memory challenges, and printable puzzles — all playable instantly in your browser with no downloads or sign-ups.",
        answerJsx: (
          <p>
            SeniorBrainGames is a free website with over 100 brain games designed for seniors. It includes trivia, word games, memory challenges, and printable puzzles — all playable instantly in your browser with no downloads or sign-ups.
          </p>
        ),
      },
      {
        question: "Are the brain games really free?",
        answer:
          "Yes, 100% free. There are no hidden fees, no premium tiers, and no in-app purchases. Every game and printable puzzle on the site is completely free to use.",
        answerJsx: (
          <p>
            Yes, 100% free. There are no hidden fees, no premium tiers, and no in-app purchases. Every game and printable puzzle on the site is completely free to use.
          </p>
        ),
      },
      {
        question: "Do I need to create an account or sign up?",
        answer:
          "No. You can start playing immediately — no account, email address, or registration required. Your daily challenge streak is tracked locally in your browser.",
        answerJsx: (
          <p>
            No. You can start playing immediately — no account, email address, or registration required. Your daily challenge streak is tracked locally in your browser.
          </p>
        ),
      },
      {
        question: "What devices can I play on?",
        answer:
          "SeniorBrainGames works on any device with a web browser — desktop computers, laptops, tablets, and smartphones. The site is fully responsive and adapts to all screen sizes.",
        answerJsx: (
          <p>
            SeniorBrainGames works on any device with a web browser — desktop computers, laptops, tablets, and smartphones. The site is fully responsive and adapts to all screen sizes.
          </p>
        ),
      },
      {
        question: "Do I need to download anything?",
        answer:
          "No downloads required. Everything runs directly in your web browser. Just visit the site and start playing.",
        answerJsx: (
          <p>
            No downloads required. Everything runs directly in your web browser. Just visit the site and start playing.
          </p>
        ),
      },
    ],
  },
  {
    title: "Games & Puzzles",
    faqs: [
      {
        question: "How many games are available?",
        answer:
          "There are over 100 brain games across four categories: Nostalgia Trivia, General Knowledge, Word Games, and Memory Games. There are also 27 printable puzzles you can print and solve with pen and paper.",
        answerJsx: (
          <p>
            There are over 100 brain games across four categories:{" "}
            <Link href="/nostalgia-trivia" className="text-primary underline hover:no-underline">Nostalgia Trivia</Link>,{" "}
            <Link href="/general-knowledge" className="text-primary underline hover:no-underline">General Knowledge</Link>,{" "}
            <Link href="/word-games" className="text-primary underline hover:no-underline">Word Games</Link>, and{" "}
            <Link href="/memory-games" className="text-primary underline hover:no-underline">Memory Games</Link>.
            There are also 27{" "}
            <Link href="/printable-puzzles" className="text-primary underline hover:no-underline">printable puzzles</Link>{" "}
            you can print and solve with pen and paper.
          </p>
        ),
      },
      {
        question: "What types of games do you offer?",
        answer:
          "Game types include multiple-choice trivia, word scrambles, crosswords, word searches, hangman, riddles, cryptograms, memory card matching, pattern recognition, sorting challenges, true-or-false, who-am-I clue games, sudoku, sliding puzzles, and more.",
        answerJsx: (
          <p>
            Game types include multiple-choice trivia, word scrambles, crosswords, word searches, hangman, riddles, cryptograms, memory card matching, pattern recognition, sorting challenges, true-or-false, who-am-I clue games, sudoku, sliding puzzles, and more.
          </p>
        ),
      },
      {
        question: "What are printable puzzles?",
        answer:
          "Printable puzzles are PDF-style puzzles you can print at home and solve with a pencil. They include crosswords, word searches, sudoku, word scrambles, riddles, word ladders, cryptograms, logic grid puzzles, and mazes.",
        answerJsx: (
          <p>
            <Link href="/printable-puzzles" className="text-primary underline hover:no-underline">Printable puzzles</Link>{" "}
            are puzzles you can print at home and solve with a pencil. They include crosswords, word searches, sudoku, word scrambles, riddles, word ladders, cryptograms, logic grid puzzles, and mazes.
          </p>
        ),
      },
      {
        question: "How does the Daily Challenge work?",
        answer:
          "The Daily Challenge is a fresh 5-question quiz every day. It tracks your streak in your browser so you can see how many days in a row you've played. A new challenge is available each day at midnight.",
        answerJsx: (
          <p>
            The <Link href="/daily-challenge" className="text-primary underline hover:no-underline">Daily Challenge</Link>{" "}
            is a fresh 5-question quiz every day. It tracks your streak in your browser so you can see how many days in a row you&apos;ve played. A new challenge is available each day at midnight.
          </p>
        ),
      },
      {
        question: "Can I replay games?",
        answer:
          "Yes! You can replay any game as many times as you like. Quiz questions are shuffled each time, so the experience stays fresh.",
        answerJsx: (
          <p>
            Yes! You can replay any game as many times as you like. Quiz questions are shuffled each time, so the experience stays fresh.
          </p>
        ),
      },
    ],
  },
  {
    title: "Brain Health",
    faqs: [
      {
        question: "Do brain games really help seniors stay sharp?",
        answer:
          "Research suggests that regular mental stimulation through puzzles, trivia, and games can help maintain cognitive function as we age. While brain games are not a medical treatment, they provide enjoyable mental exercise that keeps your mind active.",
        answerJsx: (
          <p>
            Research suggests that regular mental stimulation through puzzles, trivia, and games can help maintain cognitive function as we age. While brain games are not a medical treatment, they provide enjoyable mental exercise that keeps your mind active. Learn more on our{" "}
            <Link href="/blog" className="text-primary underline hover:no-underline">blog</Link>.
          </p>
        ),
      },
      {
        question: "How often should I play brain games?",
        answer:
          "Even 10–15 minutes a day can make a difference. Consistency matters more than duration — that's why we offer a Daily Challenge to help you build a regular habit.",
        answerJsx: (
          <p>
            Even 10–15 minutes a day can make a difference. Consistency matters more than duration — that&apos;s why we offer a{" "}
            <Link href="/daily-challenge" className="text-primary underline hover:no-underline">Daily Challenge</Link>{" "}
            to help you build a regular habit.
          </p>
        ),
      },
      {
        question: "What type of brain exercise is best for seniors?",
        answer:
          "Variety is key. Mixing different types of activities — trivia for recall, word games for language, memory games for working memory, and puzzles for problem-solving — exercises different parts of the brain. SeniorBrainGames offers all of these.",
        answerJsx: (
          <p>
            Variety is key. Mixing different types of activities — trivia for recall, word games for language, memory games for working memory, and puzzles for problem-solving — exercises different parts of the brain. SeniorBrainGames offers all of these across{" "}
            <Link href="/nostalgia-trivia" className="text-primary underline hover:no-underline">trivia</Link>,{" "}
            <Link href="/word-games" className="text-primary underline hover:no-underline">word games</Link>,{" "}
            <Link href="/memory-games" className="text-primary underline hover:no-underline">memory games</Link>, and{" "}
            <Link href="/general-knowledge" className="text-primary underline hover:no-underline">general knowledge</Link>.
          </p>
        ),
      },
      {
        question: "Are brain games a substitute for medical advice?",
        answer:
          "No. Brain games are for entertainment and mental stimulation. They are not a medical treatment or diagnostic tool. If you have concerns about cognitive health, please consult a healthcare professional.",
        answerJsx: (
          <p>
            No. Brain games are for entertainment and mental stimulation. They are not a medical treatment or diagnostic tool. If you have concerns about cognitive health, please consult a healthcare professional.
          </p>
        ),
      },
    ],
  },
  {
    title: "Accessibility & Privacy",
    faqs: [
      {
        question: "Is the site accessible for people with vision difficulties?",
        answer:
          "Yes. We use large text (minimum 18px), high-contrast colors that meet WCAG AA standards, clear navigation, and full keyboard support so everyone can enjoy the games comfortably.",
        answerJsx: (
          <p>
            Yes. We use large text (minimum 18px), high-contrast colors that meet WCAG AA standards, clear navigation, and full keyboard support so everyone can enjoy the games comfortably.
          </p>
        ),
      },
      {
        question: "Can I use keyboard navigation?",
        answer:
          "Yes. All games and pages support full keyboard navigation. You can use Tab to move between elements and Enter or Space to interact.",
        answerJsx: (
          <p>
            Yes. All games and pages support full keyboard navigation. You can use Tab to move between elements and Enter or Space to interact.
          </p>
        ),
      },
      {
        question: "How is my data stored?",
        answer:
          "Your game progress and daily challenge streak are stored locally in your browser using localStorage. We do not collect personal data, and nothing is sent to a server. You can clear your browser data at any time.",
        answerJsx: (
          <p>
            Your game progress and daily challenge streak are stored locally in your browser using localStorage. We do not collect personal data, and nothing is sent to a server. You can clear your browser data at any time.
          </p>
        ),
      },
      {
        question: "Do you use cookies?",
        answer:
          "We use Google Analytics to understand how people use the site and improve it. This may set cookies. We do not use any advertising cookies or tracking for marketing purposes. See our Privacy Policy for details.",
        answerJsx: (
          <p>
            We use Google Analytics to understand how people use the site and improve it. This may set cookies. We do not use any advertising cookies or tracking for marketing purposes. See our{" "}
            <Link href="/privacy" className="text-primary underline hover:no-underline">Privacy Policy</Link>{" "}
            for details.
          </p>
        ),
      },
      {
        question: "How can I contact you?",
        answer:
          "You can reach us through the contact information on our About page. We welcome feedback, suggestions, and questions.",
        answerJsx: (
          <p>
            You can reach us through the contact information on our{" "}
            <Link href="/about" className="text-primary underline hover:no-underline">About page</Link>.
            We welcome feedback, suggestions, and questions.
          </p>
        ),
      },
    ],
  },
];

const allFaqs = faqCategories.flatMap((cat) => cat.faqs);

export default function FAQPage() {
  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: allFaqs.map((faq) => ({
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
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-text-muted">
            Everything you need to know about SeniorBrainGames
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="space-y-10">
          {faqCategories.map((category) => (
            <section key={category.title}>
              <h2
                className="mb-4 text-2xl font-bold text-foreground"
                style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
              >
                {category.title}
              </h2>
              <div className="space-y-3">
                {category.faqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="group rounded-xl border border-border bg-surface"
                    style={{ boxShadow: "var(--shadow-sm)" }}
                  >
                    <summary className="cursor-pointer select-none px-6 py-4 text-lg font-bold text-foreground transition-colors hover:text-primary [&::-webkit-details-marker]:hidden">
                      <span className="flex items-center justify-between gap-4">
                        <span>{faq.question}</span>
                        <span
                          className="shrink-0 text-text-muted transition-transform group-open:rotate-45"
                          aria-hidden="true"
                        >
                          +
                        </span>
                      </span>
                    </summary>
                    <div className="px-6 pb-5 text-base leading-relaxed text-text-muted">
                      {faq.answerJsx}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-surface p-8 text-center" style={{ boxShadow: "var(--shadow-sm)" }}>
          <h2
            className="mb-3 text-xl font-bold text-foreground"
            style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
          >
            Still have questions?
          </h2>
          <p className="text-base text-text-muted">
            Visit our{" "}
            <Link href="/about" className="text-primary underline hover:no-underline">About page</Link>{" "}
            or start exploring our{" "}
            <Link href="/word-games" className="text-primary underline hover:no-underline">games</Link>{" "}
            — no sign-up needed!
          </p>
        </div>
      </div>
    </div>
  );
}
