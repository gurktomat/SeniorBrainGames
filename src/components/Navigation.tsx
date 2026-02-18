"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/nostalgia-trivia", label: "Nostalgia Trivia" },
  { href: "/general-knowledge", label: "General Knowledge" },
  { href: "/word-games", label: "Word Games" },
  { href: "/memory-games", label: "Memory Games" },
  { href: "/daily-challenge", label: "Daily Challenge" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="glass-nav sticky top-0 z-50 border-b border-border/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-primary transition-colors hover:text-primary-dark"
          style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg text-lg" style={{ background: "var(--gradient-primary)" }}>
            <span className="text-white">B</span>
          </span>
          SeniorBrainGames
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`rounded-lg px-3 py-2 text-[15px] font-semibold transition-all duration-200 ${
                    isActive(link.href)
                      ? "text-white shadow-sm"
                      : "text-text-muted hover:bg-primary-50 hover:text-primary"
                  }`}
                  style={isActive(link.href) ? { background: "var(--gradient-primary)" } : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-primary-50 lg:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {isOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="border-t border-border/60 bg-surface px-6 py-3 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block rounded-lg px-4 py-3 text-lg font-semibold transition-all duration-200 ${
                    isActive(link.href)
                      ? "text-white"
                      : "text-foreground hover:bg-primary-50 hover:text-primary"
                  }`}
                  style={isActive(link.href) ? { background: "var(--gradient-primary)" } : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
