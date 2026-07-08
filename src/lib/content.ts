import "server-only";
import { readContent } from "@/lib/content-store";
import {
  site,
  galleryShots,
  services as defaultServices,
  sectors as defaultSectors,
  testimonials as defaultTestimonials,
  faqs as defaultFaqs,
  type Service,
  type Sector,
} from "@/lib/site";
import { blogPosts as defaultPosts, type BlogPost } from "@/lib/blog";

/* Admin-editable content, typed. Every getter returns the stored JSON if an
   admin has saved one, otherwise the baked-in default from the codebase - so
   the site renders fully even before the first admin edit. */

export type SiteSettings = {
  phone: string;
  phoneSecondary: string;
  email: string;
  whatsapp: string;
  address: string;
  footerBlurb: string;
  hours: { day: string; time: string }[];
  social: { facebook: string; instagram: string; linkedin: string };
  /** Derived, always recomputed from phone. */
  phoneHref: string;
};

export type HomepageContent = {
  hero: {
    badge: string;
    titlePre: string;
    titleHighlight: string;
    titlePost: string;
    description: string;
    image: string;
    imageAlt: string;
    ratingValue: string;
    ratingNote: string;
  };
};

export type GalleryContent = { shots: { src: string; alt: string }[] };

export type Job = {
  id: string;
  title: string;
  location: string;
  type: string; // Full-time, Part-time, Casual
  description: string;
  active: boolean;
  postedAt: string; // ISO date
};

export type PageHeroContent = { title: string; subtitle: string };

/** Pages whose hero title/subtitle are editable from the admin panel. */
export const editablePages = [
  { key: "about", label: "About" },
  { key: "services", label: "Services" },
  { key: "sectors", label: "Sectors" },
  { key: "service-areas", label: "Service Areas" },
  { key: "gallery", label: "Gallery" },
  { key: "blog", label: "Blog" },
  { key: "careers", label: "Careers" },
  { key: "contact", label: "Contact" },
  { key: "quote", label: "Get a Quote" },
] as const;

const defaultSettings: Omit<SiteSettings, "phoneHref"> = {
  phone: site.phone,
  phoneSecondary: site.phoneSecondary,
  email: site.email,
  whatsapp: site.whatsapp,
  address: site.address,
  footerBlurb: `${site.tagline}. Eco-certified, fully insured and police-checked cleaning you can trust.`,
  hours: [...site.hours],
  social: { ...site.social },
};

const defaultHomepage: HomepageContent = {
  hero: {
    badge: "Eco-certified, insured and police-checked",
    titlePre: "Eco-Friendly",
    titleHighlight: "Commercial Cleaning",
    titlePost: "Across Australia",
    description:
      "From childcare and healthcare to hospitality, offices and government sites, our trusted local teams deliver eco-certified cleans using plant-based products. Now servicing New South Wales, Western Australia and Tasmania, with the ACT launching 1 July 2026.",
    image: "/images/hero-window-cleaning-sydney.jpg",
    imageAlt: "Ecoshine cleaner delivering eco-friendly commercial cleaning",
    ratingValue: "4.9 out of 5",
    ratingNote: "from 300+ reviews",
  },
};

export async function getSettings(): Promise<SiteSettings> {
  const stored = await readContent("settings", defaultSettings);
  const phone = stored.phone || defaultSettings.phone;
  return {
    ...defaultSettings,
    ...stored,
    phone,
    phoneHref: `tel:+61${phone.replace(/\D/g, "").replace(/^0/, "")}`,
  };
}

export async function getHomepage(): Promise<HomepageContent> {
  const stored = await readContent("homepage", defaultHomepage);
  return { hero: { ...defaultHomepage.hero, ...stored.hero } };
}

export async function getGallery(): Promise<GalleryContent> {
  return readContent("gallery", { shots: [...galleryShots] });
}

export async function getJobs(): Promise<Job[]> {
  const { jobs } = await readContent<{ jobs: Job[] }>("jobs", { jobs: [] });
  return jobs;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const { posts } = await readContent<{ posts: BlogPost[] }>("blog", {
    posts: defaultPosts,
  });
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug);
}

export async function getPageHero(
  key: string,
  fallback: PageHeroContent
): Promise<PageHeroContent> {
  const { heroes } = await readContent<{ heroes: Record<string, PageHeroContent> }>(
    "pages",
    { heroes: {} }
  );
  return heroes[key] ?? fallback;
}

export async function getAllPageHeroes(): Promise<Record<string, PageHeroContent>> {
  const { heroes } = await readContent<{ heroes: Record<string, PageHeroContent> }>(
    "pages",
    { heroes: {} }
  );
  return heroes;
}

/* ---------- services & sectors (text/image overrides over code defaults) ---------- */

/** Editable fields of a service; slug, category and icon stay code-defined. */
export type ServiceOverride = {
  title?: string;
  short?: string;
  blurb?: string;
  image?: string;
  imageAlt?: string;
};

export type SectorOverride = {
  name?: string;
  blurb?: string;
  image?: string;
  imageAlt?: string;
};

/** Service without its icon component - safe to pass to client components. */
export type PlainService = Omit<Service, "icon">;
export type PlainSector = Omit<Sector, "icon">;

export async function getServices(): Promise<Service[]> {
  const { overrides } = await readContent<{ overrides: Record<string, ServiceOverride> }>(
    "services",
    { overrides: {} }
  );
  return defaultServices.map((s) => {
    const o = overrides[s.slug];
    if (!o) return s;
    return {
      ...s,
      title: o.title?.trim() || s.title,
      short: o.short?.trim() || s.short,
      blurb: o.blurb?.trim() || s.blurb,
      image: o.image?.trim() || s.image,
      imageAlt: o.imageAlt?.trim() || s.imageAlt,
    };
  });
}

export async function getSectors(): Promise<Sector[]> {
  const { overrides } = await readContent<{ overrides: Record<string, SectorOverride> }>(
    "sectors",
    { overrides: {} }
  );
  return defaultSectors.map((s) => {
    const o = overrides[s.slug];
    if (!o) return s;
    return {
      ...s,
      name: o.name?.trim() || s.name,
      blurb: o.blurb?.trim() || s.blurb,
      image: o.image?.trim() || s.image,
      imageAlt: o.imageAlt?.trim() || s.imageAlt,
    };
  });
}

/* ---------- testimonials ---------- */

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  service: string;
  rating: number;
  text: string;
};

const seededTestimonials: Testimonial[] = defaultTestimonials.map((t, i) => ({
  id: `t-${i + 1}`,
  ...t,
}));

export async function getTestimonials(): Promise<Testimonial[]> {
  const { items } = await readContent<{ items: Testimonial[] }>("testimonials", {
    items: seededTestimonials,
  });
  return items;
}

/* ---------- FAQs ---------- */

export type FaqItem = { id: string; question: string; answer: string };

const seededFaqs: FaqItem[] = defaultFaqs.map((f, i) => ({ id: `faq-${i + 1}`, ...f }));

export async function getFaqs(): Promise<FaqItem[]> {
  const { items } = await readContent<{ items: FaqItem[] }>("faqs", { items: seededFaqs });
  return items;
}

/* ---------- trusted-by logos ---------- */

export type TrustedLogo = { src: string; name: string };

const defaultTrustedLogos: TrustedLogo[] = [
  { name: "OnePlayground", src: "/images/logos/oneplayground.png" },
  { name: "M Collective", src: "/images/logos/m-logo.png" },
  { name: "Jetstar", src: "/images/logos/jetstar.png" },
];

export async function getTrustedLogos(): Promise<TrustedLogo[]> {
  const { logos } = await readContent<{ logos: TrustedLogo[] }>("trusted", {
    logos: defaultTrustedLogos,
  });
  return logos;
}

/** Blog categories are sourced from live service and sector names. */
export async function getBlogCategories(): Promise<string[]> {
  const [services, sectors] = await Promise.all([getServices(), getSectors()]);
  const set = new Set<string>();
  for (const s of services) set.add(s.short);
  for (const s of sectors) set.add(s.name);
  return [...set];
}
