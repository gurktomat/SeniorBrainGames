import type { Metadata } from "next";
import Link from "next/link";
import { Star } from "lucide-react";
import { getQuizzesByCategory, categoryInfo } from "@/lib/quizzes";
import CategoryIcon from "@/components/CategoryIcon";
import QuizCard from "@/components/QuizCard";
import { GameIcon } from "@/lib/gameIcons";
import JsonLd from "@/components/JsonLd";
import { getCategoryRatings } from "@/lib/db";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Word Games — Scrambles, Proverbs, Synonyms & More",
  description:
    "Challenge your vocabulary with fun word games! Word scrambles, proverbs, synonym challenges, spelling bees, and more.",
  alternates: { canonical: "/word-games" },
};

const specialGames = [
  {
    id: "word-scramble",
    title: "Word Scramble",
    description: "Unscramble the letters to find the hidden word!",
    count: "15 Puzzles",
  },
  {
    id: "complete-the-proverb",
    title: "Complete the Proverb",
    description: "Can you finish these well-known proverbs and sayings?",
    count: "15 Proverbs",
  },
  {
    id: "spelling-bee",
    title: "Spelling Bee",
    description: "Test your spelling skills with commonly misspelled words!",
    count: "15 Words",
  },
  {
    id: "word-association",
    title: "Word Association",
    description: "Find the word that connects the group!",
    count: "15 Puzzles",
  },
  {
    id: "crossword-classic",
    title: "Classic Crossword",
    description: "Solve classic crossword puzzles — fill the grid using the across and down clues!",
    count: "3 Puzzles",
  },
  {
    id: "word-search",
    title: "Word Search",
    description: "Find all the hidden words in the grid — look across and down!",
    count: "3 Puzzles",
  },
  {
    id: "hangman",
    title: "Hangman",
    description: "Guess the word one letter at a time before you run out of lives!",
    count: "30 Words",
  },
  {
    id: "word-ladder",
    title: "Word Ladder",
    description: "Change one letter at a time to transform the start word into the end word!",
    count: "10 Puzzles",
  },
  {
    id: "cryptogram",
    title: "Cryptogram",
    description: "Decode the secret message by figuring out the letter substitutions!",
    count: "10 Puzzles",
  },
  {
    id: "anagram-challenge",
    title: "Anagram Challenge",
    description: "Unscramble themed anagram puzzles — each round has a different theme!",
    count: "10 Rounds",
  },
  {
    id: "missing-vowels",
    title: "Missing Vowels",
    description: "The vowels have been removed — can you figure out the original phrase?",
    count: "10 Rounds",
  },
  {
    id: "emoji-decoder",
    title: "Emoji Decoder",
    description: "Decode emoji sequences into movies, songs, and phrases!",
    count: "10 Rounds",
  },
  {
    id: "riddle-challenge",
    title: "Riddle Challenge",
    description: "Can you solve these classic riddles? Type your answer and see if you're right!",
    count: "20 Riddles",
  },
  {
    id: "famous-first-lines",
    title: "Famous First Lines",
    description: "Guess the book from its famous opening line!",
    count: "15 Lines",
  },
  {
    id: "grammar-true-or-false",
    title: "Grammar True or False",
    description: "Is this sentence grammatically correct? Test your grammar knowledge!",
    count: "20 Statements",
  },
];

export default async function WordGames() {
  const quizzes = getQuizzesByCategory("word-games");
  const ratings = await getCategoryRatings("word-games");
  const info = categoryInfo["word-games"];

  const allGames = [
    ...specialGames.map((g) => ({ id: g.id, title: g.title })),
    ...quizzes.map((q) => ({ id: q.id, title: q.title })),
  ];

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: info.title,
          description: info.description,
          url: "https://seniorbraingames.org/word-games",
          mainEntity: {
            "@type": "ItemList",
            itemListElement: allGames.map((g, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `https://seniorbraingames.org/word-games/${g.id}`,
              name: g.title,
            })),
          },
        }}
      />
      <div className="mb-12 px-6 py-12 text-center" style={{ background: "linear-gradient(135deg, #E8983E15 0%, #F8F9FC 100%)" }}>
        <div className="mx-auto max-w-3xl">
          <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: "#E8983E", color: "white" }}>
            <CategoryIcon name={info.icon} size={28} strokeWidth={1.75} />
          </span>
          <h1
            className="mb-3 text-3xl font-bold text-foreground sm:text-4xl"
            style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
          >
            {info.title}
          </h1>
          <p className="text-lg text-text-muted">{info.description}</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {specialGames.map((game) => (
            <Link
              key={game.id}
              href={`/word-games/${game.id}`}
              className="card-enterprise group flex flex-col p-6"
            >
              <GameIcon gameId={game.id} color="#E8983E" />
              <h2
                className="mb-2 text-lg font-bold text-foreground"
                style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
              >
                {game.title}
              </h2>
              <p className="mb-4 flex-1 text-base text-text-muted">{game.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-sm font-bold text-primary">
                    {game.count}
                  </span>
                  {ratings[game.id] && ratings[game.id].ratingCount >= 3 && (
                    <span className="flex items-center gap-1 text-sm text-text-muted">
                      <Star size={14} fill="#f59e0b" stroke="#f59e0b" />
                      {ratings[game.id].avgRating}
                    </span>
                  )}
                </div>
                <span className="text-sm font-bold text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  Play &rarr;
                </span>
              </div>
            </Link>
          ))}

          {quizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} basePath="/word-games" iconColor="#E8983E" rating={ratings[quiz.id]} />
          ))}
        </div>
      </div>
    </div>
  );
}
