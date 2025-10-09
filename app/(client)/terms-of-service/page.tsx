import Container from "@/components/Container";
import Title from "@/components/Title";
import React from "react";
import Link from "next/link";

const TermsOfServicePage = () => {
    return (
        <div className="py-12 md:py-16 bg-white">
            <Container className="max-w-4xl p-6 md:p-10">
                
                {/* Tiêu đề chính */}
                <Title className="text-3xl md:text-4xl font-extrabold text-gray-900 border-b-4 border-shop_dark_green/80 pb-3 mb-4">
                    Điều Khoản Dịch Vụ
                </Title>
                <p className="text-sm text-gray-500 mb-10">
                    Cập nhật lần cuối: Ngày 08 tháng 10 năm 2025.
                </p>

                {/* Giới thiệu và sự chấp thuận */}
                <section className="mb-10 p-5 bg-gray-50 rounded-lg border border-gray-200">
                    <h2 className="text-xl font-bold text-shop_dark_green mb-3">Chấp Thuận Điều Khoản</h2>
                    <p className="text-base leading-relaxed text-gray-700">
                        Chào mừng đến với S17 Trading. Các Điều khoản Dịch vụ này ("Điều khoản") quy định việc bạn sử dụng các giải pháp thương mại điện tử, đầu tư, nền tảng coaching, mentoring và tất cả dịch vụ khác được cung cấp bởi S17 Trading.
                    </p>
                    <p className="text-base leading-relaxed text-gray-700 mt-3 font-semibold">
                        Bằng cách truy cập hoặc sử dụng Dịch vụ của chúng tôi, bạn đồng ý bị ràng buộc bởi các Điều khoản này. Nếu bạn không đồng ý với bất kỳ phần nào của Điều khoản, bạn không nên truy cập hoặc sử dụng Dịch vụ.
                    </p>
                </section>

                <hr className="my-10" />

                {/* 1. Các Dịch Vụ Của Chúng Tôi */}
                <section className="mb-10 text-gray-700">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Các Dịch Vụ Của S17 Trading</h2>
                    <p className="mb-4 leading-relaxed">
                        S17 Trading cung cấp các giải pháp và dịch vụ nhằm thực hiện sứ mệnh của mình: **trở thành bệ phóng cho những ý tưởng, sản phẩm và con người dám mơ lớn.** Các dịch vụ bao gồm, nhưng không giới hạn:
                    </p>
                    <ul className="space-y-2 list-disc pl-6 text-base">
                        <li>Cung cấp nền tảng và giải pháp **thương mại điện tử** tối ưu.</li>
                        <li>Tư vấn và hỗ trợ trong lĩnh vực **đầu tư** hiện đại.</li>
                        <li>Các chương trình **coaching và mentoring** phát triển cá nhân và doanh nghiệp.</li>
                        <li>Cung cấp môi trường **học tập và nỗ lực suốt đời** cho cộng đồng.</li>
                    </ul>
                </section>

                {/* 2. Quyền và Nghĩa Vụ của Người Dùng */}
                <section className="mb-10 text-gray-700">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Quyền và Nghĩa Vụ của Người Dùng</h2>
                    <ul className="space-y-4 text-base">
                        <li>
                            <strong className="text-gray-900">Tính chính xác của Thông tin:</strong> Bạn cam kết rằng tất cả thông tin bạn cung cấp (để đăng ký, đầu tư, hoặc tham gia coaching) là chính xác, đầy đủ và cập nhật.
                        </li>
                        <li>
                            <strong className="text-gray-900">Hành vi Cấm:</strong> Bạn không được sử dụng Dịch vụ của chúng tôi để thực hiện bất kỳ hoạt động nào bất hợp pháp, vi phạm quyền sở hữu trí tuệ của S17 hoặc bên thứ ba, hoặc gây tổn hại đến hệ thống, uy tín và cộng đồng của S17 Trading.
                        </li>
                        <li>
                            <strong className="text-gray-900">Bảo mật Tài khoản:</strong> Bạn hoàn toàn chịu trách nhiệm bảo mật thông tin tài khoản và mật khẩu của mình.
                        </li>
                    </ul>
                </section>

                {/* 3. Sở Hữu Trí Tuệ */}
                <section className="mb-10 text-gray-700">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Sở Hữu Trí Tuệ</h2>
                    <p className="mb-4 leading-relaxed">
                        Tất cả nội dung, tài liệu, công nghệ, thương hiệu, và thông tin được cung cấp qua Dịch vụ (bao gồm các khóa học, tài liệu mentoring, và công cụ thương mại điện tử) là tài sản độc quyền của S17 Trading hoặc các đối tác chiến lược.
                    </p>
                    <p className="leading-relaxed font-semibold">
                        Bạn không được sao chép, phân phối, sửa đổi, hoặc tái sử dụng bất kỳ nội dung nào mà không có sự đồng ý bằng văn bản của S17 Trading.
                    </p>
                </section>

                {/* 4. Tuyên bố Miễn Trừ Trách Nhiệm */}
                <section className="mb-10 text-gray-700 p-5 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Tuyên bố Miễn Trừ Trách Nhiệm</h2>
                    <p className="mb-4 leading-relaxed">
                        S17 cam kết mang lại các giải pháp đột phá và dịch vụ tin cậy, nhưng chúng tôi không đảm bảo rằng Dịch vụ sẽ luôn không bị gián đoạn, an toàn hoặc không có lỗi.
                    </p>
                    <p className="leading-relaxed font-bold">
                        Các dịch vụ tư vấn đầu tư và thương mại điện tử luôn tiềm ẩn rủi ro. S17 Trading không chịu trách nhiệm đối với bất kỳ tổn thất trực tiếp hoặc gián tiếp nào phát sinh từ việc bạn sử dụng dịch vụ hoặc dựa vào thông tin được cung cấp.
                    </p>
                </section>

                {/* 5. Chấm Dứt */}
                <section className="mb-10 text-gray-700">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Chấm Dứt Dịch Vụ</h2>
                    <p className="leading-relaxed">
                        S17 Trading có quyền chấm dứt hoặc đình chỉ quyền truy cập của bạn vào Dịch vụ ngay lập tức, mà không cần thông báo trước, nếu bạn vi phạm bất kỳ điều khoản nào trong Điều khoản này.
                    </p>
                </section>

                {/* Thông tin Liên hệ */}
                <section className="text-gray-700 pt-5 border-t border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">Liên Hệ</h2>
                    <p className="leading-relaxed mb-3">
                        Nếu có bất kỳ câu hỏi nào về Điều khoản Dịch vụ này, vui lòng liên hệ với đội ngũ của chúng tôi. Chúng tôi đề cao tinh thần **Uy tín & Tin cậy** trong mọi tương tác.
                    </p>
                    <p className="font-semibold text-shop_dark_green">
                        Email Pháp Lý: <a href="mailto:legal@s17trading.com" className="hover:underline">legal@s17trading.com</a>
                    </p>
                </section>

            </Container>
        </div>
    );
};

export default TermsOfServicePage;