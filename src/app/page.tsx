import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "furbook - Whistle SDK Demo",
  description: "A barebones social media demo showcasing the Kansato Whistle React SDK",
};

export default function HomePage() {
  redirect("/feed");
}
