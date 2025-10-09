import Container from "@/components/Container";
import Title from "@/components/Title";
import React from "react";
import { CheckCircle } from "lucide-react";

// Dữ liệu về S17 được sử dụng trong phần giới thiệu
const S17_MISSION_VALUES = {
    vision: "Trở thành bệ phóng cho những ý tưởng, sản phẩm và con người dám mơ lớn.",
    teams: "Quy tụ chuyên gia, doanh nhân và đối tác chiến lược từ nhiều lĩnh vực.",
    sustainability: "Cam kết tạo ra giải pháp đột phá, sản phẩm chất lượng và dịch vụ tin cậy.",
    trust: "Đồng hành, chứng nhận và giám sát bởi các tổ chức và cộng đồng doanh nghiệp.",
    missions: [
        "S17 là tổ chức phát triển bền vững và truyền thừa",
        "S17 là môi trường coaching và mentoring",
        "S17 là môi trường học tập và nỗ lực suốt đời",
    ]
};

const CookiePolicyPage = () => {
    return (
        <div className="py-12 md:py-16 bg-gray-50">
            <Container className="max-w-4xl bg-white p-6 md:p-10 rounded-xl shadow-lg">
                
                {/* Tiêu đề chính */}
                <Title className="text-3xl md:text-4xl font-extrabold text-gray-900 border-b-4 border-shop_dark_green/80 pb-3 mb-8">
                    Chính Sách Cookie (Cookie Policy)
                </Title>

                {/* Giới thiệu về S17 và Mục đích Chính sách */}
                <section className="mb-10 text-gray-700">
                    <h2 className="text-xl font-bold text-shop_dark_green mb-3">Về S17 Trading</h2>
                    <p className="text-base leading-relaxed">
                        S17 được sáng lập bởi cộng đồng doanh nhân – doanh nghiệp cùng đội ngũ tiên phong từ nhiều lĩnh vực, nhằm xây dựng mạng lưới hợp tác chiến lược, mang đến giải pháp thương mại điện tử và đầu tư hiện đại, tối ưu cho khách hàng. 
                        Chính sách Cookie này giải thích cách thức S17 sử dụng cookies và các công nghệ theo dõi tương tự trên các nền tảng kỹ thuật số của chúng tôi.
                    </p>
                </section>
                
                <hr className="my-8" />

                {/* 1. Cookies là gì? */}
                <section className="mb-10 text-gray-700">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        1. Cookies là gì?
                    </h2>
                    <p className="mb-4 leading-relaxed">
                        Cookies là các tệp văn bản nhỏ được lưu trữ trên máy tính hoặc thiết bị di động của bạn khi bạn truy cập các trang web. Chúng giúp website ghi nhớ hành động và tùy chọn của bạn (như thông tin đăng nhập, ngôn ngữ, kích thước phông chữ, và các cài đặt hiển thị khác) trong một khoảng thời gian, để bạn không phải nhập lại chúng mỗi khi quay lại trang hoặc duyệt từ trang này sang trang khác.
                    </p>
                    <p className="leading-relaxed">
                        Chúng tôi sử dụng cookies để cung cấp các giải pháp thương mại điện tử và đầu tư **uy tín & tin cậy** nhằm đảm bảo trải nghiệm của bạn trên nền tảng S17 là liền mạch và tối ưu nhất.
                    </p>
                </section>

                {/* 2. Loại Cookies S17 sử dụng */}
                <section className="mb-10 text-gray-700">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        2. Các Loại Cookies S17 Sử Dụng
                    </h2>
                    <ul className="space-y-4 list-disc pl-5">
                        <li className="font-semibold text-gray-900">Cookies Bắt Buộc (Strictly Necessary Cookies):</li>
                        <p className="ml-5 text-base">Cần thiết để trang web hoạt động bình thường, cho phép bạn điều hướng và sử dụng các tính năng quan trọng (ví dụ: đăng nhập, giỏ hàng, bảo mật giao dịch đầu tư). Nếu thiếu loại cookie này, dịch vụ không thể cung cấp được.</p>
                        
                        <li className="font-semibold text-gray-900">Cookies Hiệu Suất (Performance Cookies):</li>
                        <p className="ml-5 text-base">Thu thập thông tin về cách khách hàng sử dụng trang web (ví dụ: các trang được truy cập nhiều nhất, thông báo lỗi). Dữ liệu này giúp chúng tôi cải thiện hiệu suất, đảm bảo **tăng trưởng bền vững** trong chất lượng dịch vụ và nền tảng.</p>

                        <li className="font-semibold text-gray-900">Cookies Chức Năng (Functionality Cookies):</li>
                        <p className="ml-5 text-base">Cho phép trang web ghi nhớ các lựa chọn bạn đã thực hiện (ví dụ: tên người dùng, ngôn ngữ) và cung cấp các tính năng cá nhân hóa nâng cao, phù hợp với tầm nhìn **"bệ phóng cho những ý tưởng"** của S17.</p>
                        
                        <li className="font-semibold text-gray-900">Cookies Tiếp Thị (Targeting/Marketing Cookies):</li>
                        <p className="ml-5 text-base">Được sử dụng để hiển thị quảng cáo liên quan đến sở thích của bạn. Chúng giới hạn số lần bạn thấy quảng cáo và đo lường hiệu quả của chiến dịch tiếp thị. Chúng tôi chỉ sử dụng loại này với sự đồng ý của bạn.</p>
                    </ul>
                </section>

                {/* 3. Quản lý Tùy chọn Cookie */}
                <section className="mb-10 text-gray-700">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        3. Cách Bạn Quản Lý Tùy Chọn Cookie
                    </h2>
                    <p className="mb-4 leading-relaxed">
                        Bạn có toàn quyền kiểm soát việc chấp nhận hay từ chối các loại cookie không bắt buộc.
                    </p>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <CheckCircle size={20} className="text-shop_dark_green mt-1 flex-shrink-0" />
                            <p><strong>Cài đặt Trình duyệt:</strong> Bạn có thể điều chỉnh cài đặt trình duyệt để từ chối tất cả hoặc một số cookie nhất định. Tuy nhiên, việc tắt cookies bắt buộc có thể làm gián đoạn trải nghiệm của bạn trên các giải pháp của S17.</p>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle size={20} className="text-shop_dark_green mt-1 flex-shrink-0" />
                            <p><strong>Cổng đồng ý (Consent Banner):</strong> Khi lần đầu truy cập, bạn sẽ thấy banner đồng ý cookies, cho phép bạn tùy chỉnh hoặc chấp nhận các loại cookies S17 sử dụng.</p>
                        </li>
                    </ul>
                </section>

                {/* 4. Liên hệ */}
                <section className="text-gray-700 p-5 bg-gray-100 rounded-lg">
                    <h2 className="text-xl font-bold text-gray-800 mb-3">Liên Hệ</h2>
                    <p className="leading-relaxed">
                        Nếu bạn có bất kỳ câu hỏi nào về Chính sách Cookie này, vui lòng liên hệ với đội ngũ của S17. Chúng tôi luôn sẵn sàng hỗ trợ, tuân thủ sứ mệnh là môi trường học tập và nỗ lực suốt đời.
                    </p>
                    <p className="mt-2 font-semibold text-shop_dark_green">
                        Email Hỗ Trợ: <a href="mailto:support@s17trading.com" className="hover:underline">support@s17trading.com</a>
                    </p>
                </section>

            </Container>
        </div>
    );
};

export default CookiePolicyPage;