// Component: Đặc điểm Sản phẩm

import { Product } from "@/sanity.types"; // Nhập kiểu Product
import { getBrand } from "@/sanity/queries"; // Hàm truy vấn lấy thông tin Thương hiệu
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion"; // Nhập các component Accordion (Thanh mở rộng)

const ProductCharacteristics = async ({
  product,
}: {
  product: Product | null | undefined;
}) => {
  // Logic: Truy vấn thương hiệu.
  // Ghi chú: Cần đảm bảo hàm getBrand() sử dụng đúng ID/Reference của Brand
  // thay vì product.slug.current, nhưng giữ nguyên cú pháp hiện tại.
  const brand = await getBrand(product?.slug?.current as string);
  console.log(brand);

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          {/* Tiêu đề thanh mở rộng */}
          {product?.name}: Đặc điểm
        </AccordionTrigger>
        <AccordionContent>
          {/* Dòng 1: Thương hiệu */}
          <p className="flex items-center justify-between py-1 border-b border-gray-100">
            Thương hiệu:{" "}
            {brand && (
              <span className="font-semibold tracking-wide text-gray-800">
                {/* Giả định Brand trả về một mảng và chúng ta lấy tên thương hiệu từ phần tử đầu tiên */}
                {brand[0]?.brandName || "Đang cập nhật"}
              </span>
            )}
          </p>
          {/* Dòng 2: Bộ sưu tập/Năm sản xuất (Giá trị tĩnh: 2025) */}
          <p className="flex items-center justify-between py-1 border-b border-gray-100">
            Bộ sưu tập:{" "}
            <span className="font-semibold tracking-wide text-gray-800">2025</span>
          </p>
          {/* Dòng 3: Loại sản phẩm (Type/Variant) */}
          <p className="flex items-center justify-between py-1 border-b border-gray-100">
            Phân loại:{" "}
            <span className="font-semibold tracking-wide text-gray-800">
              {product?.variant}
            </span>
          </p>
          {/* Dòng 4: Tình trạng Tồn kho */}
          <p className="flex items-center justify-between py-1">
            Tình trạng kho:{" "}
            <span
              className={`font-semibold tracking-wide ${product?.stock ? "text-shop_dark_green" : "text-red-600"}`}
            >
              {product?.stock ? "Còn hàng" : "Hết hàng"}
            </span>
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductCharacteristics;