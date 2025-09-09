"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const banners: string[] = [
  "/images/banner.jpg",
  "/images/banner1.jpg",
  "/images/banner2.jpg",
  "/images/banner3.jpg",
  "/images/banner6.jpg",
  //   "https://placehold.co/1920x800",
];

export default function BannerSwiper() {
  return (
    <div className="w-11/12  mx-auto my-5 bg-gray-200 relative">
      <Swiper
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="rounded-lg overflow-hidden"
      >
        {banners.map((src: string, index: number) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px]">
              <Image
                src={src}
                alt={`Banner ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Tùy chỉnh nút điều hướng */}
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: red !important; /* Đổi màu nút thành đỏ */
          transition: color 0.3s ease;
        }

        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          color: darkred !important; /* Khi hover, nút chuyển thành đỏ đậm */
        }
      `}</style>
    </div>
  );
}
