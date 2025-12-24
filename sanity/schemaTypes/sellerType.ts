import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const sellerType = defineType({
  name: "seller",
  title: "Danh sách Người bán",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({ name: "name", title: "Tên Seller", type: "string", validation: (R) => R.required() }),
    defineField({ name: "role", title: "Chuyên môn/Chức vụ", type: "string" }),
    defineField({ name: "avatar", title: "Ảnh chân dung", type: "image", options: { hotspot: true } }),
    defineField({ name: "bio", title: "Giới thiệu ngắn", type: "text", rows: 2 }),
    defineField({ name: "isVerified", title: "Xác minh uy tín", type: "boolean", initialValue: true }),
    defineField({ name: "order", title: "Thứ tự hiển thị", type: "number" }),
  ],
});