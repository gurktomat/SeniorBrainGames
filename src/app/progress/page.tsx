import type { Metadata } from "next";
import ProgressPageClient from "@/components/ProgressPageClient";

export const metadata: Metadata = {
  title: "My Progress",
  description: "Track your brain training progress, XP, streaks, and badges.",
  alternates: { canonical: "/progress" },
};

export default function ProgressPage() {
  return <ProgressPageClient />;
}
