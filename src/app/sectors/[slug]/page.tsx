import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { DetailPage } from "@/components/detail-page";
import { sectors } from "@/lib/site";

export function generateStaticParams() {
  return sectors.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sector = sectors.find((s) => s.slug === slug);
  if (!sector) return {};
  return {
    title: `${sector.name} Cleaning Services`,
    description: `${sector.blurb} Eco-certified, insured and police-checked commercial cleaning from Ecoshine Solution across NSW, WA, TAS and ACT.`,
  };
}

export default async function SectorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sector = sectors.find((s) => s.slug === slug);
  if (!sector) notFound();

  const related = sectors
    .filter((s) => s.slug !== sector.slug)
    .slice(0, 3)
    .map((s) => ({ label: s.name, href: `/sectors/${s.slug}` }));

  return (
    <>
      <PageHero
        title={`${sector.name} Cleaning`}
        subtitle={sector.blurb}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Sectors", href: "/sectors" },
          { label: sector.name },
        ]}
      />
      <DetailPage
        intro={`${sector.blurb} Ecoshine's eco-certified, insured and police-checked teams tailor a cleaning program for every ${sector.name.toLowerCase()} site, backed by our satisfaction guarantee.`}
        image={sector.image}
        imageAlt={sector.imageAlt}
        expertiseContext={`${sector.name} Cleaning`}
        related={related}
        relatedLabel="Other Sectors We Service"
        ctaTitle={`Ready to Book a Clean for Your ${sector.name} Site?`}
        ctaDescription="Tell us about your space and we'll send a tailored, no-obligation quote fast."
      />
    </>
  );
}
