import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { getAllArticles } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Brain Health Blog — Tips & Articles for Seniors",
  description:
    "Expert articles on brain health, cognitive exercises, and staying mentally sharp. Tips for seniors on puzzles, memory games, and daily brain training.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const articles = getAllArticles();

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "SeniorBrainGames Blog",
          description:
            "Articles on brain health, cognitive exercises, and staying mentally sharp for seniors.",
          url: "https://seniorbraingames.org/blog",
          publisher: {
            "@type": "Organization",
            name: "SeniorBrainGames",
            url: "https://seniorbraingames.org",
          },
        }}
      />

      <div className="mb-10">
        <h1
          className="mb-3 text-3xl font-bold text-foreground sm:text-4xl"
          style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
        >
          Brain Health Blog
        </h1>
        <p className="text-lg text-text-muted">
          Tips, research, and practical advice for keeping your mind sharp and active.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="card-enterprise group p-6"
          >
            <div className="mb-2 flex items-center gap-3 text-sm text-text-muted">
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span aria-hidden="true">&middot;</span>
              <span>{article.readingTime}</span>
            </div>
            <h2
              className="mb-2 text-xl font-bold text-foreground group-hover:text-primary sm:text-2xl"
              style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
            >
              {article.title}
            </h2>
            <p className="text-base text-text-muted">{article.description}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              Read article
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" /></svg>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
