// sanity/lib/writeClient.ts
import { createClient } from "@sanity/client";

// ✅ Dùng token có quyền "Editor" hoặc "Developer" (bạn tạo trong Sanity Project → API → Tokens)
export const clientWrite = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!, // hoặc chuỗi cứng nếu bạn test local
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2025-03-01",
  token: process.env.SANITY_WRITE_TOKEN!, // ✅ Đúng với biến trong .env.local
  useCdn: false,
});
