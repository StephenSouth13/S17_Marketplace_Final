// schemas/serviceCategory.ts
import { defineType, defineField } from "sanity";
import { TagIcon } from "@sanity/icons";

export const serviceCategoryType = defineType({
  name: "serviceCategory",
  title: "Danh mục dịch vụ",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      title: "Tên danh mục",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (đường dẫn)",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Mô tả",
      type: "text",
    }),
  ],
});
