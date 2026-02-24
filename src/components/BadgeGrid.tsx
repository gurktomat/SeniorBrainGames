"use client";

import {
  Rocket, Star, Globe, Flame, Crown, Trophy,
  Calendar, Compass, Zap,
} from "lucide-react";
import { ALL_BADGES } from "@/lib/progress/badges";
import type { BadgeId, BadgeTier } from "@/lib/progress/types";

interface BadgeGridProps {
  earnedBadges: BadgeId[];
}

const ICON_MAP: Record<string, typeof Rocket> = {
  rocket: Rocket,
  star: Star,
  globe: Globe,
  flame: Flame,
  crown: Crown,
  trophy: Trophy,
  calendar: Calendar,
  compass: Compass,
  zap: Zap,
};

const TIER_COLORS: Record<BadgeTier, string> = {
  bronze: "#CD7F32",
  silver: "#A0AEC0",
  gold: "#F59E0B",
};

export default function BadgeGrid({ earnedBadges }: BadgeGridProps) {
  const earnedSet = new Set(earnedBadges);

  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
      {ALL_BADGES.map((badge) => {
        const Icon = ICON_MAP[badge.icon] ?? Star;
        const earned = earnedSet.has(badge.id);
        const tierColor = TIER_COLORS[badge.tier];

        return (
          <div
            key={badge.id}
            className={`flex flex-col items-center rounded-xl p-3 text-center transition-all ${
              earned
                ? "bg-surface"
                : "bg-surface-alt opacity-50 grayscale"
            }`}
            title={earned ? `${badge.name} — ${badge.description}` : `Locked: ${badge.description}`}
          >
            <div
              className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full ${
                earned ? "text-white" : "bg-border text-text-muted"
              }`}
              style={earned ? { background: tierColor } : undefined}
            >
              <Icon size={18} />
            </div>
            <p className="text-xs font-bold text-foreground leading-tight">{badge.name}</p>
            <p className="mt-0.5 text-[10px] capitalize text-text-muted">{badge.tier}</p>
          </div>
        );
      })}
    </div>
  );
}
