import Image from "next/image";
import { Check } from "lucide-react";
import { trustPoints, advantages } from "@/lib/site";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";

export function WhyChoose() {
  return (
    <section className="py-20">
      <div className="container-page">
        {/* Competitive intro with team photo */}
        <Reveal className="grid items-center gap-12 lg:grid-cols-2">
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
            <div className="absolute -right-3 -top-3 rounded-card bg-gradient-brand px-4 py-3 text-white shadow-lg sm:-right-5">
              <p className="text-2xl font-bold leading-none">8+</p>
              <p className="text-xs text-white/85">years cleaning</p>
            </div>
          </div>

          <div>
            <span className="text-sm font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-300">
              Why Ecoshine
            </span>
            <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
              The cleaning team Australian businesses actually keep
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Plenty of cleaners promise the world and disappear after the first job.
              We pair genuine eco-credentials with the reliability and professionalism
              that keep clients with us for years.
            </p>

            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {advantages.map((a) => (
                <li key={a} className="flex items-start gap-2.5 text-sm text-foreground">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-eco-500/15 text-eco-600">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {a}
                </li>
              ))}
            </ul>

            <ButtonLink href="/quote" className="mt-8">
              Get a Free Quote
            </ButtonLink>
          </div>
        </Reveal>

        {/* Trust pillars */}
        <Reveal className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
        </Reveal>
      </div>
    </section>
  );
}
