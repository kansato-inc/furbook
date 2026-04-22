"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, User, PlusSquare } from "lucide-react";

const navItems = [
  { href: "/feed", icon: Home },
  { href: "/explore", icon: Compass },
  { href: "#new-post", icon: PlusSquare },
  { href: "/profile/me", icon: User },
] as const;

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border/50 px-6 py-3 safe-area-inset-bottom">
      <div className="flex items-center justify-around max-w-[500px] mx-auto">
        {navItems.map(({ href, icon: Icon }) => {
          const isActive =
            href === "/feed"
              ? pathname === "/feed" || pathname === "/"
              : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`p-2 rounded-lg transition-colors ${isActive ? "" : "opacity-60"}`}
            >
              <Icon
                size={24}
                strokeWidth={isActive ? 2.5 : 2}
                fill={isActive ? "currentColor" : "none"}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
