import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Montserrat } from "next/font/google"; // Thêm dòng này

// Khởi tạo font Montserrat
const montserrat = Montserrat({
  subsets: ["vietnamese"], // Hỗ trợ tiếng Việt
  weight: ["300", "400", "500", "600", "700", "800", "900"], // Load đầy đủ các độ dày
  variable: "--font-montserrat", // Đặt tên biến CSS
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      {/* Thêm montserrat.variable và đổi font-poppins thành font-sans hoặc font-montserrat */}
      <body className={`${montserrat.variable} font-sans antialiased`}>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#000000",
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  );
};

export default RootLayout;