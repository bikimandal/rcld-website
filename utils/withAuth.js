import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSessionKey } from "../lib/IndexedDb";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(null); // Avoid initial rendering

    useEffect(() => {
      let isMounted = true; // Prevent state updates on unmounted component

      async function checkAuth() {
        try {
          const data = await getSessionKey();

          if (!isMounted) return;

          if (!data) {
            router.replace("/admin");
            return;
          }

          const session = JSON.parse(data);
          if (!session?.isLoggedIn) {
            router.replace("/admin");
            return;
          }

          setIsAuthenticated(true); // User is authenticated
        } catch (error) {
          console.error("Error fetching session:", error);
          router.replace("/admin");
        }
      }

      checkAuth();

      return () => {
        isMounted = false; // Cleanup function to avoid state update on unmounted component
      };
    }, [router]);

    // Prevent flickering by returning null before auth check is complete
    if (isAuthenticated === null) return null;

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
