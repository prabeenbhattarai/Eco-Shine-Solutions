import { Hero } from "@/components/home/hero";
import { ServicesGrid } from "@/components/home/services-grid";
import { WhyChoose } from "@/components/home/why-choose";
import { OurDifference } from "@/components/home/our-difference";
import { AustraliaCoverage } from "@/components/home/australia-coverage";
import { HowItWorks } from "@/components/home/how-it-works";
import { SatisfactionBand } from "@/components/satisfaction-band";
import { WorkGallery } from "@/components/home/work-gallery";
import { Testimonials } from "@/components/home/testimonials";
import { Faq } from "@/components/home/faq";
import { LeadCapture } from "@/components/home/lead-capture";
import { LocalBusinessJsonLd } from "@/components/json-ld";
import { getServices, getTestimonials } from "@/lib/content";

export default async function HomePage() {
  const [services, testimonials] = await Promise.all([getServices(), getTestimonials()]);
  const plainServices = services.map((s) => {
    const { icon, ...rest } = s;
    void icon;
    return rest;
  });
  const serviceNames = services.map((s) => ({ slug: s.slug, short: s.short }));

  return (
    <>
      <LocalBusinessJsonLd />
      <Hero />
      <ServicesGrid services={plainServices} />
      <WhyChoose />
      <OurDifference />
      <AustraliaCoverage serviceNames={serviceNames} />
      <HowItWorks />
      <SatisfactionBand />
      <WorkGallery />
      <Testimonials items={testimonials} />
      <Faq />
      <LeadCapture />
    </>
  );
}
