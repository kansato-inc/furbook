"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type ThemeToggleProps = {
  className?: string;
};

/**
 * Toggles light vs AMOLED dark. Icon matches "switch to" target (moon = go dark).
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={[
        "inline-flex h-9 w-9 items-center justify-center rounded-lg text-foreground",
        "transition-colors hover:bg-muted",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        className ?? "",
      ].join(" ")}
      aria-label="Toggle color theme"
      aria-pressed={mounted ? isDark : undefined}
    >
      {mounted ? (
        isDark ? (
          <Sun size={20} strokeWidth={2} className="text-amber-200/90" />
        ) : (
          <Moon size={20} strokeWidth={2} className="text-foreground/80" />
        )
      ) : (
        <span className="h-5 w-5" aria-hidden />
      )}
    </button>
  );
}
