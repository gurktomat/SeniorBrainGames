import type { Metadata } from "next";
import { notFound } from "next/navigation";
import QuizEngine from "@/components/QuizEngine";
import TrueOrFalseEngine from "@/components/TrueOrFalseEngine";
import WhoAmIEngine from "@/components/WhoAmIEngine";
import SortingEngine from "@/components/SortingEngine";
import TimelineSortEngine from "@/components/TimelineSortEngine";
import JsonLd from "@/components/JsonLd";
import { getQuizzesByCategory, getQuizBySlug, specialGameSlugs } from "@/lib/quizzes";

import trueOrFalseData from "@/data/general-knowledge/true-or-false.json";
import whoAmIData from "@/data/general-knowledge/who-am-i.json";
import scienceSortingData from "@/data/general-knowledge/science-sorting.json";
import historyTimelineData from "@/data/general-knowledge/history-timeline.json";

const specialGames: Record<string, { title: string; description: string }> = {
  "true-or-false": { title: "True or False", description: "Test your knowledge — is this statement true or false?" },
  "who-am-i": { title: "Who Am I?", description: "Guess the famous person from progressive clues — fewer clues means more points!" },
  "science-sorting": { title: "Science Sorting", description: "Sort items into the correct science categories!" },
  "history-timeline": { title: "History Timeline", description: "Put world history events in the correct chronological order!" },
};

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

function GameStructuredData({ slug, title, description }: { slug: string; title: string; description: string }) {
  const url = `https://seniorbraingames.org/general-knowledge/${slug}`;
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
      <JsonLd
        data={{
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
        }}
      />
    </>
  );
}

export default async function GeneralKnowledgeQuizPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Check if it's a regular quiz
  const quiz = getQuizBySlug("general-knowledge", slug);
  if (quiz) {
    return (
      <>
        <GameStructuredData slug={slug} title={quiz.title} description={quiz.description} />
        <QuizEngine quiz={quiz} />
      </>
    );
  }

  // Special game engines
  const special = specialGames[slug];
  if (!special) notFound();

  const breadcrumb = <GameStructuredData slug={slug} title={special.title} description={special.description} />;

  switch (slug) {
    case "true-or-false":
      return (
        <>
          {breadcrumb}
          <TrueOrFalseEngine title={trueOrFalseData.title} statements={trueOrFalseData.statements} />
        </>
      );
    case "who-am-i":
      return (
        <>
          {breadcrumb}
          <WhoAmIEngine title={whoAmIData.title} puzzles={whoAmIData.puzzles} />
        </>
      );
    case "science-sorting":
      return (
        <>
          {breadcrumb}
          <SortingEngine title={scienceSortingData.title} rounds={scienceSortingData.rounds} />
        </>
      );
    case "history-timeline":
      return (
        <>
          {breadcrumb}
          <TimelineSortEngine title={historyTimelineData.title} rounds={historyTimelineData.rounds} />
        </>
      );
    default:
      notFound();
  }
}
