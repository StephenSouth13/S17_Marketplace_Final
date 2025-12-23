import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { apiVersion, dataset, projectId } from './sanity/env';
import { structure } from './sanity/structure'; 

// === IMPORT SCHEMAS ===
import { blockContentType as blockContent } from './sanity/schemaTypes/blockContentType';
import { categoryType as category } from './sanity/schemaTypes/categoryType';
import { productType as product } from './sanity/schemaTypes/productType';
import { authorType as author } from './sanity/schemaTypes/authorType';
import { brandType as brand } from './sanity/schemaTypes/brandType';
import { blogType as blog } from './sanity/schemaTypes/blogType';
import { blogCategoryType as blogcategory } from './sanity/schemaTypes/blogCategoryType';
import { orderType as order } from './sanity/schemaTypes/orderType';
import { addressType as address } from './sanity/schemaTypes/addressType'; 
import plan from './sanity/schemaTypes/planType'; 
import { serviceCategoryType as serviceCategory } from './sanity/schemaTypes/serviceCategory'; 
import { serviceType as service } from './sanity/schemaTypes/serviceType';

// Import Contact Submission
import { contactSubmissionType as contactSubmission } from './sanity/schemaTypes/contactSubmissionType'; 

export default defineConfig({
  basePath: '/studio',
  name: 'default',
  title: 'S17 Marketplace',
  projectId,
  dataset,

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
      service,

      // Đăng ký Contact Submission (Fix lỗi "not found")
      contactSubmission, 

      // Objects/Custom Types
      blockContent, 
      plan, 
    ],
  },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});