// Nhập các tiện ích và thành phần cần thiết
import React from "react";
import Title from "./Title"; // Nhập component Tiêu đề
import Link from "next/link"; // Nhập component Liên kết từ Next.js
import { getAllBrands } from "@/sanity/queries"; // Hàm truy vấn lấy tất cả thương hiệu
import Image from "next/image"; // Nhập component Hình ảnh từ Next.js
import { urlFor } from "@/sanity/lib/image"; // Hàm tạo URL hình ảnh từ Sanity
import { GitCompareArrows, Headset, ShieldCheck, Truck } from "lucide-react"; // Nhập các biểu tượng

import { Brand as SanityBrand } from "@/sanity.types"; // Nhập định kiểu Thương hiệu từ Sanity

// Dữ liệu bổ sung về ưu đãi/dịch vụ (Đã dịch)
const extraData = [
  {
    title: "Giao hàng miễn phí",
    description: "Miễn phí vận chuyển cho đơn hàng trên $100",
    icon: <Truck size={45} />, // Biểu tượng Xe tải
  },
  {
    title: "Đổi trả miễn phí",
    description: "Chính sách đổi trả dễ dàng", // Sửa mô tả cho phù hợp với tiêu đề
    icon: <GitCompareArrows size={45} />, // Biểu tượng Mũi tên So sánh
  },
  {
    title: "Hỗ trợ khách hàng",
    description: "Hỗ trợ khách hàng thân thiện 24/7",
    icon: <Headset size={45} />, // Biểu tượng Tai nghe
  },
  {
    title: "Đảm bảo chất lượng", // Sửa tiêu đề cho phù hợp với mô tả
    description: "Chất lượng được kiểm tra bởi đội ngũ của chúng tôi",
    icon: <ShieldCheck size={45} />, // Biểu tượng Khiên Kiểm tra
  },
];

// Component "Mua sắm theo Thương hiệu"
// Do component này là 'async', chúng ta cần định nghĩa kiểu Brand (sử dụng SanityBrand đã import)
const ShopByBrands = async () => {
  // Gán kiểu SanityBrand[] cho brands
  const brands: SanityBrand[] = await getAllBrands();

  return (
    <div className="mb-10 lg:mb-20 bg-shop_light_bg p-5 lg:p-7 rounded-md">
      <div className="flex items-center gap-5 justify-between mb-10">
        <Title>Mua sắm theo Thương hiệu</Title>
        <Link
          href={"/shop"}
          className="text-sm font-semibold tracking-wide hover:text-shop_btn_dark_green hoverEffect"
        >
          Xem tất cả
        </Link>
      </div>
      {/* Danh sách logo thương hiệu */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2.5">
        {brands?.map((brand: SanityBrand) => (
          <Link
            key={brand?._id}
            // Tạo liên kết đến trang mua sắm với bộ lọc thương hiệu
            href={{ pathname: "/shop", query: { brand: brand?.slug?.current } }}
            className="bg-white w-34 h-24 flex items-center justify-center rounded-md overflow-hidden hover:shadow-lg shadow-shop_dark_green/20 hoverEffect"
          >
            {/* Kiểm tra và hiển thị hình ảnh thương hiệu */}
            {brand?.image ? (
              <Image
                src={urlFor(brand.image).url()} // Sử dụng urlFor để lấy URL hình ảnh
                alt={brand?.title || "Logo thương hiệu"}
                width={250}
                height={120}
                className="w-32 h-20 object-contain"
                loading="lazy"
                priority={false}
              />
            ) : (
              <div className="w-32 h-20 flex items-center justify-center text-sm text-gray-500">
                Không có Hình ảnh
              </div>
            )}
          </Link>
        ))}
      </div>
      {/* Khu vực ưu đãi/dịch vụ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16 p-2 shadow-sm hover:shadow-shop_light_green/20 py-5">
        {extraData?.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 group text-lightColor hover:text-shop_light_green"
          >
            <span className="inline-flex scale-100 group-hover:scale-90 hoverEffect">
              {item?.icon}
            </span>
            <div className="text-sm">
              <p className="text-darkColor/80 font-bold capitalize">
                {item?.title}
              </p>
              <p className="text-lightColor">{item?.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Xuất component
export default ShopByBrands;