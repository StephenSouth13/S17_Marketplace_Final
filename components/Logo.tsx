import { cn } from "@/lib/utils";
import React from "react";

const Logo = ({
  className,
  spanDesign,
}: {
  className?: string;
  spanDesign?: string;
}) => {
  return (
    <a href={"/"} className="inline-flex">
      <img
        src="/logo/logo.png"
        alt="S17 MarketPlace Logo"
        // Đã thay đổi h-8 thành h-16
        className={cn("h-20 w-auto object-contain", className)}
      />
    </a>
  );
};

export default Logo;