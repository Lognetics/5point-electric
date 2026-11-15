import { IMAGE_WIDTHS } from "./image-widths.mjs";

// Points next/image at the pre-built WebP files from scripts/build-images.mjs.
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  if (!src.startsWith("/images/")) return src;
  const w = IMAGE_WIDTHS.find((x) => x >= width) ?? IMAGE_WIDTHS[IMAGE_WIDTHS.length - 1];
  return `/_img/${w}${src.replace(/\.(jpe?g|png|webp)$/i, ".webp")}`;
}
