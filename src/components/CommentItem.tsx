import { Comment } from "@/lib/types";
import { VoteButtons } from "./VoteButtons";
import { formatDistanceToNow } from "date-fns";
import { Flag } from "lucide-react";

interface CommentItemProps {
  comment: Comment;
  onVote: (commentId: string, direction: "up" | "down") => void;
}

export function CommentItem({ comment, onVote }: CommentItemProps) {
  return (
    <div className="flex gap-3 py-3 border-b border-border/30 last:border-0 animate-fade-in">
      <VoteButtons
        upvotes={comment.upvotes}
        downvotes={comment.downvotes}
        userVote={comment.userVote}
        onVote={(dir) => onVote(comment.id, dir)}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-medium text-primary">{comment.authorAlias}</span>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
          </span>
        </div>
        <p className="text-sm text-secondary-foreground leading-relaxed">{comment.content}</p>
        <button className="flex items-center gap-1 mt-1 text-xs text-muted-foreground hover:text-destructive transition-colors">
          <Flag className="w-3 h-3" />
          Report
        </button>
      </div>
    </div>
  );
}
