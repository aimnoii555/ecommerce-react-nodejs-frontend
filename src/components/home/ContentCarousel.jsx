import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import axios from "axios";

const ContentCarousel = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    handleGetImg();
  }, []);

  const handleGetImg = () => {
    axios
      .get("https://picsum.photos/v2/list?page=1&limit=15")
      .then((res) => setImages(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="space-y-2">
      <Swiper
        spaceBetween={30}
        pagination={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper h-80 object-cover rounded-md"
      >
        {images?.map((img, key) => {
          return (
            <SwiperSlide key={key}>
              <img src={img.download_url} alt="" />
            </SwiperSlide>
          );
        })}
      </Swiper>

      <Swiper
        navigation={true}
        slidesPerView={3}
        spaceBetween={6}
        pagination={true}
        modules={[Pagination, Autoplay, Navigation]}
        className="mySwiper object-cover rounded-md"
      >
        {images?.map((img, key) => {
          return (
            <SwiperSlide key={key}>
              <img className="rounded-md" src={img.download_url} alt="" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ContentCarousel;
