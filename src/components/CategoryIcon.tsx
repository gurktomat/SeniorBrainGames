import { Radio, Globe, Type, Brain } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>> = {
  radio: Radio,
  globe: Globe,
  type: Type,
  brain: Brain,
};

export default function CategoryIcon({
  name,
  size = 24,
  className = "",
  strokeWidth = 2,
}: {
  name: string;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  const Icon = iconMap[name];
  if (!Icon) return null;
  return <Icon size={size} className={className} strokeWidth={strokeWidth} />;
}
