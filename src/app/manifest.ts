import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SeniorBrainGames — Fun Brain Games for Seniors",
    short_name: "SeniorBrainGames",
    description:
      "Free brain games designed for seniors. Trivia, word games, memory challenges, and more.",
    start_url: "/",
    display: "standalone",
    background_color: "#F8F9FC",
    theme_color: "#7C5CFC",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
