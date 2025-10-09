import Container from "@/components/Container";
import Title from "@/components/Title";
import { getServiceBySlug, getServiceCategories, getServices } from "@/sanity/queries";
import { urlFor } from "@/sanity/lib/image";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "next-sanity";
import React from "react";
import dayjs from "dayjs";
import Link from "next/link";
import { StarIcon } from "lucide-react";

const formatVND = (amount: number | undefined | null) =>
  Number(amount ?? 0).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

const ServiceDetailPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const service: any = await getServiceBySlug(slug);
  if (!service) return notFound();

  // sidebar data
  const categories = await getServiceCategories();
  const others = await getServices();

  return (
    <div className="py-10">
      <Container className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          {service?.mainImage && (
            <Image
              src={urlFor(service.mainImage).width(2000).url()}
              alt={service.title || "Service Image"}
              width={1400}
              height={800}
              className="w-full max-h-[520px] object-cover rounded-2xl"
            />
          )}

          <div className="mt-6">
            <div className="flex items-center gap-3 text-sm text-lightColor">
              {service?.category?.title && (
                <Link href={`/services?category=${service.category.slug}`} className="font-semibold text-shop_dark_green">
                  {service.category.title}
                </Link>
              )}

              <span className="text-gray-400">•</span>
              <span className="text-sm text-lightColor">{dayjs(service.publishedAt).format("DD MMM, YYYY")}</span>
            </div>

            <h1 className="text-3xl font-bold my-4">{service.title}</h1>
            {service.excerpt && <p className="text-gray-700 text-base mb-4">{service.excerpt}</p>}

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} size={18} className={i < (service.rating ?? 4) ? "text-yellow-400" : "text-gray-300"} />
                ))}
                <span className="text-sm text-gray-600">(Đánh giá: {service.rating ?? 4})</span>
              </div>

              <div className="ml-auto">
                {service.priceRange ? (
                  <div className="text-lg font-bold text-shop_dark_green">
                    {formatVND(service.priceRange.min)} — {formatVND(service.priceRange.max)}
                  </div>
                ) : (
                  <div className="text-lg font-bold text-shop_dark_green">Liên hệ để báo giá</div>
                )}
              </div>
            </div>

            <div className="mt-6 text-lightColor">
              {service.body && (
                <PortableText
                  value={service.body}
                  components={{
                    block: {
                      normal: ({ children }: any) => <p className="my-4 text-base leading-relaxed">{children}</p>,
                      h2: ({ children }: any) => <h2 className="my-4 text-2xl font-semibold">{children}</h2>,
                    },
                    types: {
                      image: ({ value }: any) => (
                        <Image
                          alt={value.alt || ""}
                          src={urlFor(value).width(1600).url()}
                          className="w-full rounded-xl my-4"
                          width={1200}
                          height={800}
                        />
                      ),
                    },
                    marks: {
                      strong: ({ children }: any) => <strong className="font-semibold">{children}</strong>,
                      link: ({ value, children }: any) => (
                        <a href={value.href} className="text-shop_dark_green underline">
                          {children}
                        </a>
                      ),
                    },
                  }}
                />
              )}
            </div>

            <div className="mt-8 flex gap-3">
              <Link href="#contact" className="rounded-full bg-shop_light_green text-white px-6 py-3 font-semibold hover:opacity-95">Đặt dịch vụ</Link>
              <Link href="#contact" className="rounded-full border border-shop_light_green text-shop_light_green px-6 py-3 font-semibold">Yêu cầu tư vấn</Link>
            </div>
          </div>
        </div>

        <aside className="hidden lg:block">
          <div className="border border-lightColor p-5 rounded-md">
            <Title className="text-base">Danh mục dịch vụ</Title>
            <div className="space-y-2 mt-3">
              {categories?.map((cat: any, idx: number) => (
                <Link key={idx} href={`/services?category=${cat.slug}`} className="flex items-center justify-between text-sm text-lightColor hover:text-shop_dark_green hover:underline">
                  <span>{cat.title || cat.blogcategories?.[0]?.title}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="border border-lightColor p-5 rounded-md mt-6">
            <Title className="text-base">Dịch vụ liên quan</Title>
            <div className="space-y-4 mt-4">
              {others?.slice(0, 5).map((s: any, index: number) => (
                <Link key={index} href={`/services/${s.slug}`} className="flex items-center gap-3 group">
                  {s.mainImage && (
                    <Image src={urlFor(s.mainImage).width(200).url()} alt={s.title} width={80} height={80} className="w-16 h-16 rounded-lg object-cover" />
                  )}
                  <div className="text-sm text-lightColor group-hover:text-shop_dark_green">{s.title}</div>
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
