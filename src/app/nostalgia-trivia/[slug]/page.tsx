import type { Metadata } from "next";
import { notFound } from "next/navigation";
import QuizEngine from "@/components/QuizEngine";
import TimelineSortEngine from "@/components/TimelineSortEngine";
import TrueOrFalseEngine from "@/components/TrueOrFalseEngine";
import SortingEngine from "@/components/SortingEngine";
import WhoAmIEngine from "@/components/WhoAmIEngine";
import HangmanEngine from "@/components/HangmanEngine";
import RiddleEngine from "@/components/RiddleEngine";
import SpellingBeeEngine from "@/components/SpellingBeeEngine";
import ProverbEngine from "@/components/ProverbEngine";
import WordAssociationEngine from "@/components/WordAssociationEngine";
import MatchingPairsEngine from "@/components/MatchingPairsEngine";
import EstimationEngine from "@/components/EstimationEngine";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedGames from "@/components/RelatedGames";
import { getQuizzesByCategory, getQuizBySlug, specialGameSlugs } from "@/lib/quizzes";
import { getGameRating } from "@/lib/db";

export const revalidate = 300;

import timelineSortData from "@/data/nostalgia-trivia/timeline-sort.json";
import nostalgiaFactOrFictionData from "@/data/nostalgia-trivia/nostalgia-fact-or-fiction.json";
import decadeSortingData from "@/data/nostalgia-trivia/decade-sorting.json";
import nostalgiaWhoAmIData from "@/data/nostalgia-trivia/nostalgia-who-am-i.json";
import nostalgiaHangmanData from "@/data/nostalgia-trivia/nostalgia-hangman.json";
import nostalgiaRiddlesData from "@/data/nostalgia-trivia/nostalgia-riddles.json";
import vintageSpellingData from "@/data/nostalgia-trivia/vintage-spelling-bee.json";
import oldTimeSayingsData from "@/data/nostalgia-trivia/old-time-sayings.json";
import retroWordAssocData from "@/data/nostalgia-trivia/retro-word-association.json";
import nostalgiaMatchingData from "@/data/nostalgia-trivia/nostalgia-matching.json";
import nostalgiaEstimationData from "@/data/nostalgia-trivia/nostalgia-estimation.json";

const specialGames: Record<string, { title: string; description: string }> = {
  "timeline-sort": { title: "Timeline Sort", description: "Put historical events in the correct chronological order!" },
  "nostalgia-fact-or-fiction": { title: "Nostalgia Fact or Fiction", description: "Can you tell which nostalgic facts from the 1950s–1980s are true and which are made up?" },
  "decade-sorting": { title: "Decade Sorting", description: "Sort pop culture items into their correct decade!" },
  "nostalgia-who-am-i": { title: "Nostalgia Who Am I?", description: "Guess the pop culture icon from progressive clues!" },
  "nostalgia-hangman": { title: "Nostalgia Hangman", description: "Guess classic TV shows, movies, and songs one letter at a time!" },
  "nostalgia-riddles": { title: "Nostalgia Riddles", description: "Can you solve these riddles about retro items and events?" },
  "vintage-spelling-bee": { title: "Vintage Spelling Bee", description: "Spell these vintage and retro words correctly!" },
  "old-time-sayings": { title: "Old-Time Sayings", description: "Complete these classic old-time proverbs and sayings!" },
  "retro-word-association": { title: "Retro Word Association", description: "Find the word that connects the retro-themed group!" },
  "nostalgia-matching": { title: "Nostalgia Matching", description: "Match classic actors to their shows, songs to their artists, and more!" },
  "nostalgia-estimation": { title: "Nostalgia Estimation", description: "How close can you guess? Test your knowledge of nostalgia facts and figures!" },
};

const allCategoryGames = [
  ...Object.entries(specialGames).map(([id, g]) => ({ id, title: g.title })),
  ...getQuizzesByCategory("nostalgia-trivia").map((q) => ({ id: q.id, title: q.title })),
];

export function generateStaticParams() {
  const quizSlugs = getQuizzesByCategory("nostalgia-trivia").map((q) => ({
    slug: q.id,
  }));
  const gameSlugs = (specialGameSlugs["nostalgia-trivia"] || []).map((s) => ({
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
  const quiz = getQuizBySlug("nostalgia-trivia", slug);
  if (quiz) {
    return {
      title: quiz.title,
      description: quiz.description,
      alternates: { canonical: `/nostalgia-trivia/${slug}` },
      openGraph: { title: quiz.title, description: quiz.description },
    };
  }
  const special = specialGames[slug];
  if (special) {
    return {
      title: special.title,
      description: special.description,
      alternates: { canonical: `/nostalgia-trivia/${slug}` },
      openGraph: { title: special.title, description: special.description },
    };
  }
  return {};
}

function GameStructuredData({ slug, title, description, rating }: { slug: string; title: string; description: string; rating?: { avgRating: number; ratingCount: number } | null }) {
  const url = `https://seniorbraingames.org/nostalgia-trivia/${slug}`;
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
            { "@type": "ListItem", position: 2, name: "Nostalgia Trivia", item: "https://seniorbraingames.org/nostalgia-trivia" },
            { "@type": "ListItem", position: 3, name: title, item: url },
          ],
        }}
      />
      <JsonLd data={webApp} />
    </>
  );
}

function PageShell({ slug, title, description, rating, children }: { slug: string; title: string; description: string; rating?: { avgRating: number; ratingCount: number } | null; children: React.ReactNode }) {
  return (
    <>
      <GameStructuredData slug={slug} title={title} description={description} rating={rating} />
      <Breadcrumbs items={[{ label: "Nostalgia Trivia", href: "/nostalgia-trivia" }, { label: title }]} />
      {children}
      <RelatedGames category="nostalgia-trivia" categoryLabel="Nostalgia Trivia" currentSlug={slug} games={allCategoryGames} />
    </>
  );
}

export default async function NostalgiaQuizPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const rating = await getGameRating(slug);

  // Check if it's a regular quiz
  const quiz = getQuizBySlug("nostalgia-trivia", slug);
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
    case "timeline-sort":
      return (
        <PageShell slug={slug} title={special.title} description={special.description} rating={rating}>
          <TimelineSortEngine title={timelineSortData.title} rounds={timelineSortData.rounds} />
        </PageShell>
      );
    case "nostalgia-fact-or-fiction":
      return (
        <PageShell slug={slug} title={special.title} description={special.description} rating={rating}>
          <TrueOrFalseEngine title={nostalgiaFactOrFictionData.title} statements={nostalgiaFactOrFictionData.statements} />
        </PageShell>
      );
    case "decade-sorting":
      return (
        <PageShell slug={slug} title={special.title} description={special.description} rating={rating}>
          <SortingEngine title={decadeSortingData.title} rounds={decadeSortingData.rounds} />
        </PageShell>
      );
    case "nostalgia-who-am-i":
      return (
        <PageShell slug={slug} title={special.title} description={special.description} rating={rating}>
          <WhoAmIEngine title={nostalgiaWhoAmIData.title} puzzles={nostalgiaWhoAmIData.puzzles} />
        </PageShell>
      );
    case "nostalgia-hangman":
      return (<PageShell slug={slug} title={special.title} description={special.description} rating={rating}><HangmanEngine title={nostalgiaHangmanData.title} words={nostalgiaHangmanData.words} /></PageShell>);
    case "nostalgia-riddles":
      return (<PageShell slug={slug} title={special.title} description={special.description} rating={rating}><RiddleEngine title={nostalgiaRiddlesData.title} riddles={nostalgiaRiddlesData.riddles} /></PageShell>);
    case "vintage-spelling-bee":
      return (<PageShell slug={slug} title={special.title} description={special.description} rating={rating}><SpellingBeeEngine title={vintageSpellingData.title} words={vintageSpellingData.words} /></PageShell>);
    case "old-time-sayings":
      return (<PageShell slug={slug} title={special.title} description={special.description} rating={rating}><ProverbEngine title={oldTimeSayingsData.title} questions={oldTimeSayingsData.questions} /></PageShell>);
    case "retro-word-association":
      return (<PageShell slug={slug} title={special.title} description={special.description} rating={rating}><WordAssociationEngine title={retroWordAssocData.title} puzzles={retroWordAssocData.puzzles} /></PageShell>);
    case "nostalgia-matching":
      return (<PageShell slug={slug} title={special.title} description={special.description} rating={rating}><MatchingPairsEngine title={nostalgiaMatchingData.title} rounds={nostalgiaMatchingData.rounds} /></PageShell>);
    case "nostalgia-estimation":
      return (<PageShell slug={slug} title={special.title} description={special.description} rating={rating}><EstimationEngine title={nostalgiaEstimationData.title} questions={nostalgiaEstimationData.questions} /></PageShell>);
    default:
      notFound();
  }
}
