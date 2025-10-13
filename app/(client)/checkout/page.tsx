"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import PriceFormatter from "@/components/PriceFormatter";
import QRCode from "react-qr-code";

export default function CheckoutPage() {
  const params = useSearchParams();
  const router = useRouter();

  // ✅ Nhận thông tin từ /cart chuyển sang qua query string
  const total = Number(params.get("total")) || 0;
  const address = params.get("address") || "";
  const orderId = params.get("orderId") || "N/A";

  const [paymentMethod, setPaymentMethod] = useState<"bank" | "cod">("bank");

  const BANK_ACCOUNT = {
    name: "CÔNG TY CP S17",
    bank: "Vietcombank - CN Hà Nội",
    number: "0123456789",
  };

  // Tạo nội dung chuyển khoản có mã đơn hàng
  const transferContent = `Thanh toan don ${orderId}`;

  const qrValue = `https://img.vietqr.io/image/${BANK_ACCOUNT.bank}-${BANK_ACCOUNT.number}-compact2.jpg?amount=${total}&addInfo=${encodeURIComponent(transferContent)}&accountName=${encodeURIComponent(BANK_ACCOUNT.name)}`;

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-16 px-4">
      <div className="max-w-2xl w-full bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center text-green-700">
          Xác nhận thanh toán
        </h1>

        <div className="border p-4 rounded-lg">
          <p className="text-gray-700">
            <strong>Tổng tiền:</strong>{" "}
            <PriceFormatter amount={total} className="text-lg font-semibold text-green-600" />
          </p>
          <p className="text-gray-700 mt-2">
            <strong>Địa chỉ giao hàng:</strong> {address || "Chưa có"}
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-semibold text-gray-800">Chọn phương thức thanh toán</h2>
          <div className="flex gap-4">
            <Button
              variant={paymentMethod === "bank" ? "default" : "outline"}
              onClick={() => setPaymentMethod("bank")}
            >
              Chuyển khoản QR
            </Button>
            <Button
              variant={paymentMethod === "cod" ? "default" : "outline"}
              onClick={() => setPaymentMethod("cod")}
            >
              Thanh toán khi nhận hàng (COD)
            </Button>
          </div>
        </div>

        {paymentMethod === "bank" && (
          <div className="text-center space-y-4">
            <p className="text-gray-600">Quét mã QR để thanh toán</p>
            <div className="flex justify-center">
              <Image
                src={qrValue}
                alt="QR Code"
                width={240}
                height={240}
                className="rounded-lg border"
              />
            </div>
            <div className="text-sm text-gray-700">
              <p><strong>Ngân hàng:</strong> {BANK_ACCOUNT.bank}</p>
              <p><strong>STK:</strong> {BANK_ACCOUNT.number}</p>
              <p><strong>Chủ TK:</strong> {BANK_ACCOUNT.name}</p>
              <p><strong>Nội dung:</strong> {transferContent}</p>
            </div>
            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold mt-4"
              onClick={() => router.push(`/success?order=${orderId}`)}
            >
              Tôi đã chuyển khoản xong
            </Button>
          </div>
        )}

        {paymentMethod === "cod" && (
          <div className="text-center space-y-4">
            <p className="text-gray-700">
              Bạn sẽ thanh toán khi nhận hàng. Vui lòng đảm bảo số điện thoại chính xác để xác nhận giao hàng.
            </p>
            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
              onClick={() => router.push(`/success?order=${orderId}`)}
            >
              Xác nhận đặt hàng
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
