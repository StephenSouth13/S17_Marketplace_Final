import { MobileDeviceIcon } from "@sanity/icons"; 
import { defineField, defineType } from "sanity";

export const contactPersonType = defineType({
  name: "contactPerson",
  title: "Người Liên Hệ",
  type: "document",
  // 2. Sửa dòng này
  icon: MobileDeviceIcon,
  fields: [
    defineField({
      name: "fullName",
      title: "Họ và Tên",
      type: "string",
      validation: (Rule) => Rule.required().min(2).error("Vui lòng nhập tên đầy đủ"),
    }),
    defineField({
      name: "position",
      title: "Chức vụ",
      type: "string",
      options: {
        list: [
          { title: "Trưởng phòng Kinh doanh", value: "sales_manager" },
          { title: "Tư vấn Bán hàng", value: "sales_consultant" },
          { title: "Trưởng phòng Kỹ Thuật", value: "tech_lead" },
          { title: "Kỹ sư Tư vấn", value: "tech_consultant" },
          { title: "Quản lý Dự án", value: "project_manager" },
          { title: "Khác", value: "other" },
        ],
      },
      validation: (Rule) => Rule.required().error("Vui lòng chọn chức vụ"),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email().error("Email không hợp lệ"),
    }),
    defineField({
      name: "phone",
      title: "Số Điện Thoại",
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
      name: "bio",
      title: "Giới Thiệu Ngắn",
      type: "string",
      description: "Mô tả ngắn về người liên hệ",
    }),
    defineField({
      name: "image",
      title: "Ảnh Đại Diện",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "department",
      title: "Phòng Ban",
      type: "string",
      options: {
        list: [
          { title: "Kinh Doanh", value: "sales" },
          { title: "Kỹ Thuật", value: "technical" },
          { title: "Tư Vấn", value: "consulting" },
          { title: "Hỗ Trợ Khách Hàng", value: "support" },
        ],
      },
    }),
    defineField({
      name: "isActive",
      title: "Đang Hoạt Động",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "fullName",
      subtitle: "position",
      media: "image",
    },
    prepare({ title, subtitle, media }) {
      const positionMap: Record<string, string> = {
        sales_manager: "Trưởng phòng Kinh doanh",
        sales_consultant: "Tư vấn Bán hàng",
        tech_lead: "Trưởng phòng K�� Thuật",
        tech_consultant: "Kỹ sư Tư vấn",
        project_manager: "Quản lý Dự án",
        other: "Khác",
      };

      return {
        title: title,
        subtitle: positionMap[subtitle as string] || subtitle,
        media: media,
      };
    },
  },
});
