import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import BackToTop from "@/components/BackToTop";
export const metadata: Metadata = {
  title: {
    template: "%s - S17 MarketPlace",
    default: "S17 MarketPlace",
  },
  description: "S17 MarketPlace, Your one stop shop for all your needs",
  keywords: ["trang chủ S17", "S17 Trading", "đầu tư", "phát triển kinh tế", "sản phẩm cao cấp"],
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
