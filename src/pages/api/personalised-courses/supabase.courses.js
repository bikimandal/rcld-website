import { supabase } from "../../../../lib/supabaseClient";

export default async function handler(req, res) {
  try {
    const { data, error } = await supabase
      .from("personalisedcourses")
      .select("*");

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
