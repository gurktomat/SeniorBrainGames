"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RotateCcw, ArrowRight, Home, Flame } from "lucide-react";
import Confetti from "./Confetti";
import XPAnimation from "./XPAnimation";
import BadgeUnlock from "./BadgeUnlock";
import type { XPGain, BadgeId } from "@/lib/progress/types";

interface GameCompletionScreenProps {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpentMs?: number;
  xpGained: XPGain;
  newBadges: BadgeId[];
  streakCount: number;
  leveledUp: boolean;
  categoryColor?: string;
  onPlayAgain: () => void;
  onNextGame?: () => void;
  onBackToDashboard: () => void;
}

function ScoreRing({ percentage, color }: { percentage: number; color: string }) {
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative mx-auto h-36 w-36">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 128 128">
        <circle
          cx="64" cy="64" r={radius}
          fill="none" stroke="var(--color-border)" strokeWidth="8"
        />
        <motion.circle
          cx="64" cy="64" r={radius}
          fill="none" stroke={color} strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-black text-foreground">{percentage}%</span>
      </div>
    </div>
  );
}

function getMessage(score: number): string {
  if (score === 100) return "Perfect score! You're a genius!";
  if (score >= 90) return "Outstanding! Almost perfect!";
  if (score >= 70) return "Great job! Well done!";
  if (score >= 50) return "Good effort! Keep practicing!";
  return "Nice try! You'll do better next time!";
}

export default function GameCompletionScreen({
  score,
  totalQuestions,
  correctAnswers,
  timeSpentMs,
  xpGained,
  newBadges,
  streakCount,
  leveledUp,
  categoryColor = "#7C5CFC",
  onPlayAgain,
  onNextGame,
  onBackToDashboard,
}: GameCompletionScreenProps) {
  const [showBadges, setShowBadges] = useState(false);

  useEffect(() => {
    if (newBadges.length > 0) {
      const timer = setTimeout(() => setShowBadges(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [newBadges]);

  const minutes = timeSpentMs ? Math.floor(timeSpentMs / 60000) : null;
  const seconds = timeSpentMs ? Math.floor((timeSpentMs % 60000) / 1000) : null;

  return (
    <>
      {score >= 70 && <Confetti />}
      {showBadges && (
        <BadgeUnlock badgeIds={newBadges} onDismiss={() => setShowBadges(false)} />
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-lg px-6 py-12"
      >
        <div className="card-playful overflow-hidden p-8 text-center">
          {/* Score ring */}
          <ScoreRing percentage={score} color={categoryColor} />

          {/* Score text */}
          <p className="mt-4 text-lg font-bold text-foreground">
            {correctAnswers} / {totalQuestions} correct
          </p>
          <p className="mt-1 text-base text-text-muted">{getMessage(score)}</p>

          {/* Time */}
          {minutes !== null && seconds !== null && (
            <p className="mt-2 text-sm text-text-muted">
              Time: {minutes}m {seconds}s
            </p>
          )}

          {/* XP */}
          <div className="mt-6">
            <XPAnimation
              total={xpGained.total}
              breakdown={[
                { label: "Base", amount: xpGained.base },
                { label: "Score", amount: xpGained.scoreBonus },
                { label: "Perfect", amount: xpGained.perfectBonus },
                { label: "Daily", amount: xpGained.dailyBonus },
              ]}
            />
          </div>

          {/* Level up */}
          {leveledUp && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: "spring" }}
              className="mt-4 rounded-lg bg-primary-50 px-4 py-2 text-sm font-bold text-primary"
            >
              Level Up!
            </motion.div>
          )}

          {/* Streak */}
          {streakCount > 0 && (
            <div className="mt-4 flex items-center justify-center gap-1.5 text-sm font-bold text-accent">
              <Flame size={16} />
              {streakCount} day streak!
            </div>
          )}

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-3">
            <button
              onClick={onPlayAgain}
              className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-bold"
            >
              <RotateCcw size={18} />
              Play Again
            </button>
            {onNextGame && (
              <button
                onClick={onNextGame}
                className="btn-secondary inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-bold"
              >
                <ArrowRight size={18} />
                Next Game
              </button>
            )}
            <button
              onClick={onBackToDashboard}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-text-muted transition-colors hover:text-primary"
            >
              <Home size={16} />
              Back to Dashboard
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
