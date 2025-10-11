"use client"; // Sử dụng client

// Nhập các tiện ích và thành phần cần thiết
import { Product } from "@/sanity.types"; // Nhập định kiểu Sản phẩm (Product type)
import useStore from "@/store"; // Nhập hook cửa hàng (store hook)
import { Heart } from "lucide-react"; // Nhập biểu tượng Trái tim (Heart icon)
import Link from "next/link"; // Nhập component Liên kết (Link) từ Next.js
import React, { useEffect, useState } from "react"; // Nhập hook vòng đời (lifecycle hooks) từ React
import toast from "react-hot-toast"; // Nhập thư viện hiển thị thông báo (toast notifications)

// Định nghĩa giao diện/kiểu cho các props của component
interface FavoriteButtonProps {
  showProduct?: boolean; // Cờ để xác định hiển thị nút trên thanh menu hay trên trang chi tiết sản phẩm
  product?: Product | null | undefined; // Sản phẩm hiện tại (nếu showProduct là true)
}

// Component Nút Yêu thích
const FavoriteButton = ({
  showProduct = false,
  product,
}: FavoriteButtonProps) => {
  // Lấy hàm và trạng thái từ cửa hàng (store)
  const { favoriteProduct, addToFavorite } = useStore();
  
  // Khai báo trạng thái để lưu trữ sản phẩm hiện có trong danh sách yêu thích
  const [existingProduct, setExistingProduct] = useState<Product | null>(null);
  
  // Hook hiệu ứng để kiểm tra xem sản phẩm hiện tại có trong danh sách yêu thích hay không
  useEffect(() => {
    const availableItem = favoriteProduct.find(
      (item) => item?._id === product?._id
    );
    // Cập nhật trạng thái sản phẩm hiện có
    setExistingProduct(availableItem || null);
  }, [product, favoriteProduct]); // Chạy lại khi 'product' hoặc 'favoriteProduct' thay đổi

  // Hàm xử lý khi nhấn nút Thêm/Xóa khỏi Yêu thích
  const handleFavorite = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định
    if (product?._id) { // Đảm bảo sản phẩm có ID
      // Thêm/Xóa sản phẩm khỏi danh sách yêu thích và hiển thị thông báo
      addToFavorite(product).then(() => {
        toast.success(
          existingProduct
            ? "Đã xóa sản phẩm thành công!" // Thông báo khi sản phẩm đã được xóa
            : "Đã thêm sản phẩm thành công!" // Thông báo khi sản phẩm đã được thêm
        );
      });
    }
  };
  
  // Trả về JSX để hiển thị
  return (
    <>
      {/* Hiển thị biểu tượng trên thanh menu/header (Mặc định: showProduct = false) */}
      {!showProduct ? (
        <Link href={"/wishlist"} className="group relative">
          <Heart className="w-5 h-5 hover:text-shop_light_green hoverEffect" />
          {/* Vòng tròn hiển thị số lượng sản phẩm yêu thích */}
          <span className="absolute -top-1 -right-1 bg-shop_dark_green text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
            {/* Hiển thị số lượng sản phẩm yêu thích (hoặc 0 nếu không có) */}
            {favoriteProduct?.length ? favoriteProduct?.length : 0}
          </span>
        </Link>
      ) : (
        /* Hiển thị nút trên trang chi tiết sản phẩm (khi showProduct = true) */
        <button
          onClick={handleFavorite} // Gắn hàm xử lý sự kiện
          className="group relative hover:text-shop_light_green hoverEffect border border-shop_light_green/80 hover:border-shop_light_green p-1.5 rounded-sm"
        >
          {/* Hiển thị trái tim đã tô màu nếu sản phẩm đã có trong danh sách yêu thích */}
          {existingProduct ? (
            <Heart
              fill="#3b9c3c"
              className="text-shop_light_green/80 group-hover:text-shop_light_green hoverEffect mt-.5 w-5 h-5"
            />
          ) : (
            /* Hiển thị trái tim rỗng nếu sản phẩm chưa có trong danh sách yêu thích */
            <Heart className="text-shop_light_green/80 group-hover:text-shop_light_green hoverEffect mt-.5 w-5 h-5" />
          )}
        </button>
      )}
    </>
  );
};

// Xuất component
export default FavoriteButton;