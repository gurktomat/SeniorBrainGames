import { ImageResponse } from "next/og";

const categoryColors: Record<string, string> = {
  "nostalgia-trivia": "#6366F1",
  "general-knowledge": "#0EA5E9",
  "word-games": "#F59E0B",
  "memory-games": "#10B981",
  "printable-puzzles": "#C08A1A",
  blog: "#1F6E4A",
};

export function generateOgImage({
  title,
  subtitle,
  category,
}: {
  title: string;
  subtitle?: string;
  category?: string;
}): ImageResponse {
  const accent = category ? categoryColors[category] || "#C08A1A" : "#C08A1A";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #1F6E4A 0%, #2F9966 100%)",
          padding: "60px",
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            width: "80px",
            height: "6px",
            borderRadius: "3px",
            background: accent,
            display: "flex",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            flex: 1,
            justifyContent: "center",
          }}
        >
          {subtitle && (
            <div
              style={{
                fontSize: "28px",
                color: "rgba(255,255,255,0.7)",
                fontWeight: 600,
              }}
            >
              {subtitle}
            </div>
          )}
          <div
            style={{
              fontSize: title.length > 40 ? "48px" : "56px",
              fontWeight: 700,
              color: "white",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: 700,
                color: "white",
              }}
            >
              B
            </div>
            <div style={{ fontSize: "24px", color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>
              SeniorBrainGames.org
            </div>
          </div>
          <div style={{ fontSize: "20px", color: "rgba(255,255,255,0.5)" }}>
            Free Brain Games for Seniors
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
