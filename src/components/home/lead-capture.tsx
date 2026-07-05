import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";

export function LeadCapture() {
  return (
    <section className="py-20">
      <div className="container-page">
        <Reveal className="relative overflow-hidden rounded-card bg-brand-600 px-6 py-14 sm:px-12 sm:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(255,255,255,0.14),transparent_45%)]" />

          <div className="relative max-w-xl">
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
              Ready for Your Next Eco-Friendly Clean?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/85">
              Great cleaning should feel invisible, reliable, and always on time. Ecoshine&apos;s
              local teams use eco-certified products and back every job with our satisfaction
              guarantee. Book your free, no-obligation quote and see the difference for yourself.
            </p>

            <Link
              href="/quote"
              className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-brand-700 transition-all hover:brightness-95 active:scale-[0.97]"
            >
              Get a Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
