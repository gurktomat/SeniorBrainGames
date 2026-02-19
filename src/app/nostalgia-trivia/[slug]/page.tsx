import type { Metadata } from "next";
import { notFound } from "next/navigation";
import QuizEngine from "@/components/QuizEngine";
import TimelineSortEngine from "@/components/TimelineSortEngine";
import TrueOrFalseEngine from "@/components/TrueOrFalseEngine";
import SortingEngine from "@/components/SortingEngine";
import WhoAmIEngine from "@/components/WhoAmIEngine";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedGames from "@/components/RelatedGames";
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

function GameStructuredData({ slug, title, description }: { slug: string; title: string; description: string }) {
  const url = `https://seniorbraingames.org/nostalgia-trivia/${slug}`;
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

function PageShell({ slug, title, description, children }: { slug: string; title: string; description: string; children: React.ReactNode }) {
  return (
    <>
      <GameStructuredData slug={slug} title={title} description={description} />
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

  // Check if it's a regular quiz
  const quiz = getQuizBySlug("nostalgia-trivia", slug);
  if (quiz) {
    return (
      <PageShell slug={slug} title={quiz.title} description={quiz.description}>
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
        <PageShell slug={slug} title={special.title} description={special.description}>
          <TimelineSortEngine title={timelineSortData.title} rounds={timelineSortData.rounds} />
        </PageShell>
      );
    case "nostalgia-fact-or-fiction":
      return (
        <PageShell slug={slug} title={special.title} description={special.description}>
          <TrueOrFalseEngine title={nostalgiaFactOrFictionData.title} statements={nostalgiaFactOrFictionData.statements} />
        </PageShell>
      );
    case "decade-sorting":
      return (
        <PageShell slug={slug} title={special.title} description={special.description}>
          <SortingEngine title={decadeSortingData.title} rounds={decadeSortingData.rounds} />
        </PageShell>
      );
    case "nostalgia-who-am-i":
      return (
        <PageShell slug={slug} title={special.title} description={special.description}>
          <WhoAmIEngine title={nostalgiaWhoAmIData.title} puzzles={nostalgiaWhoAmIData.puzzles} />
        </PageShell>
      );
    default:
      notFound();
  }
}
