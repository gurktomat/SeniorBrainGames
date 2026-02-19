import postgres from "postgres";

const sql = postgres({
  host: "localhost",
  port: 5432,
  database: "seniorbraingames",
  username: "seniorbraingames",
  password: process.env.PG_PASSWORD,
  max: 10,
  idle_timeout: 20,
});

export default sql;

export async function getGameRating(
  gameSlug: string,
): Promise<{ avgRating: number; ratingCount: number } | null> {
  try {
    const [row] = await sql`
      SELECT avg_rating, rating_count
      FROM game_rating_aggregates
      WHERE game_slug = ${gameSlug}
    `;
    if (!row) return null;
    return {
      avgRating: Number(row.avg_rating),
      ratingCount: Number(row.rating_count),
    };
  } catch {
    return null;
  }
}

export async function getTopRatedGames(
  limit: number = 4,
): Promise<{ slug: string; category: string; avgRating: number; ratingCount: number }[]> {
  try {
    const rows = await sql`
      SELECT game_slug, category, avg_rating, rating_count
      FROM game_rating_aggregates
      WHERE rating_count >= 3
      ORDER BY avg_rating DESC, rating_count DESC
      LIMIT ${limit}
    `;
    return rows.map((row) => ({
      slug: String(row.game_slug),
      category: String(row.category),
      avgRating: Number(row.avg_rating),
      ratingCount: Number(row.rating_count),
    }));
  } catch {
    return [];
  }
}

export async function getCategoryRatings(
  category: string,
): Promise<Record<string, { avgRating: number; ratingCount: number }>> {
  try {
    const rows = await sql`
      SELECT game_slug, avg_rating, rating_count
      FROM game_rating_aggregates
      WHERE category = ${category}
    `;
    const ratings: Record<string, { avgRating: number; ratingCount: number }> =
      {};
    for (const row of rows) {
      ratings[row.game_slug] = {
        avgRating: Number(row.avg_rating),
        ratingCount: Number(row.rating_count),
      };
    }
    return ratings;
  } catch {
    return {};
  }
}
