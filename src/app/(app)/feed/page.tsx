"use client";

import { authClient } from "@/lib/auth-client";
import { FeedPosts } from "@/components/feed/post-card";

export default function FeedPage() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <FeedPosts isAuthenticated={!!session} />
    </div>
  );
}
