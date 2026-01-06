import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['three'],
};

module.exports = {
  // ... rest of the configuration.
  output: "standalone",
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb',
    }
  }
};

export default nextConfig;
