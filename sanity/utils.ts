import { client } from "./lib/client";
import { SERVICES_QUERY } from "./queries/query";

export async function getServices(limit?: number) {
  const result = await client.fetch(SERVICES_QUERY);
  return limit ? result.slice(0, limit) : result;
}
