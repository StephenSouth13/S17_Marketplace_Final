import React from "react";
import Container from "./Container";
import FooterTop from "./FooterTop";
import Logo from "./Logo";
import SocialMedia from "./SocialMedia";
import { SubText, SubTitle } from "./ui/text";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

// Dữ liệu được định nghĩa lại theo yêu cầu của người dùng
const newQuickLinksData = [
  { title: "Trang Chủ", href: "/" },
  { title: "Sản Phẩm", href: "/products" },
  { title: "Dịch Vụ", href: "/services" },
  { title: "Giới Thiệu", href: "/about" },
  { title: "Liên Hệ", href: "/contact" },
];

const newCategoriesData = [
  { title: "Danh Mục Sản Phẩm", href: "all-products" },
  { title: "Hàng Mới Về", href: "new-arrivals" },
  { title: "Bán Chạy Nhất", href: "best-sellers" },
  { title: "Ưu Đãi Đặc Biệt", href: "special-offers" },
];

const newPolicyLinks = [
  { title: "Chính Sách Bảo Mật", href: "/privacy-policy" },
  { title: "Điều Khoản Dịch Vụ", href: "/terms-of-service" },
  { title: "Chính Sách Cookie", href: "/cookie-policy" },
];

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <Container>
        {/* Giữ nguyên FooterTop cho phần thông tin liên hệ */}
        <FooterTop />

        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Cột 1: Logo và Giới thiệu */}
          <div className="space-y-4">
            <Logo />
            <SubText>
              Nền tảng thương mại điện tử và đầu tư hàng đầu, mang đến những sản
              phẩm chất lượng cao và cơ hội đầu tư sinh lời.
            </SubText>
            <SocialMedia
              className="text-darkColor/60"
              iconClassName="border-darkColor/60 hover:border-shop_light_green hover:text-shop_light_green"
              tooltipClassName="bg-darkColor text-white"
            />
          </div>

          {/* Cột 2: Công Ty (Quick Links) */}
          <div>
            <SubTitle>Công Ty</SubTitle>
            <ul className="space-y-3 mt-4">
              {newQuickLinksData.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="hover:text-shop_light_green font-medium"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 3: Sản Phẩm (Categories) */}
          <div>
            <SubTitle>Sản Phẩm</SubTitle>
            <ul className="space-y-3 mt-4">
              {newCategoriesData.map((item) => (
                <li key={item.title}>
                  <Link
                    href={`/category/${item.href}`}
                    className="hover:text-shop_light_green font-medium"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 4: Chính sách (Newsletter cũ) */}
          <div className="space-y-4">
            <SubTitle>Chính sách</SubTitle>
            {/* Thay thế Newsletter bằng các liên kết Chính sách */}
            <ul className="space-y-3 mt-4">
              {newPolicyLinks.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="hover:text-shop_light_green font-medium"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Phần bản quyền (Copyright) */}
        <div className="py-6 border-t text-center text-sm text-gray-600">
          <div>
            {/* Đã xóa <Logo /> và thay thế bằng S17 Trading */}
            © {new Date().getFullYear()} <b className="font-semibold text-gray-900">S17 Trading</b>. All
            rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;