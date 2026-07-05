import Image from "next/image";
import { Quote } from "lucide-react";
import { founders } from "@/lib/site";
import { SectionHeading } from "@/components/section-heading";

function LinkedInIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.74C24 .78 23.2 0 22.22 0Z" />
    </svg>
  );
}

export function Founders() {
  return (
    <section id="founders" className="scroll-mt-24 py-20">
      <div className="container-page">
        <SectionHeading eyebrow="Leadership" title="A Word From Our Founders" />

        <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2">
          {founders.map((f) => (
            <figure
              key={f.name}
              className="flex flex-col items-center rounded-card border border-border bg-card p-8 text-center"
            >
              <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-surface shadow-md">
                {f.image ? (
                  <Image
                    src={f.image}
                    alt={`${f.name}, ${f.role} of Ecoshine Solution`}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-brand text-2xl font-bold text-white">
                    {f.initials}
                  </div>
                )}
              </div>

              <figcaption className="mt-5">
                <p className="text-xl font-bold text-foreground">{f.name}</p>
                <p className="mt-1 font-semibold text-brand-600 dark:text-brand-300">
                  {f.role}
                </p>
              </figcaption>

              <Quote className="mt-6 h-7 w-7 text-brand-300 dark:text-brand-600" />
              <blockquote className="mt-2 text-base leading-relaxed text-muted">
                {f.quote}
              </blockquote>

              <a
                href={f.linkedin}
                aria-label={`${f.name} on LinkedIn`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-brand-600 transition-colors hover:bg-brand-50 dark:text-brand-300 dark:hover:bg-brand-600/10"
              >
                <LinkedInIcon className="h-5 w-5" />
              </a>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
