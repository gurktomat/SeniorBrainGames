import type { Metadata } from "next";
import { getDailyChallenge } from "@/lib/quizzes";
import DailyChallengeClient from "./DailyChallengeClient";

export const metadata: Metadata = {
  title: "Daily Challenge — Today's Brain Workout",
  description:
    "Take today's daily brain challenge! 5 questions from across all categories. Play every day to build your streak!",
  alternates: { canonical: "/daily-challenge" },
};

export const dynamic = "force-dynamic";

export default async function DailyChallengePage() {
  const quiz = await getDailyChallenge();

  return <DailyChallengeClient quiz={quiz} />;
}
