import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    const categories = ["nostalgia-trivia", "general-knowledge", "word-games", "memory-games"];
    return categories.flatMap((cat) => [
      {
        source: `/${cat}`,
        destination: `/play/${cat}`,
        permanent: true,
      },
      {
        source: `/${cat}/:slug`,
        destination: `/play/${cat}/:slug`,
        permanent: true,
      },
      {
        source: `/${cat}/:slug/print`,
        destination: `/play/${cat}/:slug/print`,
        permanent: true,
      },
    ]);
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
