// D:\Website\S17\S17_Marketplace_Final_\lib\seo-generators.ts

import { Metadata } from 'next';

// Dữ liệu mặc định của Sàn S17 MarketPlace
const BASE_URL = 'https://www.s17.org.vn';
const SITE_NAME = 'S17 MarketPlace – Nền tảng thương mại thông minh Việt Nam';
const DEFAULT_OG_IMAGE = `${BASE_URL}/logo/logo.png`; // Sử dụng ảnh OG đã định nghĩa trong layout.tsx

// --- I. Hàm Tạo JSON-LD Schema Markup ---
// Đây là hàm tạo Structured Data loại "Product" cho kết quả tìm kiếm phong phú.
export function generateProductSchema(product: {
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  currency: string;
  ratingValue?: number; // Optional
  reviewCount?: number; // Optional
}) {
  const productUrl = `${BASE_URL}/products/${product.slug}`;

  // Cấu trúc Schema.org loại Product
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description.substring(0, 500),
    image: product.imageUrl,
    url: productUrl,
    brand: {
      '@type': 'Brand',
      name: 'Thương hiệu Việt', // Cần thay thế bằng tên thương hiệu thực của sản phẩm
    },
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: product.currency, // Ví dụ: 'VND'
      price: product.price,
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock', // Hoặc OutOfStock
    },
  };

  // Thêm đánh giá nếu có
  if (product.ratingValue && product.reviewCount) {
    schema['aggregateRating'] = {
      '@type': 'AggregateRating',
      ratingValue: product.ratingValue,
      reviewCount: product.reviewCount,
    };
  }
  
  // Trả về một chuỗi JSON-LD để nhúng vào trang
  return JSON.stringify(schema);
}

// --- II. Hàm Tạo Next.js Metadata ---
// Hàm này tạo Metadata object dựa trên dữ liệu sản phẩm.
export function generateProductMetadata(product: {
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  keywords: string[];
}): Metadata {
  const productUrl = `${BASE_URL}/products/${product.slug}`;
  const truncatedDescription = product.description.substring(0, 155) + '...';

  return {
    // 1. Tiêu đề và Mô tả
    title: product.name, // Next.js sẽ tự động thêm template "| S17 MarketPlace"
    description: truncatedDescription,
    keywords: product.keywords,

    // 2. Open Graph (Chia sẻ mạng xã hội)
    openGraph: {
      title: product.name,
      description: truncatedDescription,
      url: productUrl,
      images: [
        {
          url: product.imageUrl || DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
      type: 'product',
      siteName: SITE_NAME,
    },

    // 3. Canonical URL
    alternates: {
      canonical: productUrl,
    },

    // 4. Twitter Card
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: truncatedDescription,
      images: [product.imageUrl || DEFAULT_OG_IMAGE],
      creator: "@s17vietnam", // Giữ nguyên từ layout
    }
  };
}