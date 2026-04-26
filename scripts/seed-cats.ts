import { readdirSync } from "fs";
import { randomUUID } from "crypto";
import { db } from "../src/lib/db";
import { posts, user } from "../src/db/schema";
import { eq } from "drizzle-orm";

async function seedCats() {
  const imageFiles = readdirSync("public/images/cats")
    .filter((f) => f.endsWith(".jpg") || f.endsWith(".png"))
    .sort();

  // Get the first user ID as author
  const users = await db.select({ id: user.id }).from(user).limit(1);

  if (users.length === 0) {
    console.error("No users found in database. Please create a user first.");
    process.exit(1);
  }

  const authorId = users[0].id;

  console.log(`Seeding ${imageFiles.length} cat posts for user: ${authorId}`);

  const catCaptions = [
    "Meow?",
    "Purrfect day",
    "Cat life",
    "Feline good",
    "Paws and reflect",
    "Just cat things",
    "Meow is the time",
    "Cattitude",
    "Pawsitively adorable",
    "Feline fine",
    "Cat nap time",
    "Pawsitively adorable",
    "Meow or never",
    "Feline groovy",
    "Cat's got your tongue",
    "Purrsonality",
    "Meow means business",
    "Feline blessed",
    "Cat-tastic",
    "Purrfect moment",
    "Meowtacular",
    "Feline happy",
    "Cat vibes",
    "Purrfectly happy",
    "Meow season",
    "Feline lucky",
    "Cat magic",
    "Purrception",
    "Meow and forever",
    "Feline love",
    "Cat wisdom",
    "Purrfect match",
    "Meow power",
    "Feline grace",
    "Cat charm",
    "Purrfect view",
    "Meow moments",
    "Feline cozy",
    "Cat energy",
    "Purrfectly cute",
    "Meow amazing",
    "Feline inspired",
    "Cat wonder",
    "Purrfect bliss",
    "Meow delight",
    "Feline joy",
    "Cat serenity",
    "Purrfect peace",
    "Meow zen",
    "Feline calm",
    "Cat paradise",
  ];

  for (const [index, filename] of imageFiles.entries()) {
    const postId = randomUUID();
    const imageUrl = `/images/cats/${filename}`;
    const caption = catCaptions[index % catCaptions.length];

    await db.insert(posts).values({
      id: postId,
      authorId: authorId,
      imageUrl: imageUrl,
      caption: caption,
      likesCount: 0,
      commentsCount: 0,
    });

    console.log(`Created post ${index + 1}/${imageFiles.length}: ${filename}`);
  }

  console.log("\nSeeding complete!");
  process.exit(0);
}

seedCats().catch((err) => {
  console.error(err);
  process.exit(1);
});
