import { Construction } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { QuoteButton } from "@/components/quote/quote-button";

export function ComingSoon({ note }: { note?: string }) {
  return (
    <section className="container-page py-20">
      <div className="mx-auto flex max-w-xl flex-col items-center rounded-card border border-border bg-card p-10 text-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-600 dark:bg-brand-600/15 dark:text-brand-300">
          <Construction className="h-7 w-7" />
        </span>
        <h2 className="mt-5 text-xl font-bold text-foreground">This page is on its way</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {note ??
            "We're building this out as part of the site rebuild. In the meantime, request a free quote or get in touch and we'd love to help."}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <QuoteButton>Get a Free Quote</QuoteButton>
          <ButtonLink href="/contact" variant="secondary">
            Contact Us
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
