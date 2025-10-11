"use client"; // Sử dụng client

// Nhập các tiện ích và thành phần cần thiết
import { cn } from "@/lib/utils"; // Nhập tiện ích kết hợp tên lớp (class name utility)
import { Product } from "@/sanity.types"; // Nhập định kiểu Sản phẩm (Product type)
import useStore from "@/store"; // Nhập hook cửa hàng (store hook)
import { Heart } from "lucide-react"; // Nhập biểu tượng Trái tim (Heart icon)
import { useEffect, useState } from "react"; // Nhập hook vòng đời (lifecycle hooks) từ React
import toast from "react-hot-toast"; // Nhập thư viện hiển thị thông báo (toast notifications)

// Định nghĩa giao diện/kiểu cho các props của component
interface ProductSideMenuProps {
  product: Product; // Sản phẩm hiện tại
  className?: string; // Tên lớp CSS tùy chọn
}

// Component menu phụ sản phẩm
const ProductSideMenu = ({
  product,
  className,
}: ProductSideMenuProps) => {
  // Lấy hàm và trạng thái từ cửa hàng (store)
  const { favoriteProduct, addToFavorite } = useStore();
  
  // Khai báo trạng thái để lưu trữ sản phẩm hiện có trong danh sách yêu thích
  const [existingProduct, setExistingProduct] = useState<Product | null>(null);

  // Hook hiệu ứng để kiểm tra xem sản phẩm có trong danh sách yêu thích hay không
  useEffect(() => {
    const availableProduct = favoriteProduct?.find(
      (item) => item?._id === product?._id
    );
    // Cập nhật trạng thái sản phẩm hiện có
    setExistingProduct(availableProduct || null);
  }, [product, favoriteProduct]); // Chạy lại khi 'product' hoặc 'favoriteProduct' thay đổi
  
  // Hàm xử lý khi nhấn vào biểu tượng yêu thích
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
    <div
      // Kết hợp các tên lớp: vị trí tuyệt đối, góc trên bên phải, con trỏ hover
      className={cn("absolute top-2 right-2 hover:cursor-pointer", className)}
    >
      <div
        onClick={handleFavorite} // Gắn hàm xử lý sự kiện
        // Định kiểu động dựa trên việc sản phẩm đã có trong danh sách yêu thích hay chưa
        className={`p-2.5 rounded-full hover:bg-shop_dark_green/80 hover:text-white hoverEffect  ${existingProduct ? "bg-shop_dark_green/80 text-white" : "bg-lightColor/10"}`}
      >
        <Heart size={15} /> {/* Biểu tượng trái tim */}
      </div>
    </div>
  );
};

// Xuất component
export default ProductSideMenu;