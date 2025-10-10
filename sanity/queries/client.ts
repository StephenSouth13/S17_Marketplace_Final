import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-10-01',
  useCdn: !process.env.SANITY_API_READ_TOKEN, // nếu có token => không dùng CDN
  token:
    process.env.SANITY_API_READ_TOKEN ||
    process.env.SANITY_API_TOKEN ||
    process.env.NEXT_PUBLIC_SANITY_TOKEN,
})
