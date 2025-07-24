import React, { useEffect } from "react";
import ProductCard from "../components/card/ProductCard";
import useBearProvider from "../providers/Provider";
import SearchCard from "../components/card/SearchCard";
import CartCard from "../components/card/CartCard";

const Shop = () => {
  const storeState = useBearProvider((state) => state);

  useEffect(() => {
    storeState.getProduct(100);
  }, []);

  return (
    <div className="flex">
      {/* filter search */}
      <div className="w-1/4 p-4 bg-gray-100 h-screen">
        <SearchCard />
      </div>
      {/*  show product */}
      <div className="w-1/2 p-4 h-screen overflow-y-auto">
        <p className="font-bold">All Product</p>
        <div className="flex gap-4 flex-wrap">
          {storeState.products.map((item, index) => (
            <ProductCard item={item} key={index} />
          ))}
        </div>
      </div>
      {/* cart */}
      <div className="w-1/4 p-4 bg-gray-100 overflow-y-auto">
        <CartCard />
      </div>
    </div>
  );
};

export default Shop;
