import Container from "@/components/Container";
import Title from "@/components/Title";
import React from "react";
import { Zap, Target, Leaf, CheckSquare, Linkedin, ArrowRight, Star } from "lucide-react";
import Image from "next/image";

const VALUES = [
    {
        icon: Zap,
        title: "Tầm nhìn đột phá",
        description: "Trở thành bệ phóng cho những ý tưởng, sản phẩm và con người dám mơ lớn.",
        color: "text-red-500",
        bg: "bg-red-50",
    },
    {
        icon: Leaf,
        title: "Tăng trưởng bền vững",
        description: "Cam kết tạo ra giải pháp đột phá, sản phẩm chất lượng hướng tới sự phát triển dài hạn.",
        color: "text-emerald-600",
        bg: "bg-emerald-50",
    },
    {
        icon: CheckSquare,
        title: "Uy tín & Tin cậy",
        description: "Đồng hành và giám sát bởi các tổ chức uy tín, đặt chữ tín lên hàng đầu.",
        color: "text-blue-500",
        bg: "bg-blue-50",
    },
    {
        icon: Target,
        title: "Đội ngũ tiên phong",
        description: "Quy tụ chuyên gia, doanh nhân giàu kinh nghiệm và nhiệt huyết từ nhiều lĩnh vực.",
        color: "text-amber-500",
        bg: "bg-amber-50",
    },
];

const BOD_MEMBERS = [
    {
        name: "Phan Huỳnh Anh",
        position: "Chủ tịch Hội đồng Quản trị",
        description: "Nhà chiến lược tài ba với tầm nhìn xây dựng hệ sinh thái kinh doanh dựa trên nền tảng tử tế và giá trị thực cho cộng đồng.",
        image: "/images/bod/phan-huynh-anh.jpg", 
    },
    {
        name: "Lê Hoàng Minh Khánh",
        position: "Tổng Giám đốc Điều hành",
        description: "Chuyên gia giải pháp hệ thống, tập trung vào việc tối ưu hóa vận hành và tiên phong ứng dụng công nghệ trong thương mại điện tử.",
        image: "/images/bod/minh-khanh.jpg",
    },
];

const AboutPage = () => {
    return (
        <div className="bg-white overflow-hidden">
            {/* 1. HERO SECTION: Hiệu ứng Gradient & Typo mạnh mẽ */}
            <section className="relative pt-24 pb-32 border-b border-gray-50">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
                    <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[60%] bg-emerald-200 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[50%] bg-blue-100 rounded-full blur-[120px]" />
                </div>
                
                <Container className="text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black uppercase tracking-[0.2em] mb-8 animate-in fade-in slide-in-from-top duration-1000">
                        <Star size={14} fill="currentColor" /> Khát vọng S17 Trading
                    </div>
                    <Title className="text-5xl md:text-8xl font-black text-gray-900 mb-8 tracking-tighter leading-[0.9]">
                        Kiến tạo <span className="text-emerald-600">tương lai</span> <br /> từ sự tử tế.
                    </Title>
                    <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed font-medium animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
                        S17 được sáng lập bởi cộng đồng doanh nhân tâm huyết, xây dựng mạng lưới hợp tác chiến lược nhằm mang đến các giải pháp thương mại và đầu tư hiện đại nhất.
                    </p>
                </Container>
            </section>

            {/* 2. CORE VALUES: Bento Grid Design */}
            <section className="py-24 bg-[#fafafa]">
                <Container>
                    <div className="flex flex-col items-center mb-16 text-center">
                        <h2 className="text-sm font-black text-emerald-600 uppercase tracking-[0.3em] mb-4">Giá trị cốt lõi</h2>
                        <Title className="text-4xl md:text-5xl tracking-tight">Nền tảng của sự thịnh vượng</Title>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {VALUES.map((item, index) => (
                            <div 
                                key={index} 
                                className="group relative p-10 rounded-[2.5rem] bg-white border border-gray-100 hover:border-emerald-500/30 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 overflow-hidden"
                            >
                                <div className={`absolute -right-4 -top-4 size-24 ${item.bg} rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 opacity-50`} />
                                <item.icon size={40} className={`${item.color} mb-8 relative z-10 group-hover:scale-110 transition-transform`} />
                                <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight relative z-10">{item.title}</h3>
                                <p className="text-gray-500 leading-relaxed font-medium relative z-10 text-sm">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* 3. MISSION: Phong cách Elite Business */}
            <section className="py-24">
                <Container>
                    <div className="bg-gray-900 rounded-[4rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent)]" />
                        <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                            <div className="space-y-8">
                                <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight italic">
                                    Sứ mệnh <br /> &ldquo;Truyền thừa&rdquo;
                                </h2>
                                <p className="text-gray-400 text-lg leading-relaxed font-medium">
                                    Chúng tôi không chỉ xây dựng một doanh nghiệp, chúng tôi xây dựng một môi trường nơi tri thức và giá trị được tiếp nối qua nhiều thế hệ.
                                </p>
                                <button className="flex items-center gap-3 font-bold text-emerald-400 hover:text-emerald-300 transition-colors group">
                                    Tìm hiểu thêm về lộ trình <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                                </button>
                            </div>
                            <div className="grid gap-6">
                                {[
                                    "Tổ chức phát triển bền vững và nhân văn.",
                                    "Môi trường Coaching & Mentoring thực chiến.",
                                    "Hệ sinh thái học tập và nỗ lực suốt đời."
                                ].map((text, i) => (
                                    <div key={i} className="flex items-center gap-4 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm group hover:bg-white/10 transition-colors">
                                        <div className="size-8 rounded-full bg-emerald-500 flex items-center justify-center text-gray-900 font-black text-xs group-hover:rotate-12 transition-transform">
                                            0{i + 1}
                                        </div>
                                        <p className="font-bold text-gray-200">{text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
            
            {/* 4. LEADERSHIP: Hiển thị hình ảnh từ đường dẫn /images/bod/ */}
            <section className="py-24 pb-32">
                <Container>
                    <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                        <h2 className="text-sm font-black text-emerald-600 uppercase tracking-[0.4em]">Leadership</h2>
                        <Title className="text-4xl md:text-6xl tracking-tighter">Ban Lãnh Đạo Tiên Phong</Title>
                        <p className="text-gray-500 font-medium leading-relaxed">
                            Những cá nhân dẫn dắt với bề dày kinh nghiệm và tâm huyết trong việc kiến tạo sự nghiệp bền vững.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:px-20">
                        {BOD_MEMBERS.map((member, index) => (
                            <div key={index} className="flex flex-col items-center group">
                                <div className="relative size-72 mb-10">
                                    {/* Ảnh đại diện với hiệu ứng Elite Frame */}
                                    <div className="absolute inset-0 bg-emerald-100 rounded-full scale-105 group-hover:scale-110 group-hover:bg-emerald-200 transition-all duration-700 -z-10" />
                                    <div className="relative w-full h-full rounded-full overflow-hidden border-8 border-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] bg-gray-100">
                                        <Image 
                                            src={member.image} 
                                            alt={member.name} 
                                            fill 
                                            className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                                        />
                                    </div>
                                    <div className="absolute bottom-4 right-4 size-12 bg-gray-900 rounded-full flex items-center justify-center text-white shadow-xl cursor-pointer hover:bg-emerald-600 transition-all group/icon">
                                        <Linkedin size={20} className="group-hover/icon:rotate-12 transition-transform" />
                                    </div>
                                </div>
                                
                                <div className="text-center space-y-3">
                                    <h3 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">{member.name}</h3>
                                    <p className="text-emerald-600 font-bold tracking-widest text-xs uppercase bg-emerald-50 px-4 py-1.5 rounded-full inline-block">
                                        {member.position}
                                    </p>
                                    <p className="text-gray-500 font-medium leading-relaxed max-w-sm italic pt-4 border-t border-gray-100">
                                        &ldquo;{member.description}&rdquo;
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-32 text-center py-16 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200 relative">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white px-8 py-3 rounded-full border border-gray-100 shadow-sm font-black text-[10px] uppercase tracking-widest text-gray-400">
                            Đồng hành cùng S17 Network
                        </div>
                        <div className="flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                           <span className="text-2xl font-black tracking-tighter italic">Partner Agency</span>
                           <span className="text-2xl font-black tracking-tighter italic">Investment Fund</span>
                           <span className="text-2xl font-black tracking-tighter italic">Tech Solution</span>
                           <span className="text-2xl font-black tracking-tighter italic">Coaching Hub</span>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    );
};

export default AboutPage;