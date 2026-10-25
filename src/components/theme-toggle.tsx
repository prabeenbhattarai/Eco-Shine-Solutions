"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle({
  className = "",
  light = false,
}: {
  className?: string;
  /** Transparent white style for use over a dark hero. */
  light?: boolean;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Mount guard avoids a hydration mismatch between server and resolved theme.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-btn border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
        light
          ? "border-white/25 bg-white/10 text-white hover:bg-white/20"
          : "border-border bg-card text-foreground hover:bg-surface-2"
      } ${className}`}
    >
      {mounted ? (
        isDark ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )
      ) : (
        <span className="h-5 w-5" />
      )}
    </button>
  );
}
