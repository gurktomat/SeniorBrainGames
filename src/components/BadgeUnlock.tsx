"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { getBadgeDefinition } from "@/lib/progress/badges";
import type { BadgeId } from "@/lib/progress/types";

interface BadgeUnlockProps {
  badgeIds: BadgeId[];
  onDismiss: () => void;
}

export default function BadgeUnlock({ badgeIds, onDismiss }: BadgeUnlockProps) {
  if (badgeIds.length === 0) return null;

  const badges = badgeIds.map(getBadgeDefinition).filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 p-6"
      onClick={onDismiss}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative w-full max-w-sm rounded-2xl bg-surface p-8 text-center shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onDismiss}
          className="absolute right-3 top-3 rounded-lg p-1 text-text-muted hover:bg-primary-50"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <p className="mb-4 text-sm font-bold uppercase tracking-wider text-primary">
          {badges.length === 1 ? "Badge Unlocked!" : "Badges Unlocked!"}
        </p>

        <div className="space-y-4">
          {badges.map((badge) =>
            badge ? (
              <motion.div
                key={badge.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, delay: 0.2 }}
              >
                <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-3xl">
                  {badge.icon}
                </div>
                <h3
                  className="text-lg font-bold text-foreground"
                  style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
                >
                  {badge.name}
                </h3>
                <p className="text-sm text-text-muted">{badge.description}</p>
              </motion.div>
            ) : null,
          )}
        </div>

        <button
          onClick={onDismiss}
          className="btn-primary mt-6 px-6 py-2.5 text-sm font-bold"
        >
          Awesome!
        </button>
      </motion.div>
    </motion.div>
  );
}
