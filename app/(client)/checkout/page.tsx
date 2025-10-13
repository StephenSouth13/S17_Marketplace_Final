"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import useStore from "@/store";
import { client } from "@/sanity/lib/client";
import { Address } from "@/sanity.types";
import { useAuth, useUser } from "@clerk/nextjs";
import {
  CreditCard,
  Wallet,
  Loader2,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Container from "@/components/Container";
import PriceFormatter from "@/components/PriceFormatter";
import toast from "react-hot-toast";

const CheckoutPage = () => {
  const router = useRouter();
  const { items, getTotalPrice, resetCart } = useStore();

  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [loading, setLoading] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const total = getTotalPrice();

  const bank = {
    bankName: "MB Bank",
    bankId: "970422",
    accountNumber: "0001244698984",
    accountName: "QUACH THANH LONG",
  };

  const qrData = `https://img.vietqr.io/image/${bank.bankId}-${bank.accountNumber}-compact2.png?amount=${total}&addInfo=ThanhToanDonHangS17`;

  // 🧠 Lấy danh sách địa chỉ khi user đăng nhập
  useEffect(() => {
    if (!user?.id) return;

    const fetchAddresses = async () => {
      const query = `*[_type=="address" && userId == "${user.id}"] | order(_createdAt desc)`;
      const res = await client.fetch(query);

      if (!res || res.length === 0) {
        toast("📦 Bạn chưa có địa chỉ giao hàng. Vui lòng thêm trước khi thanh toán!");
        router.push("/addresses");
        return;
      }

      setAddresses(res);
      setSelectedAddress(res.find((a: Address) => a.default) || res[0]);
    };

    fetchAddresses();
  }, [user?.id, router]);

  // 🏦 Xử lý thanh toán
  const handlePayment = async () => {
    if (!selectedAddress) {
      toast.error("Vui lòng chọn địa chỉ giao hàng trước khi thanh toán!");
      return;
    }

    if (items.length === 0) {
      toast.error("Giỏ hàng trống!");
      return;
    }

    setLoading(true);

    try {
      // 🧾 Gửi đơn hàng lên server (API)
      const res = await fetch("/api/order/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id,
          items,
          address: selectedAddress,
          total,
          paymentMethod,
        }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Tạo đơn hàng thất bại");

      // ✅ Nếu COD → hoàn tất luôn
      if (paymentMethod === "cod") {
        toast.success("🎉 Đặt hàng thành công! Thanh toán khi nhận hàng.");
        resetCart();
        router.push("/success");
      } else {
        // 🏦 Nếu bank → hiện QR để quét
        setShowQR(true);
        toast("💳 Vui lòng quét mã QR để hoàn tất thanh toán!");
      }
    } catch (err: any) {
      toast.error(err.message || "Thanh toán thất bại!");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Khi user bấm "Tôi đã thanh toán"
  const handleConfirmPaid = () => {
    resetCart();
    toast.success("Thanh toán thành công!");
    router.push("/success");
  };

  // 🚫 Nếu chưa đăng nhập
  if (!isSignedIn)
    return (
      <Container>
        <div className="text-center py-40">
          <h2 className="text-xl font-semibold text-gray-700">
            Vui lòng đăng nhập để tiếp tục
          </h2>
        </div>
      </Container>
    );

  // 🛍️ UI Checkout
  return (
    <Container className="min-h-screen py-10 bg-gray-50">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-900 mb-8 text-center"
      >
        Thanh toán đơn hàng
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {/* LEFT - Address + Payment */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-green-600" /> Địa chỉ giao hàng
            </h2>
            <Button
              variant="link"
              className="text-green-600 text-sm"
              onClick={() => router.push("/addresses")}
            >
              Quản lý địa chỉ
            </Button>
          </div>

          <RadioGroup
            onValueChange={(val) => {
              const addr = addresses.find((a) => a._id === val);
              setSelectedAddress(addr || null);
            }}
          >
            {addresses.map((address) => (
              <Label
                key={address._id}
                className={`flex items-start p-3 border rounded-lg mb-2 cursor-pointer transition ${
                  selectedAddress?._id === address._id
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200"
                }`}
              >
                <RadioGroupItem value={address._id} className="mr-3 mt-1" />
                <div>
                  <p className="font-semibold">{address.name}</p>
                  <p className="text-sm text-gray-600">
                    {address.address}, {address.city}, {address.state}
                  </p>
                </div>
              </Label>
            ))}
          </RadioGroup>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Phương thức thanh toán</h3>
            <RadioGroup
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="space-y-2"
            >
              <Label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="bank" id="bank" />
                <CreditCard className="w-4 h-4 text-green-600" />
                <span>Chuyển khoản (QR / STK)</span>
              </Label>
              <Label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="cod" id="cod" />
                <Wallet className="w-4 h-4 text-yellow-600" />
                <span>Thanh toán khi nhận hàng (COD)</span>
              </Label>
            </RadioGroup>
          </div>
        </motion.div>

        {/* RIGHT - Summary + QR */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-900">
            Tổng thanh toán
          </h2>

          <div className="flex justify-between text-gray-700 mb-4">
            <span>Tổng cộng</span>
            <PriceFormatter amount={total} className="font-semibold text-green-600" />
          </div>

          {/* 🏦 Nếu chọn bank và đã tạo đơn */}
          {showQR && paymentMethod === "bank" && (
            <div className="mt-4 text-center border rounded-lg p-4 bg-green-50">
              <p className="text-sm mb-2 text-gray-700">
                Quét mã QR để thanh toán:
              </p>
              <div className="flex justify-center mb-3">
                <img src={qrData} alt="QR Thanh toán" width={180} height={180} />
              </div>
              <p className="text-xs text-gray-600 leading-tight">
                <b>{bank.bankName}</b> — {bank.accountNumber}
                <br />
                {bank.accountName}
              </p>

              <Button
                onClick={handleConfirmPaid}
                className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white"
              >
                Tôi đã thanh toán
              </Button>
            </div>
          )}

          {!showQR && (
            <Button
              onClick={handlePayment}
              disabled={loading}
              className="w-full mt-6 py-6 rounded-full text-lg font-semibold bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md hover:shadow-lg transition"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2" /> Xác nhận thanh toán
                </>
              )}
            </Button>
          )}
        </motion.div>
      </div>
    </Container>
  );
};

export default CheckoutPage;
