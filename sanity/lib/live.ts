// Minimal sanityFetch implementation using the existing client
// This avoids relying on next-sanity/live which isn't available in the installed package.
import { client } from './client'

export const sanityFetch = async ({ query, params = {} }: { query: string; params?: any }) => {
  const data = await client.fetch(query, params)
  return { data }
}

// SanityLive is not required by this app; export a no-op component so imports remain valid
export const SanityLive = () => null
