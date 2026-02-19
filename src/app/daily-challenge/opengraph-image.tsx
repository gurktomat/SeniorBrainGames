import { generateOgImage } from "@/lib/ogImage";

export const alt = "Daily Challenge — SeniorBrainGames";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return generateOgImage({
    title: "Daily Brain Challenge",
    subtitle: "A New Challenge Every Day",
  });
}
