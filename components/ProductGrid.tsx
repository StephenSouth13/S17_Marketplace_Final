"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
// Đã chuyển motion/react thành framer-motion (giả định cấu hình chuẩn)
import { motion, AnimatePresence } from "framer-motion"; 
import { client } from "@/sanity/lib/client";
import NoProductAvailable from "./NoProductAvailable";
import { Loader2 } from "lucide-react";
import Container from "./Container"; // Giữ nguyên import
import HomeTabbar from "./HomeTabbar";
import { productType } from "@/constants/data"; // Giả định productType chứa { title: "Tên Tab", value: "variant_backend" }
import { Product } from "@/sanity.types";

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  // Thiết lập tab mặc định là tab đầu tiên
  const [selectedTab, setSelectedTab] = useState(productType[0]?.title || "");
  // State để kiểm tra component đã mount trên client chưa (GIỮ LẠI để fix Hydration)
  const [isClient, setIsClient] = useState(false); 

  // --- Dựa trên sanity.types.ts, tên trường Sanity là 'variant' ---
  const query = `*[_type == "product" && variant == $variant] | order(name asc){
    ...,"categories": categories[]->title
  }`;
  // --------------------------------------------------------------------------------------

  // Ánh xạ tiêu đề tab đã chọn sang giá trị 'variant' backend
  // Sử dụng `productType.find(...)?.value` để lấy giá trị `value` chính xác đã sửa trong `constants/data.ts`
  const variantValue = productType.find((p) => p.title === selectedTab)?.value || selectedTab;
  const params = { variant: variantValue };

  // Giai đoạn 1: Đánh dấu đã mount trên client
  useEffect(() => {
    setIsClient(true);
  }, []);


  // Giai đoạn 2: Fetch data khi tab thay đổi
  useEffect(() => {
    if (!isClient) return; // Chỉ fetch sau khi đã mount trên client
    
    console.log("Fetching products with params:", params); // Giữ lại log để dễ debug

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await client.fetch(query, params);
        setProducts(response);
      } catch (error) {
        console.error("LỖI TẢI SẢN PHẨM:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedTab, isClient]); 

  // Nếu chưa mount trên client, render một trạng thái tĩnh 
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
      
      {/* KHỐI HIỂN THỊ DỮ LIỆU ĐỘNG */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full mt-10">
          <motion.div className="flex items-center space-x-2 text-blue-600">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Sản phẩm đang tải...</span>
          </motion.div>
        </div>
      ) : 
      
      /* KHỐI HIỂN THỊ DANH SÁCH SẢN PHẨM */
      products?.length ? (
        <AnimatePresence mode="wait">
          {/*           Đảm bảo motion.div không bị căn giữa (mx-auto).
          Chúng ta sẽ thêm `justify-start` (dành cho flex/grid) 
          hoặc đảm bảo không có `mx-auto` ở đây.
          Do nó là grid, nó sẽ tự động lấp đầy từ trái sang.
          Nếu vẫn bị lệch, hãy kiểm tra file Container.tsx xem có lỗi căn giữa ở đó không.
          Tạm thời, tôi giữ nguyên class vì cấu trúc này là chuẩn grid.
          */}
          <motion.div
            key={selectedTab} // Dùng selectedTab làm key để AnimatePresence trigger khi tab đổi
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-10"
          >
            {/* Map qua danh sách sản phẩm */}
            {products.map((product) => (
              <ProductCard key={product?._id} product={product} /> 
            ))}
          </motion.div>
        </AnimatePresence>
      ) : 
      
      /* KHỐI HIỂN THỊ KHI KHÔNG CÓ SẢN PHẨM */
      (
        <NoProductAvailable selectedTab={selectedTab} />
      )}
    </Container>
  );
};

export default ProductGrid;
