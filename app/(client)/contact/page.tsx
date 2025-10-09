import Container from "@/components/Container";
import Title from "@/components/Title";
import { Mail, Phone, MapPin } from "lucide-react";
import React from "react";
// Giả định bạn có component Input và Button
// import { Input } from "@/components/ui/input"; 
// import { Button } from "@/components/ui/button"; 

// Dữ liệu liên hệ
const CONTACT_INFO = [
    {
        icon: MapPin,
        title: "Địa chỉ văn phòng",
        detail: "180A, Nam Kỳ Khởi Nghĩa, Phường Võ Thị Sáu, Quận 3, TP.HCM",
        link: "https://maps.app.goo.gl/YourMapLinkHere", // Thay thế bằng link Google Maps thực tế
    },
    {
        icon: Phone,
        title: "Hotline",
        detail: "(+84) 937 667 945",
        link: "tel:+84937667945",
    },
    {
        icon: Mail,
        title: "Email",
        detail: "info@s17.vn",
        link: "mailto:info@s17.vn",
    },
];

const ContactPage = () => {
    return (
        <div className="py-12 md:py-20 bg-gray-50">
            <Container className="max-w-6xl">
                
                <div className="text-center mb-12">
                    <Title className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-3">
                        Kết Nối Với Chúng Tôi
                    </Title>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Hãy để lại thông tin, đội ngũ chuyên gia của S17 sẽ liên hệ lại với bạn trong thời gian sớm nhất để mang đến các giải pháp tối ưu.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Phần 1: Thông tin liên hệ (Bên trái PC, Trên Mobile) */}
                    <div className="lg:col-span-1 space-y-8 p-6 bg-white rounded-xl shadow-lg h-fit">
                        {CONTACT_INFO.map((item, index) => (
                            <div key={index} className="flex items-start gap-4">
                                <div className="p-3 bg-shop_dark_green/10 rounded-full text-shop_dark_green">
                                    <item.icon size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                                    <a 
                                        href={item.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-base text-gray-600 hover:text-shop_dark_green transition-colors"
                                    >
                                        {item.detail}
                                    </a>
                                </div>
                            </div>
                        ))}
                        
                        {/* Bổ sung Map Iframe cho hiển thị đẹp hơn trên PC */}
                        <div className="mt-8">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Vị trí trên bản đồ</h3>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.227494490333!2d106.689363574972!3d10.79374098934526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f2061214e9f%3A0xc6c7d7e792f44c4b!2zMTgwQSBQLiBOYW0gSyzigkGvIEvpg40gTmdoxKlhLCBQLsOgW8oQxIBpIFNlw7IsIFF14bqtbiAzLCBUUC5I4buTIEPDrSBNaW5o!5e0!3m2!1sen!2s!4v1699949495123!5m2!1sen!2s"
                                width="100%"
                                height="250"
                                style={{ border: 0 }}
                                allowFullScreen={false}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="rounded-lg shadow-inner"
                            ></iframe>
                        </div>
                    </div>

                    {/* Phần 2: Form Liên hệ (Bên phải PC, Dưới Mobile) */}
                    <div className="lg:col-span-2 p-8 md:p-10 bg-white rounded-xl shadow-xl">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-3">Gửi Yêu Cầu Tư Vấn</h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                
                                {/* Tên */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Họ và Tên</label>
                                    {/* Thay thế bằng component Input của bạn */}
                                    <input 
                                        type="text" 
                                        id="name" 
                                        name="name" 
                                        placeholder="Nhập tên của bạn"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-shop_dark_green focus:border-shop_dark_green transition duration-150"
                                        required
                                    />
                                </div>
                                
                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        name="email" 
                                        placeholder="Nhập địa chỉ email"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-shop_dark_green focus:border-shop_dark_green transition duration-150"
                                        required
                                    />
                                </div>
                                
                                {/* Số điện thoại */}
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Số Điện Thoại</label>
                                    <input 
                                        type="tel" 
                                        id="phone" 
                                        name="phone" 
                                        placeholder="VD: 090xxxxxxx"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-shop_dark_green focus:border-shop_dark_green transition duration-150"
                                        required
                                    />
                                </div>
                                
                                {/* Lĩnh vực quan tâm */}
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Lĩnh vực quan tâm</label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        className="w-full p-3 border border-gray-300 bg-white rounded-lg focus:ring-shop_dark_green focus:border-shop_dark_green transition duration-150 appearance-none"
                                        required
                                    >
                                        <option value="" disabled>Chọn lĩnh vực</option>
                                        <option value="E-commerce">Giải pháp Thương mại điện tử</option>
                                        <option value="Investment">Tư vấn Đầu tư</option>
                                        <option value="Coaching">Chương trình Coaching/Mentoring</option>
                                        <option value="Other">Khác</option>
                                    </select>
                                </div>
                            </div>
                            
                            {/* Nội dung tin nhắn */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Nội Dung Chi Tiết</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    placeholder="Xin vui lòng mô tả yêu cầu của bạn..."
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-shop_dark_green focus:border-shop_dark_green transition duration-150"
                                    required
                                ></textarea>
                            </div>

                            {/* Nút Gửi */}
                            <div className="flex justify-end">
                                {/* Thay thế bằng component Button của bạn */}
                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-shop_dark_green text-white font-semibold rounded-lg shadow-md hover:bg-shop_dark_green/90 transition-all duration-300 ease-in-out transform hover:scale-[1.01] flex items-center gap-2"
                                >
                                    Gửi Yêu Cầu <Mail size={18} />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default ContactPage;