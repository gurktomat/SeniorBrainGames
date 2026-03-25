import Link from "next/link";
import { GameIcon, categoryColors } from "@/lib/gameIcons";

interface RelatedGamesProps {
  category: string;
  categoryLabel: string;
  currentSlug: string;
  games: { id: string; title: string; description: string }[];
}

export default function RelatedGames({
  category,
  categoryLabel,
  currentSlug,
  games,
}: RelatedGamesProps) {
  const others = games.filter((g) => g.id !== currentSlug);
  if (others.length === 0) return null;

  // Deterministic selection based on slug hash
  let hash = 0;
  for (let i = 0; i < currentSlug.length; i++) {
    hash = (hash << 5) - hash + currentSlug.charCodeAt(i);
    hash |= 0;
  }
  const start = Math.abs(hash) % others.length;
  const selected: typeof others = [];
  for (let i = 0; i < Math.min(4, others.length); i++) {
    selected.push(others[(start + i) % others.length]);
  }

  const color = categoryColors[category] || "#3B6FC0";

  return (
    <section className="mx-auto max-w-4xl px-6 pb-16 pt-8">
      <h2
        className="mb-6 text-2xl font-bold text-foreground"
        style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
      >
        More {categoryLabel}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {selected.map((game) => (
          <Link
            key={game.id}
            href={`/play/${category}/${game.id}`}
            className="card-playful group flex items-start gap-4 p-4"
          >
            <GameIcon gameId={game.id} category={category} color={color} />
            <div className="min-w-0">
              <p className="text-base font-bold text-foreground transition-colors group-hover:text-primary">
                {game.title}
              </p>
              <p className="mt-1 text-sm text-text-muted">{game.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
