import { generateOgImage } from "@/lib/ogImage";
import { categoryInfo } from "@/lib/quizzes";

export const alt = "Nostalgia Trivia — SeniorBrainGames";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const info = categoryInfo["nostalgia-trivia"];
  return generateOgImage({
    title: info.title,
    subtitle: info.description,
    category: "nostalgia-trivia",
  });
}
