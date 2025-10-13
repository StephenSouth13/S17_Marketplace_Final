// sanity/schemaTypes/productType.ts

// Nhập biểu tượng và hàm định nghĩa từ Sanity
import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

// Định nghĩa kiểu sản phẩm
export const productType = defineType({
  name: "product",
  title: "Sản phẩm", // Tiêu đề tiếng Việt
  type: "document",
  icon: TrolleyIcon, // Biểu tượng Xe đẩy hàng
  fields: [
    defineField({
      name: "name",
      title: "Tên Sản phẩm",
      type: "string",
      validation: (Rule) => Rule.required(), // Bắt buộc nhập
    }),
    defineField({
      name: "slug",
      title: "Slug (Đường dẫn)",
      type: "slug",
      options: {
        source: "name", // Tự động tạo từ trường 'name'
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(), // Bắt buộc nhập
    }),
    defineField({
      name: "images",
      title: "Hình ảnh Sản phẩm",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }], // Cho phép chọn điểm nóng (hotspot)
    }),
    defineField({
      name: "description",
      title: "Mô tả",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Giá bán",
      type: "number",
      validation: (Rule) => Rule.required().min(0), // Bắt buộc và phải lớn hơn hoặc bằng 0
    }),
    defineField({
      name: "discount",
      title: "Chiết khấu (%)", // Đổi tên rõ ràng hơn là Chiết khấu (%)
      type: "number",
      validation: (Rule) => Rule.required().min(0), // Bắt buộc và phải lớn hơn hoặc bằng 0
    }),
    defineField({
      name: "categories",
      title: "Danh mục",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }], // Tham chiếu đến kiểu 'category'
    }),
    defineField({
      name: "stock",
      title: "Tồn kho",
      type: "number",
      validation: (Rule) => Rule.min(0), // Tối thiểu là 0
    }),
    defineField({
      name: "brand",
      title: "Thương hiệu",
      type: "reference",
      to: { type: "brand" }, // Tham chiếu đến kiểu 'brand'
    }),
    defineField({
      name: "status",
      title: "Trạng thái Sản phẩm",
      type: "string",
      options: {
        list: [
          { title: "Mới", value: "new" }, // Mới (New)
          { title: "Nổi bật", value: "hot" }, // Nổi bật/Bán chạy (Hot)
          { title: "Khuyến mãi", value: "sale" }, // Giảm giá/Khuyến mãi (Sale)
        ],
      },
    }),
    defineField({
  name: "variant",
  title: "Phân loại sản phẩm",
  type: "string",
  options: {
    list: [
      { title: "Tất cả", value: "all" },
      { title: "Thực phẩm", value: "food" },
      { title: "Nước uống", value: "drink" },
      { title: "Khác", value: "others" },
    ],
    layout: "radio",
  },
  validation: (Rule) => Rule.required(),
}),

    defineField({
      name: "isFeatured",
      title: "Sản phẩm Nổi bật (Trang chủ)", // Tiêu đề tiếng Việt
      type: "boolean",
      description: "Bật/Tắt để hiển thị sản phẩm này trên Trang chủ.",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "images",
      subtitle: "price",
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      const image = media && media[0];
      return {
        title: title,
        subtitle: `$${subtitle}`, // Hiển thị giá kèm ký hiệu $ (Giữ nguyên định dạng này để dễ theo dõi)
        media: image,
      };
    },
  },
});