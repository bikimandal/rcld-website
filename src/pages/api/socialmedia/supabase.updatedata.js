import { supabase } from "../../../../lib/supabaseClient"; // Adjust the path if needed

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { id, name, type, link } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Invalid data. 'id' is required." });
    }

    const { data, error } = await supabase
      .from("socialmedia") // Your table name
      .update({
        name: name,
        type: type,
        link: link,
      })
      .eq("id", id)
      .select(); // To return the updated row

    if (error) {
      throw error;
    }

    return res
      .status(200)
      .json({ success: true, message: "Row updated successfully", data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
