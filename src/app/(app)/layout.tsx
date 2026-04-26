"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { FurbookWhistleProvider } from "@/components/whistle-provider";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FurbookWhistleProvider>
      <div className="flex min-h-screen justify-center">
        <div className="lg:hidden fixed top-3 right-3 z-[60]">
          <ThemeToggle />
        </div>
        <Sidebar />
        <main className="max-w-2xl w-full border-x border-border/50 bg-background lg:px-0 px-0 pb-16 lg:pb-0">
          {children}
        </main>
        <MobileNav />
      </div>
    </FurbookWhistleProvider>
  );
}
