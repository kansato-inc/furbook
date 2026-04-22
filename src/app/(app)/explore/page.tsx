"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Search } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const emojis = ["🐱", "🐕", "🐰", "🦊", "🐈", "🐶", "🐹", "🦝", "🐨", "🦁", "🐯", "🐸"];
const colors = [
  "#f0e6d3", "#d4e8d4", "#e8dcc4", "#dcdde1", "#e8dce0",
  "#dde8f0", "#f0e0e8", "#e8f0dc", "#f0dcde", "#dce0f0",
];

interface ExplorePost {
  id: number;
  emoji: string;
  bgColor: string;
  likes: number;
}

const explorePosts: ExplorePost[] = Array.from({ length: 24 }).map((_, i) => ({
  id: i,
  emoji: emojis[i % emojis.length],
  bgColor: colors[i % colors.length],
  likes: Math.floor(Math.random() * 10000) + 50,
}));

export default function ExplorePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/sign-in");
    }
  }, [session, isPending, router]);

  const filtered = query.trim()
    ? explorePosts.filter((p) =>
        p.likes.toString().includes(query)
      )
    : explorePosts;

  if (isPending || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Search bar */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm px-4 py-3 border-b border-border/30">
        <div className="relative max-w-md mx-auto">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-muted rounded-lg focus:outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Masonry-like grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-[3px] p-[3px]">
        {filtered.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: Math.min(i * 0.02, 0.5), duration: 0.25 }}
            whileHover={{ opacity: 0.85 }}
            className={`aspect-square relative cursor-pointer group ${i % 5 === 0 ? "row-span-2 aspect-auto" : ""}`}
            style={{ backgroundColor: post.bgColor }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-4xl md:text-5xl select-none group-hover:scale-110 transition-transform duration-300">
              {post.emoji}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-white text-xs font-semibold">
              <HeartIcon /> {post.likes.toLocaleString()}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function HeartIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="white" stroke="none">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
