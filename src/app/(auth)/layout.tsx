"use client";

import { ThemeToggle } from "@/components/theme-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-dvh flex items-center justify-center bg-background p-4">
      <div className="absolute top-3 right-3 z-10">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-[350px] animate-fade-in">{children}</div>
    </div>
  );
}
