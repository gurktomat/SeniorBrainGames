import type { Metadata } from "next";
import { notFound } from "next/navigation";
import QuizEngine from "@/components/QuizEngine";
import WordScrambleEngine from "@/components/WordScrambleEngine";
import ProverbEngine from "@/components/ProverbEngine";
import SpellingBeeEngine from "@/components/SpellingBeeEngine";
import WordAssociationEngine from "@/components/WordAssociationEngine";
import CrosswordEngine from "@/components/CrosswordEngine";
import WordSearchEngine from "@/components/WordSearchEngine";
import HangmanEngine from "@/components/HangmanEngine";
import WordLadderEngine from "@/components/WordLadderEngine";
import CryptogramEngine from "@/components/CryptogramEngine";
import AnagramEngine from "@/components/AnagramEngine";
import MissingVowelsEngine from "@/components/MissingVowelsEngine";
import EmojiDecoderEngine from "@/components/EmojiDecoderEngine";
import RiddleEngine from "@/components/RiddleEngine";
import { getQuizBySlug, getQuizzesByCategory, specialGameSlugs } from "@/lib/quizzes";

import wordScrambleData from "@/data/word-games/word-scramble.json";
import proverbData from "@/data/word-games/complete-the-proverb.json";
import spellingData from "@/data/word-games/spelling-bee.json";
import wordAssocData from "@/data/word-games/word-association.json";
import crosswordData from "@/data/word-games/crossword-classic.json";
import wordSearchData from "@/data/word-games/word-search.json";
import hangmanData from "@/data/word-games/hangman.json";
import wordLadderData from "@/data/word-games/word-ladder.json";
import cryptogramData from "@/data/word-games/cryptogram.json";
import anagramData from "@/data/word-games/anagram-challenge.json";
import missingVowelsData from "@/data/word-games/missing-vowels.json";
import emojiDecoderData from "@/data/word-games/emoji-decoder.json";
import riddleData from "@/data/word-games/riddle-challenge.json";

const specialGames: Record<string, { title: string; description: string }> = {
  "word-scramble": { title: "Word Scramble", description: "Unscramble the letters to find the hidden word!" },
  "complete-the-proverb": { title: "Complete the Proverb", description: "Can you finish these well-known proverbs and sayings?" },
  "spelling-bee": { title: "Spelling Bee", description: "Test your spelling skills with commonly misspelled words!" },
  "word-association": { title: "Word Association", description: "Find the word that connects the group!" },
  "crossword-classic": { title: "Classic Crossword", description: "Solve classic crossword puzzles — fill the grid using the across and down clues!" },
  "word-search": { title: "Word Search", description: "Find all the hidden words in the grid — look across and down!" },
  "hangman": { title: "Hangman", description: "Guess the word one letter at a time before you run out of lives!" },
  "word-ladder": { title: "Word Ladder", description: "Change one letter at a time to transform the start word into the end word!" },
  "cryptogram": { title: "Cryptogram", description: "Decode the secret message by figuring out the letter substitutions!" },
  "anagram-challenge": { title: "Anagram Challenge", description: "Unscramble themed anagram puzzles — each round has a different theme!" },
  "missing-vowels": { title: "Missing Vowels", description: "The vowels have been removed — can you figure out the original phrase?" },
  "emoji-decoder": { title: "Emoji Decoder", description: "Decode emoji sequences into movies, songs, and phrases!" },
  "riddle-challenge": { title: "Riddle Challenge", description: "Can you solve these classic riddles? Type your answer and see if you're right!" },
};

export function generateStaticParams() {
  const quizSlugs = getQuizzesByCategory("word-games").map((q) => ({
    slug: q.id,
  }));
  const gameSlugs = (specialGameSlugs["word-games"] || []).map((s) => ({
    slug: s,
  }));
  return [...quizSlugs, ...gameSlugs];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const quiz = getQuizBySlug("word-games", slug);
  if (quiz) {
    return { title: quiz.title, description: quiz.description };
  }
  const special = specialGames[slug];
  if (special) {
    return { title: special.title, description: special.description };
  }
  return {};
}

export default async function WordGamePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Check if it's a regular quiz
  const quiz = getQuizBySlug("word-games", slug);
  if (quiz) {
    return <QuizEngine quiz={quiz} />;
  }

  // Special game engines
  switch (slug) {
    case "word-scramble":
      return (
        <WordScrambleEngine
          title={wordScrambleData.title}
          puzzles={wordScrambleData.puzzles}
        />
      );
    case "complete-the-proverb":
      return (
        <ProverbEngine
          title={proverbData.title}
          questions={proverbData.questions}
        />
      );
    case "spelling-bee":
      return (
        <SpellingBeeEngine
          title={spellingData.title}
          words={spellingData.words}
        />
      );
    case "word-association":
      return (
        <WordAssociationEngine
          title={wordAssocData.title}
          puzzles={wordAssocData.puzzles}
        />
      );
    case "crossword-classic":
      return (
        <CrosswordEngine
          title={crosswordData.title}
          puzzles={crosswordData.puzzles as React.ComponentProps<typeof CrosswordEngine>["puzzles"]}
        />
      );
    case "word-search":
      return (
        <WordSearchEngine
          title={wordSearchData.title}
          puzzles={wordSearchData.puzzles}
        />
      );
    case "hangman":
      return (
        <HangmanEngine
          title={hangmanData.title}
          words={hangmanData.words}
        />
      );
    case "word-ladder":
      return (
        <WordLadderEngine
          title={wordLadderData.title}
          puzzles={wordLadderData.puzzles}
        />
      );
    case "cryptogram":
      return (
        <CryptogramEngine
          title={cryptogramData.title}
          puzzles={cryptogramData.puzzles}
        />
      );
    case "anagram-challenge":
      return (
        <AnagramEngine
          title={anagramData.title}
          rounds={anagramData.rounds}
        />
      );
    case "missing-vowels":
      return (
        <MissingVowelsEngine
          title={missingVowelsData.title}
          rounds={missingVowelsData.rounds}
        />
      );
    case "emoji-decoder":
      return (
        <EmojiDecoderEngine
          title={emojiDecoderData.title}
          rounds={emojiDecoderData.rounds}
        />
      );
    case "riddle-challenge":
      return (
        <RiddleEngine
          title={riddleData.title}
          riddles={riddleData.riddles}
        />
      );
    default:
      notFound();
  }
}
