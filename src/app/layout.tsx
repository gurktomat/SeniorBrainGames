import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SeniorBrainGames — Nostalgia Trivia",
  description:
    "Fun trivia games for seniors featuring questions from the 1950s through the 1980s.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
            <Link href="/" className="text-2xl font-bold text-blue-700">
              🧠 SeniorBrainGames
            </Link>
          </div>
        </header>
        <main className="mx-auto max-w-4xl px-4 py-8">{children}</main>
        <footer className="mt-12 border-t border-gray-200 py-6 text-center text-base text-gray-500">
          SeniorBrainGames.org — Keep your mind sharp!
        </footer>
      </body>
    </html>
  );
}
