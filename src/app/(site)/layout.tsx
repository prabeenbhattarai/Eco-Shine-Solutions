import { SiteChrome } from "@/components/site-chrome";

/* Public site layout — the shared chrome (navbar, footer, quote provider, etc.)
   lives in SiteChrome so the global not-found page can reuse it. Admin routes
   live outside this group and get their own minimal shell. */
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SiteChrome>{children}</SiteChrome>;
}
