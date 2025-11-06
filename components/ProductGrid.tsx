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

  // Get variant value from selected tab (memoized)
  const variantValue = productType.find((p) => p.title === selectedTab)?.value || "all";

  // Bảo đảm chỉ fetch khi đã mount client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch sản phẩm từ Sanity - optimized to prevent infinite loops
  useEffect(() => {
    if (!isClient) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const query =
          variantValue === "all"
            ? `*[_type == "product" && isFeatured == true] | order(_createdAt desc){..., "categories": categories[]->title}`
            : `*[_type == "product" && variant == $variant && isFeatured == true] | order(_createdAt desc){..., "categories": categories[]->title}`;

        const res =
          variantValue === "all"
            ? await client.fetch(query)
            : await client.fetch(query, { variant: variantValue });

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

  // Loader
  if (!isClient)
    return (
      <Container className="flex flex-col my-10">
        <HomeTabbar selectedTab={selectedTab} onTabSelect={setSelectedTab} />
        <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 bg-gray-50 rounded-xl mt-8 shadow-inner">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          <span className="text-sm text-gray-500">Đang chuẩn bị nội dung...</span>
        </div>
      </Container>
    );

  return (
    <Container className="flex flex-col my-10">
      <HomeTabbar selectedTab={selectedTab} onTabSelect={setSelectedTab} />

      {loading ? (
        <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 bg-gray-50 rounded-xl mt-8 shadow-inner">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-2 text-green-600"
          >
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="font-medium">Đang tải sản phẩm...</span>
          </motion.div>
        </div>
      ) : products?.length ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="
              grid
              grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
              gap-3 sm:gap-4 md:gap-5 mt-8
            "
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
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
