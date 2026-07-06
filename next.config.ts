import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/ghost-development",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
