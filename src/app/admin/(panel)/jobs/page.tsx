import { Plus, Trash2 } from "lucide-react";
import { getJobs } from "@/lib/content";
import { deleteJobAction, saveJobAction } from "@/app/admin/actions";
import { SavedBanner } from "@/components/admin/saved-banner";
import {
  cardCls,
  dangerBtnCls,
  inputCls,
  labelCls,
  primaryBtnCls,
  textareaCls,
} from "@/components/admin/ui";

function JobForm({ job }: { job?: Awaited<ReturnType<typeof getJobs>>[number] }) {
  return (
    <form action={saveJobAction} className="space-y-4">
      {job && <input type="hidden" name="id" value={job.id} />}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className={labelCls} htmlFor={`title-${job?.id ?? "new"}`}>
            Job title
          </label>
          <input
            id={`title-${job?.id ?? "new"}`}
            name="title"
            required
            defaultValue={job?.title}
            placeholder="e.g. Commercial Cleaner"
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor={`location-${job?.id ?? "new"}`}>
            Location
          </label>
          <input
            id={`location-${job?.id ?? "new"}`}
            name="location"
            defaultValue={job?.location}
            placeholder="e.g. Sydney, NSW"
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor={`type-${job?.id ?? "new"}`}>
            Employment type
          </label>
          <select
            id={`type-${job?.id ?? "new"}`}
            name="type"
            defaultValue={job?.type ?? "Full-time"}
            className={inputCls}
          >
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Casual</option>
            <option>Contract</option>
          </select>
        </div>
      </div>
      <div>
        <label className={labelCls} htmlFor={`description-${job?.id ?? "new"}`}>
          Description
        </label>
        <textarea
          id={`description-${job?.id ?? "new"}`}
          name="description"
          defaultValue={job?.description}
          placeholder="What the role involves, requirements, and how to apply."
          className={textareaCls}
        />
      </div>
      <div className="flex items-center justify-between gap-4">
        <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-foreground">
          <input
            type="checkbox"
            name="active"
            defaultChecked={job?.active ?? true}
            className="h-4 w-4 cursor-pointer accent-brand-600"
          />
          Visible on the Careers page
        </label>
        <button type="submit" className={primaryBtnCls}>
          {job ? "Save Job" : (
            <>
              <Plus className="h-4 w-4" />
              Add Job
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default async function AdminJobsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { saved, error } = await searchParams;
  const jobs = await getJobs();

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Job Vacancies</h1>
      <p className="mt-1 text-sm text-muted">
        Openings shown on the Careers page. Untick visibility to hide a role without
        deleting it.
      </p>
      <SavedBanner saved={saved} error={error} />

      <div className={`${cardCls} mt-6`}>
        <h2 className="text-base font-bold text-foreground">Post a New Job</h2>
        <div className="mt-4">
          <JobForm />
        </div>
      </div>

      <h2 className="mt-10 text-lg font-bold text-foreground">
        Existing Jobs ({jobs.length})
      </h2>
      <div className="mt-4 space-y-4">
        {jobs.length === 0 && (
          <p className="text-sm text-muted">No jobs yet. Post the first one above.</p>
        )}
        {jobs.map((job) => (
          <div key={job.id} className={cardCls}>
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-muted">
                Posted {job.postedAt}
                {!job.active && (
                  <span className="ml-2 rounded-full bg-amber-500/15 px-2 py-0.5 text-xs font-bold text-amber-600">
                    Hidden
                  </span>
                )}
              </p>
              <form action={deleteJobAction}>
                <input type="hidden" name="id" value={job.id} />
                <button type="submit" className={dangerBtnCls}>
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </button>
              </form>
            </div>
            <JobForm job={job} />
          </div>
        ))}
      </div>
    </div>
  );
}
