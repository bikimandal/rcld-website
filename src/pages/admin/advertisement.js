import React from "react";
import { useState } from "react";
import FileUploader from "./components/advertisement/AddFileUploader";
import ImageGallery from "./components/advertisement/AddImageGallery";
import NavBar from "@/components/NavBar";

export default function Advertisement() {
  const [refresh, setRefresh] = useState(false);

  const handleUploadSuccess = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div>
      <NavBar />
      <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-4">
        <FileUploader onUploadSuccess={handleUploadSuccess} />
        <ImageGallery refreshTrigger={refresh} />
      </div>
    </div>
  );
}
