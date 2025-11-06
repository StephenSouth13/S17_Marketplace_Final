import { NextResponse } from "next/server";
import { clientWrite } from "@/sanity/lib/writeClient";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, phone, subject, message } = body;

    // Validate required fields
    if (!fullName || !email || !phone || !subject || !message) {
      return NextResponse.json(
        { error: "Thiếu thông tin bắt buộc" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email không hợp lệ" },
        { status: 400 }
      );
    }

    // Create document in Sanity
    const doc = {
      _type: "contactSubmission",
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      subject,
      message: message.trim(),
      submittedAt: new Date().toISOString(),
      status: "new",
    };

    const result = await clientWrite.create(doc);

    return NextResponse.json(
      {
        success: true,
        message: "Yêu cầu của bạn đã được gửi thành công. Chúng tôi sẽ liên hệ với bạn sớm!",
        data: result,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Contact form submission error:", err);
    return NextResponse.json(
      { error: "Không thể lưu yêu cầu. Vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}
