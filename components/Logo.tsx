import { cn } from "@/lib/utils";
import React from "react";
import Image from "next/image";

const Logo = ({
  className,
  spanDesign, // Không sử dụng trong mã hiện tại, có thể xóa nếu không cần
}: {
  className?: string;
  spanDesign?: string;
}) => {
  return (
    <a href={"/"} className="inline-flex">
      <Image
        src="/logo/logo.png"
        alt="S17 MarketPlace Logo"
        // 💡 LƯU Ý: Vẫn giữ width và height để tối ưu hóa hiệu suất (lý tưởng là tỷ lệ 2:1 hoặc 160:80)
        width={160}
        height={80} 
        
        // 🚀 ĐÃ SỬA LỖI: Sử dụng hàm `cn` để nối các class một cách an toàn và đúng cú pháp.
        // H-20 w-auto sẽ giúp duy trì tỷ lệ 160:80 ban đầu nhưng chiều cao là 80px (20 * 4px)
        className={cn(
          "h-20 w-auto object-contain",
          className
        )}
        
        loading="eager"
        priority={true}
      />
    </a>
  );
};

export default Logo;