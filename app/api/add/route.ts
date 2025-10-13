import { NextResponse } from "next/server";
import { clientWrite } from "@/sanity/lib/writeClient";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body || !body.userId || !body.address) {
      return NextResponse.json(
        { message: "Thiếu dữ liệu bắt buộc!" },
        { status: 400 }
      );
    }

    const newAddress = await clientWrite.create({
      _type: "address",
      userId: body.userId,
      name: body.name || "",
      phone: body.phone || "",
      address: body.address,
      isDefault: body.isDefault || false,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(
      { success: true, data: newAddress },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ Lỗi thêm địa chỉ:", error.message);
    return NextResponse.json(
      { success: false, message: "Lỗi khi thêm địa chỉ", error: error.message },
      { status: 500 }
    );
  }
}
