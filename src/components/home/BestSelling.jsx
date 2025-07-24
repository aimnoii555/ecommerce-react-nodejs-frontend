import React, { useEffect, useState } from "react";
import { listProductBy } from "../../services/product";
import ProductCard from "../card/ProductCard";
import SliderShowProduct from "../../utils/SliderShowProduct";
import { SwiperSlide } from "swiper/react";

const BestSelling = () => {
  const [bestProducts, setBestProducts] = useState([]);

  useEffect(() => {
    listProductBy("sold", "desc", 15)
      .then((res) => {
        setBestProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <SliderShowProduct>
        {bestProducts?.map((p, key) => {
          return (
            <SwiperSlide>
              <ProductCard key={key} item={p}></ProductCard>;
            </SwiperSlide>
          );
        })}
      </SliderShowProduct>
    </div>
  );
};

export default BestSelling;
