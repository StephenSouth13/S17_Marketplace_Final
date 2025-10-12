"use client";

import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Filter, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Container from "@/components/Container";
import Title from "@/components/Title";
import { urlFor } from "@/sanity/lib/image";

interface Service {
  _id: string;
  slug: { current: string };
  title: string;
  excerpt: string;
  mainImage: any | null;
  categoryTitle: string;
  categorySlug: string;
  pricingModel: "tiered" | "custom";
  priceRange: { min: number; max: number } | null;
  minPrice?: number;
}

const formatVND = (amount?: number | null) =>
  Number(amount ?? 0).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  });

/* ----------------------------------- CARD ----------------------------------- */
function ServiceCard({ service }: { service: Service }) {
  const { slug, title, excerpt, mainImage, pricingModel, priceRange, minPrice } = service;
  const displayPrice = () =>
    pricingModel === "custom" && priceRange?.min
      ? `Từ ${formatVND(priceRange.min)}`
      : pricingModel === "tiered" && minPrice
      ? `Gói từ ${formatVND(minPrice)}`
      : "Liên hệ báo giá";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl overflow-hidden group"
    >
      <Link href={`/services/${slug.current}`} className="block relative">
        <Image
          src={mainImage ? urlFor(mainImage).width(800).url() : "/s17co/placeholder.png"}
          alt={title || "Dịch vụ S17"}
          width={800}
          height={500}
          className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all"></div>
      </Link>

      <div className="p-5 flex flex-col gap-3">
        <Link href={`/services/${slug.current}`}>
          <h3 className="text-[17px] font-semibold text-gray-900 group-hover:text-emerald-600 line-clamp-2 leading-snug">
            {title}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 line-clamp-2">{excerpt}</p>

        <div className="flex items-center gap-1 text-yellow-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={`star-${i}`} size={15} className="fill-yellow-400" />
          ))}
          <span className="text-xs text-gray-500 ml-1">(5.0)</span>
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="font-semibold text-lg bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
            {displayPrice()}
          </span>
          <Link href={`/services/${slug.current}`}>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full px-4 border-emerald-500 text-emerald-600 hover:bg-emerald-600 hover:text-white"
            >
              Xem chi tiết
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ----------------------------------- FILTER ----------------------------------- */
function ServiceCategories({
  categories,
  selected,
  onChange,
}: {
  categories: string[];
  selected: string | null;
  onChange: (v: string | null) => void;
}) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex items-center gap-2 text-emerald-700 font-semibold mb-3">
        <Filter size={16} />
        Danh mục dịch vụ
      </div>
      <RadioGroup value={selected ?? ""} className="space-y-2">
        {categories.map((cat) => (
          <div key={`cat-${cat}`} onClick={() => onChange(cat)} className="flex items-center gap-2 cursor-pointer">
            <RadioGroupItem value={cat} id={cat} />
            <Label
              htmlFor={cat}
              className={`${
                selected === cat ? "text-emerald-700 font-semibold" : "text-gray-700"
              } hover:text-emerald-600`}
            >
              {cat}
            </Label>
          </div>
        ))}
      </RadioGroup>
      {selected && (
        <button
          onClick={() => onChange(null)}
          className="text-xs mt-3 underline text-emerald-600 hover:text-red-500"
        >
          Xóa lựa chọn
        </button>
      )}
    </div>
  );
}

const PRICE_RANGES = [
  { label: "Dưới 10.000.000 ₫", value: "0-10000000" },
  { label: "10.000.000 ₫ – 30.000.000 ₫", value: "10000000-30000000" },
  { label: "30.000.000 ₫ – 80.000.000 ₫", value: "30000000-80000000" },
  { label: "Trên 80.000.000 ₫", value: "80000000-999999999" },
];

function PriceFilter({
  selected,
  onChange,
}: {
  selected: string | null;
  onChange: (v: string | null) => void;
}) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex items-center gap-2 text-emerald-700 font-semibold mb-3">
        <Sparkles size={16} />
        Khoảng giá khởi điểm
      </div>
      <RadioGroup value={selected ?? ""} className="space-y-2">
        {PRICE_RANGES.map((p) => (
          <div key={`price-${p.value}`} onClick={() => onChange(p.value)} className="flex items-center gap-2 cursor-pointer">
            <RadioGroupItem value={p.value} id={p.value} />
            <Label
              htmlFor={p.value}
              className={`${
                selected === p.value ? "text-emerald-700 font-semibold" : "text-gray-700"
              } hover:text-emerald-600`}
            >
              {p.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
      {selected && (
        <button
          onClick={() => onChange(null)}
          className="text-xs mt-3 underline text-emerald-600 hover:text-red-500"
        >
          Xóa lựa chọn
        </button>
      )}
    </div>
  );
}

/* ----------------------------------- PROMO ----------------------------------- */
function PromoBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-white via-emerald-50 to-white"
    >
      <Image
        src="/s17co/7.png"
        alt="Ưu đãi đặc biệt S17"
        width={1600}
        height={500}
        className="w-full h-56 object-cover opacity-90"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
      <div className="absolute left-8 top-8 text-white drop-shadow-md">
        <p className="text-xs uppercase tracking-wider">Ưu đãi tuần này</p>
        <h3 className="text-3xl font-bold leading-tight">Nâng cấp thương hiệu cùng S17</h3>
        <p className="text-sm opacity-95">Giảm 15% cho gói thiết kế thương hiệu</p>
        <Button className="mt-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-md">
          Nhận ưu đãi ngay
        </Button>
      </div>
    </motion.div>
  );
}

/* ----------------------------------- MAIN ----------------------------------- */
async function fetchServicesFromApi(): Promise<Service[]> {
  const res = await fetch("/api/services", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch services");
  const json = await res.json();
  return json.data || [];
}

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchServicesFromApi()
      .then((data) => mounted && setServices(data))
      .catch(() => mounted && setServices([]))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  const categories = useMemo(
    () => Array.from(new Set(services.map((s) => s.categoryTitle))).filter(Boolean),
    [services]
  );

  const filtered = useMemo(() => {
    let items = [...services];
    if (selectedCategory) items = items.filter((s) => s.categoryTitle === selectedCategory);
    if (selectedPrice) {
      const [min, max] = selectedPrice.split("-").map(Number);
      items = items.filter((s) => {
        const price = s.pricingModel === "custom" ? s.priceRange?.min : s.minPrice;
        return price && price >= min && price <= max;
      });
    }
    return items;
  }, [services, selectedCategory, selectedPrice]);

  return (
    <div className="bg-gradient-to-b from-white via-emerald-50/50 to-white border-t">
      <Container className="mt-6">
        <div className="sticky top-0 z-10 mb-6 bg-white/70 backdrop-blur-lg rounded-xl px-5 py-4 shadow-sm flex items-center justify-between border border-gray-100">
          <Title className="text-lg font-semibold tracking-wide text-gray-800 uppercase">
            Dịch vụ chuyên nghiệp tại S17
          </Title>
          {(selectedCategory || selectedPrice) && (
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSelectedPrice(null);
              }}
              className="text-emerald-700 underline text-sm font-medium hover:text-red-500 transition-colors"
            >
              Đặt lại bộ lọc
            </button>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-72 md:sticky md:top-24 md:self-start space-y-6">
            <ServiceCategories
              categories={categories}
              selected={selectedCategory}
              onChange={setSelectedCategory}
            />
            <PriceFilter selected={selectedPrice} onChange={setSelectedPrice} />
          </aside>

          <main className="flex-1">
            <PromoBanner />

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={`skeleton-${i}`} className="animate-pulse bg-white rounded-2xl h-64 shadow-sm" />
                ))}
              </div>
            ) : (
              <motion.div layout className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((svc) => (
                  <ServiceCard key={svc._id} service={svc} />
                ))}
              </motion.div>
            )}

            {!loading && filtered.length === 0 && (
              <div className="text-center text-gray-600 bg-white mt-12 rounded-2xl shadow-sm border border-gray-100 p-10">
                Không có dịch vụ phù hợp với bộ lọc hiện tại.
              </div>
            )}
          </main>
        </div>
      </Container>
    </div>
  );
}
