import { PostCategory } from "@/lib/types";
import { Heart, BookOpen, Brain, Flame, HelpCircle, MessageCircle } from "lucide-react";

const categoryConfig: Record<PostCategory, { label: string; icon: React.ElementType; className: string }> = {
  love: { label: "Love", icon: Heart, className: "bg-pink-500/15 text-pink-400 border-pink-500/20" },
  study: { label: "Study", icon: BookOpen, className: "bg-blue-500/15 text-blue-400 border-blue-500/20" },
  "mental-health": { label: "Mental Health", icon: Brain, className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20" },
  rant: { label: "Rant", icon: Flame, className: "bg-orange-500/15 text-orange-400 border-orange-500/20" },
  advice: { label: "Advice", icon: HelpCircle, className: "bg-violet-500/15 text-violet-400 border-violet-500/20" },
  general: { label: "General", icon: MessageCircle, className: "bg-primary/15 text-primary border-primary/20" },
};

interface CategoryBadgeProps {
  category: PostCategory;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const config = categoryConfig[category];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border ${config.className}`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
}

export { categoryConfig };
