import { defineType, defineField } from "sanity";
import { WrenchIcon } from "@sanity/icons";

export const serviceType = defineType({
  name: "service",
  title: "Dịch vụ",
  type: "document",
  icon: WrenchIcon,
  fields: [
    // Tên, Slug, Ảnh, Mô tả ngắn, Nội dung chi tiết, Loại dịch vụ: GIỮ NGUYÊN
    defineField({ name: "title", title: "Tên dịch vụ", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug (đường dẫn)", type: "slug", options: { source: "title", maxLength: 96, }, validation: (rule) => rule.required() }),
    defineField({ name: "mainImage", title: "Ảnh đại diện", type: "image", options: { hotspot: true }, validation: (rule) => rule.required() }),
    defineField({ name: "excerpt", title: "Mô tả ngắn", type: "text", rows: 3, description: "Giới thiệu ngắn gọn về dịch vụ" }),
    defineField({ name: "body", title: "Nội dung chi tiết", type: "blockContent", description: "Chi tiết về quy trình, lợi ích hoặc thông tin thêm" }),
    defineField({ name: "category", title: "Loại dịch vụ", type: "reference", to: [{ type: "serviceCategory" }], validation: (rule) => rule.required() }),

    // 💡 TRƯỜNG MỚI: MÔ HÌNH GIÁ
    defineField({
        name: 'pricingModel',
        title: 'Mô hình Giá',
        type: 'string',
        options: {
            list: [
                { title: 'Tùy chỉnh/Khoảng Giá (Custom/Quote)', value: 'custom' },
                { title: 'Theo Gói (Tiered Plans)', value: 'tiered' },
            ],
            layout: 'radio',
        },
        initialValue: 'custom',
        validation: (Rule) => Rule.required(),
    }),

    // KHOẢNG GIÁ (CHỈ HIỂN THỊ KHI CHỌN CUSTOM)
    defineField({
      name: "priceRange",
      title: "Khoảng giá ước tính (cho Custom/Quote)",
      type: "object",
      fields: [
        { name: "min", title: "Giá thấp nhất (VNĐ)", type: "number", validation: (rule) => rule.min(0), },
        { name: "max", title: "Giá cao nhất (VNĐ)", type: "number", validation: (rule) => rule.min(0), },
      ],
      description: 'Chỉ điền nếu "Mô hình Giá" là Tùy chỉnh/Khoảng giá.',
      hidden: ({ parent }) => parent?.pricingModel !== 'custom',
    }),

    // CÁC GÓI DỊCH VỤ (CHỈ HIỂN THỊ KHI CHỌN TIERED)
    defineField({
        name: 'plans',
        title: 'Các Gói Dịch vụ (Basic/Pro/Premium)',
        type: 'array',
        // Sửa đoạn 'of' này để định nghĩa cấu trúc của plan
        of: [
          {
            type: 'object',
            name: 'plan',
            title: 'Gói dịch vụ',
            fields: [
              { name: 'name', title: 'Tên gói', type: 'string' },
              { name: 'price', title: 'Giá hiển thị', type: 'string' },
              { 
                name: 'features', 
                title: 'Tính năng', 
                type: 'array', 
                of: [{ type: 'string' }] 
              },
              { name: 'isPopular', title: 'Gói phổ biến nhất?', type: 'boolean' },
            ]
          }
        ], 
        description: 'Chỉ điền nếu "Mô hình Giá" là Theo Gói.',
        hidden: ({ parent }) => parent?.pricingModel !== 'tiered',
        validation: (Rule) => Rule.custom((plans, context) => {
            const pricingModel = (context.parent as any)?.pricingModel;
            if (pricingModel === 'tiered' && (!plans || plans.length === 0)) {
                return 'Phải có ít nhất một Gói Dịch vụ khi chọn mô hình Theo Gói.';
            }
            return true;
        }),
    }),
    
    // Gắn nhãn nổi bật: GIỮ NGUYÊN
    defineField({
      name: "isFeatured",
      title: "Dịch vụ nổi bật",
      type: "boolean",
      initialValue: false,
    }),

    // Thời gian đăng: GIỮ NGUYÊN
    defineField({
      name: "publishedAt",
      title: "Ngày đăng",
      type: "datetime",
      initialValue: new Date().toISOString(),
    }),
  ],

  // Preview: GIỮ NGUYÊN
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
