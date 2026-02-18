import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Merriweather, Source_Sans_3 } from "next/font/google";
import Navigation from "@/components/Navigation";
import "./globals.css";

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://seniorbraingames.org"),
  title: {
    default: "SeniorBrainGames — Fun Brain Games for Seniors",
    template: "%s | SeniorBrainGames",
  },
  description:
    "Free brain games designed for seniors. Trivia, word games, memory challenges, and more. Keep your mind sharp with fun, engaging activities!",
  keywords: [
    "brain games for seniors",
    "senior brain games",
    "trivia for seniors",
    "memory games for seniors",
    "word games for seniors",
    "cognitive exercises",
    "free brain games",
    "nostalgia trivia",
    "mind games for elderly",
    "senior puzzles",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "SeniorBrainGames",
    title: "SeniorBrainGames — Fun Brain Games for Seniors",
    description:
      "Free brain games designed for seniors. Trivia, word games, memory challenges, and more. Keep your mind sharp with fun, engaging activities!",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SeniorBrainGames — Keep Your Mind Sharp & Active",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SeniorBrainGames — Fun Brain Games for Seniors",
    description:
      "Free brain games designed for seniors. Trivia, word games, memory challenges, and more.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JNTGNX70MF"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JNTGNX70MF');
          `}
        </Script>
      </head>
      <body
        className={`${merriweather.variable} ${sourceSans.variable} antialiased`}
        style={{
          fontFamily: "var(--font-source-sans), var(--font-body)",
        }}
      >
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <Navigation />
        <main id="main-content">
          {children}
        </main>
        <footer className="mt-16 border-t border-border bg-surface">
          <div className="mx-auto max-w-6xl px-6 py-12">
            <div className="grid gap-8 sm:grid-cols-3">
              <div>
                <p
                  className="mb-2 text-lg font-bold text-foreground"
                  style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
                >
                  SeniorBrainGames
                </p>
                <p className="text-base text-text-muted">
                  Keep your mind sharp with fun, free brain games designed for everyone.
                </p>
              </div>
              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-wider text-text-muted">
                  Categories
                </p>
                <nav aria-label="Footer categories" className="flex flex-col gap-2">
                  <Link href="/nostalgia-trivia" className="text-base text-text-muted transition-colors hover:text-primary">Nostalgia Trivia</Link>
                  <Link href="/general-knowledge" className="text-base text-text-muted transition-colors hover:text-primary">General Knowledge</Link>
                  <Link href="/word-games" className="text-base text-text-muted transition-colors hover:text-primary">Word Games</Link>
                  <Link href="/memory-games" className="text-base text-text-muted transition-colors hover:text-primary">Memory Games</Link>
                </nav>
              </div>
              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-wider text-text-muted">
                  Site
                </p>
                <nav aria-label="Footer navigation" className="flex flex-col gap-2">
                  <Link href="/daily-challenge" className="text-base text-text-muted transition-colors hover:text-primary">Daily Challenge</Link>
                  <Link href="/about" className="text-base text-text-muted transition-colors hover:text-primary">About</Link>
                  <Link href="/privacy" className="text-base text-text-muted transition-colors hover:text-primary">Privacy</Link>
                </nav>
              </div>
            </div>
            <div className="mt-10 border-t border-border pt-6 text-center">
              <p className="text-sm text-text-muted">
                &copy; {new Date().getFullYear()} SeniorBrainGames.org. Free brain games for a sharper mind.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
