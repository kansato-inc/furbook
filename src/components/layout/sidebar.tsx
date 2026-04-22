"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, LogIn, LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const navItems = [
  { href: "/feed", icon: Home, label: "Home" },
  { href: "/explore", icon: Compass, label: "Explore" },
] as const;

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = authClient.useSession();

  async function handleSignOut() {
    await authClient.signOut();
    router.push("/sign-in");
    router.refresh();
  }

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-full w-[244px] flex-col border-r border-border/50 bg-white px-4 py-8 z-40">
      <Link href="/feed" className="px-3 mb-8">
        <h1 className="font-serif text-2xl tracking-tight">furbook</h1>
      </Link>

      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href || (href !== "/feed" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-4 px-3 py-3 rounded-lg text-sm font-semibold transition-all hover:bg-muted ${
                isActive ? "font-bold" : ""
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {session ? (
        <button
          onClick={handleSignOut}
          className="flex items-center gap-4 px-3 py-3 rounded-lg text-sm font-semibold transition-colors hover:bg-muted mt-auto"
        >
          <LogOut size={22} strokeWidth={2} />
          <span>Log out</span>
        </button>
      ) : (
        <Link
          href="/sign-in"
          className="flex items-center gap-4 px-3 py-3 rounded-lg text-sm font-semibold transition-colors hover:bg-muted mt-auto"
        >
          <LogIn size={22} strokeWidth={2} />
          <span>Log in</span>
        </Link>
      )}
    </aside>
  );
}
