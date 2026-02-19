import { generateOgImage } from "@/lib/ogImage";
import { getQuizBySlug, specialGameSlugs, getQuizzesByCategory } from "@/lib/quizzes";

export const alt = "Nostalgia Trivia Game — SeniorBrainGames";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const specialGames: Record<string, string> = {
  "timeline-sort": "Timeline Sort",
  "nostalgia-fact-or-fiction": "Nostalgia Fact or Fiction",
  "decade-sorting": "Decade Sorting",
  "nostalgia-who-am-i": "Nostalgia Who Am I?",
};

export function generateStaticParams() {
  const quizSlugs = getQuizzesByCategory("nostalgia-trivia").map((q) => ({ slug: q.id }));
  const gameSlugs = (specialGameSlugs["nostalgia-trivia"] || []).map((s) => ({ slug: s }));
  return [...quizSlugs, ...gameSlugs];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const quiz = getQuizBySlug("nostalgia-trivia", slug);
  const title = quiz?.title || specialGames[slug] || "Nostalgia Trivia";

  return generateOgImage({
    title,
    subtitle: "Nostalgia Trivia",
    category: "nostalgia-trivia",
  });
}
