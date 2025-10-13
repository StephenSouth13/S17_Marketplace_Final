"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface Service {
  _id: string;
  title: string;
  slug?: string;
  excerpt?: string;
  priceRange?: string;
  mainImage?: { asset?: { url?: string } };
  category?: { title?: string };
}

export const ServiceCard = ({ service }: { service: Service }) => {
  const { title, slug, mainImage, excerpt, category, priceRange } = service;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
    >
      <Link href={`/services/${slug}`} className="block relative">
        <div className="relative w-full h-56 bg-gray-50 overflow-hidden">
          <Image
            src={mainImage?.asset?.url || "/placeholder.png"}
            alt={title}
            width={500}
            height={400}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </Link>

      <div className="p-5 flex flex-col gap-3">
        <h3 className="font-semibold text-gray-900 text-base md:text-lg line-clamp-2 group-hover:text-green-600 transition-colors">
          {title}
        </h3>

        {category?.title && (
          <span className="text-xs text-gray-500 font-medium">
            {category.title}
          </span>
        )}

        {excerpt && (
          <p className="text-gray-600 text-sm line-clamp-3">{excerpt}</p>
        )}

        {priceRange && (
          <p className="text-green-600 font-semibold text-sm">
            {priceRange}
          </p>
        )}

        <div className="mt-auto pt-3">
          <Link href={`/services/${slug}`}>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full border-green-500 text-green-600 hover:bg-green-600 hover:text-white transition-all"
            >
              Xem chi tiết
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
