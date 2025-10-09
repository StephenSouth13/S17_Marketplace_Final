/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

export const dynamic = 'force-static'

export default function StudioPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Sanity Studio unavailable in this environment</h1>
      <p className="mt-4">The in-app Sanity Studio is disabled due to package compatibility issues. To access and customize content, run the Sanity Studio locally using the Sanity CLI or connect your external Studio.</p>
      <ul className="mt-4 list-disc ml-6">
        <li>Run: <code>npx sanity start</code> in the sanity/ folder</li>
        <li>Or open the hosted Studio you manage</li>
      </ul>
    </div>
  )
}
