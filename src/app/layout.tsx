import type { Metadata } from "next";
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
  title: {
    default: "SeniorBrainGames — Fun Brain Games for Seniors",
    template: "%s | SeniorBrainGames",
  },
  description:
    "Free brain games designed for seniors. Trivia, word games, memory challenges, and more. Keep your mind sharp with fun, engaging activities!",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "SeniorBrainGames",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
        <main id="main-content" className="mx-auto max-w-5xl px-4 py-8">
          {children}
        </main>
        <footer className="mt-12 border-t border-border bg-surface py-8">
          <div className="mx-auto max-w-5xl px-4">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
              <p className="text-lg font-semibold text-foreground">
                SeniorBrainGames.org
              </p>
              <nav aria-label="Footer navigation" className="flex gap-6">
                <a
                  href="/about"
                  className="text-base text-text-muted hover:text-primary transition-colors"
                >
                  About
                </a>
                <a
                  href="/privacy"
                  className="text-base text-text-muted hover:text-primary transition-colors"
                >
                  Privacy
                </a>
              </nav>
            </div>
            <p className="mt-4 text-center text-base text-text-muted">
              Keep your mind sharp with fun brain games!
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
