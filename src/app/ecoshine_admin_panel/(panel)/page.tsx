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
  Inbox,
} from "lucide-react";
import { getBlogPosts, getGallery, getJobs, getTestimonials, getFaqs, getTrustedLogos, getSubmissions } from "@/lib/content";
import { cardCls } from "@/components/admin/ui";

export default async function AdminDashboardPage() {
  const [posts, gallery, jobs, testimonials, faqs, logos, submissions] = await Promise.all([
    getBlogPosts(),
    getGallery(),
    getJobs(),
    getTestimonials(),
    getFaqs(),
    getTrustedLogos(),
    getSubmissions(),
  ]);

  const unreadEnquiries = submissions.filter((s) => !s.read).length;

  const stats = [
    {
      label: unreadEnquiries > 0 ? `Enquiries (${unreadEnquiries} new)` : "Enquiries",
      value: submissions.length,
      href: "/ecoshine_admin_panel/enquiries",
      icon: Inbox,
    },
    { label: "Blog Posts", value: posts.length, href: "/ecoshine_admin_panel/blog", icon: Newspaper },
    { label: "Gallery Images", value: gallery.shots.length, href: "/ecoshine_admin_panel/gallery", icon: Images },
    {
      label: "Active Job Openings",
      value: jobs.filter((j) => j.active).length,
      href: "/ecoshine_admin_panel/jobs",
      icon: Briefcase,
    },
    { label: "Testimonials", value: testimonials.length, href: "/ecoshine_admin_panel/testimonials", icon: Quote },
    { label: "FAQs", value: faqs.length, href: "/ecoshine_admin_panel/faqs", icon: HelpCircle },
    { label: "Trusted Logos", value: logos.length, href: "/ecoshine_admin_panel/logos", icon: BadgeCheck },
  ];

  const shortcuts = [
    { label: "View enquiries", href: "/ecoshine_admin_panel/enquiries", icon: Inbox },
    { label: "Edit homepage sections", href: "/ecoshine_admin_panel/homepage", icon: Home },
    { label: "Edit page titles", href: "/ecoshine_admin_panel/pages", icon: FileText },
    { label: "Edit services", href: "/ecoshine_admin_panel/services", icon: SprayCan },
    { label: "Edit sectors", href: "/ecoshine_admin_panel/sectors", icon: Building2 },
    { label: "Write a blog post", href: "/ecoshine_admin_panel/blog/new", icon: Newspaper },
    { label: "Upload gallery images", href: "/ecoshine_admin_panel/gallery", icon: Images },
    { label: "Post a job vacancy", href: "/ecoshine_admin_panel/jobs", icon: Briefcase },
    { label: "Contact, social & footer", href: "/ecoshine_admin_panel/settings", icon: Settings },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
      <p className="mt-1 text-sm text-muted">
        Manage the Ecoshine website content. Changes go live as soon as you save.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link key={s.href} href={s.href} className={`${cardCls} transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md`}>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-600/15 dark:text-brand-300">
                <Icon className="h-5 w-5" />
              </span>
              <p className="mt-3 text-3xl font-bold text-foreground">{s.value}</p>
              <p className="mt-0.5 text-sm font-medium text-muted">{s.label}</p>
            </Link>
          );
        })}
      </div>

      <h2 className="mt-10 text-lg font-bold text-foreground">Quick Actions</h2>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {shortcuts.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.label}
              href={s.href}
              className="group flex items-center justify-between rounded-card border border-border bg-card p-4 transition-all hover:border-brand-300 hover:shadow-sm"
            >
              <span className="inline-flex items-center gap-3 text-sm font-semibold text-foreground">
                <Icon className="h-4 w-4 text-brand-600 dark:text-brand-300" />
                {s.label}
              </span>
              <ArrowRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
