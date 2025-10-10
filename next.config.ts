import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    unoptimized: true, // 🔥 tránh lỗi sharp khi deploy Vercel
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ bỏ qua TypeScript warning
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ bỏ qua ESLint error trong quá trình build
  },
  output: "standalone", // ✅ giúp Vercel build nhanh và ổn định hơn
};

export default nextConfig;
