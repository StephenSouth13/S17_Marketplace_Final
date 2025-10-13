"use client";

import React, { useState, useMemo } from "react";
import { ServiceCard } from "@/components/ServiceCard";
import { ServiceFilter } from "@/components/ServiceFilter";

interface Service {
  _id: string;
  title: string;
  slug?: string;
  excerpt?: string;
  priceRange?: string;
  mainImage?: { asset?: { url?: string } };
  category?: { title?: string };
}

export const ServicesGrid = ({ services }: { services: Service[] }) => {
  const [filters, setFilters] = useState<{ keyword?: string; category?: string; price?: string }>({});
  const categories = Array.from(new Set(services.map((s) => s.category?.title).filter(Boolean))) as string[];

  const filtered = useMemo(() => {
    return services.filter((s) => {
      const matchKeyword =
        !filters.keyword || s.title.toLowerCase().includes(filters.keyword.toLowerCase());
      const matchCategory = !filters.category || s.category?.title === filters.category;
      const matchPrice =
        !filters.price ||
        (filters.price === "low" && (s.priceRange?.includes("5") || s.priceRange?.includes("triệu") && s.priceRange.includes("-5"))) ||
        (filters.price === "medium" && s.priceRange?.includes("5") && s.priceRange?.includes("20")) ||
        (filters.price === "high" && s.priceRange?.includes("20"));
      return matchKeyword && matchCategory && matchPrice;
    });
  }, [services, filters]);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
          Tất cả dịch vụ
        </h1>

        <ServiceFilter categories={categories} onFilter={setFilters} />

        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 py-20">Không tìm thấy dịch vụ nào phù hợp.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((svc) => (
              <ServiceCard key={svc._id} service={svc} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
