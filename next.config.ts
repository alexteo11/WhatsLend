import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  experimental: {
    scrollRestoration: false,
  },
};

export default nextConfig;
