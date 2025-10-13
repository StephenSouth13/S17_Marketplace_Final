"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Title from "@/components/Title";

interface Service {
  _id: string;
  title: string;
  slug?: string;
  excerpt?: string;
  mainImage?: { asset?: { url?: string } };
  category?: { title?: string };
}

export const OurServices = ({ services }: { services: Service[] }) => {
  if (!services?.length) return null;

  return (
    <section className="py-16 bg-gradient-to-b from-white via-green-50/40 to-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-green-600 uppercase">
            Dịch vụ nổi bật
          </p>
          <Title className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Giải pháp chuyên nghiệp từ S17
          </Title>
          <p className="text-gray-600 mt-3 text-sm md:text-base max-w-2xl mx-auto">
            Các dịch vụ được lựa chọn nhiều nhất giúp doanh nghiệp phát triển bền vững.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {services.map((svc, idx) => (
            <motion.div
              key={svc._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <Link href={`/services/${svc.slug}`} className="block relative">
                <Image
                  src={svc.mainImage?.asset?.url || "/placeholder.png"}
                  alt={svc.title}
                  width={500}
                  height={400}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-sm md:text-base line-clamp-2 group-hover:text-green-600 transition-colors">
                  {svc.title}
                </h3>
                {svc.excerpt && (
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {svc.excerpt}
                  </p>
                )}
                <Link href={`/services/${svc.slug}`}>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-3 rounded-full border-green-500 text-green-600 hover:bg-green-600 hover:text-white transition-all"
                  >
                    Xem chi tiết
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link href="/services">
            <Button className="rounded-full bg-green-600 hover:bg-green-700 text-white px-6 py-2 font-semibold shadow-md">
              Xem tất cả dịch vụ
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
