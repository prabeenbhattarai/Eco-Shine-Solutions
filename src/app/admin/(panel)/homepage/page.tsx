import Image from "next/image";
import { getHomepage } from "@/lib/content";
import { saveHomepageAction } from "@/app/admin/actions";
import { SavedBanner } from "@/components/admin/saved-banner";
import { cardCls, inputCls, labelCls, primaryBtnCls, textareaCls } from "@/components/admin/ui";

export default async function AdminHomepagePage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { saved, error } = await searchParams;
  const { hero } = await getHomepage();

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Homepage</h1>
      <p className="mt-1 text-sm text-muted">
        Edit the hero text and image shown at the top of the homepage.
      </p>
      <SavedBanner saved={saved} error={error} />

      <form action={saveHomepageAction} className={`${cardCls} mt-6 space-y-5`}>
        <div>
          <label htmlFor="badge" className={labelCls}>
            Badge text
          </label>
          <input id="badge" name="badge" required maxLength={80} defaultValue={hero.badge} className={inputCls} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="titlePre" className={labelCls}>
              Heading, first part
            </label>
            <input id="titlePre" name="titlePre" required defaultValue={hero.titlePre} className={inputCls} />
          </div>
          <div>
            <label htmlFor="titleHighlight" className={labelCls}>
              Heading, highlighted part
            </label>
            <input
              id="titleHighlight"
              name="titleHighlight"
              required
              defaultValue={hero.titleHighlight}
              className={inputCls}
            />
          </div>
          <div>
            <label htmlFor="titlePost" className={labelCls}>
              Heading, last part
            </label>
            <input id="titlePost" name="titlePost" defaultValue={hero.titlePost} className={inputCls} />
          </div>
        </div>

        <div>
          <label htmlFor="description" className={labelCls}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            defaultValue={hero.description}
            className={textareaCls}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="ratingValue" className={labelCls}>
              Rating value
            </label>
            <input
              id="ratingValue"
              name="ratingValue"
              defaultValue={hero.ratingValue}
              className={inputCls}
            />
          </div>
          <div>
            <label htmlFor="ratingNote" className={labelCls}>
              Rating note
            </label>
            <input id="ratingNote" name="ratingNote" defaultValue={hero.ratingNote} className={inputCls} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[10rem_1fr]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-btn border border-border">
            <Image src={hero.image} alt={hero.imageAlt} fill sizes="160px" className="object-cover" />
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="imageFile" className={labelCls}>
                Replace hero image (JPG, PNG or WebP, max 8MB)
              </label>
              <input
                id="imageFile"
                name="imageFile"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                className={`${inputCls} cursor-pointer file:mr-3 file:cursor-pointer file:rounded-btn file:border-0 file:bg-brand-50 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-brand-700`}
              />
              <input type="hidden" name="image" value={hero.image} />
            </div>
            <div>
              <label htmlFor="imageAlt" className={labelCls}>
                Image description (alt text)
              </label>
              <input id="imageAlt" name="imageAlt" defaultValue={hero.imageAlt} className={inputCls} />
            </div>
          </div>
        </div>

        <button type="submit" className={primaryBtnCls}>
          Save Changes
        </button>
      </form>
    </div>
  );
}
