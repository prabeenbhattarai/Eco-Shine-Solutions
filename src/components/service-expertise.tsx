import { ArrowRight } from "lucide-react";
import { expertisePoints } from "@/lib/site";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button";
import { QuoteButton } from "@/components/quote/quote-button";

/* "How we deliver" capability band shown on every service and sector detail
   page. `context` is the page's subject, e.g. "Retail Cleaning". */
export function ServiceExpertise({ context }: { context: string }) {
  return (
    <section className="bg-surface py-16 sm:py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="Service expertise"
          title={`How We Deliver ${context}, Every Visit`}
          description="Every Ecoshine program is built on documented scopes, measured performance and clear reporting, keeping your site compliant and your standards consistent."
        />

        <Reveal className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {expertisePoints.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="rounded-card border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md dark:hover:border-brand-400/40"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-600/15 dark:text-brand-300">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-bold text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
              </div>
            );
          })}
        </Reveal>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <QuoteButton className="group">
            Get a Free Quote
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </QuoteButton>
          <ButtonLink href="/contact" variant="secondary">
            Contact Us
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
