import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = {
  title: "Careers at Ecoshine Solution",
  description:
    "Join the Ecoshine Solution team. Eco-certified, insured and police-checked cleaning roles across NSW, WA, TAS and ACT.",
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        title="Careers at Ecoshine Solution"
        subtitle="Join a growing team of eco-certified, police-checked cleaning professionals across Australia."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Careers" }]}
      />
      <ComingSoon note="Our careers page and open roles are being finalised. Reach out to us directly if you'd like to join the team." />
    </>
  );
}
