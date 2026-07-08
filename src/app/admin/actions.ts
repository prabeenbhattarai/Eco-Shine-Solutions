"use server";

import { promises as fs } from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createAdminSession,
  destroyAdminSession,
  requireAdmin,
  verifyCredentials,
} from "@/lib/admin-auth";
import { readContent, writeContent } from "@/lib/content-store";
import {
  getBlogPosts,
  getGallery,
  getHomepage,
  getJobs,
  getSettings,
  getTestimonials,
  getFaqs,
  getTrustedLogos,
  editablePages,
  type Job,
  type PageHeroContent,
  type ServiceOverride,
  type SectorOverride,
  type Testimonial,
  type FaqItem,
} from "@/lib/content";
import {
  required,
  isEmail,
  isUrl,
  isAuPhone,
  isIsoDate,
  isRating,
  maxLen,
  validateAll,
} from "@/lib/validate";
import { textToBlocks } from "@/lib/blog-format";
import type { BlogPost } from "@/lib/blog";

/* ---------- helpers ---------- */

const ALLOWED_IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/avif": ".avif",
};
const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

/** Returns an error string when the file is not an acceptable image. */
function validateImage(file: File): string | null {
  if (!ALLOWED_IMAGE_TYPES[file.type]) {
    return `unsupported image type (use JPG, PNG, WebP or AVIF)`;
  }
  if (file.size > MAX_UPLOAD_BYTES) return "image is larger than 8MB";
  return null;
}

/** Redirects back to `path` with a readable error message. */
function fail(path: string, message: string): never {
  redirect(`${path}?error=${encodeURIComponent(message)}`);
}

/** Saves an uploaded image to public/uploads and returns its public path.
    Call validateImage() first. */
async function saveUpload(file: File): Promise<string> {
  const ext = ALLOWED_IMAGE_TYPES[file.type];
  if (!ext) throw new Error(`Unsupported image type: ${file.type || "unknown"}`);
  if (file.size > MAX_UPLOAD_BYTES) throw new Error("Image is larger than 8MB.");

  const base = path
    .basename(file.name, path.extname(file.name))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "image";
  const name = `${Date.now()}-${base}${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));
  return `/uploads/${name}`;
}

function field(formData: FormData, name: string): string {
  const v = formData.get(name);
  return typeof v === "string" ? v.trim() : "";
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function dateLabelFor(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });
}

/** Blow the whole page cache; simplest correct choice for a small site. */
function revalidateSite() {
  revalidatePath("/", "layout");
}

/* ---------- auth ---------- */

export async function loginAction(formData: FormData) {
  const email = field(formData, "email");
  const password = typeof formData.get("password") === "string" ? (formData.get("password") as string) : "";
  if (!verifyCredentials(email, password)) redirect("/admin/login?error=1");
  await createAdminSession();
  redirect("/admin");
}

export async function logoutAction() {
  await destroyAdminSession();
  redirect("/admin/login");
}

/* ---------- homepage ---------- */

export async function saveHomepageAction(formData: FormData) {
  await requireAdmin();
  const current = await getHomepage();

  const err = validateAll(
    required(field(formData, "badge"), "Badge text"),
    required(field(formData, "titlePre"), "Heading (first part)"),
    required(field(formData, "titleHighlight"), "Heading (highlighted part)"),
    required(field(formData, "description"), "Description"),
    maxLen(field(formData, "badge"), 80, "Badge text")
  );
  if (err) fail("/admin/homepage", err);

  let image = field(formData, "image") || current.hero.image;
  const file = formData.get("imageFile");
  if (file instanceof File && file.size > 0) {
    const imgErr = validateImage(file);
    if (imgErr) fail("/admin/homepage", `Hero image ${imgErr}`);
    image = await saveUpload(file);
  }

  await writeContent("homepage", {
    hero: {
      badge: field(formData, "badge") || current.hero.badge,
      titlePre: field(formData, "titlePre") || current.hero.titlePre,
      titleHighlight: field(formData, "titleHighlight") || current.hero.titleHighlight,
      titlePost: field(formData, "titlePost") || current.hero.titlePost,
      description: field(formData, "description") || current.hero.description,
      image,
      imageAlt: field(formData, "imageAlt") || current.hero.imageAlt,
      ratingValue: field(formData, "ratingValue") || current.hero.ratingValue,
      ratingNote: field(formData, "ratingNote") || current.hero.ratingNote,
    },
  });
  revalidateSite();
  redirect("/admin/homepage?saved=1");
}

/* ---------- page heroes ---------- */

export async function savePagesAction(formData: FormData) {
  await requireAdmin();
  const heroes: Record<string, PageHeroContent> = {};
  for (const page of editablePages) {
    const title = field(formData, `${page.key}-title`);
    const subtitle = field(formData, `${page.key}-subtitle`);
    if (title || subtitle) heroes[page.key] = { title, subtitle };
  }
  await writeContent("pages", { heroes });
  revalidateSite();
  redirect("/admin/pages?saved=1");
}

/* ---------- settings ---------- */

export async function saveSettingsAction(formData: FormData) {
  await requireAdmin();
  const current = await getSettings();

  const err = validateAll(
    required(field(formData, "phone"), "Phone"),
    isAuPhone(field(formData, "phone"), "Phone"),
    isAuPhone(field(formData, "phoneSecondary"), "Secondary phone"),
    required(field(formData, "email"), "Email"),
    isEmail(field(formData, "email"), "Email"),
    isUrl(field(formData, "whatsapp"), "WhatsApp link"),
    required(field(formData, "address"), "Address"),
    isUrl(field(formData, "facebook"), "Facebook URL"),
    isUrl(field(formData, "instagram"), "Instagram URL"),
    isUrl(field(formData, "linkedin"), "LinkedIn URL")
  );
  if (err) fail("/admin/settings", err);

  const hours = [0, 1, 2].map((i) => ({
    day: field(formData, `hours-day-${i}`) || current.hours[i]?.day || "",
    time: field(formData, `hours-time-${i}`) || current.hours[i]?.time || "",
  }));

  await writeContent("settings", {
    phone: field(formData, "phone") || current.phone,
    phoneSecondary: field(formData, "phoneSecondary"),
    email: field(formData, "email") || current.email,
    whatsapp: field(formData, "whatsapp") || current.whatsapp,
    address: field(formData, "address") || current.address,
    footerBlurb: field(formData, "footerBlurb") || current.footerBlurb,
    hours,
    social: {
      facebook: field(formData, "facebook") || "#",
      instagram: field(formData, "instagram") || "#",
      linkedin: field(formData, "linkedin") || "#",
    },
  });
  revalidateSite();
  redirect("/admin/settings?saved=1");
}

/* ---------- gallery ---------- */

export async function addGalleryImageAction(formData: FormData) {
  await requireAdmin();
  const file = formData.get("imageFile");
  if (!(file instanceof File) || file.size === 0) fail("/admin/gallery", "Choose an image to upload");
  const imgErr = validateImage(file);
  if (imgErr) fail("/admin/gallery", `Image ${imgErr}`);
  const src = await saveUpload(file);
  const alt = field(formData, "alt") || "Ecoshine Solution cleaning team at work";

  const gallery = await getGallery();
  await writeContent("gallery", { shots: [{ src, alt }, ...gallery.shots] });
  revalidateSite();
  redirect("/admin/gallery?saved=1");
}

export async function deleteGalleryImageAction(formData: FormData) {
  await requireAdmin();
  const src = field(formData, "src");
  const gallery = await getGallery();
  await writeContent("gallery", { shots: gallery.shots.filter((s) => s.src !== src) });
  if (src.startsWith("/uploads/")) {
    await fs.unlink(path.join(process.cwd(), "public", src)).catch(() => {});
  }
  revalidateSite();
  redirect("/admin/gallery?saved=1");
}

/* ---------- jobs ---------- */

export async function saveJobAction(formData: FormData) {
  await requireAdmin();
  const jobs = await getJobs();
  const id = field(formData, "id") || `job-${Date.now()}`;
  const existing = jobs.find((j) => j.id === id);

  const err = validateAll(
    required(field(formData, "title"), "Job title"),
    maxLen(field(formData, "title"), 100, "Job title"),
    required(field(formData, "location"), "Location"),
    required(field(formData, "description"), "Description")
  );
  if (err) fail("/admin/jobs", err);

  const job: Job = {
    id,
    title: field(formData, "title"),
    location: field(formData, "location"),
    type: field(formData, "type") || "Full-time",
    description: field(formData, "description"),
    active: formData.get("active") === "on",
    postedAt: existing?.postedAt ?? new Date().toISOString().slice(0, 10),
  };

  const next = existing ? jobs.map((j) => (j.id === id ? job : j)) : [job, ...jobs];
  await writeContent("jobs", { jobs: next });
  revalidateSite();
  redirect("/admin/jobs?saved=1");
}

export async function deleteJobAction(formData: FormData) {
  await requireAdmin();
  const id = field(formData, "id");
  const jobs = await getJobs();
  await writeContent("jobs", { jobs: jobs.filter((j) => j.id !== id) });
  revalidateSite();
  redirect("/admin/jobs?saved=1");
}

/* ---------- blog ---------- */

export async function saveBlogPostAction(formData: FormData) {
  await requireAdmin();
  const posts = await getBlogPosts();

  const originalSlug = field(formData, "originalSlug");
  const title = field(formData, "title");
  const backPath = originalSlug ? `/admin/blog/${originalSlug}` : "/admin/blog/new";

  const err = validateAll(
    required(title, "Title"),
    maxLen(title, 120, "Title"),
    required(field(formData, "excerpt"), "Excerpt"),
    maxLen(field(formData, "excerpt"), 300, "Excerpt"),
    required(field(formData, "category"), "Category"),
    required(field(formData, "body"), "Article body"),
    isIsoDate(field(formData, "date"), "Publish date")
  );
  if (err) fail(backPath, err);

  const slug = originalSlug || slugify(field(formData, "slug") || title);
  if (!slug) fail(backPath, "Could not build a URL slug from the title");
  if (!originalSlug && posts.some((p) => p.slug === slug)) {
    fail(backPath, `A post with the slug "${slug}" already exists`);
  }
  const existing = posts.find((p) => p.slug === originalSlug);

  let image = field(formData, "image") || existing?.image || "/images/ecoshine-cleaning-team.jpg";
  const file = formData.get("imageFile");
  if (file instanceof File && file.size > 0) {
    const imgErr = validateImage(file);
    if (imgErr) fail(backPath, `Cover image ${imgErr}`);
    image = await saveUpload(file);
  }

  const date = field(formData, "date") || existing?.date || new Date().toISOString().slice(0, 10);

  const post: BlogPost = {
    slug,
    title,
    excerpt: field(formData, "excerpt"),
    category: field(formData, "category") || "Commercial Cleaning",
    date,
    dateLabel: dateLabelFor(date),
    readTime: field(formData, "readTime") || "4 min read",
    image,
    imageAlt: field(formData, "imageAlt") || title,
    blocks: textToBlocks(field(formData, "body")),
  };

  const next = existing ? posts.map((p) => (p.slug === originalSlug ? post : p)) : [post, ...posts];
  await writeContent("blog", { posts: next });
  revalidateSite();
  redirect("/admin/blog?saved=1");
}

export async function deleteBlogPostAction(formData: FormData) {
  await requireAdmin();
  const slug = field(formData, "slug");
  const posts = await getBlogPosts();
  await writeContent("blog", { posts: posts.filter((p) => p.slug !== slug) });
  revalidateSite();
  redirect("/admin/blog?saved=1");
}

/* ---------- services & sectors (text/image overrides) ---------- */

export async function saveServiceAction(formData: FormData) {
  await requireAdmin();
  const slug = field(formData, "slug");
  if (!slug) fail("/admin/services", "Missing service reference");

  const err = validateAll(
    required(field(formData, "title"), "Title"),
    required(field(formData, "short"), "Short name"),
    maxLen(field(formData, "short"), 40, "Short name"),
    required(field(formData, "blurb"), "Description"),
    maxLen(field(formData, "blurb"), 200, "Description")
  );
  if (err) fail("/admin/services", err);

  const { overrides } = await readContent<{ overrides: Record<string, ServiceOverride> }>(
    "services",
    { overrides: {} }
  );

  let image = field(formData, "image");
  const file = formData.get("imageFile");
  if (file instanceof File && file.size > 0) {
    const imgErr = validateImage(file);
    if (imgErr) fail("/admin/services", `Image ${imgErr}`);
    image = await saveUpload(file);
  }

  overrides[slug] = {
    title: field(formData, "title"),
    short: field(formData, "short"),
    blurb: field(formData, "blurb"),
    image,
    imageAlt: field(formData, "imageAlt"),
  };
  await writeContent("services", { overrides });
  revalidateSite();
  redirect("/admin/services?saved=1");
}

export async function saveSectorAction(formData: FormData) {
  await requireAdmin();
  const slug = field(formData, "slug");
  if (!slug) fail("/admin/sectors", "Missing sector reference");

  const err = validateAll(
    required(field(formData, "name"), "Name"),
    maxLen(field(formData, "name"), 50, "Name"),
    required(field(formData, "blurb"), "Description"),
    maxLen(field(formData, "blurb"), 200, "Description")
  );
  if (err) fail("/admin/sectors", err);

  const { overrides } = await readContent<{ overrides: Record<string, SectorOverride> }>(
    "sectors",
    { overrides: {} }
  );

  let image = field(formData, "image");
  const file = formData.get("imageFile");
  if (file instanceof File && file.size > 0) {
    const imgErr = validateImage(file);
    if (imgErr) fail("/admin/sectors", `Image ${imgErr}`);
    image = await saveUpload(file);
  }

  overrides[slug] = {
    name: field(formData, "name"),
    blurb: field(formData, "blurb"),
    image,
    imageAlt: field(formData, "imageAlt"),
  };
  await writeContent("sectors", { overrides });
  revalidateSite();
  redirect("/admin/sectors?saved=1");
}

/* ---------- testimonials ---------- */

export async function saveTestimonialAction(formData: FormData) {
  await requireAdmin();
  const items = await getTestimonials();
  const id = field(formData, "id") || `t-${Date.now()}`;

  const err = validateAll(
    required(field(formData, "name"), "Name"),
    maxLen(field(formData, "name"), 60, "Name"),
    required(field(formData, "role"), "Role"),
    maxLen(field(formData, "role"), 80, "Role"),
    required(field(formData, "service"), "Service"),
    required(field(formData, "text"), "Testimonial text"),
    maxLen(field(formData, "text"), 500, "Testimonial text"),
    isRating(field(formData, "rating"), "Rating")
  );
  if (err) fail("/admin/testimonials", err);

  const item: Testimonial = {
    id,
    name: field(formData, "name"),
    role: field(formData, "role"),
    service: field(formData, "service"),
    rating: Number(field(formData, "rating")),
    text: field(formData, "text"),
  };

  const exists = items.some((t) => t.id === id);
  const next = exists ? items.map((t) => (t.id === id ? item : t)) : [...items, item];
  await writeContent("testimonials", { items: next });
  revalidateSite();
  redirect("/admin/testimonials?saved=1");
}

export async function deleteTestimonialAction(formData: FormData) {
  await requireAdmin();
  const id = field(formData, "id");
  const items = await getTestimonials();
  await writeContent("testimonials", { items: items.filter((t) => t.id !== id) });
  revalidateSite();
  redirect("/admin/testimonials?saved=1");
}

/* ---------- FAQs ---------- */

export async function saveFaqAction(formData: FormData) {
  await requireAdmin();
  const items = await getFaqs();
  const id = field(formData, "id") || `faq-${Date.now()}`;

  const err = validateAll(
    required(field(formData, "question"), "Question"),
    maxLen(field(formData, "question"), 150, "Question"),
    required(field(formData, "answer"), "Answer"),
    maxLen(field(formData, "answer"), 600, "Answer")
  );
  if (err) fail("/admin/faqs", err);

  const item: FaqItem = {
    id,
    question: field(formData, "question"),
    answer: field(formData, "answer"),
  };

  const exists = items.some((f) => f.id === id);
  const next = exists ? items.map((f) => (f.id === id ? item : f)) : [...items, item];
  await writeContent("faqs", { items: next });
  revalidateSite();
  redirect("/admin/faqs?saved=1");
}

export async function deleteFaqAction(formData: FormData) {
  await requireAdmin();
  const id = field(formData, "id");
  const items = await getFaqs();
  await writeContent("faqs", { items: items.filter((f) => f.id !== id) });
  revalidateSite();
  redirect("/admin/faqs?saved=1");
}

/* ---------- trusted-by logos ---------- */

export async function addTrustedLogoAction(formData: FormData) {
  await requireAdmin();
  const err = validateAll(
    required(field(formData, "name"), "Company name"),
    maxLen(field(formData, "name"), 60, "Company name")
  );
  if (err) fail("/admin/logos", err);

  const file = formData.get("imageFile");
  if (!(file instanceof File) || file.size === 0) fail("/admin/logos", "Choose a logo image to upload");
  const imgErr = validateImage(file);
  if (imgErr) fail("/admin/logos", `Logo ${imgErr}`);

  const src = await saveUpload(file);
  const logos = await getTrustedLogos();
  await writeContent("trusted", { logos: [...logos, { src, name: field(formData, "name") }] });
  revalidateSite();
  redirect("/admin/logos?saved=1");
}

export async function deleteTrustedLogoAction(formData: FormData) {
  await requireAdmin();
  const src = field(formData, "src");
  const logos = await getTrustedLogos();
  await writeContent("trusted", { logos: logos.filter((l) => l.src !== src) });
  if (src.startsWith("/uploads/")) {
    await fs.unlink(path.join(process.cwd(), "public", src)).catch(() => {});
  }
  revalidateSite();
  redirect("/admin/logos?saved=1");
}
