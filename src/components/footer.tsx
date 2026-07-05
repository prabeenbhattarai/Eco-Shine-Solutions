import Link from "next/link";
import { Mail, MapPin, Phone, Clock, Leaf, ShieldCheck, BadgeCheck } from "lucide-react";
import { Logo } from "@/components/logo";
import { services, site } from "@/lib/site";

const FOOTER_SERVICE_COUNT = 6;

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Sector", href: "/sectors" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Get a Quote", href: "/quote" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="container-page grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand + contact */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            {site.tagline}. Eco-certified, fully insured and police-checked cleaning
            you can trust.
          </p>
          <div className="mt-5 flex flex-col gap-2.5 text-sm">
            <a href={site.phoneHref} className="flex items-center gap-2.5 text-foreground hover:text-brand-600">
              <Phone className="h-4 w-4 text-brand-600" />
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 text-foreground hover:text-brand-600">
              <Mail className="h-4 w-4 text-brand-600" />
              {site.email}
            </a>
            <span className="flex items-center gap-2.5 text-muted">
              <MapPin className="h-4 w-4 text-brand-600" />
              {site.address}
            </span>
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            Services
          </h3>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm">
            {services.slice(0, FOOTER_SERVICE_COUNT).map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="text-muted transition-colors hover:text-brand-600">
                  {s.short}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/services" className="font-semibold text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-300">
                View all services
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            Company
          </h3>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm">
            {companyLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-muted transition-colors hover:text-brand-600">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-foreground">
            <Clock className="h-4 w-4 text-brand-600" />
            Opening Hours
          </h3>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm">
            {site.hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-3 text-muted">
                <span>{h.day}</span>
                <span className="font-medium text-foreground">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Trust badges */}
      <div className="border-t border-border">
        <div className="container-page flex flex-wrap items-center justify-center gap-x-6 gap-y-3 py-5 text-xs font-medium text-muted">
          <span className="flex items-center gap-1.5"><Leaf className="h-4 w-4 text-eco-500" /> Eco-Certified</span>
          <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-brand-600" /> Fully Insured</span>
          <span className="flex items-center gap-1.5"><BadgeCheck className="h-4 w-4 text-brand-600" /> Police-Checked Staff</span>
          <span>BSCAA Member</span>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
          <ul className="flex items-center gap-5">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-brand-600">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
