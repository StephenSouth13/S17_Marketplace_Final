import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { apiVersion, dataset, projectId } from './sanity/env';
// Đã loại bỏ: import { schema } from './sanity/schemaTypes' vì chúng ta sẽ định nghĩa types trực tiếp
import { structure } from './sanity/structure'; // Import cấu trúc Desk

// ===============================================
// 💡 FIX: Import TẤT CẢ các schema types và Object Types cần thiết
// Đã sửa đường dẫn thành './sanity/schemaTypes/' (dựa trên thông báo lỗi mới nhất)
// ===============================================

// Giả định các Schema Documents (Thay thế cho nội dung của file schemaTypes/index)
// 💡 FIX: Thay đổi import blockContent sang Named Import
import { blockContentType as blockContent } from './sanity/schemaTypes/blockContentType';
import { categoryType as category } from './sanity/schemaTypes/categoryType';
import { productType as product } from './sanity/schemaTypes/productType';
import { authorType as author } from './sanity/schemaTypes/authorType';
import { brandType as brand } from './sanity/schemaTypes/brandType';
import { blogType as blog } from './sanity/schemaTypes/blogType';
import { blogCategoryType as blogcategory } from './sanity/schemaTypes/blogCategoryType';
import { orderType as order } from './sanity/schemaTypes/orderType';
import { addressType as address } from './sanity/schemaTypes/addressType'; 

// Dịch vụ và Gói (FIX: Đăng ký 'plan' và 'service')
// 💡 Đã sửa lỗi: Chuyển sang Default Import vì planType.ts sử dụng export default
import plan from './sanity/schemaTypes/planType'; // Sửa lỗi 2614
import { serviceCategoryType as serviceCategory } from './sanity/schemaTypes/serviceCategory'; 
import { serviceType as service } from './sanity/schemaTypes/serviceType'; // Document type "service"


export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // 💡 FIX: Định nghĩa schema trực tiếp để đảm bảo tất cả types được đăng ký
  schema: {
    types: [
      // Documents chính
      category,
      product,
      author,
      brand,
      blog,
      blogcategory,
      order,
      address,
      
      // Documents Dịch vụ
      serviceCategory,
      service, // Đăng ký kiểu "service"

      // Objects/Custom Types
      blockContent, // Đã được import đúng
      plan, // Đã được import đúng
    ],
  },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
