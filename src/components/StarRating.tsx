"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Star } from "lucide-react";

function getGameInfo(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length >= 2) {
    return { category: parts[0], slug: parts[1] };
  }
  return null;
}

function getStorageKey(slug: string) {
  return `rating-${slug}`;
}

export default function StarRating() {
  const pathname = usePathname();
  const gameInfo = getGameInfo(pathname);

  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!gameInfo) return;
    // Load user's previous rating from localStorage
    const stored = localStorage.getItem(getStorageKey(gameInfo.slug));
    if (stored) {
      setUserRating(Number(stored));
      setSubmitted(true);
    }
    // Fetch aggregate
    fetch(
      `/api/ratings?game=${encodeURIComponent(gameInfo.slug)}&category=${encodeURIComponent(gameInfo.category)}`,
    )
      .then((r) => r.json())
      .then((data) => {
        if (data.avgRating) setAvgRating(data.avgRating);
        if (data.ratingCount) setRatingCount(data.ratingCount);
      })
      .catch(() => {});
  }, [gameInfo?.slug, gameInfo?.category]);

  if (!gameInfo) return null;

  const handleRate = async (rating: number) => {
    setUserRating(rating);
    setSubmitted(true);
    localStorage.setItem(getStorageKey(gameInfo.slug), String(rating));

    try {
      const res = await fetch("/api/ratings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gameSlug: gameInfo.slug,
          category: gameInfo.category,
          rating,
        }),
      });
      const data = await res.json();
      if (data.avgRating) setAvgRating(data.avgRating);
      if (data.ratingCount) setRatingCount(data.ratingCount);
    } catch {
      // Rating saved locally even if API fails
    }
  };

  const displayRating = hoverRating || userRating;

  return (
    <div className="flex flex-col items-center gap-2 py-3">
      <p className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
        {submitted ? "Thanks for rating!" : "How did you like this game?"}
      </p>
      <div
        role="radiogroup"
        aria-label="Rate this game from 1 to 5 stars"
        className="flex gap-1"
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            role="radio"
            aria-checked={userRating === star}
            aria-label={`${star} star${star !== 1 ? "s" : ""}`}
            onClick={() => handleRate(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="p-1 rounded-md transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-400"
            style={{ minWidth: 44, minHeight: 44 }}
          >
            <Star
              size={32}
              fill={star <= displayRating ? "#f59e0b" : "none"}
              stroke={star <= displayRating ? "#f59e0b" : "#d1d5db"}
              strokeWidth={1.5}
            />
          </button>
        ))}
      </div>
      {ratingCount > 0 && (
        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
          {avgRating} avg &middot; {ratingCount} rating{ratingCount !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}
