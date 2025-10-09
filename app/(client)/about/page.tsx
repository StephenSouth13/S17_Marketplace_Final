import Container from "@/components/Container";
import Title from "@/components/Title";
import React from "react";
import { Zap, Target, Leaf, CheckSquare } from "lucide-react";

// Dữ liệu Tầm nhìn và Giá trị cốt lõi của S17 (dựa trên thông tin đã cung cấp)
const VALUES = [
    {
        icon: Zap,
        title: "Tầm nhìn đột phá",
        description: "Trở thành bệ phóng cho những ý tưởng, sản phẩm và con người dám mơ lớn.",
        color: "text-red-500",
    },
    {
        icon: Leaf,
        title: "Tăng trưởng bền vững",
        description: "Cam kết tạo ra giải pháp đột phá, sản phẩm chất lượng và dịch vụ tin cậy, hướng tới sự phát triển dài hạn.",
        color: "text-green-600",
    },
    {
        icon: CheckSquare,
        title: "Uy tín & Tin cậy",
        description: "Đồng hành, chứng nhận và giám sát bởi các tổ chức và cộng đồng doanh nghiệp, đặt chữ tín lên hàng đầu.",
        color: "text-blue-500",
    },
    {
        icon: Target,
        title: "Đội ngũ tiên phong",
        description: "Quy tụ chuyên gia, doanh nhân và đối tác chiến lược từ nhiều lĩnh vực, giàu kinh nghiệm và nhiệt huyết.",
        color: "text-yellow-500",
    },
];

// Dữ liệu giả định cho Ban Lãnh đạo (BOD)
const BOD_MEMBERS = [
    {
        name: "Nguyễn Văn A",
        position: "Chủ tịch Hội đồng Quản trị",
        description: "Chuyên gia với 15 năm kinh nghiệm trong lĩnh vực Tài chính & Đầu tư. Định hình chiến lược phát triển bền vững cho S17.",
        imagePlaceholder: "/images/bod/placeholder-a.jpg", // Tên file ảnh giả định
    },
    {
        name: "Trần Thị B",
        position: "Tổng Giám đốc",
        description: "Đảm nhiệm vận hành toàn bộ các giải pháp E-commerce và hệ thống Coaching/Mentoring của S17.",
        imagePlaceholder: "/images/bod/placeholder-b.jpg",
    },
    // Thêm các thành viên khác nếu cần...
];

const AboutPage = () => {
    return (
        <div className="py-12 md:py-20 bg-gray-50">
            <Container className="max-w-6xl">
                
                {/* 1. Giới thiệu chung và Sứ mệnh */}
                <section className="text-center mb-16">
                    <Title className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
                        Về S17 Trading
                    </Title>
                    <p className="text-xl text-shop_dark_green font-semibold mb-8 max-w-4xl mx-auto">
                        Kiến tạo giải pháp Thương mại điện tử và Đầu tư hiện đại, tối ưu cho khách hàng.
                    </p>
                    <p className="text-base text-gray-700 max-w-4xl mx-auto leading-relaxed">
                        S17 được sáng lập bởi cộng đồng doanh nhân – doanh nghiệp cùng đội ngũ tiên phong từ nhiều lĩnh vực. Chúng tôi xây dựng mạng lưới hợp tác chiến lược, mở ra cơ hội bứt phá, mang đến giải pháp thương mại điện tử và đầu tư hiện đại, tối ưu.
                    </p>
                </section>

                {/* 2. Tầm nhìn và Giá trị cốt lõi */}
                <hr className="my-10 border-shop_dark_green/30" />
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Giá Trị Cốt Lõi Của Chúng Tôi</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {VALUES.map((item, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:translate-y-[-2px]">
                                <item.icon size={36} className={`mb-4 ${item.color}`} />
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. Sứ mệnh - Nổi bật */}
                <section className="mb-16 p-8 bg-shop_dark_green/5 rounded-2xl">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Sứ Mệnh Của S17</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            "S17 là tổ chức phát triển bền vững và truyền thừa",
                            "S17 là môi trường coaching và mentoring",
                            "S17 là môi trường học tập và nỗ lực suốt đời",
                        ].map((mission, index) => (
                            <div key={index} className="flex items-start p-4 bg-white rounded-lg shadow-md">
                                <span className="text-2xl font-extrabold text-shop_dark_green mr-3 flex-shrink-0">
                                    0{index + 1}.
                                </span>
                                <p className="text-base font-medium text-gray-700">{mission}</p>
                            </div>
                        ))}
                    </div>
                </section>
                
                {/* 4. Ban Lãnh đạo (BOD) và Thành viên */}
                <section className="mb-10">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Ban Lãnh Đạo Tiên Phong</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {BOD_MEMBERS.map((member, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-shop_dark_green text-center">
                                {/* Khung ảnh placeholder */}
                                <div className="mx-auto size-32 mb-4 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center border-4 border-white shadow-md">
                                    {/* Thay thế bằng component Image của Next.js khi bạn có ảnh */}
                                    <span className="text-gray-500 text-xs">Ảnh BOD</span> 
                                </div>
                                
                                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                                <p className="text-sm font-semibold text-shop_dark_green mb-3">{member.position}</p>
                                <p className="text-sm text-gray-600 italic leading-relaxed">{member.description}</p>
                            </div>
                        ))}
                        {/* Thẻ placeholder cho các thành viên khác */}
                        <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-gray-300 text-center flex flex-col justify-center items-center">
                             <div className="mx-auto size-32 mb-4 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center border-4 border-white shadow-md">
                                <span className="text-gray-500 text-xs">Ảnh Thành viên</span> 
                            </div>
                            <h3 className="text-xl font-bold text-gray-500">Thành viên khác</h3>
                            <p className="text-sm font-semibold text-gray-400">Đồng hành & Phát triển</p>
                        </div>
                    </div>
                </section>

            </Container>
        </div>
    );
};

export default AboutPage;