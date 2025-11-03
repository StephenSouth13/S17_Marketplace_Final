import { NextResponse } from "next/server";
import { clientWrite } from "@/sanity/lib/writeClient";

export async function POST(req: Request) {
  try {
    const { userId, items, address, total, paymentMethod } = await req.json();

    // Validate required fields
    if (!userId || !items || !address || total === undefined) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Build the full address string for filtering
    const fullAddressString = address.fullName
      ? `${address.street}, ${address.district}, ${address.city}`
      : `${address.street}, ${address.district}, ${address.city}`;

    const order = await clientWrite.create({
      _type: "order",
      userId,
      items,
      address,
      totalPrice: total,
      paymentMethod,
      status: paymentMethod === "bank" ? "pending" : "cod",
      createdAt: new Date().toISOString(),
      orderDate: new Date().toISOString(),
      // New fields for filtering
      buyerName: address.fullName || address.name || "Unknown",
      buyerPhone: address.phone || "",
      buyerAddress: fullAddressString,
    });

    return NextResponse.json({ success: true, order });
  } catch (err: any) {
    console.error("Error creating order:", err);
    return NextResponse.json(
      {
        success: false,
        error: err.message || "Failed to create order. Please check if SANITY_WRITE_TOKEN is configured."
      },
      { status: 500 }
    );
  }
}
