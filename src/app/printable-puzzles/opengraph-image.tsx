import { generateOgImage } from "@/lib/ogImage";

export const alt = "Printable Puzzles — SeniorBrainGames";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return generateOgImage({
    title: "Free Printable Puzzles",
    subtitle: "Crosswords, Word Search, Sudoku & More",
    category: "printable-puzzles",
  });
}
