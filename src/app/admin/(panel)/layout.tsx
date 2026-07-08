import Link from "next/link";
import { ExternalLink, LogOut } from "lucide-react";
import { requireAdmin } from "@/lib/admin-auth";
import { logoutAction } from "@/app/admin/actions";
import { AdminNav } from "@/components/admin/admin-nav";
import { Logo } from "@/components/logo";

export default async function AdminPanelLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requireAdmin();

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 p-4 sm:p-6 lg:flex-row">
      {/* Sidebar */}
      <aside className="shrink-0 lg:w-60">
        <div className="rounded-card border border-border bg-card p-4 lg:sticky lg:top-6">
          <div className="hidden px-2 pb-4 lg:block">
            <Logo />
          </div>
          <AdminNav />
          <div className="mt-4 flex flex-col gap-1.5 border-t border-border pt-4">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-2.5 rounded-btn px-3.5 py-2.5 text-sm font-semibold text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
            >
              <ExternalLink className="h-4 w-4" />
              View Site
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="inline-flex w-full cursor-pointer items-center gap-2.5 rounded-btn px-3.5 py-2.5 text-sm font-semibold text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
                Log Out
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Content */}
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
