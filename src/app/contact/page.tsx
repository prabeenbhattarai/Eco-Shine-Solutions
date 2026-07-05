import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = {
  title: "Contact Ecoshine Solution Sydney",
  description:
    "Get in touch with Ecoshine Solution across NSW, WA, TAS and ACT. Call, WhatsApp or message us and we reply within 2 hours during business hours.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="We reply within 2 hours during business hours. Call, WhatsApp or send us a message."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />
      <ComingSoon note="Our full contact page with click-to-call, map and form is on its way. For now, use the call or quote buttons and we'll respond quickly." />
    </>
  );
}
