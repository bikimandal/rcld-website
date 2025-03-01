import React, { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

export default function Gallery() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log(
        "LocalStorage token:",
        localStorage.getItem("supabase.auth.token")
      );
    }

    const checkUserStatus = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log("Session:", session);
      setUser(session?.user || null);
    };

    checkUserStatus();
  }, []);

  return (
    <div>
      {user ? `✅ Logged in as ${user.email}` : "❌ User is LOGGED OUT"}
    </div>
  );
}
