import { Clock, Mail, MapPin, Phone } from "lucide-react";
import React from "react";

interface ContactItemData {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

// Cập nhật nội dung theo yêu cầu của bạn
const data: ContactItemData[] = [
  {
    title: "Địa chỉ",
    // Địa chỉ mới
    subtitle: "123 Trương Định, Quận 3, TP.HCM, Việt Nam",
    icon: (
      <MapPin className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
    ),
  },
  {
    title: "Số điện thoại",
    // Số điện thoại mới
    subtitle: "0868 158 269",
    icon: (
      <Phone className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
    ),
  },
  {
    title: "Giờ làm việc",
    // Giữ nguyên giờ làm việc mẫu
    subtitle: "Thứ Hai - Thứ Sáu: 08:30 - 11:00 & 13:30 - 17:00",
    icon: (
      <Clock className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
    ),
  },
  {
    title: "Email",
    // Email mới
    subtitle: "info@s17.org.vn",
    icon: (
      <Mail className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
    ),
  },
];

const FooterTop = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 border-b">
      {data.map((item) => (
        <div
          // Sử dụng item.title làm key vì nó là duy nhất và mang tính mô tả
          key={item.title}
          className="flex items-center gap-3 group hover:bg-gray-50 p-4 transition-colors"
        >
          {item.icon}
          <div>
            <h3 className="font-semibold text-gray-900 group-hover:text-black transition-colors">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm mt-1 group-hover:text-gray-900 transition-colors">
              {item.subtitle}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FooterTop;