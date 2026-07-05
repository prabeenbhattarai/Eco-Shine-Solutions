import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { differenceStats } from "@/lib/site";

export function OurDifference() {
  return (
    <section className="py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="Our Difference"
          title="Reliable Cleaning, Backed by Real Accountability"
          description="From eco-certified products to insured, police-checked teams, every Ecoshine clean is backed by clear communication and a satisfaction guarantee you can count on."
        />

        <Reveal className="mt-12 overflow-hidden rounded-card">
          <div className="relative min-h-[420px]">
            <Image
              src="/images/commercial-floor-cleaning-sydney.jpg"
              alt="Ecoshine cleaner delivering a consistent, professional commercial clean"
              fill
              sizes="(min-width: 1024px) 1200px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-900/95 via-brand-900/70 to-brand-900/30" />

            <div className="relative flex flex-col justify-center px-6 py-14 sm:px-10 lg:max-w-xl lg:py-20">
              <h3 className="text-2xl font-bold text-white sm:text-3xl">
                Consistent Service You Can Rely On
              </h3>
              <p className="mt-4 text-base leading-relaxed text-white/85">
                Every site is managed by a dedicated local team, so you always know who is
                cleaning your space and when. Clear scheduling and direct communication mean
                nothing falls through the cracks.
              </p>
              <p className="mt-4 text-base leading-relaxed text-white/85">
                Backed by our satisfaction guarantee, if a clean ever falls short we will return
                and put it right at no extra cost, no questions asked.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4">
            {differenceStats.map((s) => (
              <div key={s.label} className="bg-brand-800 p-6">
                <p className="text-3xl font-bold text-white">{s.value}</p>
                <p className="mt-1 text-sm font-semibold text-white/90">{s.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-white/65">{s.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
