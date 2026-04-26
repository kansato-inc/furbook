"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "motion/react";
import {
  Settings,
  Grid,
  Bookmark,
  UserPlus,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";

const profileData: Record<string, {
  name: string;
  bio: string;
  posts: number;
  followers: number | string;
  following: number;
  imageColor: string;
}> = {
  me: {
    name: "Your Account",
    bio: "furbook enthusiast 🐾",
    posts: 42,
    followers: 189,
    following: 234,
    imageColor: "#e8dcc4",
  },
  fluffy_mcwhiskers: {
    name: "Fluffy McWhiskers",
    bio: "Professional napper | Treats connoisseur | Zoomies champion 🐱\n📍 Catifornia",
    posts: 127,
    followers: "12.4K",
    following: 342,
    imageColor: "#f0e6d3",
  },
  golden_retriever_max: {
    name: "Max the Golden",
    bio: "Good boy. Stick collector. Belly rub enthusiast 🐕\n📍 Park Life",
    posts: 89,
    followers: "8.7K",
    following: 156,
    imageColor: "#d4e8d4",
  },
};

type Tab = "posts" | "saved";

function formatCount(n: number | string): string {
  if (typeof n === "string") return n;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function ProfileGrid({ color }: { color: string }) {
  const emojis = ["🐱", "🐕", "🐰", "🦊", "🐈", "🐶"];
  return (
    <div className="grid grid-cols-3 gap-[3px]">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          whileHover={{ opacity: 0.85 }}
          className={cn(
            "aspect-square relative cursor-pointer",
            i % 2 !== 0 && "bg-muted"
          )}
          style={i % 2 === 0 ? { backgroundColor: color } : undefined}
        >
          <div className="absolute inset-0 flex items-center justify-center text-2xl select-none">
            {emojis[i % emojis.length]}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function ProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [activeTab, setActiveTab] = useState<Tab>("posts");
  const isOwnProfile = username === "me" || session?.user?.username === username;

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/sign-in");
    }
  }, [session, isPending, router]);

  const profile = useMemo(() => {
    return (
      profileData[username] ?? {
        name: username,
        bio: "",
        posts: 0,
        followers: 0,
        following: 0,
        imageColor: "#eee",
      }
    );
  }, [username]);

  if (isPending || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="animate-fade-in">
      {/* Profile header */}
      <div className="px-4 py-6 md:py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-16">
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0.85 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-[77px] h-[77px] md:w-[150px] md:h-[150px] rounded-full bg-muted flex items-center justify-center text-xl md:text-4xl font-bold shrink-0"
            style={{ backgroundColor: profile.imageColor }}
          >
            {initials}
          </motion.div>

          {/* Info */}
          <div className="flex-1 w-full">
            {/* Username row */}
            <div className="flex items-center gap-4 mb-5 flex-wrap">
              <h2 className="text-lg md:text-xl">{isOwnProfile ? session.user.name : username}</h2>

              {isOwnProfile ? (
                <>
                  <button className="text-sm font-semibold px-4 py-1.5 rounded-lg bg-muted hover:bg-foreground/5 transition-colors">
                    Edit profile
                  </button>
                  <button className="p-2 hover:text-foreground/40 transition-colors">
                    <Settings size={20} />
                  </button>
                </>
              ) : (
                <button className="text-sm font-semibold px-6 py-1.5 rounded-lg bg-accent text-white hover:bg-accent-hover transition-colors flex items-center gap-1">
                  <UserPlus size={16} />
                  Follow
                </button>
              )}
            </div>

            {/* Stats */}
            <div className="flex gap-6 mb-4 text-sm md:text-base">
              <span><strong>{formatCount(profile.posts)}</strong> posts</span>
              <span><strong>{formatCount(profile.followers)}</strong> followers</span>
              <span><strong>{formatCount(profile.following)}</strong> following</span>
            </div>

            {/* Bio */}
            {profile.bio && (
              <pre className="text-sm whitespace-pre-wrap font-sans leading-relaxed max-w-md">
                {profile.bio}
              </pre>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t border-border/50 flex">
        <button
          onClick={() => setActiveTab("posts")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs uppercase tracking-wider font-semibold transition-colors ${
            activeTab === "posts" ? "border-t border-foreground" : "text-muted-foreground"
          }`}
        >
          <Grid size={14} />
          Posts
        </button>
        <button
          onClick={() => setActiveTab("saved")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs uppercase tracking-wider font-semibold transition-colors ${
            activeTab === "saved" ? "border-t border-foreground" : "text-muted-foreground"
          }`}
        >
          <Bookmark size={14} />
          {isOwnProfile ? "Saved" : ""}
        </button>
      </div>

      {/* Grid content */}
      {activeTab === "posts" && <ProfileGrid color={profile.imageColor} />}
      {activeTab === "saved" && (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <Bookmark size={48} strokeWidth={1} className="mb-4 opacity-40" />
          <p className="font-semibold">Only you can see what you&apos;ve saved</p>
        </div>
      )}
    </div>
  );
}
