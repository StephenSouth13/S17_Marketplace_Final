import { client } from "@/sanity/lib/client";

export async function getServices(limit?: number) {
  const query = `
    *[_type == "service"] | order(_createdAt desc)${limit ? `[0...${limit}]` : ""} {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      "mainImage": { "asset": { "url": mainImage.asset->url } },
      category->{ title }
    }
  `;
  return await client.fetch(query);
}
