"use client";

import AddToCartButton from "@/components/AddToCartButton";
import Container from "@/components/Container";
import FavoriteButton from "@/components/FavoriteButton";
import ImageView from "@/components/ImageView";
import PriceView from "@/components/PriceView";
import ProductCharacteristics from "@/components/ProductCharacteristics";
import { getProductBySlug } from "@/sanity/queries";
import { CornerDownLeft, StarIcon, Truck } from "lucide-react";
import { notFound } from "next/navigation";
import React from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { RxBorderSplit } from "react-icons/rx";
import { TbTruckDelivery } from "react-icons/tb";

const SingleProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return notFound();

  return (
    <div className="bg-gradient-to-b from-white via-[#fafafa] to-[#f5f5f5] min-h-screen border-t">
      <Container className="flex flex-col md:flex-row gap-10 py-10">
        {/* KHỐI 1: HÌNH ẢNH SẢN PHẨM */}
        {product?.images && (
          <div className="flex-1 flex justify-center items-start sticky md:top-28">
            <div className="rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-white">
              <ImageView images={product?.images} isStock={product?.stock} />
            </div>
          </div>
        )}

        {/* KHỐI 2: THÔNG TIN CHI TIẾT */}
        <div className="flex-1 flex flex-col gap-6 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
          {/* Tiêu đề & mô tả */}
          <div className="space-y-2 border-b border-gray-100 pb-4">
            <h1 className="text-3xl font-bold text-gray-900 leading-snug">
              {product?.name}
            </h1>
            <p className="text-sm text-gray-600 leading-relaxed">
              {product?.description}
            </p>

            <div className="flex items-center gap-1 text-xs mt-1">
              {[...Array(5)].map((_, index) => (
                <StarIcon
                  key={index}
                  size={14}
                  className="text-yellow-400 fill-yellow-400"
                />
              ))}
              <span className="text-gray-600 font-medium ml-1">
                (120 đánh giá)
              </span>
            </div>
          </div>

          {/* Giá và tình trạng kho */}
          <div className="space-y-3 border-b border-gray-100 pb-5">
            <PriceView
              price={product?.price}
              discount={product?.discount}
              className="text-2xl font-semibold text-shop_dark_green"
            />
            <p
              className={`px-4 py-1.5 text-sm inline-block font-semibold rounded-lg ${
                product?.stock === 0
                  ? "bg-red-100 text-red-600"
                  : "text-green-700 bg-green-100"
              }`}
            >
              {(product?.stock as number) > 0 ? "Còn hàng" : "Hết hàng"}
            </p>
          </div>

          {/* Nút hành động */}
          <div className="flex items-center gap-3">
            <AddToCartButton product={product} />
            <FavoriteButton showProduct={true} product={product} />
          </div>

          {/* Accordion thông số kỹ thuật */}
          <div className="mt-2">
            <ProductCharacteristics product={product} />
          </div>

          {/* Liên kết phụ */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-y border-gray-100 py-5">
            {[
              { icon: <RxBorderSplit />, text: "So sánh" },
              { icon: <FaRegQuestionCircle />, text: "Đặt câu hỏi" },
              { icon: <TbTruckDelivery />, text: "Vận chuyển & Trả hàng" },
              { icon: <FiShare2 />, text: "Chia sẻ" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-shop_dark_green transition-colors cursor-pointer"
              >
                <span className="text-lg">{item.icon}</span>
                <p className="font-medium">{item.text}</p>
              </div>
            ))}
          </div>

          {/* Vận chuyển & Trả hàng */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-3 border border-gray-100 rounded-xl p-4 bg-gradient-to-br from-white to-green-50/40">
              <Truck size={28} className="text-shop_light_green" />
              <div>
                <p className="text-base font-semibold text-gray-800">
                  Giao hàng miễn phí
                </p>
                <p className="text-sm text-gray-500 underline underline-offset-2">
                  Nhập mã bưu điện để kiểm tra khu vực giao hàng.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 border border-gray-100 rounded-xl p-4 bg-gradient-to-br from-white to-orange-50/40">
              <CornerDownLeft size={28} className="text-shop_orange" />
              <div>
                <p className="text-base font-semibold text-gray-800">
                  Chính sách trả hàng
                </p>
                <p className="text-sm text-gray-500">
                  Miễn phí đổi trả trong 30 ngày.{" "}
                  <span className="underline underline-offset-2 cursor-pointer">
                    Xem chi tiết
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SingleProductPage;
