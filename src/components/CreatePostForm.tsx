import { useState } from "react";
import { PostCategory } from "@/lib/types";
import { categoryConfig } from "./CategoryBadge";
import { Send, X } from "lucide-react";
import { Button } from "./ui/button";

interface CreatePostFormProps {
  onSubmit: (data: { title?: string; content: string; category: PostCategory }) => void;
  onClose: () => void;
}

export function CreatePostForm({ onSubmit, onClose }: CreatePostFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<PostCategory>("general");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit({ title: title.trim() || undefined, content: content.trim(), category });
    setTitle("");
    setContent("");
  };

  return (
    <div className="glass-card p-5 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-semibold text-foreground">Share your confession</h2>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(categoryConfig) as PostCategory[]).map((cat) => {
            const config = categoryConfig[cat];
            const Icon = config.icon;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
                  category === cat
                    ? config.className + " ring-1 ring-current"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-3 h-3" />
                {config.label}
              </button>
            );
          })}
        </div>

        <input
          type="text"
          placeholder="Title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={120}
          className="w-full bg-input/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
        />

        <textarea
          placeholder="What's on your mind? Your identity stays hidden..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          maxLength={2000}
          required
          className="w-full bg-input/50 border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none"
        />

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{content.length}/2000</span>
          <Button type="submit" disabled={!content.trim()} className="gap-2">
            <Send className="w-4 h-4" />
            Post Anonymously
          </Button>
        </div>
      </form>
    </div>
  );
}
