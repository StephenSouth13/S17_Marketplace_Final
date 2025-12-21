// sanity/lib/client.ts
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

const token =
  process.env.SANITY_API_READ_TOKEN ||
  process.env.SANITY_API_TOKEN ||
  process.env.NEXT_PUBLIC_SANITY_TOKEN

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Để false để luôn lấy data mới nhất khi bạn vừa sửa ở Studio
  token,         
  perspective: 'published', // ✅ Cực kỳ quan trọng để không lấy nhầm bản Draft chưa sửa
})