"use client";

import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { StarIcon } from "@sanity/icons";
import { ShoppingBag, ShoppingCart } from "lucide-react"; 
import Title from "./Title";
import ProductSideMenu from "./ProductSideMenu";
import AddToCartButton from "./AddToCartButton";
import useCartStore from "@/store";

const formatVND = (price: number | null | undefined): string => {
  if (price === null || price === undefined || isNaN(price)) return "Liên hệ";
  return price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};

const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);

  if (!product || !product.slug?.current) return null;

  const price = product?.price ?? 0;
  const discount = product?.discount ?? 0;
  const hasDiscount = discount > 0;
  const finalPrice = hasDiscount ? price * (1 - discount / 100) : price;

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock === 0) return;
    addItem(product);
    router.push("/cart"); 
  };

  return (
    <div className="group flex flex-col justify-between border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden font-sans">
      {/* Ảnh sản phẩm */}
      <div className="relative bg-gray-50 w-full h-48 sm:h-60 flex items-center justify-center overflow-hidden">
        {product?.images?.[0] ? (
          <Link href={`/product/${product.slug.current}`} className="w-full h-full">
            <Image
              src={urlFor(product.images[0]).url()}
              alt={product?.name ?? "Product"}
              width={400}
              height={400}
              className={`w-full h-full object-contain p-4 transition-transform duration-500 ${product?.stock !== 0 ? "group-hover:scale-110" : "opacity-60 grayscale"}`}
            />
          </Link>
        ) : (
          <Image src="/no-image.png" alt="No image" width={400} height={400} className="w-full h-full object-contain p-4 opacity-70" />
        )}
        <div className="absolute top-2 right-2"><ProductSideMenu product={product} /></div>
        {hasDiscount && (
          <span className="absolute top-2 left-2 text-[10px] font-black bg-red-600 text-white px-2 py-0.5 rounded-lg shadow-sm">-{discount}%</span>
        )}
      </div>

      {/* Nội dung */}
      <div className="flex flex-col justify-between flex-1 p-3 sm:p-4 min-h-[200px] sm:min-h-[220px]">
        <div className="space-y-1">
          <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">S17 Market</p>
          <Title className="text-[13px] sm:text-sm font-bold text-gray-900 line-clamp-2 leading-tight min-h-[2.5em]">
            {product?.name}
          </Title>
          <div className="flex items-center gap-0.5">
             {[...Array(5)].map((_, i) => (
               <StarIcon key={i} className="w-3 h-3 text-yellow-400" fill="#facc15" />
             ))}
          </div>
        </div>

        <div className="mt-auto pt-3">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <p className="text-base sm:text-lg font-black text-gray-900 tracking-tighter">{formatVND(finalPrice)}</p>
            {hasDiscount && <p className="text-[9px] text-gray-400 line-through opacity-60">{formatVND(price)}</p>}
          </div>

          <p className={`text-[9px] font-bold mt-1 uppercase ${product?.stock === 0 ? "text-red-500" : "text-emerald-500"}`}>
            {product?.stock === 0 ? "Hết hàng" : `Còn ${product?.stock ?? 0} SP`}
          </p>

          {/* Cụm nút bấm: Mobile xếp dọc (col), Desktop xếp ngang (row) */}
          <div className="flex flex-col sm:flex-row items-center gap-1 mt-4 w-full">
            {/* Nút Thêm Vào - Xanh lá Emerald */}
            <AddToCartButton
              product={product}
              className="w-full sm:flex-1 h-10 sm:h-11 flex items-center justify-center gap-0.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all active:scale-[0.97] shadow-sm"
            >
              <ShoppingCart size={10} strokeWidth={2} />
              <span className="text-[11px] font-black uppercase whitespace-nowrap">Thêm Vào</span>
            </AddToCartButton>

            {/* Nút Mua Ngay - Đỏ hồng Rose */}
            <button
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              className={`w-full sm:flex-1 h-10 sm:h-11 flex items-center justify-center gap- bg-rose-600 text-white rounded-xl hover:bg-rose-700 transition-all active:scale-[0.97] shadow-sm ${product.stock === 0 ? "opacity-50 cursor-not-allowed grayscale" : ""}`}
            >
              <ShoppingBag size={15} strokeWidth={2.5} />
              <span className="text-[11px] font-black uppercase whitespace-nowrap">Mua Ngay</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;