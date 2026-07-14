"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { iconRegistry, DEFAULT_ICON_KEY } from "@/lib/icons";
import type { PlainService, SectionHeadingContent } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { BrandSpinner } from "@/components/brand-spinner";

const INITIAL = 4;

function ServiceCard({
  service,
  revealed = false,
  index = 0,
}: {
  service: PlainService;
  revealed?: boolean;
  index?: number;
}) {
  const Icon = iconRegistry[service.icon] ?? iconRegistry[DEFAULT_ICON_KEY];
  return (
    <Link
      href={service.href}
      style={revealed ? { animationDelay: `${index * 80}ms` } : undefined}
      className={`group flex flex-col overflow-hidden rounded-card border border-border bg-card transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg dark:hover:border-brand-400/40 ${
        revealed ? "animate-fade-rise" : ""
      }`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-sm">
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-foreground">{service.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{service.blurb}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-300">
          Learn More
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

export function ServicesGrid({
  services,
  heading,
}: {
  services: PlainService[];
  heading: SectionHeadingContent;
}) {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  const first = services.slice(0, INITIAL);
  const rest = services.slice(INITIAL);
  const remaining = rest.length;

  const loadMore = () => {
    setLoading(true);
    // Simulated async reveal so the loading state is visible.
    setTimeout(() => {
      setExpanded(true);
      setLoading(false);
    }, 900);
  };

  return (
    <section className="bg-surface py-20" id="services">
      <div className="container-page">
        <SectionHeading
          eyebrow={heading.eyebrow}
          title={heading.title}
          description={heading.description}
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {first.map((s) => (
            <ServiceCard key={s.href} service={s} />
          ))}
          {expanded &&
            rest.map((s, i) => (
              <ServiceCard key={s.href} service={s} revealed index={i} />
            ))}
        </div>

        {!expanded && remaining > 0 && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={loadMore}
              disabled={loading}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-btn border border-border bg-card px-7 text-sm font-semibold text-foreground transition-all hover:border-brand-300 hover:bg-surface-2 active:scale-[0.97] disabled:opacity-70"
            >
              {loading ? (
                <>
                  <BrandSpinner size={18} className="text-brand-600" />
                  Loading services
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 text-brand-600" />
                  Load {remaining} more services
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
