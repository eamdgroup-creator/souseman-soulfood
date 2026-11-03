// Downloads the photos listed in data/assets.json into public/images/ as WebP.
// Runs automatically before `next build` (npm "prebuild").
// Never fails the build: missing photos fall back to styled placeholders.
import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "images");
const manifestPath = path.join(root, "src", "content", "images.generated.json");

const { images } = JSON.parse(await readFile(path.join(root, "data", "assets.json"), "utf8"));
await mkdir(outDir, { recursive: true });

let sharp = null;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.warn("[images] sharp is not installed; photos will be skipped (placeholders will be used)");
}

const available = {};
for (const img of images) {
  const target = path.join(outDir, img.file);
  try {
    await access(target);
    available[img.file] = true;
    console.log(`[images] kept ${img.file}`);
    continue;
  } catch {}
  try {
    if (!sharp) throw new Error("sharp unavailable");
    const res = await fetch(img.url, { signal: AbortSignal.timeout(20000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const maxWidth = img.file.startsWith("hero") ? 1800 : 900;
    await sharp(buf).resize({ width: maxWidth, withoutEnlargement: true }).webp({ quality: 74 }).toFile(target);
    available[img.file] = true;
    console.log(`[images] saved ${img.file}`);
  } catch (err) {
    available[img.file] = false;
    console.warn(`[images] could not fetch ${img.file}: ${err.message} (placeholder will be used)`);
  }
}

await writeFile(manifestPath, JSON.stringify(available, null, 2) + "\n");
console.log(`[images] ${Object.values(available).filter(Boolean).length}/${images.length} photos available`);
