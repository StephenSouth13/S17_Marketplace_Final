import { NextResponse } from "next/server";
import { clientWrite } from "@/sanity/lib/writeClient";

export async function POST(req: Request) {
  try {
    const { userId, items, address, total, paymentMethod } = await req.json();

    const order = await clientWrite.create({
      _type: "order",
      userId,
      items,
      address,
      total,
      paymentMethod,
      status: paymentMethod === "bank" ? "pending" : "cod",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, order });
  } catch (err: any) {
    console.error("Error creating order:", err.message);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
