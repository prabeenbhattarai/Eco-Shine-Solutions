"use client";

import { Phone, ClipboardList } from "lucide-react";
import { site } from "@/lib/site";
import { useQuote } from "@/components/quote/quote-context";

/** Fixed bottom action bar shown on mobile only: always-visible Call + Quote. */
export function MobileCtaBar() {
  const { open } = useQuote();
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-border bg-background/95 backdrop-blur-md lg:hidden">
      <a
        href={site.phoneHref}
        className="flex h-14 cursor-pointer items-center justify-center gap-2 text-sm font-semibold text-foreground"
      >
        <Phone className="h-5 w-5 text-brand-600" />
        Call Now
      </a>
      <button
        type="button"
        onClick={open}
        className="flex h-14 cursor-pointer items-center justify-center gap-2 bg-gradient-brand text-sm font-semibold text-white"
      >
        <ClipboardList className="h-5 w-5" />
        Get Quote
      </button>
    </div>
  );
}
