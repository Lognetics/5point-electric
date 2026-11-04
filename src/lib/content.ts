import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import { z } from "zod";
import { PRODUCT_CATEGORIES, PROJECT_CATEGORIES } from "./taxonomy";

const CONTENT_DIR = path.join(process.cwd(), "content");

const image = z.object({ src: z.string().min(1), alt: z.string() });
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
  specifications: z.array(detail).default([]),
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
  technicalDetails: z.array(detail).default([]),
  sample: z.boolean().default(false),
  order: z.number().default(100),
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
