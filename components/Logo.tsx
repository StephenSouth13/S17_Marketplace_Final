import { cn } from "@/lib/utils";
import React from "react";
import Image from "next/image";
const Logo = ({
  className,
  spanDesign,
}: {
  className?: string;
  spanDesign?: string;
}) => {
  return (
    <a href={"/"} className="inline-flex">
      <Image
        src="/logo/logo.png"
        alt="S17 MarketPlace Logo"
        width={160}
        height={80}
        className={`h-20 w-auto object-contain ${className ?? ""}`}
        loading="eager"
        priority={true}
      />
    </a>
  );
};

export default Logo;

export default Logo;
