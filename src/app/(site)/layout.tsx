import { Preloader } from "@/components/preloader";
import { QuoteProvider } from "@/components/quote/quote-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { MobileCtaBar } from "@/components/mobile-cta-bar";
import { getSettings, getServices, getSectors } from "@/lib/content";
import { overviewLinks, exploreLinks, type NavItem } from "@/lib/site";

/* Public site chrome. Admin routes live outside this group and get their own
   minimal shell, which is why the chrome hangs here instead of the root layout.
   The nav is built here, server-side, so admin edits to service and sector
   names flow straight into the mega menus. */
export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [settings, services, sectors] = await Promise.all([
    getSettings(),
    getServices(),
    getSectors(),
  ]);

  const nav: NavItem[] = [
    {
      label: "Overview",
      href: "/",
      children: overviewLinks.map((l) => ({
        label: l.label,
        href: l.href,
        description: l.description,
      })),
    },
    {
      label: "Services",
      href: "/services",
      children: services.map((s) => ({
        label: s.short,
        href: s.href,
        description: s.blurb,
        slug: s.slug,
        icon: s.icon,
      })),
    },
    {
      label: "Sectors",
      href: "/sectors",
      children: sectors.map((s) => ({
        label: s.name,
        href: `/sectors/${s.slug}`,
        description: s.blurb,
        slug: s.slug,
        icon: s.icon,
      })),
    },
    {
      label: "Explore",
      href: "/gallery",
      children: exploreLinks.map((l) => ({
        label: l.label,
        href: l.href,
        description: l.description,
      })),
    },
  ];

  const footerServices = services.map((s) => ({ short: s.short, href: s.href }));

  return (
    <>
      <Preloader />
      <QuoteProvider>
        <Navbar nav={nav} phone={settings.phone} phoneHref={settings.phoneHref} />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} services={footerServices} />
        <ScrollToTop />
        <MobileCtaBar phoneHref={settings.phoneHref} />
        {/* Spacer so the fixed mobile CTA bar never covers footer content */}
        <div className="h-14 lg:hidden" aria-hidden="true" />
      </QuoteProvider>
    </>
  );
}
