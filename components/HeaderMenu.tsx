"use client";

import { headerData } from "@/constants/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";

const HeaderMenu = () => {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center justify-center gap-8 text-[15px] font-semibold tracking-wide">
      {headerData.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.title}
            href={item.href}
            className={`relative group px-2 py-1 transition-all duration-300 ${
              isActive
                ? "text-shop_light_green"
                : "text-gray-700 hover:text-shop_light_green"
            }`}
          >
            <span className="relative z-10">{item.title}</span>

            {/* Underline animation */}
            <motion.span
              layoutId="menu-underline"
              className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-gradient-to-r from-shop_light_green via-emerald-400 to-shop_btn_dark_green transition-all duration-300 ${
                isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
};

export default HeaderMenu;
