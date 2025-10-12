import React from "react";
import Container from "./Container";
import FooterTop from "./FooterTop";
import Logo from "./Logo";
import { SubText, SubTitle } from "./ui/text";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Phone,
  MessageCircle,
  Music2,
} from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: <Facebook size={18} />, href: "https://www.facebook.com/congtycophans17/", label: "Facebook" },
    { icon: <Instagram size={18} />, href: "https://www.instagram.com/s17trading/", label: "Instagram" },
    { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/in/ph%C3%A1t-tri%E1%BB%83n-kinh-t%E1%BA%BF-trung-t%C3%A2m-213a8b384/", label: "LinkedIn" },
    { icon: <Youtube size={18} />, href: "https://www.youtube.com/@S17Trading", label: "YouTube" },
    { icon: <Music2 size={18} />, href: "https://www.tiktok.com/@trungtamphattrienkinhte", label: "TikTok" },
    { icon: <MessageCircle size={18} />, href: "https://zalo.me/0868158269", label: "Zalo" },
    { icon: <Phone size={18} />, href: "tel:0868158269", label: "Hotline" },
  ];

  const quickLinks = [
    { title: "Trang Chủ", href: "/" },
    { title: "Sản Phẩm", href: "/products" },
    { title: "Dịch Vụ", href: "/services" },
    { title: "Giới Thiệu", href: "/about" },
    { title: "Liên Hệ", href: "/contact" },
  ];

  const categories = [
    { title: "Danh Mục", href: "/category/all-products" },
    { title: "Hàng Mới", href: "/category/new-arrivals" },
    { title: "Bán Chạy", href: "/category/best-sellers" },
    { title: "Ưu Đãi", href: "/category/special-offers" },
  ];

  const policies = [
    { title: "Chính Sách Bảo Mật", href: "/privacy-policy" },
    { title: "Điều Khoản Dịch Vụ", href: "/terms-of-service" },
    { title: "Chính Sách Cookie", href: "/cookie-policy" },
  ];

  return (
    <footer className="bg-white border-t border-gray-100">
      <Container>
        <FooterTop />

        {/* Main footer grid */}
        <div className="py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* 1️⃣ Cột logo & mô tả */}
          <div className="space-y-5">
            <Logo />
            <SubText className="text-gray-600 leading-relaxed text-sm">
              Nền tảng thương mại & đầu tư hàng đầu — mang đến sản phẩm chất
              lượng cao và cơ hội đầu tư bền vững.
            </SubText>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              {socialLinks.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-shop_light_green hover:text-white hover:border-shop_light_green transition-all"
                >
                  {s.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* 2️⃣ Cột: Công ty */}
          <div>
            <SubTitle className="text-gray-900 font-semibold">Công Ty</SubTitle>
            <ul className="space-y-2 mt-4 text-sm text-gray-600">
              {quickLinks.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="hover:text-shop_light_green transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3️⃣ Cột: Sản phẩm */}
          <div>
            <SubTitle className="text-gray-900 font-semibold">Sản Phẩm</SubTitle>
            <ul className="space-y-2 mt-4 text-sm text-gray-600">
              {categories.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="hover:text-shop_light_green transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4️⃣ Cột: Chính sách */}
          <div>
            <SubTitle className="text-gray-900 font-semibold">Chính Sách</SubTitle>
            <ul className="space-y-2 mt-4 text-sm text-gray-600">
              {policies.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="hover:text-shop_light_green transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 5️⃣ Copyright */}
        <div className="border-t border-gray-200 py-5 text-center text-sm text-gray-500">
          © {new Date().getFullYear()}{" "}
          <b className="text-gray-900">S17 Trading</b>. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
