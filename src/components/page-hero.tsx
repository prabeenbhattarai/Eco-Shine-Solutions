import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function PageHero({
  title,
  subtitle,
  breadcrumb,
}: {
  title: string;
  subtitle?: string;
  breadcrumb?: { label: string; href?: string }[];
}) {
  return (
    <section className="relative overflow-hidden bg-brand-600">
      <div className="absolute -top-24 -right-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-black/10 blur-3xl" />

      <div className="container-page relative pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
        {breadcrumb && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/70">
              {breadcrumb.map((c, i) => (
                <li key={c.label} className="flex items-center gap-1.5">
                  {c.href ? (
                    <Link href={c.href} className="transition-colors hover:text-white">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-white">{c.label}</span>
                  )}
                  {i < breadcrumb.length - 1 && <ChevronRight className="h-4 w-4" />}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1 className="max-w-3xl text-4xl font-bold text-white sm:text-5xl">{title}</h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/85">{subtitle}</p>
        )}
      </div>

      {/* Curved bottom edge, blending into the page background below */}
      <svg
        className="absolute inset-x-0 bottom-0 h-8 w-full text-background sm:h-12"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0,60 C360,0 1080,0 1440,60 Z" fill="currentColor" />
      </svg>
    </section>
  );
}
