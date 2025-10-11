// Nhập các tiện ích và thành phần cần thiết
import Container from "@/components/Container";
import Title from "@/components/Title";
// Import các kiểu dữ liệu từ Sanity.types
import { SINGLE_BLOG_QUERYResult, OTHERS_BLOG_QUERYResult, BLOG_CATEGORIESResult, Slug } from "@/sanity.types"; 
import { urlFor } from "@/sanity/lib/image";
import {
  getBlogCategories,
  getOthersBlog,
  getSingleBlog,
} from "@/sanity/queries";
import dayjs from "dayjs";
import { Calendar, ChevronLeftIcon, Pencil } from "lucide-react";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

// Định nghĩa lại kiểu Blog mở rộng để chứa các trường cần thiết trong sidebar
// Giả định OTHERS_BLOG_QUERYResult thiếu publishedAt
type Blog = OTHERS_BLOG_QUERYResult[number] & {
    publishedAt: string | null | undefined;
};

// Component Trang Chi Tiết Blog
const SingleBlogPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const blogResult = await getSingleBlog(slug);
  // Ép kiểu cho blog (đảm bảo nó là SINGLE_BLOG_QUERYResult hoặc null)
  const blog: SINGLE_BLOG_QUERYResult | null = (Array.isArray(blogResult) ? blogResult[0] : blogResult) as (SINGLE_BLOG_QUERYResult | null);

  if (!blog) return notFound(); // Nếu không tìm thấy blog, chuyển hướng đến trang 404

  return (
    <div className="py-10">
      {/* KHỐI CONTAINER CHÍNH */}
      <Container className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        
        {/* KHỐI NỘI DUNG CHÍNH (3/4 Chiều rộng) */}
        <div className="lg:col-span-3">
          {blog?.mainImage && (
            <Image
              src={urlFor(blog?.mainImage).url()}
              alt={blog.title || "Ảnh Blog"}
              width={1200}
              height={600}
              className="w-full max-h-[500px] object-cover rounded-lg"
            />
          )}
          
          <div className="mt-5">
            {/* Tiêu đề chính */}
            <h2 className="text-3xl font-bold mb-4 text-gray-900">{blog?.title}</h2> 
            
            {/* Metadata (Danh mục, Tác giả, Ngày tháng) */}
            <div className="text-sm flex items-center gap-5 border-b border-gray-100 pb-4 mb-8">
              {/* Category */}
              <div className="flex items-center relative group cursor-pointer">
                {blog?.blogcategories?.map(
                  (item: { title: string | null | undefined }, index: number) => (
                    <p
                      key={index}
                      className="font-semibold text-shop_dark_green tracking-wider uppercase"
                    >
                      {item?.title}
                    </p>
                  )
                )}
              </div>
              {/* Author */}
              <p className="flex items-center gap-1 text-gray-500 relative group hover:cursor-pointer hover:text-shop_dark_green transition-colors">
                <Pencil size={15} /> {blog?.author?.name || "Tác giả ẩn danh"}
              </p>
              {/* Date */}
              <p className="flex items-center gap-1 text-gray-500 relative group hover:cursor-pointer hover:text-shop_dark_green transition-colors">
                <Calendar size={15} />{" "}
                {blog.publishedAt ? dayjs(blog.publishedAt).format("MMMM D, YYYY") : 'Chưa xuất bản'}
              </p>
            </div>

            {/* Nội dung Bài viết (Portable Text) */}
            <div className="flex flex-col">
              <div className="text-darkColor">
                <div>
                  {blog.body && (
                    <PortableText
                      value={blog.body}
                      components={{
                        // Định kiểu cho các khối (Block)
                        block: {
                          normal: ({ children }) => (
                            <p className="my-5 text-base/8 first:mt-0 last:mb-0 text-gray-700">
                              {children}
                            </p>
                          ),
                          h2: ({ children }) => (
                            <h2 className="my-5 text-2xl/8 font-bold tracking-tight text-gray-950 first:mt-0 last:mb-0">
                              {children}
                            </h2>
                          ),
                          h3: ({ children }) => (
                            <h3 className="my-5 text-xl/8 font-bold tracking-tight text-gray-950 first:mt-0 last:mb-0">
                              {children}
                            </h3>
                          ),
                          blockquote: ({ children }) => (
                            <blockquote className="my-5 border-l-4 border-l-shop_dark_green pl-6 text-base/8 text-gray-700 first:mt-0 last:mb-0 italic">
                              {children}
                            </blockquote>
                          ),
                        },
                        // Định kiểu cho các loại (Type) khác
                        types: {
                          image: ({ value }) => (
                            <Image
                              alt={value.alt || "Hình ảnh nội dung"}
                              src={urlFor(value).width(2000).url()}
                              className="w-full rounded-2xl my-5"
                              width={1400}
                              height={1000}
                            />
                          ),
                          separator: ({ value }) => {
                            switch (value.style) {
                              case "line":
                                return (
                                  <hr className="my-5 border-t border-gray-200" />
                                );
                              case "space":
                                return <div className="my-5" />;
                              default:
                                return null;
                            }
                          },
                        },
                        // Định kiểu cho Danh sách (List)
                        list: {
                          bullet: ({ children }) => (
                            <ul className="list-disc pl-4 text-base/8 marker:text-shop_dark_green text-gray-700">
                              {children}
                            </ul>
                          ),
                          number: ({ children }) => (
                            <ol className="list-decimal pl-4 text-base/8 marker:text-shop_dark_green text-gray-700">
                              {children}
                            </ol>
                          ),
                        },
                        // Định kiểu cho Mục danh sách (ListItem)
                        listItem: {
                          bullet: ({ children }) => {
                            return (
                              <li className="my-2 pl-2 has-[br]:mb-8">
                                {children}
                              </li>
                            );
                          },
                          number: ({ children }) => {
                            return (
                              <li className="my-2 pl-2 has-[br]:mb-8">
                                {children}
                              </li>
                            );
                          },
                        },
                        // Định kiểu cho Đánh dấu (Marks)
                        marks: {
                          strong: ({ children }) => (
                            <strong className="font-semibold text-gray-950">
                              {children}
                            </strong>
                          ),
                          code: ({ children }) => (
                            <>
                              <span aria-hidden>`</span>
                              <code className="text-[15px]/8 font-semibold text-gray-950 bg-gray-100 px-1 rounded">
                                {children}
                              </code>
                              <span aria-hidden>`</span>
                            </>
                          ),
                          link: ({ value, children }) => {
                            return (
                              <Link
                                href={value.href}
                                className="font-medium text-shop_dark_green underline decoration-shop_dark_green/50 underline-offset-4 data-[hover]:decoration-shop_dark_green"
                              >
                                {children}
                              </Link>
                            );
                          },
                        },
                      }}
                    />
                  )}
                    
                  {/* Liên kết Quay lại Blog */}
                  <div className="mt-10">
                    <Link href="/blog" className="flex items-center gap-1 text-gray-600 hover:text-shop_dark_green transition-colors">
                      <ChevronLeftIcon className="size-5" />
                      <span className="text-sm font-semibold">
                        Quay lại trang Blog
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* KHỐI SIDEBAR (1/4 Chiều rộng) */}
        <BlogLeft slug={slug} />
      </Container>
    </div>
  );
};

// --- Component BlogLeft (Sidebar) ---

const BlogLeft = async ({ slug }: { slug: string }) => {
  // Giả định getBlogCategories trả về cấu trúc phù hợp
  const categories: BLOG_CATEGORIESResult = (await getBlogCategories()) || []; 
  // Lấy các bài viết khác, đã sử dụng Blog type để tránh lỗi
  const blogs: Blog[] = (await getOthersBlog(slug, 5)) as Blog[] || [];

  return (
    <div className="lg:col-span-1">
      
      {/* 1. Khu vực Danh mục Blog */}
      <div className="border border-gray-200 p-5 rounded-md min-w-[200px]">
        <Title className="text-lg font-bold text-gray-900 mb-4 uppercase border-b border-gray-200 pb-2">
            Danh mục Blog
        </Title>
        <div className="space-y-1">
          {categories?.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-sm font-medium py-2 border-b border-gray-100 last:border-b-0 last:pb-0"
            >
              <p className="text-gray-700 hover:text-shop_dark_green transition-colors cursor-pointer">
                {/* Giả định blogcategories là mảng, lấy phần tử đầu tiên */}
                {item.blogcategories?.[0]?.title}
              </p>
              <p className="text-gray-500 text-xs font-normal">
                {/* Đây là số lượng bài viết - giữ nguyên giá trị giả định */}
                {`(1)`} 
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Khu vực Bài Viết Liên Quan Khác */}
      {blogs.length > 0 && (
        <div className="border border-gray-200 p-5 rounded-md mt-10">
          <Title className="text-lg font-bold text-gray-900 mb-4 uppercase border-b border-gray-200 pb-2">
            Bài Viết Liên Quan Khác
          </Title>
          <div className="space-y-4 pt-2">
            {blogs.map((blog: Blog, index: number) => (
              <Link
                href={`/blog/${blog?.slug?.current}`}
                key={index}
                className="flex items-start gap-3 group border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
              >
                {blog?.mainImage && (
                  <Image
                    src={urlFor(blog?.mainImage).url()}
                    alt={blog?.title || "Ảnh blog"}
                    width={80}
                    height={80}
                    className="w-20 h-20 flex-shrink-0 object-cover rounded-md group-hover:opacity-75 transition-opacity"
                  />
                )}
                <div className="flex flex-col">
                  <p className="line-clamp-2 text-sm text-gray-800 font-medium group-hover:text-shop_dark_green transition-colors">
                    {blog?.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {/* Sử dụng publishedAt với kiểm tra an toàn */}
                    {blog.publishedAt ? dayjs(blog.publishedAt).format("MMMM D, YYYY") : 'N/A'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleBlogPage;