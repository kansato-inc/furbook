import type { IngestSubject } from "@kansato/whistle-sdk";

export interface User {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  avatarEmoji: string;
  avatarBg: string;
  postCount: number;
  followerCount: number | string;
  followingCount: number;
  joinedDate: string;
}

export interface Post {
  id: string;
  authorId: string;
  caption: string;
  imageEmoji: string;
  imageBg: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
}

export function userToSubject(user: User): IngestSubject {
  return {
    type: "user",
    externalId: user.id,
    display: {
      name: user.displayName,
      username: user.username,
    },
  };
}
