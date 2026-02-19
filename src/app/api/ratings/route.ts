import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import sql from "@/lib/db";

const VALID_CATEGORIES = [
  "word-games",
  "nostalgia-trivia",
  "general-knowledge",
  "memory-games",
];

// In-memory rate limiting: IP -> timestamps
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 20;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);
  if (recent.length >= RATE_LIMIT_MAX) return false;
  recent.push(now);
  rateLimitMap.set(ip, recent);
  return true;
}

async function hashIp(ip: string): Promise<string> {
  const [row] = await sql`SELECT salt FROM ip_salt WHERE id = 1`;
  const salt = row?.salt || "fallback-salt";
  return createHash("sha256").update(ip + salt).digest("hex");
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many ratings. Please try again later." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const { gameSlug, category, rating } = body;

    // Validate inputs
    if (
      !gameSlug ||
      typeof gameSlug !== "string" ||
      gameSlug.length > 100
    ) {
      return NextResponse.json(
        { error: "Invalid game slug" },
        { status: 400 },
      );
    }
    if (!VALID_CATEGORIES.includes(category)) {
      return NextResponse.json(
        { error: "Invalid category" },
        { status: 400 },
      );
    }
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be an integer between 1 and 5" },
        { status: 400 },
      );
    }

    const ipHash = await hashIp(ip);

    // Upsert rating
    await sql`
      INSERT INTO game_ratings (game_slug, category, rating, ip_hash, rating_date)
      VALUES (${gameSlug}, ${category}, ${rating}, ${ipHash}, CURRENT_DATE)
      ON CONFLICT (game_slug, ip_hash, rating_date)
      DO UPDATE SET rating = ${rating}, created_at = NOW()
    `;

    // Return fresh aggregate
    const [aggregate] = await sql`
      SELECT
        ROUND(AVG(rating)::numeric, 1) AS avg_rating,
        COUNT(*) AS rating_count
      FROM game_ratings
      WHERE game_slug = ${gameSlug}
    `;

    return NextResponse.json({
      avgRating: Number(aggregate.avg_rating),
      ratingCount: Number(aggregate.rating_count),
    });
  } catch (error) {
    console.error("Rating POST error:", error);
    return NextResponse.json(
      { error: "Failed to submit rating" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const game = searchParams.get("game");
    const category = searchParams.get("category");

    if (game && category) {
      // Single game aggregate
      const [row] = await sql`
        SELECT avg_rating, rating_count
        FROM game_rating_aggregates
        WHERE game_slug = ${game}
      `;
      return NextResponse.json(
        row
          ? {
              avgRating: Number(row.avg_rating),
              ratingCount: Number(row.rating_count),
            }
          : { avgRating: 0, ratingCount: 0 },
      );
    }

    if (category) {
      if (!VALID_CATEGORIES.includes(category)) {
        return NextResponse.json(
          { error: "Invalid category" },
          { status: 400 },
        );
      }
      // All games in category
      const rows = await sql`
        SELECT game_slug, avg_rating, rating_count
        FROM game_rating_aggregates
        WHERE category = ${category}
      `;
      const ratings: Record<
        string,
        { avgRating: number; ratingCount: number }
      > = {};
      for (const row of rows) {
        ratings[row.game_slug] = {
          avgRating: Number(row.avg_rating),
          ratingCount: Number(row.rating_count),
        };
      }
      return NextResponse.json(ratings);
    }

    return NextResponse.json(
      { error: "Provide ?game=slug&category=cat or ?category=cat" },
      { status: 400 },
    );
  } catch (error) {
    console.error("Rating GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch ratings" },
      { status: 500 },
    );
  }
}
