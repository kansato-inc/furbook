"use client";

import Link from "next/link";
import {
  ReportDialog,
  useSecureReportSubmission,
} from "@kansato/whistle-react";
import type { Post } from "@/data/types";
import { getUserById } from "@/data/mock";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const author = getUserById(post.authorId)!;

  const { submit } = useSecureReportSubmission({
    onSuccess: (response) =>
      console.log("Report submitted:", response.report.id),
    onError: (err) => console.error("Report failed:", err),
  });

  return (
    <article className="border-b border-[var(--fb-border)]">
      <Link
        href={`/users/${author.username}`}
        className="flex items-center gap-3 px-4 py-3"
      >
        <span
          className="w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0"
          style={{ backgroundColor: author.avatarBg }}
        >
          {author.avatarEmoji}
        </span>
        <div>
          <span className="font-semibold text-sm">{author.displayName}</span>
          <span className="text-gray-500 text-xs ml-2">
            @{author.username}
          </span>
        </div>
      </Link>

      <div
        className="aspect-square w-full flex items-center justify-center text-7xl"
        style={{ backgroundColor: post.imageBg }}
      >
        {post.imageEmoji}
      </div>

      <div className="px-4 py-3">
        <p className="font-semibold text-sm">
          {post.likeCount.toLocaleString()} likes
        </p>
        <p className="text-sm mt-1">
          <Link
            href={`/users/${author.username}`}
            className="font-semibold hover:underline"
          >
            {author.displayName}
          </Link>{" "}
          {post.caption}
        </p>
        <p className="text-gray-400 text-xs mt-2 uppercase tracking-wide">
          {post.createdAt}
        </p>

        <ReportDialog
          subject={{
            type: "user",
            externalId: author.id,
            display: {
              name: author.displayName,
              username: author.username,
            },
          }}
          target={{
            contentType: "post",
            contentExternalId: post.id,
          }}
          trigger={
            <button
              type="button"
              className="text-xs text-gray-400 hover:text-red-500 mt-1 uppercase tracking-wide transition-colors cursor-pointer"
            >
              Report post
            </button>
          }
          onSubmit={async (data, helpers) => {
            try {
              const result = await submit({
                subject: data.subject,
                target: data.target,
                reason: data.reason,
                description: data.description,
              });
              helpers.resolve({
                id: result.report.id,
                projectId: result.report.projectId,
                status: result.report.status,
                createdAt: result.report.createdAt,
              });
            } catch (err) {
              helpers.reject(err);
            }
          }}
        />
      </div>
    </article>
  );
}
