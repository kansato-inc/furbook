import { User, Post } from "./types";

export const users: User[] = [
  {
    id: "user-001",
    username: "fluffy_mcwhiskers",
    displayName: "Fluffy McWhiskers",
    bio: "Professional napper. Treats connoisseur. Zoomies champion.\nBased in Catifornia",
    avatarEmoji: "\u{1F431}",
    avatarBg: "#f0e6d3",
    postCount: 127,
    followerCount: "12.4K",
    followingCount: 342,
    joinedDate: "March 2025",
  },
  {
    id: "user-002",
    username: "golden_retriever_max",
    displayName: "Max the Golden",
    bio: "Good boy. Stick collector. Belly rub enthusiast.\nLiving my best park life",
    avatarEmoji: "\u{1F415}",
    avatarBg: "#d4e8d4",
    postCount: 89,
    followerCount: "8.7K",
    followingCount: 156,
    joinedDate: "January 2025",
  },
  {
    id: "user-003",
    username: "corgi_captain",
    displayName: "Captain Corgi",
    bio: "Sploot mode: activated. Do not disturb.\nOfficial sploot ambassador",
    avatarEmoji: "\u{1F436}",
    avatarBg: "#e8dcc4",
    postCount: 203,
    followerCount: "25.1K",
    followingCount: 89,
    joinedDate: "November 2024",
  },
  {
    id: "user-004",
    username: "siamese_sage",
    displayName: "Sage the Siamese",
    bio: "Judging your life choices from a very comfortable spot.\nOpinions are free",
    avatarEmoji: "\u{1F408}",
    avatarBg: "#dcdde1",
    postCount: 64,
    followerCount: "5.2K",
    followingCount: 512,
    joinedDate: "February 2025",
  },
  {
    id: "user-005",
    username: "bunny_hopps",
    displayName: "Judy Hopps",
    bio: "Freshly groomed and ready for my close-up.\nZPD academy grad (retired)",
    avatarEmoji: "\u{1F430}",
    avatarBg: "#e8dce0",
    postCount: 45,
    followerCount: "3.8K",
    followingCount: 234,
    joinedDate: "April 2025",
  },
  {
    id: "user-006",
    username: "fox_finnick",
    displayName: "Finnick",
    bio: "Small but mighty. Don't let the size fool you.\nHustlin' since day one",
    avatarEmoji: "\u{1F98A}",
    avatarBg: "#e8dcc4",
    postCount: 31,
    followerCount: "2.1K",
    followingCount: 78,
    joinedDate: "May 2025",
  },
  {
    id: "user-007",
    username: "hedgehog_henry",
    displayName: "Henry Hedgehog",
    bio: "Spiky on the outside, soft on the inside.\nRolling through life one garden at a time",
    avatarEmoji: "\u{1F994}",
    avatarBg: "#dde8f0",
    postCount: 18,
    followerCount: 945,
    followingCount: 145,
    joinedDate: "June 2025",
  },
  {
    id: "user-008",
    username: "panda_penelope",
    displayName: "Penelope Panda",
    bio: "Bamboo enthusiast. Nap Olympian.\nBlack, white, and cozy all over",
    avatarEmoji: "\u{1F43C}",
    avatarBg: "#e8e0dc",
    postCount: 92,
    followerCount: "18.3K",
    followingCount: 67,
    joinedDate: "December 2024",
  },
];

export const posts: Post[] = [
  {
    id: "post-001",
    authorId: "user-001",
    caption:
      "Morning zoomies hit different. The living room didn't stand a chance today.",
    imageEmoji: "\u{1F431}",
    imageBg: "#f0e6d3",
    likeCount: 1247,
    commentCount: 89,
    createdAt: "2h ago",
  },
  {
    id: "post-002",
    authorId: "user-002",
    caption:
      "Found the perfect stick at the park today. Life is complete. This is what happiness looks like.",
    imageEmoji: "\u{1F415}",
    imageBg: "#d4e8d4",
    likeCount: 3421,
    commentCount: 234,
    createdAt: "5h ago",
  },
  {
    id: "post-003",
    authorId: "user-003",
    caption:
      "Sploot mode activated. Do not disturb. This is not a drill. Full belly-to-ground contact achieved.",
    imageEmoji: "\u{1F436}",
    imageBg: "#e8dcc4",
    likeCount: 8932,
    commentCount: 567,
    createdAt: "8h ago",
  },
  {
    id: "post-004",
    authorId: "user-004",
    caption:
      "Judging your life choices from this very comfortable spot on the windowsill. I see everything.",
    imageEmoji: "\u{1F408}",
    imageBg: "#dcdde1",
    likeCount: 5621,
    commentCount: 312,
    createdAt: "12h ago",
  },
  {
    id: "post-005",
    authorId: "user-005",
    caption:
      "Freshly groomed and ready for my close-up! The salon did me right today. Feeling fluffy!",
    imageEmoji: "\u{1F430}",
    imageBg: "#e8dce0",
    likeCount: 2156,
    commentCount: 143,
    createdAt: "1d ago",
  },
  {
    id: "post-006",
    authorId: "user-006",
    caption:
      "Big dreams in a small package. Size doesn't determine hustle. Remember that.",
    imageEmoji: "\u{1F98A}",
    imageBg: "#f0e0d8",
    likeCount: 1876,
    commentCount: 98,
    createdAt: "1d ago",
  },
  {
    id: "post-007",
    authorId: "user-007",
    caption:
      "Found a snail in the garden. We had a moment. I think we're friends now. Very wholesome interaction.",
    imageEmoji: "\u{1F994}",
    imageBg: "#dde8f0",
    likeCount: 943,
    commentCount: 67,
    createdAt: "2d ago",
  },
  {
    id: "post-008",
    authorId: "user-008",
    caption:
      "Day 47 of perfecting the bamboo hold. This one's a keeper. Sending good vibes to everyone today.",
    imageEmoji: "\u{1F43C}",
    imageBg: "#e8e0dc",
    likeCount: 7654,
    commentCount: 421,
    createdAt: "2d ago",
  },
  {
    id: "post-009",
    authorId: "user-001",
    caption:
      "The red dot appeared again. I will find it. I always find it eventually. The hunt continues.",
    imageEmoji: "\u{1F431}",
    imageBg: "#f0e6d3",
    likeCount: 3421,
    commentCount: 256,
    createdAt: "3d ago",
  },
  {
    id: "post-010",
    authorId: "user-003",
    caption:
      "When you hear the treat bag rustle from three rooms away. Ears: activated. Speed: maximum.",
    imageEmoji: "\u{1F436}",
    imageBg: "#e8dcc4",
    likeCount: 11209,
    commentCount: 734,
    createdAt: "3d ago",
  },
  {
    id: "post-011",
    authorId: "user-002",
    caption:
      "Rainy day cuddles hit different. Who needs sticks when you have a warm couch and good humans?",
    imageEmoji: "\u{1F415}",
    imageBg: "#d4e8d4",
    likeCount: 4532,
    commentCount: 289,
    createdAt: "4d ago",
  },
  {
    id: "post-012",
    authorId: "user-005",
    caption:
      "Tried a new carrot recipe today. 10/10 would recommend. The crunch factor was impeccable.",
    imageEmoji: "\u{1F430}",
    imageBg: "#e8dce0",
    likeCount: 1654,
    commentCount: 112,
    createdAt: "5d ago",
  },
  {
    id: "post-013",
    authorId: "user-008",
    caption:
      "Nap championship: round 47. Current streak: undefeated. Training hard every single day for this.",
    imageEmoji: "\u{1F43C}",
    imageBg: "#e8e0dc",
    likeCount: 8901,
    commentCount: 502,
    createdAt: "5d ago",
  },
  {
    id: "post-014",
    authorId: "user-004",
    caption:
      "The human left the keyboard unattended. I sat on it immediately. Consequences were acceptable.",
    imageEmoji: "\u{1F408}",
    imageBg: "#dcdde1",
    likeCount: 6234,
    commentCount: 445,
    createdAt: "6d ago",
  },
];

export function getUserById(id: string): User | undefined {
  return users.find((u) => u.id === id);
}

export function getUserByUsername(username: string): User | undefined {
  return users.find((u) => u.username === username);
}

export function getPostsByAuthor(authorId: string): Post[] {
  return posts.filter((p) => p.authorId === authorId);
}
