export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
}

export interface BlogArticle extends ArticleMeta {
  content: string;
}

export const articleMetadata: ArticleMeta[] = [
  {
    slug: "mahjong-solitaire-for-beginners",
    title: "Mahjong Solitaire for Beginners: How to Play (Free, Online)",
    description:
      "New to Mahjong Solitaire? This plain-English guide covers the rules, the tile types, basic strategy, and how to play for free online — with large, senior-friendly tiles.",
    date: "2026-04-24",
    readingTime: "6 min read",
  },
  {
    slug: "bingo-for-seniors-complete-guide",
    title: "Bingo for Seniors: The Complete Guide (Plus Free Online Bingo)",
    description:
      "Everything you need to know about Bingo — why it is so popular with older adults, how to play solo online, and the surprising research showing it is a real cognitive workout.",
    date: "2026-04-24",
    readingTime: "6 min read",
  },
  {
    slug: "solitaire-mahjong-bingo-benefits-for-seniors",
    title: "Why Solitaire, Mahjong, and Bingo Are So Good for Senior Brains",
    description:
      "Three of the most beloved games for older adults are also among the most cognitively valuable. Here is what research says about Solitaire, Mahjong Solitaire, and Bingo — and how to play them online for free.",
    date: "2026-04-24",
    readingTime: "7 min read",
  },
  {
    slug: "best-brain-exercises-for-seniors",
    title: "10 Best Brain Exercises for Seniors",
    description: "Discover the most effective brain exercises for seniors backed by science. From word puzzles to memory games, learn how to keep your mind sharp and active.",
    date: "2026-02-10",
    readingTime: "8 min read",
  },
  {
    slug: "memory-games-for-seniors",
    title: "Memory Games for Seniors: Fun Ways to Stay Sharp",
    description: "Discover the best memory games for seniors, from card matching to pattern recognition. Learn why memory games matter and find free games to play online.",
    date: "2026-02-08",
    readingTime: "7 min read",
  },
  {
    slug: "benefits-of-puzzles-for-elderly",
    title: "The Science-Backed Benefits of Puzzles for Seniors",
    description: "Learn why puzzles are so beneficial for older adults. Research shows regular puzzle-solving can improve memory, reduce stress, and support long-term brain health.",
    date: "2026-02-05",
    readingTime: "7 min read",
  },
  {
    slug: "how-to-improve-memory-after-70",
    title: "How to Improve Memory After 70: Science-Backed Tips",
    description: "Learn proven strategies to improve memory after 70. From brain games to sleep habits, discover science-backed tips that help seniors maintain sharp recall.",
    date: "2026-02-01",
    readingTime: "8 min read",
  },
  {
    slug: "how-to-keep-your-mind-sharp-after-60",
    title: "How to Keep Your Mind Sharp After 60",
    description: "Practical tips for maintaining cognitive health after 60. Learn about brain-boosting habits including puzzles, social engagement, physical exercise, and nutrition.",
    date: "2026-01-28",
    readingTime: "9 min read",
  },
  {
    slug: "word-games-for-older-adults",
    title: "Word Games for Older Adults: Boost Your Brain Power",
    description: "Explore the best word games for older adults, including crosswords, word searches, and scrambles. Learn how word puzzles keep your brain sharp and vocabulary strong.",
    date: "2026-01-28",
    readingTime: "7 min read",
  },
  {
    slug: "daily-brain-training-for-older-adults",
    title: "Daily Brain Training for Older Adults: A Simple Routine",
    description: "Build an effective daily brain training routine with this practical guide. Learn which exercises to do, how long to spend, and how to stay motivated.",
    date: "2026-01-20",
    readingTime: "7 min read",
  },
  {
    slug: "trivia-games-for-seniors",
    title: "Trivia Games for Seniors: Test Your Knowledge and Have Fun",
    description: "Discover the best trivia games for seniors. From nostalgia quizzes to general knowledge, learn why trivia is great for brain health and find free games to play.",
    date: "2026-01-15",
    readingTime: "7 min read",
  },
  {
    slug: "free-printable-puzzles-for-seniors",
    title: "Free Printable Puzzles for Seniors: Crosswords, Sudoku & More",
    description: "Download and print our collection of free puzzles for seniors. Classic crosswords, word searches, and memory games designed for easy reading and engagement.",
    date: "2026-01-10",
    readingTime: "6 min read",
  },
  {
    slug: "fun-activities-for-seniors-at-home",
    title: "15 Fun Activities for Seniors at Home: Stay Active and Engaged",
    description: "Explore fun and stimulating activities for seniors to do at home. From solo brain games to social activities, find ways to keep life active, joyful, and mentally sharp.",
    date: "2026-01-05",
    readingTime: "10 min read",
  },
];
