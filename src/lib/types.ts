export type PostCategory = "love" | "study" | "mental-health" | "rant" | "advice" | "general";

export interface Post {
  id: string;
  title?: string;
  content: string;
  authorAlias: string;
  category: PostCategory;
  upvotes: number;
  downvotes: number;
  userVote?: "up" | "down" | null;
  commentCount: number;
  createdAt: Date;
  reported?: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  content: string;
  authorAlias: string;
  upvotes: number;
  downvotes: number;
  userVote?: "up" | "down" | null;
  createdAt: Date;
  parentId?: string;
}

export type SortMode = "trending" | "latest";
