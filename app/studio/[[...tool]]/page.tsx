// app/studio/[[...tool]]/page.tsx

export const metadata = {
  title: "Studio",
  description: "Sanity Studio for managing content",
  robots: { index: false, follow: false },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const dynamic = "force-static";

import StudioWrapper from "./StudioWrapper";

export default function StudioPage() {
  return <StudioWrapper />;
}
