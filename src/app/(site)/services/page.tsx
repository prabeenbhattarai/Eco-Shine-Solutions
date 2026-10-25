import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { getPageHero, getServices } from "@/lib/content";
import { ServicesExplorer } from "./services-explorer";

export const metadata: Metadata = {
  title: "Commercial Cleaning Services Sydney",
  description:
    "Commercial cleaning services across Sydney & Australia: office, strata, industrial, medical, childcare and builders cleans. Eco-certified, insured — free quotes.",
  alternates: { canonical: "/services" },
};

export default async function ServicesPage() {
  const services = await getServices();
  const plainServices = services;
  const pageHero = await getPageHero("services", {
    title: "Our Professional Services",
    subtitle:
      "Specialist eco-friendly cleaning for businesses across Australia. Filter by category or browse the full list.",
  });

  return (
    <>
      <PageHero
        title={pageHero.title}
        subtitle={pageHero.subtitle}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />
      <ServicesExplorer services={plainServices} />
    </>
  );
}
