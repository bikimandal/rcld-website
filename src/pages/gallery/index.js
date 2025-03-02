import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import NavBar from "@/components/NavBar";

const ImageGallery = ({ refreshTrigger }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/gallery/supabase.galleryfetch");
        const data = await response.json();
        console.log("API Response:", data);

        if (data && Array.isArray(data.images)) {
          setImages(data.images);
        } else {
          setImages([]);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [refreshTrigger]);

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <>
      <NavBar />
      <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-700 text-white min-h-screen flex flex-col items-center">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-100">
          Image Gallery
        </h2>

        {loading ? (
          <p className="text-center text-lg animate-pulse text-gray-300">
            Loading images...
          </p>
        ) : images.length === 0 ? (
          <p className="text-center text-lg text-gray-300">No images found</p>
        ) : (
          <>
            {/* 🔹 Carousel (First 5 Images) */}
            <Swiper
              navigation={true}
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="rounded-xl shadow-2xl w-full max-w-4xl"
            >
              {images.slice(0, 5).map((url, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full h-72 overflow-hidden rounded-xl shadow-lg bg-gray-800">
                    {!loadedImages[index] && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-600 animate-pulse rounded-xl">
                        <div className="w-8 h-8 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                    <img
                      src={url}
                      alt={`Image ${index + 1}`}
                      loading="lazy"
                      className={`w-full h-full object-cover transition-opacity duration-500 rounded-xl ${
                        loadedImages[index] ? "opacity-100" : "opacity-0"
                      }`}
                      onLoad={() => handleImageLoad(index)}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* 🔹 Remaining Images in a Grid Layout */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {images.slice(5).map((url, index) => (
                <div
                  key={index + 5}
                  className="relative w-full h-56 overflow-hidden rounded-xl shadow-lg bg-gray-800"
                >
                  {!loadedImages[index + 5] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-600 animate-pulse rounded-xl">
                      <div className="w-8 h-8 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  <img
                    src={url}
                    alt={`Image ${index + 6}`}
                    loading="lazy"
                    className={`w-full h-full object-cover transition-opacity duration-500 rounded-xl ${
                      loadedImages[index + 5] ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => handleImageLoad(index + 5)}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ImageGallery;
