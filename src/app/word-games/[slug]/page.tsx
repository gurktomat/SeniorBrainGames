import type { Metadata } from "next";
import { notFound } from "next/navigation";
import QuizEngine from "@/components/QuizEngine";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedGames from "@/components/RelatedGames";
import { getGameRating } from "@/lib/db";

export const revalidate = 300;
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
import FirstLinesEngine from "@/components/FirstLinesEngine";
import TrueOrFalseEngine from "@/components/TrueOrFalseEngine";
import PrintButton from "@/components/printable/PrintButton";
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
import firstLinesData from "@/data/word-games/famous-first-lines.json";
import grammarTFData from "@/data/word-games/grammar-true-or-false.json";
import crosswordNatureScienceData from "@/data/word-games/crossword-nature-science.json";
import wordSearchAnimalsData from "@/data/word-games/word-search-animals.json";
import foodWordScrambleData from "@/data/word-games/food-word-scramble.json";
import cryptogramPoetryData from "@/data/word-games/cryptogram-poetry.json";
import wordLadderChallengeData from "@/data/word-games/word-ladder-challenge.json";
import historySpellingBeeData from "@/data/word-games/history-spelling-bee.json";
import wordSearchTravelData from "@/data/word-games/word-search-travel.json";

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
  "famous-first-lines": { title: "Famous First Lines", description: "Guess the book from its famous opening line!" },
  "grammar-true-or-false": { title: "Grammar True or False", description: "Is this sentence grammatically correct? Test your grammar knowledge!" },
  "crossword-nature-science": { title: "Nature & Science Crossword", description: "Solve crossword puzzles themed around nature and science!" },
  "word-search-animals": { title: "Animal Word Search", description: "Find animal names hidden in the grid!" },
  "food-word-scramble": { title: "Food Word Scramble", description: "Unscramble the letters to find the food or cooking word!" },
  "cryptogram-poetry": { title: "Poetry Cryptogram", description: "Decode famous poetry lines by figuring out the letter substitutions!" },
  "word-ladder-challenge": { title: "Word Ladder Challenge", description: "Change one letter at a time to climb from the start word to the end word!" },
  "history-spelling-bee": { title: "History Spelling Bee", description: "Spell historical terms, famous names, and landmark words correctly!" },
  "word-search-travel": { title: "Travel Word Search", description: "Find travel and geography words hidden in the grid!" },
};

const allCategoryGames = [
  ...Object.entries(specialGames).map(([id, g]) => ({ id, title: g.title })),
  ...getQuizzesByCategory("word-games").map((q) => ({ id: q.id, title: q.title })),
];

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
    return {
      title: quiz.title,
      description: quiz.description,
      alternates: { canonical: `/word-games/${slug}` },
      openGraph: { title: quiz.title, description: quiz.description },
    };
  }
  const special = specialGames[slug];
  if (special) {
    return {
      title: special.title,
      description: special.description,
      alternates: { canonical: `/word-games/${slug}` },
      openGraph: { title: special.title, description: special.description },
    };
  }
  return {};
}

function GameStructuredData({ slug, title, description, rating }: { slug: string; title: string; description: string; rating?: { avgRating: number; ratingCount: number } | null }) {
  const url = `https://seniorbraingames.org/word-games/${slug}`;
  const webApp: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: title,
    description,
    url,
    applicationCategory: "Game",
    genre: "Brain Game",
    audience: { "@type": "PeopleAudience", suggestedMinAge: 50 },
    isAccessibleForFree: true,
    inLanguage: "en",
  };
  if (rating && rating.ratingCount >= 5) {
    webApp.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: rating.avgRating,
      ratingCount: rating.ratingCount,
      bestRating: 5,
      worstRating: 1,
    };
  }
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://seniorbraingames.org" },
            { "@type": "ListItem", position: 2, name: "Word Games", item: "https://seniorbraingames.org/word-games" },
            { "@type": "ListItem", position: 3, name: title, item: url },
          ],
        }}
      />
      <JsonLd data={webApp} />
    </>
  );
}

const printableSlugs = new Set([
  ...getQuizzesByCategory("word-games").map((q) => q.id),
  "word-scramble", "food-word-scramble",
  "crossword-classic", "crossword-nature-science",
  "word-search", "word-search-animals",
  "word-ladder", "word-ladder-challenge",
  "cryptogram", "cryptogram-poetry",
  "riddle-challenge", "grammar-true-or-false",
]);

function PageShell({ slug, title, description, rating, children }: { slug: string; title: string; description: string; rating?: { avgRating: number; ratingCount: number } | null; children: React.ReactNode }) {
  return (
    <>
      <GameStructuredData slug={slug} title={title} description={description} rating={rating} />
      <Breadcrumbs items={[{ label: "Word Games", href: "/word-games" }, { label: title }]} />
      {printableSlugs.has(slug) && (
        <div className="mx-auto mt-4 flex max-w-3xl justify-end px-6">
          <PrintButton category="word-games" slug={slug} />
        </div>
      )}
      {children}
      <RelatedGames category="word-games" categoryLabel="Word Games" currentSlug={slug} games={allCategoryGames} />
    </>
  );
}

export default async function WordGamePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const rating = await getGameRating(slug);

  // Check if it's a regular quiz
  const quiz = getQuizBySlug("word-games", slug);
  if (quiz) {
    return (
      <PageShell slug={slug} title={quiz.title} description={quiz.description} rating={rating}>
        <QuizEngine quiz={quiz} />
      </PageShell>
    );
  }

  // Special game engines
  const special = specialGames[slug];
  if (!special) notFound();

  switch (slug) {
    case "word-scramble":
      return (<PageShell slug={slug} title={special.title} description={special.description} rating={rating}><WordScrambleEngine title={wordScrambleData.title} puzzles={wordScrambleData.puzzles} /></PageShell>);
    case "complete-the-proverb":
      return (<PageShell slug={slug} title={special.title} description={special.description} rating={rating}><ProverbEngine title={proverbData.title} questions={proverbData.questions} /></PageShell>);
    case "spelling-bee":
      return (<PageShell slug={slug} title={special.title} description={special.description} rating={rating}><SpellingBeeEngine title={spellingData.title} words={spellingData.words} /></PageShell>);
    case "word-association":
      return (<PageShell slug={slug} title={special.title} description={special.description} rating={rating}><WordAssociationEngine title={wordAssocData.title} puzzles={wordAssocData.puzzles} /></PageShell>);
    case "crossword-classic":
      return (<PageShell slug={slug} title={special.title} description={special.description} rating={rating}><CrosswordEngine title={crosswordData.title} puzzles={crosswordData.puzzles as React.ComponentProps<typeof CrosswordEngine>["puzzles"]} /></PageShell>);
    case "word-search":
      return (<PageShell slug={slug} title={special.title} description={special.description} rating={rating}><WordSearchEngine title={wordSearchData.title} puzzles={wordSearchData.puzzles} /></PageShell>);
    case "hangman":
      return (<PageShell slug={slug} title={special.title} description={special.description} rating={rating}><HangmanEngine title={hangmanData.title} words={hangmanData.words} /></PageShell>);
    case "word-ladder":
      return (<PageShell slug={slug} title={special.title} description={special.description} rating={rating}><WordLadderEngine title={wordLadderData.title} puzzles={wordLadderData.puzzles} /></PageShell>);
    case "cryptogram":
      return (<PageShell slug={slug} title={special.title} description={special.description} rating={rating}><CryptogramEngine title={cryptogramData.title} puzzles={cryptogramData.puzzles} /></PageShell>);
    case "anagram-challenge":
      return (<PageShell slug={slug} title={special.title} description={special.description} rating={rating}><AnagramEngine title={anagramData.title} rounds={anagramData.rounds} /></PageShell>);
    case "missing-vowels":
      return (<PageShell slug={slug} title={special.title} description={special.description} rating={rating}><MissingVowelsEngine title={missingVowelsData.title} rounds={missingVowelsData.rounds} /></PageShell>);
    case "emoji-decoder":
      return (<PageShell slug={slug} title={special.title} description={special.description} rating={rating}><EmojiDecoderEngine title={emojiDecoderData.title} rounds={emojiDecoderData.rounds} /></PageShell>);
    case "riddle-challenge":
      return (<PageShell slug={slug} title={special.title} description={special.description} rating={rating}><RiddleEngine title={riddleData.title} riddles={riddleData.riddles} /></PageShell>);
    case "famous-first-lines":
      return (<PageShell slug={slug} title={special.title} description={special.description} rating={rating}><FirstLinesEngine title={firstLinesData.title} lines={firstLinesData.lines} /></PageShell>);
    case "grammar-true-or-false":
      return (<PageShell slug={slug} title={special.title} description={special.description} rating={rating}><TrueOrFalseEngine title={grammarTFData.title} statements={grammarTFData.statements} /></PageShell>);
    case "crossword-nature-science":
      return (<PageShell slug={slug} title={special.title} description={special.description} rating={rating}><CrosswordEngine title={crosswordNatureScienceData.title} puzzles={crosswordNatureScienceData.puzzles as React.ComponentProps<typeof CrosswordEngine>["puzzles"]} /></PageShell>);
    case "word-search-animals":
      return (<PageShell slug={slug} title={special.title} description={special.description} rating={rating}><WordSearchEngine title={wordSearchAnimalsData.title} puzzles={wordSearchAnimalsData.puzzles} /></PageShell>);
    case "food-word-scramble":
      return (<PageShell slug={slug} title={special.title} description={special.description} rating={rating}><WordScrambleEngine title={foodWordScrambleData.title} puzzles={foodWordScrambleData.puzzles} /></PageShell>);
    case "cryptogram-poetry":
      return (<PageShell slug={slug} title={special.title} description={special.description} rating={rating}><CryptogramEngine title={cryptogramPoetryData.title} puzzles={cryptogramPoetryData.puzzles} /></PageShell>);
    case "word-ladder-challenge":
      return (<PageShell slug={slug} title={special.title} description={special.description} rating={rating}><WordLadderEngine title={wordLadderChallengeData.title} puzzles={wordLadderChallengeData.puzzles} /></PageShell>);
    case "history-spelling-bee":
      return (<PageShell slug={slug} title={special.title} description={special.description} rating={rating}><SpellingBeeEngine title={historySpellingBeeData.title} words={historySpellingBeeData.words} /></PageShell>);
    case "word-search-travel":
      return (<PageShell slug={slug} title={special.title} description={special.description} rating={rating}><WordSearchEngine title={wordSearchTravelData.title} puzzles={wordSearchTravelData.puzzles} /></PageShell>);
    default:
      notFound();
  }
}
