import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { getAllArticles, getArticleBySlug } from "@/lib/blog";

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: { title: article.title, description: article.description },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const allArticles = getAllArticles();
  const related = allArticles.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.description,
          datePublished: article.date,
          author: {
            "@type": "Organization",
            name: "SeniorBrainGames",
            url: "https://seniorbraingames.org",
          },
          publisher: {
            "@type": "Organization",
            name: "SeniorBrainGames",
            url: "https://seniorbraingames.org",
            logo: {
              "@type": "ImageObject",
              url: "https://seniorbraingames.org/og-image.png",
            },
          },
          mainEntityOfPage: `https://seniorbraingames.org/blog/${slug}`,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://seniorbraingames.org" },
            { "@type": "ListItem", position: 2, name: "Blog", item: "https://seniorbraingames.org/blog" },
            { "@type": "ListItem", position: 3, name: article.title },
          ],
        }}
      />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-text-muted">
        <ol className="flex items-center gap-1.5">
          <li><Link href="/" className="hover:text-primary">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-foreground font-medium">{article.title}</li>
        </ol>
      </nav>

      {/* Article header */}
      <header className="mb-10">
        <div className="mb-3 flex items-center gap-3 text-sm text-text-muted">
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
        <h1
          className="text-3xl font-bold text-foreground sm:text-4xl"
          style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
        >
          {article.title}
        </h1>
      </header>

      {/* Article content */}
      <div
        className="prose-blog"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* CTA */}
      <div
        className="mt-12 rounded-2xl p-8 text-center"
        style={{ background: "var(--gradient-primary)" }}
      >
        <h2
          className="mb-3 text-2xl font-bold text-white"
          style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
        >
          Ready to exercise your brain?
        </h2>
        <p className="mb-6 text-lg text-white/80">
          Try our free games — no signup required.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/daily-challenge"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-bold text-primary shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            Daily Challenge
          </Link>
          <Link
            href="/play"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-6 py-3 text-base font-bold text-white transition-all hover:bg-white/20"
          >
            Browse Games
          </Link>
        </div>
      </div>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="mt-14">
          <h2
            className="mb-6 text-2xl font-bold text-foreground"
            style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
          >
            Related Articles
          </h2>
          <div className="flex flex-col gap-4">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="card-playful group p-5"
              >
                <h3 className="mb-1 text-lg font-bold text-foreground group-hover:text-primary">
                  {r.title}
                </h3>
                <p className="text-sm text-text-muted">{r.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
