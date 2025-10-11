"use client"; // Sử dụng client

// Nhập các tiện ích và thành phần cần thiết
import { Product } from "@/sanity.types"; // Nhập định kiểu Sản phẩm (Product type)
import { Button } from "./ui/button"; // Nhập component Nút (Button)
import { cn } from "@/lib/utils"; // Nhập tiện ích kết hợp tên lớp (class name utility)
import { ShoppingBag } from "lucide-react"; // Nhập biểu tượng Túi mua sắm (ShoppingBag icon)
import useStore from "@/store"; // Nhập hook cửa hàng (store hook)
import toast from "react-hot-toast"; // Nhập thư viện hiển thị thông báo (toast notifications)
import PriceFormatter from "./PriceFormatter"; // Nhập component Định dạng giá (PriceFormatter)
import QuantityButtons from "./QuantityButtons"; // Nhập component Nút Số lượng (QuantityButtons)

// Định nghĩa giao diện/kiểu cho các props của component
interface Props {
  product: Product; // Sản phẩm hiện tại
  className?: string; // Tên lớp CSS tùy chọn
}

// Component Nút Thêm vào Giỏ hàng
const AddToCartButton = ({ product, className }: Props) => {
  // Lấy hàm và trạng thái từ cửa hàng (store)
  const { addItem, getItemCount } = useStore();
  
  // Lấy số lượng sản phẩm hiện có trong giỏ hàng
  const itemCount = getItemCount(product?._id);
  
  // Kiểm tra xem sản phẩm đã hết hàng chưa
  const isOutOfStock = product?.stock === 0;

  // Hàm xử lý khi thêm sản phẩm vào giỏ hàng
  const handleAddToCart = () => {
    // Kiểm tra số lượng tồn kho
    if ((product?.stock as number) > itemCount) {
      addItem(product); // Thêm sản phẩm vào giỏ hàng
      toast.success(
        `${product?.name?.substring(0, 12)}... đã được thêm thành công!` // Thông báo thành công
      );
    } else {
      // Thông báo lỗi nếu cố gắng thêm nhiều hơn số lượng tồn kho
      toast.error("Không thể thêm nhiều hơn số lượng tồn kho có sẵn");
    }
  };
  
  // Trả về JSX để hiển thị
  return (
    <div className="w-full h-12 flex items-center">
      {/* Hiển thị chi tiết số lượng và tổng phụ nếu sản phẩm đã có trong giỏ hàng */}
      {itemCount ? (
        <div className="text-sm w-full">
          <div className="flex items-center justify-between">
            <span className="text-xs text-darkColor/80">Số lượng</span>
            <QuantityButtons product={product} /> {/* Component điều chỉnh số lượng */}
          </div>
          <div className="flex items-center justify-between border-t pt-1">
            <span className="text-xs font-semibold">Tổng phụ</span>
            <PriceFormatter
              // Tính toán tổng phụ: Giá * Số lượng
              amount={product?.price ? product?.price * itemCount : 0}
            />
          </div>
        </div>
      ) : (
        // Hiển thị nút "Thêm vào Giỏ hàng" nếu sản phẩm chưa có trong giỏ hàng
        <Button
          onClick={handleAddToCart} // Gắn hàm xử lý sự kiện
          disabled={isOutOfStock} // Vô hiệu hóa nút nếu hết hàng
          className={cn(
            // Định kiểu CSS cho nút
            "w-full bg-shop_dark_green/80 text-lightBg shadow-none border border-shop_dark_green/80 font-semibold tracking-wide text-white hover:bg-shop_dark_green hover:border-shop_dark_green hoverEffect",
            className
          )}
        >
          <ShoppingBag /> {/* Biểu tượng túi mua sắm */}
          {/* Văn bản hiển thị: "Hết hàng" hoặc "Thêm vào Giỏ hàng" */}
          {isOutOfStock ? "Hết hàng" : "Thêm vào Giỏ hàng"}
        </Button>
      )}
    </div>
  );
};

// Xuất component
export default AddToCartButton;