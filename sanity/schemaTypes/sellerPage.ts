import { defineField, defineType } from "sanity";
import { StarIcon } from "@sanity/icons";

const sellerPage = defineType({
  name: 'sellerPage',
  title: 'Cấu hình Trang Seller',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({ name: 'title', title: 'Tiêu đề trang', type: 'string' }),
    defineField({ name: 'heroImage', title: 'Banner chính', type: 'image' }),
    defineField({ name: 'description', title: 'Mô tả ngắn', type: 'text' }),
    defineField({
      name: 'benefits',
      title: 'Lợi ích khi làm Seller',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'icon', type: 'image' },
            { name: 'label', type: 'string' },
            { name: 'detail', type: 'text' },
          ],
        },
      ],
    }),
    defineField({
      name: 'marketingKit',
      title: 'Tài liệu cho Seller',
      type: 'array',
      of: [{ 
        type: 'file', 
        fields: [{ name: 'description', type: 'string', title: 'Mô tả file' }] 
      }],
    }),
  ],
});

export default sellerPage; // Dòng này cực kỳ quan trọng để sửa lỗi của bạn