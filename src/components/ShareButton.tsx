"use client";

import { useState } from "react";
import { Share2, Facebook } from "lucide-react";

export default function ShareButton({
  quizTitle,
  percentage,
}: {
  quizTitle: string;
  percentage: number;
}) {
  const [copied, setCopied] = useState(false);

  const shareText = `I scored ${percentage}% on "${quizTitle}" at SeniorBrainGames! Can you beat my score?`;
  const shareUrl = "https://seniorbraingames.org";

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ 
          title: "SeniorBrainGames", 
          text: shareText,
          url: window.location.href 
        });
      } catch {
        // User cancelled
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Clipboard not available
      }
    }
  };

  const handleFacebookShare = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(shareText)}`;
    window.open(fbUrl, "_blank", "width=600,height=400");
  };

  return (
    <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
      <button
        onClick={handleShare}
        className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-secondary bg-secondary/10 px-6 py-3.5 text-base font-bold text-foreground transition-all duration-200 hover:bg-secondary/20 focus:outline-none focus:ring-4 focus:ring-secondary/20 sm:w-auto"
        aria-label="Share your score"
      >
        <Share2 size={18} strokeWidth={2.5} />
        {copied ? "Copied!" : "Share Result"}
      </button>
      
      <button
        onClick={handleFacebookShare}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1877F2] px-6 py-4 text-base font-bold text-white transition-all duration-200 hover:bg-[#166FE5] hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#1877F2]/30 sm:w-auto"
        aria-label="Share on Facebook"
      >
        <Facebook size={18} fill="white" />
        Facebook
      </button>
    </div>
  );
}
