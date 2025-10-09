"use client";
import { BRANDS_QUERYResult, Category, Product } from "@/sanity.types";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import Title from "./Title";
import CategoryList from "./shop/CategoryList";
import { useSearchParams } from "next/navigation";
import BrandList from "./shop/BrandList";
import PriceList from "./shop/PriceList";
import { client } from "@/sanity/lib/client";
import { Loader2 } from "lucide-react";
import NoProductAvailable from "./NoProductAvailable";
import ProductCard from "./ProductCard";

interface Props {
categories: Category[];
brands: BRANDS_QUERYResult;
}

const Shop = ({ categories, brands }: Props) => {
const searchParams = useSearchParams();
const brandParams = searchParams?.get("brand");
const categoryParams = searchParams?.get("category");

const [products, setProducts] = useState<Product[]>([]);
const [loading, setLoading] = useState(false);
const [selectedCategory, setSelectedCategory] = useState<string | null>(
categoryParams || null
);
const [selectedBrand, setSelectedBrand] = useState<string | null>(
brandParams || null
);
const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

const fetchProducts = async () => {
setLoading(true);
try {
let minPrice = 0;
let maxPrice = 10000;
if (selectedPrice) {
const [min, max] = selectedPrice.split("-").map(Number);
minPrice = min;
maxPrice = max;
}


  const query = `
    *[_type == 'product' 
      && (!defined($selectedCategory) || references(*[_type == "category" && slug.current == $selectedCategory]._id))
      && (!defined($selectedBrand) || references(*[_type == "brand" && slug.current == $selectedBrand]._id))
      && price >= $minPrice && price <= $maxPrice
    ] | order(name asc) {
      ...,
      "categories": categories[]->title
    }
  `;

  const data = await client.fetch(
    query,
    { selectedCategory, selectedBrand, minPrice, maxPrice },
    { next: { revalidate: 0 } }
  );
  setProducts(data);
} catch (error) {
  console.error("Lỗi tải sản phẩm:", error);
} finally {
  setLoading(false);
}


};

useEffect(() => {
fetchProducts();
}, [selectedCategory, selectedBrand, selectedPrice]);

return ( <div className="border-t bg-gradient-to-b from-white via-[#fafafa] to-[#f3f3f3]"> <Container className="mt-6">
{/* Header bộ lọc */} <div className="sticky top-0 z-10 mb-4 bg-white/70 backdrop-blur-md rounded-md shadow-sm px-4 py-3 flex items-center justify-between border border-gray-100"> <Title className="text-lg font-semibold tracking-wide text-gray-800 uppercase">
Tìm sản phẩm phù hợp với bạn </Title>
{(selectedCategory || selectedBrand || selectedPrice) && (
<button
onClick={() => {
setSelectedCategory(null);
setSelectedBrand(null);
setSelectedPrice(null);
}}
className="text-shop_dark_green underline text-sm font-medium hover:text-red-500 transition-colors"
>
Đặt lại bộ lọc </button>
)} </div>


    {/* Nội dung chính */}
    <div className="flex flex-col md:flex-row gap-6">
      {/* Bộ lọc bên trái */}
      <aside className="md:w-64 md:sticky md:top-24 md:self-start h-auto md:h-[calc(100vh-180px)] overflow-y-auto scrollbar-hide border border-gray-200 rounded-xl bg-white p-4 shadow-sm">
        <CategoryList
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <BrandList
          brands={brands}
          setSelectedBrand={setSelectedBrand}
          selectedBrand={selectedBrand}
        />
        <PriceList
          setSelectedPrice={setSelectedPrice}
          selectedPrice={selectedPrice}
        />
      </aside>

      {/* Danh sách sản phẩm */}
      <main className="flex-1">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-600">
            <Loader2 className="w-10 h-10 text-shop_dark_green animate-spin mb-2" />
            <p className="font-medium text-base">
              Đang tải sản phẩm, vui lòng chờ...
            </p>
          </div>
        ) : products?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <NoProductAvailable className="bg-white mt-10 rounded-xl shadow-sm" />
        )}
      </main>
    </div>
  </Container>
</div>


);
};

export default Shop;
