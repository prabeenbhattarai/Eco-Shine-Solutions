import Link from "next/link";
import {
  ArrowRight,
  Newspaper,
  Images,
  Briefcase,
  Home,
  FileText,
  Settings,
  Quote,
  HelpCircle,
  BadgeCheck,
  SprayCan,
  Building2,
  MapPin,
  Inbox,
  ExternalLink,
  ClipboardList,
  Mail,
  Info,
} from "lucide-react";
import {
  getBlogPosts,
  getGallery,
  getJobs,
  getTestimonials,
  getFaqs,
  getTrustedLogos,
  getSubmissions,
  getServices,
  getSectors,
} from "@/lib/content";
import { cardCls, secondaryBtnCls } from "@/components/admin/ui";

const BASE = "/ecoshine_admin_panel";

/** Compact "2h ago" style relative time. */
function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  return new Date(iso).toLocaleDateString("en-AU", { day: "numeric", month: "short" });
}

export default async function AdminDashboardPage() {
  const [posts, gallery, jobs, testimonials, faqs, logos, submissions, services, sectors] =
    await Promise.all([
      getBlogPosts(),
      getGallery(),
      getJobs(),
      getTestimonials(),
      getFaqs(),
      getTrustedLogos(),
      getSubmissions(),
      getServices(),
      getSectors(),
    ]);

  const unread = submissions.filter((s) => !s.read).length;
  const recent = submissions.slice(0, 6);

  const contentStats = [
    { label: "Services", value: services.length, href: `${BASE}/services`, icon: SprayCan },
    { label: "Sectors", value: sectors.length, href: `${BASE}/sectors`, icon: Building2 },
    { label: "Blog posts", value: posts.length, href: `${BASE}/blog`, icon: Newspaper },
    { label: "Gallery images", value: gallery.shots.length, href: `${BASE}/gallery`, icon: Images },
    {
      label: "Active job openings",
      value: jobs.filter((j) => j.active).length,
      href: `${BASE}/jobs`,
      icon: Briefcase,
    },
    { label: "Testimonials", value: testimonials.length, href: `${BASE}/testimonials`, icon: Quote },
    { label: "FAQs", value: faqs.length, href: `${BASE}/faqs`, icon: HelpCircle },
    { label: "Trusted logos", value: logos.length, href: `${BASE}/logos`, icon: BadgeCheck },
  ];

  const shortcuts = [
    { label: "Edit homepage sections", href: `${BASE}/homepage`, icon: Home },
    { label: "Edit the About page", href: `${BASE}/about`, icon: Info },
    { label: "Add or edit a service", href: `${BASE}/services`, icon: SprayCan },
    { label: "Manage service areas", href: `${BASE}/service-areas`, icon: MapPin },
    { label: "Write a blog post", href: `${BASE}/blog/new`, icon: Newspaper },
    { label: "Page titles & SEO", href: `${BASE}/pages`, icon: FileText },
    { label: "Upload gallery images", href: `${BASE}/gallery`, icon: Images },
    { label: "Contact, social & footer", href: `${BASE}/settings`, icon: Settings },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="mt-1 text-sm text-muted">
            Welcome back. Manage your website content — changes go live the moment you save.
          </p>
        </div>
        <Link href="/" target="_blank" className={secondaryBtnCls}>
          <ExternalLink className="h-4 w-4" />
          View live site
        </Link>
      </div>

      {/* Unread enquiries alert */}
      {unread > 0 && (
        <Link
          href={`${BASE}/enquiries`}
          className="mt-6 flex items-center gap-4 rounded-card border border-brand-300 bg-brand-50 p-4 transition-colors hover:bg-brand-100 dark:border-brand-400/30 dark:bg-brand-600/10 dark:hover:bg-brand-600/20"
        >
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
            <Inbox className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-brand-800 dark:text-brand-200">
              You have {unread} new {unread === 1 ? "enquiry" : "enquiries"} to review
            </p>
            <p className="text-xs text-brand-700/80 dark:text-brand-300/80">
              New quote requests and contact messages from the website.
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-brand-700 dark:text-brand-300">
            Review <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
      )}

      {/* Recent enquiries + content overview */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent enquiries */}
        <section className={`${cardCls} lg:col-span-2`}>
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-base font-bold text-foreground">Recent enquiries</h2>
            <Link
              href={`${BASE}/enquiries`}
              className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-300"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {recent.length === 0 ? (
            <div className="flex flex-col items-center py-12 text-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-surface-2 text-muted">
                <Inbox className="h-6 w-6" />
              </span>
              <p className="mt-3 text-sm font-semibold text-foreground">No enquiries yet</p>
              <p className="mt-1 max-w-xs text-xs text-muted">
                Contact and quote submissions from the website will appear here.
              </p>
            </div>
          ) : (
            <ul className="mt-2 divide-y divide-border">
              {recent.map((s) => {
                const isQuote = s.kind === "quote";
                return (
                  <li key={s.id}>
                    <Link
                      href={`${BASE}/enquiries`}
                      className="flex items-center gap-3 rounded-btn px-1 py-3 transition-colors hover:bg-surface-2"
                    >
                      <span
                        className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                          isQuote
                            ? "bg-brand-50 text-brand-600 dark:bg-brand-600/15 dark:text-brand-300"
                            : "bg-eco-500/15 text-eco-600"
                        }`}
                      >
                        {isQuote ? (
                          <ClipboardList className="h-4 w-4" />
                        ) : (
                          <Mail className="h-4 w-4" />
                        )}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="truncate text-sm font-bold text-foreground">{s.name}</p>
                          {!s.read && (
                            <span className="h-2 w-2 shrink-0 rounded-full bg-red-500" aria-label="unread" />
                          )}
                        </div>
                        <p className="truncate text-xs text-muted">
                          {isQuote ? "Quote request" : "Contact"} · {s.subject}
                        </p>
                      </div>
                      <span className="shrink-0 text-xs text-muted">{timeAgo(s.createdAt)}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {/* Content overview */}
        <section className={cardCls}>
          <h2 className="text-base font-bold text-foreground">Content overview</h2>
          <ul className="mt-2 divide-y divide-border">
            {contentStats.map((c) => {
              const Icon = c.icon;
              return (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="flex items-center justify-between gap-3 rounded-btn px-1 py-2.5 transition-colors hover:bg-surface-2"
                  >
                    <span className="inline-flex items-center gap-2.5 text-sm font-medium text-foreground">
                      <Icon className="h-4 w-4 text-brand-600 dark:text-brand-300" />
                      {c.label}
                    </span>
                    <span className="text-sm font-bold tabular-nums text-foreground">{c.value}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      {/* Quick actions */}
      <h2 className="mt-10 text-lg font-bold text-foreground">Quick actions</h2>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {shortcuts.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.label}
              href={s.href}
              className="group flex items-center justify-between gap-2 rounded-card border border-border bg-card p-4 transition-all hover:border-brand-300 hover:shadow-sm"
            >
              <span className="inline-flex min-w-0 items-center gap-2.5 text-sm font-semibold text-foreground">
                <Icon className="h-4 w-4 shrink-0 text-brand-600 dark:text-brand-300" />
                <span className="truncate">{s.label}</span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
