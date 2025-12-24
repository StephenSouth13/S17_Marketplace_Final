import Container from "@/components/Container";
import Title from "@/components/Title";
import { urlFor } from "@/sanity/lib/image";
import { getSellerPageData, getAllSellers } from "@/sanity/queries/query"; 
import { CheckCircle2, Download, Rocket, ArrowRight, ShieldCheck, Star, Award } from "lucide-react";
import Image from "next/image";
import React from "react";

// Định nghĩa Interface chuẩn để thay thế 'any'
interface Benefit {
  label: string;
  detail: string;
  icon?: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
}

interface MarketingItem {
  description?: string;
  url: string;
  originalName?: string;
}

interface Seller {
  _id: string;
  name: string;
  role: string;
  avatar: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
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
    <div className="bg-[#fafafa] text-gray-900">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
        
        <Container className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600">S17 Elite Partnership</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter text-gray-900">
              Hội tụ <br />
              <span className="text-emerald-600">Chuyên gia.</span>
            </h1>

            <p className="text-xl text-gray-500 max-w-lg leading-relaxed">
              {data.description || "Hệ thống kết nối các chuyên gia hàng đầu, giúp bạn hiện thực hóa mục tiêu tài chính."}
            </p>

            <div className="pt-4">
              <button className="bg-gray-900 text-white px-10 py-6 rounded-2xl font-bold text-lg hover:bg-emerald-600 transition-all shadow-2xl hover:-translate-y-1 flex items-center gap-3 group">
                Bắt đầu ngay <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>

          <div className="relative group animate-in fade-in zoom-in duration-1000 delay-300">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-200/20 to-blue-200/20 rounded-[3rem] blur-3xl" />
            {data.heroImage && (
              <div className="relative rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] bg-white p-4">
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

      {/* --- SELLERS DIRECTORY --- */}
      <section className="py-24 bg-white border-y border-gray-100">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-emerald-600">
                <Award size={24} />
                <span className="font-bold uppercase tracking-[0.3em] text-sm">The Portfolio</span>
              </div>
              <Title className="text-left text-4xl md:text-6xl tracking-tighter">Đội ngũ đối tác <br/> xuất sắc nhất</Title>
            </div>
            {/* Đã xử lý ký tự đặc biệt &quot; */}
            <p className="text-gray-400 italic max-w-xs text-right hidden md:block text-sm leading-relaxed">
              &ldquo;Những người tiên phong trong việc mang giá trị thực đến cộng đồng S17.&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {sellers.map((seller) => (
              <div key={seller._id} className="group relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-gray-100 transition-all duration-700 group-hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] group-hover:-translate-y-2">
                  <Image 
                    src={urlFor(seller.avatar).url()} 
                    alt={seller.name} 
                    fill 
                    className="object-cover group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                  />
                  <div className="absolute inset-x-4 bottom-4 p-5 bg-white/70 backdrop-blur-xl border border-white/30 rounded-[1.8rem] opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <div className="flex items-center gap-2 text-emerald-700 font-bold text-[9px] uppercase tracking-widest mb-1">
                       <ShieldCheck size={12} /> Certified Partner
                    </div>
                    <h3 className="text-lg font-black text-gray-900 leading-tight">{seller.name}</h3>
                    <p className="text-xs text-gray-500 font-medium mt-1">{seller.role}</p>
                  </div>
                </div>
                
                <div className="mt-6 px-2 flex justify-between items-end">
                   <div className="space-y-1">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Experience</p>
                      <p className="text-lg font-black text-gray-900">Expert</p>
                   </div>
                   <div className="text-right">
                      <div className="flex text-emerald-500 gap-0.5">
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                      </div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* --- BENEFITS SECTION --- */}
      <section className="py-24">
        <Container>
          <div className="text-center mb-16 space-y-4">
            <Title className="text-4xl md:text-5xl">Quyền lợi đặc quyền</Title>
            <div className="w-16 h-1 bg-emerald-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.benefits?.map((benefit: Benefit, index: number) => (
              <div 
                key={index}
                className="group p-10 rounded-[2.5rem] bg-white border border-gray-100 hover:border-emerald-500/50 hover:shadow-2xl transition-all duration-500"
              >
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-8 group-hover:rotate-12 transition-transform">
                   {benefit.icon ? (
                      <Image src={urlFor(benefit.icon).url()} width={32} height={32} alt="icon" />
                   ) : (
                      <CheckCircle2 size={28} />
                   )}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{benefit.label}</h3>
                <p className="text-gray-500 leading-relaxed text-base">
                  {benefit.detail}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* --- MARKETING KIT --- */}
      {data.marketingKit && (
        <section className="py-24 bg-gray-900 text-white rounded-[4rem] mx-4 mb-10 overflow-hidden">
          <Container>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Marketing <br /> Toolkit 2025</h2>
                <p className="text-gray-400 text-lg">
                  Tải xuống bộ nhận diện thương hiệu chuẩn mực và các tài liệu hướng dẫn chuyên nghiệp.
                </p>
                <div className="grid gap-4">
                  {data.marketingKit.map((item: MarketingItem, index: number) => (
                    <a
                      key={index}
                      href={item.url}
                      className="group flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-emerald-600 transition-all"
                    >
                      <span className="font-bold text-lg">{item.description || "Tài liệu đối tác"}</span>
                      <Download size={20} className="group-hover:translate-y-1 transition-transform" />
                    </a>
                  ))}
                </div>
              </div>
              <div className="relative aspect-square lg:aspect-video bg-emerald-500/10 rounded-[2.5rem] border border-white/5 flex items-center justify-center">
                 <Rocket size={120} className="text-emerald-500/20" />
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* --- CTA SECTION --- */}
      <section className="pb-24">
        <Container>
          <div className="bg-emerald-600 rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent)] opacity-50" />
             <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10 tracking-tighter">Sẵn sàng bứt phá <br/> cùng S17?</h2>
             <button className="bg-white text-emerald-700 px-12 py-6 rounded-2xl font-black text-xl hover:bg-gray-900 hover:text-white transition-all relative z-10 shadow-xl active:scale-95">
               Gửi đơn đăng ký ngay
             </button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default SellerPage;