"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { nav, services, sectors, overviewLinks, exploreLinks, site } from "@/lib/site";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { QuoteButton } from "@/components/quote/quote-button";
import type { LucideIcon } from "lucide-react";

const childIconByLabel: Record<string, LucideIcon> = Object.fromEntries([
  ...overviewLinks.map((l) => [l.label, l.icon]),
  ...services.map((s) => [s.short, s.icon]),
  ...sectors.map((s) => [s.name, s.icon]),
  ...exploreLinks.map((l) => [l.label, l.icon]),
]);

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openLabel, setOpenLabel] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change and lock body scroll while open.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all ${
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-background"
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between gap-4 lg:h-20">
        <Logo />

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((item) =>
            item.children ? (
              <li key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className={`inline-flex items-center gap-1 rounded-btn px-3 py-2 text-sm font-medium transition-colors hover:text-brand-600 dark:hover:text-brand-300 ${
                    isActive(item.href) ? "text-brand-600 dark:text-brand-300" : "text-foreground"
                  }`}
                >
                  {item.label}
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </Link>
                <div className="invisible absolute left-1/2 top-full w-[42rem] max-w-[calc(100vw-2rem)] -translate-x-1/2 pt-5 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                  <div className="rounded-card border border-border bg-card p-3 shadow-lg shadow-black/5">
                    <p className="px-1.5 pb-2 text-xs font-bold uppercase tracking-wide text-muted">
                      {item.label}
                    </p>
                    <div className="grid grid-cols-2 gap-1">
                      {item.children.slice(0, 7).map((child) => {
                        const ChildIcon = childIconByLabel[child.label];
                        return (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-surface-2"
                          >
                            {ChildIcon && (
                              <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-600/15 dark:text-brand-300">
                                <ChildIcon className="h-5 w-5" />
                              </span>
                            )}
                            <span className="min-w-0">
                              <span className="block text-sm font-semibold text-foreground">
                                {child.label}
                              </span>
                              {child.description && (
                                <span className="mt-0.5 block text-xs leading-snug text-muted">
                                  {child.description}
                                </span>
                              )}
                            </span>
                          </Link>
                        );
                      })}
                      {item.children.length > 7 && (
                        <Link
                          href={item.href}
                          className="flex items-center justify-center gap-1.5 rounded-lg p-2.5 text-sm font-semibold text-brand-600 transition-colors hover:bg-surface-2 dark:text-brand-300"
                        >
                          View all {item.href.replace("/", "")}
                          <ChevronDown className="h-4 w-4 -rotate-90" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ) : (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`rounded-btn px-3 py-2 text-sm font-medium transition-colors hover:text-brand-600 dark:hover:text-brand-300 ${
                    isActive(item.href) ? "text-brand-600 dark:text-brand-300" : "text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <QuoteButton size="sm">Get a Free Quote</QuoteButton>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-btn border border-border bg-card text-foreground"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile slide-in menu */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <aside
          className={`absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-background shadow-2xl transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-16 items-center justify-between border-b border-border px-5">
            <Logo />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-btn border border-border bg-card text-foreground"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4">
            <ul className="flex flex-col gap-1">
              {nav.map((item) =>
                item.children ? (
                  <li key={item.label}>
                    <button
                      type="button"
                      onClick={() =>
                        setOpenLabel((v) => (v === item.label ? null : item.label))
                      }
                      className="flex w-full cursor-pointer items-center justify-between rounded-btn px-3 py-3 text-base font-medium text-foreground"
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${
                          openLabel === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openLabel === item.label && (
                      <ul className="ml-3 flex flex-col gap-0.5 border-l border-border pl-3">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link
                              href={child.href}
                              className="block rounded-btn px-3 py-2.5 text-sm text-muted transition-colors hover:text-brand-600"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ) : (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={`block rounded-btn px-3 py-3 text-base font-medium transition-colors hover:text-brand-600 ${
                        isActive(item.href)
                          ? "text-brand-600 dark:text-brand-300"
                          : "text-foreground"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="border-t border-border p-4">
            <QuoteButton
              size="lg"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              Get a Free Quote
            </QuoteButton>
            <a
              href={site.phoneHref}
              className="mt-3 flex items-center justify-center gap-2 text-sm font-medium text-muted"
            >
              <Phone className="h-4 w-4" />
              {site.phone}
            </a>
          </div>
        </aside>
      </div>
    </header>
  );
}
