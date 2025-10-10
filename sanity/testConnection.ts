import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
});

export async function testSanity() {
  const data = await client.fetch(`*[_type == "product"][0...1]{_id, title}`);
  console.log("✅ Kết nối Sanity thành công:", data);
}
