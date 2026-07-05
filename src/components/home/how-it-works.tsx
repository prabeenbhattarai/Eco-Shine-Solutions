import { howItWorks } from "@/lib/site";
import { SectionHeading } from "@/components/section-heading";

export function HowItWorks() {
  return (
    <section className="bg-surface py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="How it works"
          title="A spotless space in three simple steps"
        />

        <div className="relative mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* connecting line on desktop */}
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-brand-300 to-transparent md:block dark:via-brand-600/40" />

          {howItWorks.map((step) => (
            <div key={step.step} className="relative flex flex-col items-center text-center">
              <span className="relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand text-lg font-bold text-white shadow-md shadow-brand-600/30">
                {step.step}
              </span>
              <h3 className="mt-5 text-lg font-bold text-foreground">{step.title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
