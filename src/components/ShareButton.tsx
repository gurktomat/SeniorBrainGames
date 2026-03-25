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

  const handlePinterestShare = () => {
    // We use the page's og-image for the Pinterest media
    const mediaUrl = `${window.location.origin}/og-image.png`; 
    const pinUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&media=${encodeURIComponent(mediaUrl)}&description=${encodeURIComponent(shareText)}`;
    window.open(pinUrl, "_blank", "width=600,height=400");
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

      <button
        onClick={handlePinterestShare}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#E60023] px-6 py-4 text-base font-bold text-white transition-all duration-200 hover:bg-[#CC001F] hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#E60023]/30 sm:w-auto"
        aria-label="Save to Pinterest"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <path d="M12 0A12 12 0 0 0 7.6 23.16c-.08-.85-.15-2.15.03-3.08.16-.84 1.05-4.46 1.05-4.46s-.27-.53-.27-1.32c0-1.24.72-2.17 1.62-2.17.76 0 1.13.57 1.13 1.25 0 .76-.49 1.92-.74 2.98-.2.9.45 1.63 1.34 1.63 1.61 0 2.85-1.7 2.85-4.15 0-2.18-1.56-3.7-3.8-3.7-2.6 0-4.13 1.95-4.13 3.97 0 .78.3 1.62.68 2.08.07.09.08.17.06.26l-.22.92c-.03.12-.1.15-.22.09-1.22-.57-1.98-2.36-1.98-3.8 0-3.09 2.25-5.93 6.47-5.93 3.4 0 6.05 2.43 6.05 5.67 0 3.38-2.13 6.1-5.1 6.1-1 0-1.93-.52-2.25-1.13l-.62 2.34c-.22.84-.81 1.9-1.2 2.54A11.97 11.97 0 0 0 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z"/>
        </svg>
        Pinterest
      </button>
    </div>
  );
}
