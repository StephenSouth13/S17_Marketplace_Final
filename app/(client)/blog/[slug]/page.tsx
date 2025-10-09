import Container from "@/components/Container";
import Title from "@/components/Title";
import { SINGLE_BLOG_QUERYResult, OTHERS_BLOG_QUERYResult, BLOG_CATEGORIESResult } from "@/sanity.types"; 
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

// Định nghĩa lại kiểu Blog (OtherBlog)
type Blog = OTHERS_BLOG_QUERYResult[number];


const SingleBlogPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  
  const blogResult = await getSingleBlog(slug);
  const blog: SINGLE_BLOG_QUERYResult | null = (Array.isArray(blogResult) ? blogResult[0] : blogResult) as (SINGLE_BLOG_QUERYResult | null);

  if (!blog) return notFound();

  return (
    <div className="py-10">
      {/* KHỐI CONTAINER CHÍNH - Đảm bảo Grid hoạt động */}
      <Container className="grid grid-cols-1 lg:grid-cols-4 gap-10"> {/* Tăng gap lên 10 để dễ thấy */}
        
        {/* KHỐI NỘI DUNG CHÍNH (3/4 Chiều rộng) */}
        <div className="lg:col-span-3">
          {blog?.mainImage && (
            <Image
              src={urlFor(blog?.mainImage).url()}
              alt={blog.title || "Blog Image"}
              width={1200} // Tăng width để ảnh lớn hơn
              height={600} // Tăng height
              className="w-full max-h-[500px] object-cover rounded-lg"
            />
          )}
          
          <div className="mt-5">
            {/* Tiêu đề chính */}
            <h2 className="text-3xl font-bold mb-4 text-gray-900">{blog?.title}</h2> 
            
            {/* Metadata section - CHỈNH LẠI VỊ TRÍ để nằm sau tiêu đề, không bị trôi */}
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
                <Pencil size={15} /> {blog?.author?.name}
              </p>
              {/* Date */}
              <p className="flex items-center gap-1 text-gray-500 relative group hover:cursor-pointer hover:text-shop_dark_green transition-colors">
                <Calendar size={15} />{" "}
                {blog.publishedAt ? dayjs(blog.publishedAt).format("MMMM D, YYYY") : 'N/A'}
              </p>
            </div>

            {/* Content Body */}
            <div className="flex flex-col">
              <div className="text-darkColor">
                <div>
                  {blog.body && (
                    <PortableText
                      value={blog.body}
                      components={{
                        // ... (Giữ nguyên components styling) ...
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
                        types: {
                            image: ({ value }) => (
                                <Image
                                    alt={value.alt || ""}
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
                    
                    {/* Back to blog link */}
                  <div className="mt-10">
                    <Link href="/blog" className="flex items-center gap-1 text-gray-600 hover:text-shop_dark_green transition-colors">
                      <ChevronLeftIcon className="size-5" />
                      <span className="text-sm font-semibold">
                        Back to blog
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

// --- Component BlogLeft (Sidebar) đã được học theo giao diện mẫu ---

const BlogLeft = async ({ slug }: { slug: string }) => {
  const categories: BLOG_CATEGORIESResult = (await getBlogCategories()) || [];
  const blogs: OTHERS_BLOG_QUERYResult = (await getOthersBlog(slug, 5)) || [];

  return (
    <div className="lg:col-span-1"> {/* Đảm bảo nó luôn chiếm 1 cột */}
      {/* 1. Blog Categories Section - Fix lỗi hiển thị nội dung bị co */}
      <div className="border border-gray-200 p-5 rounded-md min-w-[200px]"> {/* Thêm min-w để tránh co lại */}
        <Title className="text-lg font-bold text-gray-900 mb-4 uppercase border-b border-gray-200 pb-2">
            Blog Categories
        </Title>
        <div className="space-y-1">
          {categories?.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-sm font-medium py-2 border-b border-gray-100 last:border-b-0"
            >
              <p className="text-gray-700 hover:text-shop_dark_green transition-colors cursor-pointer">
                {item.blogcategories?.[0]?.title}
              </p>
              <p className="text-gray-500 text-xs font-normal">
                {/* Đây là số lượng bài viết - giả định là (1) */}
                {`(1)`} 
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Bài Viết Liên Quan Khác Section */}
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
                    alt={blog?.title || "blogImage"}
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
