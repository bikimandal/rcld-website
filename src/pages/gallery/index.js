import { useEffect, useState } from "react";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [loadedImages, setLoadedImages] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("/data/gallery.json")
      .then((res) => res.json())
      .then((data) => setImages(data));
  }, []);

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images]);

  const goToNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <NavBar />
      <section className="py-16 px-6 min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-950 dark:to-black">
        <div className="max-w-5xl mx-auto text-center">
          <SectionHeading
            blackText="Our"
            coloredText="Gallery"
            color="text-blue-500"
            blackTextColor="text-white"
          />

          <p className="text-lg text-gray-700 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
            A glimpse into our computer center and events.
          </p>
        </div>

        {/* Image Carousel */}
        <div className="relative w-full max-w-4xl mx-auto mb-12">
          {images.length > 0 && (
            <div className="relative overflow-hidden rounded-xl shadow-2xl">
              <Image
                src={images[currentIndex].url}
                alt={images[currentIndex].caption}
                width={800}
                height={500}
                priority
                className="w-full h-96 object-cover transition-transform duration-700 ease-in-out transform scale-100 hover:scale-105"
              />

              {/* Prev Button */}
              <button
                onClick={goToPrevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 dark:bg-black/30 backdrop-blur-md px-3 py-3 rounded-full shadow-lg transition-all hover:bg-white/40 dark:hover:bg-black/50 cursor-pointer"
              >
                <FaArrowLeft className="w-6 h-6 text-gray-900 dark:text-gray-100" />
              </button>

              {/* Next Button */}
              <button
                onClick={goToNextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 dark:bg-black/30 backdrop-blur-md px-3 py-3 rounded-full shadow-lg transition-all hover:bg-white/40 dark:hover:bg-black/50 cursor-pointer"
              >
                <FaArrowRight className="w-6 h-6 text-gray-900 dark:text-gray-100" />
              </button>
            </div>
          )}

          {/* Navigation Dots */}
          <div className="flex justify-center mt-6">
            {images.map((_, index) => (
              <button
                key={index}
                className={`h-3 w-3 mx-1 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-blue-600 dark:bg-blue-400 w-4 shadow-md"
                    : "bg-gray-400 dark:bg-gray-700"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {images.map((img, index) => (
            <div
              key={img.id}
              className="relative group overflow-hidden rounded-xl shadow-lg bg-gray-300 dark:bg-gray-800 transition-all duration-500 hover:shadow-2xl"
            >
              {!loadedImages[index] && (
                <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-xl"></div>
              )}

              <Image
                src={img.url}
                alt={img.caption}
                width={800}
                height={500}
                priority
                className={`w-full h-64 object-cover transition-all duration-500 
                  group-hover:scale-105 group-hover:brightness-90
                  ${loadedImages[index] ? "opacity-100" : "opacity-0"}`}
                onLoad={() => handleImageLoad(index)}
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white text-lg font-semibold">
                  {img.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
