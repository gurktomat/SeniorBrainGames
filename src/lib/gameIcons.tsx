import {
  Music, Music2, Film, Disc3, Tv, Star, Gamepad2, Megaphone, Car, Puzzle,
  Radio, Shirt, Clapperboard, Trophy,
  Landmark, Building, PawPrint, Globe, Utensils, Lightbulb, Flag, Heart,
  Building2, Atom, Telescope, BookOpen, Waves, Piano,
  Shuffle, Quote, SpellCheck, Network, Hash, Search, UserX, ArrowUpDown, Lock,
  Equal, HelpCircle, ArrowLeftRight, BookMarked, CircleHelp, GraduationCap, MessageSquare,
  Layers, Eye, CircleOff, Shapes, Palette, Grid3x3, Move, Zap, Link2,
  Image, Users, Ban, Brain, RotateCcw, Asterisk, Dices, Sun,
  CheckCircle, Clock, Smile, Wrench, MessageCircle, PenTool, HeartHandshake,
  HelpingHand, ScrollText, Scale, CalendarRange, Clapperboard as Clapperboard2,
  Castle, Languages,
  BookOpenText, Binary, UserCheck, PenLine, FlaskConical, UsersRound,
  MonitorPlay, Beaker, BrainCircuit, Link,
  Target, Hourglass, CircleDot, Package, Scroll, Calculator, Award,
  Volume2, Crosshair, ListOrdered, Bomb,
  Mic, CalendarDays, MessageSquareQuote, Church, History, FileSearch, Medal, Sparkles,
  MonitorSmartphone, CookingPot, Tent, Lasso,
  Bird, Flower2, MapPin, CloudLightning,
  BookType, Combine, FileText, PencilLine,
  ArrowDown01, FastForward, FolderTree, ShieldQuestion, Ear, Repeat, BookHeart, Armchair, Map, Timer,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  // Nostalgia Trivia
  "fifties-nostalgia": Music,
  "sixties-music": Music2,
  "classic-hollywood": Film,
  "seventies-nostalgia": Disc3,
  "classic-tv": Tv,
  "sixties-nostalgia": Star,
  "eighties-nostalgia": Gamepad2,
  "classic-commercials": Megaphone,
  "classic-cars": Car,
  "vintage-toys": Puzzle,
  "classic-radio": Radio,
  "decade-fashions": Shirt,
  "classic-cartoons": Clapperboard,
  "classic-sports": Trophy,

  // General Knowledge
  "famous-landmarks": Landmark,
  "us-presidents": Building,
  "nature-animals": PawPrint,
  "geography-challenge": Globe,
  "food-cooking": Utensils,
  "science-inventions": Lightbulb,
  "american-history": Flag,
  "human-body-health": Heart,
  "world-capitals": Building2,
  "famous-scientists": Atom,
  "space-astronomy": Telescope,
  "famous-literature": BookOpen,
  "world-oceans-rivers": Waves,
  "musical-instruments": Piano,

  // Word Games
  "word-scramble": Shuffle,
  "complete-the-proverb": Quote,
  "spelling-bee": SpellCheck,
  "word-association": Network,
  "crossword-classic": Hash,
  "word-search": Search,
  "hangman": UserX,
  "word-ladder": ArrowUpDown,
  "cryptogram": Lock,
  "synonym-challenge": Equal,
  "whats-the-word": HelpCircle,
  "antonym-challenge": ArrowLeftRight,
  "idiom-origins": BookMarked,
  "rhyme-time": Music,
  "commonly-confused": CircleHelp,
  "vocabulary-builder": GraduationCap,
  "figures-of-speech": MessageSquare,

  // Memory Games
  "memory-card-match": Layers,
  "spot-the-difference": Eye,
  "whats-missing": CircleOff,
  "pattern-recognition": Shapes,
  "color-shape-sorting": Palette,
  "sudoku-puzzles": Grid3x3,
  "sliding-puzzle": Move,
  "sequence-memory": Zap,
  "matching-pairs": Link2,
  "picture-quiz": Image,
  "famous-faces": Users,
  "odd-one-out": Ban,
  "trivia-recall": Brain,
  "visual-clues": Eye,
  "before-and-after": ArrowLeftRight,
  "connection-puzzle": Puzzle,
  "math-challenge": Hash,

  // Additional Word Games
  "anagram-challenge": RotateCcw,
  "missing-vowels": Asterisk,

  // Additional Nostalgia Trivia
  "classic-board-games": Dices,

  // Additional General Knowledge
  "world-religions-mythology": Sun,

  // New games
  "true-or-false": CheckCircle,
  "timeline-sort": Clock,
  "emoji-decoder": Smile,
  "famous-inventions": Wrench,
  "classic-sitcom-catchphrases": MessageCircle,
  "grammar-punctuation": PenTool,
  "famous-couples": HeartHandshake,

  // Batch 8 games
  "who-am-i": HelpingHand,
  "riddle-challenge": ScrollText,
  "nostalgia-fact-or-fiction": Scale,
  "decade-sorting": CalendarRange,
  "classic-movie-quotes": Clapperboard2,
  "ancient-modern-wonders": Castle,
  "foreign-words": Languages,

  // Batch 9 games
  "famous-first-lines": BookOpenText,
  "number-memory": Binary,
  "nostalgia-who-am-i": UserCheck,
  "grammar-true-or-false": PenLine,
  "science-sorting": FlaskConical,
  "famous-duos": UsersRound,
  "retro-tv-themes": MonitorPlay,
  "everyday-science": Beaker,
  "brain-teasers": BrainCircuit,
  "word-connections": Link,

  // Batch 10 games
  "estimation-game": Target,
  "history-timeline": Hourglass,
  "memory-true-or-false": CircleDot,
  "what-am-i": Package,
  "world-history": Scroll,
  "math-numbers": Calculator,
  "retro-movie-stars": Award,
  "classic-jingles": Volume2,
  "concentration-quiz": Crosshair,
  "number-patterns": ListOrdered,
  "minesweeper": Bomb,

  // Batch 11 games
  "finish-the-lyric": Mic,
  "name-the-decade": CalendarDays,
  "famous-quotes": MessageSquareQuote,
  "bible-knowledge": Church,
  "old-time-expressions": History,
  "word-origins": FileSearch,
  "famous-firsts": Medal,
  "logic-deduction": Sparkles,

  // Batch 12 games
  "classic-game-shows": MonitorSmartphone,
  "classic-diners-drive-ins": CookingPot,
  "woodstock-music-festivals": Tent,
  "classic-westerns": Lasso,
  "birds-birdwatching": Bird,
  "flowers-gardening": Flower2,
  "travel-geography-usa": MapPin,
  "weather-natural-phenomena": CloudLightning,
  "proverbs-sayings": BookType,
  "compound-words": Combine,
  "abbreviations-acronyms": FileText,
  "complete-the-phrase": PencilLine,
  "sequence-order": ArrowDown01,
  "what-comes-next": FastForward,
  "category-sort": FolderTree,
  "two-truths-one-lie": ShieldQuestion,
  "remember-the-year": Clock,
  "everyday-memory-test": Eye,

  // Batch 13 — 25 new games
  "crossword-nature-science": Hash,
  "word-search-animals": Search,
  "food-word-scramble": Shuffle,
  "cryptogram-poetry": Lock,
  "word-ladder-challenge": ArrowUpDown,
  "nostalgia-hangman": UserX,
  "nostalgia-riddles": ScrollText,
  "vintage-spelling-bee": SpellCheck,
  "old-time-sayings": Quote,
  "retro-word-association": Network,
  "nostalgia-matching": Link2,
  "nostalgia-estimation": Target,
  "science-true-or-false": CheckCircle,
  "what-in-the-world": Globe,
  "inventions-timeline": Hourglass,
  "animal-kingdom-sorting": PawPrint,
  "mental-math": Calculator,
  "logic-patterns": Shapes,
  "observation-challenge": Eye,
  "nature-card-match": Layers,
  "color-sequence-challenge": Zap,
  "number-recall-challenge": Binary,
  "whats-changed": CircleOff,
  "sudoku-challenge": Grid3x3,
  "sliding-puzzle-challenge": Move,

  // Batch 14 — 10 new games
  "homophones-challenge": Ear,
  "double-meanings": Repeat,
  "history-spelling-bee": SpellCheck,
  "word-search-travel": Map,
  "classic-childrens-books": BookHeart,
  "vintage-household-items": Armchair,
  "famous-speeches": Mic,
  "geography-sorting": Globe,
  "famous-pairs-matching": Link2,
  "rapid-recall": Timer,
};

export function GameIcon({
  gameId,
  color,
  size = 22,
}: {
  gameId: string;
  color: string;
  size?: number;
}) {
  const Icon = iconMap[gameId];
  if (!Icon) return null;

  return (
    <span
      className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl text-white"
      style={{ background: color }}
      aria-hidden="true"
    >
      <Icon size={size} strokeWidth={1.75} />
    </span>
  );
}

// Category colors
export const categoryColors: Record<string, string> = {
  "nostalgia-trivia": "#3B6FC0",
  "general-knowledge": "#0891B2",
  "word-games": "#E8983E",
  "memory-games": "#16A34A",
};
