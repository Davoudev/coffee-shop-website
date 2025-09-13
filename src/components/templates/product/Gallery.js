"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useState } from "react";

const Gallery = ({ img }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const images = Array(2).fill(img);

  const renderSlides = () =>
    images.map((src, index) => (
      <SwiperSlide key={index}>
        <img src={src} alt={`gallery-${index}`} />
      </SwiperSlide>
    ));

  return (
    <section style={{ width: "36%" }}>
      {/* Main Slider */}
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={10}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 gallery-slider"
      >
        {renderSlides()}
      </Swiper>

      {/* Thumbnails */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode
        watchSlidesProgress
        modules={[FreeMode, Navigation, Thumbs]}
        className="gallery-slider-2"
      >
        {renderSlides()}
      </Swiper>
    </section>
  );
};

export default Gallery;
