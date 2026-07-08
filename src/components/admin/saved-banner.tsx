export function SavedBanner({ saved, error }: { saved?: string; error?: string }) {
  if (error) {
    return (
      <p className="mt-4 rounded-btn border border-red-300 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 dark:border-red-400/30 dark:bg-red-500/10 dark:text-red-300">
        Something went wrong: {error}. Check the form and try again.
      </p>
    );
  }
  if (saved) {
    return (
      <p className="mt-4 rounded-btn border border-eco-500/40 bg-eco-500/10 px-3 py-2 text-sm font-medium text-eco-600">
        Saved. The changes are live on the site.
      </p>
    );
  }
  return null;
}
