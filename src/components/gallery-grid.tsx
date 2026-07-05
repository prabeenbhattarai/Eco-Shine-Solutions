"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export type Shot = { src: string; alt: string; span?: string };

export function GalleryGrid({
  shots,
  rowHeight = "auto-rows-[180px] sm:auto-rows-[200px]",
}: {
  shots: Shot[];
  rowHeight?: string;
}) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => (i === null ? i : (i + 1) % shots.length));
      if (e.key === "ArrowLeft")
        setActive((i) => (i === null ? i : (i - 1 + shots.length) % shots.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, shots.length]);

  return (
    <>
      <div className={`grid grid-cols-2 gap-4 sm:grid-cols-4 ${rowHeight}`}>
        {shots.map((shot, i) => (
          <button
            key={`${shot.src}-${i}`}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`View larger image: ${shot.alt}`}
            className={`group relative overflow-hidden rounded-card border border-border text-left ${shot.span ?? ""}`}
          >
            <Image
              src={shot.src}
              alt={shot.alt}
              fill
              sizes="(min-width: 640px) 25vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <button
            type="button"
            aria-label="Close preview"
            onClick={() => setActive(null)}
            className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              setActive((i) => (i === null ? i : (i - 1 + shots.length) % shots.length));
            }}
            className="absolute left-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:flex"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div className="relative aspect-[4/3] w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={shots[active].src}
              alt={shots[active].alt}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>

          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              setActive((i) => (i === null ? i : (i + 1) % shots.length));
            }}
            className="absolute right-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:flex"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </>
  );
}
