"use client";

import { motion } from "framer-motion";

interface XPAnimationProps {
  total: number;
  breakdown?: { label: string; amount: number }[];
}

export default function XPAnimation({ total, breakdown }: XPAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
      className="text-center"
    >
      <motion.span
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
        className="inline-block text-2xl font-black text-primary"
      >
        +{total} XP
      </motion.span>
      {breakdown && breakdown.length > 0 && (
        <div className="mt-1 flex flex-wrap justify-center gap-2">
          {breakdown.map((item) =>
            item.amount > 0 ? (
              <span key={item.label} className="text-xs text-text-muted">
                {item.label}: +{item.amount}
              </span>
            ) : null,
          )}
        </div>
      )}
    </motion.div>
  );
}
