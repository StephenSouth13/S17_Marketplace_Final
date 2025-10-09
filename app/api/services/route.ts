import { NextResponse } from 'next/server';
import { getServices } from '@/sanity/queries';
import { urlFor } from '@/sanity/lib/image';

export async function GET() {
  try {
    const services = await getServices();
    const mapped = (services || []).map((s: any) => ({
      id: s._id || s._id,
      slug: s.slug || s.slug,
      name: s.title || s.name,
      description: s.excerpt || "",
      category: s.category || s['category'] || s.category,
      price: s.priceRange?.min ?? 0,
      rating: s.rating ?? 4,
      image: s.mainImage ? urlFor(s.mainImage).url() : null,
      raw: s,
    }));

    return NextResponse.json({ data: mapped });
  } catch (error) {
    console.error('Error in /api/services', error);
    return NextResponse.json({ data: [], error: String(error) }, { status: 500 });
  }
}
