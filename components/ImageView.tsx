"use client";
import {
  internalGroqTypeReferenceTo,
  SanityImageCrop,
  SanityImageHotspot,
} from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import React, { useState } from "react";

interface Props {
  images?: Array<{
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
    _key: string;
  }>;
  isStock?: number | undefined;
}

const ImageView = ({ images = [], isStock }: Props) => {
  const [active, setActive] = useState(images[0]);

  if (!images.length) return null;

  return (
    <div className="w-full md:w-1/2 space-y-4">
      {/* Ảnh chính */}
      <div className="relative group rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-gradient-to-br from-white via-gray-50 to-gray-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={active?._key}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <Image
              src={urlFor(active).width(800).height(800).url()}
              alt="productImage"
              width={800}
              height={800}
              priority
              className={`w-full h-[480px] md:h-[540px] object-contain transition-transform duration-700 ease-out group-hover:scale-105 ${
                isStock === 0 ? "opacity-50 grayscale" : ""
              }`}
            />
            {/* Overlay Hết hàng */}
            {isStock === 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                <p className="text-white text-lg font-semibold tracking-wide uppercase">
                  Hết hàng
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Hiệu ứng ánh sáng hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-tr from-white/10 via-transparent to-white/20" />
      </div>

      {/* Thumbnail */}
      <div className="grid grid-cols-6 gap-2">
        {images.map((image) => {
          const isActive = active?._key === image._key;
          return (
            <motion.button
              key={image._key}
              whileHover={{ scale: 1.05 }}
              onClick={() => setActive(image)}
              className={`relative overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                isActive
                  ? "border-emerald-500 shadow-md"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Image
                src={urlFor(image).width(150).height(150).url()}
                alt={`Thumbnail ${image._key}`}
                width={100}
                height={100}
                className="w-full h-20 md:h-24 object-contain bg-white rounded-md"
              />
              {isActive && (
                <div className="absolute inset-0 ring-2 ring-emerald-400/70 rounded-lg pointer-events-none" />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default ImageView;
