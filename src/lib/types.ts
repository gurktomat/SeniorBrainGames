export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  hint?: string;
  decade: "1950s" | "1960s" | "1970s" | "1980s";
  category: "music" | "movies" | "tv" | "history" | "culture";
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export interface QuizResult {
  quizId: string;
  totalQuestions: number;
  correctAnswers: number;
  answers: { questionId: string; selectedAnswer: number; correct: boolean }[];
}
