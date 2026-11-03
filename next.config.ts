import type { NextConfig } from "next";

// Fully static site: `next build` writes plain HTML/CSS/JS to ./out,
// which any static host (Render Static Site, Netlify, Vercel) can serve.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true, // emits /privacy/index.html so clean URLs work on any static host
  images: { unoptimized: true }, // photos are pre-sized to WebP by scripts/fetch-images.mjs
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
