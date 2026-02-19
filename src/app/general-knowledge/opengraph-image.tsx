import { generateOgImage } from "@/lib/ogImage";
import { categoryInfo } from "@/lib/quizzes";

export const alt = "General Knowledge — SeniorBrainGames";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const info = categoryInfo["general-knowledge"];
  return generateOgImage({
    title: info.title,
    subtitle: info.description,
    category: "general-knowledge",
  });
}
