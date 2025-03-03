import { supabase } from "../../../../lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Get all files from 'uploads' bucket
    const { data, error } = await supabase.storage.from("advertisement").list();

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(200).json({ images: [] }); // No images found
    }

    // Filter out non-image files and invalid entries
    const imageExtensions = ["png", "jpg", "jpeg", "webp", "gif", "svg"];
    const images = data
      .filter((file) => {
        const ext = file.name.split(".").pop().toLowerCase();
        return imageExtensions.includes(ext) && !file.name.startsWith(".");
      })
      .map((file) => {
        return supabase.storage.from("advertisement").getPublicUrl(file.name)
          .data.publicUrl;
      });

    return res.status(200).json({ images }); // Send image URLs
  } catch (error) {
    console.error("Error fetching images:", error);
    return res.status(500).json({ error: error.message });
  }
}
