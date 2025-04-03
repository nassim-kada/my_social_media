import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,  
  },
  typescript: {
    ignoreBuildErrors: true,   // ✅ Disable TypeScript checking during build
  },
};

export default nextConfig;
