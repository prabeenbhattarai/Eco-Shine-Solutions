import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Brand logo: the official blue "E" mark (transparent PNG) paired with the
 * wordmark rendered as live text so it adapts to light and dark themes.
 */
export function Logo({
  className = "",
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} home`}
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <Image
        src="/images/ecoshine-logo-mark.png"
        alt="Ecoshine Solution logo"
        width={501}
        height={391}
        priority
        className="h-9 w-auto transition-transform group-hover:scale-105"
      />
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-lg font-bold uppercase tracking-tight text-foreground">
            Ecoshine
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
            Solution
          </span>
        </span>
      )}
    </Link>
  );
}
