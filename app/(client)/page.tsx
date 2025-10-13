import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import HomeCategories from "@/components/HomeCategories";
import LatestBlog from "@/components/LatestBlog";
import ProductGrid from "@/components/ProductGrid";
import ShopByBrands from "@/components/ShopByBrands";
import { getCategories } from "@/sanity/queries";
import { getServices } from "@/sanity/utils";
import { S17_Eco } from "@/components/s17_eco";
import { PartnersSection } from "@/components/partners-section";
import { OurServices } from "@/components/OurServices";
import React from "react";

const Home = async () => {
  const categories = await getCategories(6);
  const services = await getServices(4); // ✅ giới hạn 4 dịch vụ nổi bật

  console.log("Services ở trang Home:", services);

  return (
    <Container className="bg-shop-light-pink">
      <HomeBanner />
      <ProductGrid />
      <HomeCategories categories={categories} />

      {/* ✅ Dịch vụ nổi bật */}
      <OurServices services={services} />

      <ShopByBrands />
      <LatestBlog />
      <S17_Eco />
      <PartnersSection />
    </Container>
  );
};

export default Home;
