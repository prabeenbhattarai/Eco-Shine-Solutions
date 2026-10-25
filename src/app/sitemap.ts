import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getServices, getSectors, getBlogPosts } from "@/lib/content";

const BASE = site.url.replace(/\/$/, "");

type Freq = "weekly" | "monthly" | "yearly";

/* XML sitemap for Google/Bing — every indexable page, including the dynamic
   service, sector and blog routes, generated from the live content store. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [services, sectors, posts] = await Promise.all([
    getServices(),
    getSectors(),
    getBlogPosts(),
  ]);

  const staticPages: { path: string; priority: number; freq: Freq }[] = [
    { path: "", priority: 1, freq: "weekly" },
    { path: "/services", priority: 0.9, freq: "weekly" },
    { path: "/sectors", priority: 0.9, freq: "weekly" },
    { path: "/quote", priority: 0.9, freq: "monthly" },
    { path: "/service-areas", priority: 0.8, freq: "monthly" },
    { path: "/contact", priority: 0.8, freq: "monthly" },
    { path: "/about", priority: 0.7, freq: "monthly" },
    { path: "/blog", priority: 0.7, freq: "weekly" },
    { path: "/gallery", priority: 0.5, freq: "monthly" },
    { path: "/careers", priority: 0.4, freq: "monthly" },
    { path: "/privacy-policy", priority: 0.2, freq: "yearly" },
    { path: "/terms", priority: 0.2, freq: "yearly" },
  ];

  const entries: MetadataRoute.Sitemap = staticPages.map((p) => ({
    url: `${BASE}${p.path}`,
    lastModified: now,
    changeFrequency: p.freq,
    priority: p.priority,
  }));

  for (const s of services) {
    entries.push({
      url: `${BASE}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }
  for (const s of sectors) {
    entries.push({
      url: `${BASE}/sectors/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }
  for (const p of posts) {
    entries.push({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: p.date ? new Date(p.date) : now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return entries;
}
