"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  BrainCircuit,
  Gamepad2,
  BarChart3,
  Calendar,
  Compass,
  Menu,
  X,
  Flame,
} from "lucide-react";
import GameSearch from "./GameSearch";
import ThemeToggle from "./ThemeToggle";
import { useProgress } from "@/lib/progress/useProgress";

const navLinks = [
  { href: "/play", label: "Play" },
  { href: "/progress", label: "My Progress" },
  { href: "/discover", label: "Discover" },
  { href: "/daily-challenge", label: "Daily Challenge" },
];

const mobileTabs = [
  { href: "/play", label: "Play", icon: Gamepad2 },
  { href: "/progress", label: "Progress", icon: BarChart3 },
  { href: "/daily-challenge", label: "Daily", icon: Calendar },
  { href: "/discover", label: "Discover", icon: Compass },
  { href: "#more", label: "More", icon: Menu },
];

export default function NavigationNew() {
  const [moreOpen, setMoreOpen] = useState(false);
  const pathname = usePathname();
  const { progress, isLoaded } = useProgress();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/play") return pathname === "/play" || pathname.startsWith("/play/");
    return pathname.startsWith(href);
  };

  useEffect(() => {
    setMoreOpen(false);
  }, [pathname]);

  const streakCount = isLoaded ? progress.streaks.current : 0;

  return (
    <>
      {/* Desktop + Mobile Top Nav */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-surface/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2.5">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 text-xl font-black text-primary transition-all hover:opacity-90 sm:text-2xl"
            style={{
              fontFamily: "var(--font-merriweather), var(--font-heading)",
            }}
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-md transition-transform group-hover:scale-105"
              style={{ background: "var(--gradient-primary)" }}
            >
              <BrainCircuit size={24} strokeWidth={2.5} />
            </div>
            <span className="hidden tracking-tight sm:inline">
              SeniorBrain<span className="text-secondary">Games</span>
            </span>
          </Link>

          {/* Center Nav (Desktop) */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-4 py-2 text-[15px] font-semibold transition-all ${
                  isActive(link.href)
                    ? "bg-primary/10 text-primary"
                    : "text-text-muted hover:bg-primary-50 hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Streak */}
            {streakCount > 0 && (
              <div className="flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1.5 text-sm font-bold text-accent">
                <Flame size={16} strokeWidth={2.5} />
                {streakCount}
              </div>
            )}

            <GameSearch />
            <ThemeToggle />

            {/* Mobile more toggle */}
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-primary-50 lg:hidden"
              aria-label="Toggle menu"
            >
              {moreOpen ? (
                <X size={24} strokeWidth={2.5} />
              ) : (
                <Search size={20} strokeWidth={2.5} className="hidden" />
              )}
              {!moreOpen && <Menu size={24} strokeWidth={2.5} />}
            </button>
          </div>
        </div>

        {/* Mobile "More" dropdown */}
        {moreOpen && (
          <nav className="absolute inset-x-0 top-full bg-surface shadow-xl lg:hidden">
            <div className="mx-auto max-w-6xl space-y-1 px-6 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block rounded-lg px-4 py-3 text-lg font-semibold transition-all ${
                    isActive(link.href)
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-primary-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/printable-puzzles"
                className="block rounded-lg px-4 py-3 text-lg font-semibold text-foreground hover:bg-primary-50"
              >
                Printable Puzzles
              </Link>
              <Link
                href="/blog"
                className="block rounded-lg px-4 py-3 text-lg font-semibold text-foreground hover:bg-primary-50"
              >
                Blog
              </Link>
              <Link
                href="/about"
                className="block rounded-lg px-4 py-3 text-lg font-semibold text-foreground hover:bg-primary-50"
              >
                About
              </Link>
            </div>
          </nav>
        )}
      </header>

      {/* Mobile Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-surface/95 backdrop-blur-sm pb-safe lg:hidden">
        <div className="flex items-center justify-around px-2 py-1.5">
          {mobileTabs.map((tab) => {
            const active = tab.href === "#more" ? moreOpen : isActive(tab.href);
            const Icon = tab.icon;

            if (tab.href === "#more") {
              return (
                <button
                  key={tab.href}
                  onClick={() => setMoreOpen(!moreOpen)}
                  className={`flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                    active ? "text-primary" : "text-text-muted"
                  }`}
                >
                  <Icon size={22} strokeWidth={2} />
                  <span>{tab.label}</span>
                </button>
              );
            }

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  active ? "text-primary" : "text-text-muted"
                }`}
              >
                <Icon size={22} strokeWidth={2} />
                <span>{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
