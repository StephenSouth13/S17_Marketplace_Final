"use client";

import Image from "next/image";
import React, { useMemo, useState, useEffect } from "react";
import Container from "@/components/Container";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";

// Fallback mock data
const MOCK_SERVICES = [
  { id: "svc-001", slug: "thiet-ke-thuong-hieu", name: "Thiết kế thương hiệu trọn gói", description: "Từ logo, guideline đến bộ nhận diện ��ng dụng.", category: "Thiết kế thương hiệu", price: 1290000, rating: 5, image: "/s17co/1.png" },
  { id: "svc-002", slug: "tu-van-truyen-thong", name: "Tư vấn chiến lược truyền thông", description: "Xây chiến lược truyền thông tổng thể.", category: "Truyền thông", price: 2990000, rating: 4, image: "/s17co/2.png" },
  { id: "svc-003", slug: "quan-ly-kenh-social", name: "Quản lý kênh Social Media", description: "Lên lịch nội dung, thiết kế hình ảnh.", category: "Truyền thông", price: 1590000, rating: 4, image: "/s17co/3.png" },
  { id: "svc-004", slug: "san-xuat-noi-dung", name: "Sản xuất nội dung chuẩn thương hiệu", description: "Copywriting, visual và video ngắn.", category: "Nội dung", price: 890000, rating: 5, image: "/s17co/4.png" },
  { id: "svc-005", slug: "dao-tao-marketing", name: "Đào tạo Marketing nội bộ", description: "Workshop thực hành cho đội ngũ.", category: "Đào tạo", price: 1990000, rating: 5, image: "/s17co/5.png" },
  { id: "svc-006", slug: "thiet-ke-website", name: "Thiết kế Website chuẩn SEO", description: "Giao diện sạch, tốc độ tối ưu.", category: "Thiết kế thương hiệu", price: 4990000, rating: 4, image: "/s17co/6.png" },
];

const formatVND = (amount: number) =>
  Number(amount ?? 0).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

function ServiceCard({ name, description, price, rating, image }: { name: string; description: string; price: number; rating: number; image: string | null; }) {
  return (
    <div className="group bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all overflow-hidden">
      <div className="relative bg-gray-50">
        <Image src={image || "/s17co/1.png"} alt={name} width={600} height={400} className="w-full h-48 object-cover" />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <Title className="text-base font-semibold leading-snug group-hover:text-shop_dark_green">{name}</Title>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>

        <div className="flex items-center gap-1 mt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={16} className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
          ))}
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold bg-gradient-to-r from-shop_light_green to-emerald-500 bg-clip-text text-transparent">{formatVND(price)}</span>
          <div className="flex gap-2">
            <Button size="sm" className="rounded-full px-4">Đặt ngay</Button>
            <Button size="sm" variant="outline" className="rounded-full px-4">Xem chi tiết</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceCategories({ categories, selected, onChange }: { categories: string[]; selected: string | null; onChange: (val: string | null) => void; }) {
  return (
    <div className="w-full bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
      <Title className="text-base font-black">Danh mục dịch vụ</Title>
      <RadioGroup value={selected ?? ""} className="mt-3 space-y-2">
        {categories.map((cat) => (
          <div key={cat} onClick={() => onChange(cat)} className="flex items-center gap-2 hover:cursor-pointer">
            <RadioGroupItem value={cat} id={cat} className="rounded-sm" />
            <Label htmlFor={cat} className={selected === cat ? "font-semibold text-shop_dark_green" : "font-normal"}>{cat}</Label>
          </div>
        ))}
      </RadioGroup>
      {selected && (
        <button onClick={() => onChange(null)} className="text-sm font-medium mt-2 underline underline-offset-2 decoration-[1px] hover:text-shop_dark_green hoverEffect text-left">Xóa lựa chọn</button>
      )}
    </div>
  );
}

const PRICE_RANGES = [
  { label: "Dưới 1.000.000 ₫", value: "0-1000000" },
  { label: "1.000.000 ₫ – 2.000.000 ₫", value: "1000000-2000000" },
  { label: "2.000.000 ₫ – 5.000.000 ₫", value: "2000000-5000000" },
  { label: "Trên 5.000.000 ₫", value: "5000000-100000000" },
];

function PriceFilter({ selected, onChange }: { selected: string | null; onChange: (val: string | null) => void; }) {
  return (
    <div className="w-full bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
      <Title className="text-base font-black">Khoảng giá</Title>
      <RadioGroup value={selected ?? ""} className="mt-3 space-y-2">
        {PRICE_RANGES.map((p) => (
          <div key={p.value} onClick={() => onChange(p.value)} className="flex items-center gap-2 hover:cursor-pointer">
            <RadioGroupItem value={p.value} id={p.value} className="rounded-sm" />
            <Label htmlFor={p.value} className={selected === p.value ? "font-semibold text-shop_dark_green" : "font-normal"}>{p.label}</Label>
          </div>
        ))}
      </RadioGroup>
      {selected && (
        <button onClick={() => onChange(null)} className="text-sm font-medium mt-2 underline underline-offset-2 decoration-[1px] hover:text-shop_dark_green hoverEffect text-left">Xóa lựa chọn</button>
      )}
    </div>
  );
}

function PromoBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-br from-white via-green-50 to-white">
      <Image src="/s17co/7.png" alt="Dịch vụ nổi bật S17" width={1600} height={500} className="w-full h-56 object-cover opacity-95" priority />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
      <div className="absolute left-6 top-6 text-white drop-shadow">
        <p className="text-xs uppercase tracking-wider">Ưu đãi tuần này</p>
        <h3 className="text-2xl font-bold leading-tight">Nâng cấp thương hiệu cùng S17</h3>
        <p className="text-sm opacity-95">Giảm 15% cho gói thiết kế thương hiệu</p>
        <Button className="mt-4 rounded-full bg-shop_light_green hover:bg-shop_btn_dark_green">Nhận ưu đãi</Button>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  const [services, setServices] = useState<any[]>(MOCK_SERVICES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function fetchServices() {
      try {
        const res = await fetch('/api/services');
        const json = await res.json();
        if (mounted && json?.data) setServices(json.data);
      } catch (e) {
        console.error('Failed to fetch services, using mock', e);
        if (mounted) setServices(MOCK_SERVICES);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchServices();
    return () => { mounted = false };
  }, []);

  const categories = useMemo(() => Array.from(new Set(services.map((s) => s.category || s.raw?.category || s.raw?.category?.title || 'Không phân loại'))), [services]);

  const filtered = useMemo(() => {
    let items = [...services];
    if (selectedCategory) items = items.filter((s) => (s.category || s.raw?.category?.title) === selectedCategory);
    if (selectedPrice) {
      const [min, max] = selectedPrice.split('-').map((n) => Number(n));
      items = items.filter((s) => (s.price ?? 0) >= min && (s.price ?? 0) <= max);
    }
    return items;
  }, [services, selectedCategory, selectedPrice]);

  return (
    <div className="border-t bg-gradient-to-b from-white via-[#fafafa] to-[#f3f3f3]">
      <Container className="mt-6">
        <div className="sticky top-0 z-10 mb-4 bg-white/70 backdrop-blur-md rounded-md shadow-sm px-4 py-3 flex items-center justify-between border border-gray-100">
          <Title className="text-lg font-semibold tracking-wide text-gray-800 uppercase">Dịch vụ của S17</Title>
          {(selectedCategory || selectedPrice) && (
            <button onClick={() => { setSelectedCategory(null); setSelectedPrice(null); }} className="text-shop_dark_green underline text-sm font-medium hover:text-red-500 transition-colors">Đặt lại bộ lọc</button>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Bên trái: Bộ lọc */}
          <aside className="md:w-64 md:sticky md:top-24 md:self-start h-auto md:h-[calc(100vh-180px)] overflow-y-auto scrollbar-hide border border-gray-200 rounded-xl bg-white p-4 shadow-sm">
            <ServiceCategories categories={categories} selected={selectedCategory} onChange={setSelectedCategory} />
            <div className="mt-4" />
            <PriceFilter selected={selectedPrice} onChange={setSelectedPrice} />
          </aside>

          {/* Bên phải: Banner + danh sách dịch vụ */}
          <main className="flex-1">
            <PromoBanner />

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-5">
                {MOCK_SERVICES.slice(0,6).map((svc) => (<ServiceCard key={svc.id} {...svc} />))}
              </div>
            ) : (
              <div className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {filtered.map((svc) => (<ServiceCard key={svc.id} {...svc} />))}
              </div>
            )}

            {!loading && filtered.length === 0 && (
              <div className="bg-white mt-10 rounded-xl shadow-sm border border-gray-200 p-10 text-center text-gray-600">Không có dịch vụ phù hợp với bộ lọc hiện tại.</div>
            )}
          </main>
        </div>
      </Container>
    </div>
  );
}
