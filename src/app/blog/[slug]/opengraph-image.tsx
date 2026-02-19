import { generateOgImage } from "@/lib/ogImage";
import { getAllArticles, getArticleBySlug } from "@/lib/blog";

export const alt = "Blog Article — SeniorBrainGames";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  const title = article?.title || "Brain Health Blog";

  return generateOgImage({
    title,
    subtitle: "SeniorBrainGames Blog",
    category: "blog",
  });
}
