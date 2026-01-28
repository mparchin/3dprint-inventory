import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  cacheComponents: true,
  transpilePackages: ['three'],
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb'
    }
  }
};

export default nextConfig;
