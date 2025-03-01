import { useEffect, useState } from "react";

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/gallery/supabase.galleryfetch"); // Adjust this if your API endpoint is different
        const data = await response.json();
        setImages(data.images || []);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-center mb-4">Image Gallery</h2>
      {loading ? (
        <p className="text-center">Loading images...</p>
      ) : images.length === 0 ? (
        <p className="text-center">No images found</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((url, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-md">
              <img
                src={url}
                alt={`Image ${index + 1}`}
                className="w-full h-48 object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
