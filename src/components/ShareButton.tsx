"use client";

import { useState } from "react";

export default function ShareButton({
  quizTitle,
  percentage,
}: {
  quizTitle: string;
  percentage: number;
}) {
  const [copied, setCopied] = useState(false);

  const shareText = `I scored ${percentage}% on "${quizTitle}" at SeniorBrainGames! Can you beat my score?`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "SeniorBrainGames", text: shareText });
      } catch {
        // User cancelled
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Clipboard not available
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="w-full cursor-pointer rounded-xl border-2 border-secondary bg-secondary/10 px-8 py-4 text-lg font-semibold text-foreground transition-colors hover:bg-secondary/20 focus:outline-none focus:ring-4 focus:ring-secondary/30 sm:w-auto"
      aria-label="Share your score"
    >
      {copied ? "Copied!" : "Share Score"}
    </button>
  );
}
