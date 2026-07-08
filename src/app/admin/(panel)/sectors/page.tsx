import Image from "next/image";
import { getSectors } from "@/lib/content";
import { saveSectorAction } from "@/app/admin/actions";
import { SavedBanner } from "@/components/admin/saved-banner";
import { cardCls, inputCls, labelCls, primaryBtnCls, textareaCls } from "@/components/admin/ui";

export default async function AdminSectorsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { saved, error } = await searchParams;
  const sectors = await getSectors();

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Sectors</h1>
      <p className="mt-1 text-sm text-muted">
        Edit the name, description and photo of each industry sector. These feed the mega
        menu, the Sectors page and each sector&apos;s own page. URLs are fixed so existing
        links never break.
      </p>
      <SavedBanner saved={saved} error={error} />

      <div className="mt-6 space-y-4">
        {sectors.map((s) => (
          <form key={s.slug} action={saveSectorAction} className={cardCls}>
            <input type="hidden" name="slug" value={s.slug} />
            <input type="hidden" name="image" value={s.image} />
            <p className="text-xs font-bold uppercase tracking-wide text-brand-600 dark:text-brand-300">
              /sectors/{s.slug}
            </p>
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-[8rem_1fr]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-btn border border-border">
                <Image src={s.image} alt={s.imageAlt} fill sizes="128px" className="object-cover" />
              </div>
              <div className="space-y-3">
                <div>
                  <label className={labelCls} htmlFor={`name-${s.slug}`}>
                    Sector name
                  </label>
                  <input
                    id={`name-${s.slug}`}
                    name="name"
                    required
                    maxLength={50}
                    defaultValue={s.name}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls} htmlFor={`blurb-${s.slug}`}>
                    Description
                  </label>
                  <textarea
                    id={`blurb-${s.slug}`}
                    name="blurb"
                    required
                    maxLength={200}
                    defaultValue={s.blurb}
                    className={`${textareaCls} min-h-16`}
                  />
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className={labelCls} htmlFor={`imageFile-${s.slug}`}>
                      Replace photo
                    </label>
                    <input
                      id={`imageFile-${s.slug}`}
                      name="imageFile"
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/avif"
                      className={`${inputCls} cursor-pointer file:mr-3 file:cursor-pointer file:rounded-btn file:border-0 file:bg-brand-50 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-brand-700`}
                    />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor={`imageAlt-${s.slug}`}>
                      Photo description (alt text)
                    </label>
                    <input
                      id={`imageAlt-${s.slug}`}
                      name="imageAlt"
                      required
                      defaultValue={s.imageAlt}
                      className={inputCls}
                    />
                  </div>
                </div>
                <button type="submit" className={primaryBtnCls}>
                  Save Sector
                </button>
              </div>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
}
