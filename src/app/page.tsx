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

export default function HomePage() {
  return (
    <>
      <LocalBusinessJsonLd />
      <Hero />
      <ServicesGrid />
      <WhyChoose />
      <OurDifference />
      <AustraliaCoverage />
      <HowItWorks />
      <SatisfactionBand />
      <WorkGallery />
      <Testimonials />
      <Faq />
      <LeadCapture />
    </>
  );
}
