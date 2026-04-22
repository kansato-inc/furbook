"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  HeartOff,
  LogIn,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReportButton } from "@kansato/whistle-react";

interface Post {
  id: string;
  author: string;
  authorId: string;
  caption: string;
  likes: number;
  comments: number;
  timeAgo: string;
  liked: boolean;
  saved: boolean;
  imageColor: string;
}

const posts: Post[] = [
  {
    id: "1",
    author: "fluffy_mcwhiskers",
    authorId: "user-1",
    caption: "Morning zoomies hit different ☀️🐾 #catsofinstagram #morningvibes",
    likes: 1247,
    comments: 89,
    timeAgo: "2h",
    liked: false,
    saved: false,
    imageColor: "#f0e6d3",
  },
  {
    id: "2",
    author: "golden_retriever_max",
    authorId: "user-2",
    caption: "Found the perfect stick. Life is complete 🪵🐕 #doglife #retriever",
    likes: 3421,
    comments: 234,
    timeAgo: "5h",
    liked: true,
    saved: true,
    imageColor: "#d4e8d4",
  },
  {
    id: "3",
    author: "corgi_captain",
    authorId: "user-3",
    caption: "Sploot mode activated. Do not disturb. 🔔 #corgi #sploot #dogsoftwitter",
    likes: 8932,
    comments: 567,
    timeAgo: "8h",
    liked: false,
    saved: false,
    imageColor: "#e8dcc4",
  },
  {
    id: "4",
    author: "siamese_sage",
    authorId: "user-4",
    caption: "Judging your life choices from this very comfortable spot 😼 #siamese #catattitude",
    likes: 5621,
    comments: 312,
    timeAgo: "12h",
    liked: false,
    saved: true,
    imageColor: "#dcdde1",
  },
  {
    id: "5",
    author: "bunny_hopps",
    authorId: "user-5",
    caption: "Freshly groomed and ready for my close-up ✨🐰 #bunny #rabbit #floofy",
    likes: 2156,
    comments: 143,
    timeAgo: "1d",
    liked: true,
    saved: false,
    imageColor: "#e8dce0",
  },
];

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

function PostImage({ color }: { color: string }) {
  const emoji = ["🐱", "🐕", "🐰", "🐈", "🦊"][
    Math.floor(Math.random() * 5)
  ];
  return (
    <div
      className="aspect-square w-full relative"
      style={{ backgroundColor: color }}
    >
      <div className="absolute inset-0 flex items-center justify-center text-8xl select-none">
        {emoji}
      </div>
    </div>
  );
}

export function PostCard({ post, isAuthenticated }: { post: Post; isAuthenticated: boolean }) {
  const [liked, setLiked] = useState(post.liked);
  const [saved, setSaved] = useState(post.saved);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showHeart, setShowHeart] = useState(false);
  const router = useRouter();

  const requireAuth = useCallback((action: () => void) => {
    if (!isAuthenticated) {
      router.push("/sign-in");
      return;
    }
    action();
  }, [isAuthenticated, router]);

  const toggleLike = useCallback(() => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 600);
  }, [liked]);

  const handleDoubleClick = useCallback(() => {
    if (!liked) {
      setLiked(true);
      setLikeCount((prev) => prev + 1);
    }
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 600);
  }, [liked]);

  return (
    <article className="border-b border-border/50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <Link href={`/profile/${post.author}`} className="flex items-center gap-3 hover:opacity-70 transition-opacity">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold">
            {post.author[0].toUpperCase()}
          </div>
          <span className="text-sm font-semibold">{post.author}</span>
        </Link>
        <button className="p-1 hover:text-foreground/40 transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Image */}
      <div onDoubleClick={() => requireAuth(handleDoubleClick)} className="relative cursor-pointer">
        <PostImage color={post.imageColor} />
        <AnimatePresence>
          {showHeart && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <Heart size={120} fill="white" stroke="white" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Actions */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-4 mb-3">
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={() => requireAuth(toggleLike)}
            className="p-0 hover:text-foreground/60 transition-colors active:scale-90"
            aria-label={liked ? "Unlike" : "Like"}
          >
            <AnimatePresence mode="wait">
              {liked ? (
                <motion.div
                  key="liked"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                  <Heart size={24} fill="#ed4956" stroke="#ed4956" className="animate-heart-burst" />
                </motion.div>
              ) : (
                <motion.div
                  key="unliked"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <HeartOff size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          <motion.button whileTap={{ scale: 0.9 }} onClick={() => requireAuth(() => {})} className="p-0 hover:text-foreground/60 transition-colors">
            <MessageCircle size={24} />
          </motion.button>

          <motion.button whileTap={{ scale: 0.9 }} onClick={() => requireAuth(() => {})} className="p-0 hover:text-foreground/60 transition-colors">
            <Send size={24} />
          </motion.button>

          <div className="flex-1" />

          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={() => requireAuth(() => setSaved(!saved))}
            className="p-0 hover:text-foreground/60 transition-colors"
          >
            <AnimatePresence mode="wait">
              {saved ? (
                <motion.div
                  key="saved"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                  <Bookmark size={22} fill="currentColor" />
                </motion.div>
              ) : (
                <Bookmark size={22} />
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Likes */}
        <p className="text-sm font-semibold mb-1">{formatNumber(likeCount)} likes</p>

        {/* Caption */}
        <p className="text-sm line-clamp-2">
          <Link href={`/profile/${post.author}`} className="font-semibold mr-1 hover:underline">
            {post.author}
          </Link>
          {post.caption}
        </p>

        {/* Comments */}
        <button onClick={() => requireAuth(() => {})} className="text-sm text-muted-foreground mt-1 hover:text-foreground/60 transition-colors">
          View all {post.comments} comments
        </button>

        {/* Time + Report */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[11px] uppercase text-muted-foreground tracking-wide">
            {post.timeAgo}
          </span>
          <ReportButton
            subject={{
              type: "user",
              id: post.authorId,
              name: post.author,
            }}
            target={{
              type: "post",
              id: post.id,
            }}
          >
            {(props: { onClick: () => void }) => (
              <button
                {...props}
                className="text-[11px] uppercase text-muted-foreground tracking-wide hover:text-destructive transition-colors"
              >
                Report
              </button>
            )}
          </ReportButton>
        </div>
      </div>

      {/* Comment input */}
      <div className="border-t border-border/30 px-4 py-2 flex items-center gap-3">
        {isAuthenticated ? (
          <>
            <input
              type="text"
              placeholder="Add a comment..."
              className="flex-1 text-sm bg-transparent placeholder:text-muted-foreground focus:outline-none"
            />
            <button className="text-accent text-sm font-semibold opacity-40">
              Post
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Add a comment..."
              readOnly
              className="flex-1 text-sm bg-transparent placeholder:text-muted-foreground focus:outline-none cursor-pointer"
              onClick={() => router.push("/sign-in")}
            />
            <button onClick={() => router.push("/sign-in")} className="text-accent text-sm font-semibold flex items-center gap-1">
              <LogIn size={14} />
              Log in
            </button>
          </>
        )}
      </div>
    </article>
  );
}

export function FeedPosts({ isAuthenticated }: { isAuthenticated: boolean }) {
  return (
    <div>
      {posts.map((post, i) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.35, ease: "easeOut" }}
        >
          <PostCard post={post} isAuthenticated={isAuthenticated} />
        </motion.div>
      ))}
    </div>
  );
}
