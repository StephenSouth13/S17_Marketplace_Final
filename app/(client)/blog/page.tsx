// Nhập các tiện ích và thành phần cần thiết
import Container from "@/components/Container"; // Nhập component Container
import Title from "@/components/Title"; // Nhập component Tiêu đề
import { urlFor } from "@/sanity/lib/image"; // Hàm tạo URL hình ảnh từ Sanity
import { getAllBlogs } from "@/sanity/queries"; // Hàm truy vấn lấy tất cả bài viết blog
import dayjs from "dayjs"; // Thư viện xử lý ngày tháng
import { Calendar } from "lucide-react"; // Biểu tượng Lịch
import Image from "next/image"; // Component Hình ảnh từ Next.js
import Link from "next/link"; // Component Liên kết từ Next.js
import React from "react";

// Định nghĩa giao diện/kiểu cho bài viết blog
interface Blog {
  _id: string;
  title: string; // Tiêu đề bài viết
  slug: { current: string }; // Slug (đường dẫn thân thiện)
  publishedAt: string; // Ngày xuất bản
  mainImage?: any; // Hình ảnh chính
  blogcategories?: { title: string }[]; // Danh mục của blog
}

// Component Trang Blog (Sử dụng Async Component)
const BlogPage = async () => {
  // Lấy 6 bài viết blog mới nhất
  const blogs: Blog[] = await getAllBlogs(6);

  return (
    <div>
      <Container>
        <Title>Trang Blog</Title>
        {/* Lưới hiển thị các bài viết blog */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 md:mt-10">
          {blogs?.map((blog: Blog) => (
            <div key={blog._id} className="rounded-md overflow-hidden group">
              {/* Khu vực Hình ảnh chính */}
              {blog.mainImage && (
                <Image
                  src={urlFor(blog.mainImage).url()} // Lấy URL hình ảnh
                  alt="Ảnh blog"
                  width={500}
                  height={500}
                  className="w-full max-h-80 object-cover"
                />
              )}
              {/* Khu vực Nội dung bài viết */}
              <div className="bg-gray-100 p-5">
                {/* Khu vực Danh mục và Ngày tháng */}
                <div className="text-xs flex items-center gap-5">
                  {/* Danh mục Blog */}
                  <div className="flex items-center relative group cursor-pointer">
                    {blog.blogcategories?.map(
                      (item: { title: string }, index: number) => (
                        <p
                          key={index}
                          className="font-semibold text-shop_dark_green tracking-wider"
                        >
                          {item.title}
                        </p>
                      )
                    )}
                    {/* Hiệu ứng gạch chân khi hover */}
                    <span className="absolute left-0 -bottom-1.5 bg-lightColor/30 inline-block w-full h-[2px] group-hover:bg-shop_dark_green hover:cursor-pointer hoverEffect" />
                  </div>
                  {/* Ngày xuất bản */}
                  <p className="flex items-center gap-1 text-lightColor relative group hover:cursor-pointer hover:text-shop_dark_green hoverEffect">
                    <Calendar size={15} /> {/* Biểu tượng Lịch */}
                    {/* Định dạng ngày tháng (Ví dụ: Tháng 5 15, 2024) */}
                    {dayjs(blog.publishedAt).format("MMMM D, YYYY")}
                    {/* Hiệu ứng gạch chân khi hover */}
                    <span className="absolute left-0 -bottom-1.5 bg-lightColor/30 inline-block w-full h-[2px] group-hover:bg-shop_dark_green hoverEffect" />
                  </p>
                </div>
                {/* Tiêu đề bài viết và Liên kết */}
                <Link
                  href={`/blog/${blog.slug.current}`} // Đường dẫn chi tiết bài viết
                  className="text-base font-bold tracking-wide mt-5 line-clamp-2 hover:text-shop_dark_green hoverEffect"
                >
                  {blog.title}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

// Xuất component
export default BlogPage;