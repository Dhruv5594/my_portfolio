import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Allow Three.js to be transpiled properly
  transpilePackages: ["three"],
  // Performance: image optimization
  images: {
    formats: ["image/webp", "image/avif"],
    domains: [],
  },
};

export default nextConfig;
