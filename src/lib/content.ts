import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import { z } from "zod";
import { PRODUCT_CATEGORIES, PROJECT_CATEGORIES } from "./taxonomy";

const CONTENT_DIR = path.join(process.cwd(), "content");

// demo: false marks a real 5Points photo, so no "Demonstration image" label is shown.
const image = z.object({
  src: z.string().min(1),
  alt: z.string(),
  demo: z.boolean().optional(),
  /** Focal point when the photo is cropped, e.g. "50% 30%". */
  position: z.string().optional(),
});
const video = z.object({ src: z.string().min(1), poster: z.string().min(1), alt: z.string() });
const detail = z.object({ label: z.string(), value: z.string() });
const ids = <T extends { id: string }>(list: readonly T[]) =>
  list.map((c) => c.id) as [T["id"], ...T["id"][]];

const settingsSchema = z.object({
  companyName: z.string(),
  shortName: z.string(),
  description: z.string(),
  brandMessage: z.string(),
  address: z.string(),
  locations: z.array(z.string()),
  mapQuery: z.string(),
  phone: z.string().default(""),
  email: z.string().default(""),
  whatsappNumber: z.string().default(""),
  whatsappMessage: z.string().default(""),
  socials: z.object({
    linkedin: z.string().default(""),
    x: z.string().default(""),
    facebook: z.string().default(""),
    instagram: z.string().default(""),
  }),
  showSampleContent: z.boolean().default(false),
});

const companySchema = z.object({
  whoWeAre: z.string(),
  vision: z.string(),
  mission: z.string(),
  values: z.array(z.object({ title: z.string(), description: z.string() })),
  commitment: z.string(),
});

const productSchema = z.object({
  title: z.string(),
  category: z.enum(ids(PRODUCT_CATEGORIES)),
  summary: z.string(),
  description: z.string().default(""),
  image: z.string(),
  imageAlt: z.string(),
  /** "contain" suits cut-out product shots on white; "cover" fills the frame. */
  imageFit: z.enum(["cover", "contain"]).default("cover"),
  /** Naira; leave empty for "price on request". */
  price: z.number().nullable().default(null),
  gallery: z.array(image).default([]),
  videos: z.array(video).default([]),
  specifications: z.array(detail).default([]),
  included: z.array(z.string()).default([]),
  ratedFor: z.array(z.string()).default([]),
  warranty: z.array(z.string()).default([]),
  applications: z.array(z.string()).default([]),
  sample: z.boolean().default(false),
  order: z.number().default(100),
});

const projectSchema = z.object({
  title: z.string(),
  category: z.enum(ids(PROJECT_CATEGORIES)),
  location: z.string(),
  summary: z.string(),
  description: z.string(),
  images: z.array(image).min(1),
  videos: z.array(video).default([]),
  technicalDetails: z.array(detail).default([]),
  /** Long-form write-up. Body text: blank lines between paragraphs, "- " starts a bullet. */
  sections: z.array(z.object({ heading: z.string(), body: z.string() })).default([]),
  quote: z.string().default(""),
  sample: z.boolean().default(false),
  order: z.number().default(100),
});

const carSchema = z.object({
  title: z.string(),
  make: z.string(),
  model: z.string(),
  year: z.number(),
  headline: z.string(),
  powertrain: z.enum(["electric", "hybrid"]),
  bodyType: z.enum(["suv", "hatchback", "shooting-brake", "pickup", "sedan"]),
  price: z.number().nullable().default(null),
  summary: z.string(),
  highlights: z.array(detail).default([]),
  specifications: z.array(detail).default([]),
  availability: z.string().default(""),
  images: z.array(image).min(1),
  featured: z.boolean().default(false),
  order: z.number().default(100),
});

const link = z.object({ label: z.string(), href: z.string() });
const heroSchema = z.object({
  interval: z.number().min(3).default(7),
  slides: z
    .array(
      z.object({
        eyebrow: z.string().default(""),
        title: z.string(),
        text: z.string().optional(),
        car: z.string().optional(),
        image,
        /** Optional portrait photo for phones; the main image is used everywhere else. */
        mobileImage: image.optional(),
        /** Focal point, e.g. "50% 60%" keeps the car in view when the photo is cropped. */
        position: z.string().default("50% 50%"),
        primary: link,
        secondary: link.optional(),
        tab: z.string(),
      }),
    )
    .min(1),
});

const promoSchema = z.object({
  enabled: z.boolean().default(false),
  popup: z.boolean().default(true),
  /** ISO date-time; the banner and popup disappear on their own after this. */
  endsAt: z.string().refine((v) => !Number.isNaN(Date.parse(v)), "endsAt must be a date"),
  endsLabel: z.string(),
  eyebrow: z.string(),
  title: z.string(),
  text: z.string(),
  image,
  primary: link,
  secondary: link.optional(),
  phones: z.array(z.string()).default([]),
});

const creditSchema = z.object({
  files: z.array(z.string()),
  title: z.string(),
  author: z.string(),
  license: z.string(),
  licenseUrl: z.string().optional(),
  source: z.string(),
});

export type Settings = z.infer<typeof settingsSchema>;
export type Product = z.infer<typeof productSchema> & { slug: string };
export type Project = z.infer<typeof projectSchema> & { slug: string };
export type SiteImage = z.infer<typeof image>;
export type Hero = z.infer<typeof heroSchema>;
export type SiteVideo = z.infer<typeof video>;
export type Promo = z.infer<typeof promoSchema>;
export type Car = z.infer<typeof carSchema> & { slug: string };

function readJson(relativePath: string): unknown {
  return JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, relativePath), "utf8"));
}

/** Reads a CMS folder. Invalid entries fail the build, naming the file at fault. */
function readCollection<T extends object>(folder: string, schema: z.ZodType<T>) {
  const dir = path.join(CONTENT_DIR, folder);
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const parsed = schema.safeParse(readJson(path.join(folder, file)));
      if (!parsed.success) {
        throw new Error(`Invalid content in content/${folder}/${file}: ${parsed.error.message}`);
      }
      return { ...parsed.data, slug: file.replace(/\.json$/, "") };
    });
}

const byOrder = (a: { order: number; title: string }, b: { order: number; title: string }) =>
  a.order - b.order || a.title.localeCompare(b.title);

export const getSettings = cache(() => settingsSchema.parse(readJson("settings.json")));
export const getCompany = cache(() => companySchema.parse(readJson("company.json")));
export const getCredits = cache(() => z.array(creditSchema).parse(readJson("image-credits.json")));

const siteImages = z.record(z.string(), image);
export const getImages = cache(() => {
  const images = siteImages.parse(readJson("images.json"));
  return (key: string): SiteImage => {
    const found = images[key];
    if (!found) throw new Error(`Missing image "${key}" in content/images.json`);
    return found;
  };
});

/** Entries flagged `sample` are published only while showSampleContent is on. */
export const getProducts = cache((): Product[] => {
  const showSamples = getSettings().showSampleContent;
  return readCollection("products", productSchema)
    .filter((p) => showSamples || !p.sample)
    .sort(byOrder);
});

export const getProjects = cache((): Project[] => {
  const showSamples = getSettings().showSampleContent;
  return readCollection("projects", projectSchema)
    .filter((p) => showSamples || !p.sample)
    .sort(byOrder);
});

export const getCars = cache((): Car[] => readCollection("cars", carSchema).sort(byOrder));

export const getHero = cache(() => heroSchema.parse(readJson("hero.json")));

/** The current promotion, or null when it is switched off or has ended. */
export const getPromo = cache((): Promo | null => {
  const promo = promoSchema.parse(readJson("promo.json"));
  return promo.enabled && Date.parse(promo.endsAt) > Date.now() ? promo : null;
});
