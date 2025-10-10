import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId,} from "../env";

const token = process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN || process.env.NEXT_PUBLIC_SANITY_TOKEN
console.log("🧩 SANITY TOKEN EXISTS:", !!( process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN || process.env.NEXT_PUBLIC_SANITY_TOKEN ));
export const backendClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
  perspective: 'published',
});
