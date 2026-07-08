"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  FileText,
  Newspaper,
  Images,
  Briefcase,
  Settings,
  SprayCan,
  Building2,
  Quote,
  HelpCircle,
  BadgeCheck,
  type LucideIcon,
} from "lucide-react";

type NavLink = { href: string; label: string; icon: LucideIcon };

const groups: { heading?: string; links: NavLink[] }[] = [
  {
    links: [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    heading: "Content",
    links: [
      { href: "/admin/homepage", label: "Homepage", icon: Home },
      { href: "/admin/pages", label: "Page Titles", icon: FileText },
      { href: "/admin/services", label: "Services", icon: SprayCan },
      { href: "/admin/sectors", label: "Sectors", icon: Building2 },
    ],
  },
  {
    heading: "Collections",
    links: [
      { href: "/admin/blog", label: "Blog", icon: Newspaper },
      { href: "/admin/gallery", label: "Gallery", icon: Images },
      { href: "/admin/jobs", label: "Jobs", icon: Briefcase },
      { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
      { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
      { href: "/admin/logos", label: "Trusted Logos", icon: BadgeCheck },
    ],
  },
  {
    heading: "Setup",
    links: [{ href: "/admin/settings", label: "Settings", icon: Settings }],
  },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 overflow-x-auto lg:flex-col lg:gap-0">
      {groups.map((group, gi) => (
        <div key={gi} className="flex shrink-0 gap-1 lg:flex-col lg:gap-1">
          {group.heading && (
            <p className="hidden px-3.5 pb-1 pt-4 text-[11px] font-bold uppercase tracking-wider text-muted lg:block">
              {group.heading}
            </p>
          )}
          {group.links.map((link) => {
            const Icon = link.icon;
            const active =
              link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`inline-flex shrink-0 items-center gap-2.5 rounded-btn px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                  active ? "bg-brand-600 text-white" : "text-foreground hover:bg-surface-2"
                }`}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
