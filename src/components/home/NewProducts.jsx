import React, { useEffect, useState } from "react";
import { listProductBy } from "../../services/product";
import ProductCard from "../card/ProductCard";
import { SwiperSlide } from "swiper/react";
import SliderShowProduct from "../../utils/SliderShowProduct";

const NewProducts = () => {
  const [bestProducts, setBestProducts] = useState([]);

  useEffect(() => {
    listProductBy("createdAt", "desc", 15)
      .then((res) => {
        setBestProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <SliderShowProduct>
      <div className="flex gap-3 flex-wrap">
        {bestProducts?.map((p, key) => {
          return (
            <SwiperSlide>
              <ProductCard key={key} item={p}></ProductCard>;
            </SwiperSlide>
          );
        })}
      </div>
    </SliderShowProduct>
  );
};

export default NewProducts;
