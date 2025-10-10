"use client";

import dynamic from "next/dynamic";

// ✅ Dynamic import NextStudio chỉ trên client
const StudioClient = dynamic(() => import("./StudioClient"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen text-gray-500">
      Đang tải Sanity Studio...
    </div>
  ),
});

export default function StudioWrapper() {
  return <StudioClient />;
}
