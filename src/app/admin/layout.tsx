import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

/* Minimal shell for everything under /admin - no site navbar/footer. The
   authenticated panel chrome lives in (panel)/layout.tsx; this level also
   hosts the unauthenticated login page. */
export default function AdminRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="min-h-screen bg-surface">{children}</div>;
}
