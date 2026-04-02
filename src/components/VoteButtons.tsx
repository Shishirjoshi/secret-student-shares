import { useState } from "react";
import { ArrowBigUp, ArrowBigDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoteButtonsProps {
  upvotes: number;
  downvotes: number;
  userVote?: "up" | "down" | null;
  onVote: (direction: "up" | "down") => void;
  horizontal?: boolean;
}

export function VoteButtons({ upvotes, downvotes, userVote, onVote, horizontal = false }: VoteButtonsProps) {
  const [animating, setAnimating] = useState<"up" | "down" | null>(null);
  const score = upvotes - downvotes;

  const handleVote = (dir: "up" | "down") => {
    setAnimating(dir);
    onVote(dir);
    setTimeout(() => setAnimating(null), 300);
  };

  return (
    <div className={cn("flex items-center gap-1", horizontal ? "flex-row" : "flex-col")}>
      <button
        onClick={() => handleVote("up")}
        className={cn(
          "p-1 rounded-md transition-colors hover:bg-vote-up/10",
          userVote === "up" ? "text-vote-up" : "text-muted-foreground hover:text-vote-up",
          animating === "up" && "animate-vote-pop"
        )}
      >
        <ArrowBigUp className="w-6 h-6" fill={userVote === "up" ? "currentColor" : "none"} />
      </button>
      <span className={cn(
        "text-sm font-semibold tabular-nums min-w-[2ch] text-center",
        userVote === "up" && "text-vote-up",
        userVote === "down" && "text-vote-down",
        !userVote && "text-foreground"
      )}>
        {score}
      </span>
      <button
        onClick={() => handleVote("down")}
        className={cn(
          "p-1 rounded-md transition-colors hover:bg-vote-down/10",
          userVote === "down" ? "text-vote-down" : "text-muted-foreground hover:text-vote-down",
          animating === "down" && "animate-vote-pop"
        )}
      >
        <ArrowBigDown className="w-6 h-6" fill={userVote === "down" ? "currentColor" : "none"} />
      </button>
    </div>
  );
}
