"use client";

import { Product } from "@/sanity.types";
import useStore from "@/store";
import React from "react";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface Props {
  product: Product;
  className?: string;
}

const QuantityButtons = ({ product, className }: Props) => {
  const { addItem, removeItem, getItemCount } = useStore();
  const itemCount = getItemCount(product?._id);

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    removeItem(product?._id);
    toast.success("Đã giảm số lượng", { icon: "📉", duration: 1000 });
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if ((product?.stock as number) > itemCount) {
      addItem(product);
      toast.success("Đã tăng số lượng", { icon: "📈", duration: 1000 });
    } else {
      toast.error("Đạt giới hạn tồn kho");
    }
  };

  return (
    <div className={cn("flex items-center gap-2 bg-gray-100/50 p-1 rounded-lg border border-gray-200", className)}>
      <Button
        onClick={handleRemove}
        variant="ghost"
        size="icon"
        className="w-7 h-7 rounded-md bg-white border border-gray-300 shadow-sm hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all active:scale-90"
      >
        <Minus size={14} strokeWidth={3} />
      </Button>

      <span className="font-black text-sm min-w-[20px] text-center text-gray-900 tabular-nums">
        {itemCount}
      </span>

      <Button
        onClick={handleAdd}
        variant="ghost"
        size="icon"
        disabled={product.stock <= itemCount}
        className="w-7 h-7 rounded-md bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 transition-all active:scale-90 disabled:opacity-30"
      >
        <Plus size={14} strokeWidth={3} />
      </Button>
    </div>
  );
};

export default QuantityButtons;