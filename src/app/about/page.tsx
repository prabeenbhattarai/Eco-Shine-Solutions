import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { Founders } from "@/components/founders";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { trustPoints } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Ecoshine Solution",
  description:
    "Learn about Ecoshine Solution, an eco-conscious, professional and affordable cleaning team serving NSW, WA, TAS and ACT. Insured, police-checked and BSCAA-aligned.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Ecoshine Solution"
        subtitle="Eco-conscious, professional and affordable cleaning trusted by businesses and communities across Australia."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* Mission / story */}
      <section id="story" className="scroll-mt-24 py-20">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-border shadow-lg">
              <Image
                src="/images/ecoshine-cleaning-team.jpg"
                alt="The Ecoshine Solution cleaning team in uniform by the Sydney Harbour Bridge"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <span className="text-sm font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-300">
              Our story
            </span>
            <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
              Cleaning done properly, the eco-friendly way
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Ecoshine Solution was founded on a belief that professional cleaning and
              caring for the environment should go hand in hand. What started as a
              small Sydney team has grown into a trusted operation servicing New South
              Wales, Western Australia and Tasmania, with the ACT joining on 1 July
              2026.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Across childcare, healthcare, hospitality, industrial, community and
              government sites, we bring the same promise to every job: eco-certified
              products, insured and police-checked staff, and a finish we stand behind
              with our satisfaction guarantee.
            </p>
            <ButtonLink href="/quote" className="mt-8">
              Get a Free Quote
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="values" className="scroll-mt-24 bg-surface py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="What we stand for"
            title="Values our clients can count on"
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trustPoints.map((point) => {
              const Icon = point.icon;
              return (
                <div
                  key={point.title}
                  className="flex flex-col items-center rounded-card border border-border bg-card p-6 text-center"
                >
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-600 dark:bg-brand-600/15 dark:text-brand-300">
                    <Icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-foreground">{point.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{point.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Founders */}
      <Founders />
    </>
  );
}
