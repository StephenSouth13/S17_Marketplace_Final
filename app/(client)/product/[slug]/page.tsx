// Component: Trang Chi Tiết Sản Phẩm Đơn

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
// Nhập các icon cần thiết
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
  const product = await getProductBySlug(slug); // Lấy dữ liệu sản phẩm

  if (!product) {
    return notFound(); // Không tìm thấy sản phẩm, chuyển sang trang 404
  }

  return (
    <Container className="flex flex-col md:flex-row gap-10 py-10">
      {/* KHỐI 1: HÌNH ẢNH SẢN PHẨM */}
      {product?.images && (
        <ImageView images={product?.images} isStock={product?.stock} />
      )}

      {/* KHỐI 2: THÔNG TIN SẢN PHẨM (W-1/2) */}
      <div className="w-full md:w-1/2 flex flex-col gap-5">
        <div className="space-y-1">
          {/* Tên Sản phẩm */}
          <h2 className="text-2xl font-bold">{product?.name}</h2>
          {/* Mô tả ngắn */}
          <p className="text-sm text-gray-600 tracking-wide">
            {product?.description}
          </p>
          {/* Đánh giá (Rating) */}
          <div className="flex items-center gap-0.5 text-xs">
            {/* Hiển thị 5 sao tĩnh */}
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                size={12}
                className="text-shop_light_green"
                fill={"#3b9c3c"} // Màu xanh lá cây của S17
              />
            ))}
            <p className="font-semibold">{`(120 đánh giá)`}</p> {/* Số lượng đánh giá */}
          </div>
        </div>

        {/* Khu vực Giá và Tình trạng kho */}
        <div className="space-y-2 border-t border-b border-gray-200 py-5">
          <PriceView
            price={product?.price}
            discount={product?.discount}
            className="text-lg font-bold"
          />
          <p
            className={`px-4 py-1.5 text-sm text-center inline-block font-semibold rounded-lg ${
              product?.stock === 0
                ? "bg-red-100 text-red-600"
                : "text-green-600 bg-green-100"
            }`}
          >
            {(product?.stock as number) > 0 ? "Còn hàng" : "Hết hàng"}
          </p>
        </div>

        {/* Nút Thêm vào Giỏ hàng và Yêu thích */}
        <div className="flex items-center gap-2.5 lg:gap-3">
          <AddToCartButton product={product} /> {/* Nút Thêm vào Giỏ hàng */}
          <FavoriteButton showProduct={true} product={product} /> {/* Nút Yêu thích */}
        </div>

        {/* Thông số kỹ thuật (Accordion) */}
        <ProductCharacteristics product={product} />

        {/* Liên kết hành động phụ */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-b-gray-200 py-5 -mt-2">
          <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
            <RxBorderSplit className="text-lg" />
            <p>So sánh</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
            <FaRegQuestionCircle className="text-lg" />
            <p>Đặt câu hỏi</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
            <TbTruckDelivery className="text-lg" />
            <p>Vận chuyển & Trả hàng</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
            <FiShare2 className="text-lg" />
            <p>Chia sẻ</p>
          </div>
        </div>

        {/* Thông tin Vận chuyển và Trả hàng chi tiết */}
        <div className="flex flex-col">
          {/* Vận chuyển */}
          <div className="border border-lightColor/25 border-b-0 p-3 flex items-center gap-2.5">
            <Truck size={30} className="text-shop_orange" />
            <div>
              <p className="text-base font-semibold text-black">
                Giao hàng Miễn phí
              </p>
              <p className="text-sm text-gray-500 underline underline-offset-2">
                Nhập Mã bưu điện để kiểm tra khả năng giao hàng.
              </p>
            </div>
          </div>
          {/* Trả hàng */}
          <div className="border border-lightColor/25 p-3 flex items-center gap-2.5">
            <CornerDownLeft size={30} className="text-shop_orange" />
            <div>
              <p className="text-base font-semibold text-black">
                Trả hàng
              </p>
              <p className="text-sm text-gray-500 ">
                Miễn phí trả hàng trong 30 ngày.{" "}
                <span className="underline underline-offset-2">Chi tiết</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SingleProductPage;