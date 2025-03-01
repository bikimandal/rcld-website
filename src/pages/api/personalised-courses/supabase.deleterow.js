import { supabase } from "../../../../lib/supabaseClient"; // Adjust the path if needed

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Invalid data. 'id' is required." });
    }

    const { data, error } = await supabase
      .from("personalisedcourses") // Your table name
      .delete()
      .eq("id", id);

    if (error) {
      throw error;
    }

    return res
      .status(200)
      .json({ success: true, message: "Row deleted successfully", data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
