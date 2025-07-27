import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  sassOptions: {
    // This silences the deprecation warning
    silenceDeprecations: ["legacy-js-api"],
  },
};

export default nextConfig;
