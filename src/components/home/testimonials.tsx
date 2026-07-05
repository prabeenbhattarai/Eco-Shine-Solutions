"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/lib/site";
import { SectionHeading } from "@/components/section-heading";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const count = testimonials.length;

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count]
  );

  // Autoplay every 4s, pause on hover/focus.
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), 4000);
    return () => clearInterval(t);
  }, [paused, go]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") go(-1);
    if (e.key === "ArrowRight") go(1);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) go(delta < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  return (
    <section className="py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="Testimonials"
          title="Trusted right across Australia"
          description="Real feedback from the businesses and families we clean for every week."
        />

        <div className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-muted">
          <span className="flex items-center gap-0.5 text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </span>
          <span>
            <strong className="font-bold text-foreground">4.9 out of 5</strong> from 300+ reviews
          </span>
        </div>

        <div
          className="relative mx-auto mt-10 max-w-4xl"
          role="region"
          aria-roledescription="carousel"
          aria-label="Customer testimonials"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="overflow-hidden rounded-card">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {testimonials.map((t) => (
                <figure key={t.name} className="w-full shrink-0 px-1 sm:px-2">
                  <div className="relative overflow-hidden rounded-card border border-border bg-gradient-to-br from-card to-surface p-8 shadow-sm sm:p-10">
                    <Quote className="absolute right-6 top-6 h-24 w-24 text-brand-600/[0.06] dark:text-brand-300/10" />

                    <div className="relative flex items-center gap-4">
                      <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-lg font-bold text-white">
                        {initials(t.name)}
                      </span>
                      <div>
                        <p className="font-bold text-foreground">{t.name}</p>
                        <p className="text-sm text-muted">{t.role}</p>
                      </div>
                    </div>

                    <div className="relative mt-5 flex items-center gap-0.5 text-amber-500">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>

                    <blockquote className="relative mt-4 text-lg leading-relaxed text-foreground">
                      &quot;{t.text}&quot;
                    </blockquote>

                    <span className="relative mt-6 inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-600/15 dark:text-brand-300">
                      {t.service}
                    </span>
                  </div>
                </figure>
              ))}
            </div>
          </div>

          {/* Arrows */}
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => go(-1)}
            className="absolute -left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md hover:bg-surface-2 sm:flex lg:-left-5"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => go(1)}
            className="absolute -right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md hover:bg-surface-2 sm:flex lg:-right-5"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                type="button"
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === index ? "w-7 bg-brand-600" : "w-2.5 bg-border hover:bg-brand-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
