import Container from "@/components/Container";
import Title from "@/components/Title";
import { urlFor } from "@/sanity/lib/image";
import { getSellerPageData, getAllSellers } from "@/sanity/queries/query"; 
import { CheckCircle2, Download, Rocket, ArrowRight, ShieldCheck, Star, Award, Mail, Globe, MessageCircle } from "lucide-react";
import Image from "next/image";
import React from "react";

interface Benefit {
  label: string;
  detail: string;
  icon?: {
    _type: string;
    asset: { _ref: string; _type: string; };
  };
}

interface Seller {
  _id: string;
  name: string;
  role: string;
  avatar: {
    _type: string;
    asset: { _ref: string; _type: string; };
  };
  bio: string;
  isVerified: boolean;
}

const SellerPage = async () => {
  const [pageRes, sellersRes] = await Promise.all([
    getSellerPageData(),
    getAllSellers()
  ]);

  const data = pageRes?.data;
  const sellers = (sellersRes?.data as Seller[]) || [];

  if (!data) return null;

  return (
    <div className="bg-[#fcfcfc] text-gray-900">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 pb-32 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-50 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
        <Container className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-widest">
              <Rocket size={14} /> S17 Elite Partnership
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter text-gray-900">
              Hội tụ <br /> <span className="text-emerald-600">Chuyên gia.</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-lg leading-relaxed">
              {data.description || "Hệ thống kết nối các chuyên gia hàng đầu, giúp bạn hiện thực hóa mục tiêu tài chính."}
            </p>
            <button className="bg-gray-900 text-white px-10 py-6 rounded-2xl font-bold text-lg hover:bg-emerald-600 transition-all shadow-xl flex items-center gap-3">
              Bắt đầu ngay <ArrowRight />
            </button>
          </div>
          <div className="relative">
            {data.heroImage && (
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl bg-white p-4">
                <Image 
                  src={urlFor(data.heroImage).url()} 
                  alt={data.title} 
                  width={700} height={800} 
                  className="object-cover rounded-[2rem] w-full h-auto"
                  priority 
                />
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* --- SELLERS DIRECTORY (NÂNG CẤP HIỂN THỊ ĐẦY ĐỦ) --- */}
      <section className="py-24">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-emerald-600 font-bold uppercase tracking-[0.2em] text-sm">
                <Award size={20} /> Đối tác tiêu biểu
              </div>
              <Title className="text-left text-4xl md:text-5xl font-black tracking-tight">Gương mặt đồng hành</Title>
            </div>
            <p className="text-gray-400 italic max-w-xs text-sm leading-relaxed">
              &ldquo;Những người tiên phong mang giá trị thực đến cộng đồng.&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {sellers.map((seller) => (
              <div key={seller._id} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col overflow-hidden group">
                {/* Ảnh chân dung lớn & sắc nét */}
                <div className="relative aspect-[4/4] overflow-hidden m-4 rounded-[2rem]">
                  <Image 
                    src={urlFor(seller.avatar).url()} 
                    alt={seller.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  {seller.isVerified && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-sm border border-emerald-100">
                      <ShieldCheck size={20} className="text-emerald-500" />
                    </div>
                  )}
                </div>

                {/* Phần nội dung hiển thị sẵn */}
                <div className="px-8 pb-8 flex flex-col flex-1 space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black text-gray-900 leading-tight">{seller.name}</h3>
                    <p className="text-emerald-600 font-bold text-sm tracking-wide uppercase">{seller.role}</p>
                  </div>

                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 italic">
                    &ldquo;{seller.bio}&rdquo;
                  </p>

                  <div className="pt-4 flex items-center justify-between border-t border-gray-50">
                    <div className="flex gap-2">
                       <div className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:bg-emerald-50 hover:text-emerald-600 transition-colors cursor-pointer"><Mail size={16} /></div>
                       <div className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:bg-emerald-50 hover:text-emerald-600 transition-colors cursor-pointer"><MessageCircle size={16} /></div>
                       <div className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:bg-emerald-50 hover:text-emerald-600 transition-colors cursor-pointer"><Globe size={16} /></div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-orange-400 fill-orange-400" />
                      <span className="text-sm font-black text-gray-900">5.0</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* --- BENEFITS SECTION (FIXED ICON) --- */}
      <section className="py-24 bg-gray-50/50">
        <Container>
          <div className="text-center mb-16 space-y-4">
            <Title className="text-4xl">Quyền lợi đặc quyền</Title>
            <div className="w-16 h-1 bg-emerald-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.benefits?.map((benefit: Benefit, index: number) => (
              <div key={index} className="p-10 rounded-[2.5rem] bg-white border border-gray-100 hover:shadow-lg transition-all">
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-8 overflow-hidden">
                  {benefit.icon ? (
                    <Image src={urlFor(benefit.icon).url()} width={64} height={64} alt="icon" className="w-full h-full object-contain p-2" />
                  ) : (
                    <CheckCircle2 size={32} />
                  )}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{benefit.label}</h3>
                <p className="text-gray-500 leading-relaxed">{benefit.detail}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* --- MARKETING KIT --- */}
      <section className="py-24">
        <Container>
          <div className="bg-gray-900 rounded-[4rem] p-12 md:p-20 text-white overflow-hidden relative">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-5xl font-black tracking-tighter leading-tight">Marketing <br /> Toolkit 2025</h2>
                <p className="text-gray-400 text-lg">Tải xuống bộ nhận diện thương hiệu chuẩn mực và các tài liệu hướng dẫn chuyên nghiệp.</p>
                <div className="grid gap-4">
                  {data.marketingKit?.map((item: any, index: number) => (
                    <a key={index} href={item.url} className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-emerald-600 transition-all group">
                      <span className="font-bold">{item.description || "Tài liệu đối tác"}</span>
                      <Download size={20} className="group-hover:translate-y-1 transition-transform" />
                    </a>
                  ))}
                </div>
              </div>
              <div className="relative aspect-video bg-emerald-500/10 rounded-[2.5rem] border border-white/5 flex items-center justify-center">
                 <Rocket size={100} className="text-emerald-500/20" />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default SellerPage;