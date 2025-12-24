// D:\Website\S17\S17_Marketplace_Final_\app\(client)\blog\page.tsx
import Container from "@/components/Container";
import Title from "@/components/Title";
import { urlFor } from "@/sanity/lib/image";
import { getAllBlogs } from "@/sanity/queries";
import dayjs from "dayjs";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// Định nghĩa kiểu dữ liệu blog
interface Blog {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  mainImage?: any;
  blogcategories?: { title: string }[];
}

// Component Trang Blog
const BlogPage = async () => {
  const blogs: Blog[] = await getAllBlogs(6);

  return (
    <div className="bg-gradient-to-b from-white via-gray-50 to-gray-100">
      <Container className="py-10">
        <div className="text-center mb-10">
          <Title>Trang Blog</Title>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Nơi chia sẻ kiến thức, tin tức và xu hướng mới nhất.
          </p>
        </div>

        {/* Lưới hiển thị blog */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs?.map((blog) => (
            <Link
              href={`/blog/${blog.slug.current}`}
              key={blog._id}
              className="group rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
            >
              {/* Hình ảnh */}
              {blog.mainImage && (
                <div className="relative overflow-hidden">
                  <Image
                    src={urlFor(blog.mainImage).width(600).height(400).url()}
                    alt={blog.title}
                    width={600}
                    height={400}
                    className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              )}

              {/* Nội dung */}
              <div className="p-5">
                {/* Danh mục + ngày tháng */}
                <div className="flex items-center gap-4 text-xs mb-3 text-gray-500">
                  {blog.blogcategories?.map((item, index) => (
                    <span
                      key={index}
                      className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full"
                    >
                      {item.title}
                    </span>
                  ))}
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {dayjs(blog.publishedAt).format("DD/MM/YYYY")}
                  </span>
                </div>

                {/* Tiêu đề */}
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-emerald-600 line-clamp-2 transition-colors">
                  {blog.title}
                </h3>

                {/* Nút đọc thêm */}
                <div className="mt-4">
                  <span className="inline-flex items-center text-sm font-medium text-emerald-600 group-hover:translate-x-1 transition-transform">
                    Đọc thêm →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default BlogPage;
