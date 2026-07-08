import Image from "next/image";
import { getServices } from "@/lib/content";
import { saveServiceAction } from "@/app/admin/actions";
import { SavedBanner } from "@/components/admin/saved-banner";
import { cardCls, inputCls, labelCls, primaryBtnCls, textareaCls } from "@/components/admin/ui";

export default async function AdminServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { saved, error } = await searchParams;
  const services = await getServices();

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Services</h1>
      <p className="mt-1 text-sm text-muted">
        Edit the name, description and photo of each service. These feed the mega menu,
        the Services page, the homepage grid and each service&apos;s own page. URLs and
        categories are fixed so existing links never break.
      </p>
      <SavedBanner saved={saved} error={error} />

      <div className="mt-6 space-y-4">
        {services.map((s) => (
          <form key={s.slug} action={saveServiceAction} className={cardCls}>
            <input type="hidden" name="slug" value={s.slug} />
            <input type="hidden" name="image" value={s.image} />
            <p className="text-xs font-bold uppercase tracking-wide text-brand-600 dark:text-brand-300">
              {s.category} · /services/{s.slug}
            </p>
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-[8rem_1fr]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-btn border border-border">
                <Image src={s.image} alt={s.imageAlt} fill sizes="128px" className="object-cover" />
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className={labelCls} htmlFor={`title-${s.slug}`}>
                      Full title
                    </label>
                    <input
                      id={`title-${s.slug}`}
                      name="title"
                      required
                      maxLength={80}
                      defaultValue={s.title}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor={`short-${s.slug}`}>
                      Short name (menus)
                    </label>
                    <input
                      id={`short-${s.slug}`}
                      name="short"
                      required
                      maxLength={40}
                      defaultValue={s.short}
                      className={inputCls}
                    />
                  </div>
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
                  Save Service
                </button>
              </div>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
}
