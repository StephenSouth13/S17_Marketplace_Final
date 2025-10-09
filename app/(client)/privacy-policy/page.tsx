import Container from "@/components/Container";
import Title from "@/components/Title";
import React from "react";
import Link from "next/link";
import { Lock, Shield, Mail } from "lucide-react";

const PrivacyPolicyPage = () => {
    return (
        <div className="py-12 md:py-16 bg-white">
            <Container className="max-w-4xl p-6 md:p-10">
                
                {/* Tiêu đề chính */}
                <Title className="text-3xl md:text-4xl font-extrabold text-gray-900 border-b-4 border-shop_dark_green/80 pb-3 mb-4 flex items-center gap-3">
                    <Shield size={32} className="text-shop_dark_green" /> Chính Sách Quyền Riêng Tư
                </Title>
                <p className="text-sm text-gray-500 mb-10">
                    Cập nhật lần cuối: Ngày 08 tháng 10 năm 2025.
                </p>

                {/* Cam kết của S17 */}
                <section className="mb-10 p-5 bg-shop_dark_green/10 rounded-lg border-l-4 border-shop_dark_green">
                    <h2 className="text-xl font-bold text-shop_dark_green mb-3 flex items-center gap-2">
                        <Lock size={20} /> Cam Kết Về Dữ Liệu
                    </h2>
                    <p className="text-base leading-relaxed text-gray-700">
                        S17 Trading cam kết xây dựng **Uy tín & Tin cậy** bằng cách bảo vệ dữ liệu cá nhân của khách hàng. Chính sách này mô tả cách chúng tôi thu thập, sử dụng, tiết lộ và bảo vệ thông tin của bạn liên quan đến các dịch vụ Thương mại điện tử, Đầu tư, Coaching và Mentoring.
                    </p>
                </section>

                <hr className="my-10" />

                {/* 1. Thông Tin Chúng Tôi Thu Thập */}
                <section className="mb-10 text-gray-700">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Các Loại Thông Tin Chúng Tôi Thu Thập</h2>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mt-5 mb-2">Thông tin cá nhân trực tiếp (Khi đăng ký/giao dịch)</h3>
                    <p className="mb-3">
                        Đây là thông tin bạn cung cấp để sử dụng các dịch vụ cốt lõi của S17:
                    </p>
                    <ul className="space-y-1 list-disc pl-6 text-base">
                        <li>**Thông tin nhận dạng:** Tên, địa chỉ email, số điện thoại.</li>
                        <li>**Thông tin tài chính:** Chi tiết thanh toán, thông tin tài khoản (cần thiết cho các giải pháp đầu tư và giao dịch E-commerce).</li>
                        <li>**Thông tin chuyên môn:** Kinh nghiệm, mục tiêu (được thu thập cho các chương trình Coaching và Mentoring).</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-gray-900 mt-5 mb-2">Thông tin tự động (Sử dụng Dịch vụ)</h3>
                    <p className="mb-3">
                        Thông tin được thu thập tự động khi bạn truy cập nền tảng của chúng tôi:
                    </p>
                    <ul className="space-y-1 list-disc pl-6 text-base">
                        <li>**Dữ liệu sử dụng:** Địa chỉ IP, loại trình duyệt, thời gian truy cập, các trang đã xem.</li>
                        <li>**Cookies và Công nghệ theo dõi:** Được sử dụng để cải thiện hiệu suất và cá nhân hóa trải nghiệm (Tham khảo <Link href="/cookie-policy" className="text-shop_dark_green underline hover:font-bold">Chính sách Cookie</Link>).</li>
                    </ul>
                </section>

                {/* 2. Mục Đích Sử Dụng Thông Tin */}
                <section className="mb-10 text-gray-700">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Chúng Tôi Sử Dụng Thông Tin Của Bạn Để Làm Gì?</h2>
                    
                    <ul className="space-y-4 text-base">
                        <li className="font-semibold text-gray-900">Cung cấp và Quản lý Dịch vụ:</li>
                        <p className="ml-5">Thực hiện các giao dịch E-commerce, quản lý tài khoản đầu tư, và vận hành các chương trình đào tạo theo cam kết **Tăng trưởng bền vững**.</p>
                        
                        <li className="font-semibold text-gray-900">Cải thiện và Cá nhân hóa:</li>
                        <p className="ml-5">Phân tích xu hướng để cải tiến nền tảng và cung cấp nội dung Coaching/Mentoring phù hợp, hỗ trợ tầm nhìn **trở thành bệ phóng cho những ý tưởng**.</p>
                        
                        <li className="font-semibold text-gray-900">Truyền thông và Hỗ trợ:</li>
                        <p className="ml-5">Gửi thông báo quan trọng, cập nhật dịch vụ và phản hồi yêu cầu hỗ trợ của bạn, đảm bảo S17 là môi trường **học tập và nỗ lực suốt đời**.</p>

                        <li className="font-semibold text-gray-900">An toàn và Pháp lý:</li>
                        <p className="ml-5">Phòng chống gian lận, bảo vệ tính toàn vẹn của nền tảng, và tuân thủ các nghĩa vụ pháp lý liên quan đến giao dịch tài chính và thương mại.</p>
                    </ul>
                </section>

                {/* 3. Chia Sẻ và Tiết Lộ Thông Tin */}
                <section className="mb-10 text-gray-700 p-5 bg-gray-100 rounded-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Chia Sẻ và Tiết Lộ Thông Tin</h2>
                    <p className="mb-4 leading-relaxed">
                        S17 **không bán** thông tin cá nhân của bạn. Chúng tôi chỉ chia sẻ thông tin trong các trường hợp sau:
                    </p>
                    <ul className="space-y-2 list-disc pl-6 text-base">
                        <li>**Nhà cung cấp Dịch vụ:** Chia sẻ với các bên thứ ba đáng tin cậy hỗ trợ chúng tôi vận hành dịch vụ (ví dụ: xử lý thanh toán, phân tích dữ liệu), các bên này bị ràng buộc bởi các thỏa thuận bảo mật nghiêm ngặt.</li>
                        <li>**Đối tác Chiến lược:** Chia sẻ với các đối tác trong mạng lưới hợp tác chiến lược của S17 để cung cấp các giải pháp chuyên biệt (ví dụ: đối tác đầu tư), chỉ khi có sự đồng ý của bạn.</li>
                        <li>**Yêu cầu Pháp lý:** Khi được yêu cầu bởi luật pháp hoặc quy định của chính phủ để bảo vệ quyền lợi, tài sản hoặc sự an toàn của S17 và cộng đồng.</li>
                    </ul>
                </section>

                {/* 4. Bảo Mật Dữ Liệu */}
                <section className="mb-10 text-gray-700">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Bảo Mật Dữ Liệu</h2>
                    <p className="leading-relaxed">
                        Chúng tôi áp dụng các biện pháp bảo mật vật lý, kỹ thuật và quản lý để bảo vệ thông tin cá nhân của bạn khỏi truy cập, sử dụng hoặc tiết lộ trái phép. Các giải pháp E-commerce và Đầu tư của chúng tôi sử dụng công nghệ mã hóa tiên tiến để đảm bảo an toàn cho dữ liệu tài chính nhạy cảm.
                    </p>
                </section>

                {/* 5. Quyền Của Bạn */}
                <section className="mb-10 text-gray-700">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Quyền Cá Nhân Của Bạn</h2>
                    <p className="leading-relaxed">
                        Bạn có quyền truy cập, sửa đổi, xóa thông tin cá nhân hoặc từ chối nhận thông tin tiếp thị từ chúng tôi. Để thực hiện các quyền này, vui lòng liên hệ với bộ phận hỗ trợ của S17.
                    </p>
                </section>

                {/* Liên hệ */}
                <section className="text-gray-700 pt-5 border-t border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <Mail size={24} className="text-shop_dark_green" /> Thông Tin Liên Hệ
                    </h2>
                    <p className="leading-relaxed mb-3">
                        Nếu bạn có bất kỳ câu hỏi hoặc quan ngại nào về Chính sách Quyền riêng tư này, vui lòng liên hệ với Cán bộ Bảo vệ Dữ liệu của chúng tôi:
                    </p>
                    <p className="font-semibold text-shop_dark_green">
                        Email Hỗ Trợ: <a href="mailto:privacy@s17trading.com" className="hover:underline">privacy@s17trading.com</a>
                    </p>
                </section>

            </Container>
        </div>
    );
};

export default PrivacyPolicyPage;