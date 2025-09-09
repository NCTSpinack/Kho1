"use client"; // Nếu bạn dùng Next.js 13+
import { PiTireFill } from "react-icons/pi";
import Image from "next/image";
import { FaChevronRight, FaProductHunt,FaLightbulb } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useState } from "react";

import SliderAcquy from "../layouts/SliderAcquy";
import SliderLopCu from "../layouts/SliderLopCu";
import SliderLopMoi from "../layouts/SliderLopMoi";
import SliderPhuKien from "../layouts/SliderPhuKien";

const products = [
  {
    name: "Multi-Vehicle Automatic Transmission Fluid",
    price: "$7.99",
    oldPrice: "$11.99",
    discount: "33%",
    rating: 4.33,
    image: "/images/1.jpg",
  },
  {
    name: "Mercedes Transmission Filter",
    price: "$21.99",
    oldPrice: "$25.99",
    discount: "15%",
    rating: 4.33,
    image: "/images/2.jpg",
  },
  {
    name: "RIDEX 3707A0009 Gear knob 28P85",
    price: "$151.99",
    oldPrice: "$162.99",
    discount: "7%",
    rating: 4.0,
    image: "/images/3.jpg",
  },
  
];

const categories = [
  { name: "All Products", count: 1 },
  { name: "Brakes", count: 5 },
  { name: "Electrical", count: 5 },
  { name: "Engine", count: 5 },
  { name: "Heating and Cooling", count: 5 },
  { name: "Steering", count: 4 },
  { name: "Suspension", count: 5 },
];
const CategoriesDMSP = [
  { name: "Lốp ô tô thanh lý" },
  { name: "Lốp ô tô mới" },
  { name: "Lốp ô tô cũ" },
  { name: "Bình ắc quy " },
  { name: "Cần gạt mưa" },
  { name: "Nước làm mát" },
  { name: "Dây câu bình" },
  { name: "Van cảm biến" },
  { name: "Van cao su" },
  { name: "Vành độ" },
  { name: "Sạc không dây" },
  { name: "Bơm lốp Michelin" },
];

export default function Categories() {
  const [isPaused, setIsPaused] = useState(false);
  return (
    <div className="w-11/12 mx-auto py-10 grid grid-cols-1 md:grid-cols-4 gap-6 border-1 border-gray-300">
      {/* Sidebar Categories */}
      <div className="bg-white p-4 rounded-lg shadow-md hidden md:block">
        <h2 className="text-xl font-semibold text-white mb-4 text-center bg-rose-700 rounded-4xl h-10 flex items-center justify-center">
          Tìm kiếm nhiều nhất
        </h2>
        <ul>
          {categories.map((category, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-1 hover:bg-rose-700 rounded-lg mb-2 cursor-pointer border border-gray-300 transition duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex justify-center items-center">
                  <PiTireFill className="text-rose-700 text-4xl " />
                </div>
                <span>{category.name}</span>
              </div>
              <span className="flex items-center justify-center w-12 h-12 bg-red-100 text-red-600 font-bold text-lg rounded-full">
                {category.count}
              </span>
            </li>
          ))}
        </ul>
        <hr className="border-1 border-gray-300 my-5" />
        <h2 className="text-xl font-semibold text-white mb-4 text-center bg-rose-700 rounded-4xl h-10 flex items-center justify-center">
          DANH MỤC SẢN PHẨM
        </h2>
        <ul>
          {CategoriesDMSP.map((categorydmsp, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-1 hover:bg-rose-700 hover:text-amber-50 rounded-lg mb-2 cursor-pointer border border-gray-300 transition duration-300"
            >
              <div className="flex items-center gap-3 ">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex justify-center items-center">
                  <FaProductHunt className="text-rose-700 text-4xl " />
                </div>
                <span>{categorydmsp.name}</span>
              </div>
            </li>
          ))}
        </ul>
        <hr className="border-1 border-gray-300 my-5" />
        <h2 className="text-xl font-semibold text-white mb-4 text-center bg-rose-700 rounded-4xl h-10 flex items-center justify-center">
          CÓ THỂ BẠN CẦN
        </h2>
        <ul>
          <li className="flex items-center justify-between p-1 hover:bg-rose-700 hover:text-amber-50 rounded-lg mb-2 cursor-pointer border border-gray-300 transition duration-300">
            <div className="flex items-center gap-3 ">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex justify-center items-center"> 
                <FaLightbulb className="text-rose-700 text-4xl "/> </div>
              <span>Cách tháo lốp dự phòng </span>
            </div>
          </li>
          <li className="flex items-center justify-between p-1 hover:bg-rose-700 hover:text-amber-50 rounded-lg mb-2 cursor-pointer border border-gray-300 transition duration-300">
            <div className="flex items-center gap-3 ">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex justify-center items-center">
              <FaLightbulb className="text-rose-700 text-4xl "/>
              </div>
              <span>Cách tháo ắc quy xe </span>
            </div>
          </li>
          <li className="flex items-center justify-between p-1 hover:bg-rose-700 hover:text-amber-50 rounded-lg mb-2 cursor-pointer border border-gray-300 transition duration-300">
            <div className="flex items-center gap-3 ">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex justify-center items-center"><FaLightbulb className="text-rose-700 text-4xl "/></div>
              <span>Dấu hiệu cần thay ắc quy </span>
            </div>
          </li>
          <li className="flex items-center justify-between p-1 hover:bg-rose-700 hover:text-amber-50 rounded-lg mb-2 cursor-pointer border border-gray-300 transition duration-300">
            <div className="flex items-center gap-3 ">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex justify-center items-center"><FaLightbulb className="text-rose-700 text-4xl "/></div>
              <span>Các cảnh báo trên xe</span>
            </div>
          </li>
        </ul>
      </div>

      {/* Popular Categories */}
      <div className="col-span-3 mr-2">
        <div className="flex justify-between items-center mb-4 border-1 border-gray-300 rounded-lg">
          <h2 className="text-xl font-bold text-black flex ">
            <PiTireFill className="text-rose-700 text-4xl " />
            <a
              href="#"
              title="Lốp Ô Tô"
              className="text-black hover:text-red-700 transition-colors duration-300 p-2 "
            >
              LỐP Ô TÔ THANH LÝ GIÁ RẺ
            </a>
          </h2>
          <button className="flex items-center bg-rose-700 text-white px-4 mr-2 py-2 rounded-3xl hover:bg-orange-600 transition duration-300">
            Xem tất cả <FaChevronRight className="ml-2" />
          </button>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={4} // Hiển thị 4 sản phẩm
          autoplay={{
            delay: 3000, // Chuyển tự động sau 3 giây
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation
          onSwiper={(swiper) => {
            if (isPaused) swiper.autoplay.stop();
          }}
          breakpoints={{
            320: { slidesPerView: 1 }, // Hiển thị 1 sản phẩm trên mobile
            768: { slidesPerView: 2 }, // Hiển thị 2 sản phẩm trên tablet
            1024: { slidesPerView: 4 }, // Hiển thị 4 sản phẩm trên desktop
          }}
        >
          {products.map((product, index) => (
            <SwiperSlide
              key={index}
              onMouseEnter={() => {
                setIsPaused(true);
              }}
              onMouseLeave={() => {
                setIsPaused(false);
              }}
            >
              <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300 transition duration-300 hover:border-rose-700 hover:scale-97">
                <div className="relative ">
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded ">
                    {product.discount} OFF
                  </span>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="w-full rounded"
                  />
                </div>
                <div className="mt-3">
                  <p className="text-yellow-500 text-sm font-semibold">
                    ⭐ {product.rating} / 5
                  </p>
                  <h3 className="text-md font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-500 line-through">
                    {product.oldPrice}
                  </p>
                  <p className="text-lg text-red-500 font-semibold">
                    {product.price}
                  </p>
                  <button className="mt-3 w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition duration-300">
                    Liên hệ ngay
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <SliderLopCu />
        <SliderLopMoi />
        <SliderAcquy />
        <SliderPhuKien />
      </div>
    </div>
  );
}
