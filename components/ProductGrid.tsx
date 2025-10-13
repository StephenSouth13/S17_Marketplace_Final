"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { client } from "@/sanity/lib/client";
import NoProductAvailable from "./NoProductAvailable";
import { Loader2 } from "lucide-react";
import Container from "./Container";
import HomeTabbar from "./HomeTabbar";
import { productType } from "@/constants/data";
import { Product } from "@/sanity.types";

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(productType[0]?.title || "");
  const [isClient, setIsClient] = useState(false);
  const [variantValue, setVariantValue] = useState(
    productType.find((p) => p.title === productType[0]?.title)?.value || "all"
  );

  // Đảm bảo component chỉ fetch sau khi mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Cập nhật giá trị variantValue khi tab thay đổi
  useEffect(() => {
    const newValue =
      productType.find((p) => p.title === selectedTab)?.value || "all";
    setVariantValue(newValue);
  }, [selectedTab]);

  // Fetch sản phẩm khi variantValue thay đổi
  useEffect(() => {
    if (!isClient) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        let response;

        if (variantValue === "all") {
          // 👉 Hiển thị toàn bộ sản phẩm khi chọn "Tất cả"
          response = await client.fetch(
            `*[_type == "product"] | order(name asc){
              ...,
              "categories": categories[]->title
            }`
          );
        } else {
          // 👉 Lọc sản phẩm theo loại (food, drink, others)
          response = await client.fetch(
            `*[_type == "product" && variant == $variant] | order(name asc){
              ...,
              "categories": categories[]->title
            }`,
            { variant: variantValue }
          );
        }

        setProducts(response);
      } catch (error) {
        console.error("LỖI TẢI SẢN PHẨM:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [variantValue, isClient]);

  if (!isClient) {
    return (
      <Container className="flex flex-col lg:px-0 my-10">
        <HomeTabbar selectedTab={selectedTab} onTabSelect={setSelectedTab} />
        <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full mt-10">
          <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
          <span>Đang chuẩn bị nội dung...</span>
        </div>
      </Container>
    );
  }

  return (
    <Container className="flex flex-col lg:px-0 my-10">
      <HomeTabbar selectedTab={selectedTab} onTabSelect={setSelectedTab} />

      {loading ? (
        <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full mt-10">
          <motion.div className="flex items-center space-x-2 text-blue-600">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Sản phẩm đang tải...</span>
          </motion.div>
        </div>
      ) : products?.length ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-10"
          >
            {products.map((product) => (
              <ProductCard key={product?._id} product={product} />
            ))}
          </motion.div>
        </AnimatePresence>
      ) : (
        <NoProductAvailable selectedTab={selectedTab} />
      )}
    </Container>
  );
};

export default ProductGrid;
