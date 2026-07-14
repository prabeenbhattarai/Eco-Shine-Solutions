"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { QuoteButton } from "@/components/quote/quote-button";
import type { HomepageContent } from "@/lib/content";

/**
 * "Satisfaction Guaranteed" promo band with a portrait that overflows the band
 * and a scroll-driven parallax: the portrait and badge drift at a different
 * rate than the page as the section passes through the viewport.
 */
export function SatisfactionBand({ content }: { content: HomepageContent["satisfaction"] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const portrait = portraitRef.current;
    const badge = badgeRef.current;
    if (!section || !portrait) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 as the section enters the bottom of the viewport, 1 as it leaves the top.
      const progress = (vh - rect.top) / (vh + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));
      const shift = (0.5 - clamped) * 90; // approx -45px..+45px
      portrait.style.transform = `translate3d(0, ${shift}px, 0)`;
      if (badge) badge.style.transform = `translate3d(0, ${-shift * 0.5}px, 0)`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:pb-24 md:pt-32">
      <div className="container-page">
        <div className="relative rounded-3xl bg-gradient-eco px-6 py-12 shadow-xl shadow-teal-500/20 sm:px-12 sm:py-14">
          {/* subtle sheen */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.18),transparent_45%)]" />

          <div className="relative grid items-center gap-8 md:grid-cols-[1.5fr_1fr]">
            <div className="max-w-xl text-white">
              <h2 className="text-3xl font-bold sm:text-4xl lg:text-[2.75rem]">
                {content.title}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/90 sm:text-lg">
                {content.text}
              </p>
              <QuoteButton
                size="lg"
                variant="secondary"
                className="mt-8 border-0 bg-white text-teal-700 hover:bg-white/90"
              >
                Get a Free Quote
              </QuoteButton>
            </div>
            {/* reserves right-hand space for the cut-out on desktop */}
            <div className="hidden md:block" aria-hidden="true" />
          </div>

          {/* Cut-out person popping out of the card + parallax */}
          <div
            ref={portraitRef}
            className="pointer-events-none absolute bottom-0 right-2 hidden h-[128%] will-change-transform md:block lg:right-10"
          >
            <Image
              src="/images/satisfaction-person.png"
              alt="Confident Ecoshine Solution team member in a branded polo"
              width={573}
              height={1100}
              className="h-full w-auto object-contain drop-shadow-2xl"
            />
          </div>

          {/* Guarantee badge with counter-parallax */}
          <div
            ref={badgeRef}
            className="absolute bottom-10 right-[34%] hidden items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-xl will-change-transform md:flex lg:right-[38%]"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-eco text-white">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <span className="leading-tight">
              <span className="block text-lg font-bold text-teal-700">100%</span>
              <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Guarantee
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
