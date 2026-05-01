import { PostCard } from "@/components/feed/post-card";
import { posts } from "@/data/mock";

export default function FeedPage() {
  return (
    <div>
      <header className="border-b border-border px-4 py-4">
        <h1 className="text-xl font-bold">Feed</h1>
      </header>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
