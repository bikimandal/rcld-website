import { supabase } from "../../../../lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Get the access token from the request header
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    // Force logout the specific user with the given token
    const { error } = await supabase.auth.signOut({ access_token: token });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ message: "User successfully logged out" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
