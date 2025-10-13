// components/ProductCard.tsx
import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { StarIcon } from "@sanity/icons";
import { Flame } from "lucide-react";
import Title from "./Title";
import ProductSideMenu from "./ProductSideMenu";
import AddToCartButton from "./AddToCartButton";

/**
 * Hàm định dạng tiền tệ an toàn.
 * Trả về "Liên hệ" nếu giá trị không hợp lệ.
 */
const formatVND = (price: number | null | undefined): string => {
  if (price === null || price === undefined || isNaN(price)) {
    return "Liên hệ";
  }
  return price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};

const ProductCard = ({ product }: { product: Product }) => {
  if (!product || !product.slug?.current) {
    console.error("Lỗi: Dữ liệu sản phẩm không hợp lệ hoặc thiếu slug.");
    return null;
  }

  const price = product?.price ?? 0;
  const discount = product?.discount ?? 0;
  const hasDiscount = discount > 0;
  const finalPrice = hasDiscount ? price * (1 - discount / 100) : price;

  return (
    <div className="text-sm border rounded-2xl border-gray-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
      <div className="relative overflow-hidden bg-gray-50">
        {/* Ảnh sản phẩm */}
        {product?.images?.[0] && (
          <Link href={`/product/${product.slug.current}`}>
            <Image
              src={urlFor(product.images[0]).url()}
              alt={product?.name ?? "Sản phẩm S17"}
              width={500}
              height={500}
              loading="lazy"
              className={`w-full h-64 object-contain p-4 transition-transform duration-500 ${
                product?.stock !== 0
                  ? "group-hover:scale-105"
                  : "opacity-60 grayscale"
              }`}
            />
          </Link>
        )}

        {/* Menu góc phải (so sánh / yêu thích / xem nhanh) */}
        <ProductSideMenu product={product} />

        {/* Nhãn trạng thái */}
        {product?.status === "sale" ? (
          <p className="absolute top-2 left-2 z-10 text-xs font-semibold bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-0.5 rounded-full shadow-md">
            Giảm giá
          </p>
        ) : (
          <Link
            href={"/deal"}
            className="absolute top-2 left-2 z-10 bg-orange-100 p-1.5 rounded-full hover:scale-110 transition-transform"
          >
            <Flame size={18} fill="#fb6c08" className="text-orange-500" />
          </Link>
        )}
      </div>

      {/* Nội dung sản phẩm */}
      <div className="p-4 flex flex-col gap-2">
        {/* Danh mục */}
        {product?.categories && product.categories.length > 0 && (
          <p className="uppercase text-xs font-medium text-gray-500 line-clamp-1">
            {product.categories.join(", ")}
          </p>
        )}

        {/* Tên sản phẩm */}
        <Title className="text-base font-semibold line-clamp-2 group-hover:text-shop_dark_green transition-colors">
          {product?.name ?? "Sản phẩm không tên"}
        </Title>

        {/* Đánh giá */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <StarIcon
              key={`star-${index}`}
              className={`w-4 h-4 ${
                index < 4 ? "text-yellow-400" : "text-gray-300"
              }`}
              fill={index < 4 ? "#facc15" : "#d1d5db"}
            />
          ))}
          <p className="text-xs text-gray-500 ml-1">(5 đánh giá)</p>
        </div>

        {/* Giá và kho */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <p className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-400 bg-clip-text text-transparent">
                {formatVND(finalPrice)}
              </p>
              {hasDiscount && (
                <span className="text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-md font-semibold">
                  -{discount}%
                </span>
              )}
            </div>

            {hasDiscount && (
              <p className="text-xs text-gray-400 line-through">
                {formatVND(price)}
              </p>
            )}
          </div>

          <p
            className={`text-xs font-medium ${
              product?.stock === 0
                ? "text-red-600"
                : "text-green-600 font-semibold"
            }`}
          >
            {product?.stock === 0
              ? "Hết hàng"
              : `Còn ${product?.stock ?? 0} SP`}
          </p>
        </div>

        {/* Nút thêm vào giỏ */}
        <AddToCartButton
          product={product}
          className="w-full mt-3 rounded-full bg-gradient-to-r from-shop_dark_green to-green-500 text-white hover:opacity-90 transition-all font-semibold"
        />
      </div>
    </div>
  );
};

export default ProductCard;
