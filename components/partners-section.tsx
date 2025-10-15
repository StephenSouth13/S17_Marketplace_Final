"use client"

import Image from "next/image";

export function PartnersSection() {
  const partners = [
    { name: "VSM", logo: "/logo_partners/vsm.png" },
    { name: "MSC Center", logo: "/logo_partners/msc.png" },
    { name: "Smar", logo: "/logo_partners/smar.png" },
    { name: "smentor", logo: "/logo_partners/smentor.png" },
    { name: "Học Kỳ Doanh Nghiệp", logo: "/logo_partners/hkdn.png" },
    { name: "Action Media", logo: "/logo_partners/actionmedia.png" },
  ]

  return (
    <div className="py-12">
      <div className="container mx-auto px-6">
        

        {/* Grid logo */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="group relative flex items-center justify-center p-4 transition-all duration-300 hover:scale-105"
            >
              <Image
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                width={240}
                height={80}
                className="max-h-20 max-w-full object-contain opacity-80 group-hover:opacity-100 transition-all duration-300 drop-shadow-md"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
