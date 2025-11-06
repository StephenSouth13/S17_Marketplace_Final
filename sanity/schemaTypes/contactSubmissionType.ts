import { EnvelopeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const contactSubmissionType = defineType({
  name: "contactSubmission",
  title: "Yêu Cầu Liên Hệ",
  type: "document",
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: "fullName",
      title: "Họ và Tên Khách Hàng",
      type: "string",
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "phone",
      title: "Số Điện Thoại",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subject",
      title: "Lĩnh Vực Quan Tâm",
      type: "string",
      options: {
        list: [
          { title: "Giải pháp Thương mại điện tử", value: "E-commerce" },
          { title: "Tư vấn Đầu tư", value: "Investment" },
          { title: "Chương trình Coaching/Mentoring", value: "Coaching" },
          { title: "Dịch vụ Khác", value: "Other" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "message",
      title: "Nội Dung Yêu Cầu",
      type: "text",
      validation: (Rule) => Rule.required().min(10),
    }),
    defineField({
      name: "submittedAt",
      title: "Thời Gian Gửi",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Trạng Thái",
      type: "string",
      options: {
        list: [
          { title: "Chưa Xử Lý", value: "new" },
          { title: "Đang Xử Lý", value: "processing" },
          { title: "Đã Phản Hồi", value: "replied" },
          { title: "Đã Giải Quyết", value: "resolved" },
        ],
      },
      initialValue: "new",
    }),
    defineField({
      name: "notes",
      title: "Ghi Chú Nội Bộ",
      type: "text",
      description: "Chỉ dành cho nhân viên",
    }),
  ],
  preview: {
    select: {
      title: "fullName",
      subtitle: "email",
      status: "status",
      date: "submittedAt",
    },
    prepare({ title, subtitle, status, date }) {
      const statusEmoji: Record<string, string> = {
        new: "🆕",
        processing: "⏳",
        replied: "✅",
        resolved: "✔️",
      };

      return {
        title: `${statusEmoji[status as string] || "📧"} ${title}`,
        subtitle: `${subtitle} • ${new Date(date).toLocaleDateString("vi-VN")}`,
      };
    },
  },
});
