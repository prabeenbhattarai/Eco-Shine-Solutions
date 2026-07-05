"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* Real client logos. Drop files into public/images/logos/ using these exact
   names and they'll pick up automatically. */
const TRUSTED_LOGOS: { name: string; src: string }[] = [
  { name: "OnePlayground", src: "/images/logos/oneplayground.png" },
  { name: "M Collective", src: "/images/logos/m-logo.png" },
  { name: "Jetstar", src: "/images/logos/jetstar.png" },
];

// Repeat the base set so the strip has enough tiles to feel full, then
// duplicate that once more so the marquee can loop seamlessly at -50%.
const BASE = [...TRUSTED_LOGOS, ...TRUSTED_LOGOS, ...TRUSTED_LOGOS];
const TRACK = [...BASE, ...BASE];

export function TrustedBy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    // Ticker only mounts (and its logo images only start fetching) once the
    // section is about to scroll into view - nothing loads on initial paint.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -80px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="container-page pt-10">
      <p className="text-center text-sm font-medium text-muted">
        Trusted by leading companies
      </p>

      <div
        className="group relative mt-6 h-20 overflow-hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div
          className={`reveal ${inView ? "is-visible" : ""} flex w-max animate-marquee items-center gap-6 group-hover:[animation-play-state:paused]`}
        >
          {inView &&
            TRACK.map((logo, i) => (
              <div
                key={`${logo.name}-${i}`}
                className="flex h-20 shrink-0 items-center justify-center rounded-xl bg-white px-7"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={220}
                  height={96}
                  loading="lazy"
                  className="h-12 w-auto max-w-[180px] object-contain"
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
