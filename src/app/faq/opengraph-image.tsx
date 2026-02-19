import { generateOgImage } from "@/lib/ogImage";

export const alt = "Frequently Asked Questions — SeniorBrainGames";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return generateOgImage({
    title: "Frequently Asked Questions",
    subtitle: "SeniorBrainGames FAQ",
  });
}
