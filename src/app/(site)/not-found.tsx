import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-7xl font-bold text-gradient-brand">404</p>
      <h1 className="mt-4 max-w-md text-2xl font-bold text-foreground">
        Oops! The content you&apos;re searching for wasn&apos;t found.
      </h1>
      <p className="mt-2 max-w-md text-muted">
        The page may have moved or no longer exists.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/">Back to Home</ButtonLink>
        <ButtonLink href="/services" variant="secondary">
          View Services
        </ButtonLink>
      </div>
    </section>
  );
}
