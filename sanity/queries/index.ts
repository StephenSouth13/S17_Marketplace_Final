import { sanityFetch } from "../lib/live";
import {
  BLOG_CATEGORIES,
  BRAND_QUERY,
  BRANDS_QUERY,
  DEAL_PRODUCTS,
  GET_ALL_BLOG,
  LATEST_BLOG_QUERY,
  MY_ORDERS_QUERY,
  OTHERS_BLOG_QUERY,
  PRODUCT_BY_SLUG_QUERY,
  SINGLE_BLOG_QUERY,
  SERVICES_QUERY,
  SERVICE_BY_SLUG_QUERY,
  SERVICE_CATEGORIES,
} from "./query";

const getCategories = async (quantity?: number) => {
  try {
    const query = quantity
      ? `*[_type == 'category'] | order(name asc) [0...$quantity] {
          ...,
          "productCount": count(*[_type == "product" && references(^._id)])
        }`
      : `*[_type == 'category'] | order(name asc) {
          ...,
          "productCount": count(*[_type == "product" && references(^._id)])
        }`;
    const { data } = await sanityFetch({
      query,
      params: quantity ? { quantity } : {},
    });
    return data;
  } catch (error) {
    console.log("Error fetching categories", error);
    return [];
  }
};

const getAllBrands = async () => {
  try {
    const { data } = await sanityFetch({ query: BRANDS_QUERY });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching all brands:", error);
    return [];
  }
};

const getLatestBlogs = async () => {
  try {
    const { data } = await sanityFetch({ query: LATEST_BLOG_QUERY });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching latest Blogs:", error);
    return [];
  }
};

const getDealProducts = async () => {
  try {
    const { data } = await sanityFetch({ query: DEAL_PRODUCTS });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching deal Products:", error);
    return [];
  }
};

const getProductBySlug = async (slug: string) => {
  try {
    const product = await sanityFetch({
      query: PRODUCT_BY_SLUG_QUERY,
      params: {
        slug,
      },
    });
    return product?.data || null;
  } catch (error) {
    // Sửa tại đây: In chi tiết lỗi hơn
    console.error("Error fetching product by slug:", error);
    if (error instanceof Error) {
        console.error("Error message:", error.message);
    } else {
        // Dùng JSON.stringify để hiển thị nội dung nếu không phải là Error object tiêu chuẩn
        console.error("Full error object:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
    }
    return null;
  }
};
const getBrand = async (slug: string) => {
  try {
    const product = await sanityFetch({
      query: BRAND_QUERY,
      params: {
        slug,
      },
    });
    return product?.data || null;
  } catch (error) {
    // Sửa tại đây: In chi tiết lỗi hơn
    console.error("Error fetching brand by slug:", error); // Đổi ID thành slug cho rõ ràng
    if (error instanceof Error) {
        console.error("Error message:", error.message);
    } else {
        console.error("Full error object:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
    }
    return null;
  }
};
const getMyOrders = async (userId: string) => {
  try {
    // ...
  } catch (error) {
    // Sửa tại đây
    console.error("Error fetching user orders:", error); 
    if (error instanceof Error) {
        console.error("Error message:", error.message);
    } else {
        console.error("Full error object:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
    }
    return null;
  }
};

const getAllBlogs = async (quantity: number) => {
  try {
    const { data } = await sanityFetch({
      query: GET_ALL_BLOG,
      params: { quantity },
    });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching all brands:", error);
    return [];
  }
};

const getSingleBlog = async (slug: string) => {
  try {
    const { data } = await sanityFetch({
      query: SINGLE_BLOG_QUERY,
      params: { slug },
    });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching single blog:", error);
    return [];
  }
};

const getBlogCategories = async () => {
  try {
    const { data } = await sanityFetch({
      query: BLOG_CATEGORIES,
    });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching blog categories:", error);
    return [];
  }
};

const getOthersBlog = async (slug: string, quantity: number) => {
  try {
    const { data } = await sanityFetch({
      query: OTHERS_BLOG_QUERY,
      params: { slug, quantity },
    });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching other blogs:", error);
    return [];
  }
};

// Services helpers
// HÀM getServices BỊ THIẾU ĐÃ ĐƯỢC THÊM VÀO ĐÂY
const getServices = async () => {
  try {
    const { data } = await sanityFetch({ query: SERVICES_QUERY });
    return data ?? [];
  } catch (error) {
    console.error("Error fetching all services:", error);
    return [];
  }
};

const getServiceBySlug = async (slug: string) => {
  try {
    const { data } = await sanityFetch({ query: SERVICE_BY_SLUG_QUERY, params: { slug } });
    return data ?? null;
  } catch (error) {
    console.error("Error fetching service by slug:", error);
    return null;
  }
};

const getServiceCategories = async () => {
  try {
    const { data } = await sanityFetch({ query: SERVICE_CATEGORIES });
    return data ?? [];
  } catch (error) {
    console.error("Error fetching service categories:", error);
    return [];
  }
};

export {
  getCategories,
  getAllBrands,
  getLatestBlogs,
  getDealProducts,
  getProductBySlug,
  getBrand,
  getMyOrders,
  getAllBlogs,
  getSingleBlog,
  getBlogCategories,
  getOthersBlog,
  // Đã thêm export hàm getServices
  getServices, 
  getServiceBySlug,
  getServiceCategories,
};