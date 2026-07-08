import { Plus, Star, Trash2 } from "lucide-react";
import { getTestimonials, getBlogCategories, type Testimonial } from "@/lib/content";
import { deleteTestimonialAction, saveTestimonialAction } from "@/app/admin/actions";
import { SavedBanner } from "@/components/admin/saved-banner";
import {
  cardCls,
  dangerBtnCls,
  inputCls,
  labelCls,
  primaryBtnCls,
  textareaCls,
} from "@/components/admin/ui";

function TestimonialForm({
  item,
  categories,
}: {
  item?: Testimonial;
  categories: string[];
}) {
  const key = item?.id ?? "new";
  return (
    <form action={saveTestimonialAction} className="space-y-4">
      {item && <input type="hidden" name="id" value={item.id} />}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className={labelCls} htmlFor={`name-${key}`}>
            Customer name
          </label>
          <input
            id={`name-${key}`}
            name="name"
            required
            maxLength={60}
            defaultValue={item?.name}
            placeholder="e.g. Sarah M."
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor={`role-${key}`}>
            Role &amp; location
          </label>
          <input
            id={`role-${key}`}
            name="role"
            required
            maxLength={80}
            defaultValue={item?.role}
            placeholder="e.g. Office Manager, Sydney NSW"
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor={`rating-${key}`}>
            Rating
          </label>
          <select
            id={`rating-${key}`}
            name="rating"
            required
            defaultValue={String(item?.rating ?? 5)}
            className={inputCls}
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} star{n === 1 ? "" : "s"}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className={labelCls} htmlFor={`service-${key}`}>
          Service or sector referenced
        </label>
        <select
          id={`service-${key}`}
          name="service"
          required
          defaultValue={item?.service ?? categories[0]}
          className={inputCls}
        >
          {item?.service && !categories.includes(item.service) && (
            <option value={item.service}>{item.service}</option>
          )}
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className={labelCls} htmlFor={`text-${key}`}>
          Testimonial
        </label>
        <textarea
          id={`text-${key}`}
          name="text"
          required
          maxLength={500}
          defaultValue={item?.text}
          className={textareaCls}
        />
      </div>
      <button type="submit" className={primaryBtnCls}>
        {item ? "Save Testimonial" : (
          <>
            <Plus className="h-4 w-4" />
            Add Testimonial
          </>
        )}
      </button>
    </form>
  );
}

export default async function AdminTestimonialsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { saved, error } = await searchParams;
  const [items, categories] = await Promise.all([getTestimonials(), getBlogCategories()]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Testimonials</h1>
      <p className="mt-1 text-sm text-muted">
        Reviews shown in the homepage testimonials carousel.
      </p>
      <SavedBanner saved={saved} error={error} />

      <div className={`${cardCls} mt-6`}>
        <h2 className="text-base font-bold text-foreground">Add a Testimonial</h2>
        <div className="mt-4">
          <TestimonialForm categories={categories} />
        </div>
      </div>

      <h2 className="mt-10 text-lg font-bold text-foreground">
        Existing Testimonials ({items.length})
      </h2>
      <div className="mt-4 space-y-4">
        {items.map((item) => (
          <div key={item.id} className={cardCls}>
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-500">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </p>
              <form action={deleteTestimonialAction}>
                <input type="hidden" name="id" value={item.id} />
                <button type="submit" className={dangerBtnCls}>
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </button>
              </form>
            </div>
            <TestimonialForm item={item} categories={categories} />
          </div>
        ))}
      </div>
    </div>
  );
}
