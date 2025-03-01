import React, { useState } from "react";
import { uploadFileToSupabase } from "@/pages/api/gallery/supabase.UploadFile"; // Import API function
import { FaCloudUploadAlt } from "react-icons/fa"; // Import upload icon

export default function FileUploader() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [publicUrlSupa, setPublicUrlSupa] = useState("");

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Upload file using the separate API function
  const handleFileUpload = async () => {
    if (!file) {
      setUploadMessage("Please select a file first.");
      return;
    }

    setUploading(true);
    setUploadMessage("");

    try {
      const publicUrl = await uploadFileToSupabase(file); // Call API function
      setUploading(false);
      setUploadMessage("File uploaded successfully!");
      setPublicUrlSupa(publicUrl); // Store the public URL in state
      console.log("Public URL:", publicUrl);
    } catch (error) {
      setUploading(false);
      setUploadMessage(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-96 text-white">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Upload a File
        </h2>

        {/* File Input */}
        <div className="border-2 border-dashed border-gray-500 rounded-lg p-6 text-center">
          <label className="cursor-pointer flex flex-col items-center">
            <FaCloudUploadAlt className="text-4xl text-blue-400 mb-2" />
            <span className="text-sm text-gray-400">
              {file ? file.name : "Click to select a file"}
            </span>
            <input type="file" onChange={handleFileChange} className="hidden" />
          </label>
        </div>

        {/* Upload Button */}
        <button
          onClick={handleFileUpload}
          disabled={uploading}
          className={`mt-4 w-full py-2 rounded-lg font-medium text-lg 
          ${
            uploading
              ? "bg-gray-600"
              : "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
          }
          transition duration-300`}
        >
          {uploading ? "Uploading..." : "Upload File"}
        </button>

        {/* Upload Message */}
        {uploadMessage && (
          <p className="text-sm text-gray-300 mt-3 text-center">
            {uploadMessage}
          </p>
        )}

        {/* Display Public URL */}
        {publicUrlSupa && (
          <div className="mt-4 bg-gray-700 p-2 rounded-lg text-sm text-center">
            <p>File Uploaded:</p>
            <a
              href={publicUrlSupa}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              {publicUrlSupa}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
