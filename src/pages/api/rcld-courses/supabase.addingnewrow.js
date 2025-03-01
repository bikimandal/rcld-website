import { supabase } from "../../../../lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    const { data, error } = await supabase
      .from("courses")
      .insert([
        {
          id: id,
          abbreviation: id,
          title: "qqq",
          description: "qqq",
          subjects: ["qqq"],
          fees: 100,
          duration: "qqq",
        },
      ])
      .select();

    if (error) {
      throw error;
    }

    return res.status(200).json({ message: "Row added successfully", data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
