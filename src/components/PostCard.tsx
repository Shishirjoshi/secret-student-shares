import { Post } from "@/lib/types";
import { VoteButtons } from "./VoteButtons";
import { CategoryBadge } from "./CategoryBadge";
import { MessageSquare, Flag, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  post: Post;
  onVote: (postId: string, direction: "up" | "down") => void;
  onSelect: (postId: string) => void;
}

export function PostCard({ post, onVote, onSelect }: PostCardProps) {
  return (
    <article className="glass-card p-4 hover:border-primary/30 transition-all duration-200 animate-fade-in group">
      <div className="flex gap-3">
        <div className="flex-shrink-0 pt-1">
          <VoteButtons
            upvotes={post.upvotes}
            downvotes={post.downvotes}
            userVote={post.userVote}
            onVote={(dir) => onVote(post.id, dir)}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <CategoryBadge category={post.category} />
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDistanceToNow(post.createdAt, { addSuffix: true })}
            </span>
            <span className="text-xs text-muted-foreground">by {post.authorAlias}</span>
          </div>

          <div className="cursor-pointer" onClick={() => onSelect(post.id)}>
            {post.title && (
              <h3 className="text-base font-display font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
            )}
            <p className="text-sm text-secondary-foreground leading-relaxed line-clamp-3">
              {post.content}
            </p>
          </div>

          <div className="flex items-center gap-4 mt-3">
            <button
              onClick={() => onSelect(post.id)}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              {post.commentCount} comments
            </button>
            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors">
              <Flag className="w-3.5 h-3.5" />
              Report
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
