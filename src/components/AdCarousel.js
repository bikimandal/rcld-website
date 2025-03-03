import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AdCarousel = () => {
  const [images, setImages] = useState([]); // Store API images
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch images from the API
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/advertisement/supabase.addfetch");
        const data = await response.json();
        if (data.images && Array.isArray(data.images)) {
          setImages(data.images); // Set fetched images
        } else {
          throw new Error("Invalid image data format");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

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
      <div className="max-w-7xl w-full overflow-hidden relative aspect-[3/1] rounded-xl shadow-xl bg-black">
        {loading ? (
          <p className="text-white text-center p-4">Loading images...</p>
        ) : error ? (
          <p className="text-red-500 text-center p-4">{error}</p>
        ) : images.length === 0 ? (
          <p className="text-white text-center p-4">No images found</p>
        ) : (
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
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
      </div>
    </div>
  );
};

export default AdCarousel;
