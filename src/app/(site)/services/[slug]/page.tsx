import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { DetailPage } from "@/components/detail-page";
import { serviceStandards } from "@/lib/site";
import { getServices } from "@/lib/content";

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const services = await getServices();
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.title,
    description: `${service.blurb} Eco-certified, insured cleaners across NSW, WA, TAS and ACT. Get a free quote from Ecoshine Solution.`,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const services = await getServices();
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const related = services
    .filter((s) => s.category === service.category && s.slug !== service.slug)
    .slice(0, 3)
    .map((s) => ({ label: s.short, href: s.href }));

  // Per-page overrides fall back to the computed defaults when left blank.
  const p = service.page ?? {};
  const base = serviceStandards[service.category];
  const standards = {
    ...base,
    eyebrow: p.standardsEyebrow || base.eyebrow,
    title: p.standardsTitle || base.title,
    text: p.standardsText || base.text,
    tagline: p.standardsTagline || base.tagline,
  };

  return (
    <>
      <PageHero
        title={service.title}
        subtitle={service.blurb}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />
      <DetailPage
        intro={
          p.intro ||
          `${service.blurb} Whether you need a one-off clean or an ongoing schedule, our eco-certified, insured and police-checked teams deliver consistent ${service.short.toLowerCase()} results across New South Wales, Western Australia, Tasmania and the ACT.`
        }
        image={service.image}
        imageAlt={service.imageAlt}
        expertiseContext={service.short}
        standards={standards}
        related={related}
        relatedLabel={`More ${service.category}`}
        ctaTitle={p.ctaTitle || `Ready to Book Your ${service.short} Clean?`}
        ctaDescription={
          p.ctaDescription ||
          "Tell us about your space and we'll send a tailored, no-obligation quote fast."
        }
      />
    </>
  );
}
