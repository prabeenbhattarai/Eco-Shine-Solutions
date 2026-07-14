import { SiteChrome } from "@/components/site-chrome";
import { ButtonLink } from "@/components/ui/button";

/* Global 404 — catches every unmatched URL (this lives at the app root, above
   the (site) layout, so it also covers paths like /admin). Wrapped in the shared
   SiteChrome so the navbar and footer show here too. */
export default function NotFound() {
  return (
    <SiteChrome>
      <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p className="text-7xl font-bold text-gradient-brand sm:text-8xl">404</p>
        <h1 className="mt-4 max-w-md text-2xl font-bold text-foreground sm:text-3xl">
          Oops! The content you&apos;re searching for wasn&apos;t found.
        </h1>
        <p className="mt-3 max-w-sm text-muted">
          The page may have moved or never existed. Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/">Back to Home</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact Us
          </ButtonLink>
        </div>
      </section>
    </SiteChrome>
  );
}
