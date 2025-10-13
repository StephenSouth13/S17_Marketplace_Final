"use client";

import React, { Suspense, useEffect, useState, useMemo, useCallback } from "react";
// Loại bỏ các imports bị lỗi và thay thế bằng định nghĩa tích hợp bên dưới
import { motion } from "framer-motion";
import { Check, Home, Package, ShoppingBag, Truck, Zap } from "lucide-react"; 

// --- Tích hợp các hàm giả lập để component có thể chạy độc lập ---

// Định nghĩa kiểu cho CustomLink props (thay thế next/link)
// Sử dụng React.ComponentProps<'a'> để có kiểu dữ liệu chính xác cho thẻ <a>
const CustomLink = (props: React.ComponentProps<'a'>) => <a {...props} />;

// 2. Giả lập useSearchParams (thay thế next/navigation)
// Hàm này sẽ giả lập việc lấy orderNumber từ URL query.
const useMockSearchParams = () => {
    // Trả về một giá trị giả lập hoặc giá trị từ URL thật nếu có thể
    const [mockOrderNumber] = useState("S17-A9B4-2024");
    
    // Giả lập logic lấy giá trị từ URL
    // Thêm định nghĩa kiểu rõ ràng cho key là 'string'
    const get = useCallback((key: string): string | null => {
        if (key === 'orderNumber') {
            // Trong môi trường độc lập, chúng ta dùng giá trị mock
            return mockOrderNumber;
        }
        return null;
    }, [mockOrderNumber]);

    // Giả định là useSearchParams, chỉ cần trả về object có hàm get
    return { get };
};

// 3. Giả lập useStore (thay thế @/store)
// Tạo một store tối thiểu chỉ chứa hàm resetCart giả lập
const useMockStore = () => {
    const resetCart = () => {
        console.log("Mock: Giỏ hàng đã được reset.");
        // Có thể thêm logic state local nếu cần
    };
    return { resetCart };
};


/**
 * Component chính chứa logic và giao diện
 */
const SuccessPageContent = () => {
  // Thay thế bằng hàm giả lập
  const { resetCart } = useMockStore(); 
  const searchParams = useMockSearchParams(); 
  
  // Lấy query param từ URL (sử dụng hàm giả lập)
  const orderNumber = searchParams.get("orderNumber");

  // Reset giỏ hàng sau khi đặt hàng thành công
  useEffect(() => {
    if (orderNumber) {
      // Thực thi hàm resetCart giả lập
      resetCart(); 
      console.log(`Đã xác nhận đơn hàng #${orderNumber}. Giỏ hàng được reset.`);
    }
  }, [orderNumber, resetCart]);

  return (
    // Nền: Gradient tinh tế từ màu đá (stone) sang ngọc bích (emerald) nhẹ
    <div className="py-12 px-4 min-h-screen bg-gradient-to-br from-stone-50 via-white to-emerald-50 flex items-center justify-center font-sans">
      <motion.div
        // Animation xuất hiện mượt mà
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="bg-white border-t-8 border-emerald-500 rounded-3xl shadow-2xl p-6 md:p-12 max-w-xl w-full text-center relative overflow-hidden"
      >
        
        {/* Vùng Icon Xác nhận Cao Cấp */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 150, damping: 10 }}
          className="relative w-24 h-24 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-200/50"
        >
          {/* Icon Checkmark */}
          <Check className="text-white w-12 h-12" strokeWidth={3} />
          {/* Hiệu ứng tia sáng nhỏ màu vàng */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
            className="absolute top-0 right-0 text-amber-300 transform rotate-12"
          >
            <Zap className="w-5 h-5 fill-amber-300" />
          </motion.div>
        </motion.div>

        {/* Tiêu đề & Thông điệp */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Hoàn Thành Đơn Hàng
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed mb-6">
          <span className="font-bold text-emerald-700">Xin chân thành cảm ơn!</span> Đơn hàng của bạn đã được tiếp nhận thành công.
        </p>

        {/* Thông tin Mã đơn hàng (được làm nổi bật) */}
        {orderNumber && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-emerald-50 border-l-4 border-emerald-500 p-4 mb-8 rounded-lg text-left shadow-inner"
          >
            <p className="text-sm font-semibold text-emerald-800">
              MÃ ĐƠN HÀNG CỦA BẠN:
            </p>
            <p className="text-2xl font-extrabold text-emerald-600 tracking-wider">
              {orderNumber}
            </p>
          </motion.div>
        )}
        
        {/* Thông báo giao hàng */}
        <div className="flex items-center justify-center p-4 bg-yellow-50 border border-yellow-200 rounded-xl mb-8">
            <Truck className="w-6 h-6 text-amber-500 mr-3" />
            <p className="text-sm text-gray-700 font-medium">
                Chúng tôi sẽ tiến hành **Giao Hàng Nhanh** trong vòng **24h** tới.
            </p>
        </div>

        {/* Nút điều hướng Grid 3 cột */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            
            {/* Về Trang Chủ */}
            <CustomLink
                href="/"
                className="flex items-center justify-center px-4 py-3 font-semibold bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-300 shadow-lg shadow-emerald-200"
            >
                <Home className="w-5 h-5 mr-2" />
                Trang Chủ
            </CustomLink>
            
            {/* Xem Đơn Hàng */}
            <CustomLink
                href="/orders"
                className="flex items-center justify-center px-4 py-3 font-semibold bg-white text-emerald-700 border border-emerald-400 rounded-xl hover:bg-emerald-50 transition-all duration-300 shadow-md"
            >
                <Package className="w-5 h-5 mr-2" />
                Theo Dõi Đơn
            </CustomLink>
            
            {/* Tiếp Tục Mua Sắm */}
            <CustomLink
                href="/shop"
                className="flex items-center justify-center px-4 py-3 font-semibold bg-amber-400 text-gray-800 rounded-xl hover:bg-amber-500 transition-all duration-300 shadow-lg shadow-amber-100"
            >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Mua Tiếp
            </CustomLink>
        </div>
      </motion.div>
    </div>
  );
};

/**
 * Component bọc ngoài để xử lý Suspense
 */
const SuccessPage = () => {
  // Bọc SuccessPageContent trong Suspense vì nó phụ thuộc vào các hooks
  return (
    <Suspense fallback={
      <div className="py-12 px-4 min-h-screen bg-gradient-to-br from-stone-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-lg font-medium text-gray-600">Đang tải trang xác nhận...</div>
      </div>
    }>
      <SuccessPageContent />
    </Suspense>
  );
};

export default SuccessPage;
