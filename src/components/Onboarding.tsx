"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, Globe, Type, Brain, Clock, Sparkles } from "lucide-react";
import { useProgress } from "@/lib/progress/useProgress";

const categories = [
  { id: "nostalgia-trivia", label: "Nostalgia Trivia", icon: Radio, color: "#6366F1" },
  { id: "general-knowledge", label: "General Knowledge", icon: Globe, color: "#0EA5E9" },
  { id: "word-games", label: "Word Games", icon: Type, color: "#F59E0B" },
  { id: "memory-games", label: "Memory Games", icon: Brain, color: "#10B981" },
];

const sessionOptions = [
  { id: "quick", label: "Quick", time: "~5 minutes", description: "One game, one win" },
  { id: "relaxed", label: "Relaxed", time: "~15 minutes", description: "A few games to unwind" },
  { id: "deep-focus", label: "Deep Focus", time: "30+ minutes", description: "A full brain workout" },
] as const;

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sessionLength, setSessionLength] = useState<"quick" | "relaxed" | "deep-focus">("relaxed");
  const { updatePreferences } = useProgress();

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  };

  const finish = () => {
    updatePreferences({
      favoriteCategories: selectedCategories.length > 0 ? selectedCategories : categories.map((c) => c.id),
      sessionLength,
      onboardingComplete: true,
    });
    onComplete();
  };

  const skip = () => {
    updatePreferences({ onboardingComplete: true });
    onComplete();
  };

  return (
    <div className="mx-auto max-w-lg px-6 py-12">
      {/* Skip */}
      <div className="mb-6 text-right">
        <button
          onClick={skip}
          className="text-sm font-semibold text-text-muted transition-colors hover:text-primary"
        >
          Skip
        </button>
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="step0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="text-center"
          >
            <Sparkles className="mx-auto mb-4 text-primary" size={32} />
            <h2
              className="mb-2 text-2xl font-bold text-foreground"
              style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
            >
              What interests you?
            </h2>
            <p className="mb-8 text-base text-text-muted">Pick your favorite categories (you can change later)</p>
            <div className="grid grid-cols-2 gap-4">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const selected = selectedCategories.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    onClick={() => toggleCategory(cat.id)}
                    className={`card-playful flex flex-col items-center gap-3 p-5 transition-all ${
                      selected ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-xl text-white"
                      style={{ background: cat.color }}
                    >
                      <Icon size={24} />
                    </span>
                    <span className="text-sm font-semibold text-foreground">{cat.label}</span>
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setStep(1)}
              className="btn-primary mt-8 px-8 py-3 text-base font-bold"
            >
              Next
            </button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="text-center"
          >
            <Clock className="mx-auto mb-4 text-primary" size={32} />
            <h2
              className="mb-2 text-2xl font-bold text-foreground"
              style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
            >
              How much time do you have?
            </h2>
            <p className="mb-8 text-base text-text-muted">We&apos;ll tailor recommendations to fit</p>
            <div className="flex flex-col gap-3">
              {sessionOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSessionLength(opt.id)}
                  className={`card-playful flex items-center gap-4 p-5 text-left transition-all ${
                    sessionLength === opt.id ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <div>
                    <p className="font-bold text-foreground">{opt.label}</p>
                    <p className="text-sm text-text-muted">{opt.description} &middot; {opt.time}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={() => setStep(0)}
                className="px-6 py-2.5 text-sm font-semibold text-text-muted hover:text-primary"
              >
                Back
              </button>
              <button
                onClick={() => setStep(2)}
                className="btn-primary px-8 py-3 text-base font-bold"
              >
                Next
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="text-center"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-3xl" style={{ background: "var(--gradient-primary)" }}>
              <Brain className="text-white" size={32} />
            </div>
            <h2
              className="mb-2 text-2xl font-bold text-foreground"
              style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
            >
              You&apos;re all set!
            </h2>
            <p className="mb-8 text-base text-text-muted">
              Your personalized brain training dashboard is ready.
            </p>
            <button
              onClick={finish}
              className="btn-primary px-8 py-3 text-lg font-bold"
            >
              Start Training
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress dots */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`h-2 rounded-full transition-all ${
              i === step ? "w-6 bg-primary" : "w-2 bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
