import { getUserByUsername, getPostsByAuthor } from "@/data/mock";
import { userToSubject } from "@/data/types";
import { ReportUserButton } from "@/components/report-user-button";
import { PostCard } from "@/components/feed/post-card";
import { notFound } from "next/navigation";

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const user = getUserByUsername(username);
  if (!user) notFound();

  const userPosts = getPostsByAuthor(user.id);

  return (
    <div>
      <div className="px-4 py-6">
        <div className="flex items-center gap-4">
          <span
            className="w-20 h-20 rounded-full flex items-center justify-center text-4xl shrink-0"
            style={{ backgroundColor: user.avatarBg }}
          >
            {user.avatarEmoji}
          </span>
          <div>
            <h1 className="text-xl font-bold">{user.displayName}</h1>
            <p className="text-gray-500">@{user.username}</p>
            <p className="text-sm mt-2 whitespace-pre-line">{user.bio}</p>
            <div className="flex gap-4 mt-3 text-sm">
              <span>
                <strong>{user.postCount}</strong> posts
              </span>
              <span>
                <strong>{user.followerCount}</strong> followers
              </span>
              <span>
                <strong>{user.followingCount}</strong> following
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-[var(--fb-border)]">
          <ReportUserButton user={userToSubject(user)} />
        </div>
      </div>

      <div>
        {userPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
