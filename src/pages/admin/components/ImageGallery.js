import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MoonLoader } from "react-spinners";
import withAuth from "../../../../utils/withAuth";

const ImageGallery = ({ refreshTrigger }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/gallery/supabase.galleryfetch");
        const data = await response.json();
        setImages(data.images || []);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [refreshTrigger]);

  const handleDelete = async (imageUrl) => {
    if (deleting) return;
    setDeleting(imageUrl);

    const fileName = imageUrl.split("/").pop();

    try {
      const response = await fetch("/api/gallery/supabase.DeleteFile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filePath: fileName }),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete image: ${response.statusText}`);
      }
      setImages((prevImages) => prevImages.filter((img) => img !== imageUrl));
      toast.success("Image deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        pauseOnHover: false,
      });
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        pauseOnHover: false,
      });
    } finally {
      setDeleting(null); // Reset deleting state
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-center mb-4">Image Gallery</h2>
      {loading ? (
        <div className="w-screen flex justify-center items-center">
          <MoonLoader color="#36d7b7" size={50} />
        </div>
      ) : images.length === 0 ? (
        <p className="text-center">No images found</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 bg-gray-900">
          {images.map((url, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl shadow-lg bg-gray-800 group"
            >
              {/* Delete Button (Shows on Hover) */}
              <button
                className={`absolute top-2 right-2 text-white text-sm font-bold px-3 py-1 rounded-md opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 z-10 cursor-pointer ${
                  deleting === url
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"
                }`}
                onClick={() => handleDelete(url)}
                disabled={deleting === url}
              >
                {deleting === url ? "Deleting..." : "Delete"}
              </button>

              {/* Loader Overlay when Deleting */}
              {deleting === url && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="loader w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}

              {/* Image with Lazy Loading */}
              <img
                src={url}
                alt={`Image ${index + 1}`}
                loading="lazy"
                className={`w-full h-56 object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-105 ${
                  deleting === url ? "opacity-50" : ""
                }`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default withAuth(ImageGallery);
