"use client";

import dynamic from "next/dynamic";

const StudioClient = dynamic(() => import("./StudioWrapper"), {
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
