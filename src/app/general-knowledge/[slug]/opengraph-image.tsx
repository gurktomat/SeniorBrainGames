import { generateOgImage } from "@/lib/ogImage";
import { getQuizBySlug, specialGameSlugs, getQuizzesByCategory } from "@/lib/quizzes";

export const alt = "General Knowledge Game — SeniorBrainGames";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const specialGames: Record<string, string> = {
  "true-or-false": "True or False",
  "who-am-i": "Who Am I?",
  "science-sorting": "Science Sorting",
  "history-timeline": "History Timeline",
};

export function generateStaticParams() {
  const quizSlugs = getQuizzesByCategory("general-knowledge").map((q) => ({ slug: q.id }));
  const gameSlugs = (specialGameSlugs["general-knowledge"] || []).map((s) => ({ slug: s }));
  return [...quizSlugs, ...gameSlugs];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const quiz = getQuizBySlug("general-knowledge", slug);
  const title = quiz?.title || specialGames[slug] || "General Knowledge";

  return generateOgImage({
    title,
    subtitle: "General Knowledge",
    category: "general-knowledge",
  });
}
