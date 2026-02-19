import { generateOgImage } from "@/lib/ogImage";

export const alt = "Brain Health Blog — SeniorBrainGames";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return generateOgImage({
    title: "Brain Health Blog",
    subtitle: "Tips & Articles for Seniors",
    category: "blog",
  });
}
