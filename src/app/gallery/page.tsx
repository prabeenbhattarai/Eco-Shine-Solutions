import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { GalleryGrid } from "@/components/gallery-grid";
import { galleryShots } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos of the uniformed, eco-certified Ecoshine Solution cleaning teams at work across NSW, WA, TAS and ACT.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        title="Gallery"
        subtitle="A look at the uniformed, professional crews who turn up for our clients every day. Click any photo for a closer look."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      />
      <section className="container-page py-16">
        <GalleryGrid
          shots={galleryShots}
          rowHeight="auto-rows-[200px] sm:auto-rows-[220px]"
        />
      </section>
    </>
  );
}
