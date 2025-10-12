import { defineType, defineField } from 'sanity';
import { Package } from 'lucide-react';

/**
 * Định nghĩa schema cho một Gói Dịch vụ (Pricing Plan).
 * Schema này được sử dụng làm phần tử trong mảng 'plans' của schema 'service'.
 */
export default defineType({
  name: 'plan',
  title: 'Gói Dịch Vụ',
  type: 'object',
  icon: Package, // Sử dụng icon để dễ nhận biết trong Studio

  fields: [
    defineField({
      name: 'name',
      title: 'Tên Gói',
      type: 'string',
      description: 'Ví dụ: Gói Cơ Bản, Gói Chuyên Nghiệp',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Giá (VND)',
      type: 'number',
      description: 'Giá của gói (Đơn vị: VND)',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'isPopular',
      title: 'Đề Xuất (Popular)',
      type: 'boolean',
      description: 'Đánh dấu nếu đây là gói được khuyến nghị hoặc phổ biến nhất.',
      initialValue: false,
    }),
    defineField({
      name: 'features',
      title: 'Các Tính Năng Chính',
      type: 'array',
      description: 'Danh sách các tính năng được bao gồm trong gói này.',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'price',
      isPopular: 'isPopular',
    },
    prepare({ title, subtitle, isPopular }) {
      const formattedPrice = Number(subtitle ?? 0).toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
      });
      return {
        title: title || 'Chưa đặt tên gói',
        subtitle: `${formattedPrice}${isPopular ? ' (Đề xuất)' : ''}`,
      };
    },
  },
});
