import type { MetadataRoute } from "next";
import { getCars, getProducts, getProjects } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/solutions", "/cars", "/products", "/projects", "/contact", "/quote"];
  const entries = [
    ...pages,
    ...getCars().map((c) => `/cars/${c.slug}`),
    ...getProducts().filter((p) => !p.sample).map((p) => `/products/${p.slug}`),
    ...getProjects().filter((p) => !p.sample).map((p) => `/projects/${p.slug}`),
  ];
  return entries.map((path) => ({ url: `${SITE_URL}${path}` }));
}
