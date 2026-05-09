import type { Metadata } from "next";
import { PostCard } from "@/components/feed/post-card";
import { posts } from "@/data/mock";

export const metadata: Metadata = {
  title: "Feed - furbook",
  description: "See the latest posts from the furbook community",
};

export default function FeedPage() {
  return (
    <div>
      <header className="border-b border-border p-4">
        <h1 className="text-xl font-semibold">Feed</h1>
      </header>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
