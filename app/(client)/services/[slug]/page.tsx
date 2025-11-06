import Container from "@/components/Container";
import Title from "@/components/Title";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import React from "react";
import dayjs from "dayjs";
import Link from "next/link";
import { StarIcon, CheckCheck, ChevronRight } from "lucide-react"; // Đã thêm ChevronRight
import { Button } from "@/components/ui/button"; 

// ĐÃ FIX LỖI: Import urlFor
import { urlFor } from "@/sanity/lib/image"; 
import { client } from "@/sanity/lib/client"; 
import { SERVICE_BY_SLUG_QUERY, SERVICE_CATEGORIES } from "@/sanity/queries/query"; 


const formatVND = (amount: number | undefined | null) =>
  Number(amount ?? 0).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

// HÀM FETCH DATA ĐÃ SỬA LỖI: Sử dụng SERVICE_BY_SLUG_QUERY (string) và truyền params { slug }
const getServiceBySlug = (slug: string) => client.fetch(SERVICE_BY_SLUG_QUERY, { slug });
const getServiceCategories = () => client.fetch(SERVICE_CATEGORIES);
const getRelatedServices = (currentServiceId: string) => 
    client.fetch(`*[_type == "service" && _id != "${currentServiceId}"]|order(publishedAt desc)[0...4]{
        title, slug, mainImage
    }`);


// Component mới: Hiển thị Gói Dịch vụ
const PricingPlans = ({ plans }: { plans: any[] }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            {plans.map((plan, index) => (
                <div key={index} className={`border p-5 rounded-lg flex flex-col ${plan.isPopular ? 'border-shop_dark_green ring-2 ring-shop_dark_green/50 shadow-lg' : 'border-gray-200 shadow-md'}`}>
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    {plan.isPopular && <span className="text-xs font-medium text-white bg-shop_dark_green rounded-full px-3 py-0.5 mt-2 mb-2 self-start">Gói Đề xuất</span>}
                    
                    <p className="text-3xl font-extrabold text-shop_dark_green my-3">
                        {plan.price && plan.price > 0 ? formatVND(plan.price) : "Liên hệ"}
                    </p>
                    <ul className="space-y-2 text-sm text-gray-700 flex-grow">
                        {plan.features.map((feature: string, i: number) => (
                            <li key={i} className="flex items-start gap-2">
                                <CheckCheck size={16} className="text-shop_dark_green mt-1 flex-shrink-0" />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                    <Button className="mt-4 w-full rounded-full">Đăng ký Gói {plan.name}</Button>
                </div>
            ))}
        </div>
    );
};

const ServiceDetailPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const service: any = await getServiceBySlug(slug);
  if (!service) return notFound();
  
  // sidebar data
  const categories = await getServiceCategories();
  const others = await getRelatedServices(service._id); // Truyền ID để loại trừ dịch vụ hiện tại

  return (
    <div className="py-10">
      <Container className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* KHỐI CHÍNH: NỘI DUNG DỊCH VỤ */}
        <div className="lg:col-span-3">
          {service?.mainImage && (
            <Image
              src={urlFor(service.mainImage).width(2000).url()}
              alt={service.title || "Service Image"}
              width={1400}
              height={800}
              className="w-full max-h-[520px] object-cover rounded-2xl shadow-lg"
              priority
            />
          )}

          <div className="mt-6 p-6 bg-white rounded-xl shadow-md border border-gray-100">
            {/* THÔNG TIN CHUNG */}
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
              {service?.category?.title && (
                <Link href={`/services?category=${service.category.slug.current}`} className="font-semibold text-shop_dark_green hover:underline">
                  {service.category.title}
                </Link>
              )}
              <span className="text-gray-400">•</span>
              <span className="text-sm">Đăng ngày: {dayjs(service.publishedAt).format("DD MMM, YYYY")}</span>
            </div>

            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{service.title}</h1>
            {service.excerpt && <p className="text-gray-700 text-lg mb-6 leading-relaxed">{service.excerpt}</p>}

            {/* KHU VỰC GIÁ VÀ HÀNH ĐỘNG LINH HOẠT */}
            <div className="border-t pt-4 mt-4">
                {service.pricingModel === 'tiered' && service.plans?.length > 0 ? (
                    // 1. Dịch vụ có gói (Website, Bán hàng)
                    <>
                        <h2 className="text-2xl font-bold mb-4 border-b pb-2 text-shop_dark_green">Các Gói Dịch Vụ</h2>
                        <PricingPlans plans={service.plans} />
                    </>
                ) : (
                    // 2. Dịch vụ báo giá tùy chỉnh (Coaching, Tư vấn)
                    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-4">
                            <StarIcon size={20} className="text-yellow-500 fill-yellow-500" />
                            <span className="text-lg font-bold text-gray-700">Giá ước tính:</span>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            {service.priceRange?.min && service.priceRange?.max ? (
                                <div className="text-xl font-extrabold text-shop_dark_green">
                                    {formatVND(service.priceRange.min)} — {formatVND(service.priceRange.max)}
                                </div>
                            ) : (
                                <div className="text-xl font-bold text-shop_dark_green">Liên hệ để báo giá</div>
                            )}
                            <Link
                                href={`/contact?service=${encodeURIComponent(`Tư vấn ${service.title}`)}`}
                                className="rounded-full bg-shop_light_green hover:bg-shop_btn_dark_green px-6 py-2 text-white font-semibold transition-colors"
                            >
                                Yêu cầu Báo giá
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            {/* KHU VỰC NỘI DUNG CHI TIẾT */}
            <div className="mt-8 text-gray-800 prose max-w-none">
              {service.body && (
                <PortableText
                  value={service.body}
                  components={{
                    block: {
                      normal: ({ children }: any) => <p className="my-4 text-base leading-relaxed">{children}</p>,
                      h2: ({ children }: any) => <h2 className="my-6 text-2xl font-bold border-b pb-2 text-shop_dark_green">{children}</h2>,
                      h3: ({ children }: any) => <h3 className="my-4 text-xl font-semibold">{children}</h3>,
                    },
                    types: {
                      image: ({ value }: any) => (
                        <Image
                          alt={value.alt || ""}
                          src={urlFor(value).width(1600).url()}
                          className="w-full rounded-xl my-6"
                          width={1200}
                          height={800}
                        />
                      ),
                    },
                    marks: {
                      strong: ({ children }: any) => <strong className="font-extrabold text-gray-900">{children}</strong>,
                      link: ({ value, children }: any) => (
                        <a href={value.href} className="text-shop_dark_green underline hover:text-shop_orange">
                          {children}
                        </a>
                      ),
                    },
                  }}
                />
              )}
            </div>
            
            {/* HÀNH ĐỘNG CUỐI TRANG */}
            <div className="mt-10 flex gap-4 border-t pt-6 justify-center">
                 <Link href="/contact" className="rounded-full bg-shop_light_green text-white px-8 py-3 font-semibold hover:opacity-95 transition-opacity">
                    Liên hệ Tư vấn Ngay
                </Link>
                <Link href="/contact" className="rounded-full border border-shop_light_green text-shop_light_green px-8 py-3 font-semibold hover:bg-shop_light_green/5 transition-colors">
                    Tải về Brochure
                </Link>
            </div>
          </div>
        </div>

        {/* KHỐI BÊN: SIDEBAR - ĐÃ LÀM ĐẸP */}
        <aside className="hidden lg:block lg:col-span-1 space-y-6">
          {/* Danh mục Dịch vụ */}
          <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-lg sticky top-24">
            <Title className="text-lg font-bold border-b pb-2 mb-3 text-gray-800">Danh mục Dịch vụ</Title>
            <div className="space-y-1 mt-3">
              {categories?.map((cat: any, idx: number) => (
                <Link 
                    key={idx} 
                    href={`/services?category=${cat.slug.current}`} 
                    className="flex items-center justify-between p-2 -mx-2 rounded-lg text-sm text-gray-700 hover:bg-shop_light_green/10 hover:text-shop_dark_green transition-all duration-200 group"
                >
                  <span className="group-hover:font-semibold">{cat.title}</span>
                  <ChevronRight size={16} className="text-gray-400 group-hover:text-shop_dark_green" />
                </Link>
              ))}
            </div>
          </div>

          {/* Dịch vụ Liên quan */}
          <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-lg">
            <Title className="text-lg font-bold border-b pb-2 mb-4 text-gray-800">Dịch vụ Liên quan</Title>
            <div className="space-y-4">
              {others?.slice(0, 4).map((s: any, index: number) => (
                <Link 
                    key={index} 
                    href={`/services/${s.slug.current}`} 
                    className="flex items-start gap-3 p-2 -mx-2 rounded-lg group hover:bg-gray-50 transition-colors"
                >
                  {s.mainImage && (
                    <div className="flex-shrink-0">
                        <Image 
                            src={urlFor(s.mainImage).width(200).url()} 
                            alt={s.title} 
                            width={64} 
                            height={64} 
                            className="w-16 h-16 rounded-md object-cover border border-gray-100 group-hover:shadow-md transition-shadow" 
                        />
                    </div>
                  )}
                  <div className="flex flex-col pt-1">
                    <div className="text-sm text-gray-800 group-hover:text-shop_dark_green font-medium leading-snug transition-colors">{s.title}</div>
                    <span className="text-xs text-gray-500 mt-0.5">Xem chi tiết</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </Container>
    </div>
  );
};

export default ServiceDetailPage;
