import { Plus, Trash2 } from "lucide-react";
import { getFaqs, type FaqItem } from "@/lib/content";
import { deleteFaqAction, saveFaqAction } from "@/app/admin/actions";
import { SavedBanner } from "@/components/admin/saved-banner";
import {
  cardCls,
  dangerBtnCls,
  inputCls,
  labelCls,
  primaryBtnCls,
  textareaCls,
} from "@/components/admin/ui";

function FaqForm({ item }: { item?: FaqItem }) {
  const key = item?.id ?? "new";
  return (
    <form action={saveFaqAction} className="space-y-4">
      {item && <input type="hidden" name="id" value={item.id} />}
      <div>
        <label className={labelCls} htmlFor={`question-${key}`}>
          Question
        </label>
        <input
          id={`question-${key}`}
          name="question"
          required
          maxLength={150}
          defaultValue={item?.question}
          placeholder="e.g. Do I need to sign a long-term contract?"
          className={inputCls}
        />
      </div>
      <div>
        <label className={labelCls} htmlFor={`answer-${key}`}>
          Answer
        </label>
        <textarea
          id={`answer-${key}`}
          name="answer"
          required
          maxLength={600}
          defaultValue={item?.answer}
          className={textareaCls}
        />
      </div>
      <button type="submit" className={primaryBtnCls}>
        {item ? "Save FAQ" : (
          <>
            <Plus className="h-4 w-4" />
            Add FAQ
          </>
        )}
      </button>
    </form>
  );
}

export default async function AdminFaqsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { saved, error } = await searchParams;
  const items = await getFaqs();

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">FAQs</h1>
      <p className="mt-1 text-sm text-muted">
        Questions shown in the FAQ accordion on the homepage.
      </p>
      <SavedBanner saved={saved} error={error} />

      <div className={`${cardCls} mt-6`}>
        <h2 className="text-base font-bold text-foreground">Add a Question</h2>
        <div className="mt-4">
          <FaqForm />
        </div>
      </div>

      <h2 className="mt-10 text-lg font-bold text-foreground">
        Existing FAQs ({items.length})
      </h2>
      <div className="mt-4 space-y-4">
        {items.map((item) => (
          <div key={item.id} className={cardCls}>
            <div className="mb-4 flex justify-end">
              <form action={deleteFaqAction}>
                <input type="hidden" name="id" value={item.id} />
                <button type="submit" className={dangerBtnCls}>
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </button>
              </form>
            </div>
            <FaqForm item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
