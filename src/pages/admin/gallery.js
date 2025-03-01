import React, { useState } from "react";
import { supabase } from "../../../lib/supabaseClient"; // Ensure supabaseClient is correctly set up

export default function FileUploader() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [publicUrlSupa, setPublicUrlSupa] = useState("");

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Upload file to Supabase bucket and get public URL
  const handleFileUpload = async () => {
    if (!file) {
      setUploadMessage("Please select a file first.");
      return;
    }

    setUploading(true);
    setUploadMessage("");

    try {
      // Generate a unique file name
      const fileName = `${Date.now()}-${file.name}`;

      // Upload the file to the Supabase bucket
      const { data, error } = await supabase.storage
        .from("uploads") // Ensure 'uploads' is your bucket name
        .upload(fileName, file, { cacheControl: "3600", upsert: false });

      if (error) {
        throw error;
      }

      // Get the public URL of the uploaded file
      const { data: publicURLData } = supabase.storage
        .from("uploads")
        .getPublicUrl(fileName);

      setUploading(false);
      setUploadMessage("File uploaded successfully!");
      setPublicUrlSupa(publicURLData.publicUrl);
      console.log("URL:", publicURLData.publicUrl);
    } catch (error) {
      setUploading(false);
      setUploadMessage(`Error uploading file: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>File Upload</h1>
      <input
        type="file"
        onChange={handleFileChange}
        accept="*/*" // Allow any type of file
      />
      <button onClick={handleFileUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload File"}
      </button>

      {uploadMessage && <p>{uploadMessage}</p>}
      {publicUrlSupa && (
        <div>
          <p>Public URL:</p>
          <a href={publicUrlSupa} target="_blank" rel="noopener noreferrer">
            {publicUrlSupa}
          </a>
        </div>
      )}
    </div>
  );
}
