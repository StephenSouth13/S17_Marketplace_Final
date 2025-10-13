"use client";

import useStore from "@/store";
import { useState } from "react";
import Container from "./Container";
import { Heart, X, ShoppingBag, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Product } from "@/sanity.types";
import toast from "react-hot-toast";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import PriceFormatter from "./PriceFormatter";
import AddToCartButton from "./AddToCartButton";
import { motion } from "framer-motion";

const WishListProducts = () => {
  const [visibleProducts, setVisibleProducts] = useState(7);
  const { favoriteProduct, removeFromFavorite, resetFavorite } = useStore();

  const loadMore = () => {
    setVisibleProducts((prev) => Math.min(prev + 5, favoriteProduct.length));
  };

  const handleResetWishlist = () => {
    const confirmReset = window.confirm("Bạn có chắc muốn xóa toàn bộ danh sách yêu thích?");
    if (confirmReset) {
      resetFavorite();
      toast.success("Đã làm trống danh sách yêu thích ❤️");
    }
  };

  return (
    <Container className="py-10">
      {favoriteProduct?.length > 0 ? (
        <>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 mb-8"
          >
            <Heart className="w-6 h-6 text-pink-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Danh sách yêu thích của bạn
            </h1>
          </motion.div>

          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm bg-white">
            <table className="w-full border-collapse">
              <thead className="border-b bg-gradient-to-r from-pink-50 to-rose-50">
                <tr className="text-gray-700">
                  <th className="p-3 text-left">Hình ảnh</th>
                  <th className="p-3 text-left hidden md:table-cell">Danh mục</th>
                  <th className="p-3 text-left hidden md:table-cell">Phân loại</th>
                  <th className="p-3 text-left hidden md:table-cell">Tình trạng</th>
                  <th className="p-3 text-left">Giá</th>
                  <th className="p-3 text-center md:text-left">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {favoriteProduct?.slice(0, visibleProducts)?.map((product: Product) => (
                  <motion.tr
                    key={product?._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-b hover:bg-pink-50/40 transition"
                  >
                    <td className="px-3 py-4 flex items-center gap-3">
                      <X
                        onClick={() => {
                          removeFromFavorite(product?._id);
                          toast.success("Đã xóa sản phẩm khỏi danh sách yêu thích");
                        }}
                        size={18}
                        className="hover:text-red-600 hover:cursor-pointer hoverEffect"
                      />
                      {product?.images && (
                        <Link
                          href={`/product/${product?.slug?.current}`}
                          className="border rounded-xl overflow-hidden group hidden md:inline-flex"
                        >
                          <Image
                            src={urlFor(product?.images[0]).url()}
                            alt={"Hình sản phẩm"}
                            width={80}
                            height={80}
                            className="rounded-xl group-hover:scale-105 transition-transform duration-300 h-20 w-20 object-contain"
                          />
                        </Link>
                      )}
                      <p className="line-clamp-1 font-medium text-gray-800">
                        {product?.name}
                      </p>
                    </td>
                    <td className="p-3 hidden md:table-cell text-gray-700 text-sm">
                      {product?.categories?.join(", ") || "—"}
                    </td>
                    <td className="p-3 hidden md:table-cell text-gray-700 text-sm">
                      {product?.variant || "—"}
                    </td>
                    <td
                      className={`p-3 hidden md:table-cell text-sm font-semibold ${
                        (product?.stock as number) > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {(product?.stock as number) > 0 ? "Còn hàng" : "Hết hàng"}
                    </td>
                    <td className="p-3 font-semibold text-gray-900">
                      <PriceFormatter amount={product?.price} />
                    </td>
                    <td className="p-3">
                      <AddToCartButton product={product} className="w-full" />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center gap-3 mt-6">
            {visibleProducts < favoriteProduct?.length && (
              <Button variant="outline" onClick={loadMore} className="rounded-full border-pink-400 text-pink-600 hover:bg-pink-50">
                Tải thêm
              </Button>
            )}
            {visibleProducts > 10 && (
              <Button
                onClick={() => setVisibleProducts(10)}
                variant="outline"
                className="rounded-full border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                Thu gọn
              </Button>
            )}
          </div>

          <motion.div whileHover={{ scale: 1.03 }} className="mt-6">
            <Button
              onClick={handleResetWishlist}
              className="bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold shadow-md hover:shadow-lg rounded-full py-5 w-full sm:w-auto"
            >
              💔 Xóa toàn bộ danh sách yêu thích
            </Button>
          </motion.div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex min-h-[400px] flex-col items-center justify-center space-y-6 px-4 text-center"
        >
          <div className="relative mb-3">
            <div className="absolute -top-1 -right-1 h-4 w-4 animate-ping rounded-full bg-pink-300/40" />
            <Heart className="h-14 w-14 text-pink-500" strokeWidth={1.5} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">
              Danh sách yêu thích của bạn đang trống 💭
            </h2>
            <p className="text-sm text-gray-500">
              Hãy thêm sản phẩm bạn thích vào đây để dễ tìm lại sau nhé!
            </p>
          </div>
          <Button
            asChild
            className="bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <Link href="/shop">
              <Sparkles className="w-4 h-4" />
              Tiếp tục mua sắm
            </Link>
          </Button>
        </motion.div>
      )}
    </Container>
  );
};

export default WishListProducts;
