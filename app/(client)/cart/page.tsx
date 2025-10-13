"use client";

import useStore from "@/store";
import { motion } from "framer-motion";
import { ShoppingCart, Trash, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PriceFormatter from "@/components/PriceFormatter";
import QuantityButtons from "@/components/QuantityButtons";
import { urlFor } from "@/sanity/lib/image";
import Container from "@/components/Container";
import EmptyCart from "@/components/EmptyCart";
import toast from "react-hot-toast";

const CartPage = () => {
  const { getGroupedItems, getTotalPrice, getSubTotalPrice, deleteCartProduct } = useStore();
  const groupedItems = getGroupedItems();

  if (!groupedItems.length) return <EmptyCart />;

  return (
    <Container className="bg-gray-50 min-h-screen py-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-8"
      >
        <ShoppingCart className="text-green-600 w-7 h-7" />
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">Giỏ hàng của bạn</h1>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* LEFT - LIST PRODUCTS */}
        <div className="lg:col-span-2 bg-white shadow-sm border border-gray-100 rounded-2xl p-4 md:p-6">
          {groupedItems.map(({ product, quantity }) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between border-b py-5 last:border-none"
            >
              <div className="flex items-center gap-4">
                <Link href={`/product/${product.slug?.current}`}>
                  <div className="relative w-20 h-20 md:w-24 md:h-24 overflow-hidden rounded-xl border">
                    <Image
  src={
    product.images?.[0]
      ? urlFor(product.images[0] as any).url()
      : "/placeholder.png"
  }
  alt={product?.name || "Sản phẩm"}
  fill
  className="object-cover hover:scale-105 transition-transform"
/>

                  </div>
                </Link>
                <div>
                  <h3 className="font-semibold text-gray-800 line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">
                    {product._type === "product" ? "Sản phẩm vật lý" : "Dịch vụ kỹ thuật"}
                  </p>
                  <p className="text-gray-800 font-medium mt-1">
                    <PriceFormatter amount={product.price} />
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-3">
                <QuantityButtons product={product} />
                <button
                  onClick={() => {
                    deleteCartProduct(product._id);
                    toast.success("Đã xóa sản phẩm khỏi giỏ hàng!");
                  }}
                  className="text-red-500 hover:text-red-600 transition flex items-center gap-1 text-sm"
                >
                  <Trash className="w-4 h-4" /> Xóa
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* RIGHT - SUMMARY */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 h-fit sticky top-24"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Tóm tắt đơn hàng</h2>

          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span>Tạm tính</span>
              <PriceFormatter amount={getSubTotalPrice()} />
            </div>
            <div className="flex justify-between">
              <span>Giảm giá</span>
              <PriceFormatter amount={getSubTotalPrice() - getTotalPrice()} />
            </div>
            <hr className="my-2 border-gray-200" />
            <div className="flex justify-between font-semibold text-lg text-green-700">
              <span>Tổng cộng</span>
              <PriceFormatter amount={getTotalPrice()} />
            </div>
          </div>

          <Link href="/checkout">
            <Button className="w-full mt-6 py-6 rounded-full text-base bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-lg transition-all">
              Tiến hành thanh toán
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </Container>
  );
};

export default CartPage;
