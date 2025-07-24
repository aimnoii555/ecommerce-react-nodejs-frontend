import React from "react";
import ContentCarousel from "../components/home/ContentCarousel";
import BestSelling from "../components/home/BestSelling";
import NewProducts from "../components/home/NewProducts";

const Home = () => {
  return (
    <div className="">
      <ContentCarousel />

      <p className="text-2xl font-bold my-4">Best selling Products</p>
      <BestSelling />
      <p className="text-2xl font-bold my-4">New Product</p>
      <NewProducts />
    </div>
  );
};

export default Home;
