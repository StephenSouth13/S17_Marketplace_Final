"use client";

import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "@sanity/icons";
import { Flame } from "lucide-react";
import Title from "./Title";
import ProductSideMenu from "./ProductSideMenu";
import AddToCartButton from "./AddToCartButton";

// Format tiền tệ
const formatVND = (price: number | null | undefined): string => {
  if (price === null || price === undefined || isNaN(price)) return "Liên hệ";
  return price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};

const ProductCard = ({ product }: { product: Product }) => {
  if (!product || !product.slug?.current) return null;

  const price = product?.price ?? 0;
  const discount = product?.discount ?? 0;
  const hasDiscount = discount > 0;
  const finalPrice = hasDiscount ? price * (1 - discount / 100) : price;

  return (
    <div
      className="
        group flex flex-col justify-between
        border border-gray-200 rounded-2xl bg-white shadow-sm
        hover:shadow-md transition-all duration-300 overflow-hidden
      "
    >
      {/* Ảnh sản phẩm */}
      <div className="relative bg-gray-50 w-full h-52 sm:h-60 flex items-center justify-center">
        {product?.images && product.images[0] ? (
          <Link href={`/product/${product.slug.current}`} className="w-full h-full">
            <Image
              src={
                product.images[0]
                  ? urlFor(product.images[0]).url()
                  : "/no-image.png"
              }
              alt={product?.name ?? "Sản phẩm"}
              width={500}
              height={500}
              className={`w-full h-full object-contain p-4 transition-transform duration-300 
                ${product?.stock !== 0 ? "group-hover:scale-105" : "opacity-60 grayscale"}
              `}
            />
          </Link>
        ) : (
          <Image
            src="/no-image.png"
            alt="Không có ảnh"
            width={500}
            height={500}
            className="w-full h-full object-contain p-4 opacity-70"
          />
        )}

        {/* Menu góc phải */}
        <div className="absolute top-2 right-2">
          <ProductSideMenu product={product} />
        </div>

        {/* Nhãn giảm giá / Hot */}
        {hasDiscount ? (
          <span className="absolute top-2 left-2 text-xs font-semibold bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-0.5 rounded-full shadow">
            -{discount}%
          </span>
        ) : (
          <Link href={"/deal"} className="absolute top-2 left-2 bg-orange-100 p-1.5 rounded-full shadow-sm">
            <Flame size={16} fill="#fb6c08" />
          </Link>
        )}
      </div>

      {/* Nội dung */}
      <div className="flex flex-col justify-between flex-1 p-4 min-h-[220px]">
        <div>
          {/* Danh mục */}
          {product?.categories?.length ? (
            <p className="uppercase text-xs font-medium text-gray-500 line-clamp-1">
              {product.categories.join(", ")}
            </p>
          ) : (
            <p className="text-xs text-gray-400">Không có danh mục</p>
          )}

          {/* Tên sản phẩm */}
          <Title className="text-base font-semibold text-gray-900 line-clamp-2 mt-1">
            {product?.name}
          </Title>

          {/* Đánh giá (5 sao) */}
          <div className="flex items-center gap-1 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                className={`w-4 h-4 ${i < 4 ? "text-yellow-400" : "text-gray-300"}`}
                fill={i < 4 ? "#facc15" : "#d1d5db"}
              />
            ))}
          </div>
        </div>

        {/* Giá + Kho + Button */}
        <div className="flex flex-col mt-3 space-y-1">
          {/* Giá & giảm giá */}
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-lg font-bold text-shop_dark_green">
              {formatVND(finalPrice)}
            </p>
            {hasDiscount && (
              <p className="text-xs text-gray-400 line-through">{formatVND(price)}</p>
            )}
          </div>

          {/* Kho */}
          <p
            className={`text-xs font-medium mt-1 ${
              product?.stock === 0 ? "text-red-600" : "text-green-600"
            }`}
          >
            {product?.stock === 0 ? "Hết hàng" : `Còn ${product?.stock ?? 0} SP`}
          </p>

          {/* Nút thêm vào giỏ hàng */}
          <AddToCartButton
            product={product}
            className="
              w-full mt-3 rounded-full
              bg-gradient-to-r from-shop_dark_green to-green-500
              text-white font-semibold text-sm
              py-2 px-3 text-center
              hover:opacity-90 transition-all
              whitespace-normal break-words leading-tight
            "
          >
            Thêm Vào
          </AddToCartButton>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
