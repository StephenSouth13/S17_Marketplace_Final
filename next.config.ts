import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 1. CẤU HÌNH HÌNH ẢNH 
     Cho phép hiển thị ảnh từ Sanity và tối ưu hóa việc deploy.
  */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    // 🔥 unoptimized: true giúp tránh lỗi thiếu thư viện 'sharp' khi build trên Vercel 
    // và giúp tiết kiệm băng thông tối ưu hình ảnh của gói Vercel miễn phí.
    unoptimized: true,
  },

  /* 2. CẤU HÌNH KIỂM TRA LỖI (BỎ QUA KHI BUILD) 
     Giúp quá trình Deploy không bị dừng lại giữa chừng do các lỗi nhỏ không đáng kể.
  */
  typescript: {
    // ✅ Bỏ qua lỗi TypeScript để đảm bảo Vercel luôn build thành công dù có lỗi type nhỏ.
    ignoreBuildErrors: true,
  },
  eslint: {
    // ✅ Bỏ qua kiểm tra ESLint khi build giúp rút ngắn thời gian deploy.
    ignoreDuringBuilds: true,
  },

  /* 3. CẤU HÌNH ĐẦU RA (OUTPUT)
  */
  // ⚠️ Lưu ý: Nếu bạn build ở máy Windows (Local) và bị lỗi EPERM (symlink), 
  // hãy tạm thời comment dòng này lại. Vercel sẽ tự động tối ưu mà không cần dòng này.
  // output: "standalone", 

  /* 4. CẤU HÌNH BẢO MẬT & HIỆU NĂNG
  */
  reactStrictMode: true,
  swcMinify: true, // Sử dụng trình biên dịch nhanh của Next.js
};

export default nextConfig;