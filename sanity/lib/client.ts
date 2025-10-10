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
  useCdn: false, // ❌ Bắt buộc tắt CDN để đảm bảo fetch được data private
  token,         // ✅ Quan trọng: cần token có quyền read
  perspective: 'published', // ✅ Chỉ lấy nội dung đã publish
})
