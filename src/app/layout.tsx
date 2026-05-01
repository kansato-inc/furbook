import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { WhistleProviderShell } from "@/components/whistle-provider";
import "@kansato/whistle-react/styles/input.css";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "furbook - Whistle SDK Demo",
  description:
    "A barebones social media demo showcasing the Kansato Whistle React SDK",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} font-sans antialiased`}>
        <WhistleProviderShell>
          <div className="mx-auto max-w-lg min-h-screen border-x border-border">
            <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-border">
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-lg font-bold tracking-tight">
                  fur<span className="text-[var(--fb-accent)]">book</span>
                </span>
                <nav className="flex gap-4 text-sm font-medium text-[var(--fb-muted-fg)]">
                  <a href="/feed" className="hover:text-[var(--fb-fg)] transition-colors">
                    Feed
                  </a>
                  <a href="/users" className="hover:text-[var(--fb-fg)] transition-colors">
                    Users
                  </a>
                </nav>
              </div>
            </header>
            <main>{children}</main>
          </div>
          <nav className="fixed bottom-0 left-0 right-0 z-10 bg-white/90 backdrop-blur-md border-t border-border lg:hidden">
            <div className="flex justify-around py-2">
              <a
                href="/feed"
                className="flex flex-col items-center gap-0.5 text-xs text-[var(--fb-muted-fg)] hover:text-[var(--fb-fg)]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                Feed
              </a>
              <a
                href="/users"
                className="flex flex-col items-center gap-0.5 text-xs text-[var(--fb-muted-fg)] hover:text-[var(--fb-fg)]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                Users
              </a>
            </div>
          </nav>
        </WhistleProviderShell>
      </body>
    </html>
  );
}
