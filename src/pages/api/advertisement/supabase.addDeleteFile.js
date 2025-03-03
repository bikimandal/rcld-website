import { supabase } from "../../../../lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { filePath } = req.body;

    if (!filePath || typeof filePath !== "string") {
      return res.status(400).json({ error: "Invalid or missing filePath" });
    }
    const { data, error } = await supabase.storage
      .from("advertisement")
      .remove([filePath]);

    if (error) {
      console.error("Supabase Delete Error:", error.message);
      return res
        .status(500)
        .json({ error: `Failed to delete file: ${error.message}` });
    }

    if (!data || data.length === 0) {
      return res
        .status(404)
        .json({ error: "File not found or already deleted" });
    }
    return res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Internal Server Error: ${error.message}` });
  }
}
