import Image from "next/image";
import { useEffect, useState } from "react";
import SectionHeading from "./SectionHeading";
import ExploreButton from "./ExploreButton ";

export default function GalleryPreview() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("/data/gallery.json")
      .then((res) => res.json())
      .then((data) => {
        const shuffled = data.sort(() => 0.5 - Math.random());
        setImages(shuffled.slice(0, 3));
      });
  }, []);

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-blue-500 to-purple-500 text-white [mask-image:linear-gradient(to_top,transparent,black_10%,black)] [-webkit-mask-image:linear-gradient(to_top,transparent,black_10%,black_90%,transparent)]">
      <div className="max-w-7xl mx-auto text-center">
        <SectionHeading
          blackText="Our"
          coloredText="Gallery"
          color="text-yellow-400"
          blackTextColor="text-white"
        />
        <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto">
          Explore moments from our computer center, workshops, and events.
        </p>

        {/* Image Grid */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
          {images.map((img, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-2xl shadow-lg border border-gray-700 transition-all duration-500 hover:shadow-xl hover:scale-[1.02]"
            >
              <Image
                src={img.url}
                alt={img.caption}
                width={500}
                height={350}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* View More Button */}
        <ExploreButton text="Explore Gallery" route="/gallery" />
      </div>
    </section>
  );
}
