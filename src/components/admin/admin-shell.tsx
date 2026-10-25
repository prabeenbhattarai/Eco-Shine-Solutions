"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, LogOut, Menu, X } from "lucide-react";
import { AdminNav } from "@/components/admin/admin-nav";
import { Logo } from "@/components/logo";

/* Full-width, responsive admin chrome: a fixed sidebar on desktop and a
   slide-in drawer on mobile (with a top bar). The content area fills the rest
   of the viewport width. */
export function AdminShell({
  children,
  logoutAction,
  unreadEnquiries = 0,
}: {
  children: React.ReactNode;
  logoutAction: () => void;
  unreadEnquiries?: number;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const footer = (
    <div className="mt-4 flex flex-col gap-1 border-t border-border pt-4">
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
  );

  return (
    <div className="flex min-h-screen w-full bg-surface">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-card p-4 lg:flex">
        <div className="px-2 pb-4">
          <Logo />
        </div>
        <div className="-mx-1 flex-1 overflow-y-auto px-1">
          <AdminNav unreadEnquiries={unreadEnquiries} />
        </div>
        {footer}
      </aside>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <aside
          className={`absolute left-0 top-0 flex h-full max-h-dvh w-72 max-w-[85%] flex-col border-r border-border bg-card p-4 shadow-2xl transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-2 pb-4">
            <Logo />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-btn border border-border text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="-mx-1 flex-1 overflow-y-auto px-1">
            <AdminNav unreadEnquiries={unreadEnquiries} />
          </div>
          {footer}
        </aside>
      </div>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top bar */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background px-4 lg:hidden">
          <button
            type="button"
            aria-label={
              unreadEnquiries > 0 ? `Open menu (${unreadEnquiries} unread enquiries)` : "Open menu"
            }
            onClick={() => setOpen(true)}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-btn border border-border text-foreground"
          >
            <Menu className="h-5 w-5" />
            {unreadEnquiries > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                {unreadEnquiries > 9 ? "9+" : unreadEnquiries}
              </span>
            )}
          </button>
          <Logo />
        </header>

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
