import { ArrowRight, Sparkles } from "lucide-react";
import { QuoteButton } from "@/components/quote/quote-button";

export function PageCta({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-eco px-6 py-14 text-center sm:px-12 sm:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_85%,rgba(255,255,255,0.18),transparent_45%)]" />
          <div className="relative mx-auto max-w-xl">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-white">
              <Sparkles className="h-7 w-7" />
            </span>
            <h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl">{title}</h2>
            <p className="mt-4 text-base leading-relaxed text-white/85">{description}</p>
            <QuoteButton
              size="lg"
              className="mt-8 border-0 bg-white text-teal-700 hover:bg-white/90"
            >
              Request a Quote
              <ArrowRight className="h-5 w-5" />
            </QuoteButton>
          </div>
        </div>
      </div>
    </section>
  );
}
