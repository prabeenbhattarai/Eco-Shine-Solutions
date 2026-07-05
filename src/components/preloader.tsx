"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Branded "shine sweep" preloader.
 *
 * - On first load it holds briefly (so the animation reads) then wipes away.
 * - On client-side route changes it flashes a short version so every page gets
 *   the branded transition.
 *
 * It is a pure-CSS overlay layered on top of the already-rendered page, so it
 * never blocks hydration, delays content, or hides markup from crawlers.
 */
export function Preloader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const firstRun = useRef(true);

  // Initial page load: hold briefly so the animation reads, then wipe away.
  // Content is already rendered behind the overlay, so this is a pure intro and
  // never gates on resource loading (which can hang or over-delay).
  useEffect(() => {
    const HOLD_MS = 900;
    let doneTimer: ReturnType<typeof setTimeout>;
    const leaveTimer = setTimeout(() => {
      setLeaving(true);
      doneTimer = setTimeout(() => {
        setVisible(false);
        setLeaving(false);
      }, 600);
    }, HOLD_MS);

    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  // Short, snappy branded flash on each subsequent route change.
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    setVisible(true);
    setLeaving(false);
    const leaveTimer = setTimeout(() => setLeaving(true), 220);
    const doneTimer = setTimeout(() => {
      setVisible(false);
      setLeaving(false);
    }, 220 + 500);
    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(doneTimer);
    };
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      className={`preloader ${leaving ? "preloader--leaving" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="preloader__bg" />
      <div className="preloader__content">
        <div className="preloader__badge">
          <span className="preloader__ring" />
          <span className="preloader__spark preloader__spark--1" />
          <span className="preloader__spark preloader__spark--2" />
          <span className="preloader__mark">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/ecoshine-logo-mark.png" alt="" />
            <span className="preloader__glint" />
          </span>
        </div>
        <div className="preloader__word">
          <b>ECOSHINE</b>
          <i>SOLUTION</i>
        </div>
      </div>
    </div>
  );
}
