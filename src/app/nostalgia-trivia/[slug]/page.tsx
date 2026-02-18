import type { Metadata } from "next";
import { notFound } from "next/navigation";
import QuizEngine from "@/components/QuizEngine";
import TimelineSortEngine from "@/components/TimelineSortEngine";
import TrueOrFalseEngine from "@/components/TrueOrFalseEngine";
import SortingEngine from "@/components/SortingEngine";
import WhoAmIEngine from "@/components/WhoAmIEngine";
import JsonLd from "@/components/JsonLd";
import { getQuizzesByCategory, getQuizBySlug, specialGameSlugs } from "@/lib/quizzes";

import timelineSortData from "@/data/nostalgia-trivia/timeline-sort.json";
import nostalgiaFactOrFictionData from "@/data/nostalgia-trivia/nostalgia-fact-or-fiction.json";
import decadeSortingData from "@/data/nostalgia-trivia/decade-sorting.json";
import nostalgiaWhoAmIData from "@/data/nostalgia-trivia/nostalgia-who-am-i.json";

const specialGames: Record<string, { title: string; description: string }> = {
  "timeline-sort": { title: "Timeline Sort", description: "Put historical events in the correct chronological order!" },
  "nostalgia-fact-or-fiction": { title: "Nostalgia Fact or Fiction", description: "Can you tell which nostalgic facts from the 1950s–1980s are true and which are made up?" },
  "decade-sorting": { title: "Decade Sorting", description: "Sort pop culture items into their correct decade!" },
  "nostalgia-who-am-i": { title: "Nostalgia Who Am I?", description: "Guess the pop culture icon from progressive clues!" },
};

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
      openGraph: { title: quiz.title, description: quiz.description },
    };
  }
  const special = specialGames[slug];
  if (special) {
    return {
      title: special.title,
      description: special.description,
      openGraph: { title: special.title, description: special.description },
    };
  }
  return {};
}

function Breadcrumb({ slug, title }: { slug: string; title: string }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://seniorbraingames.org" },
          { "@type": "ListItem", position: 2, name: "Nostalgia Trivia", item: "https://seniorbraingames.org/nostalgia-trivia" },
          { "@type": "ListItem", position: 3, name: title, item: `https://seniorbraingames.org/nostalgia-trivia/${slug}` },
        ],
      }}
    />
  );
}

export default async function NostalgiaQuizPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Check if it's a regular quiz
  const quiz = getQuizBySlug("nostalgia-trivia", slug);
  if (quiz) {
    return (
      <>
        <Breadcrumb slug={slug} title={quiz.title} />
        <QuizEngine quiz={quiz} />
      </>
    );
  }

  // Special game engines
  const special = specialGames[slug];
  if (!special) notFound();

  const breadcrumb = <Breadcrumb slug={slug} title={special.title} />;

  switch (slug) {
    case "timeline-sort":
      return (
        <>
          {breadcrumb}
          <TimelineSortEngine title={timelineSortData.title} rounds={timelineSortData.rounds} />
        </>
      );
    case "nostalgia-fact-or-fiction":
      return (
        <>
          {breadcrumb}
          <TrueOrFalseEngine title={nostalgiaFactOrFictionData.title} statements={nostalgiaFactOrFictionData.statements} />
        </>
      );
    case "decade-sorting":
      return (
        <>
          {breadcrumb}
          <SortingEngine title={decadeSortingData.title} rounds={decadeSortingData.rounds} />
        </>
      );
    case "nostalgia-who-am-i":
      return (
        <>
          {breadcrumb}
          <WhoAmIEngine title={nostalgiaWhoAmIData.title} puzzles={nostalgiaWhoAmIData.puzzles} />
        </>
      );
    default:
      notFound();
  }
}
