import Shop from "@/components/Shop";
import HomeCategories from "@/components/HomeCategories";
import { getAllBrands, getCategories } from "@/sanity/queries";
import React from "react";

const ShopPage = async () => {
  const categories = await getCategories();
  const brands = await getAllBrands();

  return (
    <div className="bg-white">
    
      

      {/* Danh sách sản phẩm + bộ lọc */}
      <Shop categories={categories} brands={brands} />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <HomeCategories categories={categories} />
      </div>
    </div>
  );
};

export default ShopPage;
