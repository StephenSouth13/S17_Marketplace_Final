import React from "react";
import Title from "./Title";
import Link from "next/link";
import { getAllBrands } from "@/sanity/queries";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { GitCompareArrows, Headset, ShieldCheck, Truck } from "lucide-react";

import { Brand as SanityBrand } from "@/sanity.types";

// Dữ liệu bổ sung về ưu đãi/dịch vụ (Đã dịch)
const extraData = [
  {
    title: "Giao hàng miễn phí",
    description: "Miễn phí vận chuyển cho đơn hàng trên $100",
    icon: <Truck size={45} />,
  },
  {
    title: "Đổi trả miễn phí",
    description: "Miễn phí vận chuyển cho đơn hàng trên $100",
    icon: <GitCompareArrows size={45} />,
  },
  {
    title: "Hỗ trợ khách hàng",
    description: "Hỗ trợ khách hàng thân thiện 24/7",
    icon: <Headset size={45} />,
  },
  {
    title: "Đảm bảo hoàn tiền",
    description: "Chất lượng được kiểm tra bởi đội ngũ của chúng tôi",
    icon: <ShieldCheck size={45} />,
  },
];

// Component "Mua sắm theo Thương hiệu"
const ShopByBrands = async () => {
  // Gán kiểu Brand[] cho brands để TypeScript nhận diện
  const brands: Brand[] = await getAllBrands();
  
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
            href={{ pathname: "/shop", query: { brand: brand?.slug?.current } }}
            className="bg-white w-34 h-24 flex items-center justify-center rounded-md overflow-hidden hover:shadow-lg shadow-shop_dark_green/20 hoverEffect"
          >
            {brand?.image?.asset?.url ? (
              <Image
                src={urlFor(brand.image).url()}
                alt={brand?.title || "Brand logo"}
                width={250}
                height={120}
                className="w-32 h-20 object-contain"
                loading="lazy"
                priority={false}
              />
            ) : (
              <div className="w-32 h-20 flex items-center justify-center text-sm text-gray-500">No Image</div>
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

export default ShopByBrands;
