import { NextResponse } from "next/server";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { clientWrite } from "@/sanity/lib/writeClient";

// 🟢 Lấy danh sách địa chỉ của 1 user
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  if (!userId)
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });

  try {
    const query = groq`*[_type == "address" && userId == $userId] | order(_createdAt desc)`;
    const data = await client.fetch(query, { userId });
    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("GET /api/address error:", err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}

// 🟠 Thêm địa chỉ mới
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, userEmail, customerPhone, fullName, phone, street, district, city, type } = body;

    if (!userId || !userEmail || !customerPhone || !fullName || !phone || !street || !city)
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });

    // ✅ Kiểm tra số lượng địa chỉ hiện có
    const countQuery = groq`count(*[_type == "address" && userId == $userId])`;
    const count = await client.fetch(countQuery, { userId });

    if (count >= 3) {
      return NextResponse.json({ error: "Bạn chỉ có thể thêm tối đa 3 địa chỉ" }, { status: 400 });
    }

    // ✅ Tạo mới
    const doc = {
      _type: "address",
      userId,
      userEmail,
      customerPhone,
      fullName,
      phone,
      street,
      district,
      city,
      type: type || "home",
      isDefault: false,
      createdAt: new Date().toISOString(),
    };

    const result = await clientWrite.create(doc);
    return NextResponse.json({ success: true, data: result });
  } catch (err) {
    console.error("POST /api/address error:", err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}

// 🔴 Xóa địa chỉ theo id
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id)
    return NextResponse.json({ error: "Missing id" }, { status: 400 });

  try {
    await clientWrite.delete(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/address error:", err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
