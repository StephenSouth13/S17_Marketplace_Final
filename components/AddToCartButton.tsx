"use client";

import { Product } from "@/sanity.types";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { ShoppingBag, ShoppingCart, CreditCard } from "lucide-react";
import useStore from "@/store";
import toast from "react-hot-toast";
import PriceFormatter from "./PriceFormatter";
import QuantityButtons from "./QuantityButtons";
import React from "react";
import { useRouter } from "next/navigation";

interface Props {
  product: Product;
  className?: string;
  children?: React.ReactNode;
}

const AddToCartButton: React.FC<Props> = ({ product, className, children }) => {
  const router = useRouter();
  const { addItem, getItemCount } = useStore();
  const itemCount = getItemCount(product?._id);
  const isOutOfStock = product?.stock === 0;

  const handleAddToCart = () => {
    if ((product?.stock as number) > itemCount) {
      addItem(product);
      toast.success(
        `${product?.name?.substring(0, 12)}... đã thêm vào giỏ!`
      );
    } else {
      toast.error("Vượt quá số lượng tồn kho.");
    }
  };

  const handleBuyNow = () => {
    if (!isOutOfStock) {
      if (itemCount === 0) addItem(product);
      router.push("/cart");
    }
  };

  return (
    <div className={cn("w-full flex flex-col gap-3", className)}>
      {itemCount > 0 ? (
        /* GIAO DIỆN KHI ĐÃ CÓ HÀNG TRONG GIỎ: XỊN & ĐẦY ĐỦ */
        <div className="space-y-3 animate-in fade-in zoom-in-95 duration-300">
          <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 flex items-center justify-between shadow-sm">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase text-emerald-600 tracking-widest mb-1">Số lượng đã chọn</span>
              <PriceFormatter
                amount={product?.price ? product.price * itemCount : 0}
                className="text-lg font-black text-gray-900 tracking-tighter"
              />
            </div>
            <QuantityButtons product={product} />
          </div>

          <Button
            onClick={() => router.push("/cart")}
            className="w-full h-14 bg-gray-900 hover:bg-black text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-3"
          >
            <CreditCard size={18} />
            Tiến hành thanh toán
          </Button>
        </div>
      ) : (
        /* GIAO DIỆN KHI CHƯA CÓ HÀNG: 2 NÚT SONG SONG ĐẲNG CẤP */
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full h-auto sm:h-14">
          <Button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={cn(
              "flex-1 w-full h-14 flex items-center justify-center gap-2 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shadow-lg",
              "bg-white text-emerald-600 border-2 border-emerald-600 hover:bg-emerald-50 disabled:opacity-50 active:scale-95",
            )}
          >
            <ShoppingCart className="w-5 h-5" strokeWidth={2.5} />
            {isOutOfStock ? "Hết hàng" : children || "Thêm Vào Giỏ"}
          </Button>

          <Button
            onClick={handleBuyNow}
            disabled={isOutOfStock}
            className={cn(
              "flex-1 w-full h-14 flex items-center justify-center gap-2 rounded-2xl text-[11px] font-black uppercase tracking-widest text-white transition-all shadow-lg shadow-rose-100 active:scale-95",
              "bg-rose-600 hover:bg-rose-700 disabled:opacity-50 disabled:grayscale",
            )}
          >
            <ShoppingBag className="w-5 h-5" strokeWidth={2.5} />
            Mua Ngay
          </Button>
        </div>
      )}
    </div>
  );
};

export default AddToCartButton;