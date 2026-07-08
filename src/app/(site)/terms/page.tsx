import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Service delivery terms, cancellation policy, liability and payment terms for Ecoshine Solution cleaning services.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        title="Terms & Conditions"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Terms" }]}
      />
      <ComingSoon note="Our full terms of service, including cancellation and payment policies, are being finalised and will appear here shortly." />
    </>
  );
}
