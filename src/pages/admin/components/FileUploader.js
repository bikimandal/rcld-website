import React, { useState } from "react";
import { uploadFileToSupabase } from "@/pages/api/gallery/supabase.UploadFile";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const FileUploader = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      toast.warn("Please select a file first!", {
        theme: "dark",
        autoClose: 4000,
        pauseOnHover: false,
      });
      return;
    }

    setUploading(true);
    toast.info("Uploading file...", {
      theme: "dark",
      autoClose: 4000,
      pauseOnHover: false,
    });

    try {
      const publicUrl = await uploadFileToSupabase(file);
      setUploading(false);
      toast.success("File uploaded successfully!", {
        theme: "dark",
        autoClose: 4000,
        pauseOnHover: false,
      });
      onUploadSuccess(); // Refresh gallery
    } catch (error) {
      setUploading(false);
      toast.error("Upload failed! Try again.", {
        theme: "dark",
        autoClose: 4000,
        pauseOnHover: false,
      });
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-96 text-white">
      <h2 className="text-xl font-semibold mb-4 text-center">Upload a File</h2>

      <div className="border-2 border-dashed border-gray-500 rounded-lg p-6 text-center">
        <label className="cursor-pointer flex flex-col items-center">
          <FaCloudUploadAlt className="text-4xl text-blue-400 mb-2" />
          <span className="text-sm text-gray-400">
            {file ? file.name : "Click to select a file"}
          </span>
          <input type="file" onChange={handleFileChange} className="hidden" />
        </label>
      </div>

      <button
        onClick={handleFileUpload}
        disabled={uploading}
        className={`mt-4 w-full py-2 rounded-lg font-medium text-lg cursor-pointer ${
          uploading
            ? "bg-gray-600"
            : "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 cursor-not-allowed"
        } transition duration-300`}
      >
        {uploading ? "Uploading..." : "Upload File"}
      </button>
    </div>
  );
};

export default FileUploader;
