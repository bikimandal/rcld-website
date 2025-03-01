import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSessionKey } from "../lib/IndexedDb";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      async function fetchSession() {
        try {
          const data = await getSessionKey();
          setIsLoading(false); // ✅ Set loading false before redirecting

          if (!data) {
            return router.replace("/admin");
          }

          const session = JSON.parse(data);

          if (!session?.isLoggedIn) {
            return router.replace("/admin");
          }
        } catch (error) {
          console.error("Error fetching session:", error);
          setIsLoading(false);
          router.replace("/admin");
        }
      }

      fetchSession();
    }, [router]);

    if (isLoading) {
      return <h1 className="text-white text-center">Loading...</h1>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
