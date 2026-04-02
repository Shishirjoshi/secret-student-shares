import { useState } from "react";
import { Post, PostCategory, SortMode } from "@/lib/types";
import { mockPosts } from "@/lib/mock-data";
import { Header } from "@/components/Header";
import { PostCard } from "@/components/PostCard";
import { PostDetail } from "@/components/PostDetail";
import { CreatePostForm } from "@/components/CreatePostForm";
import { categoryConfig } from "@/components/CategoryBadge";
import { Plus, TrendingUp, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Index() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [sortMode, setSortMode] = useState<SortMode>("trending");
  const [filterCategory, setFilterCategory] = useState<PostCategory | "all">("all");

  const handleVote = (postId: string, direction: "up" | "down") => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const wasUp = p.userVote === "up";
        const wasDown = p.userVote === "down";
        const newVote = p.userVote === direction ? null : direction;
        return {
          ...p,
          userVote: newVote,
          upvotes: p.upvotes + (direction === "up" ? (wasUp ? -1 : 1) : wasUp ? -1 : 0),
          downvotes: p.downvotes + (direction === "down" ? (wasDown ? -1 : 1) : wasDown ? -1 : 0),
        };
      })
    );
  };

  const handleCreatePost = (data: { title?: string; content: string; category: PostCategory }) => {
    const newPost: Post = {
      id: `p-${Date.now()}`,
      ...data,
      authorAlias: `Anonymous#${Math.floor(1000 + Math.random() * 9000)}`,
      upvotes: 0,
      downvotes: 0,
      commentCount: 0,
      createdAt: new Date(),
    };
    setPosts((prev) => [newPost, ...prev]);
    setShowCreate(false);
  };

  const filteredPosts = posts
    .filter((p) => filterCategory === "all" || p.category === filterCategory)
    .sort((a, b) => {
      if (sortMode === "trending") return b.upvotes - b.downvotes - (a.upvotes - a.downvotes);
      return b.createdAt.getTime() - a.createdAt.getTime();
    });

  const selectedPost = posts.find((p) => p.id === selectedPostId);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {selectedPost ? (
          <PostDetail
            post={selectedPost}
            onBack={() => setSelectedPostId(null)}
            onVotePost={handleVote}
          />
        ) : (
          <>
            {/* Create post toggle */}
            {showCreate ? (
              <CreatePostForm onSubmit={handleCreatePost} onClose={() => setShowCreate(false)} />
            ) : (
              <button
                onClick={() => setShowCreate(true)}
                className="w-full glass-card p-4 flex items-center gap-3 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plus className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm">What's weighing on your mind?</span>
              </button>
            )}

            {/* Sort & Filter */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center bg-secondary rounded-lg p-1 gap-1">
                <button
                  onClick={() => setSortMode("trending")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    sortMode === "trending"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  Trending
                </button>
                <button
                  onClick={() => setSortMode("latest")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    sortMode === "latest"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  Latest
                </button>
              </div>

              <div className="flex gap-1.5 flex-wrap">
                <button
                  onClick={() => setFilterCategory("all")}
                  className={`px-2.5 py-1 text-xs rounded-full border transition-all ${
                    filterCategory === "all"
                      ? "border-primary/40 text-primary bg-primary/10"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  All
                </button>
                {(Object.keys(categoryConfig) as PostCategory[]).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-2.5 py-1 text-xs rounded-full border transition-all ${
                      filterCategory === cat
                        ? categoryConfig[cat].className + " ring-1 ring-current/20"
                        : "border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {categoryConfig[cat].label}
                  </button>
                ))}
              </div>
            </div>

            {/* Posts feed */}
            <div className="space-y-3">
              {filteredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onVote={handleVote}
                  onSelect={setSelectedPostId}
                />
              ))}
              {filteredPosts.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <p className="text-sm">No confessions in this category yet.</p>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
