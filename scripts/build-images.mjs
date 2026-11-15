// Pre-builds resized WebP copies of every image in public/images, so the site
// serves its own responsive images instead of using Vercel's paid optimiser.
// Output: public/_img/<width>/<same path>.webp  (ignored by git, rebuilt on each deploy)
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { IMAGE_WIDTHS } from "../src/lib/image-widths.mjs";

const SRC = "public/images";
const OUT = "public/_img";

async function* walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (/\.(jpe?g|png|webp)$/i.test(entry.name)) yield full;
  }
}

const newer = async (a, b) => {
  try {
    return (await fs.stat(a)).mtimeMs > (await fs.stat(b)).mtimeMs;
  } catch {
    return true;
  }
};

const started = Date.now();
let made = 0;
let files = 0;
const jobs = [];
for await (const file of walk(SRC)) {
  files++;
  const rel = path.relative("public", file).replace(/\.(jpe?g|png|webp)$/i, ".webp");
  jobs.push(async () => {
    const meta = await sharp(file).metadata();
    for (const width of IMAGE_WIDTHS) {
      const target = path.join(OUT, String(width), rel);
      if (!(await newer(file, target))) continue;
      await fs.mkdir(path.dirname(target), { recursive: true });
      await sharp(file)
        .rotate()
        .resize({ width: Math.min(width, meta.width ?? width), withoutEnlargement: true })
        .webp({ quality: width <= 384 ? 72 : 78 })
        .toFile(target);
      made++;
    }
  });
}

// Run a few at a time to keep memory steady on the build server.
const queue = [...jobs];
await Promise.all(
  Array.from({ length: 6 }, async () => {
    while (queue.length) await queue.shift()();
  }),
);
console.log(`images: ${files} sources, ${made} variants written in ${((Date.now() - started) / 1000).toFixed(1)}s`);
