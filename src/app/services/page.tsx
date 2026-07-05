import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ServicesExplorer } from "./services-explorer";

export const metadata: Metadata = {
  title: "Cleaning Services Sydney",
  description:
    "Explore Ecoshine Solution cleaning services across NSW, WA, TAS and ACT: commercial, strata, post-construction and home detailing. Eco-certified, insured, free quotes.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our Professional Services"
        subtitle="Specialist eco-friendly cleaning for businesses across Australia. Filter by category or browse the full list."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />
      <ServicesExplorer />
    </>
  );
}
