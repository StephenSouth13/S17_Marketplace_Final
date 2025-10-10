// sanity/typings/next-sanity.d.ts (CẬP NHẬT)

declare module 'next-sanity' {
  import { SanityClient } from 'sanity';
  export function createClient(config: any): SanityClient;
  export const groq: any;
  export const createImageUrlBuilder: any;
}

// THÊM KHAI BÁO NÀY ĐỂ GIẢI QUYẾT LỖI 7016
declare module 'next-sanity/studio' {
  export const NextStudio: any;
  export const viewport: any;
  export const metadata: any;
}