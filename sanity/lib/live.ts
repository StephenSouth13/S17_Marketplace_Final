// Lightweight compatibility layer for next-sanity live APIs
// The project previously used `defineLive` from `next-sanity/live` which
// may not be available in the installed version. Provide a small wrapper
// around the existing client.fetch API so the rest of the codebase can
// continue to call `sanityFetch({ query, params })` and optionally import
// `SanityLive` (noop) without crashing.
import React from 'react';
import { client } from './client';

export const sanityFetch = async ({ query, params }: { query: string; params?: Record<string, any> }) => {
  const data = await client.fetch(query, params);
  return { data };
};

// No-op SanityLive component for compatibility with older code that
// expects a component to be rendered. This does nothing but preserves
// imports and avoids runtime errors.
export const SanityLive = (props: { children?: React.ReactNode }) => {
  return React.createElement(React.Fragment, null, props.children);
};
