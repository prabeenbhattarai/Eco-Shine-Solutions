import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { GalleryGrid, type Shot } from "@/components/gallery-grid";
import { getGallery } from "@/lib/content";

export async function WorkGallery() {
  const gallery = await getGallery();
  const shots: Shot[] = gallery.shots.slice(0, 5).map((shot, i) => ({
    ...shot,
    span: i === 0 ? "sm:col-span-2 sm:row-span-2" : "",
  }));

  return (
    <section className="py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="Our work"
          title="Real teams, real results"
          description="A look at the uniformed, professional crews who turn up for our clients every day. Click any photo for a closer look."
        />

        <div className="mt-12">
          <GalleryGrid shots={shots} />
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/gallery"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-btn border border-border bg-card px-7 text-sm font-semibold text-foreground transition-all hover:border-brand-300 hover:bg-surface-2"
          >
            See More
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
