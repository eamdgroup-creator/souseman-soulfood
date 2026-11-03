// Tiny zero-dependency static server for previewing ./out locally (`npm start`).
// Production hosting (Render Static Site) serves ./out directly and does not use this.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "out");
const port = Number(process.env.PORT || 3000);
const types = {
  ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".json": "application/json",
  ".txt": "text/plain; charset=utf-8", ".xml": "application/xml", ".svg": "image/svg+xml", ".png": "image/png",
  ".webp": "image/webp", ".jpg": "image/jpeg", ".ico": "image/x-icon", ".woff2": "font/woff2",
};

async function resolveFile(urlPath) {
  const clean = path.normalize(decodeURIComponent(urlPath.split("?")[0])).replace(/^(\.\.[/\\])+/, "");
  let file = path.join(root, clean);
  if (!file.startsWith(root)) return null;
  try {
    const s = await stat(file);
    if (s.isDirectory()) file = path.join(file, "index.html");
    await stat(file);
    return file;
  } catch {
    return null;
  }
}

createServer(async (req, res) => {
  const file = await resolveFile(req.url || "/");
  if (!file) {
    res.writeHead(404, { "Content-Type": types[".html"] });
    res.end(await readFile(path.join(root, "404.html")).catch(() => "Not found"));
    return;
  }
  const type = path.basename(file) === "opengraph-image" ? "image/png" : types[path.extname(file)];
  res.writeHead(200, { "Content-Type": type || "application/octet-stream" });
  res.end(await readFile(file));
}).listen(port, () => console.log(`Serving ./out at http://localhost:${port}`));
