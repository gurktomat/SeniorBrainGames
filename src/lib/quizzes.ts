import type { Quiz } from "./types";

import fiftiesTrivia from "@/data/fifties-trivia.json";
import sixtiesTrivia from "@/data/sixties-trivia.json";
import seventiesTrivia from "@/data/seventies-trivia.json";
import eightiesTrivia from "@/data/eighties-trivia.json";

export const quizzes: Quiz[] = [
  fiftiesTrivia as Quiz,
  sixtiesTrivia as Quiz,
  seventiesTrivia as Quiz,
  eightiesTrivia as Quiz,
];

export function getQuizById(id: string): Quiz | undefined {
  return quizzes.find((q) => q.id === id);
}
