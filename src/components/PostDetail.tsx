import { useState } from "react";
import { Post, Comment as CommentType, PostCategory } from "@/lib/types";
import { mockComments } from "@/lib/mock-data";
import { VoteButtons } from "./VoteButtons";
import { CategoryBadge } from "./CategoryBadge";
import { CommentItem } from "./CommentItem";
import { Button } from "./ui/button";
import { ArrowLeft, Clock, Send, Flag } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface PostDetailProps {
  post: Post;
  onBack: () => void;
  onVotePost: (postId: string, direction: "up" | "down") => void;
}

export function PostDetail({ post, onBack, onVotePost }: PostDetailProps) {
  const [comments, setComments] = useState<CommentType[]>(
    mockComments.filter((c) => c.postId === post.id)
  );
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment: CommentType = {
      id: `c-${Date.now()}`,
      postId: post.id,
      content: newComment.trim(),
      authorAlias: `Anonymous#${Math.floor(1000 + Math.random() * 9000)}`,
      upvotes: 0,
      downvotes: 0,
      createdAt: new Date(),
    };
    setComments((prev) => [comment, ...prev]);
    setNewComment("");
  };

  const handleVoteComment = (commentId: string, direction: "up" | "down") => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id !== commentId) return c;
        const wasUp = c.userVote === "up";
        const wasDown = c.userVote === "down";
        const newVote = c.userVote === direction ? null : direction;
        return {
          ...c,
          userVote: newVote,
          upvotes: c.upvotes + (direction === "up" ? (wasUp ? -1 : 1) : wasUp ? -1 : 0),
          downvotes: c.downvotes + (direction === "down" ? (wasDown ? -1 : 1) : wasDown ? -1 : 0),
        };
      })
    );
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to feed
      </button>

      <article className="glass-card p-5">
        <div className="flex gap-4">
          <VoteButtons
            upvotes={post.upvotes}
            downvotes={post.downvotes}
            userVote={post.userVote}
            onVote={(dir) => onVotePost(post.id, dir)}
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <CategoryBadge category={post.category} />
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatDistanceToNow(post.createdAt, { addSuffix: true })}
              </span>
              <span className="text-xs text-muted-foreground">by {post.authorAlias}</span>
            </div>
            {post.title && (
              <h1 className="text-xl font-display font-bold text-foreground mb-2">{post.title}</h1>
            )}
            <p className="text-sm text-secondary-foreground leading-relaxed whitespace-pre-wrap">{post.content}</p>
            <button className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground hover:text-destructive transition-colors">
              <Flag className="w-3.5 h-3.5" />
              Report
            </button>
          </div>
        </div>
      </article>

      <div className="glass-card p-4">
        <div className="flex gap-3">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            rows={2}
            maxLength={1000}
            className="flex-1 bg-input/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none"
          />
          <Button onClick={handleAddComment} disabled={!newComment.trim()} size="icon" className="self-end">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="glass-card p-4">
        <h2 className="font-display font-semibold text-foreground mb-3">
          Comments ({comments.length})
        </h2>
        {comments.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">
            No comments yet. Be the first to share your thoughts.
          </p>
        ) : (
          <div className="divide-y divide-border/30">
            {comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} onVote={handleVoteComment} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
