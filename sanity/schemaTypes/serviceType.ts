// schemas/serviceType.ts
import { defineType, defineField } from "sanity";
import { WrenchIcon } from "@sanity/icons"; // Biểu tượng "dịch vụ"

export const serviceType = defineType({
  name: "service",
  title: "Dịch vụ",
  type: "document",
  icon: WrenchIcon,
  fields: [
    // Tên dịch vụ
    defineField({
      name: "title",
      title: "Tên dịch vụ",
      type: "string",
      validation: (rule) => rule.required(),
    }),

    // Slug cho SEO / URL
    defineField({
      name: "slug",
      title: "Slug (đường dẫn)",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    // Ảnh đại diện
    defineField({
      name: "mainImage",
      title: "Ảnh đại diện",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),

    // Mô tả ngắn
    defineField({
      name: "excerpt",
      title: "Mô tả ngắn",
      type: "text",
      rows: 3,
      description: "Giới thiệu ngắn gọn về dịch vụ",
    }),

    // Nội dung chi tiết
    defineField({
      name: "body",
      title: "Nội dung chi tiết",
      type: "blockContent",
      description: "Chi tiết về quy trình, lợi ích hoặc thông tin thêm",
    }),

    // Loại dịch vụ (Category)
    defineField({
      name: "category",
      title: "Loại dịch vụ",
      type: "reference",
      to: [{ type: "serviceCategory" }],
      validation: (rule) => rule.required(),
    }),

    // Khoảng giá
    defineField({
      name: "priceRange",
      title: "Chi phí ước tính",
      type: "object",
      fields: [
        {
          name: "min",
          title: "Giá thấp nhất (VNĐ)",
          type: "number",
          validation: (rule) => rule.min(0),
        },
        {
          name: "max",
          title: "Giá cao nhất (VNĐ)",
          type: "number",
          validation: (rule) => rule.min(0),
        },
      ],
    }),

    // Gắn nhãn nổi bật
    defineField({
      name: "isFeatured",
      title: "Dịch vụ nổi bật",
      type: "boolean",
      initialValue: false,
    }),

    // Thời gian đăng
    defineField({
      name: "publishedAt",
      title: "Ngày đăng",
      type: "datetime",
      initialValue: new Date().toISOString(),
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "mainImage",
      category: "category.title",
      isFeatured: "isFeatured",
    },
    prepare(selection) {
      const { category, isFeatured } = selection;
      return {
        ...selection,
        subtitle: `${category ? `${category}` : ""}${
          isFeatured ? " | Nổi bật" : ""
        }`,
      };
    },
  },
});
