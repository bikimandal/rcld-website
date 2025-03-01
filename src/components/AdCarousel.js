import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  "/images/advertisement/1500x500.png",
  "/images/advertisement/1200x400.png",
  "/images/advertisement/900x300.png",
];

const AdCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    arrows: false,
  };

  return (
    <div className="w-full px-4 md:px-8 flex justify-center my-8 sm:my-12 md:my-16">
      {/* Ensures same aspect ratio on all devices */}
      <div className="max-w-7xl w-full overflow-hidden relative aspect-[3/1] rounded-xl shadow-xl bg-black">
        <Slider {...settings}>
          {images.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="w-full h-full flex justify-center items-center"
            >
              <img
                src={src}
                alt={`Ad ${index + 1}`}
                className="w-full h-full object-cover rounded-xl"
              />
            </motion.div>
          ))}
        </Slider>
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
      </div>
    </div>
  );
};

export default AdCarousel;
