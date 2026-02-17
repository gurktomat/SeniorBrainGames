import QuizCard from "@/components/QuizCard";
import { quizzes } from "@/lib/quizzes";

export default function Home() {
  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="mb-3 text-4xl font-bold text-gray-900">
          Nostalgia Trivia
        </h1>
        <p className="text-xl text-gray-600">
          How well do you remember the good old days? Pick a decade and find out!
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </div>
  );
}
