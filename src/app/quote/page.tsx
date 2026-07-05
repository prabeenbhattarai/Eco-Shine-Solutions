import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { QuoteForm } from "@/components/quote/quote-form";

export const metadata: Metadata = {
  title: "Get a Free Cleaning Quote",
  description:
    "Request a free, no-obligation cleaning quote from Ecoshine Solution across NSW, WA, TAS and ACT. Tell us about your space and we respond within 2 hours.",
};

export default function QuotePage() {
  return (
    <>
      <PageHero
        title="Get a Free Quote"
        subtitle="Tell us about your space and we will send a tailored, no-obligation quote fast."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Get a Quote" }]}
      />
      <section className="container-page py-14">
        <div className="mx-auto max-w-2xl rounded-card border border-border bg-card p-6 shadow-sm sm:p-8">
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
