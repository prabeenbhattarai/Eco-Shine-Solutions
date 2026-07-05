import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = {
  title: "Ecoshine Solution Blog",
  description:
    "Cleaning tips, industry news and updates from the Ecoshine Solution team across NSW, WA, TAS and ACT.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="Blog"
        subtitle="Cleaning tips, industry news and updates from the Ecoshine Solution team."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />
      <ComingSoon note="Our blog is being finalised. Check back soon for cleaning tips and updates from the team." />
    </>
  );
}
