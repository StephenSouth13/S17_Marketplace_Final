"use client";

import Image from "next/image";
import React, { useMemo, useState, useEffect } from "react";
import Container from "@/components/Container";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";

// Định nghĩa kiểu dữ liệu cho Service (cần thiết sau khi loại bỏ mockup)
interface Service {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  image: string | null;
  // Thêm các trường dữ liệu thô nếu cần thiết, dựa trên logic lọc
  raw?: {
    category?: {
      title?: string;
    };
  };
}

// Giữ lại hàm formatVND
const formatVND = (amount: number) =>
  Number(amount ?? 0).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

// Giữ lại component ServiceCard
function ServiceCard({ name, description, price, rating, image }: { name: string; description: string; price: number; rating: number; image: string | null; }) {
  return (
    <div className="group bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all overflow-hidden">
      <div className="relative bg-gray-50">
        <Image src={image || "/s17co/placeholder.png"} alt={name} width={600} height={400} className="w-full h-48 object-cover" />
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

// Giữ lại component ServiceCategories
function ServiceCategories({ categories, selected, onChange }: { categories: string[]; selected: string | null; onChange: (val: string | null) => void; }) {
  // ... (Không thay đổi)
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

// Giữ lại component PriceFilter
function PriceFilter({ selected, onChange }: { selected: string | null; onChange: (val: string | null) => void; }) {
  // ... (Không thay đổi)
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

// Giữ lại component PromoBanner
function PromoBanner() {
  // ... (Không thay đổi)
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

  // Khởi tạo services là mảng rỗng thay vì MOCK_SERVICES
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function fetchServices() {
      try {
        const res = await fetch('/api/services');
        const json = await res.json();
        // Giả định API trả về { data: Service[] }
        if (mounted && json?.data) {
          setServices(json.data);
        } else if (mounted) {
          // Xử lý trường hợp data rỗng hoặc không đúng định dạng
          setServices([]);
        }
      } catch (e) {
        console.error('Failed to fetch services', e);
        if (mounted) setServices([]); // Đặt services thành mảng rỗng khi fetch thất bại
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchServices();
    return () => { mounted = false };
  }, []);

  // Logic tạo categories và filtering không thay đổi, chỉ dùng mảng services (động)
const categories = useMemo(() => Array.from(new Set(
    services.map((s) => {
        // Ưu tiên s.category (string)
        if (s.category) return s.category;
        
        // Sau đó kiểm tra s.raw.category.title (string)
        if (typeof s.raw?.category === 'object' && s.raw?.category?.title) {
            return s.raw.category.title;
        }

        // Cuối cùng, kiểm tra nếu s.raw.category là string (nếu có thể)
        if (typeof s.raw?.category === 'string') {
             return s.raw.category;
        }

        // Giá trị mặc định
        return 'Không phân loại';
    })
)), [services]);
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
              // Hiển thị một số placeholder/skeleton UI khi đang tải
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-5">
                {/* Thay thế bằng Skeleton Loader thực tế nếu có, ở đây tôi dùng một placeholder đơn giản */}
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden animate-pulse">
                      <div className="w-full h-48 bg-gray-200"></div>
                      <div className="p-4 space-y-2">
                          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-full"></div>
                          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                          <div className="flex justify-between pt-2">
                              <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                              <div className="flex gap-2">
                                  <div className="h-8 bg-gray-200 rounded-full w-16"></div>
                                  <div className="h-8 bg-gray-200 rounded-full w-16"></div>
                              </div>
                          </div>
                      </div>
                  </div>
                ))}
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