"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Home,
  Package,
  ShoppingBag,
  Truck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import useStore from "@/store";
import { useAuth } from "@clerk/nextjs";

const SuccessPageContent = () => {
  const { resetCart } = useStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isSignedIn } = useAuth();

  const orderNumber = searchParams.get("orderNumber");

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/sign-in"); // ✅ Nếu chưa đăng nhập thì về trang đăng nhập
      return;
    }
    if (orderNumber) {
      resetCart(); // ✅ Reset giỏ hàng sau thanh toán
      console.log(`✅ Giỏ hàng đã được reset sau đơn #${orderNumber}`);
    }
  }, [orderNumber, resetCart, router, isSignedIn]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-emerald-100 py-12 px-4 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative bg-white/80 backdrop-blur-xl border border-emerald-100 rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full text-center overflow-hidden"
      >
        {/* Hiệu ứng ánh sáng nền */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-gradient-to-tr from-emerald-100 via-yellow-50 to-white blur-3xl"
        />

        {/* Icon xác nhận */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 120, damping: 12 }}
          className="relative w-24 h-24 mx-auto mb-8 flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg shadow-emerald-300/40"
        >
          <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={2.5} />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.8,
              repeat: Infinity,
              repeatType: "reverse",
              duration: 1.2,
            }}
            className="absolute top-0 right-0 text-yellow-300"
          >
            <Sparkles className="w-5 h-5" />
          </motion.div>
        </motion.div>

        {/* Tiêu đề */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-3">
          Thanh Toán Thành Công
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Cảm ơn bạn đã tin tưởng! Đơn hàng của bạn đã được ghi nhận và sẽ được xử lý ngay.
        </p>

        {/* Mã đơn hàng */}
        {orderNumber && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-100 rounded-xl p-5 mb-8 shadow-inner"
          >
            <p className="text-sm text-gray-700 font-medium mb-1">
              Mã đơn hàng của bạn:
            </p>
            <p className="text-2xl font-bold tracking-wider text-emerald-700">
              #{orderNumber}
            </p>
          </motion.div>
        )}

        {/* Trạng thái giao hàng */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center bg-amber-50 border border-amber-200 text-amber-700 py-3 px-5 rounded-xl mb-8 shadow-sm"
        >
          <Truck className="w-5 h-5 mr-3 text-amber-500" />
          <span className="font-medium">
            Giao hàng nhanh trong <b>24h</b> – Vui lòng giữ liên lạc!
          </span>
        </motion.div>

        {/* Nút điều hướng */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {/* 🏠 Trang chủ */}
          <Link
            href="/"
            className="flex items-center justify-center py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition"
          >
            <Home className="w-5 h-5 mr-2" />
            Trang Chủ
          </Link>

          {/* 📦 Theo dõi đơn hàng */}
          <Link
            href="/account/orders" // ✅ Đường dẫn chính xác tới phần “Theo dõi đơn hàng”
            className="flex items-center justify-center py-3 rounded-xl border border-emerald-400 bg-white text-emerald-700 font-semibold hover:bg-emerald-50 transition hover:scale-[1.02]"
          >
            <Package className="w-5 h-5 mr-2" />
            Theo Dõi Đơn
          </Link>

          {/* 🛍️ Mua thêm */}
          <Link
            href="/shop" // ✅ Đường dẫn đến trang danh sách sản phẩm
            className="flex items-center justify-center py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-800 font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            Mua Thêm
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

const SuccessPage = () => (
  <Suspense
    fallback={
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
        Đang tải trang xác nhận...
      </div>
    }
  >
    <SuccessPageContent />
  </Suspense>
);

export default SuccessPage;
