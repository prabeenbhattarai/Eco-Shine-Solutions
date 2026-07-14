import { Preloader } from "@/components/preloader";
import { QuoteProvider } from "@/components/quote/quote-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { MobileCtaBar } from "@/components/mobile-cta-bar";
import { getSettings, getServices, getSectors } from "@/lib/content";
import { overviewLinks, exploreLinks, type NavItem } from "@/lib/site";

/* Public site chrome — navbar (with live mega-menus), footer, quote provider,
   mobile CTA bar and back-to-top. Shared by the (site) layout and the global
   not-found page so a 404 at any URL still gets the full site framing. */
export async function SiteChrome({
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
