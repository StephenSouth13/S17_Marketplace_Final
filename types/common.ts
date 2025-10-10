import { Category } from "@/sanity.types";

/**
 * Kiểu Category đã mở rộng, bao gồm trường 'productCount' được tính toán trong truy vấn Sanity.
 */
export interface ExtendedCategory extends Category {
    // Thêm trường productCount, đây là kết quả của lệnh count() trong Sanity query
    productCount: number; 
}

// Export các kiểu khác (nếu có)
