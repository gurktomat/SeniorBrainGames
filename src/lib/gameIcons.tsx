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
