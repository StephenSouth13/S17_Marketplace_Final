import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

export async function PATCH(req: Request) {
  try {
    const { id } = await req.json();

    if (!id)
      return NextResponse.json(
        { success: false, message: "Thiếu ID địa chỉ" },
        { status: 400 }
      );

    // 1️⃣ Gỡ default của các địa chỉ khác
    const others = await client.fetch(`*[_type == "address" && _id != $id]._id`, { id });
    for (const otherId of others) {
      await client.patch(otherId).set({ default: false }).commit();
    }

    // 2️⃣ Set default = true cho địa chỉ được chọn
    const updated = await client.patch(id).set({ default: true }).commit();

    return NextResponse.json({
      success: true,
      message: "Đã đặt địa chỉ mặc định",
      data: updated,
    });
  } catch (err) {
    console.error("PATCH /api/address/default error:", err);
    return NextResponse.json(
      { success: false, message: "Lỗi khi đặt địa chỉ mặc định" },
      { status: 500 }
    );
  }
}
