import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import dayjs from "dayjs";
import Title from "./Title";
import { getLatestBlogs } from "@/sanity/queries";
import { urlFor } from "@/sanity/lib/image";

const LatestBlog = async () => {
  const blogs = await getLatestBlogs();

  if (!blogs?.length) return null;

  return (
    <section className="py-16 bg-gradient-to-b from-white via-green-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-green-600 uppercase tracking-wider">
            Tin tức mới nhất
          </p>
          <Title className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Cập nhật từ S17
          </Title>
          <p className="text-gray-600 mt-3 text-sm md:text-base max-w-2xl mx-auto">
            Những chia sẻ và thông tin hữu ích giúp doanh nghiệp phát triển bền vững.
          </p>
        </div>

        {/* Grid hiển thị blog */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Ảnh chính */}
              {blog.mainImage && (
                <Link href={`/blog/${blog.slug?.current}`}>
                  <div className="relative w-full h-56 overflow-hidden">
                    <Image
                      src={urlFor(blog.mainImage).url()}
                      alt={blog.title || "Blog image"}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              )}

              {/* Nội dung blog */}
              <div className="flex flex-col flex-grow p-5">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <div className="flex flex-wrap gap-2">
                    {blog.blogcategories?.map((cat, i) => (
                      <span
                        key={i}
                        className="bg-green-50 text-green-600 px-2 py-0.5 rounded-md font-medium"
                      >
                        {cat.title}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1 text-gray-400">
                    <Calendar size={14} className="text-green-600" />
                    {dayjs(blog.publishedAt).format("DD/MM/YYYY")}
                  </div>
                </div>

                <Link
                  href={`/blog/${blog.slug?.current}`}
                  className="text-base md:text-lg font-semibold text-gray-800 hover:text-green-600 transition-colors line-clamp-2"
                >
                  {blog.title}
                </Link>

                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {blog.excerpt || "Khám phá thêm trong bài viết chi tiết..."}
                </p>

                <div className="mt-auto pt-4">
                  <Link
                    href={`/blog/${blog.slug?.current}`}
                    className="inline-flex items-center text-sm font-semibold text-green-600 hover:text-green-700 transition-all"
                  >
                    Đọc thêm
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Nút CTA */}
        <div className="text-center mt-12">
          <Link href="/blog">
            <button className="px-6 py-2.5 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md transition-all">
              Xem tất cả bài viết
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestBlog;
