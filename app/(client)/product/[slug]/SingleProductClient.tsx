"use client";

import { Product } from "@/sanity.types";
import AddToCartButton from "@/components/AddToCartButton";
import Container from "@/components/Container";
import FavoriteButton from "@/components/FavoriteButton";
import ImageView from "@/components/ImageView";
import PriceView from "@/components/PriceView";
import ProductCharacteristics from "@/components/ProductCharacteristics";
import { CornerDownLeft, StarIcon, Truck } from "lucide-react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { RxBorderSplit } from "react-icons/rx";
import { TbTruckDelivery } from "react-icons/tb";
import { motion } from "framer-motion";

export default function SingleProductClient({ product }: { product: Product }) {
  if (!product) return null;

  return (
    <div className="bg-gradient-to-b from-white via-[#fafafa] to-[#f5f5f5] min-h-screen border-t">
      <Container className="flex flex-col md:flex-row gap-10 py-10">
        {/* KHỐI 1: ẢNH SẢN PHẨM */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1 flex justify-center items-start sticky md:top-28"
        >
          <div className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white">
            <ImageView images={product?.images} isStock={product?.stock} />
          </div>
        </motion.div>

        {/* KHỐI 2: THÔNG TIN SẢN PHẨM */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex-1 flex flex-col gap-6 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
        >
          {/* Tiêu đề */}
          <div className="space-y-2 border-b border-gray-100 pb-4">
            <h1 className="text-3xl font-bold text-gray-900">{product?.name}</h1>
            <p className="text-sm text-gray-600 leading-relaxed">
              {product?.description}
            </p>

            {/* Đánh giá sao */}
            <div className="flex items-center gap-1 text-xs mt-1">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  size={14}
                  className="text-yellow-400 fill-yellow-400"
                />
              ))}
              <span className="text-gray-600 font-medium ml-1">
                (120 đánh giá)
              </span>
            </div>
          </div>

          {/* Giá và kho */}
          <div className="space-y-3 border-b border-gray-100 pb-5">
            <PriceView
              price={product?.price}
              discount={product?.discount}
              className="text-2xl font-semibold text-shop_dark_green"
            />
            <span
              className={`px-4 py-1.5 text-sm font-semibold rounded-lg ${
                product?.stock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
              }`}
            >
              {product?.stock ? "Còn hàng" : "Hết hàng"}
            </span>
          </div>

          {/* Hành động */}
          <div className="flex items-center gap-3">
            <AddToCartButton product={product} />
            <FavoriteButton showProduct={true} product={product} />
          </div>

          {/* Accordion */}
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
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-shop_dark_green transition cursor-pointer"
              >
                <span className="text-lg">{item.icon}</span>
                <p className="font-medium">{item.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Vận chuyển */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InfoCard
              icon={<Truck size={28} className="text-shop_light_green" />}
              title="Giao hàng miễn phí"
              desc="Nhập mã bưu điện để kiểm tra khu vực giao hàng."
              color="from-white to-green-50/40"
            />
            <InfoCard
              icon={<CornerDownLeft size={28} className="text-shop_orange" />}
              title="Chính sách trả hàng"
              desc="Miễn phí đổi trả trong 30 ngày. Xem chi tiết."
              color="from-white to-orange-50/40"
            />
          </div>
        </motion.div>
      </Container>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  desc,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  color: string;
}) {
  return (
    <div
      className={`flex items-center gap-3 border border-gray-100 rounded-xl p-4 bg-gradient-to-br ${color}`}
    >
      {icon}
      <div>
        <p className="text-base font-semibold text-gray-800">{title}</p>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
    </div>
  );
}
