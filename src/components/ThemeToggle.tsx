"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-10 w-10 shrink-0 rounded-lg bg-primary-50/20" />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex h-10 items-center gap-2 rounded-lg px-2 text-text-muted transition-colors hover:bg-primary-50 hover:text-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Light Mode" : "Dark Mode"}
    >
      {theme === "dark" ? (
        <Sun size={20} strokeWidth={2.5} />
      ) : (
        <Moon size={20} strokeWidth={2.5} />
      )}
      <span className="hidden text-xs font-bold uppercase tracking-wider sm:inline-block">Mode</span>
    </button>
  );
}
