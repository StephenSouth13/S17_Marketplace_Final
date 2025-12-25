"use client";



import { Product } from "@/sanity.types";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { ShoppingBag } from "lucide-react";

import useStore from "@/store";

import toast from "react-hot-toast";

import PriceFormatter from "@/components/PriceFormatter";

import QuantityButtons from "@/components/QuantityButtons";

import React from "react";



interface Props {

  product: Product;

  className?: string;

  children?: React.ReactNode;

}



const AddToCartButton: React.FC<Props> = ({ product, className, children }) => {

  const { addItem, getItemCount } = useStore();

  const itemCount = getItemCount(product?._id);

  const isOutOfStock = product?.stock === 0;



  const handleAddToCart = () => {

    if ((product?.stock as number) > itemCount) {

      addItem(product);

      toast.success(

        `${product?.name?.substring(0, 12)}... đã được thêm vào giỏ hàng!`

      );

    } else {

      toast.error("Không thể thêm nhiều hơn số lượng tồn kho có sẵn.");

    }

  };



  return (

    <div className="w-full h-auto flex flex-col justify-center">

      {itemCount ? (

        <div className="text-sm w-full">

          <div className="flex items-center justify-between">

            <span className="text-xs text-darkColor/80">Số lượng</span>

            <QuantityButtons product={product} />

          </div>



          <div className="flex items-center justify-between border-t pt-1 mt-1">

            <span className="text-xs font-semibold">Tổng phụ</span>

            <PriceFormatter

              amount={product?.price ? product.price * itemCount : 0}

            />

          </div>

        </div>

      ) : (

        <Button

          onClick={handleAddToCart}

          disabled={isOutOfStock}

          className={cn(

            "w-full flex items-center justify-center gap-2 rounded-full py-2.5 px-3 text-sm font-semibold text-white transition-all select-none",

            "bg-gradient-to-r from-shop_dark_green to-green-500 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed",

            "whitespace-nowrap overflow-hidden text-ellipsis",

            "max-sm:text-xs max-sm:py-2",

            className

          )}

        >

          <ShoppingBag className="w-4 h-4 shrink-0" />

          {isOutOfStock

            ? "Hết hàng"

            : children

            ? children

            : "Thêm vào Giỏ hàng"}

        </Button>

      )}

    </div>

  );

};



export default AddToCartButton;