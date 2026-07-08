import { ChevronDown } from "lucide-react";
import { getFaqs } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export async function Faq() {
  const faqs = await getFaqs();
  return (
    <section id="faq" className="scroll-mt-24 bg-surface py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="FAQs"
          title="Frequently asked questions"
          description="Everything you need to know before booking. Can't find your answer? Just contact us."
        />

        <Reveal className="mx-auto mt-10 max-w-3xl divide-y divide-border rounded-card border border-border bg-card">
          {faqs.map((f) => (
            <details key={f.id} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-foreground marker:content-none sm:text-base [&::-webkit-details-marker]:hidden">
                {f.question}
                <ChevronDown className="h-5 w-5 shrink-0 text-brand-600 transition-transform group-open:rotate-180 dark:text-brand-300" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">{f.answer}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
