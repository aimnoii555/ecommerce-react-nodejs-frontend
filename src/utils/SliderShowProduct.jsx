import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const SliderShowProduct = ({ children }) => {
  return (
    <div>
      <Swiper
        navigation={true}
        slidesPerView={15}
        spaceBetween={50}
        pagination={true}
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
          220: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
          576: {
            slidesPerView: 3,
            spaceBetween: 4,
          },

          640: {
            slidesPerView: 3,
            spaceBetween: 4,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
          780: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
          820: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
          860: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
          900: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1000: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
          1010: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
          1020: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
          1030: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
          1040: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 10,
          },

          1024: {
            slidesPerView: 7,
            spaceBetween: 10,
          },
          1060: {
            slidesPerView: 9,
            spaceBetween: 10,
          },
        }}
        modules={[Pagination, Autoplay, Navigation]}
        className="mySwiper object-cover rounded-md"
      >
        {children}
      </Swiper>
    </div>
  );
};

export default SliderShowProduct;
