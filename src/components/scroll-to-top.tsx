"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/** Floating "back to top" button. Fades in after the visitor scrolls down and
    smooth-scrolls to the top on click. Sits bottom-right, above the mobile CTA
    bar (matching where the old WhatsApp float used to be). */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-20 right-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg shadow-brand-600/30 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 lg:bottom-6 lg:h-14 lg:w-14 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ArrowUp className="h-5 w-5 lg:h-6 lg:w-6" />
    </button>
  );
}
