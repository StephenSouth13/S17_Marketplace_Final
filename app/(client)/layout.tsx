import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import BackToTop from "@/components/BackToTop";

export const metadata: Metadata = {
  title: {
    default: "S17 MarketPlace – Nền tảng thương mại thông minh Việt Nam",
    template: "%s | S17 MarketPlace",
  },
  description:
    "S17 MarketPlace – Nền tảng thương mại điện tử Việt Nam, kết nối người tiêu dùng và doanh nghiệp, hướng đến phát triển bền vững, uy tín và chất lượng.",
  keywords: [
    "S17",
    "S17 MarketPlace",
    "thương mại điện tử Việt Nam",
    "đầu tư S17",
    "kinh tế số",
    "nền tảng Việt",
    "sản phẩm Việt Nam",
    "chợ thương mại số",
    "sàn giao dịch Việt",
    "doanh nghiệp Việt",
    "Trung tâm phát triển kinh tế",
    "Trung tâm phát triển kinh tế số",
  ],
  metadataBase: new URL("https://www.s17.org.vn"), // cực kỳ quan trọng cho OG image

  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://www.s17.org.vn",
    title: "S17 MarketPlace – Nền tảng thương mại thông minh Việt Nam",
    description:
      "Khám phá hàng ngàn sản phẩm Việt chất lượng cao, kết nối cộng đồng doanh nghiệp phát triển cùng S17.",
    siteName: "S17 MarketPlace",
    images: [
      {
        url: "/logo/logo.png", // ✅ ĐÃ SỬA đường dẫn
        width: 1200,
        height: 630,
        alt: "S17 MarketPlace – Nền tảng thương mại điện tử Việt Nam",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "S17 MarketPlace – Nền tảng thương mại điện tử Việt Nam",
    description:
      "Khám phá hệ sinh thái thương mại điện tử S17 – nơi kết nối giá trị và phát triển bền vững.",
    images: ["/logo/logo.png"], // ✅ ĐÃ SỬA
    creator: "@s17vietnam", // 👈 nếu có Twitter/X
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  alternates: {
    canonical: "https://www.s17.org.vn",
  },

  category: "E-commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <BackToTop />
        <Footer />
      </div>
    </ClerkProvider>
  );
}
