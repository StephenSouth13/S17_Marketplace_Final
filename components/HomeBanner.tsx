
"use client";

import React, { useState, useEffect } from "react";
import { Title } from "./ui/text";
import Link from "next/link";
import Image from "next/image";
import banner1 from "@/images/banner/banner.png";
import banner2 from "@/images/banner/banner_1.png"; // bạn thêm ảnh thứ 2

const banners = [banner1, banner2];

const HomeBanner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000); // đổi slide mỗi 5 giây
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[500px] md:h-[650px] overflow-hidden rounded-lg">
      {banners.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-5" : "opacity-0"
          }`}
        >
          <Image
            src={img}
            alt={`banner-${index}`}
            fill
            priority={index === 0}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30" /> {/* overlay mờ */}
        </div>
      ))}

      

      {/* Indicator dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {banners.map((_, idx) => (
          <span
            key={idx}
            className={`h-2 w-2 rounded-full ${
              idx === current ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeBanner;

