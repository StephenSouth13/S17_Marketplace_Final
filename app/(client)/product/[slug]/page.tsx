import { motion } from "framer-motion";
import AddToCartButton from "@/components/AddToCartButton";
import Container from "@/components/Container";
import FavoriteButton from "@/components/FavoriteButton";
import ImageView from "@/components/ImageView";
import PriceView from "@/components/PriceView";
import ProductCharacteristics from "@/components/ProductCharacteristics";
import ProductCard from "@/components/ProductCard";
import { getProductBySlug, getRelatedProducts } from "@/sanity/queries";
import { CornerDownLeft, StarIcon, Truck } from "lucide-react";
import { notFound } from "next/navigation";
import React from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { RxBorderSplit } from "react-icons/rx";
import { TbTruckDelivery } from "react-icons/tb";

// ✅ Fix: Trong Next.js 15, params là Promise nên cần await
interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

const SingleProductPage = async ({ params }: ProductPageProps) => {
  const { slug } = await params; // ✅ Bắt buộc phải await
  const product = await getProductBySlug(slug);

  if (!product) return notFound();

  // Lấy sản phẩm tương tự
  const relatedProducts = await getRelatedProducts(
    product._id,
    product.categories?.[0]
  );

  return (
    <>
      {/* ========== CHI TIẾT SẢN PHẨM ========== */}
      <Container className="flex flex-col md:flex-row gap-10 py-10">
        {/* Cột trái: Hình ảnh */}
        {product?.images && (
          <ImageView images={product.images} isStock={product.stock} />
        )}

        {/* Cột phải: Thông tin sản phẩm */}
        <div className="w-full md:w-1/2 flex flex-col gap-5">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-gray-900">
              {product?.name}
            </h2>
            <p className="text-sm text-gray-600 tracking-wide">
              {product?.description}
            </p>
            <div className="flex items-center gap-0.5 text-xs">
              {[...Array(5)].map((_, index) => (
                <StarIcon
                  key={index}
                  size={12}
                  className="text-shop_light_green"
                  fill={"#3b9c3c"}
                />
              ))}
              <p className="font-semibold text-gray-500">(120)</p>
            </div>
          </div>

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
              {product?.stock > 0 ? "Còn hàng" : "Hết hàng"}
            </p>
          </div>

          <div className="flex items-center gap-2.5 lg:gap-3">
            <AddToCartButton product={product} />
            <FavoriteButton showProduct={true} product={product} />
          </div>

          <ProductCharacteristics product={product} />

          {/* Hành động nhanh */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-b-gray-200 py-5 -mt-2">
            {[
              { icon: RxBorderSplit, text: "So sánh" },
              { icon: FaRegQuestionCircle, text: "Đặt câu hỏi" },
              { icon: TbTruckDelivery, text: "Vận chuyển & Trả hàng" },
              { icon: FiShare2, text: "Chia sẻ" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-sm text-black hover:text-shop_orange hoverEffect cursor-pointer"
              >
                <item.icon className="text-lg" />
                <p>{item.text}</p>
              </div>
            ))}
          </div>

          {/* Chính sách vận chuyển */}
          <div className="flex flex-col">
            <div className="border border-lightColor/25 border-b-0 p-3 flex items-center gap-2.5">
              <Truck size={30} className="text-shop_orange" />
              <div>
                <p className="text-base font-semibold text-black">
                  Giao hàng miễn phí
                </p>
                <p className="text-sm text-gray-500 underline underline-offset-2">
                  Nhập mã bưu điện để kiểm tra khu vực giao hàng.
                </p>
              </div>
            </div>
            <div className="border border-lightColor/25 p-3 flex items-center gap-2.5">
              <CornerDownLeft size={30} className="text-shop_orange" />
              <div>
                <p className="text-base font-semibold text-black">
                  Đổi trả dễ dàng
                </p>
                <p className="text-sm text-gray-500">
                  Hoàn trả miễn phí trong 30 ngày.{" "}
                  <span className="underline underline-offset-2">Chi tiết</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* ========== SẢN PHẨM TƯƠNG TỰ ========== */}
      {relatedProducts?.length > 0 && (
        <Container className="mt-12 mb-20">
          <motion.h2
            className="text-2xl font-bold mb-6 text-gray-900"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Sản phẩm tương tự
          </motion.h2>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {relatedProducts.map((p: any) => (
              <motion.div
                key={p._id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </motion.div>
        </Container>
      )}
    </>
  );
};

export default SingleProductPage;
