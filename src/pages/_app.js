import ProgressBar from "@/components/ProgressBar";
import ToastProvider from "@/components/toast/ToastProvider";
import "@/styles/globals.css";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: session } = await supabase.auth.getSession();
      setUser(session?.session?.user || null);
    };

    fetchUser();
  }, []);

  return (
    <>
      <ToastProvider />
      <ProgressBar />
      <Component {...pageProps} />
    </>
  );
}
