import { client } from "@/sanity/lib/client";
import { ServicesGrid } from "@/components/ServicesGrid";

export default async function ServicesPage() {
  const query = `
    *[_type == "service"] | order(_createdAt desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      "mainImage": { "asset": { "url": mainImage.asset->url } },
      category->{ title }
    }
  `;
  const services = await client.fetch(query);

  return <ServicesGrid services={services} />;
}
