"use client";

import { Product } from "@/sanity.types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ShoppingBag, ShoppingCart, CreditCard } from "lucide-react";
import useStore from "@/store";
import toast from "react-hot-toast";
import QuantityButtons from "@/components/QuantityButtons";
import React from "react";
import { useRouter, usePathname } from "next/navigation";

interface Props {
  product: Product;
  className?: string;
}

const AddToCartButton: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { addItem, getItemCount } = useStore();
  const itemCount = getItemCount(product?._id);
  const isOutOfStock = product?.stock === 0;

  // Tự động nhận diện trang chi tiết dựa trên URL
  const isProductPage = pathname.includes("/product/");

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if ((product?.stock as number) > itemCount) {
      addItem(product);
      toast.success("Đã thêm vào giỏ hàng");
    }
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOutOfStock) {
      if (itemCount === 0) addItem(product);
      router.push("/cart");
    }
  };

  return (
    <div className={cn("w-full transition-all duration-300", className)}>
      {itemCount > 0 ? (
        /* GIAO DIỆN KHI ĐÃ CÓ HÀNG: GỌN GÀNG & SẮC NÉT */
        <div className={cn("flex flex-col gap-2 animate-in fade-in slide-in-from-right-2 duration-300")}>
          <div className={cn(
            "flex items-center justify-between border rounded-xl shadow-sm overflow-hidden bg-white transition-all",
            isProductPage ? "p-4 border-emerald-200" : "p-1 border-emerald-100"
          )}>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase text-emerald-600 tracking-widest leading-none mb-1">
                {isProductPage ? "Số lượng đã chọn" : "SL"}
              </span>
            </div>
            <QuantityButtons product={product} />
          </div>

          {isProductPage && (
            <Button
              onClick={() => router.push("/cart")}
              className="w-full h-12 bg-gray-900 text-white rounded-xl font-black uppercase text-[10px] tracking-[0.2em] shadow-lg active:scale-95 flex items-center justify-center gap-2"
            >
              <CreditCard size={16} /> Thanh toán
            </Button>
          )}
        </div>
      ) : (
        /* GIAO DIỆN NÚT BẤM BAN ĐẦU: KHÔNG LÀM TRÀN LAYOUT */
        <div className={cn(
          "flex items-center gap-2 w-full", 
          isProductPage ? "flex-col sm:flex-row h-auto" : "h-11"
        )}>
          {/* NÚT THÊM VÀO GIỎ */}
          <Button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={cn(
              "flex-1 h-full flex items-center justify-center gap-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95",
              isProductPage 
                ? "bg-white text-emerald-600 border-2 border-emerald-600 h-14 shadow-lg shadow-emerald-50 hover:bg-emerald-50" 
                : "bg-emerald-600 text-white border-none shadow-md",
            )}
          >
            <ShoppingCart size={isProductPage ? 20 : 16} strokeWidth={3} />
            <span className="truncate">{isOutOfStock ? "HẾT HÀNG" : isProductPage ? "THÊM VÀO GIỎ" : "THÊM VÀO"}</span>
          </Button>

          {/* NÚT MUA NGAY (CHỈ HIỆN Ở TRANG CHI TIẾT) */}
          {isProductPage && (
            <Button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="flex-1 w-full h-14 bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-100 active:scale-95 flex items-center justify-center gap-2"
            >
              <ShoppingBag size={20} strokeWidth={3} />
              MUA NGAY
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default AddToCartButton;