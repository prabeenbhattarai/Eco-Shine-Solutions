import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { StandardsContent } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { QuoteButton } from "@/components/quote/quote-button";

/* "Onsite team and industry standards" band on service/sector detail pages.
   Copy comes from serviceStandards/sectorStandards so each category speaks to
   its own compliance and safety expectations. */
export function TeamStandards({ standards }: { standards: StandardsContent }) {
  return (
    <section className="py-16 sm:py-20">
      <Reveal className="container-page grid items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-300">
            {standards.eyebrow}
          </span>
          <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
            {standards.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted">{standards.text}</p>
          <p className="mt-6 text-lg font-bold italic text-foreground">
            {standards.tagline}
          </p>
          <QuoteButton size="lg" className="group mt-8">
            Request a Quote
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </QuoteButton>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-border shadow-lg">
          <Image
            src={standards.image}
            alt={standards.imageAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </Reveal>
    </section>
  );
}
