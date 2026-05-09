import type { Metadata } from "next";
import Link from "next/link";
import { users } from "@/data/mock";

export const metadata: Metadata = {
  title: "Users - furbook",
  description: "Browse all users on furbook",
};

export default function UsersPage() {
  return (
    <div>
      <header className="border-b border-[var(--fb-border)] p-4">
        <h1 className="text-xl font-semibold">Users</h1>
      </header>
      {users.map((user) => (
        <Link
          key={user.id}
          href={`/users/${user.username}`}
          className="flex items-center gap-3 px-4 py-3 border-b border-zinc-100 hover:bg-zinc-50 transition-colors"
        >
          <span
            className="size-10 rounded-full flex items-center justify-center text-lg shrink-0"
            style={{ backgroundColor: user.avatarBg }}
          >
            {user.avatarEmoji}
          </span>
          <div>
            <p className="font-semibold text-sm">{user.displayName}</p>
            <p className="text-zinc-500 text-xs">
              @{user.username} &middot; {user.followerCount} followers
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
