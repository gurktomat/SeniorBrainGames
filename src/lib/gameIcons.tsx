import {
  Radio,
  Globe,
  Type,
  Brain,
  type LucideIcon,
} from "lucide-react";

export function GameIcon({
  gameId,
  category,
  color,
  size = 22,
}: {
  gameId: string;
  category?: string;
  color: string;
  size?: number;
}) {
  let Icon: LucideIcon = Radio;

  if (category === "nostalgia-trivia") Icon = Radio;
  else if (category === "general-knowledge") Icon = Globe;
  else if (category === "word-games") Icon = Type;
  else if (category === "memory-games") Icon = Brain;

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
  "nostalgia-trivia": "#6366F1",
  "general-knowledge": "#0EA5E9",
  "word-games": "#F59E0B",
  "memory-games": "#10B981",
};
