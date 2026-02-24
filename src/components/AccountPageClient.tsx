"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, Trash2, Cloud, CloudOff, Settings } from "lucide-react";
import { useProgress } from "@/lib/progress/useProgress";
import { getLevelInfo } from "@/lib/progress/xp";

export default function AccountPageClient() {
  const { progress, isLoaded, updatePreferences } = useProgress();
  const [showReset, setShowReset] = useState(false);

  if (!isLoaded) return null;

  const levelInfo = getLevelInfo(progress.xp);
  const memberSince = progress.createdAt
    ? new Date(progress.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : "Today";

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(progress, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `seniorbraingames-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("sbg-progress");
      window.location.reload();
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="px-6 py-10" style={{ background: "var(--gradient-warm)" }}>
        <div className="mx-auto max-w-2xl text-center">
          <h1
            className="mb-2 text-3xl font-bold text-foreground sm:text-4xl"
            style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
          >
            Account
          </h1>
          <p className="text-lg text-text-muted">
            Manage your settings and progress
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-6 py-10 space-y-8">
        {/* Stats Overview */}
        <div className="card-playful p-6">
          <h2 className="mb-4 text-lg font-bold text-foreground">Your Stats</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{levelInfo.level}</p>
              <p className="text-xs text-text-muted">Level</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{progress.xp}</p>
              <p className="text-xs text-text-muted">Total XP</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{progress.gamesPlayed.length}</p>
              <p className="text-xs text-text-muted">Games Played</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{progress.badges.length}</p>
              <p className="text-xs text-text-muted">Badges</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-text-muted">Member since {memberSince}</p>
        </div>

        {/* Cloud Sync */}
        <div className="card-playful p-6">
          <div className="flex items-start gap-3">
            <CloudOff size={24} className="mt-0.5 shrink-0 text-text-muted" />
            <div>
              <h2 className="mb-1 text-lg font-bold text-foreground">Cloud Sync</h2>
              <p className="mb-4 text-sm text-text-muted">
                Cloud sync is coming soon! Your progress is currently saved locally on this device.
              </p>
              <span className="inline-block rounded-full bg-primary-50 px-3 py-1.5 text-sm font-bold text-primary">
                Coming Soon
              </span>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="card-playful p-6">
          <div className="flex items-center gap-2 mb-4">
            <Settings size={20} className="text-primary" />
            <h2 className="text-lg font-bold text-foreground">Preferences</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-foreground">Session Length</label>
              <select
                value={progress.preferences.sessionLength}
                onChange={(e) => updatePreferences({ sessionLength: e.target.value as "quick" | "relaxed" | "deep-focus" })}
                className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-base text-foreground"
              >
                <option value="quick">Quick (~5 minutes)</option>
                <option value="relaxed">Relaxed (~15 minutes)</option>
                <option value="deep-focus">Deep Focus (30+ minutes)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="card-playful p-6">
          <h2 className="mb-4 text-lg font-bold text-foreground">Data</h2>
          <div className="space-y-3">
            <button
              onClick={handleExport}
              className="flex w-full items-center gap-3 rounded-lg border border-border px-4 py-3 text-left text-sm font-semibold text-foreground transition-colors hover:bg-surface-alt"
            >
              <Download size={18} className="text-primary" />
              Export Progress Data
            </button>

            {!showReset ? (
              <button
                onClick={() => setShowReset(true)}
                className="flex w-full items-center gap-3 rounded-lg border border-red-200 px-4 py-3 text-left text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
              >
                <Trash2 size={18} />
                Reset All Progress
              </button>
            ) : (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <p className="mb-3 text-sm font-semibold text-red-700">
                  Are you sure? This will permanently delete all your progress, badges, and streaks.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleReset}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700"
                  >
                    Yes, Reset Everything
                  </button>
                  <button
                    onClick={() => setShowReset(false)}
                    className="rounded-lg px-4 py-2 text-sm font-semibold text-text-muted hover:text-foreground"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
