import type { Metadata } from "next";
import { notFound } from "next/navigation";
import QuizEngine from "@/components/QuizEngine";
import PrintButton from "@/components/printable/PrintButton";
import TrueOrFalseEngine from "@/components/TrueOrFalseEngine";
import WhoAmIEngine from "@/components/WhoAmIEngine";
import SortingEngine from "@/components/SortingEngine";
import TimelineSortEngine from "@/components/TimelineSortEngine";
import MathChallengeEngine from "@/components/MathChallengeEngine";
import PatternEngine from "@/components/PatternEngine";
import SpotDifferenceEngine from "@/components/SpotDifferenceEngine";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedGames from "@/components/RelatedGames";
import { getQuizzesByCategory, getQuizBySlug, specialGameSlugs } from "@/lib/quizzes";
import { getGameRating } from "@/lib/db";

export const revalidate = 300;

import trueOrFalseData from "@/data/general-knowledge/true-or-false.json";
import whoAmIData from "@/data/general-knowledge/who-am-i.json";
import scienceSortingData from "@/data/general-knowledge/science-sorting.json";
import historyTimelineData from "@/data/general-knowledge/history-timeline.json";
import scienceTrueOrFalseData from "@/data/general-knowledge/science-true-or-false.json";
import whatInTheWorldData from "@/data/general-knowledge/what-in-the-world.json";
import inventionsTimelineData from "@/data/general-knowledge/inventions-timeline.json";
import animalKingdomSortingData from "@/data/general-knowledge/animal-kingdom-sorting.json";
import mentalMathData from "@/data/general-knowledge/mental-math.json";
import logicPatternsData from "@/data/general-knowledge/logic-patterns.json";
import observationChallengeData from "@/data/general-knowledge/observation-challenge.json";

const specialGames: Record<string, { title: string; description: string }> = {
  "true-or-false": { title: "True or False", description: "Test your knowledge — is this statement true or false?" },
  "who-am-i": { title: "Who Am I?", description: "Guess the famous person from progressive clues — fewer clues means more points!" },
  "science-sorting": { title: "Science Sorting", description: "Sort items into the correct science categories!" },
  "history-timeline": { title: "History Timeline", description: "Put world history events in the correct chronological order!" },
  "science-true-or-false": { title: "Science True or False", description: "Is this science fact true or false? Test your scientific knowledge!" },
  "what-in-the-world": { title: "What in the World?", description: "Guess the famous landmark or place from progressive clues!" },
  "inventions-timeline": { title: "Inventions Timeline", description: "Put great inventions in the correct chronological order!" },
  "animal-kingdom-sorting": { title: "Animal Kingdom Sorting", description: "Sort animals into the correct categories!" },
  "mental-math": { title: "Mental Math", description: "Challenge your mental arithmetic skills!" },
  "logic-patterns": { title: "Logic Patterns", description: "Find the pattern and choose what comes next in the sequence!" },
  "observation-challenge": { title: "Observation Challenge", description: "Study the items carefully, then spot what changed!" },
};

const allCategoryGames = [
  ...Object.entries(specialGames).map(([id, g]) => ({ id, title: g.title })),
  ...getQuizzesByCategory("general-knowledge").map((q) => ({ id: q.id, title: q.title })),
];

export function generateStaticParams() {
  const quizSlugs = getQuizzesByCategory("general-knowledge").map((q) => ({
    slug: q.id,
  }));
  const gameSlugs = (specialGameSlugs["general-knowledge"] || []).map((s) => ({
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
  const quiz = getQuizBySlug("general-knowledge", slug);
  if (quiz) {
    return {
      title: quiz.title,
      description: quiz.description,
      alternates: { canonical: `/general-knowledge/${slug}` },
      openGraph: { title: quiz.title, description: quiz.description },
    };
  }
  const special = specialGames[slug];
  if (special) {
    return {
      title: special.title,
      description: special.description,
      alternates: { canonical: `/general-knowledge/${slug}` },
      openGraph: { title: special.title, description: special.description },
    };
  }
  return {};
}

function GameStructuredData({ slug, title, description, rating }: { slug: string; title: string; description: string; rating?: { avgRating: number; ratingCount: number } | null }) {
  const url = `https://seniorbraingames.org/general-knowledge/${slug}`;
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
            { "@type": "ListItem", position: 2, name: "General Knowledge", item: "https://seniorbraingames.org/general-knowledge" },
            { "@type": "ListItem", position: 3, name: title, item: url },
          ],
        }}
      />
      <JsonLd data={webApp} />
    </>
  );
}

const printableSlugs = new Set([
  ...getQuizzesByCategory("general-knowledge").map((q) => q.id),
  "true-or-false",
  "science-true-or-false",
]);

function PageShell({ slug, title, description, rating, children }: { slug: string; title: string; description: string; rating?: { avgRating: number; ratingCount: number } | null; children: React.ReactNode }) {
  return (
    <>
      <GameStructuredData slug={slug} title={title} description={description} rating={rating} />
      <Breadcrumbs items={[{ label: "General Knowledge", href: "/general-knowledge" }, { label: title }]} />
      {printableSlugs.has(slug) && (
        <div className="mx-auto mt-4 flex max-w-3xl justify-end px-6">
          <PrintButton category="general-knowledge" slug={slug} />
        </div>
      )}
      {children}
      <RelatedGames category="general-knowledge" categoryLabel="General Knowledge" currentSlug={slug} games={allCategoryGames} />
    </>
  );
}

export default async function GeneralKnowledgeQuizPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const rating = await getGameRating(slug);

  // Check if it's a regular quiz
  const quiz = getQuizBySlug("general-knowledge", slug);
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
    case "true-or-false":
      return (
        <PageShell slug={slug} title={special.title} description={special.description} rating={rating}>
          <TrueOrFalseEngine title={trueOrFalseData.title} statements={trueOrFalseData.statements} />
        </PageShell>
      );
    case "who-am-i":
      return (
        <PageShell slug={slug} title={special.title} description={special.description} rating={rating}>
          <WhoAmIEngine title={whoAmIData.title} puzzles={whoAmIData.puzzles} />
        </PageShell>
      );
    case "science-sorting":
      return (
        <PageShell slug={slug} title={special.title} description={special.description} rating={rating}>
          <SortingEngine title={scienceSortingData.title} rounds={scienceSortingData.rounds} />
        </PageShell>
      );
    case "history-timeline":
      return (
        <PageShell slug={slug} title={special.title} description={special.description} rating={rating}>
          <TimelineSortEngine title={historyTimelineData.title} rounds={historyTimelineData.rounds} />
        </PageShell>
      );
    case "science-true-or-false":
      return (<PageShell slug={slug} title={special.title} description={special.description} rating={rating}><TrueOrFalseEngine title={scienceTrueOrFalseData.title} statements={scienceTrueOrFalseData.statements} /></PageShell>);
    case "what-in-the-world":
      return (<PageShell slug={slug} title={special.title} description={special.description} rating={rating}><WhoAmIEngine title={whatInTheWorldData.title} puzzles={whatInTheWorldData.puzzles} /></PageShell>);
    case "inventions-timeline":
      return (<PageShell slug={slug} title={special.title} description={special.description} rating={rating}><TimelineSortEngine title={inventionsTimelineData.title} rounds={inventionsTimelineData.rounds} /></PageShell>);
    case "animal-kingdom-sorting":
      return (<PageShell slug={slug} title={special.title} description={special.description} rating={rating}><SortingEngine title={animalKingdomSortingData.title} rounds={animalKingdomSortingData.rounds} /></PageShell>);
    case "mental-math":
      return (<PageShell slug={slug} title={special.title} description={special.description} rating={rating}><MathChallengeEngine title={mentalMathData.title} levels={mentalMathData.levels} /></PageShell>);
    case "logic-patterns":
      return (<PageShell slug={slug} title={special.title} description={special.description} rating={rating}><PatternEngine title={logicPatternsData.title} puzzles={logicPatternsData.puzzles} /></PageShell>);
    case "observation-challenge":
      return (<PageShell slug={slug} title={special.title} description={special.description} rating={rating}><SpotDifferenceEngine title={observationChallengeData.title} rounds={observationChallengeData.rounds} /></PageShell>);
    default:
      notFound();
  }
}
