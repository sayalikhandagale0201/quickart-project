"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import { assets } from "@/assets/assets";

const HeaderSlider = () => {
  const router = useRouter();
  const { products } = useAppContext();

  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderData = [
    {
      id: products[0]?.id,
      title: "Experience Pure Sound - Your Perfect Headphones Awaits!",
      offer: "Limited Time Offer",
      imgSrc: assets.header_headphone_image,
    },
    {
      id: products[1]?.id,
      title: "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
      offer: "Hurry up only few lefts!",
      imgSrc: assets.header_playstation_image,
    },
    {
      id: products[2]?.id,
      title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
      offer: "Exclusive Deal",
      imgSrc: assets.header_macbook_image,
    },
  ];

  // AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (products.length === 0) return null;

  return (
    <div className="overflow-hidden relative w-full">

      {/* SLIDES */}
      <div
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={index}
            className="flex flex-col-reverse md:flex-row items-center justify-between bg-[#E6E9F2] py-8 md:px-14 px-5 mt-6 rounded-xl min-w-full"
          >
            <div>
              <p className="text-orange-600">{slide.offer}</p>

              <h1 className="md:text-[40px] text-2xl font-semibold max-w-lg">
                {slide.title}
              </h1>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() =>
                    router.push(
                      `/checkout?mode=buyNow&productId=${slide.id}`
                    )
                  }
                  className="bg-orange-600 text-white px-8 py-2 rounded-full"
                >
                  Buy Now
                </button>

                <button
                  onClick={() => router.push("/products")}
                  className="flex items-center gap-2"
                >
                  Explore
                  <Image
                    src={assets.arrow_icon}
                    alt="arrow"
                    width={16}
                    height={16}
                  />
                </button>
              </div>
            </div>

            <Image
              src={slide.imgSrc}
              alt="slider"
              width={300}
              height={300}
              className="md:w-72 w-48"
            />
          </div>
        ))}
      </div>

      {/* ✅ DOTS */}
      <div className="flex justify-center gap-3 mt-6">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full border ${
              currentSlide === index
                ? "bg-orange-600 border-orange-600"
                : "bg-white border-gray-400"
            }`}
          />
        ))}
      </div>

    </div>
  );
};

export default HeaderSlider;
