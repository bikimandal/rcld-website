import { supabase } from "../../../../lib/supabaseClient"; // Ensure the correct path

export const uploadFileToSupabase = async (file) => {
  try {
    if (!file) {
      throw new Error("No file selected");
    }

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

    return publicURLData.publicUrl; // Return the public URL
  } catch (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }
};
