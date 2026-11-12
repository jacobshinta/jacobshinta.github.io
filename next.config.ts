import type { NextConfig } from "next";

// Static export for GitHub Pages: `npm run build` writes plain HTML/CSS/JS to `out/`.
const nextConfig: NextConfig = {
  output: "export",
  // GitHub Pages serves `folder/index.html`, so every route gets a trailing slash.
  trailingSlash: true,
  // No image server on Pages; images are served as-is from `public/`.
  images: { unoptimized: true },
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
