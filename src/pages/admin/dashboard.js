import { useRouter } from "next/router";
import { FiBookOpen, FiImage, FiSettings, FiShare2 } from "react-icons/fi";
import withAuth from "../../../utils/withAuth";
import NavBar from "@/components/NavBar";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getSessionKey } from "../../../lib/IndexedDb";

function Dashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState("");

  const menuItems = [
    {
      name: "RCLD Course Details",
      icon: <FiBookOpen />,
      path: "/admin/rcld-courses",
    },
    {
      name: "Personalised Course Details",
      icon: <FiBookOpen />,
      path: "/admin/personalised-course",
    },
    {
      name: "Social Media & Contact",
      icon: <FiShare2 />,
      path: "/admin/socialmedia",
    },
    { name: "Gallery", icon: <FiImage />, path: "/admin/gallery" },
    { name: "Settings", icon: <FiSettings />, path: "/admin/settings" },
  ];

  useEffect(() => {
    const updateUser = async () => {
      try {
        const storedSession = await getSessionKey();
        if (!storedSession) {
          setUserName("");
          return;
        }

        const session = JSON.parse(storedSession);
        const displayName =
          session?.user?.user_metadata?.display_name || "User";
        setUserName(displayName);

        const hasVisited = localStorage.getItem("hasVisitedDashboard");
        if (!hasVisited) {
          toast(`🦄 Welcome ${displayName}!`, {
            position: "top-right",
            autoClose: 3000,
            pauseOnHover: false,
            theme: "dark",
          });

          localStorage.setItem("hasVisitedDashboard", "true");
        }
      } catch (error) {
        console.error("Error fetching session data:", error);
        setUserName("User");
      }
    };

    updateUser();

    window.addEventListener("storage", updateUser);
    return () => window.removeEventListener("storage", updateUser);
  }, []);

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Welcome <span className="text-amber-400">{userName}</span>!
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl flex items-center gap-4 cursor-pointer hover:shadow-2xl hover:scale-102 transition-all duration-300"
              onClick={() => router.push(item.path)}
            >
              <div className="text-3xl text-blue-600">{item.icon}</div>
              <span className="text-lg font-semibold">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default withAuth(Dashboard);
