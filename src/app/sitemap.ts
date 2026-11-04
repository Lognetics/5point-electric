import type { MetadataRoute } from "next";
import { getProducts, getProjects } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/solutions", "/products", "/projects", "/contact", "/quote"];
  const entries = [
    ...pages,
    ...getProducts().filter((p) => !p.sample).map((p) => `/products/${p.slug}`),
    ...getProjects().filter((p) => !p.sample).map((p) => `/projects/${p.slug}`),
  ];
  return entries.map((path) => ({ url: `${SITE_URL}${path}` }));
}
