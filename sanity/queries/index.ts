import { sanityFetch } from "../lib/live";
// Giả định bạn có định nghĩa kiểu Category ở đâu đó, ví dụ trong "@/sanity.types"
// Tuy nhiên, để tránh lỗi nếu Category chưa được import, tôi sẽ loại bỏ nó khỏi import và dùng kiểu 'any' khi cần thiết.
// Nếu bạn có kiểu Category, bạn có thể tự thêm lại import này:
// import { Category } from "@/sanity.types"; 
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

// ĐÃ SỬA: Bỏ generic type <Category[]> trong sanityFetch để tránh lỗi 2558
const getCategories = async (quantity?: number) => {
  try {
    // Nếu có quantity, giới hạn số lượng danh mục.
    // Nếu không, lấy tất cả.
    const query = quantity
      ? `*[_type == 'category'] | order(name asc) [0...$quantity] {
          ...,
          // Đếm số lượng sản phẩm (logic đã đúng)
          "productCount": count(*[_type == "product" && references(^._id)])
        }`
      : `*[_type == 'category'] | order(name asc) {
          ...,
          "productCount": count(*[_type == "product" && references(^._id)])
        }`;
        
    // Thực hiện fetch data từ Sanity (Không dùng generic type argument)
    const { data } = await sanityFetch({
      query,
      params: quantity ? { quantity } : {},
    });
    
    // Đảm bảo data không phải là null
    return (data ?? []) as any[]; // Ép kiểu về mảng nếu cần thiết
  } catch (error) {
    console.error("Error fetching categories:", error);
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

// ĐÃ SỬA: Loại bỏ generic type và khai báo kiểu rõ ràng để fix lỗi 2558 và 7006.
const getServiceCategories = async () => {
  try {
    // Bỏ generic type trong lời gọi hàm (Fix lỗi 2558)
    const { data } = await sanityFetch({ query: SERVICE_CATEGORIES });
    
    // Ép kiểu kết quả và xử lý mảng
    const rawCategories = (data ?? []) as { title?: string | null }[];

    // Khai báo kiểu rõ ràng cho item và title trong map/filter (Fix lỗi 7006)
    const categoryTitles: string[] = rawCategories
      .map((item): string => { // Khai báo kiểu item và kiểu trả về là string
        return (item && typeof item.title === 'string') ? item.title : '';
      })
      .filter((title: string) => title.trim().length > 0); // Khai báo kiểu title và lọc chuỗi rỗng
      
    return categoryTitles;
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
