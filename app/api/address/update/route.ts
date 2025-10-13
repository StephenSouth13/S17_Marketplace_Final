import { NextResponse } from "next/server";
import { clientWrite } from "@/sanity/lib/writeClient";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, ...data } = body;

    if (!id)
      return NextResponse.json({ error: "Missing address id" }, { status: 400 });

    const updated = await clientWrite.patch(id).set(data).commit();

    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    console.error("PATCH /api/address/update error:", err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
