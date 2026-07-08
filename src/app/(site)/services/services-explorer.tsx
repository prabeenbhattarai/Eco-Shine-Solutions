"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  services as staticServices,
  serviceCategories,
  type ServiceCategory,
} from "@/lib/site";
import type { PlainService } from "@/lib/content";

const iconBySlug = Object.fromEntries(staticServices.map((s) => [s.slug, s.icon]));

const TABS = ["All", ...serviceCategories] as const;

export function ServicesExplorer({ services }: { services: PlainService[] }) {
  const [active, setActive] = useState<(typeof TABS)[number]>("All");

  const filtered =
    active === "All"
      ? services
      : services.filter((s) => s.category === (active as ServiceCategory));

  return (
    <section className="container-page py-16">
      <div className="flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActive(tab)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
              active === tab
                ? "border-brand-600 bg-brand-600 text-white"
                : "border-border bg-card text-foreground hover:border-brand-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => {
          const Icon = iconBySlug[s.slug];
          return (
            <Link
              key={s.href}
              href={s.href}
              className="group overflow-hidden rounded-card bg-brand-800 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:bg-brand-900"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={s.image}
                  alt={s.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/95 via-brand-900/20 to-transparent" />
                <span className="absolute left-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 text-white backdrop-blur-sm">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="absolute inset-x-4 bottom-4 text-lg font-bold leading-snug text-white">
                  {s.title}
                </h2>
              </div>
              <div className="p-4">
                <p className="text-sm leading-relaxed text-white/75">{s.blurb}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
