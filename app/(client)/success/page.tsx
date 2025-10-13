"use client";

import useStore from "@/store";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Home, Package, ShoppingBag, Sparkles } from "lucide-react";
import Link from "next/link";

const SuccessPageContent = () => {
  const { resetCart } = useStore();
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");

  useEffect(() => {
    if (orderNumber) {
      resetCart();
    }
  }, [orderNumber, resetCart]);

  return (
    <div className="py-10 px-4 min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 max-w-xl w-full text-center relative overflow-hidden"
      >
        {/* Hiệu ứng ánh sáng */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1.2 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
          className="absolute inset-0 bg-gradient-to-t from-green-200/30 to-transparent pointer-events-none"
        />

        {/* Icon xác nhận */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="relative w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
        >
          <Check className="text-white w-10 h-10" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.2, repeat: Infinity, repeatType: "reverse" }}
            className="absolute -top-3 -right-3 text-yellow-400"
          >
            <Sparkles className="w-6 h-6" />
          </motion.div>
        </motion.div>

        {/* Tiêu đề */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          🎉 Đặt hàng thành công!
        </h1>
        <p className="text-gray-700 text-base leading-relaxed mb-4">
          Cảm ơn bạn đã mua sắm tại <span className="font-semibold text-green-700">S17 Market</span>!  
          Chúng tôi đang xử lý đơn hàng của bạn và sẽ liên hệ sớm nhất để xác nhận.
        </p>

        {/* Số đơn hàng */}
        {orderNumber && (
          <p className="text-gray-800 text-sm md:text-base mb-8">
            <span className="font-semibold">Mã đơn hàng:</span>{" "}
            <span className="text-green-600 font-bold">{orderNumber}</span>
          </p>
        )}

        {/* CTA: Mua tiếp */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="bg-green-50 border border-green-100 rounded-xl p-4 mb-8"
        >
          <p className="text-green-800 text-sm md:text-base font-medium mb-2">
            🎁 Nhận ưu đãi 10% cho đơn hàng tiếp theo!
          </p>
          <p className="text-green-600 text-xs md:text-sm">
            Hãy quay lại cửa hàng và tiếp tục mua sắm để nhận thêm nhiều ưu đãi hấp dẫn nhé!
          </p>
        </motion.div>

        {/* Nút điều hướng */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/"
            className="flex items-center justify-center px-4 py-3 font-semibold bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 shadow-md"
          >
            <Home className="w-5 h-5 mr-2" />
            Trang chủ
          </Link>
          <Link
            href="/orders"
            className="flex items-center justify-center px-4 py-3 font-semibold bg-white text-green-700 border border-green-400 rounded-lg hover:bg-green-50 transition-all duration-300 shadow-md"
          >
            <Package className="w-5 h-5 mr-2" />
            Đơn hàng
          </Link>
          <Link
            href="/shop"
            className="flex items-center justify-center px-4 py-3 font-semibold bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all duration-300 shadow-md"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            Tiếp tục mua sắm
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

const SuccessPage = () => {
  return (
    <Suspense fallback={<div>Đang tải...</div>}>
      <SuccessPageContent />
    </Suspense>
  );
};

export default SuccessPage;
