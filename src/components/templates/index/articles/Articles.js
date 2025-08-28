"use client";
import styles from "./articles.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import Article from "./Article";
import Link from "next/link";

const Articles = () => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>مقالات ما</p>

      <main>
        <Swiper
          slidesPerView={3}
          spaceBetween={1}
          dir="rtl"
          autoplay={{ delay: 1500, disableOnInteraction: false }}
          loop={true}
          navigation={true}
          modules={[Navigation, Autoplay]}
          className="mySwiper articles_slider"
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 6, // موبایل
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 10, // دسکتاپ
            },
          }}
        >
          <SwiperSlide>
            <Article />
          </SwiperSlide>
          <SwiperSlide>
            <Article />
          </SwiperSlide>
          <SwiperSlide>
            <Article />
          </SwiperSlide>
          <SwiperSlide>
            <Article />
          </SwiperSlide>
          <SwiperSlide>
            <Article />
          </SwiperSlide>
          <SwiperSlide>
            <Article />
          </SwiperSlide>
          <SwiperSlide>
            <Article />
          </SwiperSlide>
          <SwiperSlide>
            <Article />
          </SwiperSlide>
          <SwiperSlide>
            <Article />
          </SwiperSlide>
        </Swiper>
      </main>
    </div>
  );
};

export default Articles;
