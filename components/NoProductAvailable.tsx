"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";

// Tên Component: Sản Phẩm Không Khả Dụng
const NoProductAvailable = ({
  selectedTab, // Tab được chọn (ví dụ: Tên danh mục)
  className, // Tên lớp CSS bổ sung
}: {
  selectedTab?: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        // Căn giữa, padding, chiều cao tối thiểu, khoảng cách, nền xám, bo góc
        "flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full mt-10",
        className
      )}
    >
      <motion.div
        // Hiệu ứng chuyển động: bắt đầu mờ và từ dưới lên
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-gray-800">
          Không Có Sản Phẩm
        </h2>
      </motion.div>

      <motion.p
        // Hiệu ứng mờ dần
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-gray-600"
      >
        Rất tiếc, hiện tại không có sản phẩm nào khớp với tiêu chí{" "}
        <span className="text-base font-semibold text-darkColor">
          {selectedTab}
        </span>{" "}
        của bạn.
      </motion.p>

      <motion.div
        // Hiệu ứng "nhấp nháy" (scale) liên tục
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="flex items-center space-x-2 text-shop_dark_green"
      >
        <Loader2 className="w-5 h-5 animate-spin" />
        <span>Chúng tôi sẽ sớm bổ sung hàng trở lại</span>
      </motion.div>

      <motion.p
        // Hiệu ứng mờ dần (xuất hiện sau cùng)
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-sm text-gray-500"
      >
        Vui lòng kiểm tra lại sau hoặc khám phá các danh mục sản phẩm khác của chúng tôi.
      </motion.p>
    </div>
  );
};

export default NoProductAvailable;