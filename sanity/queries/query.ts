// ==========================
// 🧩 PRODUCT & BRAND QUERIES
// ==========================
const BRANDS_QUERY = `*[_type == "brand"] | order(name asc)`;

const DEAL_PRODUCTS = `*[_type == "product" && status == "hot"] | order(name asc){
  ...,
  "categories": categories[]->title
}`;

const PRODUCT_BY_SLUG_QUERY = `*[_type == "product" && slug.current == $slug][0]{
  ...,
  "brandName": brand->title
}`;

const BRAND_QUERY = `*[_type == "brand" && slug.current == $slug][0]{
  title,
  description,
  "products": *[_type == "product" && references(^._id)]{
    title,
    slug,
    mainImage
  }
}`;

// ==========================
// 🧩 BLOG QUERIES
// ==========================
const LATEST_BLOG_QUERY = `
  *[_type == "blog" && isLatest == true] | order(publishedAt desc){
    ...,
    blogcategories[]->{
      title
    }
  }
`;

const GET_ALL_BLOG = `
  *[_type == "blog"] | order(publishedAt desc)[0...$quantity]{
    ...,
    blogcategories[]->{
      title
    }
  }
`;

const SINGLE_BLOG_QUERY = `
  *[_type == "blog" && slug.current == $slug][0]{
    ...,
    author->{
      name,
      image
    },
    blogcategories[]->{
      title,
      "slug": slug.current
    }
  }
`;

const BLOG_CATEGORIES = `
  *[_type == "blogCategory"] | order(title asc){
    ...,
    "slug": slug.current
  }
`;

const OTHERS_BLOG_QUERY = `
  *[
    _type == "blog" &&
    defined(slug.current) &&
    slug.current != $slug
  ] | order(publishedAt desc)[0...$quantity]{
    ...,
    publishedAt,
    title,
    mainImage,
    slug,
    author->{
      name,
      image
    },
    blogcategories[]->{
      title,
      "slug": slug.current
    }
  }
`;

// ==========================
// 🧩 ORDER QUERIES
// ==========================
const MY_ORDERS_QUERY = `
  *[_type == "order" && clerkUserId == $userId] | order(orderDate desc){
    ...,
    products[]{
      ...,
      product->
    }
  }
`;

// ==========================
// 🧩 SERVICES QUERIES
// ==========================

// ✅ Dịch vụ nổi bật (hiển thị ở trang chủ)
const SERVICES_QUERY = `
  *[_type == "service" && isFeatured == true] | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    excerpt,
    mainImage,
    "categoryTitle": category->title,
    "categorySlug": category->slug.current,
    isFeatured,
    publishedAt,
    pricingModel,
    priceRange,
    plans[]{
      name,
      price,
      features,
      isPopular
    }
  }
`;

// ✅ Lấy chi tiết 1 dịch vụ theo slug
const SERVICE_BY_SLUG_QUERY = `
  *[_type == "service" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    mainImage,
    body,
    publishedAt,
    "category": category->{title, "slug": slug.current},
    pricingModel,
    priceRange,
    plans[]{
      name,
      price,
      features,
      isPopular
    }
  }
`;

// ✅ Danh mục dịch vụ
const SERVICE_CATEGORIES = `
  *[_type == "serviceCategory"] | order(title asc){
    ...,
    "slug": slug.current
  }
`;

// ==========================
// ✅ EXPORT
// ==========================
export {
  BRANDS_QUERY,
  DEAL_PRODUCTS,
  PRODUCT_BY_SLUG_QUERY,
  BRAND_QUERY,
  LATEST_BLOG_QUERY,
  GET_ALL_BLOG,
  SINGLE_BLOG_QUERY,
  BLOG_CATEGORIES,
  OTHERS_BLOG_QUERY,
  MY_ORDERS_QUERY,
  SERVICES_QUERY,
  SERVICE_BY_SLUG_QUERY,
  SERVICE_CATEGORIES,
};
