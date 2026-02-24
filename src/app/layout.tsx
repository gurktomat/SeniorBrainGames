import type { Metadata, Viewport } from "next";
import Link from "next/link";
import Script from "next/script";
import { Merriweather, Inter } from "next/font/google";
import Navigation from "@/components/Navigation";
import JsonLd from "@/components/JsonLd";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ProgressProvider } from "@/lib/progress/ProgressProvider";
import "./globals.css";

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#7C5CFC",
};

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
    "cognitive exercises for elderly",
    "free brain games for adults",
    "nostalgia trivia 1950s 1960s",
    "mind games for seniors with dementia",
    "senior puzzles online",
    "daily brain workout for seniors",
    "printable puzzles for seniors",
    "activities for senior citizens",
    "mental stimulation for elderly",
    "online crossword for seniors",
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SeniorBrainGames",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "SeniorBrainGames",
    title: "SeniorBrainGames — Fun Brain Games for Seniors",
    description:
      "Free brain games designed for seniors. Trivia, word games, memory challenges, and more. Keep your mind sharp with fun, engaging activities!",
  },
  twitter: {
    card: "summary_large_image",
    title: "SeniorBrainGames — Fun Brain Games for Seniors",
    description:
      "Free brain games designed for seniors. Trivia, word games, memory challenges, and more.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
        className={`${merriweather.variable} ${inter.variable} antialiased`}
        style={{
          fontFamily: "var(--font-inter), var(--font-body)",
        }}
      >
        <ThemeProvider>
          <ProgressProvider>
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "SeniorBrainGames",
              url: "https://seniorbraingames.org",
              logo: "https://seniorbraingames.org/og-image.png",
              description:
                "Free brain games designed for seniors. Trivia, word games, memory challenges, and more. Keep your mind sharp with fun, engaging activities!",
            }}
          />
          <a href="#main-content" className="skip-to-content">
            Skip to content
          </a>
          <Navigation />
          <main id="main-content">
            {children}
          </main>
          <footer className="no-print mb-16 mt-16 border-t border-border bg-surface-alt lg:mb-0">
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
                    Train your brain, one game at a time.
                  </p>
                </div>
                <div>
                  <p className="mb-3 text-sm font-bold uppercase tracking-wider text-text-muted">
                    Quick Links
                  </p>
                  <nav aria-label="Footer quick links" className="flex flex-col gap-2">
                    <Link href="/play" className="text-base text-text-muted transition-colors hover:text-primary">Play Games</Link>
                    <Link href="/progress" className="text-base text-text-muted transition-colors hover:text-primary">My Progress</Link>
                    <Link href="/discover" className="text-base text-text-muted transition-colors hover:text-primary">Discover</Link>
                    <Link href="/daily-challenge" className="text-base text-text-muted transition-colors hover:text-primary">Daily Challenge</Link>
                    <Link href="/printable-puzzles" className="text-base text-text-muted transition-colors hover:text-primary">Printable Puzzles</Link>
                  </nav>
                </div>
                <div>
                  <p className="mb-3 text-sm font-bold uppercase tracking-wider text-text-muted">
                    Info
                  </p>
                  <nav aria-label="Footer info" className="flex flex-col gap-2">
                    <Link href="/about" className="text-base text-text-muted transition-colors hover:text-primary">About</Link>
                    <Link href="/faq" className="text-base text-text-muted transition-colors hover:text-primary">FAQ</Link>
                    <Link href="/blog" className="text-base text-text-muted transition-colors hover:text-primary">Blog</Link>
                    <Link href="/privacy" className="text-base text-text-muted transition-colors hover:text-primary">Privacy</Link>
                  </nav>
                </div>
              </div>
              <div className="mt-10 border-t border-border pt-6 text-center">
                <p className="text-sm text-text-muted">
                  &copy; {new Date().getFullYear()} SeniorBrainGames.org &middot; Made with care for seniors.
                </p>
              </div>
            </div>
          </footer>
        </ProgressProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
