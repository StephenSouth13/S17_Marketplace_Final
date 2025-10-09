import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  // Allow previewing through the remote dev proxy (e.g. fly.dev preview URL)
  // so Server Actions and _next assets work when forwarded through the platform.
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://80df5de7a5bf469380938070b52524df-c08261462e404cf58e1208146.fly.dev",
  ],
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
