import { HomeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const addressType = defineType({
  name: "address",
  title: "Địa chỉ người dùng",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "userId",
      title: "User ID",
      type: "string",
      description: "ID người dùng (Clerk hoặc auth system)",
      validation: (Rule) => Rule.required().error("Thiếu userId"),
    }),
    defineField({
      name: "userEmail",
      title: "Email khách hàng",
      type: "string",
      description: "Email của khách hàng (để quản lý dễ hơn)",
      validation: (Rule) => Rule.required().email().error("Email không hợp lệ"),
    }),
    defineField({
      name: "customerPhone",
      title: "Số điện thoại khách hàng",
      type: "string",
      description: "Số ��iện thoại của khách hàng (để quản lý dễ hơn)",
      validation: (Rule) => Rule.required().error("Vui lòng nhập số điện thoại khách hàng"),
    }),
    defineField({
      name: "fullName",
      title: "Họ và tên người nhận",
      type: "string",
      validation: (Rule) => Rule.required().min(3).error("Tên không hợp lệ"),
    }),
    defineField({
      name: "phone",
      title: "Số điện thoại (Giao hàng)",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .regex(/^(0|\+84)[0-9]{9}$/, {
            name: "phone",
            invert: false,
          })
          .error("Số điện thoại không hợp lệ"),
    }),
    defineField({
      name: "street",
      title: "Địa chỉ chi tiết (số nhà, đường)",
      type: "string",
      validation: (Rule) => Rule.required().min(5).error("Vui lòng nhập địa chỉ chi tiết"),
    }),
    defineField({
      name: "district",
      title: "Quận/Huyện",
      type: "string",
      validation: (Rule) => Rule.required().error("Vui lòng nhập Quận/Huyện"),
    }),
    defineField({
      name: "city",
      title: "Tỉnh/Thành phố",
      type: "string",
      validation: (Rule) => Rule.required().error("Vui lòng nhập Tỉnh/Thành phố"),
    }),
    defineField({
      name: "type",
      title: "Loại địa chỉ",
      type: "string",
      options: {
        list: [
          { title: "Nhà riêng", value: "home" },
          { title: "Văn phòng", value: "office" },
          { title: "Khác", value: "other" },
        ],
        layout: "radio",
      },
      initialValue: "home",
    }),
    defineField({
      name: "isDefault",
      title: "Đặt làm địa chỉ mặc định",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "createdAt",
      title: "Ngày tạo",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: "fullName",
      subtitle: "street",
      city: "city",
      district: "district",
      type: "type",
      isDefault: "isDefault",
    },
    prepare({ title, subtitle, city, district, type, isDefault }) {
      const typeMap: Record<string, string> = {
        home: "🏠 Nhà riêng",
        office: "💼 Văn phòng",
        other: "📦 Khác",
      };

      return {
        title: `${title} ${isDefault ? "⭐ [Mặc định]" : ""}`,
        subtitle: `${subtitle}, ${district}, ${city} — ${typeMap[type] || ""}`,
      };
    },
  },
});
