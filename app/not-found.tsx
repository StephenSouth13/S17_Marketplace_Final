import Logo from "@/components/Logo";
import Link from "next/link";
import React from "react";

// Component Trang Lỗi 404 (Không tìm thấy)
const NotFoundPage = () => {
  return (
    <div className="bg-white flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-10 md:py-32">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Logo /> {/* Hiển thị Logo của S17 */}

          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Xin lỗi, chúng tôi không tìm thấy trang này.
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Địa chỉ web bạn vừa nhập không phải là một trang đang hoạt động trên
            hệ thống của **S17 MarketPlace**.
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            {/* Nút chính: Quay về Trang chủ */}
            <Link
              href="/"
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-semibold rounded-md text-white bg-shop_dark_green/80 hover:bg-shop_dark_green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-shop_dark_green/50 hoverEffect"
            >
              Quay về Trang chủ S17 MarketPlace
            </Link>
            {/* Nút phụ: Truy cập Trang Trợ giúp */}
            <Link
              href="/help"
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-semibold rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-shop_dark_green/50"
            >
              Truy cập Trung tâm Trợ giúp
            </Link>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Cần hỗ trợ? Vui lòng truy cập{" "}
            <Link
              href="/help"
              className="font-medium text-shop_dark_green hover:text-shop_light_green"
            >
              Trung tâm Trợ giúp
            </Link>{" "}
            hoặc{" "}
            <Link
              href="/contact"
              className="font-medium text-shop_dark_green hover:text-shop_light_green"
            >
              liên hệ với chúng tôi
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;