"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { productType } from "@/constants/data";
import { Product } from "@/sanity.types";
import Container from "./Container";
import HomeTabbar from "./HomeTabbar";
import ProductCard from "./ProductCard";
import NoProductAvailable from "./NoProductAvailable";

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(productType[0]?.title || "");
  const [isClient, setIsClient] = useState(false);

  // Lấy giá trị variant từ tab đang chọn
  const variantValue = productType.find((p) => p.title === selectedTab)?.value || "all";

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        /**
         * GIẢI THÍCH QUERY:
         * 1. isFeatured == true: Chỉ lấy sản phẩm có tích chọn nổi bật.
         * 2. !(_id in path('drafts.**')): Loại bỏ các bản nháp chưa Publish.
         * 3. order(_createdAt desc): Sản phẩm mới nhất lên đầu.
         * 4. [0...10]: Giới hạn tối đa 10 sản phẩm.
         */
        const query =
          variantValue === "all"
            ? `*[_type == "product" && isFeatured == true && !(_id in path('drafts.**'))] | order(_createdAt desc){..., "categories": categories[]->title}[0...10]`
            : `*[_type == "product" && variant == $variant && isFeatured == true && !(_id in path('drafts.**'))] | order(_createdAt desc){..., "categories": categories[]->title}[0...10]`;

        const res = await client.fetch(query, { variant: variantValue });

        setProducts(res);
      } catch (err) {
        console.error("❌ LỖI TẢI SẢN PHẨM:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [variantValue, isClient]);

  // Giao diện khi đang chuẩn bị Client Side
  if (!isClient) {
    return (
      <Container className="flex flex-col my-10">
        <HomeTabbar selectedTab={selectedTab} onTabSelect={setSelectedTab} />
        <div className="flex items-center justify-center py-20 min-h-80">
          <Loader2 className="w-8 h-8 animate-spin text-gray-300" />
        </div>
      </Container>
    );
  }

  return (
    <Container className="flex flex-col my-10">
      {/* Thanh chọn danh mục */}
      <HomeTabbar selectedTab={selectedTab} onTabSelect={setSelectedTab} />

      {loading ? (
        // Hiệu ứng Loading chuyên nghiệp
        <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 bg-gray-50/50 rounded-2xl mt-8 shadow-inner border border-dashed border-gray-200">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          >
            <Loader2 className="w-8 h-8 text-green-600" />
          </motion.div>
          <span className="text-sm font-medium text-gray-500 animate-pulse">
            Đang tìm sản phẩm tốt nhất cho bạn...
          </span>
        </div>
      ) : products?.length > 0 ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="
              grid
              grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
              gap-4 sm:gap-6 mt-8
            "
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </motion.div>
        </AnimatePresence>
      ) : (
        // Hiển thị khi không có sản phẩm nào đạt điều kiện
        <div className="mt-8">
           <NoProductAvailable selectedTab={selectedTab} />
        </div>
      )}
    </Container>
  );
};

export default ProductGrid;