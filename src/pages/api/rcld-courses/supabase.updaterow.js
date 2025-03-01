import { supabase } from "../../../../lib/supabaseClient"; // Adjust the path if needed

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  // console.log("Body From APi :", req.body);

  try {
    const { id, abbreviation, title, description, subjects, fees, duration } =
      req.body;

    if (!id) {
      return res.status(400).json({ error: "Invalid data. 'id' is required." });
    }
    console.log(subjects);
    const { data, error } = await supabase
      .from("courses") // Your table name
      .update({
        abbreviation: abbreviation,
        title: title,
        description: description,
        subjects: Array.isArray(subjects) ? subjects : JSON.parse(subjects), // Store as JSONB if needed
        fees: fees,
        duration: duration,
      })
      .eq("id", id);

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
