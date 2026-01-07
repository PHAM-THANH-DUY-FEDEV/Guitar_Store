import React, { useEffect, useState } from "react";

const BannerSlider = ({ images, autoPlay = true, duration = 3000 }) => {
  const [current, setCurrent] = useState(0);

  // Next slide
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  // Prev slide
  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  // Auto play
  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      nextSlide();
    }, duration);

    return () => clearInterval(timer);
  }, [current, autoPlay, duration]);

  return (
    <div className="w-full my-6 h-[350px] md:h-[450px] lg:h-[550px] overflow-hidden relative rounded-xl shadow-lg">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            className="w-full h-full object-cover shrink-0"
          />
        ))}
      </div>

      {/* Next/Prev buttons */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-600 text-white p-2 rounded-full hover:bg-gray-200 hover:text-black/80 transition-all duration-300 "
        onClick={prevSlide}
      >
        ❮
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-600 text-white p-2 rounded-full hover:bg-gray-200 hover:text-black/80 transition-all duration-300"
        onClick={nextSlide}
      >
        ❯
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              index === current ? "bg-white" : "bg-white/40"
            }`}
            onClick={() => setCurrent(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;
