import { generateOgImage } from "@/lib/ogImage";

export const alt = "SeniorBrainGames — Keep Your Mind Sharp & Active";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return generateOgImage({
    title: "Keep Your Mind Sharp & Active",
    subtitle: "Free Brain Games for Seniors",
  });
}
