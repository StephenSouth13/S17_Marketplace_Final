"use client";

import React, { useState } from "react";

interface Props {
  categories: string[];
  onFilter: (filters: { keyword?: string; category?: string; price?: string }) => void;
}

export const ServiceFilter = ({ categories, onFilter }: Props) => {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  return (
    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-4 mb-8 flex flex-wrap gap-4 items-center justify-between">
      {/* Search */}
      <input
        type="text"
        placeholder="Tìm kiếm dịch vụ..."
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
          onFilter({ keyword: e.target.value, category, price });
        }}
        className="border rounded-lg px-3 py-2 text-sm w-full sm:w-1/3"
      />

      {/* Category */}
      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          onFilter({ keyword, category: e.target.value, price });
        }}
        className="border rounded-lg px-3 py-2 text-sm"
      >
        <option value="">Tất cả danh mục</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Price range */}
      <select
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
          onFilter({ keyword, category, price: e.target.value });
        }}
        className="border rounded-lg px-3 py-2 text-sm"
      >
        <option value="">Tất cả giá</option>
        <option value="low">Dưới 5 triệu</option>
        <option value="medium">5 - 20 triệu</option>
        <option value="high">Trên 20 triệu</option>
      </select>
    </div>
  );
};
