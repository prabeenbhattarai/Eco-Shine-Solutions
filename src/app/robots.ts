import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const BASE = site.url.replace(/\/$/, "");

/* Allow all crawlers (including AI/answer-engine bots), keep the admin panel out
   of the index, and point every bot at the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/ecoshine_admin_panel", "/ecoshine_admin_panel/"],
    },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
