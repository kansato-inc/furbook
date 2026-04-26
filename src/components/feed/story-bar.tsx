"use client";

import { motion } from "motion/react";
import { PlusSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface Story {
  id: string;
  username: string;
  avatar: string;
  seen?: boolean;
}

const stories: Story[] = [
  { id: "1", username: "fluffy_mcwhiskers", avatar: "", seen: false },
  { id: "2", username: "mittens_the_cat", avatar: "", seen: true },
  { id: "3", username: "paws_daily", avatar: "", seen: false },
  { id: "4", username: "bunny_hopps", avatar: "", seen: true },
  { id: "5", username: "golden_retriever_max", avatar: "", seen: false },
  { id: "6", username: "corgi_captain", avatar: "", seen: true },
  { id: "7", username: "siamese_sage", avatar: "", seen: false },
];

function StoryAvatar({ story }: { story: Story }) {
  const initials = story.username
    .split("_")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center gap-1 min-w-[66px]"
    >
      <div
        className={cn(
          "w-[56px] h-[56px] rounded-full p-[2px]",
          story.seen ? "bg-border" : "bg-gradient-to-br from-accent via-purple-500 to-pink-500"
        )}
      >
        <div className="w-full h-full rounded-full bg-background p-[2px]">
          <div className="w-full h-full rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground">
            {initials}
          </div>
        </div>
      </div>
      <span className="text-[11px] truncate max-w-[66px] text-ellipsis overflow-hidden">
        {story.username.length > 10
          ? story.username.slice(0, 9) + ".."
          : story.username}
      </span>
    </motion.button>
  );
}

export function StoryBar() {
  return (
    <div className="border-b border-border/50 px-4 py-4 flex gap-4 overflow-x-auto scrollbar-hide">
      <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }} className="flex flex-col items-center gap-1 min-w-[66px]">
        <div className="w-[56px] h-[56px] rounded-full border-2 border-dashed border-border flex items-center justify-center">
          <PlusSquare size={20} strokeWidth={1.5} />
        </div>
        <span className="text-[11px]">Your story</span>
      </motion.div>
      {stories.map((story) => (
        <StoryAvatar key={story.id} story={story} />
      ))}
    </div>
  );
}
